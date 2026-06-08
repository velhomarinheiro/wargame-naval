'use strict';
/**
 * bot.js — Bot de imitation learning para Operação Atlântico Sul
 *
 * Usa modelos ONNX treinados em ml/models/ para decidir movimentos e ataques.
 * API pública (todas as funções são assíncronas):
 *   loadModels()              — carrega os dois modelos ONNX
 *   botMove(state, team)      — retorna [{unitId, path}]
 *   botAttack(state, team)    — retorna [{attackerId, targetId, amount}]
 */

const ort  = require('onnxruntime-node');
const path = require('path');

const MODEL_DIR = path.join(__dirname, 'ml', 'models');
const GRID_W = 16, GRID_H = 10, N_CH = 9;

let moveSession   = null;
let attackSession = null;

// ── Carregamento dos modelos ──────────────────────────────────────────────────

async function loadModels() {
  try {
    [moveSession, attackSession] = await Promise.all([
      ort.InferenceSession.create(path.join(MODEL_DIR, 'move_net.onnx')),
      ort.InferenceSession.create(path.join(MODEL_DIR, 'attack_net.onnx')),
    ]);
    console.log('[Bot] Modelos ONNX carregados (move_net + attack_net).');
  } catch (err) {
    console.warn('[Bot] Falha ao carregar modelos ONNX — bot desabilitado.', err.message);
  }
}

// ── Conversão de estado → tensor ─────────────────────────────────────────────

function stateToTensor(state) {
  const data = new Float32Array(N_CH * GRID_H * GRID_W);
  const idx  = (ch, r, c) => ch * GRID_H * GRID_W + r * GRID_W + c;

  for (const u of state.units) {
    if ((u.hp ?? 0) <= 0) continue;
    const c = u.col, r = u.row;
    if (c < 0 || c >= GRID_W || r < 0 || r >= GRID_H) continue;

    const teamSign = u.team === 'blue' ? 1.0 : -1.0;
    const cat      = u.category || '';
    const fuel     = u.fuel     || {};
    const wpns     = u.weapons  || {};

    let wpnTotal = 0;
    for (const w of Object.values(wpns)) {
      if (w && typeof w === 'object' && 'quantity' in w) wpnTotal += w.quantity;
    }

    data[idx(0,r,c)] = 1.0;
    data[idx(1,r,c)] = teamSign;
    data[idx(2,r,c)] = u.maxHp ? u.hp / u.maxHp : 0;
    data[idx(3,r,c)] = cat === 'surface'   ? 1 : 0;
    data[idx(4,r,c)] = cat === 'submarine' ? 1 : 0;
    data[idx(5,r,c)] = cat === 'air'       ? 1 : 0;
    data[idx(6,r,c)] = cat === 'land'      ? 1 : 0;
    data[idx(7,r,c)] = fuel.max ? fuel.current / fuel.max : 1.0;
    data[idx(8,r,c)] = Math.min(wpnTotal / 20.0, 1.0);
  }

  return new ort.Tensor('float32', data, [1, N_CH, GRID_H, GRID_W]);
}

// ── Hex math (odd-q offset, flat-top) — espelha server.js ────────────────────

function cube(col, row) {
  const x = col, z = row - (col - (col & 1)) / 2;
  return { x, y: -x - z, z };
}
function oddq(x, z) { return { col: x, row: z + (x - (x & 1)) / 2 }; }

const CUBE_DIRS = [
  {dx:+1,dy:-1,dz:0},{dx:+1,dy:0,dz:-1},{dx:0,dy:+1,dz:-1},
  {dx:-1,dy:+1,dz:0},{dx:-1,dy:0,dz:+1},{dx:0,dy:-1,dz:+1},
];

function hexNeighbors(col, row) {
  const c = cube(col, row);
  return CUBE_DIRS
    .map(d => oddq(c.x + d.dx, c.z + d.dz))
    .filter(({ col: nc, row: nr }) => nc >= 0 && nc < GRID_W && nr >= 0 && nr < GRID_H);
}

function hexDist(c1, r1, c2, r2) {
  const a = cube(c1, r1), b = cube(c2, r2);
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z));
}

const TERRAIN = [
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
];

function getTerrain(col, row) {
  if (row < 0 || row >= GRID_H || col < 0 || col >= GRID_W) return 0; // T_LAND
  return TERRAIN[row][col];
}

function canEnter(category, col, row) {
  const t = getTerrain(col, row);
  if (category === 'air')       return true;
  if (category === 'land')      return t <= 1; // T_LAND or T_SHALLOW
  if (category === 'submarine') return t >= 2; // not T_LAND, not T_SHALLOW
  return t >= 1;                               // surface: not T_LAND
}

