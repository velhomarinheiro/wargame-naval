"""
simulate_games.py — Gerador de dados sintéticos com 3 estratégias de bot heurístico

Estratégias implementadas
  aggressive — avança direto ao alvo de maior valor, dispara com salva completa
  defensive  — mantém perímetro, dispara só quando ameaçado, prioriza interceptação
  flanking   — manobra indireta via rota de flanco, visa logística e objetivos

Mecânicas reproduzidas do servidor (shared/combat_config.js, fuel_model.js, server.js)
  • Grid hex odd-q flat-top 10×16 — convertido de oddq ↔ cubo
  • Terreno com restrições por categoria (canEnterTerrain)
  • BFS com máximo de passos = movement da unidade
  • Seleção de arma por WEAPON_PRIORITY (ascm > asbm > mss > torpedo …)
  • Resolução de combate com tabelas d6 (damageTables de combat_config.js)
  • Interceção de mísseis (airDefense / bmd) com rolagem independente
  • Gasto de munição expendável (expendable=True)
  • Modelo de combustível naval (UNIT_FP / NAVAL_FP) e aéreo
  • Recarregamento de armas em portos (blue land) e bases aéreas

Uso
  python ml/simulate_games.py [--games 120] [--out data/game-logs]
"""

from __future__ import annotations
import argparse, copy, json, math, pathlib, random, sys
from collections import deque
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional

# ── CLI ───────────────────────────────────────────────────────────────────────
_parser = argparse.ArgumentParser()
_parser.add_argument("--games", type=int, default=120)
_parser.add_argument("--out",   type=str,
                     default=str(pathlib.Path(__file__).parent.parent / "data" / "game-logs"))
ARGS = _parser.parse_args()

LOG_DIR = pathlib.Path(ARGS.out)
LOG_DIR.mkdir(parents=True, exist_ok=True)

# ── Constantes de grid e terreno ──────────────────────────────────────────────
GRID_W, GRID_H = 16, 10
MAX_TURNS      = 18
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

# ── Perfis de armas (combat_config.js → weaponProfiles) ──────────────────────
WEAPON_PROFILES = {
    "ascm":      {"expendable":True,  "defaultRange":6,  "targets":["surface"],
                  "interceptableBy":["airDefense"], "damageProfile":"ascmSurface"},
    "mss":       {"expendable":True,  "defaultRange":3,  "targets":["surface"],
                  "interceptableBy":["airDefense"], "damageProfile":"mssSurface"},
    "torpedo":   {"expendable":True,  "defaultRange":2,  "targets":["surface","submarine"],
                  "interceptableBy":[], "damageProfile":"torpedo"},
    "lacm":      {"expendable":True,  "defaultRange":10, "targets":["land"],
                  "interceptableBy":["airDefense","bmd"], "damageProfile":"lacm"},
    "asbm":      {"expendable":True,  "defaultRange":10, "targets":["surface"],
                  "interceptableBy":["bmd"], "damageProfile":"asbmSurface"},
    "navalGun":  {"expendable":False, "defaultRange":1,  "targets":["surface","land"],
                  "interceptableBy":[], "damageProfile":"navalGun"},
    "airDefense":{"expendable":False, "defaultRange":1,  "targets":["air"],
                  "interceptableBy":[], "damageProfile":"airDefense"},
    "bmd":       {"expendable":False, "defaultRange":1,  "targets":["air"],
                  "interceptableBy":[], "damageProfile":"bmd"},
    "asw":       {"expendable":False, "defaultRange":2,  "targets":["submarine"],
                  "interceptableBy":[], "damageProfile":"asw"},
    "airAttack": {"expendable":False, "defaultRange":4,  "targets":["surface","air","land"],
                  "interceptableBy":["airDefense"], "damageProfile":"airAttack"},
    "sabotage":  {"expendable":True,  "defaultRange":2,  "targets":["surface","land"],
                  "interceptableBy":[], "damageProfile":"sabotage"},
}

# 'd' = rolar 1d6 adicional para dano
_D = "d"
DAMAGE_TABLES = {
    "ascmSurface": {"surface":   {1:0,2:0,3:0,4:_D,5:_D,6:_D}},
    "mssSurface":  {"surface":   {1:0,2:0,3:1,4:1, 5:1, 6:_D}},
    "torpedo":     {"surface":   {1:0,2:0,3:1,4:1, 5:_D,6:_D},
                    "submarine": {1:0,2:0,3:1,4:1, 5:_D,6:_D}},
    "lacm":        {"land":      {1:0,2:0,3:1,4:1, 5:_D,6:_D}},
    "asbmSurface": {"surface":   {1:0,2:0,3:0,4:_D,5:_D,6:_D}},
    "navalGun":    {"surface":   {1:0,2:0,3:1,4:1, 5:1, 6:1},
                    "land":      {1:0,2:0,3:0,4:1, 5:1, 6:1}},
    "airDefense":  {"air":       {1:0,2:0,3:0,4:0, 5:1, 6:1},
                    "missile":   {1:0,2:0,3:0,4:0, 5:1, 6:1}},
    "bmd":         {"air":       {1:0,2:0,3:0,4:0, 5:1, 6:1},
                    "missile":   {1:0,2:0,3:0,4:0, 5:1, 6:1}},
    "asw":         {"submarine": {1:0,2:0,3:0,4:1, 5:1, 6:_D}},
    "sabotage":    {"surface":   {1:0,2:0,3:1,4:1, 5:2, 6:_D},
                    "land":      {1:0,2:0,3:1,4:1, 5:2, 6:_D}},
    "airAttack":   {"surface":   {1:0,2:0,3:0,4:1, 5:_D,6:_D},
                    "air":       {1:0,2:0,3:0,4:1, 5:1, 6:_D},
                    "land":      {1:0,2:0,3:0,4:1, 5:1, 6:_D}},
}

WEAPON_PRIORITY = {
    "surface":   ["ascm","asbm","mss","torpedo","airAttack","navalGun","sabotage"],
    "submarine": ["asw","torpedo"],
    "air":       ["airDefense","airAttack"],
    "land":      ["lacm","airAttack","navalGun","sabotage"],
}

# Alvos legítimos para sabotagem por equipes de Op.Esp.
_OPSESP_TARGET_IDS = frozenset({
    "BLUE-FPSO1","BLUE-FPSO2","BLUE-FPSO3","BLUE-FPSO4",
    "BLUE-PORTO-S","BLUE-PORTO-RJ","BLUE-PORTO-V","BLUE-PORTO-ACU",
    "BLUE-AERO-RJ","BLUE-AERO-SP","BLUE-AERO-CF",
})

SALVO_SIZE = {"ascm":2,"mss":2,"torpedo":1,"lacm":1,"asbm":1}

# ── Valores de combustível naval (fuel_model.js → UNIT_FP) ───────────────────
UNIT_FP = {
    "BLUE-SAG-P":12,"BLUE-SAG-S1":10,"BLUE-SAG-S2":10,"BLUE-ANFIB":8,
    "BLUE-LOG-A":30,"BLUE-LOG-T":40,"BLUE-PAT-O1":10,"BLUE-PAT-O2":10,
    "BLUE-PAT-C1":6,"BLUE-PAT-C2":6,
    "RED-GE-1":12,"RED-GE-2":12,"RED-GE-3":10,"RED-AOR-G":24,
    "RED-GANF":12,"RED-GLOG":30,"RED-AKE":8,
}
SUB_FP   = 20  # submarinos convencionais
FUEL_CAP = 4   # FP máximo gasto por turno

