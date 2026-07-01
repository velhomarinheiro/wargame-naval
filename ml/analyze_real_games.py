"""
analyze_real_games.py — Análise estatística das partidas reais humano x máquina
registradas em data/game-logs/game_*.jsonl.

Diferente dos logs sintéticos sim_*.jsonl (bot x bot, geradores de treino),
os arquivos game_*.jsonl são partidas jogadas na interface (game_logger.js).
Este script agrega, sobre TODAS essas partidas:
  - desfecho (vencedor, motivo, turnos, duração);
  - progresso de objetivos de cada equipe;
  - atrição por equipe (baixas, sobrevivência);
  - efetividade/eficiência por unidade e por categoria (dano causado/sofrido,
    abates, disparos, movimentos).

Fonte autoritativa de dano/abate: os eventos `engagement_resolved`
(campo results[].result.totalDamage / destroyed). HP final e sobrevivência
vêm do estado do evento `game_over`. Movimentos de `movement_committed`;
ataques declarados de `attacks_declared`.

Uso:
    python ml/analyze_real_games.py
"""
from __future__ import annotations
import json, glob, pathlib
from collections import defaultdict
from datetime import datetime

LOG_DIR = pathlib.Path(__file__).parent.parent / "data" / "game-logs"
OUT_DIR = pathlib.Path(__file__).parent.parent / "data" / "eval"


def team_of(uid: str) -> str:
    return "blue" if uid.startswith("BLUE") else "red"


def parse_game(path: pathlib.Path) -> dict:
    lines = path.read_text(encoding="utf-8").splitlines()
    events = [json.loads(l) for l in lines]
    start = events[0]
    over = events[-1]

    # Inventário inicial: id -> (team, category, type, start_hp, weapons)
    units0 = {u["id"]: u for u in start["state"]["units"]}
    id_team = {uid: u["team"] for uid, u in units0.items()}
    id_cat = {uid: u["category"] for uid, u in units0.items()}
    id_type = {uid: u["type"] for uid, u in units0.items()}

    # Estado final (HP final por unidade)
    final_units = {u["id"]: u for u in over.get("state", {}).get("units", [])}

    # Acumuladores por unidade
    unit = defaultdict(lambda: defaultdict(float))  # uid -> {dmg_dealt,dmg_taken,kills,shots,launched,moves,attacks}

    for ev in events:
        et = ev["event"]
        if et == "movement_committed":
            for mv in ev.get("moves", []):
                unit[mv["unitId"]]["moves"] += 1
        elif et == "attacks_declared":
            for atk in ev.get("attacks", []):
                unit[atk["attackerId"]]["attacks"] += 1
        elif et == "engagement_resolved":
            eng = ev["engagement"]
            aid = eng.get("attackerId")
            counted_shot = False
            killed_targets = set()
            for r in eng.get("results", []):
                res = r.get("result") or {}
                if not res.get("ok"):
                    continue
                aid_r = res.get("attackerId", aid)
                did_r = res.get("defenderId")
                dmg = res.get("totalDamage", 0) or 0
                launched = res.get("launched", 0) or 0
                if launched > 0 and not counted_shot:
                    unit[aid_r]["shots"] += 1  # 1 engajamento com disparo efetivo
                    counted_shot = True
                unit[aid_r]["launched"] += launched
                if dmg:
                    unit[aid_r]["dmg_dealt"] += dmg
                    if did_r:
                        unit[did_r]["dmg_taken"] += dmg
                if res.get("destroyed") and did_r and did_r not in killed_targets:
                    unit[aid_r]["kills"] += 1
                    killed_targets.add(did_r)

    # Métricas por equipe
    teams = {}
    for t in ("blue", "red"):
        ids = [u for u, tt in id_team.items() if tt == t]
        start_n = len(ids)
        # sobrevivência via HP final (unidade ausente do estado final = destruída)
        survived = 0
        lost = 0
        for uid in ids:
            fu = final_units.get(uid)
            hp = fu["hp"] if fu else 0
            if hp > 0:
                survived += 1
            else:
                lost += 1
        teams[t] = {
            "units_start": start_n,
            "lost": lost,
            "survived": survived,
            "survival_pct": round(100 * survived / start_n, 1) if start_n else 0.0,
            "dmg_dealt": round(sum(unit[u]["dmg_dealt"] for u in ids), 1),
            "dmg_taken": round(sum(unit[u]["dmg_taken"] for u in ids), 1),
            "kills": int(sum(unit[u]["kills"] for u in ids)),
            "shots": int(sum(unit[u]["shots"] for u in ids)),
            "launched": int(sum(unit[u]["launched"] for u in ids)),
            "moves": int(sum(unit[u]["moves"] for u in ids)),
            "attacks": int(sum(unit[u]["attacks"] for u in ids)),
        }

    # Duração e turnos
    t0 = datetime.fromisoformat(start["ts"].replace("Z", "+00:00"))
    t1 = datetime.fromisoformat(over["ts"].replace("Z", "+00:00"))
    dur_min = round((t1 - t0).total_seconds() / 60, 1)

    # Objetivos
    obj = over.get("objectives", {})

    # Detalhe por unidade (para tabela agregada)
    unit_detail = {}
    for uid in id_team:
        fu = final_units.get(uid)
        hp_final = fu["hp"] if fu else 0
        unit_detail[uid] = {
            "team": id_team[uid],
            "category": id_cat[uid],
            "type": id_type[uid],
            "start_hp": units0[uid]["hp"],
            "final_hp": hp_final,
            "survived": hp_final > 0,
            "dmg_dealt": round(unit[uid]["dmg_dealt"], 1),
            "dmg_taken": round(unit[uid]["dmg_taken"], 1),
            "kills": int(unit[uid]["kills"]),
            "shots": int(unit[uid]["shots"]),
            "moves": int(unit[uid]["moves"]),
            "attacks": int(unit[uid]["attacks"]),
        }

    return {
        "room": over["room"],
        "file": path.name,
        "start_ts": start["ts"],
        "end_ts": over["ts"],
        "duration_min": dur_min,
        "turns": over.get("turn"),
        "winner": over.get("winner"),
        "reason": over.get("reason"),
        "objectives": obj,
        "teams": teams,
        "units": unit_detail,
    }