function bfsPath(category, sc, sr, dc, dr, maxSteps, occupied) {
  if (sc === dc && sr === dr) return [{ col: sc, row: sr }];
  const queue   = [{ col: sc, row: sr, path: [{ col: sc, row: sr }] }];
  const visited = new Set([`${sc},${sr}`]);
  while (queue.length) {
    const cur = queue.shift();
    if (cur.path.length >= maxSteps + 1) continue;
    for (const { col: nc, row: nr } of hexNeighbors(cur.col, cur.row)) {
      const key = `${nc},${nr}`;
      if (visited.has(key) || !canEnter(category, nc, nr)) continue;
      const newPath = [...cur.path, { col: nc, row: nr }];
      if (nc === dc && nr === dr) return newPath;
      if (!occupied.has(key)) { visited.add(key); queue.push({ col: nc, row: nr, path: newPath }); }
    }
  }
  return null;
}

// ── Alcance efetivo de movimentação ──────────────────────────────────────────
// Aeronaves: mov_efetivo = floor(FP_atual / 2).
// Demais categorias: usa unit.movement sem alteração.
function effectiveMovement(unit) {
  if (unit.category !== 'air') return unit.movement ?? 0;
  const fp = unit.fuel?.current ?? unit.movement ?? 0;
  return Math.max(1, Math.floor(fp / 2));
}

// ── Decisão de movimentação ───────────────────────────────────────────────────

async function botMove(state, team) {
  if (!moveSession) return [];

  const tensor  = stateToTensor(state);
  const output  = await moveSession.run({ state: tensor });
  const logits  = output.logits.data;

  const myUnits = state.units.filter(u => u.team === team && (u.hp ?? 0) > 0 && (u.movement ?? 0) > 0);
  const occupied = new Set(
    state.units.filter(u => (u.hp ?? 0) > 0).map(u => `${u.col},${u.row}`)
  );

  // Sort candidate hexes by model score (desc)
  const ranked = Array.from(logits)
    .map((score, i) => ({ score, col: i % GRID_W, row: Math.floor(i / GRID_W) }))
    .sort((a, b) => b.score - a.score);

  const moves = [];
  for (const unit of myUnits) {
    const movRange = effectiveMovement(unit);
    // Find the highest-scored hex reachable within this unit's movement range
    for (const dst of ranked.slice(0, 30)) {
      if (dst.col === unit.col && dst.row === unit.row) continue;
      if (!canEnter(unit.category, dst.col, dst.row)) continue;
      const distToCheck = hexDist(unit.col, unit.row, dst.col, dst.row);
      if (distToCheck > movRange) continue;

      const path = bfsPath(unit.category, unit.col, unit.row, dst.col, dst.row,
                           movRange, occupied);
      if (path && path.length >= 2) {
        moves.push({ unitId: unit.id, path });
        occupied.delete(`${unit.col},${unit.row}`);
        occupied.add(`${dst.col},${dst.row}`);
        break;
      }
    }
    // If no candidate found, unit stays — no entry needed (server treats missing units as stationary)
  }

  return moves;
}

// ── Decisão de combate ────────────────────────────────────────────────────────

async function botAttack(state, team) {
  if (!attackSession) return [];

  const tensor  = stateToTensor(state);
  const output  = await attackSession.run({ state: tensor });
  const logits  = output.logits.data;

  const myUnits = state.units.filter(u => u.team === team && (u.hp ?? 0) > 0);
  const enemies = state.units.filter(u => u.team !== team && (u.hp ?? 0) > 0);

  // Map enemy positions for fast lookup
  const enemyByPos = new Map(enemies.map(e => [`${e.col},${e.row}`, e]));

  // Sort candidate target hexes by model score (desc)
  const ranked = Array.from(logits)
    .map((score, i) => ({ score, col: i % GRID_W, row: Math.floor(i / GRID_W) }))
    .sort((a, b) => b.score - a.score);

  const attacks = [];
  for (const unit of myUnits) {
    const atkRange = unit.attackRange || {};

    for (const dst of ranked.slice(0, 30)) {
      const enemy = enemyByPos.get(`${dst.col},${dst.row}`);
      if (!enemy) continue;

      const range = atkRange[enemy.category] ?? 0;
      if (range === 0) continue;
      if (hexDist(unit.col, unit.row, enemy.col, enemy.row) > range) continue;

      attacks.push({ attackerId: unit.id, targetId: enemy.id, amount: 1 });
      break;
    }
  }

  return attacks;
}

module.exports = { loadModels, botMove, botAttack };