# ── Ordem de batalha (order_of_battle.js — condensada) ───────────────────────
OOB: dict[str, list[dict]] = {
"blue": [
  {"id":"BLUE-SAG-P",    "cat":"surface",   "col":3, "row":4,"hp":4, "mov":4,
   "atr":{"surface":3,"air":1,"submarine":2,"land":2},
   "wpn":{"mss":{"q":16,"r":3}},"cap":{"asw":4,"airAttack":6,"airDefense":3}},
  {"id":"BLUE-SAG-S1",   "cat":"surface",   "col":5, "row":4,"hp":9, "mov":4,
   "atr":{"surface":2,"air":1,"submarine":1,"land":1},
   "wpn":{"mss":{"q":18,"r":2}},"cap":{"navalGun":3,"airDefense":6,"asw":3,"airAttack":3}},
  {"id":"BLUE-SAG-S2",   "cat":"surface",   "col":3, "row":5,"hp":10,"mov":4,
   "atr":{"surface":2,"air":1,"submarine":1,"land":1},
   "wpn":{"mss":{"q":24,"r":2}},"cap":{"navalGun":4,"airDefense":6,"asw":4,"airAttack":2}},
  {"id":"BLUE-ANFIB",    "cat":"surface",   "col":2, "row":4,"hp":10,"mov":2,
   "atr":{"surface":3,"air":1,"submarine":2,"land":2},
   "wpn":{},"cap":{"navalGun":3,"airDefense":3,"asw":4}},
  {"id":"BLUE-LOG-A",    "cat":"surface",   "col":3, "row":3,"hp":3, "mov":2,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},
   "wpn":{},"cap":{},"logistic":True},
  {"id":"BLUE-LOG-T",    "cat":"surface",   "col":5, "row":1,"hp":3, "mov":2,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},
   "wpn":{},"cap":{},"logistic":True,"tanker":True},
  {"id":"BLUE-PAT-O1",   "cat":"surface",   "col":7, "row":1,"hp":4, "mov":4,
   "atr":{"surface":2,"air":1,"submarine":0,"land":0},
   "wpn":{"mss":{"q":4,"r":2}},"cap":{"navalGun":2,"airDefense":2,"airAttack":2}},
  {"id":"BLUE-PAT-O2",   "cat":"surface",   "col":4, "row":7,"hp":4, "mov":4,
   "atr":{"surface":2,"air":1,"submarine":0,"land":0},
   "wpn":{"mss":{"q":4,"r":2}},"cap":{"navalGun":2,"airDefense":2,"airAttack":2}},
  {"id":"BLUE-PAT-C1",   "cat":"surface",   "col":4, "row":4,"hp":2, "mov":3,
   "atr":{"surface":1,"air":0,"submarine":0,"land":0},
   "wpn":{"mss":{"q":2,"r":1}},"cap":{"navalGun":2}},
  {"id":"BLUE-PAT-C2",   "cat":"surface",   "col":5, "row":2,"hp":2, "mov":3,
   "atr":{"surface":1,"air":0,"submarine":0,"land":0},
   "wpn":{"mss":{"q":2,"r":1}},"cap":{"navalGun":2}},
  {"id":"BLUE-SUB-N",    "cat":"submarine", "col":7, "row":4,"hp":3, "mov":4,
   "atr":{"surface":3,"air":0,"submarine":2,"land":1},
   "wpn":{"ascm":{"q":2,"r":6},"mss":{"q":4,"r":2},"torpedo":{"q":12,"r":2}},
   "cap":{"asw":1},"nuclear":True},
  {"id":"BLUE-SUB-1",    "cat":"submarine", "col":6, "row":2,"hp":2, "mov":2,
   "atr":{"surface":2,"air":0,"submarine":1,"land":0},
   "wpn":{"mss":{"q":2,"r":2},"torpedo":{"q":6,"r":2}},"cap":{"asw":1}},
  {"id":"BLUE-SUB-2",    "cat":"submarine", "col":3, "row":6,"hp":2, "mov":2,
   "atr":{"surface":2,"air":0,"submarine":1,"land":0},
   "wpn":{"mss":{"q":2,"r":2},"torpedo":{"q":6,"r":2}},"cap":{"asw":1}},
  {"id":"BLUE-SUB-3",    "cat":"submarine", "col":4, "row":4,"hp":2, "mov":2,
   "atr":{"surface":2,"air":0,"submarine":1,"land":0},
   "wpn":{"mss":{"q":2,"r":2},"torpedo":{"q":6,"r":2}},"cap":{"asw":1}},
  {"id":"BLUE-MPRA-1",   "cat":"air",       "col":1, "row":3,"hp":2, "mov":12,
   "atr":{"surface":3,"air":0,"submarine":1,"land":0},
   "wpn":{"mss":{"q":4,"r":2},"torpedo":{"q":2,"r":2}},"cap":{"asw":2,"airAttack":2}},
  {"id":"BLUE-MPRA-2",   "cat":"air",       "col":1, "row":3,"hp":2, "mov":12,
   "atr":{"surface":3,"air":0,"submarine":1,"land":0},
   "wpn":{"mss":{"q":4,"r":2},"torpedo":{"q":2,"r":2}},"cap":{"asw":2,"airAttack":2}},
  {"id":"BLUE-CACA-1",   "cat":"air",       "col":0, "row":3,"hp":6, "mov":7,
   "atr":{"surface":0,"air":2,"submarine":0,"land":0},
   "wpn":{},"cap":{"airDefense":6,"airAttack":6}},
  {"id":"BLUE-CACA-2",   "cat":"air",       "col":0, "row":3,"hp":6, "mov":7,
   "atr":{"surface":0,"air":2,"submarine":0,"land":0},
   "wpn":{},"cap":{"airDefense":6,"airAttack":6}},
  {"id":"BLUE-CJAT-1",   "cat":"air",       "col":3, "row":3,"hp":2, "mov":5,
   "atr":{"surface":1,"air":1,"submarine":0,"land":1},
   "wpn":{"ascm":{"q":4,"r":6},"mss":{"q":2,"r":2},"lacm":{"q":2,"r":10}},
   "cap":{"airAttack":2}},
  {"id":"BLUE-CJAT-2",   "cat":"air",       "col":3, "row":3,"hp":2, "mov":5,
   "atr":{"surface":1,"air":1,"submarine":0,"land":1},
   "wpn":{"ascm":{"q":4,"r":6},"mss":{"q":2,"r":2},"lacm":{"q":2,"r":10}},
   "cap":{"airAttack":2}},
  {"id":"BLUE-DCOST1",   "cat":"land",      "col":4, "row":2,"hp":2, "mov":1,
   "atr":{"surface":3,"air":0,"submarine":0,"land":0},
   "wpn":{"mss":{"q":10,"r":3}},"cap":{"airDefense":2}},
  {"id":"BLUE-DCOST2",   "cat":"land",      "col":1, "row":4,"hp":2, "mov":1,
   "atr":{"surface":3,"air":0,"submarine":0,"land":0},
   "wpn":{"mss":{"q":10,"r":3}},"cap":{"airDefense":2}},
  {"id":"BLUE-ADA-1",    "cat":"land",      "col":3, "row":1,"hp":2, "mov":1,
   "atr":{"surface":0,"air":2,"submarine":0,"land":0},
   "wpn":{},"cap":{"airDefense":6,"bmd":2}},
  {"id":"BLUE-ADA-2",    "cat":"land",      "col":0, "row":5,"hp":2, "mov":1,
   "atr":{"surface":0,"air":2,"submarine":0,"land":0},
   "wpn":{},"cap":{"airDefense":6,"bmd":2}},
  {"id":"BLUE-FPSO1",    "cat":"surface",   "col":6, "row":3,"hp":6, "mov":0,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},"wpn":{},"cap":{},"fpso":True},
  {"id":"BLUE-FPSO2",    "cat":"surface",   "col":5, "row":3,"hp":6, "mov":0,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},"wpn":{},"cap":{},"fpso":True},
  {"id":"BLUE-FPSO3",    "cat":"surface",   "col":4, "row":5,"hp":6, "mov":0,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},"wpn":{},"cap":{},"fpso":True},
  {"id":"BLUE-FPSO4",    "cat":"surface",   "col":2, "row":6,"hp":6, "mov":0,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},"wpn":{},"cap":{},"fpso":True},
  {"id":"BLUE-PORTO-S",  "cat":"land",      "col":0, "row":5,"hp":20,"mov":0,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},"wpn":{},"cap":{},"port":True},
  {"id":"BLUE-PORTO-RJ", "cat":"land",      "col":2, "row":4,"hp":20,"mov":0,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},"wpn":{},"cap":{},"port":True},
  {"id":"BLUE-PORTO-V",  "cat":"land",      "col":5, "row":1,"hp":16,"mov":0,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},"wpn":{},"cap":{},"port":True},
  {"id":"BLUE-PORTO-ACU","cat":"land",      "col":4, "row":3,"hp":12,"mov":0,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},"wpn":{},"cap":{},"port":True},
  {"id":"BLUE-AERO-RJ", "cat":"land",      "col":0, "row":3,"hp":10,"mov":0,
   "atr":{"surface":1,"air":2,"submarine":0,"land":1},"wpn":{},"cap":{},"aero":True},
  {"id":"BLUE-AERO-SP", "cat":"land",      "col":1, "row":3,"hp":10,"mov":0,
   "atr":{"surface":1,"air":2,"submarine":0,"land":1},"wpn":{},"cap":{},"aero":True},
  {"id":"BLUE-AERO-CF", "cat":"land",      "col":2, "row":3,"hp":10,"mov":0,
   "atr":{"surface":1,"air":2,"submarine":0,"land":1},"wpn":{},"cap":{},"aero":True},
],
"red": [
  {"id":"RED-GBPA",     "cat":"surface",   "col":15,"row":1,"hp":6, "mov":4,
   "atr":{"surface":4,"air":1,"submarine":2,"land":2},
   "wpn":{"mss":{"q":10,"r":3}},"cap":{"airDefense":3,"asw":6,"airAttack":8},"carrier":True},
  {"id":"RED-GE-1",     "cat":"surface",   "col":14,"row":1,"hp":12,"mov":4,
   "atr":{"surface":6,"air":1,"submarine":2,"land":8},
   "wpn":{"ascm":{"q":14,"r":6},"mss":{"q":18,"r":3},"lacm":{"q":16,"r":12}},
   "cap":{"navalGun":6,"airDefense":13,"bmd":4,"asw":11}},
  {"id":"RED-GE-2",     "cat":"surface",   "col":14,"row":2,"hp":10,"mov":4,
   "atr":{"surface":6,"air":1,"submarine":2,"land":8},
   "wpn":{"ascm":{"q":8,"r":6},"mss":{"q":12,"r":3},"lacm":{"q":8,"r":12}},
   "cap":{"navalGun":4,"airDefense":8,"bmd":1,"asw":8}},
  {"id":"RED-GE-3",     "cat":"surface",   "col":14,"row":0,"hp":9, "mov":4,
   "atr":{"surface":2,"air":1,"submarine":1,"land":1},
   "wpn":{"mss":{"q":12,"r":3}},"cap":{"navalGun":3,"airDefense":6,"asw":3}},
  {"id":"RED-AOR-G",    "cat":"surface",   "col":15,"row":0,"hp":3, "mov":2,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},
   "wpn":{},"cap":{},"logistic":True,"tanker":True},
  {"id":"RED-GANF",     "cat":"surface",   "col":15,"row":2,"hp":14,"mov":3,
   "atr":{"surface":2,"air":1,"submarine":0,"land":2},
   "wpn":{},"cap":{"navalGun":4,"airDefense":4},"amphib":True},
  {"id":"RED-GLOG",     "cat":"surface",   "col":15,"row":3,"hp":6, "mov":2,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},
   "wpn":{},"cap":{},"logistic":True},
  {"id":"RED-AKE",      "cat":"surface",   "col":15,"row":4,"hp":6, "mov":2,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},
   "wpn":{},"cap":{},"logistic":True},
  {"id":"RED-KSN",      "cat":"submarine", "col":13,"row":2,"hp":3, "mov":4,
   "atr":{"surface":3,"air":0,"submarine":2,"land":8},
   "wpn":{"ascm":{"q":8,"r":6},"torpedo":{"q":12,"r":2},"lacm":{"q":8,"r":12}},
   "cap":{"asw":1},"nuclear":True},
  {"id":"RED-KS-1",     "cat":"submarine", "col":1, "row":8,"hp":2, "mov":2,
   "atr":{"surface":2,"air":0,"submarine":1,"land":0},
   "wpn":{"ascm":{"q":4,"r":6},"torpedo":{"q":6,"r":2}},"cap":{"asw":1}},
  {"id":"RED-KMF-1",    "cat":"air",       "col":15,"row":1,"hp":8, "mov":6,
   "atr":{"surface":2,"air":2,"submarine":0,"land":1},
   "wpn":{},"cap":{"airDefense":8,"airAttack":8}},
  {"id":"RED-KMF-2",    "cat":"air",       "col":15,"row":1,"hp":8, "mov":6,
   "atr":{"surface":2,"air":2,"submarine":0,"land":1},
   "wpn":{},"cap":{"airDefense":8,"airAttack":8}},
  {"id":"RED-MPRA-K1",  "cat":"air",       "col":15,"row":1,"hp":2, "mov":10,
   "atr":{"surface":2,"air":0,"submarine":1,"land":0},
   "wpn":{"ascm":{"q":2,"r":6},"mss":{"q":2,"r":2},"torpedo":{"q":2,"r":2}},
   "cap":{"asw":2,"airAttack":2}},
  {"id":"RED-MPRA-K2",  "cat":"air",       "col":15,"row":1,"hp":2, "mov":10,
   "atr":{"surface":2,"air":0,"submarine":1,"land":0},
   "wpn":{"ascm":{"q":2,"r":6},"mss":{"q":2,"r":2},"torpedo":{"q":2,"r":2}},
   "cap":{"asw":2,"airAttack":2}},
  {"id":"RED-AWACS-K",  "cat":"air",       "col":15,"row":1,"hp":2, "mov":8,
   "atr":{"surface":0,"air":0,"submarine":0,"land":0},
   "wpn":{},"cap":{}},
  {"id":"RED-OPSESP-1","cat":"surface",   "col":15,"row":1,"hp":2, "mov":0,
   "atr":{"surface":2,"air":0,"submarine":0,"land":2},
   "wpn":{"sabotage":{"q":3,"r":2}},"cap":{},"opsesp":True,"host":"RED-GBPA"},
  {"id":"RED-OPSESP-2","cat":"surface",   "col":1, "row":8,"hp":2, "mov":0,
   "atr":{"surface":2,"air":0,"submarine":0,"land":2},
   "wpn":{"sabotage":{"q":3,"r":2}},"cap":{},"opsesp":True,"host":"RED-KS-1"},
],
}

