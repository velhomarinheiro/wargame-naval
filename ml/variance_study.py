"""
variance_study.py — Estudo de variância: a queda/recuperação de agressividade
do bot é efeito do DATASET (nº de partidas humanas) ou da VARIÂNCIA de treino
(sorte da inicialização/shuffle)?

Para cada CONDIÇÃO (0, 8 ou 15 partidas humanas, sempre + 120 sintéticas),
treina K réplicas do move_net com seeds diferentes e mede a AGRESSIVIDADE
emergente em self-play. Como a ablação (investigate_aggression.py) mostrou que
o volume de ataque é governado pelo move_net, treinamos SÓ o move_net por
réplica e usamos um attack_net FIXO de referência (o comitado atual) em todas
as avaliações — isola a variável e reduz o custo pela metade.

Métricas por réplica (self-play, EVAL_GAMES partidas):
  ataques/jogo, dano total/jogo, % vitória decisiva, contato/fase.

Compara a dispersão DENTRO de cada condição (variância de treino) com a
diferença ENTRE condições (efeito do dataset).

Uso:
    python ml/variance_study.py
"""
from __future__ import annotations
import sys, pathlib, json, random, copy
sys.argv = [sys.argv[0]]  # evita que o argparse de bot_vs_bot capture argumentos
import numpy as np
import torch
from torch.utils.data import DataLoader, random_split
import pandas as pd

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE))
import train_bot as tb
import bot_vs_bot as bvb
import simulate_games as sim
import onnxruntime as ort

LOG_DIR = HERE.parent / "data" / "game-logs"
SP = pathlib.Path("/tmp/claude-0/-home-user-wargame-naval/"
                  "4ace9329-a0db-5c11-95a2-e5858d91d793/scratchpad")

K_REPLICAS = 5
EVAL_GAMES = 100
CONDITIONS = [0, 8, 15]      # nº de partidas humanas
SEEDS = [11, 23, 37, 51, 73]  # um por réplica

FIXED_ATTACK = ort.InferenceSession(str(HERE / "models" / "attack_net.onnx"))

SIM_FILES   = sorted(LOG_DIR.glob("sim_*.jsonl"))
HUMAN_FILES = sorted(LOG_DIR.glob("game_*.jsonl"))  # ordem cronológica (data no nome)


# ── Dataset por condição ─────────────────────────────────────────────────────
def build_move_samples(n_human: int):
    files = SIM_FILES + HUMAN_FILES[:n_human]
    records = []
    for f in files:
        source = "real" if f.name.startswith("game_") else "sim"
        for line in f.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line:
                rec = json.loads(line); rec["_source"] = source
                records.append(rec)
    df = pd.DataFrame(records)
    over = df[df.event == "game_over"]
    real_rooms = set(over[over["_source"] == "real"]["room"])
    sim_rooms  = set(over[(over["_source"] == "sim") & (over.turn >= tb.MIN_TURNS)]["room"])
    df = df[df["room"].isin(real_rooms | sim_rooms)]
    return tb.build_move_samples(df)


# ── Treino de um move_net com seed ───────────────────────────────────────────
def train_move_net(samples, seed):
    random.seed(seed); np.random.seed(seed); torch.manual_seed(seed)
    ds = tb.HexDataset(samples)
    n_val = max(1, int(len(ds) * tb.VAL_SPLIT))
    tr, va = random_split(ds, [len(ds) - n_val, n_val],
                          generator=torch.Generator().manual_seed(seed))
    tr_dl = DataLoader(tr, batch_size=tb.BATCH_SIZE, shuffle=True,
                       generator=torch.Generator().manual_seed(seed))
    va_dl = DataLoader(va, batch_size=tb.BATCH_SIZE)
    model = tb.HexNet()
    opt = torch.optim.Adam(model.parameters(), lr=tb.LR)
    crit = torch.nn.CrossEntropyLoss()
    sched = torch.optim.lr_scheduler.StepLR(opt, step_size=15, gamma=0.5)
    best_acc, best_state = 0.0, None
    for ep in range(tb.EPOCHS):
        model.train()
        for X, y in tr_dl:
            loss = crit(model(X), y)
            opt.zero_grad(); loss.backward(); opt.step()
        model.eval(); correct = total = 0
        with torch.no_grad():
            for X, y in va_dl:
                correct += (model(X).argmax(1) == y).sum().item(); total += len(y)
        acc = correct / total if total else 0
        sched.step()
        if acc > best_acc:
            best_acc = acc; best_state = copy.deepcopy(model.state_dict())
    model.load_state_dict(best_state)
    return model.eval(), best_acc


class TorchSess:
    """Shim que imita ort.InferenceSession.run para um modelo torch."""
    def __init__(self, model): self.model = model
    def run(self, _out, feeds):
        with torch.no_grad():
            y = self.model(torch.tensor(feeds["state"])).numpy()
        return [y]