def aggregate(games: list[dict]) -> dict:
    n = len(games)
    decisive = [g for g in games if g["reason"] == "victory"]
    winners = defaultdict(int)
    reasons = defaultdict(int)
    for g in games:
        winners[g["winner"] or "—"] += 1
        reasons[g["reason"]] += 1

    # Médias por equipe (só partidas com desfecho normal? usamos todas)
    team_avg = {}
    for t in ("blue", "red"):
        team_avg[t] = {
            "avg_lost": round(sum(g["teams"][t]["lost"] for g in games) / n, 2),
            "avg_survival_pct": round(sum(g["teams"][t]["survival_pct"] for g in games) / n, 1),
            "avg_dmg_dealt": round(sum(g["teams"][t]["dmg_dealt"] for g in games) / n, 1),
            "avg_kills": round(sum(g["teams"][t]["kills"] for g in games) / n, 2),
            "avg_moves": round(sum(g["teams"][t]["moves"] for g in games) / n, 1),
            "avg_attacks": round(sum(g["teams"][t]["attacks"] for g in games) / n, 1),
        }

    # Efetividade agregada por unidade (soma sobre todas as partidas em que apareceu)
    u_agg = defaultdict(lambda: {"team": "", "category": "", "games": 0,
                                 "dmg_dealt": 0.0, "dmg_taken": 0.0, "kills": 0,
                                 "shots": 0, "moves": 0, "survived": 0})
    for g in games:
        for uid, d in g["units"].items():
            a = u_agg[uid]
            a["team"] = d["team"]; a["category"] = d["category"]
            a["games"] += 1
            a["dmg_dealt"] += d["dmg_dealt"]; a["dmg_taken"] += d["dmg_taken"]
            a["kills"] += d["kills"]; a["shots"] += d["shots"]; a["moves"] += d["moves"]
            a["survived"] += 1 if d["survived"] else 0
    for uid, a in u_agg.items():
        a["dmg_dealt"] = round(a["dmg_dealt"], 1)
        a["dmg_taken"] = round(a["dmg_taken"], 1)
        a["survival_pct"] = round(100 * a["survived"] / a["games"], 1) if a["games"] else 0.0

    # Por categoria
    cat_agg = defaultdict(lambda: {"dmg_dealt": 0.0, "kills": 0, "count": 0})
    for uid, a in u_agg.items():
        c = cat_agg[(a["team"], a["category"])]
        c["dmg_dealt"] += a["dmg_dealt"]; c["kills"] += a["kills"]; c["count"] += a["games"]

    return {
        "n_games": n,
        "n_decisive": len(decisive),
        "winners": dict(winners),
        "reasons": dict(reasons),
        "team_avg": team_avg,
        "unit_agg": dict(u_agg),
        "cat_agg": {f"{k[0]}|{k[1]}": v for k, v in cat_agg.items()},
    }


