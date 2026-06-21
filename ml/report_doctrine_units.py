"""
report_doctrine_units.py — Desempenho por unidade segundo as combinações de
doutrina (postura x formação) do motor heurístico, para uso em artigo
acadêmico.

Reaproveita o mesmo desenho do experimento 2x2 de ml/analyze_doctrine.py
(mesma combinação de postura/formação aplicada simetricamente aos dois
times, demais eixos e estratégia base sorteados), mas em vez de agregados
por equipe, coleta estatísticas por unidade (sobrevivência, dano
causado/sofrido, abates, tiros, acerto%, movimentos, combustível e
munição remanescentes) — reaproveitando a classe EvalStats já usada na
avaliação self-play da rede neural (ml/bot_vs_bot.py).

Uso:
    python ml/report_doctrine_units.py
"""
from __future__ import annotations
import json, pathlib, random, sys
from datetime import date

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import bot_vs_bot as bvb
import simulate_games as sim
import analyze_doctrine as ad   # reusa make_doctrine(), POSTURES, FORMATIONS, label()

OUT_DIR        = pathlib.Path(__file__).parent.parent / "data" / "eval"
GAMES_PER_CELL = 150
STRATS         = ["aggressive", "defensive", "flanking"]

# ── Réplica do laço de simulate_game(), heurístico, com coleta de stats ──────

def simulate_heuristic_game(blue_strat: str, red_strat: str, noise: float,
                             blue_doc: dict, red_doc: dict, stats: bvb.EvalStats):
    units = [sim.make_unit(team, spec) for team, specs in sim.OOB.items() for spec in specs]
    uid_map = {u["id"]: u for u in units}
    winner = None; reason = None; turn = 1

    for turn in range(1, sim.MAX_TURNS + 1):
        for half in range(2):
            blue_units = [u for u in units if u["team"] == "blue" and u["hp"] > 0]
            red_units  = [u for u in units if u["team"] == "red"  and u["hp"] > 0]
            if not blue_units or not red_units:
                break

            blue_moves = sim.strategy_moves(blue_strat, "blue",
                                            [u for u in blue_units if sim.fuel_ok(u)],
                                            units, noise, blue_doc)
            for mv in blue_moves: stats.record_move(mv["unitId"])
            sim._apply_moves(units, blue_moves, "blue")
            sim._sync_opsesp(units)

            red_units2 = [u for u in units if u["team"] == "red" and u["hp"] > 0 and sim.fuel_ok(u)]
            red_moves = sim.strategy_moves(red_strat, "red", red_units2, units, noise, red_doc)
            for mv in red_moves: stats.record_move(mv["unitId"])
            sim._apply_moves(units, red_moves, "red")
            sim._sync_opsesp(units)

            blue_atks = sim.strategy_attacks(blue_strat, "blue",
                                             [u for u in units if u["team"] == "blue" and u["hp"] > 0],
                                             units, turn, blue_doc)
            red_atks  = sim.strategy_attacks(red_strat, "red",
                                             [u for u in units if u["team"] == "red" and u["hp"] > 0],
                                             units, turn, red_doc)
            for atk in blue_atks + red_atks:
                att = uid_map.get(atk["attackerId"]); tgt = uid_map.get(atk["targetId"])
                if att and tgt and att["hp"] > 0 and tgt["hp"] > 0:
                    stats.record_shot(att["id"])
                    before = tgt["hp"]
                    dmg = sim.resolve_attack(att, tgt, atk.get("amount"))
                    stats.record_damage(att["id"], tgt["id"], att["team"], dmg,
                                        killed=(before > 0 and tgt["hp"] <= 0))

            for u in units: u["moved"] = False
            sim.reset_fuel_counters(units)
            sim.recover_fuel(units)
            sim.recover_aircraft(units)
            sim._sync_opsesp(units)
            sim._reload_weapons(units, turn)

            winner = sim.check_winner(units)
            if winner: reason = "victory"; break
        if winner: break
        blue_alive = any(u["hp"] > 0 for u in units if u["team"] == "blue")
        red_alive  = any(u["hp"] > 0 for u in units if u["team"] == "red")
        if not blue_alive or not red_alive: break

    if not winner:
        blue_hp = sum(u["hp"] for u in units if u["team"] == "blue")
        red_hp  = sum(u["hp"] for u in units if u["team"] == "red")
        winner = "blue" if blue_hp >= red_hp else "red"
        reason = "timeout"

    stats.record_game_end(units, winner, reason, turn)

# ── Execução por célula (postura x formação) ─────────────────────────────────