# ── Hex math (odd-q offset, flat-top) ─────────────────────────────────────────
_CUBE_DIRS = [(1,-1,0),(1,0,-1),(0,1,-1),(-1,1,0),(-1,0,1),(0,-1,1)]

def _cube(col: int, row: int):
    x = col; z = row - (col - (col & 1)) // 2; return x, -x-z, z

def _oddq(x: int, z: int):
    return x, z + (x - (x & 1)) // 2  # (col, row)

def hex_neighbors(col: int, row: int) -> list[tuple[int,int]]:
    cx, cy, cz = _cube(col, row)
    out = []
    for dx, dy, dz in _CUBE_DIRS:
        nc, nr = _oddq(cx+dx, cz+dz)
        if 0 <= nc < GRID_W and 0 <= nr < GRID_H:
            out.append((nc, nr))
    return out

def hex_dist(c1,r1,c2,r2) -> int:
    ax,ay,az = _cube(c1,r1); bx,by,bz = _cube(c2,r2)
    return max(abs(ax-bx), abs(ay-by), abs(az-bz))

def terrain(col: int, row: int) -> int:
    if row < 0 or row >= GRID_H or col < 0 or col >= GRID_W: return T_LAND
    return TERRAIN[row][col]

def can_enter(cat: str, col: int, row: int) -> bool:
    t = terrain(col, row)
    if cat == "air":       return True
    if cat == "land":      return t <= T_SHALLOW
    if cat == "submarine": return t >= T_SHELF
    return t >= T_SHALLOW  # surface

def bfs(cat: str, sc: int, sr: int, dc: int, dr: int,
        max_steps: int, occupied: set) -> list[tuple[int,int]] | None:
    """Returns path (inclusive) from (sc,sr) to (dc,dr) or None."""
    if sc == dc and sr == dr:
        return [(sc, sr)]
    q: deque = deque([(sc, sr, [(sc, sr)])])
    vis: set  = {(sc, sr)}
    while q:
        cc, cr, path = q.popleft()
        if len(path) >= max_steps + 1:
            continue
        for nc, nr in hex_neighbors(cc, cr):
            k = (nc, nr)
            if k in vis or not can_enter(cat, nc, nr):
                continue
            np = path + [k]
            if nc == dc and nr == dr:
                return np
            if k not in occupied:
                vis.add(k); q.append((nc, nr, np))
    return None

# ── Modelo de combustível ──────────────────────────────────────────────────────

def _uses_naval_fuel(spec: dict) -> bool:
    if spec.get("nuclear"):  return False
    if spec.get("carrier"):  return False    # RED-GBPA nuclear carrier
    if spec.get("fpso"):     return False
    if spec.get("port"):     return False
    if spec.get("aero"):     return False
    if spec.get("opsesp"):   return False    # equipe Op.Esp. sem combustível naval
    return spec["cat"] in ("surface", "submarine") and not spec.get("nuclear")

def init_fuel(u: dict, spec: dict):
    cat = spec["cat"]
    if cat == "air":
        u["fuel"]      = {"usesFuel":True,"fuelType":"air",
                           "current":spec["mov"],"max":spec["mov"],
                           "wasAtRefuelLocation":False}
        u["airStatus"] = "ready"
        return
    if not _uses_naval_fuel(spec):
        u["fuel"] = {"usesFuel":False,"fuelType":"none"}; return
    if cat == "submarine" and not spec.get("nuclear"):
        fp = SUB_FP
    else:
        fp = UNIT_FP.get(spec["id"], 12)
    u["fuel"] = {"usesFuel":True,"fuelType":"naval",
                 "current":fp,"max":fp,"spentThisTurn":0}

def fuel_ok(u: dict) -> bool:
    """False if naval unit has 0 FP (disabled)."""
    f = u.get("fuel") or {}
    return not (f.get("fuelType") == "naval" and f.get("current",1) <= 0)

def spend_naval_fuel(u: dict, dist: int):
    f = u.get("fuel") or {}
    if f.get("fuelType") != "naval": return
    cost = 1 if dist == 0 else (3 if dist >= 3 else dist)
    cap  = max(0, FUEL_CAP - f.get("spentThisTurn", 0))
    actual = min(cost, cap, f.get("current", 0))
    f["current"]      = max(0, f.get("current",0) - actual)
    f["spentThisTurn"] = f.get("spentThisTurn", 0) + actual

def spend_air_fuel(u: dict, dist: int):
    f = u.get("fuel") or {}
    if f.get("fuelType") != "air" or u.get("airStatus") != "airborne": return
    f["current"] = max(0, f.get("current",0) - dist)

def recover_fuel(units: list[dict]):
    """Naval units within range 1 of a logistics/tanker/port refuel."""
    providers = [(u["col"],u["row"]) for u in units
                 if (u.get("hp",0) > 0) and
                    (u.get("_logistic") or u.get("_tanker") or u.get("_port"))]
    for u in units:
        f = u.get("fuel") or {}
        if f.get("fuelType") != "naval": continue
        for pc, pr in providers:
            if hex_dist(u["col"], u["row"], pc, pr) <= 1:
                f["current"] = f["max"]
                break

def reset_fuel_counters(units: list[dict]):
    for u in units:
        f = u.get("fuel") or {}
        if "spentThisTurn" in f:
            f["spentThisTurn"] = 0

def recover_aircraft(units: list[dict]):
    """Aeronaves retornam automaticamente à base após o engajamento.
    Aeronaves vermelhas são destruídas se o porta-aviões for afundado."""
    carrier = next((u for u in units if u["id"] == "RED-GBPA" and u["hp"] > 0), None)
    for u in units:
        if u["cat"] != "air" or u["hp"] <= 0: continue
        if u["team"] == "red":
            if carrier is None:
                u["hp"] = 0  # porta-aviões afundado → aeronave perdida
                continue
            u["col"] = carrier["col"]
            u["row"] = carrier["row"]
        else:
            u["col"] = u.get("_base_col", u["col"])
            u["row"] = u.get("_base_row", u["row"])
        f = u.get("fuel") or {}
        if f.get("fuelType") == "air":
            f["current"] = f["max"]
            f["wasAtRefuelLocation"] = True
        u["airStatus"] = "ready"

def air_mov_range(u: dict) -> int:
    """Alcance de movimentação efetivo = mov fixo da unidade."""
    return u["mov"]

def _sync_opsesp(units: list[dict]):
    """Equipes de Op.Esp. seguem a posição da unidade hospedeira.
    Se a hospedeira for destruída, a equipe também é considerada perdida."""
    uid_map = {u["id"]: u for u in units}
    for u in units:
        if not u.get("_opsesp") or u["hp"] <= 0: continue
        host_id = u.get("_host_id")
        if not host_id: continue
        host = uid_map.get(host_id)
        if host:
            if host["hp"] > 0:
                u["col"] = host["col"]
                u["row"] = host["row"]
            else:
                u["hp"] = 0  # hospedeira afundada

