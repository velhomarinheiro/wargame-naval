"""
export_academic_report.py — Exporta relatório descritivo e estatístico das
partidas simuladas, para uso em artigo acadêmico.

Gera dois conjuntos de dados:
  1) Self-play do bot treinado (move_net.onnx + attack_net.onnx), réplica
     fiel da lógica de bot.js — sem doutrina, só inferência da rede.
  2) Self-play do motor heurístico de doutrina (simulate_games.py), com os
     5 fatores de decisão adicionados às heurísticas (formação, postura,
     engajamento, economia de munição, economia de combustível).

Para cada conjunto, calcula estatísticas (a) sobre todas as partidas e
(b) somente sobre partidas concluídas por vitória decisiva (reason=="victory",
excluindo o desempate por soma de HP no limite de turnos).

Uso:
    python ml/export_academic_report.py
"""
from __future__ import annotations
import json, pathlib, random, sys
from collections import Counter
from datetime import date

import onnxruntime as ort

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import bot_vs_bot as bvb
import simulate_games as sim

OUT_DIR = pathlib.Path(__file__).parent.parent / "data" / "eval"
N_NN    = 400
N_HEUR  = 400
STRATS  = ["aggressive", "defensive", "flanking"]

# ── Dataset 1: self-play da rede treinada (bot.js) ───────────────────────────

def run_nn_dataset(n: int):
    move_sess   = ort.InferenceSession(str(bvb.MODEL_DIR / "move_net.onnx"))
    attack_sess = ort.InferenceSession(str(bvb.MODEL_DIR / "attack_net.onnx"))
    stats_all      = bvb.EvalStats()
    stats_victory  = bvb.EvalStats()
    for i in range(n):
        g = bvb.EvalStats()
        bvb.simulate_nn_game(move_sess, attack_sess, g)
        g.merge_into(stats_all)
        reason = next(iter(g.reasons))
        if reason == "victory":
            g.merge_into(stats_victory)
        if (i + 1) % 100 == 0:
            print(f"  [NN self-play] {i+1}/{n} partidas")
    return stats_all, stats_victory

# ── Dataset 2: self-play do motor heurístico de doutrina ─────────────────────

def run_heuristic_dataset(n: int):
    records = []
    for i in range(n):
        bd = sim.random_doctrine()
        rd = sim.random_doctrine()
        bs, rs = random.choice(STRATS), random.choice(STRATS)
        noise = random.uniform(0.1, 0.4)
        _, evs = sim.simulate_game(i, bs, rs, noise, bd, rd)
        over = json.loads(evs[-1])
        state_units = over["state"]["units"]
        rec = {
            "winner": over["winner"], "reason": over["reason"], "turn": over["turn"],
            "blue_doctrine": bd, "red_doctrine": rd,
            "blue_strat": bs, "red_strat": rs,
        }
        for team in ("blue", "red"):
            tu = [u for u in state_units if u["team"] == team]
            rec[f"{team}_units_lost"] = sum(1 for u in tu if u["hp"] <= 0)
            rec[f"{team}_dmg_taken"]  = sum(max(0, u["maxHp"] - max(0, u["hp"])) for u in tu)
        records.append(rec)
        if (i + 1) % 100 == 0:
            print(f"  [Heurístico self-play] {i+1}/{n} partidas")
    return records


def aggregate_heuristic(records: list[dict]) -> dict | None:
    n = len(records)
    if n == 0:
        return None

    def pct(a, b): return round(100 * a / b, 1) if b else 0.0
    def avg(lst): return round(sum(lst) / len(lst), 2) if lst else 0.0

    wins    = Counter(r["winner"] for r in records)
    reasons = Counter(r["reason"] for r in records)
    turns   = [r["turn"] for r in records]

    out = {
        "n": n,
        "win_rate":   {k: pct(v, n) for k, v in wins.items()},
        "win_reason": {k: pct(v, n) for k, v in reasons.items()},
        "avg_turns":  avg(turns),
        "avg_units_lost": {t: avg([r[f"{t}_units_lost"] for r in records]) for t in ("blue", "red")},
        "avg_dmg_taken":  {t: avg([r[f"{t}_dmg_taken"] for r in records])  for t in ("blue", "red")},
        "doctrine_effect": {},
    }
    for team in ("blue", "red"):
        axis_effect = {}
        for axis in ("formation", "posture", "engagement", "fuel_policy"):
            values = sorted(set(r[f"{team}_doctrine"][axis] for r in records))
            axis_stat = {}
            for v in values:
                subset = [r for r in records if r[f"{team}_doctrine"][axis] == v]
                wr = pct(sum(1 for r in subset if r["winner"] == team), len(subset))
                axis_stat[v] = {"n": len(subset), "win_rate_pct": wr}
            axis_effect[axis] = axis_stat
        out["doctrine_effect"][team] = axis_effect
    return out