def run_cell(posture: str, formation: str, n: int):
    stats_all     = bvb.EvalStats()
    stats_victory = bvb.EvalStats()
    for i in range(n):
        blue_doc = ad.make_doctrine(posture, formation)
        red_doc  = ad.make_doctrine(posture, formation)
        bs, rs = random.choice(STRATS), random.choice(STRATS)
        noise = random.uniform(0.1, 0.4)
        g = bvb.EvalStats()
        simulate_heuristic_game(bs, rs, noise, blue_doc, red_doc, g)
        g.merge_into(stats_all)
        reason = next(iter(g.reasons))
        if reason == "victory":
            g.merge_into(stats_victory)
    return stats_all, stats_victory

# ── Markdown ───────────────────────────────────────────────────────────────────

def fmt_dict(d: dict, suffix: str = "") -> str:
    return ", ".join(f"{k}={v}{suffix}" for k, v in d.items()) if d else "—"

def md_unit_table(units: list[dict]) -> str:
    hdr = ("| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | "
           "Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |")
    sep = "|---|---|---|---|---|---|---|---|---|---|---|---|"
    rows = [hdr, sep]
    for r in units:
        rows.append(
            f"| {r['id']} | {r['team']} | {r['category']} | {r['survival_pct']} | "
            f"{r['damage_dealt_avg']} | {r['damage_taken_avg']} | {r['kills_avg']} | "
            f"{r['shots_avg']} | {r['hit_pct'] if r['hit_pct'] is not None else '—'} | "
            f"{r['moves_avg']} | {r.get('fuel_pct_remaining_avg','—')} | "
            f"{r.get('ammo_pct_remaining_avg','—')} |"
        )
    return "\n".join(rows)

def build_markdown(results: dict) -> str:
    today = date.today().isoformat()
    parts = [
        "# Desempenho por Unidade — Combinações de Doutrina (Postura x Formação)\n",
        f"_Gerado em {today}_\n",
        "## Metodologia\n",
        "Partidas espelhadas: a mesma combinação de **postura** (ofensiva/defensiva) e "
        "**formação** (concentrada/dividida) é aplicada simetricamente às equipes azul e "
        "vermelha em cada célula, isolando o efeito desse par de eixos sobre o desempenho "
        f"individual das unidades. Os demais eixos de doutrina (engajamento, política de "
        "combustível) e a estratégia base (`aggressive`/`defensive`/`flanking`) são "
        f"sorteados aleatoriamente por partida. {GAMES_PER_CELL} partidas por célula "
        f"({GAMES_PER_CELL * 4} partidas no total), usando o motor heurístico de "
        "`ml/simulate_games.py` (mesmo gerador dos dados de treino). Cada célula é "
        "reportada em dois recortes: **geral** (todas as partidas) e **vitória decisiva** "
        "(somente partidas concluídas por objetivo de cenário, excluindo o desempate de "
        "timeout por soma de HP).\n",
    ]

    for (posture, formation), (stats_all, stats_victory) in results.items():
        label = ad.label(posture, formation)
        parts.append(f"## {label}\n")
        report_all     = bvb.build_report(stats_all)
        report_victory = bvb.build_report(stats_victory) if stats_victory.games else None

        for sub, rep in (("Geral (todas as partidas)", report_all),
                         ("Somente vitória decisiva", report_victory)):
            parts.append(f"### {sub}\n")
            if rep is None or rep["games"] == 0:
                parts.append("_Sem partidas nesta categoria._\n")
                continue
            parts.append(f"- Partidas: **{rep['games']}**")
            parts.append(f"- Taxa de vitória: {fmt_dict(rep['win_rate'], '%')}")
            parts.append(f"- Motivo de conclusão: {fmt_dict(rep['win_reason'], '%')}")
            parts.append(f"- Duração média: {rep['avg_turns']} turnos")
            parts.append(f"- Dano médio causado por equipe (pontos de HP): {fmt_dict(rep['team_avg_damage_dealt'])}")
            parts.append(f"- Unidades perdidas em média: {fmt_dict(rep['team_avg_units_lost'])}")
            parts.append("")
            parts.append(md_unit_table(rep["units"]))
            parts.append("")

    return "\n".join(parts)


if __name__ == "__main__":
    results = {}
    for posture in ad.POSTURES:
        for formation in ad.FORMATIONS:
            print(f"── Simulando: {ad.label(posture, formation)} ({GAMES_PER_CELL} partidas) ──")
            results[(posture, formation)] = run_cell(posture, formation, GAMES_PER_CELL)

    md = build_markdown(results)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    md_path = OUT_DIR / "relatorio_unidades_por_doutrina.md"
    md_path.write_text(md, encoding="utf-8")
    print(f"\n[OK] Relatório salvo em {md_path}")

    raw = {
        f"{p}|{f}": {
            "all":     bvb.build_report(sa),
            "victory": bvb.build_report(sv) if sv.games else None,
        }
        for (p, f), (sa, sv) in results.items()
    }
    raw_path = OUT_DIR / "unidades_por_doutrina_data.json"
    raw_path.write_text(json.dumps(raw, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[OK] Dados brutos salvos em {raw_path}")