def is_air_base(u: dict) -> bool:
    return u.get("cat") == "land" and (u.get("port") or u.get("id","").startswith("BLUE-AERO"))

# ── Combustível e munição ─────────────────────────────────────────────────────

def _fuel_critical(u: dict) -> bool:
    """True quando a unidade naval está abaixo de 40% do FP máximo."""
    f = u.get("fuel") or {}
    if f.get("fuelType") != "naval": return False
    cur = f.get("current", 0)
    mx  = f.get("max", 1)
    return cur > 0 and cur < max(4, int(mx * 0.40))

def _nearest_refuel_provider(unit: dict, all_units: list[dict]) -> dict | None:
    """Retorna a unidade amiga mais próxima capaz de reabastecer (tanque, logístico, porto)."""
    providers = []
    for u in all_units:
        if u["team"] != unit["team"] or u.get("hp", 0) <= 0: continue
        if u.get("_tanker") or u.get("_logistic"): providers.append(u)
        elif unit["team"] == "blue" and u.get("_port"):  providers.append(u)
    if not providers: return None
    return min(providers, key=lambda p: hex_dist(unit["col"],unit["row"],p["col"],p["row"]))

def _logistics_target(u: dict, all_units: list[dict]) -> dict | None:
    """Tanque/logístico: retorna aliado com menos FP que precisa de reabastecimento."""
    needy = []
    for a in all_units:
        if a["team"] != u["team"] or a.get("hp",0) <= 0 or a["id"] == u["id"]: continue
        f = a.get("fuel") or {}
        if f.get("fuelType") != "naval": continue
        cur = f.get("current", 0); mx = f.get("max", 1)
        if cur < mx:  # precisa de combustível
            needy.append((cur / max(1, mx), a))
    if not needy: return None
    needy.sort(key=lambda x: x[0])
    return needy[0][1]

# ── Doutrina: fatores de decisão alternáveis por partida e equipe ────────────
# formation:   concentrated (unidades de superfície convergem num alvo comum) |
#              dispersed    (cada unidade vetora para um alvo distinto)
# posture:     offensive (fecha distância, dispara mais cedo) |
#              defensive (mantém distância de segurança, mais cauteloso)
# engagement:  simultaneous (concentra fogo de categorias diferentes no mesmo
#              alvo quando possível) | sequential (cada unidade escolhe seu
#              próprio alvo, sem coordenação)
# fuel_policy: economize (reduz deslocamento não essencial) |
#              escort (acompanha o navio reabastecedor mais próximo) |
#              anchor (mantém-se a curta distância de um porto — só azul)
def random_doctrine() -> dict:
    return {
        "formation":   random.choice(["concentrated", "dispersed"]),
        "posture":     random.choice(["offensive", "defensive"]),
        "engagement":  random.choice(["simultaneous", "sequential"]),
        "fuel_policy": random.choice(["economize", "escort", "anchor"]),
    }

def _formation_targets(units: list[dict], enemies: list[dict], strategy: str,
                       doctrine: dict) -> dict:
    """Mapeia unitId -> alvo para unidades de superfície, conforme a formação.
    Concentrada: todas convergem no alvo de maior valor (poder de fogo somado).
    Dispersa: cada unidade recebe um alvo distinto (vetoração em grupos)."""
    surf = [u for u in units if u["cat"] == "surface"
            and not (u.get("_logistic") or u.get("_tanker") or u.get("_carrier")
                     or u.get("_amphib") or u.get("_opsesp"))]
    alive = [e for e in enemies if e["hp"] > 0]
    if not surf or not alive: return {}
    team = surf[0]["team"]
    if doctrine.get("formation") == "concentrated":
        main = max(alive, key=lambda e: _target_value(e["id"], team, strategy))
        return {u["id"]: main for u in surf}
    ranked = sorted(alive, key=lambda e: _target_value(e["id"], team, strategy),
                     reverse=True)
    return {u["id"]: ranked[i % len(ranked)] for i, u in enumerate(surf)}

def _posture_standoff(ideal_range: int, doctrine: dict) -> int:
    """Ajusta a distância de engajamento conforme a postura adotada."""
    posture = doctrine.get("posture")
    if posture == "offensive": return max(1, ideal_range - 1)
    if posture == "defensive": return ideal_range + 1
    return ideal_range

def _posture_noise_mult(doctrine: dict) -> float:
    """Postura ofensiva hesita menos; defensiva hesita mais antes de avançar."""
    posture = doctrine.get("posture")
    if posture == "offensive": return 0.6
    if posture == "defensive": return 1.3
    return 1.0

def _policy_mov_budget(u: dict, eff_mov: int, doctrine: dict) -> int:
    """Política de economia de combustível: reduz o orçamento de movimento
    não essencial das unidades navais, conservando FP."""
    if doctrine.get("fuel_policy") == "economize" and (u.get("fuel") or {}).get("fuelType") == "naval":
        return max(1, int(eff_mov * 0.6))
    return eff_mov

def _policy_move(u: dict, all_units: list[dict], doctrine: dict) -> list[dict] | None:
    """Reposicionamento preventivo segundo a política de combustível (antes da
    emergência, mas só quando o tanque já não está confortável): escort
    acompanha o reabastecedor mais próximo; anchor (azul) mantém-se próximo
    de um porto. Com tanque cheio, a unidade prioriza a missão normalmente."""
    f = u.get("fuel") or {}
    if f.get("fuelType") != "naval": return None
    cur, mx = f.get("current", 0), f.get("max", 1)
    if mx <= 0 or cur / mx >= 0.7: return None  # tanque confortável — sem desvio
    policy = doctrine.get("fuel_policy", "economize")
    if policy == "escort":
        prov = _nearest_refuel_provider(u, all_units)
        if prov and hex_dist(u["col"],u["row"],prov["col"],prov["row"]) > 2:
            return _towards(u, prov, all_units, u["mov"])
    elif policy == "anchor" and u["team"] == "blue":
        ports = [p for p in all_units if p.get("_port") and p.get("hp",0) > 0]
        if ports:
            nearest = min(ports, key=lambda p: hex_dist(u["col"],u["row"],p["col"],p["row"]))
            if hex_dist(u["col"],u["row"],nearest["col"],nearest["row"]) > 3:
                return _towards(u, nearest, all_units, u["mov"])
    return None

def _near_resupply(u: dict, all_units: list[dict]) -> bool:
    """True se a unidade tem chance realista de recompletar munição em breve
    (terrestre/aérea recarregam normalmente; navio azul perto de porto também).
    Navios vermelhos nunca recompletam munição naval — devem ser sempre conservadores."""
    if u["cat"] in ("land", "air"): return True
    if u["team"] != "blue": return False
    ports = [p for p in all_units if p.get("_port") and p.get("hp", 0) > 0]
    return any(hex_dist(u["col"],u["row"],p["col"],p["row"]) <= 2 for p in ports)

def _salvo_size(unit: dict, wpn: str, turn: int, all_units: list[dict] | None = None) -> int:
    """Tamanho de salva com conservação de munição.
    Nos primeiros turnos dispara apenas 1. Fora desse período, o gasto é limitado
    a 30% do estoque inicial — exceto quando há reabastecimento próximo viável,
    caso em que a unidade pode disparar a salva completa."""
    profile = WEAPON_PROFILES.get(wpn, {})
    if not profile.get("expendable"): return 1
    current = get_qty(unit, wpn)
    if current <= 0: return 0
    init    = (unit.get("init_weapons") or {}).get(wpn, {}).get("q", current)
    base    = SALVO_SIZE.get(wpn, 1)
    # Turnos 1-3: sempre dispara 1 (conserva munição inicial)
    if turn <= 3: return 1
    if all_units is not None and _near_resupply(unit, all_units):
        return min(base, current)
    # Sem reabastecimento à vista: nunca gasta mais de 30% do estoque original por salva
    max_spend = max(1, int(init * 0.30))
    return min(base, max_spend, current)

# ── Motor de combate ───────────────────────────────────────────────────────────

def d6() -> int: return random.randint(1, 6)

def get_qty(u: dict, wpn: str) -> int:
    q = (u.get("weapons") or {}).get(wpn)
    if q is not None: return q.get("quantity", 0)
    return (u.get("capabilities") or {}).get(wpn, 0)

def get_range(u: dict, wpn: str) -> int:
    w = (u.get("weapons") or {}).get(wpn)
    if w and "r" in w: return w["r"]
    return WEAPON_PROFILES.get(wpn,{}).get("defaultRange",0)

def spend_weapon(u: dict, wpn: str, n: int):
    ws = u.get("weapons") or {}
    if wpn in ws and WEAPON_PROFILES.get(wpn,{}).get("expendable"):
        ws[wpn]["q"] = max(0, ws[wpn].get("q", ws[wpn].get("quantity",0)) - n)
        ws[wpn]["quantity"] = ws[wpn]["q"]

def roll_damage(profile_name: str, tgt_cat: str) -> int:
    tbl = DAMAGE_TABLES.get(profile_name, {}).get(tgt_cat)
    if not tbl: return 0
    r = d6(); v = tbl.get(r, 0)
    if v == _D: return d6()
    return int(v)

def resolve_interception(defender: dict, wpn_type: str, amount: int) -> int:
    """Returns number of missiles intercepted."""
    profile = WEAPON_PROFILES.get(wpn_type, {})
    interceptors = profile.get("interceptableBy", [])
    remaining = amount
    for iw in interceptors:
        shots = min(remaining, get_qty(defender, iw))
        if shots <= 0: continue
        iprofile = WEAPON_PROFILES.get(iw, {})
        for _ in range(shots):
            if roll_damage(iprofile.get("damageProfile",""), "missile") > 0:
                remaining -= 1
        if remaining <= 0: break
    return max(0, amount - remaining)