# ── Composição do relatório Markdown ──────────────────────────────────────────

DOCTRINE_DESCRIPTIONS = """
### Fatores de doutrina heurística adicionados

Cinco eixos de decisão independentes, sorteados aleatoriamente por equipe e
por partida (`random_doctrine()` em `ml/simulate_games.py`), modulam as
heurísticas de movimentação e combate usadas para gerar dados de treino:

1. **Formação — concentrada vs. dividida** (`formation`): no modo
   concentrado, as unidades de superfície convergem para o alvo de maior
   valor inimigo (empilhamento de poder de fogo); no modo dividido, os
   alvos são distribuídos em round-robin entre as unidades, vetorando-as
   para alvos distintos.
2. **Postura — ofensiva vs. defensiva** (`posture`): a postura ofensiva
   reduz a distância de standoff ideal (`ideal_range - 1`) e o ruído de
   decisão (multiplicador 0.6), favorecendo aproximação e engajamento
   rápido; a postura defensiva aumenta o standoff (`ideal_range + 1`) e o
   ruído (multiplicador 1.3), favorecendo cautela e dispersão de risco.
3. **Engajamento — simultâneo vs. sequencial** (`engagement`): no modo
   simultâneo, o motor busca um alvo único alcançável por ≥2 categorias de
   unidades (ex.: superfície + aéreo) e concentra fogo coordenado nesse
   alvo na mesma fase; no modo sequencial, os engajamentos progridem
   unidade a unidade, sem essa coordenação.
4. **Economia de munição**: o tamanho do salvo (`_salvo_size`) é limitado a
   uma fração do estoque inicial (até a 30%) enquanto a unidade está fora
   de alcance de recompletamento; perto de portos/bases (equipe azul) ou
   para unidades terrestres/aéreas, após o turno 3, o limite é relaxado
   para o salvo completo — refletindo a possibilidade real de
   reabastecimento.
5. **Economia de combustível** (`fuel_policy`): três políticas —
   *economize* (reduz o orçamento de movimento naval em 40% quando o
   tanque não está confortável), *escort* (desloca-se em direção ao navio
   reabastecedor — tanque/logístico — mais próximo quando o combustível
   cai abaixo de 70%) e *anchor* (equipe azul se aproxima do porto mais
   próximo sob a mesma condição). Essas políticas só atuam quando o tanque
   já não está confortável (<70%), para não desviar unidades com
   combustível pleno de sua missão tática.
""".strip()

def fmt_pct_dict(d: dict) -> str:
    return ", ".join(f"{k}={v}%" for k, v in d.items()) if d else "—"

def fmt_dict(d: dict) -> str:
    return ", ".join(f"{k}={v}" for k, v in d.items()) if d else "—"

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

def md_doctrine_axis_table(axis_effect: dict) -> str:
    rows = ["| Equipe | Eixo | Valor | n | Taxa de vitória% |", "|---|---|---|---|---|"]
    for team, axes in axis_effect.items():
        for axis, values in axes.items():
            for val, st in values.items():
                rows.append(f"| {team} | {axis} | {val} | {st['n']} | {st['win_rate_pct']} |")
    return "\n".join(rows)