# ── Avaliação emergente (self-play) ──────────────────────────────────────────
def eval_aggression(move_sess, n_games):
    tot_atk = 0; dmg_games = []; contact = []; decisive = 0; turns_l = []
    for _ in range(n_games):
        units = [sim.make_unit(t, s) for t, specs in sim.OOB.items() for s in specs]
        uid = {u["id"]: u for u in units}
        dmg_total = 0.0; winner = None; turn = 1
        for turn in range(1, sim.MAX_TURNS + 1):
            for _half in range(2):
                blue = [u for u in units if u["team"]=="blue" and u["hp"]>0]
                red  = [u for u in units if u["team"]=="red"  and u["hp"]>0]
                if not blue or not red: break
                bm = bvb.nn_move("blue", [u for u in blue if sim.fuel_ok(u)], units, move_sess)
                sim._apply_moves(units, bm, "blue"); sim._sync_opsesp(units)
                red2 = [u for u in units if u["team"]=="red" and u["hp"]>0 and sim.fuel_ok(u)]
                rm = bvb.nn_move("red", red2, units, move_sess)
                sim._apply_moves(units, rm, "red"); sim._sync_opsesp(units)
                c = 0
                for team in ("blue","red"):
                    mine=[u for u in units if u["team"]==team and u["hp"]>0]
                    for e in [x for x in units if x["team"]!=team and x["hp"]>0]:
                        if any(sim.hex_dist(u["col"],u["row"],e["col"],e["row"])
                               <=(u.get("atr") or {}).get(e["cat"],0) for u in mine): c+=1
                contact.append(c)
                ba = bvb.nn_attack("blue",[u for u in units if u["team"]=="blue" and u["hp"]>0],units,FIXED_ATTACK)
                ra = bvb.nn_attack("red", [u for u in units if u["team"]=="red"  and u["hp"]>0],units,FIXED_ATTACK)
                tot_atk += len(ba)+len(ra)
                for atk in ba+ra:
                    att=uid.get(atk["attackerId"]); tgt=uid.get(atk["targetId"])
                    if att and tgt and att["hp"]>0 and tgt["hp"]>0:
                        dmg_total += sim.resolve_attack(att,tgt,atk.get("amount"))
                for u in units: u["moved"]=False
                sim.reset_fuel_counters(units); sim.recover_fuel(units)
                sim.recover_aircraft(units); sim._sync_opsesp(units); sim._reload_weapons(units,turn)
                winner = sim.check_winner(units)
                if winner: break
            if winner: break
            if not any(u["hp"]>0 for u in units if u["team"]=="blue"): break
            if not any(u["hp"]>0 for u in units if u["team"]=="red"): break
        if winner: decisive += 1
        dmg_games.append(dmg_total); turns_l.append(turn)
    return {
        "atk_per_game": tot_atk / n_games,
        "dmg_per_game": float(np.mean(dmg_games)),
        "decisive_pct": 100 * decisive / n_games,
        "contact_per_phase": float(np.mean(contact)),
        "avg_turns": float(np.mean(turns_l)),
    }


if __name__ == "__main__":
    results = {}
    for n_human in CONDITIONS:
        samples = build_move_samples(n_human)
        print(f"\n===== CONDIÇÃO: {n_human} partidas humanas — {len(samples)} amostras de move =====")
        reps = []
        for seed in SEEDS:
            model, acc = train_move_net(samples, seed)
            m = eval_aggression(TorchSess(model), EVAL_GAMES)
            m["val_acc"] = round(100*acc, 1)
            reps.append(m)
            print(f"  seed {seed:3d}: val={m['val_acc']:.1f}%  ataques/jogo={m['atk_per_game']:.1f}  "
                  f"dano/jogo={m['dmg_per_game']:.1f}  decisiva={m['decisive_pct']:.1f}%  "
                  f"contato/fase={m['contact_per_phase']:.2f}  turnos={m['avg_turns']:.1f}")
        results[n_human] = reps

    print("\n\n===== RESUMO (média ± desvio-padrão entre réplicas) =====")
    def ms(vals): return f"{np.mean(vals):.1f} ± {np.std(vals):.1f}"
    print(f"{'cond':>6} | {'ataques/jogo':>16} | {'dano/jogo':>16} | {'decisiva%':>16} | {'contato/fase':>16}")
    for n_human in CONDITIONS:
        r = results[n_human]
        print(f"{n_human:>6} | {ms([x['atk_per_game'] for x in r]):>16} | "
              f"{ms([x['dmg_per_game'] for x in r]):>16} | "
              f"{ms([x['decisive_pct'] for x in r]):>16} | "
              f"{ms([x['contact_per_phase'] for x in r]):>16}")

    out = SP / "variance_study_results.json"
    out.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"\n[OK] Resultados brutos: {out}")
