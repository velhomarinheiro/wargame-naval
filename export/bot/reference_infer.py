"""
reference_infer.py — Referência mínima e AUTOSSUFICIENTE de como consumir os
modelos ONNX do bot em outro simulador. Depende apenas de numpy + onnxruntime.

Demonstra: (1) codificação do tensor de estado (9x10x16), (2) inferência das
duas redes, (3) decodificação dos logits em células (idx = row*16 + col).

A lógica completa de decisão (top-30 + BFS de movimento + alcance de ataque)
está documentada no README; aqui mostramos o núcleo portável (encode + rank).
Os dados de unidade (posição, hp, categoria, combustível, armas) vêm do
simulador hospedeiro — abaixo usamos um estado de exemplo.

Uso:
    python reference_infer.py
"""
import numpy as np
import onnxruntime as ort

GRID_W, GRID_H, N_CH = 16, 10, 9


def encode_state(units):
    """units: lista de dicts com col,row,hp,maxHp,team,category,fuel,weapons."""
    t = np.zeros((1, N_CH, GRID_H, GRID_W), dtype=np.float32)
    for u in units:
        if u.get("hp", 0) <= 0:
            continue
        c, r = u["col"], u["row"]
        if not (0 <= c < GRID_W and 0 <= r < GRID_H):
            continue
        fuel = u.get("fuel") or {}
        wpns = u.get("weapons") or {}
        wtot = sum(w.get("quantity", 0) for w in wpns.values() if isinstance(w, dict))
        t[0, 0, r, c] = 1.0
        t[0, 1, r, c] = 1.0 if u["team"] == "blue" else -1.0
        t[0, 2, r, c] = (u["hp"] / u["maxHp"]) if u.get("maxHp") else 0.0
        t[0, 3, r, c] = float(u.get("category") == "surface")
        t[0, 4, r, c] = float(u.get("category") == "submarine")
        t[0, 5, r, c] = float(u.get("category") == "air")
        t[0, 6, r, c] = float(u.get("category") == "land")
        t[0, 7, r, c] = (fuel.get("current", 0) / fuel["max"]) if fuel.get("max") else 1.0
        t[0, 8, r, c] = min(wtot / 20.0, 1.0)
    return t


def ranked_cells(logits, top=30):
    flat = np.asarray(logits).reshape(-1)
    order = np.argsort(-flat)[:top]
    return [(int(i % GRID_W), int(i // GRID_W), float(flat[i])) for i in order]


if __name__ == "__main__":
    move = ort.InferenceSession("move_net.onnx")
    atk = ort.InferenceSession("attack_net.onnx")

    # Estado de exemplo (2 unidades). Substitua pelo estado real do seu simulador.
    units = [
        {"id": "BLUE-SAG-P", "team": "blue", "col": 3, "row": 4, "hp": 4, "maxHp": 4,
         "category": "surface", "fuel": {"current": 12, "max": 12},
         "weapons": {"mss": {"quantity": 16}}},
        {"id": "RED-GE-1", "team": "red", "col": 14, "row": 1, "hp": 12, "maxHp": 12,
         "category": "surface", "fuel": {"current": 20, "max": 20},
         "weapons": {"ascm": {"quantity": 14}, "lacm": {"quantity": 8}}},
    ]

    state = encode_state(units)
    mv = move.run(None, {"state": state})[0]
    at = atk.run(None, {"state": state})[0]

    print("Top-5 células de MOVIMENTO (col,row,score):")
    for c, r, s in ranked_cells(mv, 5):
        print(f"  ({c:2d},{r:2d})  score={s:.3f}")
    print("Top-5 células de ATAQUE (col,row,score):")
    for c, r, s in ranked_cells(at, 5):
        print(f"  ({c:2d},{r:2d})  score={s:.3f}")