def build_markdown(nn_all: dict, nn_victory: dict,
                    heur_all: dict, heur_victory: dict) -> str:
    today = date.today().isoformat()
    parts = []
    parts.append(f"# Relatório Estatístico e Descritivo — Simulações Operação Atlântico Sul\n")
    parts.append(f"_Gerado em {today}_\n")

    parts.append("## 1. Metodologia\n")
    parts.append(
        "As simulações ocorrem em um grid hexagonal *offset* (`odd-q`, topo-plano) de "
        "16×10 células, com unidades organizadas em ordem de batalha (OOB) por equipe "
        "(azul/vermelho), categorizadas em superfície, submarino, aéreo e terrestre. "
        "O motor de jogo modela: (a) deslocamento via BFS limitado por alcance de "
        "movimento e por categoria de terreno navegável; (b) combustível por categoria "
        "(naval/aéreo), com recompletamento por adjacência a provedores (navio-tanque, "
        "logístico ou porto, conforme equipe); (c) combate por arma com alcance e salvo "
        "(`SALVO_SIZE`) próprios, com prioridade de arma por categoria de alvo; (d) "
        "condição de vitória por objetivos de cenário (não por aniquilação total) — a "
        "equipe azul vence atingindo ≥3 de 5 critérios (porta-aviões inimigo afundado, "
        "≥2 navios logísticos afundados, navio anfíbio afundado, submarino nuclear "
        "afundado, ou ≥50% de degradação da força de superfície vermelha); a equipe "
        "vermelha vence atingindo os 2 critérios (≥3 FPSOs afundados e ≥40% de "
        "degradação dos portos azuis). Quando nenhum critério é atingido até o turno "
        f"limite ({sim.MAX_TURNS}), o resultado é decidido por **timeout**, atribuindo a "
        "vitória à equipe com maior soma total de pontos de vida remanescentes — "
        "critério distinto e bem mais permissivo do que a vitória por objetivo "
        "(**vitória decisiva**).\n"
    )
    parts.append(DOCTRINE_DESCRIPTIONS + "\n")
    parts.append(
        "### Conjuntos de dados\n\n"
        f"- **Conjunto 1 — Self-play da rede neural treinada** ({nn_all['games']} partidas): "
        "réplica fiel da lógica decisória de produção (`bot.js`) — tensor de estado de 9 "
        "canais, ranking de células por logit das redes `move_net.onnx`/`attack_net.onnx`, "
        "emergência de combustível abaixo de 35%, sem doutrina heurística (a rede decide "
        "sozinha, fruto do aprendizado por imitação sobre os dados heurísticos).\n"
        f"- **Conjunto 2 — Self-play do motor heurístico de doutrina** ({heur_all['n']} "
        "partidas): estratégias base (`aggressive`/`defensive`/`flanking`) e os 5 fatores de "
        "doutrina sorteados aleatoriamente e de forma independente para cada equipe a cada "
        "partida — mesmo gerador usado para produzir os dados de treino da rede.\n"
    )

    for title, all_r, vic_r in (
        ("2. Conjunto 1 — Self-play da rede neural treinada", nn_all, nn_victory),
        ("3. Conjunto 2 — Self-play do motor heurístico de doutrina", heur_all, heur_victory),
    ):
        parts.append(f"## {title}\n")
        for sub, rep in (("Geral (todas as partidas)", all_r), ("Somente vitória decisiva", vic_r)):
            parts.append(f"### {sub}\n")
            if rep is None or rep.get("n", rep.get("games", 0)) == 0:
                parts.append("_Sem partidas nesta categoria._\n")
                continue
            n = rep.get("games", rep.get("n"))
            parts.append(f"- Partidas: **{n}**")
            parts.append(f"- Taxa de vitória: {fmt_pct_dict(rep['win_rate'])}")
            parts.append(f"- Motivo de conclusão: {fmt_pct_dict(rep['win_reason'])}")
            parts.append(f"- Duração média: {rep['avg_turns']} turnos")
            if "team_avg_damage_dealt" in rep:
                parts.append(f"- Dano médio causado por equipe (pontos de HP): {fmt_dict(rep['team_avg_damage_dealt'])}")
                parts.append(f"- Unidades perdidas em média: {fmt_dict(rep['team_avg_units_lost'])}")
            else:
                parts.append(f"- Dano médio sofrido por equipe (pontos de HP): {fmt_dict(rep['avg_dmg_taken'])}")
                parts.append(f"- Unidades perdidas em média: {fmt_dict(rep['avg_units_lost'])}")
            parts.append("")
            if "units" in rep:
                parts.append("**Estatísticas por unidade (equipe azul e vermelha):**\n")
                parts.append(md_unit_table(rep["units"]))
                parts.append("")
            if "doctrine_effect" in rep:
                parts.append("**Efeito marginal de cada eixo de doutrina sobre a taxa de vitória "
                              "da própria equipe** (média sobre a doutrina do oponente, sorteada "
                              "aleatoriamente):\n")
                parts.append(md_doctrine_axis_table(rep["doctrine_effect"]))
                parts.append("")

    parts.append("## 4. Discussão e ressalvas metodológicas\n")
    nn_all_blue  = nn_all["win_rate"].get("blue", 0.0)
    nn_vic_red   = (nn_victory or {}).get("win_rate", {}).get("red", 0.0)
    parts.append(
        f"- **Achado principal:** no Conjunto 1 (rede neural), a taxa geral de vitória "
        f"de Blue ({nn_all_blue}%) se inverte quase completamente quando o critério é "
        f"restrito à vitória decisiva — Red vence {nn_vic_red}% das partidas concluídas "
        "por objetivo de cenário. Isso indica que, em termos puramente táticos (não "
        "contaminados pelo desempate de timeout), a política aprendida pela rede para a "
        "equipe vermelha é substancialmente mais eficaz do que a da equipe azul.\n"
    )
    parts.append(
        "- A vitória por **timeout** é decidida por soma agregada de HP, o que favorece "
        "estruturalmente a equipe azul: sua OOB inclui numerosos ativos terrestres "
        "estáticos (bases aéreas, portos, baterias) que raramente são atingidos e mantêm "
        "HP pleno, inflando o total independentemente do desempenho tático. Por isso, os "
        "subconjuntos de **vitória decisiva** (concluídos por critério de objetivo, não por "
        "esse desempate) são a referência mais fiel para avaliar efetividade tática real.\n"
        "- O conjunto 1 (rede neural) usa a OOB de treino (`sim.OOB`, incluindo unidades "
        "Op.Esp. e bases sintéticas usadas só para geração de dados), não a OOB do jogo "
        "em produção (`shared/order_of_battle.js`), garantindo consistência com a "
        "distribuição em que as redes foram treinadas.\n"
        "- No motor de simulação, o campo `amount` de uma ordem de ataque (incluindo a "
        "economia de munição da doutrina) não restringe o consumo real de munição em "
        "`resolve_attack()` — a arma sempre dispara seu salvo padrão. Os percentuais de "
        "munição remanescente refletem, portanto, o número de disparos realizados, não uma "
        "limitação de quantidade por disparo aplicada pela política de economia.\n"
        "- Os dois conjuntos não são diretamente comparáveis em força tática absoluta: o "
        "conjunto 1 reflete o comportamento aprendido pela rede (sujeito à qualidade dos "
        "dados de treino e à capacidade do modelo), enquanto o conjunto 2 reflete "
        "heurísticas determinísticas com diversidade de doutrina — a comparação relevante "
        "é estrutural (quais fatores deslocam taxas de vitória, duração e perdas), não de "
        "desempenho absoluto entre os dois motores.\n"
    )
    return "\n".join(parts)