def select_best_weapon(attacker: dict, tgt_cat: str, dist: int):
    for wpn in WEAPON_PRIORITY.get(tgt_cat, []):
        if get_qty(attacker, wpn) <= 0: continue
        p = WEAPON_PROFILES.get(wpn)
        if not p or tgt_cat not in p["targets"]: continue
        if dist <= get_range(attacker, wpn): return wpn
    return None

def max_wpn_range(unit: dict, tgt_cat: str) -> int:
    """Maior alcance real de arma desta unidade contra uma categoria."""
    best = 0
    for wpn in WEAPON_PRIORITY.get(tgt_cat, []):
        if get_qty(unit, wpn) <= 0: continue
        p = WEAPON_PROFILES.get(wpn)
        if not p or tgt_cat not in p["targets"]: continue
        best = max(best, get_range(unit, wpn))
    return best or 1

_DEGRADE_SEQ = ["movement", "airDefense", "asw", "detection", "fuel"]

def degrade_capabilities(unit: dict, damage: int):
    if damage <= 0: return
    max_hp = unit.get("maxHp", 1) or 1
    hit_n  = unit.get("_hit_count", 0)
    unit["_hit_count"] = hit_n + 1
    cap_type = _DEGRADE_SEQ[hit_n % len(_DEGRADE_SEQ)]
    ratio = damage / max_hp

    if cap_type == "movement":
        base = unit.get("_base_mov", unit.get("mov", 0))
        if base > 0:
            loss = max(1, round(ratio * base))
            unit["mov"]      = max(0, unit.get("mov", 0) - loss)
            unit["movement"] = unit["mov"]

    elif cap_type == "airDefense":
        caps = unit.get("capabilities") or {}
        base_caps = unit.get("_base_caps") or {}
        base = base_caps.get("airDefense", caps.get("airDefense", 0))
        if base > 0 and caps.get("airDefense", 0) > 0:
            loss = max(1, round(ratio * base))
            caps["airDefense"] = max(0, caps["airDefense"] - loss)

    elif cap_type == "asw":
        caps = unit.get("capabilities") or {}
        base_caps = unit.get("_base_caps") or {}
        base = base_caps.get("asw", caps.get("asw", 0))
        if base > 0 and caps.get("asw", 0) > 0:
            loss = max(1, round(ratio * base))
            caps["asw"] = max(0, caps["asw"] - loss)

    elif cap_type == "detection":
        atr = unit.get("atr") or {}
        base_atr = unit.get("_base_atr") or {}
        for k in atr:
            base = base_atr.get(k, atr[k])
            if base > 0:
                loss = max(1, round(ratio * base))
                atr[k] = max(0, atr[k] - loss)
        unit["attackRange"] = dict(atr)

    elif cap_type == "fuel":
        f = unit.get("fuel") or {}
        if f.get("fuelType") == "naval":
            base = unit.get("_base_fuel_max", f.get("max", 0))
            if base > 0 and f.get("max", 0) > 0:
                loss = max(1, round(ratio * base))
                f["max"]     = max(0, f.get("max", 0) - loss)
                f["current"] = min(f.get("current", 0), f["max"])

def resolve_attack(attacker: dict, defender: dict) -> int:
    """Returns total damage dealt; mutates defender.hp and attacker weapons."""
    dist = hex_dist(attacker["col"], attacker["row"], defender["col"], defender["row"])
    wpn  = select_best_weapon(attacker, defender["cat"], dist)
    if not wpn: return 0
    profile   = WEAPON_PROFILES[wpn]
    salvo     = SALVO_SIZE.get(wpn, 1)
    qty       = get_qty(attacker, wpn)
    launched  = min(salvo, qty)
    if launched <= 0: return 0
    spend_weapon(attacker, wpn, launched)
    intercepted = resolve_interception(defender, wpn, launched)
    effective   = launched - intercepted
    total       = sum(roll_damage(profile["damageProfile"], defender["cat"])
                      for _ in range(effective))
    defender["hp"] = max(0, defender["hp"] - total)
    if total > 0:
        degrade_capabilities(defender, total)
    return total

# ── Fábrica de unidades e snapshot ────────────────────────────────────────────

def make_unit(team: str, spec: dict) -> dict:
    u = {
        "id":       spec["id"],
        "team":     team,
        "col":      spec["col"],
        "row":      spec["row"],
        "hp":       spec["hp"],
        "maxHp":    spec["hp"],
        "cat":      spec["cat"],
        "category": spec["cat"],     # alias used by snapshot
        "type":     spec["id"].lower().replace("-","_"),
        "mov":      spec["mov"],
        "movement": spec["mov"],
        "atr":      dict(spec["atr"]),
        "attackRange": dict(spec["atr"]),
        "weapons":  {k:{"quantity":v["q"],"range":v.get("r",0),"q":v["q"],"r":v.get("r",0)}
                     for k,v in spec.get("wpn",{}).items()},
        "init_weapons": {k:{"quantity":v["q"],"range":v.get("r",0)}
                         for k,v in spec.get("wpn",{}).items()},
        "capabilities": dict(spec.get("cap", {})),
        "moved":    False,
        "fuel":     None,
        "airStatus":None,
        "stealthy": spec["cat"] == "submarine",
        # metadata tags (not logged to JSONL)
        "_logistic":spec.get("logistic",False),
        "_tanker":  spec.get("tanker",False),
        "_port":    spec.get("port",False),
        "_fpso":    spec.get("fpso",False),
        "_carrier": spec.get("carrier",False),
        "_amphib":  spec.get("amphib",False),
        "_nuclear": spec.get("nuclear",False),
        "_aero":    spec.get("aero",False),
        "_opsesp":  spec.get("opsesp",False),
        "_host_id": spec.get("host",None),
        # base de retorno para aeronaves
        "_base_col": spec["col"],
        "_base_row": spec["row"],
        # capability degradation tracking
        "_hit_count":    0,
        "_base_mov":     spec["mov"],
        "_base_caps":    dict(spec.get("cap", {})),
        "_base_atr":     dict(spec["atr"]),
        "_base_fuel_max":0,
    }
    init_fuel(u, spec)
    u["_base_fuel_max"] = (u.get("fuel") or {}).get("max", 0)
    return u

def snapshot(units: list[dict], turn: int, period: str, phase: str) -> dict:
    return {
        "turn": turn, "period": period, "phase": phase,
        "units": [{
            "id":        u["id"],
            "team":      u["team"],
            "col":       u["col"],
            "row":       u["row"],
            "hp":        u["hp"],
            "maxHp":     u["maxHp"],
            "category":  u["cat"],
            "type":      u["type"],
            "moved":     u["moved"],
            "fuel":      u.get("fuel"),
            "weapons":   {k:{"quantity":v["quantity"],"range":v["range"]}
                          for k,v in (u.get("weapons") or {}).items()},
            "airStatus": u.get("airStatus"),
        } for u in units],
    }

# ── Verificação de objetivos / vitória ─────────────────────────────────────────

def check_winner(units: list[dict]) -> str | None:
    def hp(uid): u = next((x for x in units if x["id"]==uid),None); return u["hp"] if u else 0
    # Blue objectives (need ≥2 of 5)
    carrier_dead = hp("RED-GBPA") <= 0
    log_dead     = sum(hp(i) <= 0 for i in ["RED-AOR-G","RED-GLOG","RED-AKE"]) >= 2
    amphib_dead  = hp("RED-GANF") <= 0
    nucsub_dead  = hp("RED-KSN") <= 0
    surf_ids     = ["RED-GBPA","RED-GE-1","RED-GE-2","RED-GE-3","RED-GANF"]
    def _get(uid, key, default=0):
        u = next((x for x in units if x["id"] == uid), None)
        return u[key] if u else default
    surf_lost = sum(max(0, _get(i,"maxHp",1) - max(0, _get(i,"hp",0))) for i in surf_ids)
    surf_deg  = surf_lost / max(1, sum(_get(i,"maxHp",1) for i in surf_ids))
    blue_score = sum([carrier_dead, log_dead, amphib_dead, nucsub_dead, surf_deg>=0.5])

    # Red objectives (need both)
    fpso_dead = sum(hp(i) <= 0 for i in ["BLUE-FPSO1","BLUE-FPSO2","BLUE-FPSO3","BLUE-FPSO4"])
    port_ids  = ["BLUE-PORTO-S","BLUE-PORTO-RJ","BLUE-PORTO-V","BLUE-PORTO-ACU"]
    port_max  = sum(_get(i,"maxHp",0) for i in port_ids)
    port_cur  = sum(max(0,_get(i,"hp",0)) for i in port_ids)
    ports_deg = (port_max - port_cur) / max(1, port_max) >= 0.4
    red_score = sum([fpso_dead >= 3, ports_deg])

    if blue_score >= 3 and red_score >= 2: return "blue"
    if blue_score >= 3: return "blue"
    if red_score  >= 2: return "red"
    return None

# ── Estratégias ────────────────────────────────────────────────────────────────

