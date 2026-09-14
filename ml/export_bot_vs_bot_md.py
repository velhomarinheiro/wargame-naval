"""
export_bot_vs_bot_md.py — Exporta data/eval/bot_vs_bot_report.json como um
relatório Markdown formatado (resultados gerais + eficácia/eficiência por
unidade de cada equipe), para uso em artigo.

Uso:
    python ml/export_bot_vs_bot_md.py
"""
from __future__ import annotations
import json, pathlib
from datetime import date

EVAL = pathlib.Path(__file__).parent.parent / "data" / "eval"
SRC = EVAL / "bot_vs_bot_report.json"
OUT = EVAL / "relatorio_bot_vs_bot.md"


def unit_row(u: dict) -> str:
    hp = u["hit_pct"] if u["hit_pct"] is not None else "—"
    return (f"| {u['id']} | {u['category']} | {u['survival_pct']} | "
            f"{u['damage_dealt_avg']} | {u['damage_taken_avg']} | {u['kills_avg']} | "
            f"{u['shots_avg']} | {hp} | {u['moves_avg']} |")


UNIT_HDR = ("| Unidade | Categoria | Sobrev.% | Dano+/jogo | Dano−/jogo | "
            "Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo |")
UNIT_SEP = "|---|---|---|---|---|---|---|---|---|"


def build(d: dict) -> str:
    n = d["games"]
    P = [
        "# Estatísticas Bot × Bot (self-play NN) — Eficácia e Eficiência por Unidade\n",
        f"_Gerado em {date.today().isoformat()} · {n} partidas · "
        "modelos `move_net`/`attack_net` treinados com 120 partidas sintéticas + "
        "15 reais (oversampling 5×)._\n",
        "## 1. Resultados gerais\n",
        "| Métrica | Blue | Red |",
        "|---|---|---|",
        f"| Taxa de vitória | {d['win_rate'].get('blue',0)}% | {d['win_rate'].get('red',0)}% |",
        f"| Dano médio causado (HP/partida) | {d['team_avg_damage_dealt'].get('blue',0)} | {d['team_avg_damage_dealt'].get('red',0)} |",
        f"| Perdas médias (unidades/partida) | {d['team_avg_units_lost'].get('blue',0)} | {d['team_avg_units_lost'].get('red',0)} |",
        "",
        f"- **Motivo de conclusão:** " + ", ".join(f"{k}={v}%" for k, v in d["win_reason"].items()),
        f"- **Duração média:** {d['avg_turns']} turnos",
        "",
        "> **Leitura:** Red concentra o poder de fogo (dano ~4× o de Blue) mas Blue "
        "vence a maioria — pela assimetria das condições de vitória e pelo desempate "
        "de *timeout* por soma de HP (inflado pelos ativos terrestres estáticos de "
        "Blue, que quase não são atingidos).\n",
    ]

    wbr = d.get("win_by_reason")
    if wbr:
        P.append("### 1.1. Vencedor por motivo de conclusão\n")
        P.append("| Motivo | Partidas | % do total | Vitória Blue% | Vitória Red% |")
        P.append("|---|---|---|---|---|")
        order = [k for k in ("victory", "timeout") if k in wbr] + \
                [k for k in wbr if k not in ("victory", "timeout")]
        label = {"victory": "Por objetivo (decisiva)", "timeout": "Por timeout (soma de HP)"}
        for r in order:
            w = wbr[r]
            P.append(f"| {label.get(r, r)} | {w['games']} | {w['pct_of_all']}% | "
                     f"{w['win_rate'].get('blue', 0)}% | {w['win_rate'].get('red', 0)}% |")
        P.append("")
        vic = wbr.get("victory", {}).get("win_rate", {})
        if vic:
            P.append(f"> **Nas partidas vencidas por objetivo** (mérito tático real), "
                     f"Red vence **{vic.get('red', 0)}%** e Blue **{vic.get('blue', 0)}%** — "
                     "o inverso do placar geral. A vantagem agregada de Blue vem "
                     "inteiramente do desempate de *timeout*.\n")

    units = d["units"]
    for team, title in (("red", "RED (agressor)"), ("blue", "BLUE (defensor)")):
        us = sorted([u for u in units if u["team"] == team],
                    key=lambda x: -x["damage_dealt_avg"])
        P.append(f"## 2. Eficácia/eficiência por unidade — {title}\n")
        P.append("_Ordenado por dano causado por partida._\n")
        P.append(UNIT_HDR); P.append(UNIT_SEP)
        P.extend(unit_row(u) for u in us)
        P.append("")

    # Unidades mais visadas (maior dano sofrido) — panorama de vulnerabilidade
    P.append("## 3. Unidades mais visadas (maior dano sofrido por partida)\n")
    P.append("| Unidade | Equipe | Categoria | Dano−/jogo | Sobrev.% |")
    P.append("|---|---|---|---|---|")
    for u in sorted(units, key=lambda x: -x["damage_taken_avg"])[:12]:
        P.append(f"| {u['id']} | {u['team']} | {u['category']} | "
                 f"{u['damage_taken_avg']} | {u['survival_pct']} |")
    P.append("")

    P.append("## Notas\n")
    P.append("- **Dano+/jogo**: HP retirado de inimigos por partida (eficácia ofensiva). "
             "**Dano−/jogo**: HP perdido por partida (vulnerabilidade). **Acerto%**: "
             "fração de engajamentos com dano efetivo (eficiência de tiro). "
             "**Mov./jogo**: movimentos declarados por partida (atividade).\n")
    P.append("- As médias por unidade são estáveis com este N; a **taxa de vitória "
             "decisiva** carrega variância de treino de ~±20 pontos (ver "
             "`estudo_variancia_agressividade.md`) — trate-a como ponto amostral de "
             "um conjunto de modelos, não como constante do sistema.\n")
    return "\n".join(P)


if __name__ == "__main__":
    d = json.loads(SRC.read_text(encoding="utf-8"))
    OUT.write_text(build(d), encoding="utf-8")
    print(f"[OK] {OUT} ({d['games']} partidas, {len(d['units'])} unidades)")