if __name__ == "__main__":
    print("Gerando Conjunto 1 — self-play da rede neural treinada...")
    nn_stats_all, nn_stats_victory = run_nn_dataset(N_NN)
    nn_report_all     = bvb.build_report(nn_stats_all)
    nn_report_victory = bvb.build_report(nn_stats_victory) if nn_stats_victory.games else None

    print("\nGerando Conjunto 2 — self-play do motor heurístico de doutrina...")
    heur_records = run_heuristic_dataset(N_HEUR)
    heur_report_all     = aggregate_heuristic(heur_records)
    heur_report_victory = aggregate_heuristic([r for r in heur_records if r["reason"] == "victory"])

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    raw_path = OUT_DIR / "academic_report_data.json"
    raw_path.write_text(json.dumps({
        "nn_all": nn_report_all, "nn_victory": nn_report_victory,
        "heuristic_all": heur_report_all, "heuristic_victory": heur_report_victory,
    }, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[OK] Dados brutos salvos em {raw_path}")

    md = build_markdown(nn_report_all, nn_report_victory, heur_report_all, heur_report_victory)
    md_path = OUT_DIR / "relatorio_academico.md"
    md_path.write_text(md, encoding="utf-8")
    print(f"[OK] Relatório Markdown salvo em {md_path}")
