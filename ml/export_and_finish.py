"""
export_and_finish.py — Exporta move_net.pt já salvo e treina + exporta attack_net.

Uso:
    python ml/export_and_finish.py

Evita retreinar o move_net; reutiliza ml/models/move_net_best.pt.
"""

import sys
sys.path.insert(0, str(__import__("pathlib").Path(__file__).parent.parent))

import torch
from ml.train_bot import (
    HexNet, N_CHANNELS, GRID_H, GRID_W,
    MODEL_DIR, LOG_DIR,
    load_logs, build_attack_samples, run,
    export_onnx,
)

# ── 1. Exporta move_net a partir do .pt salvo ─────────────────────────────────
pt = MODEL_DIR / "move_net_best.pt"
if pt.exists():
    print("── Exportando move_net (já treinado) ──")
    m = HexNet()
    m.load_state_dict(torch.load(pt, weights_only=True))
    export_onnx(m, MODEL_DIR / "move_net.onnx")
else:
    print("[AVISO] move_net_best.pt não encontrado — execute train_bot.py completo.")

# ── 2. Treina e exporta attack_net ────────────────────────────────────────────
df             = load_logs()
attack_samples = build_attack_samples(df)
run(attack_samples, "attack_net")

print("\n✓ Pronto. Modelos em ml/models/")
