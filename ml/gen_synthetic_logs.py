"""
gen_synthetic_logs.py — Gera logs sintéticos de partidas para treino de ML.

Simula N_GAMES partidas usando heurísticas simples (avançar, atirar no mais próximo).
Saída: data/game-logs/synthetic_NNNN.jsonl

Uso:
    python ml/gen_synthetic_logs.py [--games 80]
"""

import json, math, random, pathlib, sys, copy
from collections import deque
from datetime import datetime, timezone

# ── Configuração ──────────────────────────────────────────────────────────────
GRID_W, GRID_H = 16, 10
MAX_TURNS       = 14
N_GAMES         = int(sys.argv[sys.argv.index("--games") + 1]) if "--games" in sys.argv else 80
LOG_DIR         = pathlib.Path(__file__).parent.parent / "data" / "game-logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)

T_LAND, T_SHALLOW, T_SHELF, T_DEEP, T_OIL = 0, 1, 2, 3, 4
TERRAIN = [
    [0,0,0,0,0,0,1,2,3,3,3,3,3,3,3,3],
    [0,0,0,0,0,1,1,2,3,3,3,3,3,3,3,3],
    [0,0,0,0,1,1,2,4,3,3,3,3,3,3,3,3],
    [0,0,0,1,1,2,4,4,3,3,3,3,3,3,3,3],
    [0,0,1,1,2,4,4,2,3,3,3,3,3,3,3,3],
    [0,1,1,2,4,4,2,3,3,3,3,3,3,3,3,3],
    [1,1,2,4,4,2,3,3,3,3,3,3,3,3,3,3],
    [1,2,2,4,2,2,3,3,3,3,3,3,3,3,3,3],
    [1,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3],
    [1,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3],
]