# Valor de alvo por equipe
_BLUE_TARGET_VALUE = {
    "RED-GBPA":10,"RED-KSN":9,"RED-GANF":8,
    "RED-GE-1":6,"RED-GE-2":6,"RED-GE-3":5,
    "RED-AOR-G":7,"RED-GLOG":6,"RED-AKE":6,
    "RED-KS-1":4,"RED-KMF-1":3,"RED-KMF-2":3,
    "RED-MPRA-K1":2,"RED-MPRA-K2":2,"RED-AWACS-K":2,
    "RED-OPSESP-1":3,"RED-OPSESP-2":4,  # OPSESP-2 mais perigosa (perto da costa)
}
_RED_TARGET_VALUE = {
    "BLUE-FPSO1":10,"BLUE-FPSO2":10,"BLUE-FPSO3":10,"BLUE-FPSO4":10,
    "BLUE-PORTO-S":11,"BLUE-PORTO-RJ":11,"BLUE-PORTO-V":10,"BLUE-PORTO-ACU":9,
    "BLUE-AERO-RJ":5,"BLUE-AERO-SP":5,"BLUE-AERO-CF":4,
    "BLUE-LOG-A":6,"BLUE-LOG-T":6,
    "BLUE-SAG-P":7,"BLUE-ANFIB":5,
    "BLUE-SAG-S1":5,"BLUE-SAG-S2":5,
    "BLUE-SUB-N":6,"BLUE-SUB-1":3,"BLUE-SUB-2":3,"BLUE-SUB-3":3,
    "BLUE-MPRA-1":3,"BLUE-MPRA-2":3,
    "BLUE-CACA-1":4,"BLUE-CACA-2":4,
    "BLUE-CJAT-1":4,"BLUE-CJAT-2":4,
    "BLUE-DCOST1":3,"BLUE-DCOST2":3,
}
_RED_FLANKING_VALUE = dict(_RED_TARGET_VALUE)   # mesma, só reordena prioridade

def _target_value(uid: str, team: str, strategy: str) -> float:
    if team == "blue":
        base = _BLUE_TARGET_VALUE.get(uid, 1)
        if strategy == "flanking":
            # flanking blue prioriza logística vermelha
            if uid in ("RED-AOR-G","RED-GLOG","RED-AKE"): base += 5
            if uid == "RED-GBPA":                          base -= 3
    else:
        base = _RED_TARGET_VALUE.get(uid, 1)
        if strategy == "flanking":
            # flanking red prioriza FPSOs
            if uid.startswith("BLUE-FPSO"):  base += 3
    return float(base)

def pick_target(unit: dict, enemies: list[dict], strategy: str) -> dict | None:
    """Retorna o inimigo de maior valor (com ruído). Prioriza alvos ao alcance."""
    alive = [e for e in enemies if e["hp"] > 0]
    if not alive: return None
    attackable = [e for e in alive if unit["atr"].get(e["cat"],0) > 0]
    pool = attackable if attackable else alive
    pool.sort(key=lambda e: _target_value(e["id"], unit["team"], strategy)
              + random.gauss(0, 0.8), reverse=True)
    return pool[0]

def pick_attack_target(unit: dict, enemies: list[dict], strategy: str) -> tuple[dict | None, str | None]:
    """Retorna (alvo, arma) com maior valor que a unidade pode atacar agora."""
    alive = [e for e in enemies if e["hp"] > 0]
    best_tgt, best_wpn, best_val = None, None, -1.0
    for e in alive:
        dist = hex_dist(unit["col"], unit["row"], e["col"], e["row"])
        wpn  = select_best_weapon(unit, e["cat"], dist)
        if not wpn: continue
        val  = _target_value(e["id"], unit["team"], strategy) + random.gauss(0, 0.5)
        if val > best_val:
            best_val, best_tgt, best_wpn = val, e, wpn
    return best_tgt, best_wpn

def _coordinated_attacks(team: str, units: list[dict], enemies: list[dict],
                         all_units: list[dict], strategy: str, turn: int,
                         doctrine: dict) -> tuple[list[dict], set]:
    """Engajamento simultâneo: concentra o fogo de categorias diferentes
    (sup+sup / sup+aéreo / sup+terrestre) num único alvo na mesma fase,
    em vez de cada unidade progredir contra alvos distintos em sequência.
    Retorna (ataques, ids_das_unidades_já_usadas)."""
    if doctrine.get("engagement") != "simultaneous":
        return [], set()
    candidates = []
    for u in units:
        if not fuel_ok(u) or u.get("_opsesp"): continue
        tgt, wpn = pick_attack_target(u, enemies, strategy)
        if tgt and wpn: candidates.append((u, tgt, wpn))
    if not candidates: return [], set()
    by_target: dict[str, list] = {}
    for u, tgt, wpn in candidates:
        by_target.setdefault(tgt["id"], []).append((u, tgt, wpn))
    best_tid = max(by_target, key=lambda tid: (
        len({u["cat"] for u,_,_ in by_target[tid]}),
        _target_value(tid, team, strategy)))
    group = by_target[best_tid]
    if len({u["cat"] for u,_,_ in group}) < 2:
        return [], set()  # nenhuma combinação de categorias viável — segue sequencial
    results, used = [], set()
    for u, tgt, wpn in group:
        results.append({"attackerId":u["id"],"targetId":tgt["id"],
                        "amount": _salvo_size(u, wpn, turn, all_units)})
        used.add(u["id"])
    return results, used

def _towards(unit: dict, target: dict, all_units: list[dict],
             max_steps: int, prefer_deep: bool = False) -> list[dict] | None:
    """BFS direto até o alvo; retorna caminho como lista de {col,row}."""
    occupied = {(u["col"],u["row"]) for u in all_units
                if u["hp"]>0 and u["id"] != unit["id"]}
    path = bfs(unit["cat"], unit["col"], unit["row"],
               target["col"], target["row"], max_steps, occupied)
    if path and len(path) >= 2:
        return [{"col":c,"row":r} for c,r in path]
    # fallback: passo único na direção do alvo
    best = None; best_d = hex_dist(unit["col"],unit["row"],target["col"],target["row"])
    for nc,nr in hex_neighbors(unit["col"],unit["row"]):
        if (nc,nr) in occupied or not can_enter(unit["cat"],nc,nr): continue
        d = hex_dist(nc,nr,target["col"],target["row"])
        if d < best_d:
            best_d = d; best = (nc,nr)
    if best:
        return [{"col":unit["col"],"row":unit["row"]},{"col":best[0],"row":best[1]}]
    return None

def _via(unit: dict, wp_col: int, wp_row: int, all_units: list[dict],
         max_steps: int) -> list[dict] | None:
    """Move até um waypoint; usado para flanqueamento."""
    occupied = {(u["col"],u["row"]) for u in all_units
                if u["hp"]>0 and u["id"] != unit["id"]}
    path = bfs(unit["cat"], unit["col"], unit["row"],
               wp_col, wp_row, max_steps, occupied)
    if path and len(path) >= 2:
        return [{"col":c,"row":r} for c,r in path]
    return None

# ─ Aggressive ─────────────────────────────────────────────────────────────────

def _refuel_move(u: dict, all_units: list[dict]) -> list[dict] | None:
    """Se combustível crítico, retorna caminho até o abastecedor mais próximo."""
    if not _fuel_critical(u): return None
    prov = _nearest_refuel_provider(u, all_units)
    if not prov: return None
    if prov["col"] == u["col"] and prov["row"] == u["row"]: return None  # já junto
    occupied = {(x["col"],x["row"]) for x in all_units
                if x["hp"]>0 and x["id"] != u["id"]}
    return bfs(u["cat"], u["col"], u["row"],
               prov["col"], prov["row"], u["mov"], occupied)

def aggressive_moves(team: str, units: list[dict], all_units: list[dict],
                     noise: float, doctrine: dict | None = None) -> list[dict]:
    doctrine = doctrine or {}
    enemies = [u for u in all_units if u["team"] != team and u["hp"] > 0]
    formation_tgt = _formation_targets(units, enemies, "aggressive", doctrine)
    noise_mult = _posture_noise_mult(doctrine)
    results = []
    for u in units:
        if u["mov"] == 0 or not fuel_ok(u): continue
        if u.get("_carrier") or u.get("_amphib"): continue
        if u.get("_opsesp"): continue
        if u.get("_logistic") or u.get("_tanker"):
            needy = _logistics_target(u, all_units)
            if needy and hex_dist(u["col"], u["row"], needy["col"], needy["row"]) > 1:
                path = _towards(u, needy, all_units, u["mov"])
                if path: results.append({"unitId": u["id"], "path": path})
            continue
        # Prioridade 1: reabastecimento de emergência
        ref_path = _refuel_move(u, all_units)
        if ref_path and len(ref_path) >= 2:
            results.append({"unitId":u["id"],
                            "path":[{"col":c,"row":r} for c,r in ref_path]})
            continue
        # Prioridade 2: política de combustível (escort/anchor)
        pol_path = _policy_move(u, all_units, doctrine)
        if pol_path and len(pol_path) >= 2:
            results.append({"unitId":u["id"],"path":pol_path})
            continue
        if random.random() < noise * 0.3 * noise_mult: continue
        tgt = formation_tgt.get(u["id"]) or pick_target(u, enemies, "aggressive")
        if not tgt: continue
        ideal_range = _posture_standoff(max_wpn_range(u, tgt["cat"]), doctrine)
        if hex_dist(u["col"],u["row"],tgt["col"],tgt["row"]) <= ideal_range:
            continue
        eff_mov = _policy_mov_budget(u, air_mov_range(u), doctrine)
        path = _towards(u, tgt, all_units, eff_mov)
        if path: results.append({"unitId":u["id"],"path":path})
    return results

def _opsesp_attack(u: dict, enemies: list[dict], strategy: str) -> dict | None:
    """Retorna um ataque de sabotagem da equipe Op.Esp. se houver alvo a ≤2 hexes."""
    if get_qty(u, "sabotage") <= 0: return None
    valid = [e for e in enemies
             if e["id"] in _OPSESP_TARGET_IDS and e["hp"] > 0
             and hex_dist(u["col"],u["row"],e["col"],e["row"]) <= 2]
    if not valid: return None
    best = max(valid, key=lambda e: _target_value(e["id"], u["team"], strategy)
                                    + random.gauss(0, 0.3))
    return {"attackerId": u["id"], "targetId": best["id"], "amount": 1}

