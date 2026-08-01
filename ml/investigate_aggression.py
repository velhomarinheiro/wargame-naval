"""
investigate_aggression.py — Por que o bot retreinado ficou menos agressivo?

Isola o efeito de cada rede (move_net vs attack_net) medindo, sobre um MESMO
conjunto de estados de jogo, como as redes ANTIGA (pré-retreino, backup) e NOVA
(pós-retreino, com as 8 partidas humanas) decidem.

Estados de teste: coletados de partidas self-play dirigidas pelos modelos
ANTIGOS (que engajam), capturando o estado completo (com atr/mov/cat) logo antes
de cada fase de movimento e de combate. Sobre cada estado replicamos as duas
redes, sem divergência de trajetória.

Métricas:
  - attack_net: nº de ataques que nn_attack declararia; nº de células do top-30
    que caem sobre um inimigo em alcance; entropia dos logits.
  - move_net: avanço médio (variação da distância ao inimigo mais próximo, <0 =
    aproxima); nº de células do top-30 a ≤3 hexes de algum inimigo; entropia.

Os modelos ANTIGOS (pré-retreino) são recuperados do commit d49eaf8:
    OLD=<dir>; for m in move_net attack_net; do
      git show d49eaf8:ml/models/$m.onnx      > "$OLD/$m.onnx"
      git show d49eaf8:ml/models/$m.onnx.data > "$OLD/$m.onnx.data"   # sidecar!
    done
e o caminho é apontado por STALE abaixo. (O .onnx referencia o .onnx.data por
nome relativo, então os dois precisam ficar juntos no mesmo diretório.)

Uso:
    python ml/investigate_aggression.py [--games 40]
"""
from __future__ import annotations
import sys, pathlib, copy, argparse
sys.argv = [sys.argv[0]]  # evita que o argparse de bot_vs_bot capture nossos args
import numpy as np
import onnxruntime as ort

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import bot_vs_bot as bvb
import simulate_games as sim

STALE = pathlib.Path("/tmp/claude-0/-home-user-wargame-naval/"
                     "4ace9329-a0db-5c11-95a2-e5858d91d793/scratchpad/old_models")
NEW = pathlib.Path(__file__).parent / "models"

_ap = argparse.ArgumentParser()
_ap.add_argument("--games", type=int, default=40)
A = _ap.parse_args(sys.argv[1:] if False else [])  # default 40

def sess(p):
    return ort.InferenceSession(str(p))

old_move = sess(STALE / "move_net.onnx")
old_atk  = sess(STALE / "attack_net.onnx")
new_move = sess(NEW / "move_net.onnx")
new_atk  = sess(NEW / "attack_net.onnx")

# ── Coleta de estados dirigida pelos modelos ANTIGOS ─────────────────────────
def collect_states(n_games: int):
    atk_states, mov_states = [], []
    for g in range(n_games):
        units = [sim.make_unit(team, spec)
                 for team, specs in sim.OOB.items() for spec in specs]
        uid_map = {u["id"]: u for u in units}
        winner = None
        for turn in range(1, sim.MAX_TURNS + 1):
            for half in range(2):
                blue = [u for u in units if u["team"] == "blue" and u["hp"] > 0]
                red  = [u for u in units if u["team"] == "red"  and u["hp"] > 0]
                if not blue or not red: break
                # snapshot pré-movimento
                mov_states.append(copy.deepcopy(units))
                bm = bvb.nn_move("blue", [u for u in blue if sim.fuel_ok(u)], units, old_move)
                sim._apply_moves(units, bm, "blue"); sim._sync_opsesp(units)
                red2 = [u for u in units if u["team"] == "red" and u["hp"] > 0 and sim.fuel_ok(u)]
                rm = bvb.nn_move("red", red2, units, old_move)
                sim._apply_moves(units, rm, "red"); sim._sync_opsesp(units)
                # snapshot pré-combate
                atk_states.append(copy.deepcopy(units))
                ba = bvb.nn_attack("blue", [u for u in units if u["team"]=="blue" and u["hp"]>0], units, old_atk)
                ra = bvb.nn_attack("red",  [u for u in units if u["team"]=="red"  and u["hp"]>0], units, old_atk)
                for atk in ba + ra:
                    att = uid_map.get(atk["attackerId"]); tgt = uid_map.get(atk["targetId"])
                    if att and tgt and att["hp"]>0 and tgt["hp"]>0:
                        sim.resolve_attack(att, tgt, atk.get("amount"))
                for u in units: u["moved"] = False
                sim.reset_fuel_counters(units); sim.recover_fuel(units)
                sim.recover_aircraft(units); sim._sync_opsesp(units)
                sim._reload_weapons(units, turn)
                winner = sim.check_winner(units)
                if winner: break
            if winner: break
            if not any(u["hp"]>0 for u in units if u["team"]=="blue"): break
            if not any(u["hp"]>0 for u in units if u["team"]=="red"): break
    return mov_states, atk_states

