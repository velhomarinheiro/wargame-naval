"""
bot_vs_bot.py — Avaliação self-play do bot treinado (move_net + attack_net)

Roda N partidas bot-vs-bot usando os modelos ONNX atuais, com a MESMA lógica
de decisão de bot.js (réplica fiel: stateToTensor, ranking de células,
BFS de movimento, emergência de combustível <35%, seleção de alvo por
attackRange). O motor de partida (movimentação, combate, combustível,
munição, OPSESP, condição de vitória) é o já validado em
ml/simulate_games.py — não há heurística de estratégia aqui, só inferência.

Uso:
  python ml/bot_vs_bot.py --games 400
"""
from __future__ import annotations
import argparse, json, pathlib, sys
from collections import defaultdict, Counter

import numpy as np
import onnxruntime as ort

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import simulate_games as sim   # reusa motor: hex math, fuel, combate, OOB...

GRID_W, GRID_H, N_CH = sim.GRID_W, sim.GRID_H, 9
MODEL_DIR = pathlib.Path(__file__).parent / "models"
OUT_DIR   = pathlib.Path(__file__).parent.parent / "data" / "eval"

_parser = argparse.ArgumentParser()
_parser.add_argument("--games", type=int, default=400)
ARGS = _parser.parse_args()

# ── Réplica de bot.js: tensor de estado ───────────────────────────────────────

def state_to_tensor(units: list[dict]) -> np.ndarray:
    data = np.zeros((N_CH, GRID_H, GRID_W), dtype=np.float32)
    for u in units:
        if u.get("hp", 0) <= 0: continue
        c, r = u["col"], u["row"]
        if not (0 <= c < GRID_W and 0 <= r < GRID_H): continue
        team_sign = 1.0 if u["team"] == "blue" else -1.0
        cat   = u.get("category") or u.get("cat") or ""
        fuel  = u.get("fuel") or {}
        wpns  = u.get("weapons") or {}
        wpn_total = sum(w.get("quantity", 0) for w in wpns.values() if isinstance(w, dict))
        data[0, r, c] = 1.0
        data[1, r, c] = team_sign
        data[2, r, c] = (u["hp"] / u["maxHp"]) if u.get("maxHp") else 0.0
        data[3, r, c] = 1.0 if cat == "surface"   else 0.0
        data[4, r, c] = 1.0 if cat == "submarine" else 0.0
        data[5, r, c] = 1.0 if cat == "air"       else 0.0
        data[6, r, c] = 1.0 if cat == "land"      else 0.0
        data[7, r, c] = (fuel.get("current", 0) / fuel.get("max", 1)) if fuel.get("max") else 1.0
        data[8, r, c] = min(wpn_total / 20.0, 1.0)
    return data.reshape(1, N_CH, GRID_H, GRID_W)