def aggressive_attacks(team: str, units: list[dict], all_units: list[dict],
                       turn: int = 1, doctrine: dict | None = None) -> list[dict]:
    doctrine = doctrine or {}
    enemies = [u for u in all_units if u["team"] != team and u["hp"] > 0]
    results, used = _coordinated_attacks(team, units, enemies, all_units,
                                         "aggressive", turn, doctrine)
    for u in units:
        if u["id"] in used or not fuel_ok(u): continue
        if u.get("_opsesp"):
            atk = _opsesp_attack(u, enemies, "aggressive")
            if atk: results.append(atk)
            continue
        tgt, wpn = pick_attack_target(u, enemies, "aggressive")
        if not tgt or not wpn: continue
        results.append({"attackerId":u["id"],"targetId":tgt["id"],
                        "amount": _salvo_size(u, wpn, turn, all_units)})
    return results

# ─ Defensive ──────────────────────────────────────────────────────────────────

def _nearest_own_objective(unit: dict, all_units: list[dict]) -> tuple[int,int]:
    """Retorna coordenada do objetivo mais próximo a defender."""
    if unit["team"] == "blue":
        obj_ids = ["BLUE-FPSO1","BLUE-FPSO2","BLUE-FPSO3","BLUE-FPSO4",
                   "BLUE-PORTO-RJ","BLUE-PORTO-S"]
    else:
        obj_ids = ["RED-GBPA","RED-GANF","RED-AOR-G"]
    objs = [(u["col"],u["row"]) for u in all_units
            if u["id"] in obj_ids and u["hp"] > 0]
    if not objs: return (unit["col"], unit["row"])
    return min(objs, key=lambda p: hex_dist(unit["col"],unit["row"],p[0],p[1]))

def defensive_moves(team: str, units: list[dict], all_units: list[dict],
                    noise: float, doctrine: dict | None = None) -> list[dict]:
    doctrine = doctrine or {}
    enemies = [u for u in all_units if u["team"] != team and u["hp"] > 0]
    noise_mult = _posture_noise_mult(doctrine)
    results = []
    for u in units:
        if u["mov"] == 0 or not fuel_ok(u): continue
        if u.get("_carrier") or u.get("_amphib"): continue
        if u.get("_opsesp"): continue
        if u.get("_logistic") or u.get("_tanker"):
            needy = _logistics_target(u, all_units)
            if needy and hex_dist(u["col"], u["row"], needy["col"], needy["row"]) > 1:
                path = _towards(u, needy, all_units, u["mov"])
                if path: results.append({"unitId": u["id"], "path": path})
            continue
        if u["cat"] == "land": continue
        # Prioridade 1: reabastecimento de emergência
        ref_path = _refuel_move(u, all_units)
        if ref_path and len(ref_path) >= 2:
            results.append({"unitId":u["id"],
                            "path":[{"col":c,"row":r} for c,r in ref_path]})
            continue
        # Prioridade 2: política de combustível (escort/anchor)
        pol_path = _policy_move(u, all_units, doctrine)
        if pol_path and len(pol_path) >= 2:
            results.append({"unitId":u["id"],"path":pol_path})
            continue
        det = max(u["atr"].values(), default=2)
        close_enemies = [e for e in enemies
                         if hex_dist(u["col"],u["row"],e["col"],e["row"]) <= det + 1]
        eff_mov = _policy_mov_budget(u, air_mov_range(u), doctrine)
        if not close_enemies:
            oc, or_ = _nearest_own_objective(u, all_units)
            if hex_dist(u["col"],u["row"],oc,or_) > 2:
                path = _via(u, oc, or_, all_units, eff_mov)
                if path: results.append({"unitId":u["id"],"path":path})
            continue
        if random.random() < noise * 0.4 * noise_mult: continue
        oc, or_ = _nearest_own_objective(u, all_units)
        tgt = min(close_enemies,
                  key=lambda e: hex_dist(e["col"],e["row"],oc,or_))
        ideal_range = _posture_standoff(max(1, u["atr"].get(tgt["cat"],1)), doctrine)
        if hex_dist(u["col"],u["row"],tgt["col"],tgt["row"]) <= ideal_range:
            continue
        path = _towards(u, tgt, all_units, eff_mov)
        if path: results.append({"unitId":u["id"],"path":path})
    return results

def defensive_attacks(team: str, units: list[dict], all_units: list[dict],
                      turn: int = 1, doctrine: dict | None = None) -> list[dict]:
    doctrine = doctrine or {}
    enemies = [u for u in all_units if u["team"] != team and u["hp"] > 0]
    results, used = _coordinated_attacks(team, units, enemies, all_units,
                                         "defensive", turn, doctrine)
    oc, or_ = _nearest_own_objective({"team":team,"col":8,"row":5}, all_units)
    for u in units:
        if u["id"] in used or not fuel_ok(u): continue
        if u.get("_opsesp"):
            atk = _opsesp_attack(u, enemies, "defensive")
            if atk: results.append(atk)
            continue
        in_range = []
        for e in enemies:
            dist_e = hex_dist(u["col"],u["row"],e["col"],e["row"])
            wpn_e  = select_best_weapon(u, e["cat"], dist_e)
            if wpn_e and hex_dist(e["col"],e["row"],oc,or_) < hex_dist(u["col"],u["row"],oc,or_) + 3:
                in_range.append((e, wpn_e))
        if not in_range: continue
        in_range.sort(key=lambda t: hex_dist(t[0]["col"],t[0]["row"],oc,or_))
        tgt, wpn = in_range[0]
        results.append({"attackerId":u["id"],"targetId":tgt["id"],
                        "amount": _salvo_size(u, wpn, turn, all_units)})
    return results

# ─ Flanking ───────────────────────────────────────────────────────────────────

def _flanking_waypoint(unit: dict, target: dict) -> tuple[int,int]:
    """Escolhe waypoint de flanco baseado em categoria e equipe."""
    tc, tr = target["col"], target["row"]
    if unit["cat"] == "submarine":
        # Submarinos: rota pelo fundo profundo (linhas extremas)
        if unit["team"] == "blue":
            return (min(tc, GRID_W-2), 0)      # ao norte pelo mar profundo
        else:
            return (max(tc-4, 0), GRID_H-1)    # ao sul (RED-KS-1 já está lá)
    elif unit["cat"] == "air":
        # Aviação: aproximação perpendicular ao eixo principal
        offset = 3 if unit["team"] == "blue" else -3
        return (tc, max(0, min(GRID_H-1, tr + offset)))
    else:
        # Superfície: avançar por linha acima ou abaixo do alvo
        if unit["team"] == "blue":
            row_off = -2 if unit["row"] <= tr else 2
        else:
            row_off =  2 if unit["row"] >= tr else -2
        return (max(0,min(GRID_W-1,tc)), max(0,min(GRID_H-1,tr+row_off)))

def flanking_moves(team: str, units: list[dict], all_units: list[dict],
                   noise: float, doctrine: dict | None = None) -> list[dict]:
    doctrine = doctrine or {}
    enemies = [u for u in all_units if u["team"] != team and u["hp"] > 0]
    formation_tgt = _formation_targets(units, enemies, "flanking", doctrine)
    noise_mult = _posture_noise_mult(doctrine)
    results = []
    for u in units:
        if u["mov"] == 0 or not fuel_ok(u): continue
        if u.get("_carrier") or u.get("_amphib"): continue
        if u.get("_opsesp"): continue
        if u.get("_logistic") or u.get("_tanker"):
            needy = _logistics_target(u, all_units)
            if needy and hex_dist(u["col"], u["row"], needy["col"], needy["row"]) > 1:
                path = _towards(u, needy, all_units, u["mov"])
                if path: results.append({"unitId": u["id"], "path": path})
            continue
        # Prioridade 1: reabastecimento de emergência
        ref_path = _refuel_move(u, all_units)
        if ref_path and len(ref_path) >= 2:
            results.append({"unitId":u["id"],
                            "path":[{"col":c,"row":r} for c,r in ref_path]})
            continue
        # Prioridade 2: política de combustível (escort/anchor)
        pol_path = _policy_move(u, all_units, doctrine)
        if pol_path and len(pol_path) >= 2:
            results.append({"unitId":u["id"],"path":pol_path})
            continue
        if random.random() < noise * 0.2 * noise_mult: continue
        tgt = formation_tgt.get(u["id"]) or pick_target(u, enemies, "flanking")
        if not tgt: continue
        ideal_range = _posture_standoff(max_wpn_range(u, tgt["cat"]), doctrine)
        if hex_dist(u["col"],u["row"],tgt["col"],tgt["row"]) <= ideal_range:
            continue
        eff_mov = _policy_mov_budget(u, air_mov_range(u), doctrine)
        wc, wr = _flanking_waypoint(u, tgt)
        if hex_dist(u["col"],u["row"],wc,wr) <= 1:
            path = _towards(u, tgt, all_units, eff_mov)
        else:
            path = _via(u, wc, wr, all_units, eff_mov)
        if path: results.append({"unitId":u["id"],"path":path})
    return results

def flanking_attacks(team: str, units: list[dict], all_units: list[dict],
                     turn: int = 1, doctrine: dict | None = None) -> list[dict]:
    doctrine = doctrine or {}
    enemies = [u for u in all_units if u["team"] != team and u["hp"] > 0]
    results, used = _coordinated_attacks(team, units, enemies, all_units,
                                         "flanking", turn, doctrine)
    for u in units:
        if u["id"] in used or not fuel_ok(u): continue
        if u.get("_opsesp"):
            atk = _opsesp_attack(u, enemies, "flanking")
            if atk: results.append(atk)
            continue
        tgt, wpn = pick_attack_target(u, enemies, "flanking")
        if not tgt or not wpn: continue
        results.append({"attackerId":u["id"],"targetId":tgt["id"],
                        "amount": _salvo_size(u, wpn, turn, all_units)})
    return results