# ── Métricas ──────────────────────────────────────────────────────────────────
def entropy(logits):
    z = np.asarray(logits).reshape(-1).astype(np.float64)
    z -= z.max()
    p = np.exp(z); p /= p.sum()
    return float(-(p * np.log(p + 1e-12)).sum())

def top30_cells(sess_, units):
    logits = sess_.run(None, {"state": bvb.state_to_tensor(units)})[0]
    return logits, bvb._ranked_cells(logits)[:30]

def attack_metrics(sess_, units):
    n_atk = 0
    for team in ("blue", "red"):
        atks = bvb.nn_attack(team, [u for u in units if u["team"]==team and u["hp"]>0], units, sess_)
        n_atk += len(atks)
    logits, ranked = top30_cells(sess_, units)
    enemy_pos_by_team = {
        "blue": {(e["col"],e["row"]) for e in units if e["team"]=="red"  and e["hp"]>0},
        "red":  {(e["col"],e["row"]) for e in units if e["team"]=="blue" and e["hp"]>0},
    }
    all_enemy = enemy_pos_by_team["blue"] | enemy_pos_by_team["red"]
    top_on_enemy = sum(1 for _,c,r in ranked if (c,r) in all_enemy)
    return n_atk, top_on_enemy, entropy(logits)

def move_metrics(sess_, units):
    logits, ranked = top30_cells(sess_, units)
    # avanço: para cada unidade móvel, dist ao inimigo mais próximo antes e no destino escolhido
    advances = []
    for team in ("blue", "red"):
        movers = [u for u in units if u["team"]==team and u["hp"]>0 and u.get("mov",0)>0 and sim.fuel_ok(u)]
        enemies = [e for e in units if e["team"]!=team and e["hp"]>0]
        if not enemies: continue
        occupied = {(u["col"],u["row"]) for u in units if u["hp"]>0}
        for u in movers:
            d0 = min(sim.hex_dist(u["col"],u["row"],e["col"],e["row"]) for e in enemies)
            dest = None
            for _,col,row in ranked:
                if col==u["col"] and row==u["row"]: continue
                if not sim.can_enter(u["cat"], col, row): continue
                if sim.hex_dist(u["col"],u["row"],col,row) > u["mov"]: continue
                path = sim.bfs(u["cat"], u["col"], u["row"], col, row, u["mov"], occupied)
                if path and len(path)>=2:
                    dest = (col,row); break
            if dest:
                d1 = min(sim.hex_dist(dest[0],dest[1],e["col"],e["row"]) for e in enemies)
                advances.append(d1 - d0)  # <0 = aproximou
    enemy_all = {(e["col"],e["row"]) for e in units if e["hp"]>0}
    def near_enemy(c,r):
        return any(sim.hex_dist(c,r,ec,er)<=3 for ec,er in enemy_all)
    top_near = sum(1 for _,c,r in ranked if near_enemy(c,r))
    return advances, top_near, entropy(logits)