# ── Ordem de batalha inicial ──────────────────────────────────────────────────
OOB = {
    "blue": [
        {"id":"BLUE-SAG-P",  "category":"surface",   "col":3, "row":4, "maxHp":4,  "movement":4,  "attackRange":{"surface":3,"air":1,"submarine":2,"land":2}, "weapons":{"mss":{"quantity":16,"range":3}}},
        {"id":"BLUE-SAG-S1", "category":"surface",   "col":5, "row":4, "maxHp":9,  "movement":4,  "attackRange":{"surface":2,"air":1,"submarine":1,"land":1}, "weapons":{"mss":{"quantity":18,"range":2}}},
        {"id":"BLUE-SAG-S2", "category":"surface",   "col":3, "row":5, "maxHp":10, "movement":4,  "attackRange":{"surface":2,"air":1,"submarine":1,"land":1}, "weapons":{"mss":{"quantity":24,"range":2}}},
        {"id":"BLUE-ANFIB",  "category":"surface",   "col":2, "row":4, "maxHp":10, "movement":2,  "attackRange":{"surface":3,"air":1,"submarine":2,"land":2}, "weapons":{}},
        {"id":"BLUE-LOG-A",  "category":"surface",   "col":3, "row":3, "maxHp":3,  "movement":2,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-LOG-T",  "category":"surface",   "col":5, "row":1, "maxHp":3,  "movement":2,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-PAT-O1", "category":"surface",   "col":7, "row":1, "maxHp":4,  "movement":4,  "attackRange":{"surface":2,"air":1,"submarine":0,"land":0}, "weapons":{"mss":{"quantity":4,"range":2}}},
        {"id":"BLUE-PAT-O2", "category":"surface",   "col":4, "row":7, "maxHp":4,  "movement":4,  "attackRange":{"surface":2,"air":1,"submarine":0,"land":0}, "weapons":{"mss":{"quantity":4,"range":2}}},
        {"id":"BLUE-PAT-C1", "category":"surface",   "col":4, "row":4, "maxHp":2,  "movement":3,  "attackRange":{"surface":1,"air":0,"submarine":0,"land":0}, "weapons":{"mss":{"quantity":2,"range":1}}},
        {"id":"BLUE-PAT-C2", "category":"surface",   "col":5, "row":2, "maxHp":2,  "movement":3,  "attackRange":{"surface":1,"air":0,"submarine":0,"land":0}, "weapons":{"mss":{"quantity":2,"range":1}}},
        {"id":"BLUE-SUB-N",  "category":"submarine", "col":7, "row":4, "maxHp":3,  "movement":4,  "attackRange":{"surface":3,"air":0,"submarine":2,"land":1}, "weapons":{"ascm":{"quantity":2,"range":6},"torpedo":{"quantity":12,"range":2}}},
        {"id":"BLUE-SUB-1",  "category":"submarine", "col":6, "row":2, "maxHp":2,  "movement":2,  "attackRange":{"surface":2,"air":0,"submarine":1,"land":0}, "weapons":{"torpedo":{"quantity":6,"range":2}}},
        {"id":"BLUE-SUB-2",  "category":"submarine", "col":3, "row":6, "maxHp":2,  "movement":2,  "attackRange":{"surface":2,"air":0,"submarine":1,"land":0}, "weapons":{"torpedo":{"quantity":6,"range":2}}},
        {"id":"BLUE-SUB-3",  "category":"submarine", "col":4, "row":4, "maxHp":2,  "movement":2,  "attackRange":{"surface":2,"air":0,"submarine":1,"land":0}, "weapons":{"torpedo":{"quantity":6,"range":2}}},
        {"id":"BLUE-MPRA-1", "category":"air",       "col":1, "row":3, "maxHp":2,  "movement":16, "attackRange":{"surface":3,"air":0,"submarine":1,"land":0}, "weapons":{"mss":{"quantity":4,"range":2},"torpedo":{"quantity":2,"range":2}}},
        {"id":"BLUE-MPRA-2", "category":"air",       "col":1, "row":3, "maxHp":2,  "movement":16, "attackRange":{"surface":3,"air":0,"submarine":1,"land":0}, "weapons":{"mss":{"quantity":4,"range":2},"torpedo":{"quantity":2,"range":2}}},
        {"id":"BLUE-CACA-1", "category":"air",       "col":0, "row":3, "maxHp":6,  "movement":8,  "attackRange":{"surface":0,"air":2,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-CACA-2", "category":"air",       "col":0, "row":3, "maxHp":6,  "movement":8,  "attackRange":{"surface":0,"air":2,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-CJAT-1", "category":"air",       "col":3, "row":3, "maxHp":2,  "movement":6,  "attackRange":{"surface":1,"air":1,"submarine":0,"land":1}, "weapons":{"ascm":{"quantity":4,"range":6}}},
        {"id":"BLUE-CJAT-2", "category":"air",       "col":3, "row":3, "maxHp":2,  "movement":6,  "attackRange":{"surface":1,"air":1,"submarine":0,"land":1}, "weapons":{"ascm":{"quantity":4,"range":6}}},
        {"id":"BLUE-DCOST1", "category":"land",      "col":4, "row":2, "maxHp":2,  "movement":1,  "attackRange":{"surface":3,"air":0,"submarine":0,"land":0}, "weapons":{"mss":{"quantity":10,"range":3}}},
        {"id":"BLUE-DCOST2", "category":"land",      "col":1, "row":4, "maxHp":2,  "movement":1,  "attackRange":{"surface":3,"air":0,"submarine":0,"land":0}, "weapons":{"mss":{"quantity":10,"range":3}}},
        {"id":"BLUE-ADA-1",  "category":"land",      "col":3, "row":1, "maxHp":2,  "movement":1,  "attackRange":{"surface":0,"air":2,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-ADA-2",  "category":"land",      "col":0, "row":5, "maxHp":2,  "movement":1,  "attackRange":{"surface":0,"air":2,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-FPSO1",  "category":"surface",   "col":6, "row":3, "maxHp":6,  "movement":0,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-FPSO2",  "category":"surface",   "col":5, "row":3, "maxHp":6,  "movement":0,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-FPSO3",  "category":"surface",   "col":4, "row":5, "maxHp":6,  "movement":0,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-FPSO4",  "category":"surface",   "col":2, "row":6, "maxHp":6,  "movement":0,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-PORTO-S","category":"land",      "col":0, "row":5, "maxHp":20, "movement":0,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-PORTO-RJ","category":"land",     "col":2, "row":4, "maxHp":20, "movement":0,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-PORTO-V","category":"land",      "col":5, "row":1, "maxHp":16, "movement":0,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"BLUE-PORTO-ACU","category":"land",    "col":4, "row":3, "maxHp":12, "movement":0,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
    ],
    "red": [
        {"id":"RED-GBPA",    "category":"surface",   "col":15,"row":1, "maxHp":6,  "movement":4,  "attackRange":{"surface":4,"air":1,"submarine":2,"land":2}, "weapons":{"mss":{"quantity":10,"range":3}}},
        {"id":"RED-GE-1",    "category":"surface",   "col":14,"row":1, "maxHp":12, "movement":4,  "attackRange":{"surface":6,"air":1,"submarine":2,"land":8}, "weapons":{"ascm":{"quantity":14,"range":6},"mss":{"quantity":18,"range":3},"lacm":{"quantity":8,"range":10}}},
        {"id":"RED-GE-2",    "category":"surface",   "col":14,"row":2, "maxHp":10, "movement":4,  "attackRange":{"surface":6,"air":1,"submarine":2,"land":8}, "weapons":{"ascm":{"quantity":8,"range":6},"mss":{"quantity":12,"range":3}}},
        {"id":"RED-GE-3",    "category":"surface",   "col":14,"row":0, "maxHp":9,  "movement":4,  "attackRange":{"surface":2,"air":1,"submarine":1,"land":1}, "weapons":{"mss":{"quantity":12,"range":3}}},
        {"id":"RED-AOR-G",   "category":"surface",   "col":15,"row":0, "maxHp":3,  "movement":2,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"RED-GANF",    "category":"surface",   "col":15,"row":2, "maxHp":14, "movement":3,  "attackRange":{"surface":2,"air":1,"submarine":0,"land":2}, "weapons":{}},
        {"id":"RED-GLOG",    "category":"surface",   "col":15,"row":3, "maxHp":6,  "movement":2,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"RED-AKE",     "category":"surface",   "col":15,"row":4, "maxHp":6,  "movement":2,  "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"RED-KSN",     "category":"submarine", "col":13,"row":2, "maxHp":3,  "movement":4,  "attackRange":{"surface":3,"air":0,"submarine":2,"land":8}, "weapons":{"ascm":{"quantity":8,"range":6},"torpedo":{"quantity":12,"range":2}}},
        {"id":"RED-KS-1",    "category":"submarine", "col":1, "row":8, "maxHp":2,  "movement":2,  "attackRange":{"surface":2,"air":0,"submarine":1,"land":0}, "weapons":{"ascm":{"quantity":4,"range":6},"torpedo":{"quantity":6,"range":2}}},
        {"id":"RED-KMF-1",   "category":"air",       "col":15,"row":1, "maxHp":8,  "movement":10, "attackRange":{"surface":2,"air":2,"submarine":0,"land":1}, "weapons":{}},
        {"id":"RED-KMF-2",   "category":"air",       "col":15,"row":1, "maxHp":8,  "movement":10, "attackRange":{"surface":2,"air":2,"submarine":0,"land":1}, "weapons":{}},
        {"id":"RED-MPRA-K1", "category":"air",       "col":15,"row":1, "maxHp":2,  "movement":12, "attackRange":{"surface":2,"air":0,"submarine":1,"land":0}, "weapons":{"ascm":{"quantity":2,"range":6},"torpedo":{"quantity":2,"range":2}}},
        {"id":"RED-MPRA-K2", "category":"air",       "col":15,"row":1, "maxHp":2,  "movement":12, "attackRange":{"surface":2,"air":0,"submarine":1,"land":0}, "weapons":{"ascm":{"quantity":2,"range":6},"torpedo":{"quantity":2,"range":2}}},
        {"id":"RED-AWACS-K", "category":"air",       "col":15,"row":1, "maxHp":2,  "movement":10, "attackRange":{"surface":0,"air":0,"submarine":0,"land":0}, "weapons":{}},
        {"id":"RED-GBPA",    "category":"surface",   "col":15,"row":1, "maxHp":6,  "movement":4,  "attackRange":{"surface":4,"air":1,"submarine":2,"land":2}, "weapons":{"mss":{"quantity":10,"range":3}}},
    ],
}
# Remove duplicate RED-GBPA
seen = set()
deduped = []
for u in OOB["red"]:
    if u["id"] not in seen:
        seen.add(u["id"])
        deduped.append(u)
OOB["red"] = deduped

# ── Hex math (odd-q offset, flat-top) ────────────────────────────────────────

def cube(col, row):
    x = col
    z = row - (col - (col & 1)) // 2
    return x, -x - z, z

def oddq(x, z):
    return x, z + (x - (x & 1)) // 2  # (col, row)

CUBE_DIRS = [(+1,-1,0),(+1,0,-1),(0,+1,-1),(-1,+1,0),(-1,0,+1),(0,-1,+1)]

def hex_neighbors(col, row):
    cx, cy, cz = cube(col, row)
    result = []
    for dx, dy, dz in CUBE_DIRS:
        nc, nr = oddq(cx + dx, cz + dz)
        if 0 <= nc < GRID_W and 0 <= nr < GRID_H:
            result.append((nc, nr))
    return result

def hex_dist(c1, r1, c2, r2):
    ax, ay, az = cube(c1, r1)
    bx, by, bz = cube(c2, r2)
    return max(abs(ax-bx), abs(ay-by), abs(az-bz))

def can_enter(category, col, row):
    t = TERRAIN[row][col]
    if category == "air":    return True
    if category == "land":   return t in (T_LAND, T_SHALLOW)
    if category == "submarine": return t not in (T_LAND, T_SHALLOW)
    return t != T_LAND  # surface

def bfs_path(category, src_c, src_r, dst_c, dst_r, max_steps, occupied):
    """Returns list of (col, row) from src to dst (inclusive), or [] if unreachable."""
    if src_c == dst_c and src_r == dst_r:
        return [(src_c, src_r)]
    q = deque()
    q.append((src_c, src_r, [(src_c, src_r)]))
    visited = {(src_c, src_r)}
    while q:
        cc, cr, path = q.popleft()
        if len(path) > max_steps:
            continue
        for nc, nr in hex_neighbors(cc, cr):
            if (nc, nr) in visited:
                continue
            if not can_enter(category, nc, nr):
                continue
            new_path = path + [(nc, nr)]
            if nc == dst_c and nr == dst_r:
                return new_path
            if len(new_path) < max_steps and (nc, nr) not in occupied:
                visited.add((nc, nr))
                q.append((nc, nr, new_path))
    return []

# ── Initialisation ────────────────────────────────────────────────────────────

def init_units():
    units = []
    for team, force in OOB.items():
        for tmpl in force:
            u = {
                "id":        tmpl["id"],
                "team":      team,
                "col":       tmpl["col"],
                "row":       tmpl["row"],
                "hp":        tmpl["maxHp"],
                "maxHp":     tmpl["maxHp"],
                "category":  tmpl["category"],
                "type":      tmpl["id"].lower().replace("-", "_"),
                "moved":     False,
                "movement":  tmpl["movement"],
                "attackRange": tmpl["attackRange"],
                "weapons":   copy.deepcopy(tmpl["weapons"]),
                "fuel":      None,
                "airStatus": None,
            }
            units.append(u)
    return units

def snapshot(units, turn, period, phase):
    return {
        "turn":   turn,
        "period": period,
        "phase":  phase,
        "units":  [
            {
                "id":        u["id"],
                "team":      u["team"],
                "col":       u["col"],
                "row":       u["row"],
                "hp":        u["hp"],
                "maxHp":     u["maxHp"],
                "category":  u["category"],
                "type":      u["type"],
                "moved":     u["moved"],
                "fuel":      u["fuel"],
                "weapons":   u["weapons"],
                "airStatus": u["airStatus"],
            }
            for u in units
        ],
    }

def ts():
    return datetime.now(timezone.utc).isoformat()

# ── Heurística de movimento ───────────────────────────────────────────────────

def best_move(unit, enemies, units, noise=0.3):
    """Retorna (dst_col, dst_row, path) para o melhor hex a mover."""
    if unit["movement"] == 0:
        return unit["col"], unit["row"], [{"col": unit["col"], "row": unit["row"]}]

    alive_enemies = [e for e in enemies if e["hp"] > 0]
    if not alive_enemies:
        return unit["col"], unit["row"], [{"col": unit["col"], "row": unit["row"]}]

    occupied = {(u["col"], u["row"]) for u in units if u["hp"] > 0 and u["id"] != unit["id"]}

    atk_range = unit["attackRange"]

    # Escolhe alvo: preferencialmente inimigo que podemos atacar, mais próximo
    attackable = [
        e for e in alive_enemies
        if atk_range.get(e["category"], 0) > 0
    ]
    candidates = attackable if attackable else alive_enemies

    # Injeta ruído: com probabilidade noise escolhe um alvo aleatório
    if random.random() < noise:
        target = random.choice(candidates)
    else:
        target = min(candidates, key=lambda e: hex_dist(unit["col"], unit["row"], e["col"], e["row"]))

    desired_range = max(1, atk_range.get(target["category"], 1))

    # Se já está a distância de ataque, fica (ou move levemente)
    cur_dist = hex_dist(unit["col"], unit["row"], target["col"], target["row"])
    if cur_dist <= desired_range:
        # Com alguma chance move para outro hex adjacente (variação táctica)
        if random.random() < 0.2:
            for nc, nr in hex_neighbors(unit["col"], unit["row"]):
                if (nc, nr) not in occupied and can_enter(unit["category"], nc, nr):
                    path = [(unit["col"], unit["row"]), (nc, nr)]
                    return nc, nr, [{"col": c, "row": r} for c, r in path]
        return unit["col"], unit["row"], [{"col": unit["col"], "row": unit["row"]}]

    path = bfs_path(unit["category"], unit["col"], unit["row"],
                    target["col"], target["row"], unit["movement"], occupied)
    if path and len(path) >= 2:
        dc, dr = path[-1]
        return dc, dr, [{"col": c, "row": r} for c, r in path]

    # Fallback: mover 1 hex na direcção do alvo
    best_n = None
    best_d = cur_dist
    for nc, nr in hex_neighbors(unit["col"], unit["row"]):
        if (nc, nr) in occupied or not can_enter(unit["category"], nc, nr):
            continue
        d = hex_dist(nc, nr, target["col"], target["row"])
        if d < best_d:
            best_d = d
            best_n = (nc, nr)
    if best_n:
        dc, dr = best_n
        path = [{"col": unit["col"], "row": unit["row"]}, {"col": dc, "row": dr}]
        return dc, dr, path

    return unit["col"], unit["row"], [{"col": unit["col"], "row": unit["row"]}]

# ── Heurística de combate ──────────────────────────────────────────────────────

def choose_attacks(unit, enemies):
    """Retorna lista de {attackerId, targetId, amount} para o ataque desta unidade."""
    atk_range = unit["attackRange"]
    in_range = [
        e for e in enemies
        if e["hp"] > 0 and hex_dist(unit["col"], unit["row"], e["col"], e["row"]) <= atk_range.get(e["category"], 0)
    ]
    if not in_range:
        return []
    # Ataca o inimigo com menos HP (foco de fogo)
    target = min(in_range, key=lambda e: e["hp"])
    # Determina quantidade de armas a usar (1 míssil)
    weapon_amount = None
    for wpn in unit["weapons"].values():
        if isinstance(wpn, dict) and wpn.get("quantity", 0) > 0:
            weapon_amount = 1
            break
    return [{"attackerId": unit["id"], "targetId": target["id"], "amount": weapon_amount}]

def apply_damage(attacks, all_units):
    """Aplica 1 HP de dano por ataque ao alvo."""
    uid_map = {u["id"]: u for u in all_units}
    for atk in attacks:
        tid = atk.get("targetId")
        if tid and tid in uid_map:
            uid_map[tid]["hp"] = max(0, uid_map[tid]["hp"] - 1)

# ── Simulação de uma partida ──────────────────────────────────────────────────

def simulate_game(game_idx, noise=0.35):
    room_id = f"synthetic_{game_idx:04d}"
    events  = []

    def ev(record):
        events.append(json.dumps(record))

    units = init_units()
    turn  = 1

    ev({
        "event": "game_start",
        "ts":    ts(),
        "room":  room_id,
        "state": snapshot(units, turn, 1, "movement"),
    })

    for turn in range(1, MAX_TURNS + 1):
        for team in ["blue", "red"]:
            enemies = [u for u in units if u["team"] != team and u["hp"] > 0]
            friends = [u for u in units if u["team"] == team  and u["hp"] > 0]

            if not friends or not enemies:
                break

            # ─ Fase de movimento ────────────────────────────────────────────
            state_before_move = snapshot(units, turn, 1, "movement")
            moves_log = []

            for u in friends:
                if u["movement"] == 0:
                    continue
                dc, dr, path = best_move(u, enemies, units, noise)
                if len(path) >= 2:
                    moves_log.append({"unitId": u["id"], "path": path})
                    u["col"] = dc
                    u["row"] = dr
                u["moved"] = True

            ev({
                "event":  "movement_committed",
                "ts":     ts(),
                "room":   room_id,
                "turn":   turn,
                "period": 1,
                "team":   team,
                "moves":  moves_log,
                "state":  state_before_move,
            })

            # ─ Fase de combate ───────────────────────────────────────────────
            # Re-fetch enemies (positions may have changed this turn)
            enemies = [u for u in units if u["team"] != team and u["hp"] > 0]
            friends = [u for u in units if u["team"] == team  and u["hp"] > 0]

            state_before_atk = snapshot(units, turn, 1, "attack")
            all_attacks = []

            for u in friends:
                atks = choose_attacks(u, enemies)
                all_attacks.extend(atks)

            if all_attacks:
                ev({
                    "event":   "attacks_declared",
                    "ts":      ts(),
                    "room":    room_id,
                    "turn":    turn,
                    "period":  1,
                    "team":    team,
                    "attacks": all_attacks,
                    "state":   state_before_atk,
                })
                apply_damage(all_attacks, units)

            # Reset moved flag
            for u in units:
                u["moved"] = False

        # Verifica vitória
        blue_alive = [u for u in units if u["team"] == "blue" and u["hp"] > 0 and u["movement"] > 0]
        red_alive  = [u for u in units if u["team"] == "red"  and u["hp"] > 0 and u["movement"] > 0]

        if not blue_alive or not red_alive:
            break

    # Determina vencedor
    blue_hp = sum(u["hp"] for u in units if u["team"] == "blue")
    red_hp  = sum(u["hp"] for u in units if u["team"] == "red")
    winner  = "blue" if blue_hp > red_hp else "red"

    ev({
        "event":      "game_over",
        "ts":         ts(),
        "room":       room_id,
        "turn":       turn,
        "winner":     winner,
        "reason":     "victory",
        "objectives": {},
        "state":      snapshot(units, turn, 1, "end"),
    })

    return room_id, events

# ── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print(f"[INFO] Gerando {N_GAMES} partidas sintéticas em {LOG_DIR}")
    move_count   = 0
    attack_count = 0

    for i in range(N_GAMES):
        noise = random.uniform(0.15, 0.5)
        room_id, events = simulate_game(i, noise)
        out = LOG_DIR / f"{room_id}.jsonl"
        out.write_text("\n".join(events) + "\n", encoding="utf-8")
        for ev in events:
            rec = json.loads(ev)
            if rec["event"] == "movement_committed":
                move_count += len(rec.get("moves", []))
            elif rec["event"] == "attacks_declared":
                attack_count += len(rec.get("attacks", []))

    print(f"[OK] {N_GAMES} arquivos gerados")
    print(f"[OK] ~{move_count} exemplos de movimento  |  ~{attack_count} exemplos de combate")
    print(f"     Execute: python ml/train_bot.py")