# ── Dispatcher de estratégia ──────────────────────────────────────────────────

def strategy_moves(strat: str, team: str, units: list[dict], all_units: list[dict],
                   noise: float, doctrine: dict | None = None) -> list[dict]:
    if strat == "aggressive": return aggressive_moves(team, units, all_units, noise, doctrine)
    if strat == "defensive":  return defensive_moves (team, units, all_units, noise, doctrine)
    return                           flanking_moves  (team, units, all_units, noise, doctrine)

def strategy_attacks(strat: str, team: str, units: list[dict], all_units: list[dict],
                     turn: int = 1, doctrine: dict | None = None) -> list[dict]:
    if strat == "aggressive": return aggressive_attacks(team, units, all_units, turn, doctrine)
    if strat == "defensive":  return defensive_attacks (team, units, all_units, turn, doctrine)
    return                           flanking_attacks  (team, units, all_units, turn, doctrine)

# ── Simulador de partida ───────────────────────────────────────────────────────

def _ts() -> str:
    return datetime.now(timezone.utc).isoformat()

def _apply_moves(units: list[dict], moves: list[dict], team: str):
    """Aplica movimentos, gasta combustível."""
    moved_ids: set[str] = set()
    for mv in moves:
        u = next((x for x in units if x["id"] == mv["unitId"]), None)
        if not u: continue
        path = mv["path"]
        if len(path) < 2: continue
        dst  = path[-1]
        dist = len(path) - 1
        u["col"] = dst["col"]; u["row"] = dst["row"]; u["moved"] = True
        moved_ids.add(u["id"])
        if u["cat"] != "air":
            spend_naval_fuel(u, dist)
        else:
            u["airStatus"] = "airborne"
            spend_air_fuel(u, dist)
    # combustível para unidades paradas
    for u in units:
        if u["team"] != team or u["id"] in moved_ids or u.get("hp",0) <= 0:
            continue
        if u["cat"] == "air":
            if u.get("airStatus") == "airborne":
                spend_air_fuel(u, 1)
        else:
            spend_naval_fuel(u, 0)

def _reload_weapons(units: list[dict], turn: int):
    """Recarrega armas em portos e bases aéreas (simplificado)."""
    port_hexes = {(u["col"],u["row"])
                  for u in units if u.get("_port") and u["hp"] > 0 and u["team"]=="blue"}
    for u in units:
        if u["hp"] <= 0 or not u.get("init_weapons"): continue
        do_reload = False
        if u["team"] == "blue":
            if u["cat"] == "land": do_reload = True
            elif u["cat"] == "air":
                do_reload = u.get("fuel",{}).get("wasAtRefuelLocation",False)
            elif not u["moved"] and (u["col"],u["row"]) in port_hexes:
                do_reload = True
        elif u["cat"] == "air":
            do_reload = u.get("fuel",{}).get("wasAtRefuelLocation",False)
        if do_reload:
            for wpn, init in u["init_weapons"].items():
                if wpn in u["weapons"]:
                    u["weapons"][wpn]["quantity"] = init["quantity"]
                    u["weapons"][wpn]["q"]        = init["quantity"]

def simulate_game(game_idx: int, blue_strat: str, red_strat: str, noise: float,
                  blue_doctrine: dict | None = None,
                  red_doctrine: dict | None = None) -> tuple[str, list[str]]:
    blue_doctrine = blue_doctrine or random_doctrine()
    red_doctrine  = red_doctrine  or random_doctrine()
    room_id = f"sim_{game_idx:04d}_{blue_strat[:3]}v{red_strat[:3]}"
    events:  list[str] = []
    def ev(rec): events.append(json.dumps(rec))

    units = [make_unit(team, spec)
             for team, specs in OOB.items()
             for spec in specs]

    turn = 1; period = "day"
    ev({"event":"game_start","ts":_ts(),"room":room_id,
        "doctrine":{"blue":blue_doctrine,"red":red_doctrine},
        "state":snapshot(units, turn, period, "movement")})

    for turn in range(1, MAX_TURNS + 1):
        for half in range(2):  # dia e noite no mesmo turno
            cur_period = "day" if half == 0 else "night"

            blue_units = [u for u in units if u["team"]=="blue" and u["hp"]>0]
            red_units  = [u for u in units if u["team"]=="red"  and u["hp"]>0]
            if not blue_units or not red_units:
                break

            # ── Movimento: Blue primeiro ─────────────────────────────────────
            s_pre = snapshot(units, turn, cur_period, "movement")
            blue_moves = strategy_moves(blue_strat, "blue",
                                        [u for u in blue_units if fuel_ok(u)],
                                        units, noise, blue_doctrine)
            ev({"event":"movement_committed","ts":_ts(),"room":room_id,
                "turn":turn,"period":cur_period,"team":"blue",
                "moves":blue_moves,"state":s_pre})
            _apply_moves(units, blue_moves, "blue")
            _sync_opsesp(units)

            # ── Movimento: Red ───────────────────────────────────────────────
            s_after_blue = snapshot(units, turn, cur_period, "movement")
            red_moves = strategy_moves(red_strat, "red",
                                       [u for u in units if u["team"]=="red"
                                        and u["hp"]>0 and fuel_ok(u)],
                                       units, noise, red_doctrine)
            ev({"event":"movement_committed","ts":_ts(),"room":room_id,
                "turn":turn,"period":cur_period,"team":"red",
                "moves":red_moves,"state":s_after_blue})
            _apply_moves(units, red_moves, "red")
            _sync_opsesp(units)

            # ── Combate ──────────────────────────────────────────────────────
            s_combat = snapshot(units, turn, cur_period, "combat")

            blue_atks = strategy_attacks(blue_strat, "blue",
                                         [u for u in units if u["team"]=="blue" and u["hp"]>0],
                                         units, turn, blue_doctrine)
            red_atks  = strategy_attacks(red_strat, "red",
                                          [u for u in units if u["team"]=="red"  and u["hp"]>0],
                                          units, turn, red_doctrine)
            if blue_atks:
                ev({"event":"attacks_declared","ts":_ts(),"room":room_id,
                    "turn":turn,"period":cur_period,"team":"blue",
                    "attacks":blue_atks,"state":s_combat})
            if red_atks:
                ev({"event":"attacks_declared","ts":_ts(),"room":room_id,
                    "turn":turn,"period":cur_period,"team":"red",
                    "attacks":red_atks,"state":s_combat})

            # Resolver ataques (simultâneo, usando cópias de posição pré-dano)
            uid_map = {u["id"]:u for u in units}
            for atk in blue_atks + red_atks:
                att = uid_map.get(atk["attackerId"])
                tgt = uid_map.get(atk["targetId"])
                if att and tgt and att["hp"]>0 and tgt["hp"]>0:
                    resolve_attack(att, tgt)

            # ── Fim de turno ─────────────────────────────────────────────────
            for u in units:
                u["moved"] = False
            reset_fuel_counters(units)
            recover_fuel(units)
            recover_aircraft(units)   # retorno automático à base + destruição se porta-aviões afundou
            _sync_opsesp(units)       # hospedeira afundada → Op.Esp. destruída
            _reload_weapons(units, turn)

            winner = check_winner(units)
            if winner:
                ev({"event":"game_over","ts":_ts(),"room":room_id,
                    "turn":turn,"winner":winner,"reason":"victory",
                    "objectives":{},
                    "state":snapshot(units, turn, cur_period,"end")})
                return room_id, events

        blue_alive = any(u["hp"]>0 for u in units if u["team"]=="blue")
        red_alive  = any(u["hp"]>0 for u in units if u["team"]=="red")
        if not blue_alive or not red_alive: break

    # tempo esgotado — conta HP
    blue_hp = sum(u["hp"] for u in units if u["team"]=="blue")
    red_hp  = sum(u["hp"] for u in units if u["team"]=="red")
    winner  = "blue" if blue_hp >= red_hp else "red"
    ev({"event":"game_over","ts":_ts(),"room":room_id,
        "turn":turn,"winner":winner,"reason":"timeout",
        "objectives":{},
        "state":snapshot(units, turn, "day","end")})
    return room_id, events

# ── Main ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    strategies  = ["aggressive","defensive","flanking"]
    matchups    = [(b,r) for b in strategies for r in strategies]  # 9 combinações
    games_each  = max(1, ARGS.games // len(matchups))
    remainder   = ARGS.games - games_each * len(matchups)

    move_total = atk_total = 0
    idx = 0
    for i, (bs, rs) in enumerate(matchups):
        n = games_each + (1 if i < remainder else 0)
        for _ in range(n):
            noise = random.uniform(0.1, 0.4)
            room_id, evs = simulate_game(idx, bs, rs, noise,
                                         random_doctrine(), random_doctrine())
            out = LOG_DIR / f"{room_id}.jsonl"
            out.write_text("\n".join(evs) + "\n", encoding="utf-8")
            for e in evs:
                rec = json.loads(e)
                if rec["event"] == "movement_committed":
                    move_total += len(rec.get("moves",[]))
                elif rec["event"] == "attacks_declared":
                    atk_total += len(rec.get("attacks",[]))
            idx += 1

    print(f"[OK] {idx} partidas geradas em {LOG_DIR}")
    print(f"     Estratégias: {strategies}")
    print(f"     Exemplos de movimento : {move_total:,}")
    print(f"     Exemplos de combate   : {atk_total:,}")
    print(f"\n  Execute: python ml/train_bot.py")
