"""
report_doctrine_cross.py — Desempenho por unidade em configurações CRUZADAS
de postura x formação entre as equipes azul e vermelha (motor heurístico).

Diferente de ml/report_doctrine_units.py (mesma combinação espelhada nos
dois times), aqui cada equipe pode adotar uma combinação diferente de
postura/formação — desenho fatorial completo 4x4 = 16 confrontos.

Uso:
    python ml/report_doctrine_cross.py
"""
from __future__ import annotations
import json, pathlib, random, sys
from datetime import date

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import bot_vs_bot as bvb
import simulate_games as sim
import analyze_doctrine as ad
from report_doctrine_units import simulate_heuristic_game, fmt_dict, md_unit_table

OUT_DIR        = pathlib.Path(__file__).parent.parent / "data" / "eval"
GAMES_PER_CELL = 150
STRATS         = ["aggressive", "defensive", "flanking"]
COMBOS         = [(p, f) for p in ad.POSTURES for f in ad.FORMATIONS]  # 4 combinações


def run_cross_cell(blue_combo: tuple[str, str], red_combo: tuple[str, str], n: int):
    stats_all     = bvb.EvalStats()
    stats_victory = bvb.EvalStats()
    for i in range(n):
        blue_doc = ad.make_doctrine(*blue_combo)
        red_doc  = ad.make_doctrine(*red_combo)
        bs, rs = random.choice(STRATS), random.choice(STRATS)
        noise = random.uniform(0.1, 0.4)
        g = bvb.EvalStats()
        simulate_heuristic_game(bs, rs, noise, blue_doc, red_doc, g)
        g.merge_into(stats_all)
        reason = next(iter(g.reasons))
        if reason == "victory":
            g.merge_into(stats_victory)
    return stats_all, stats_victory


def build_markdown(results: dict) -> str:
    today = date.today().isoformat()
    parts = [
        "# Desempenho por Unidade — Configurações Cruzadas de Doutrina "
        "(Blue x Red, Postura x Formação)\n",
        f"_Gerado em {today}_\n",
        "## Metodologia\n",
        "Desenho fatorial completo: cada equipe adota, de forma independente, uma das 4 "
        "combinações de **postura** (ofensiva/defensiva) x **formação** "
        "(concentrada/dividida) — totalizando 4×4 = 16 confrontos possíveis. Diferente do "
        "experimento espelhado anterior (`ml/report_doctrine_units.py`), aqui as equipes "
        "podem adotar combinações *diferentes* entre si, permitindo avaliar qual doutrina "
        "de Blue se sai melhor contra qual doutrina de Red. Os demais eixos (engajamento, "
        "política de combustível) e a estratégia base (`aggressive`/`defensive`/`flanking`) "
        f"são sorteados aleatoriamente por partida. {GAMES_PER_CELL} partidas por confronto "
        f"({GAMES_PER_CELL * len(COMBOS) * len(COMBOS)} partidas no total). Cada confronto é "
        "reportado em dois recortes: **geral** (todas as partidas) e **vitória decisiva** "
        "(somente partidas concluídas por objetivo de cenário, excluindo o desempate de "
        "timeout por soma de HP).\n",
    ]

    # Matriz-resumo 4x4 de taxa de vitória (geral)
    parts.append("## Matriz-resumo — Taxa de vitória geral (Blue% / Red%)\n")
    header = "| Blue \\ Red | " + " | ".join(ad.label(*rc) for rc in COMBOS) + " |"
    sep = "|" + "---|" * (len(COMBOS) + 1)
    parts.append(header)
    parts.append(sep)
    for bc in COMBOS:
        row = [ad.label(*bc)]
        for rc in COMBOS:
            stats_all, _ = results[(bc, rc)]
            rep = bvb.build_report(stats_all)
            b = rep["win_rate"].get("blue", 0.0)
            r = rep["win_rate"].get("red", 0.0)
            row.append(f"{b}% / {r}%")
        parts.append("| " + " | ".join(row) + " |")
    parts.append("")

    parts.append("## Matriz-resumo — Taxa de vitória somente decisiva (Blue% / Red%)\n")
    parts.append(header)
    parts.append(sep)
    for bc in COMBOS:
        row = [ad.label(*bc)]
        for rc in COMBOS:
            _, stats_victory = results[(bc, rc)]
            if stats_victory.games:
                rep = bvb.build_report(stats_victory)
                b = rep["win_rate"].get("blue", 0.0)
                r = rep["win_rate"].get("red", 0.0)
                row.append(f"{b}% / {r}% (n={stats_victory.games})")
            else:
                row.append("—")
        parts.append("| " + " | ".join(row) + " |")
    parts.append("")

    # Detalhamento por confronto
    for bc in COMBOS:
        for rc in COMBOS:
            stats_all, stats_victory = results[(bc, rc)]
            parts.append(f"## Blue: {ad.label(*bc)} × Red: {ad.label(*rc)}\n")
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
    total_cells = len(COMBOS) * len(COMBOS)
    done = 0
    for bc in COMBOS:
        for rc in COMBOS:
            done += 1
            print(f"── Simulando [{done}/{total_cells}]: Blue {ad.label(*bc)} × "
                  f"Red {ad.label(*rc)} ({GAMES_PER_CELL} partidas) ──")
            results[(bc, rc)] = run_cross_cell(bc, rc, GAMES_PER_CELL)

    md = build_markdown(results)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    md_path = OUT_DIR / "relatorio_unidades_doutrina_cruzada.md"
    md_path.write_text(md, encoding="utf-8")
    print(f"\n[OK] Relatório salvo em {md_path}")

    raw = {
        f"blue={bc[0]}|{bc[1]}__red={rc[0]}|{rc[1]}": {
            "all":     bvb.build_report(sa),
            "victory": bvb.build_report(sv) if sv.games else None,
        }
        for (bc, rc), (sa, sv) in results.items()
    }
    raw_path = OUT_DIR / "unidades_doutrina_cruzada_data.json"
    raw_path.write_text(json.dumps(raw, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[OK] Dados brutos salvos em {raw_path}")