def _ranked_cells(logits: np.ndarray) -> list[tuple[float, int, int]]:
    flat = np.asarray(logits).reshape(-1)
    order = np.argsort(-flat)
    return [(float(flat[i]), int(i % GRID_W), int(i // GRID_W)) for i in order]

def _is_refuel_provider(u: dict, team: str) -> bool:
    """Réplica de REFUEL_TYPES (bot.js): tanque/logístico contam para as duas
    equipes; porto só conta para a equipe azul."""
    if u.get("hp", 0) <= 0: return False
    if u.get("_tanker") or u.get("_logistic"): return True
    if team == "blue" and u.get("_port"): return True
    return False

# ── Réplica de bot.js: botMove ────────────────────────────────────────────────

def nn_move(team: str, units: list[dict], all_units: list[dict],
            move_sess: ort.InferenceSession) -> list[dict]:
    tensor = state_to_tensor(all_units)
    logits = move_sess.run(None, {"state": tensor})[0]
    ranked = _ranked_cells(logits)[:30]

    my_units = [u for u in units if u["team"] == team and u.get("hp", 0) > 0
                and u.get("mov", 0) > 0]
    occupied = {(u["col"], u["row"]) for u in all_units if u.get("hp", 0) > 0}

    moves = []
    for u in my_units:
        mov_range = u["mov"]
        f = u.get("fuel") or {}
        if f.get("fuelType") == "naval":
            fp, fp_max = f.get("current", 0), f.get("max", 1)
            if fp > 0 and fp_max and fp / fp_max < 0.35:
                providers = sorted(
                    (p for p in all_units if p["team"] == team and _is_refuel_provider(p, team)),
                    key=lambda p: sim.hex_dist(u["col"], u["row"], p["col"], p["row"]))
                if providers:
                    prov = providers[0]
                    if sim.hex_dist(u["col"], u["row"], prov["col"], prov["row"]) > 0:
                        path = sim.bfs(u["cat"], u["col"], u["row"],
                                       prov["col"], prov["row"], mov_range, occupied)
                        if path and len(path) >= 2:
                            moves.append({"unitId": u["id"],
                                         "path": [{"col": c, "row": r} for c, r in path]})
                            occupied.discard((u["col"], u["row"]))
                            occupied.add(path[-1])
                            continue
        for score, col, row in ranked:
            if col == u["col"] and row == u["row"]: continue
            if not sim.can_enter(u["cat"], col, row): continue
            if sim.hex_dist(u["col"], u["row"], col, row) > mov_range: continue
            path = sim.bfs(u["cat"], u["col"], u["row"], col, row, mov_range, occupied)
            if path and len(path) >= 2:
                moves.append({"unitId": u["id"],
                             "path": [{"col": c, "row": r} for c, r in path]})
                occupied.discard((u["col"], u["row"]))
                occupied.add((col, row))
                break
    return moves

# ── Réplica de bot.js: botAttack ──────────────────────────────────────────────

def nn_attack(team: str, units: list[dict], all_units: list[dict],
              attack_sess: ort.InferenceSession) -> list[dict]:
    tensor = state_to_tensor(all_units)
    logits = attack_sess.run(None, {"state": tensor})[0]
    ranked = _ranked_cells(logits)[:30]

    my_units = [u for u in units if u["team"] == team and u.get("hp", 0) > 0
                and sim.fuel_ok(u)]
    enemies = [u for u in all_units if u["team"] != team and u.get("hp", 0) > 0]
    enemy_by_pos = {(e["col"], e["row"]): e for e in enemies}

    attacks = []
    for u in my_units:
        atk_range = u.get("atr") or {}
        for score, col, row in ranked:
            enemy = enemy_by_pos.get((col, row))
            if not enemy: continue
            rng = atk_range.get(enemy["cat"], 0)
            if rng == 0: continue
            if sim.hex_dist(u["col"], u["row"], enemy["col"], enemy["row"]) > rng: continue
            attacks.append({"attackerId": u["id"], "targetId": enemy["id"], "amount": 1})
            break
    return attacks

# ── Coleta de estatísticas ────────────────────────────────────────────────────

class EvalStats:
    def __init__(self):
        self.unit: dict[str, dict[str, float]] = defaultdict(lambda: defaultdict(float))
        self.unit_team: dict[str, str] = {}
        self.unit_cat:  dict[str, str] = {}
        self.games = 0
        self.wins = Counter()
        self.reasons = Counter()
        self.turns: list[int] = []
        self.team_damage: dict[str, list[float]] = defaultdict(list)
        self.team_losses: dict[str, list[int]] = defaultdict(list)
        self._cur_damage: dict[str, float] = defaultdict(float)
        self._cur_losses: dict[str, int] = defaultdict(int)

    def record_move(self, uid: str):
        self.unit[uid]["moves"] += 1

    def record_shot(self, uid: str):
        self.unit[uid]["shots"] += 1

    def record_damage(self, att_id: str, tgt_id: str, att_team: str, dmg: float, killed: bool):
        self.unit[att_id]["damage_dealt"] += dmg
        self.unit[tgt_id]["damage_taken"] += dmg
        self._cur_damage[att_team] += dmg
        if dmg > 0: self.unit[att_id]["hits"] += 1
        if killed:
            self.unit[att_id]["kills"] += 1
            self._cur_losses["red" if att_team == "blue" else "blue"] += 1

    def record_game_end(self, units: list[dict], winner: str, reason: str, turn: int):
        self.games += 1
        self.wins[winner] += 1
        self.reasons[reason] += 1
        self.turns.append(turn)
        for team in ("blue", "red"):
            self.team_damage[team].append(self._cur_damage[team])
            self.team_losses[team].append(self._cur_losses[team])
        self._cur_damage = defaultdict(float)
        self._cur_losses = defaultdict(int)

        for u in units:
            uid = u["id"]
            self.unit_team[uid] = u["team"]
            self.unit_cat[uid]  = u["cat"]
            st = self.unit[uid]
            st["games"] += 1
            if u["hp"] > 0: st["survived"] += 1
            f = u.get("fuel") or {}
            if f.get("fuelType") == "naval" and f.get("max", 0) > 0:
                st["fuel_naval_games"] += 1
                st["fuel_pct_sum"] += f.get("current", 0) / f["max"]
                if f.get("current", 0) <= 0: st["fuel_zero"] += 1
            init_w = u.get("init_weapons") or {}
            if init_w:
                init_total = sum(w.get("quantity", 0) for w in init_w.values())
                cur_total  = sum(w.get("quantity", 0) for w in (u.get("weapons") or {}).values())
                if init_total > 0:
                    st["ammo_games"] += 1
                    st["ammo_pct_sum"] += cur_total / init_total

    def merge_into(self, other: "EvalStats"):
        """Acumula os contadores brutos de self dentro de other (para compor
        subconjuntos, ex.: só partidas concluídas por vitória decisiva)."""
        other.games += self.games
        other.wins.update(self.wins)
        other.reasons.update(self.reasons)
        other.turns.extend(self.turns)
        for t in ("blue", "red"):
            other.team_damage[t].extend(self.team_damage[t])
            other.team_losses[t].extend(self.team_losses[t])
        for uid, st in self.unit.items():
            other.unit_team[uid] = self.unit_team[uid]
            other.unit_cat[uid]  = self.unit_cat[uid]
            for k, v in st.items():
                other.unit[uid][k] += v

# ── Loop de partida ───────────────────────────────────────────────────────────

def simulate_nn_game(move_sess, attack_sess, stats: EvalStats):
    units = [sim.make_unit(team, spec)
             for team, specs in sim.OOB.items() for spec in specs]
    uid_map = {u["id"]: u for u in units}

    winner = None; reason = None; turn = 1
    for turn in range(1, sim.MAX_TURNS + 1):
        for half in range(2):
            blue_units = [u for u in units if u["team"] == "blue" and u["hp"] > 0]
            red_units  = [u for u in units if u["team"] == "red"  and u["hp"] > 0]
            if not blue_units or not red_units: break

            blue_moves = nn_move("blue", [u for u in blue_units if sim.fuel_ok(u)],
                                 units, move_sess)
            for mv in blue_moves: stats.record_move(mv["unitId"])
            sim._apply_moves(units, blue_moves, "blue")
            sim._sync_opsesp(units)

            red_units2 = [u for u in units if u["team"] == "red" and u["hp"] > 0 and sim.fuel_ok(u)]
            red_moves = nn_move("red", red_units2, units, move_sess)
            for mv in red_moves: stats.record_move(mv["unitId"])
            sim._apply_moves(units, red_moves, "red")
            sim._sync_opsesp(units)

            blue_atks = nn_attack("blue", [u for u in units if u["team"] == "blue" and u["hp"] > 0],
                                  units, attack_sess)
            red_atks  = nn_attack("red",  [u for u in units if u["team"] == "red"  and u["hp"] > 0],
                                  units, attack_sess)

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

# ── Relatório ─────────────────────────────────────────────────────────────────

def build_report(stats: EvalStats) -> dict:
    n = stats.games
    def pct(a, b): return round(100 * a / b, 1) if b else 0.0
    def avg(lst): return round(sum(lst) / len(lst), 2) if lst else 0.0

    units_report = []
    for uid, st in sorted(stats.unit.items(), key=lambda kv: (stats.unit_team[kv[0]], kv[0])):
        g = st["games"] or 1
        row = {
            "id": uid, "team": stats.unit_team[uid], "category": stats.unit_cat[uid],
            "survival_pct": pct(st["survived"], g),
            "damage_dealt_avg": round(st["damage_dealt"] / g, 2),
            "damage_taken_avg": round(st["damage_taken"] / g, 2),
            "kills_avg": round(st["kills"] / g, 2),
            "shots_avg": round(st["shots"] / g, 2),
            "hit_pct": pct(st["hits"], st["shots"]) if st["shots"] else None,
            "moves_avg": round(st["moves"] / g, 2),
        }
        if st["fuel_naval_games"]:
            row["fuel_pct_remaining_avg"] = pct(st["fuel_pct_sum"], st["fuel_naval_games"])
            row["fuel_zero_pct_games"]    = pct(st["fuel_zero"], st["fuel_naval_games"])
        if st["ammo_games"]:
            row["ammo_pct_remaining_avg"] = pct(st["ammo_pct_sum"], st["ammo_games"])
        units_report.append(row)

    return {
        "games": n,
        "win_rate": {k: pct(v, n) for k, v in stats.wins.items()},
        "win_reason": {k: pct(v, n) for k, v in stats.reasons.items()},
        "avg_turns": avg(stats.turns),
        "team_avg_damage_dealt": {t: avg(v) for t, v in stats.team_damage.items()},
        "team_avg_units_lost":   {t: avg(v) for t, v in stats.team_losses.items()},
        "units": units_report,
    }

def print_report(report: dict):
    print(f"\n{'='*78}\nRELATÓRIO — {report['games']} partidas bot-vs-bot\n{'='*78}")
    print(f"Vitórias: " + "  ".join(f"{k}={v}%" for k, v in report["win_rate"].items()))
    print(f"Motivo:   " + "  ".join(f"{k}={v}%" for k, v in report["win_reason"].items()))
    print(f"Duração média: {report['avg_turns']} turnos")
    print(f"Dano médio causado por time: " +
          "  ".join(f"{k}={v}" for k, v in report["team_avg_damage_dealt"].items()))
    print(f"Unidades perdidas em média: " +
          "  ".join(f"{k}={v}" for k, v in report["team_avg_units_lost"].items()))
    print(f"\n{'-'*78}")
    hdr = f"{'ID':<16}{'time':<6}{'cat':<10}{'sobrev%':>8}{'dmg+':>7}{'dmg-':>7}{'kills':>7}{'tiros':>7}{'acerto%':>8}{'mov':>6}{'fuel%':>7}{'amunic%':>8}"
    print(hdr)
    print('-'*78)
    for r in report["units"]:
        print(f"{r['id']:<16}{r['team']:<6}{r['category']:<10}{r['survival_pct']:>8}"
              f"{r['damage_dealt_avg']:>7}{r['damage_taken_avg']:>7}{r['kills_avg']:>7}"
              f"{r['shots_avg']:>7}{(r['hit_pct'] if r['hit_pct'] is not None else '-'):>8}"
              f"{r['moves_avg']:>6}"
              f"{r.get('fuel_pct_remaining_avg','-'):>7}"
              f"{r.get('ammo_pct_remaining_avg','-'):>8}")

# ── Main ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    move_sess   = ort.InferenceSession(str(MODEL_DIR / "move_net.onnx"))
    attack_sess = ort.InferenceSession(str(MODEL_DIR / "attack_net.onnx"))

    stats = EvalStats()
    for i in range(ARGS.games):
        simulate_nn_game(move_sess, attack_sess, stats)
        if (i + 1) % 50 == 0:
            print(f"[{i+1}/{ARGS.games}] partidas concluídas...")

    report = build_report(stats)
    print_report(report)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / "bot_vs_bot_report.json"
    out_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n[OK] Relatório salvo em {out_path}")