def build_markdown(games: list[dict], agg: dict) -> str:
    P = []
    P.append("# Análise Estatística — Partidas Reais Humano × Máquina\n")
    P.append(f"_Gerado a partir de {agg['n_games']} logs `game_*.jsonl` em `data/game-logs/`_\n")
    P.append("> **Ressalva:** os logs registram apenas as equipes `blue` e `red`; não "
             "identificam qual lado foi controlado por humano e qual pela máquina. As "
             "estatísticas são apresentadas por equipe.\n")

    # 1. Resumo por partida
    P.append("## 1. Resumo por partida\n")
    P.append("| Sala | Data | Turnos | Duração (min) | Vencedor | Motivo | Baixas Blue | Baixas Red |")
    P.append("|---|---|---|---|---|---|---|---|")
    for g in sorted(games, key=lambda x: x["start_ts"]):
        d = g["start_ts"][:10]
        P.append(f"| {g['room']} | {d} | {g['turns']} | {g['duration_min']} | "
                 f"{g['winner'] or '—'} | {g['reason']} | {g['teams']['blue']['lost']} | "
                 f"{g['teams']['red']['lost']} |")
    P.append("")

    # 2. Desfechos agregados
    P.append("## 2. Desfechos agregados\n")
    P.append(f"- Partidas analisadas: **{agg['n_games']}**")
    P.append(f"- Vencedores: " + ", ".join(f"{k}={v}" for k, v in agg["winners"].items()))
    P.append(f"- Motivo de conclusão: " + ", ".join(f"{k}={v}" for k, v in agg["reasons"].items()))
    P.append(f"- Partidas por vitória decisiva (objetivo): **{agg['n_decisive']}/{agg['n_games']}**")
    P.append("")

    # 3. Atrição / efetividade média por equipe
    P.append("## 3. Efetividade média por equipe (todas as partidas)\n")
    P.append("| Métrica | Blue | Red |")
    P.append("|---|---|---|")
    ta = agg["team_avg"]
    rows = [("Baixas médias/partida", "avg_lost"),
            ("Sobrevivência média %", "avg_survival_pct"),
            ("Dano médio causado (HP)", "avg_dmg_dealt"),
            ("Abates médios/partida", "avg_kills"),
            ("Movimentos médios/partida", "avg_moves"),
            ("Ataques declarados médios/partida", "avg_attacks")]
    for label, key in rows:
        P.append(f"| {label} | {ta['blue'][key]} | {ta['red'][key]} |")
    P.append("")

    # 4. Progresso de objetivos por partida
    P.append("## 4. Progresso de objetivos por partida\n")
    for g in sorted(games, key=lambda x: x["start_ts"]):
        obj = g["objectives"]
        P.append(f"### {g['room']} ({g['start_ts'][:10]}) — {g['winner'] or 'sem vencedor'} / {g['reason']}\n")
        for t in ("blue", "red"):
            o = obj.get(t, {})
            conds = o.get("conditions", [])
            met = [c["label"].split("(")[0].strip() for c in conds if c.get("met")]
            P.append(f"- **{t.capitalize()}** ({o.get('achieved','?')}/{o.get('needed','?')} objetivos, "
                     f"venceu={o.get('won')}): "
                     + ("cumpridos: " + "; ".join(met) if met else "nenhum objetivo cumprido"))
            for c in conds:
                mark = "✅" if c.get("met") else "▫️"
                P.append(f"  - {mark} {c['label']} — {c.get('current','')}")
        P.append("")

    # 5. Unidades mais efetivas (agregado)
    P.append("## 5. Unidades mais efetivas (dano causado somado em todas as partidas)\n")
    P.append("| Unidade | Equipe | Categoria | Partidas | Dano causado | Abates | Disparos | Sobrev.% |")
    P.append("|---|---|---|---|---|---|---|---|")
    top = sorted(agg["unit_agg"].items(), key=lambda kv: kv[1]["dmg_dealt"], reverse=True)[:15]
    for uid, a in top:
        P.append(f"| {uid} | {a['team']} | {a['category']} | {a['games']} | {a['dmg_dealt']} | "
                 f"{a['kills']} | {a['shots']} | {a['survival_pct']} |")
    P.append("")

    # 6. Efetividade por categoria
    P.append("## 6. Dano causado por categoria de unidade (somado)\n")
    P.append("| Equipe | Categoria | Dano causado | Abates |")
    P.append("|---|---|---|---|")
    cats = sorted(agg["cat_agg"].items(), key=lambda kv: kv[1]["dmg_dealt"], reverse=True)
    for key, c in cats:
        if c["dmg_dealt"] <= 0 and c["kills"] == 0:
            continue
        team, cat = key.split("|")
        P.append(f"| {team} | {cat} | {round(c['dmg_dealt'],1)} | {c['kills']} |")
    P.append("")

    return "\n".join(P)


if __name__ == "__main__":
    paths = sorted(LOG_DIR.glob("game_*.jsonl"))
    print(f"[i] {len(paths)} partidas reais encontradas em {LOG_DIR}")
    games = [parse_game(p) for p in paths]
    agg = aggregate(games)

    md = build_markdown(games, agg)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    md_path = OUT_DIR / "relatorio_partidas_reais.md"
    md_path.write_text(md, encoding="utf-8")
    print(f"[OK] Relatório salvo em {md_path}")

    raw = {"games": games, "aggregate": agg}
    raw_path = OUT_DIR / "partidas_reais_data.json"
    raw_path.write_text(json.dumps(raw, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[OK] Dados brutos salvos em {raw_path}")
