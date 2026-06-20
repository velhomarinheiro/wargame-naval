"""
analyze_doctrine.py — Comparativo 2x2: postura (ofensiva/defensiva) x
formação (concentrada/dividida), para as equipes azul e vermelha.

Usa diretamente o motor heurístico de simulate_games.py, forçando a mesma
combinação de postura/formação para os dois times em cada célula (partida
espelhada), variando aleatoriamente estratégia base, engajamento, política
de combustível e ruído — para isolar o efeito do eixo postura x formação.

Execução:
    python ml/analyze_doctrine.py
"""
from __future__ import annotations
import json, pathlib, random, sys
from collections import defaultdict

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import simulate_games as sim

GAMES_PER_CELL = 150
STRATS = ["aggressive", "defensive", "flanking"]

POSTURES   = ["offensive", "defensive"]
FORMATIONS = ["concentrated", "dispersed"]


def make_doctrine(posture: str, formation: str) -> dict:
    return {
        "formation":   formation,
        "posture":     posture,
        "engagement":  random.choice(["simultaneous", "sequential"]),
        "fuel_policy": random.choice(["economize", "escort", "anchor"]),
    }


def run_cell(posture: str, formation: str, n: int) -> dict:
    wins = defaultdict(int)
    reasons = defaultdict(int)
    turns = []
    units_lost = defaultdict(list)
    dmg_taken = defaultdict(list)

    for i in range(n):
        blue_doc = make_doctrine(posture, formation)
        red_doc  = make_doctrine(posture, formation)
        bs, rs = random.choice(STRATS), random.choice(STRATS)
        noise = random.uniform(0.1, 0.4)
        _, evs = sim.simulate_game(i, bs, rs, noise, blue_doc, red_doc)
        over = json.loads(evs[-1])
        assert over["event"] == "game_over"
        wins[over["winner"]] += 1
        reasons[over["reason"]] += 1
        turns.append(over["turn"])
        state_units = over["state"]["units"]
        for team in ("blue", "red"):
            tu = [u for u in state_units if u["team"] == team]
            lost = sum(1 for u in tu if u["hp"] <= 0)
            dmg  = sum(max(0, u["maxHp"] - max(0, u["hp"])) for u in tu)
            units_lost[team].append(lost)
            dmg_taken[team].append(dmg)

    def avg(lst):
        return round(sum(lst) / len(lst), 2) if lst else 0.0

    return {
        "n": n,
        "win_pct": {k: round(100 * v / n, 1) for k, v in wins.items()},
        "reason_pct": {k: round(100 * v / n, 1) for k, v in reasons.items()},
        "avg_turns": avg(turns),
        "avg_units_lost": {t: avg(v) for t, v in units_lost.items()},
        "avg_dmg_taken": {t: avg(v) for t, v in dmg_taken.items()},
    }


def label(posture, formation):
    p = "Ofensiva" if posture == "offensive" else "Defensiva"
    f = "Concentrada" if formation == "concentrated" else "Dividida"
    return f"{p} / {f}"


if __name__ == "__main__":
    results = {}
    for posture in POSTURES:
        for formation in FORMATIONS:
            key = (posture, formation)
            print(f"── Simulando: {label(*key)} ({GAMES_PER_CELL} partidas) ──")
            results[key] = run_cell(posture, formation, GAMES_PER_CELL)

    print("\n" + "=" * 78)
    print("TABELA 2x2 — Vitórias Blue% / Red% por Postura x Formação")
    print("=" * 78)
    header = f"{'':14}" + "".join(f"{f'Form.: {f}':28}" for f in FORMATIONS)
    print(header)
    for posture in POSTURES:
        row = f"{('Postura: ' + posture):14}"
        for formation in FORMATIONS:
            r = results[(posture, formation)]
            b = r["win_pct"].get("blue", 0.0)
            rd = r["win_pct"].get("red", 0.0)
            row += f"{f'blue={b}% red={rd}%':28}"
        print(row)

    print("\nDetalhe por célula:")
    for posture in POSTURES:
        for formation in FORMATIONS:
            r = results[(posture, formation)]
            print(f"\n{label(posture, formation)} (n={r['n']}):")
            print(f"  vitórias:      {r['win_pct']}")
            print(f"  motivo:        {r['reason_pct']}")
            print(f"  turnos médios: {r['avg_turns']}")
            print(f"  unid. perdidas:{r['avg_units_lost']}")
            print(f"  dano sofrido:  {r['avg_dmg_taken']}")

    out_path = pathlib.Path(__file__).parent.parent / "data" / "eval" / "doctrine_2x2_report.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    serializable = {f"{p}|{f}": v for (p, f), v in results.items()}
    out_path.write_text(json.dumps(serializable, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n[OK] Relatório salvo em {out_path}")