# ── Comportamento EMERGENTE: self-play completo com cada conjunto de modelos ──
def measure_emergent(move_sess, attack_sess, n_games: int):
    tot_atk = tot_mov = 0
    contact_samples = []      # nº de inimigos em alcance de algum amigo, por fase
    mobility_samples = []     # fração de unidades móveis que de fato se moveram
    turns_list = []
    for g in range(n_games):
        units = [sim.make_unit(team, spec)
                 for team, specs in sim.OOB.items() for spec in specs]
        uid_map = {u["id"]: u for u in units}
        winner = None; turn = 1
        for turn in range(1, sim.MAX_TURNS + 1):
            for half in range(2):
                blue = [u for u in units if u["team"]=="blue" and u["hp"]>0]
                red  = [u for u in units if u["team"]=="red"  and u["hp"]>0]
                if not blue or not red: break
                movable = [u for u in units if u["hp"]>0 and u.get("mov",0)>0 and sim.fuel_ok(u)]
                bm = bvb.nn_move("blue", [u for u in blue if sim.fuel_ok(u)], units, move_sess)
                sim._apply_moves(units, bm, "blue"); sim._sync_opsesp(units)
                red2 = [u for u in units if u["team"]=="red" and u["hp"]>0 and sim.fuel_ok(u)]
                rm = bvb.nn_move("red", red2, units, move_sess)
                sim._apply_moves(units, rm, "red"); sim._sync_opsesp(units)
                tot_mov += len(bm) + len(rm)
                if movable:
                    mobility_samples.append((len(bm)+len(rm))/max(1,len(movable)))
                # contato: nº de inimigos dentro do alcance de ataque de algum amigo
                contact = 0
                for team in ("blue","red"):
                    mine = [u for u in units if u["team"]==team and u["hp"]>0]
                    foes = [e for e in units if e["team"]!=team and e["hp"]>0]
                    for e in foes:
                        if any(sim.hex_dist(u["col"],u["row"],e["col"],e["row"])
                               <= (u.get("atr") or {}).get(e["cat"],0) for u in mine):
                            contact += 1
                contact_samples.append(contact)
                ba = bvb.nn_attack("blue",[u for u in units if u["team"]=="blue" and u["hp"]>0],units,attack_sess)
                ra = bvb.nn_attack("red", [u for u in units if u["team"]=="red"  and u["hp"]>0],units,attack_sess)
                tot_atk += len(ba)+len(ra)
                for atk in ba+ra:
                    att=uid_map.get(atk["attackerId"]); tgt=uid_map.get(atk["targetId"])
                    if att and tgt and att["hp"]>0 and tgt["hp"]>0:
                        sim.resolve_attack(att,tgt,atk.get("amount"))
                for u in units: u["moved"]=False
                sim.reset_fuel_counters(units); sim.recover_fuel(units)
                sim.recover_aircraft(units); sim._sync_opsesp(units); sim._reload_weapons(units,turn)
                winner = sim.check_winner(units)
                if winner: break
            if winner: break
            if not any(u["hp"]>0 for u in units if u["team"]=="blue"): break
            if not any(u["hp"]>0 for u in units if u["team"]=="red"): break
        turns_list.append(turn)
    return {
        "atk_per_game": tot_atk/n_games,
        "mov_per_game": tot_mov/n_games,
        "contact_per_phase": float(np.mean(contact_samples)),
        "mobility_rate": float(np.mean(mobility_samples)),
        "avg_turns": float(np.mean(turns_list)),
    }


if __name__ == "__main__":
    ng = 40
    print(f"Coletando estados de {ng} partidas dirigidas pelos modelos ANTIGOS...")
    mov_states, atk_states = collect_states(ng)
    print(f"  {len(mov_states)} estados pré-movimento, {len(atk_states)} pré-combate\n")

    # Ataque
    for lbl, s in [("ANTIGO", old_atk), ("NOVO", new_atk)]:
        na, te, en = [], [], []
        for units in atk_states:
            a, t, e = attack_metrics(s, units)
            na.append(a); te.append(t); en.append(e)
        print(f"[ATTACK_NET {lbl:6s}] ataques/estado={np.mean(na):.2f}  "
              f"top30_sobre_inimigo={np.mean(te):.2f}  entropia_logits={np.mean(en):.3f}")
    print()
    # Movimento
    for lbl, s in [("ANTIGO", old_move), ("NOVO", new_move)]:
        adv, near, en = [], [], []
        for units in mov_states:
            a, t, e = move_metrics(s, units)
            adv.extend(a); near.append(t); en.append(e)
        adv = np.array(adv)
        print(f"[MOVE_NET   {lbl:6s}] avanço_médio(Δdist,<0=aproxima)={adv.mean():.3f}  "
              f"%_movs_que_aproximam={100*np.mean(adv<0):.1f}%  "
              f"top30_perto_inimigo(≤3)={np.mean(near):.2f}  entropia_logits={np.mean(en):.3f}")

    print("\n── Comportamento EMERGENTE em self-play completo (40 jogos cada) ──")
    for lbl, ms, as_ in [("ANTIGO (par completo)", old_move, old_atk),
                         ("NOVO   (par completo)", new_move, new_atk),
                         ("NOVO move + ANTIGO atk", new_move, old_atk),
                         ("ANTIGO move + NOVO atk", old_move, new_atk)]:
        m = measure_emergent(ms, as_, 40)
        print(f"[{lbl:24s}] ataques/jogo={m['atk_per_game']:.1f}  mov/jogo={m['mov_per_game']:.1f}  "
              f"contato/fase={m['contact_per_phase']:.2f}  mobilidade={100*m['mobility_rate']:.1f}%  "
              f"turnos={m['avg_turns']:.1f}")
