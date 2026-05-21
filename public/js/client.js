'use strict';
// ─── DOM refs ─────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const lobbyScreen   = $('lobby-screen');
const gameScreen    = $('game-screen');
const canvas        = $('game-canvas');
const ctx           = canvas.getContext('2d');
const teamBadge     = $('team-badge');
const turnLabel     = $('turn-label');
const periodLabel   = $('period-label');
const phaseLabel    = $('phase-label');
const myTurnBanner  = $('my-turn-banner');
const unitPanel     = $('unit-panel');
const actionBtn     = $('action-btn');
const endPhaseBtn   = $('end-phase-btn');
const combatBtn     = $('combat-btn');
const cancelBtn     = $('cancel-btn');
const fleetBlue     = $('fleet-blue');
const fleetRed      = $('fleet-red');
const logEl         = $('battle-log');
const gameOver      = $('game-over');
const winnerMsg     = $('winner-msg');
const disconnected  = $('disconnected');

// Lobby
const lobbyMenu     = $('lobby-menu');
const lobbyWaiting  = $('lobby-waiting');
const lobbyErr      = $('lobby-err');
const roomDisplay   = $('room-display');
const roomInput     = $('room-input');
const btnCreate     = $('btn-create');
const btnJoin       = $('btn-join');

// ─── Canvas setup ─────────────────────────────────────────────────────────────
canvas.width  = CVS_W;
canvas.height = CVS_H;

// ─── Game state ───────────────────────────────────────────────────────────────
let myTeam      = null;
let gameState   = null;
let selUnitId   = null;   // selected unit id
let moveHexes   = [];     // [{col,row}]
let atkHexes    = [];     // [{col,row}] enemies in attack range
let pendingAtks = [];     // [{attackerId, targetId}] declared attacks this phase
let hoverHex    = null;

// ─── Socket ───────────────────────────────────────────────────────────────────
const socket = io();

socket.on('room_created', ({ roomId, team }) => {
  myTeam = team;
  roomDisplay.textContent = roomId;
  lobbyMenu.classList.add('hidden');
  lobbyWaiting.classList.remove('hidden');
});

socket.on('join_error', msg => showLobbyErr(msg));

socket.on('game_start', ({ team, state }) => {
  myTeam    = team;
  gameState = state;
  selUnitId = null; moveHexes = []; atkHexes = []; pendingAtks = [];
  lobbyScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  gameOver.classList.add('hidden');
  updateUI(); render();
});

socket.on('game_update', state => {
  gameState = state;
  if (selUnitId) {
    const u = gameState.units.find(u => u.id === selUnitId && u.hp > 0);
    if (u) recalcHighlights(u); else deselect();
  }
  updateUI(); render();
});

socket.on('game_over', ({ winner, state }) => {
  gameState = state;
  updateUI(); render();
  const mine = winner === myTeam;
  winnerMsg.textContent = mine
    ? '🏆 VITÓRIA! Sua força prevaleceu.'
    : '💀 DERROTA. Sua frota foi afundada.';
  winnerMsg.className = mine ? 'victory' : 'defeat';
  gameOver.classList.remove('hidden');
});

socket.on('opponent_disconnected', () => disconnected.classList.remove('hidden'));
socket.on('action_error', msg => flashError(msg));

// ─── Lobby actions ────────────────────────────────────────────────────────────
btnCreate.addEventListener('click', () => socket.emit('create_room'));
btnJoin.addEventListener('click', () => {
  const code = roomInput.value.trim().toUpperCase();
  if (code) socket.emit('join_room', { roomId: code });
});
roomInput.addEventListener('keydown', e => { if (e.key === 'Enter') btnJoin.click(); });

// ─── Game actions ─────────────────────────────────────────────────────────────
endPhaseBtn.addEventListener('click', () => {
  if (!isMyTurn()) return;
  socket.emit('end_movement');
  deselect();
});

combatBtn.addEventListener('click', () => {
  if (!isMyTurn()) return;
  socket.emit('declare_attacks', pendingAtks);
  pendingAtks = [];
  deselect();
});

cancelBtn.addEventListener('click', deselect);

$('btn-restart').addEventListener('click', () => {
  socket.emit('restart');
  gameOver.classList.add('hidden');
});
$('btn-back').addEventListener('click', () => location.reload());

// ─── Canvas input ─────────────────────────────────────────────────────────────
canvas.addEventListener('mousemove', e => {
  const r  = canvas.getBoundingClientRect();
  const sx = canvas.width  / r.width;
  const sy = canvas.height / r.height;
  hoverHex = pixelToHex((e.clientX - r.left) * sx, (e.clientY - r.top) * sy);
  render();
});
canvas.addEventListener('mouseleave', () => { hoverHex = null; render(); });
canvas.addEventListener('click', e => {
  if (!gameState) return;
  const r  = canvas.getBoundingClientRect();
  const sx = canvas.width  / r.width;
  const sy = canvas.height / r.height;
  const h  = pixelToHex((e.clientX - r.left) * sx, (e.clientY - r.top) * sy);
  handleClick(h.col, h.row);
});

// ─── Click logic ──────────────────────────────────────────────────────────────
function handleClick(col, row) {
  if (!gameState || gameState.winner) return;
  if (col < 0 || col >= GRID_W || row < 0 || row >= GRID_H) return;

  const phase = gameState.phase;

  // Movement phase
  if (phase === 'movement' && isMyTurn()) {
    const move = moveHexes.find(h => h.col === col && h.row === row);
    if (move && selUnitId !== null) {
      socket.emit('move_unit', { unitId: selUnitId, toCol: col, toRow: row });
      deselect(); return;
    }
  }

  // Combat phase — click enemy in attack range to toggle attack declaration
  if (phase === 'combat' && isMyTurn() && selUnitId !== null) {
    const atk = atkHexes.find(h => h.col === col && h.row === row);
    if (atk) {
      const existing = pendingAtks.findIndex(a => a.attackerId === selUnitId && a.targetId === atk.unitId);
      if (existing >= 0) pendingAtks.splice(existing, 1);
      else               pendingAtks.push({ attackerId: selUnitId, targetId: atk.unitId });
      render(); return;
    }
  }

  // Select own unit
  const unit = gameState.units.find(u => u.col === col && u.row === row && u.hp > 0);
  if (unit && unit.team === myTeam) {
    selUnitId = unit.id;
    recalcHighlights(unit);
    updateUI(); render();
  } else {
    deselect();
  }
}

function deselect() {
  selUnitId = null; moveHexes = []; atkHexes = [];
  updateUI(); render();
}

function recalcHighlights(unit) {
  const def    = UNIT_DEFS[unit.type];
  const occ    = new Set(gameState.units.filter(u => u.hp > 0 && u.id !== unit.id).map(u => `${u.col},${u.row}`));
  const phase  = gameState.phase;

  if (phase === 'movement' && !unit.moved && isMyTurn()) {
    // BFS respecting occupied hexes
    const seen = new Set([`${unit.col},${unit.row}`]);
    let front  = [{ col: unit.col, row: unit.row }];
    moveHexes  = [];
    for (let d = 0; d < def.mov; d++) {
      const next = [];
      for (const h of front) {
        for (const nb of hexNeighbors(h.col, h.row)) {
          const k = `${nb.col},${nb.row}`;
          if (!seen.has(k)) {
            seen.add(k);
            if (!occ.has(k)) { moveHexes.push(nb); next.push(nb); }
          }
        }
      }
      front = next;
    }
  } else { moveHexes = []; }

  if (phase === 'combat' && isMyTurn()) {
    atkHexes = [];
    const enemies = gameState.units.filter(u => u.team !== myTeam && u.hp > 0 && u.detected);
    for (const e of enemies) {
      if (hexDist(unit.col, unit.row, e.col, e.row) <= def.atkRange) {
        atkHexes.push({ col: e.col, row: e.row, unitId: e.id });
      }
    }
  } else { atkHexes = []; }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isMyTurn() {
  if (!gameState) return false;
  const { phase, blueDone, redDone } = gameState;
  if (phase === 'movement') return myTeam === 'blue' ? !blueDone : !redDone;
  if (phase === 'combat')   return myTeam === 'blue' ? gameState.blueAttacks === null : gameState.redAttacks === null;
  return false;
}

// ─── UI update ────────────────────────────────────────────────────────────────
function updateUI() {
  if (!gameState) return;
  const { turn, period, phase, units, log, winner } = gameState;

  teamBadge.textContent  = myTeam === 'blue' ? 'FORÇA AZUL' : 'FORÇA VERMELHA';
  teamBadge.className    = `team-badge ${myTeam}`;
  turnLabel.textContent  = `Turno ${turn}`;
  periodLabel.textContent= period === 'day' ? '☀ Diurno' : '🌙 Noturno';
  phaseLabel.textContent = phase === 'movement' ? 'Movimentação' : 'Combate';

  myTurnBanner.classList.toggle('visible', isMyTurn() && !winner);

  // Action buttons
  endPhaseBtn.classList.add('hidden');
  combatBtn.classList.add('hidden');
  cancelBtn.classList.toggle('hidden', selUnitId === null);

  if (isMyTurn() && !winner) {
    if (phase === 'movement') endPhaseBtn.classList.remove('hidden');
    if (phase === 'combat')   combatBtn.classList.remove('hidden');
  }

  combatBtn.textContent = `Confirmar Ataques (${pendingAtks.length})`;

  // Fleet count
  const b = units.filter(u => u.team === 'blue' && u.hp > 0).length;
  const r = units.filter(u => u.team === 'red'  && u.hp > 0).length;
  fleetBlue.textContent = `Azul: ${b}`;
  fleetRed.textContent  = `Verm: ${r}`;

  // Selected unit
  const sel = selUnitId ? gameState.units.find(u => u.id === selUnitId && u.hp > 0) : null;
  if (sel) {
    const def  = UNIT_DEFS[sel.type];
    const hpPct= sel.hp / sel.maxHp * 100;
    const bar  = hpPct > 60 ? '#69f0ae' : hpPct > 30 ? '#ffca28' : '#ff5252';
    unitPanel.innerHTML = `
      <div class="u-name ${sel.team}">${def.name}</div>
      <div class="hp-bar"><div class="hp-fill" style="width:${hpPct}%;background:${bar}"></div></div>
      <div class="u-stats">
        <span>HP</span><span>${sel.hp}/${sel.maxHp}</span>
        <span>MOV</span><span>${def.mov}</span>
        <span>DET</span><span>${def.detect}/${def.subDetect}★</span>
        <span>ATK</span><span>${def.atkRange} hex · P${def.atkPower}</span>
        <span>Moveu</span><span>${sel.moved ? '✓' : '–'}</span>
      </div>
      ${atkHexes.length ? `<div class="u-hint">Clique em inimigos vermelhos para marcar ataque</div>` : ''}
      ${pendingAtks.filter(a=>a.attackerId===sel.id).length ? `<div class="u-hint atk-declared">${pendingAtks.filter(a=>a.attackerId===sel.id).length} ataque(s) declarado(s)</div>` : ''}
    `;
  } else {
    unitPanel.innerHTML = '<p class="no-sel">Clique em uma unidade sua</p>';
  }

  // Log
  logEl.innerHTML = (log || []).map(l => `<p>${l}</p>`).join('');
}

// ─── Rendering ────────────────────────────────────────────────────────────────
const OCEAN_COLORS = [
  '#082544', '#082d50', '#083558', '#093d64', '#0d4070',
  '#0a3256', '#092e50', '#073048', '#082844', '#082240',
];

function render() {
  if (!gameState) return;
  ctx.clearRect(0, 0, CVS_W, CVS_H);
  drawOcean();
  drawGrid();
  drawHighlights();
  drawUnits();
  drawCoordLabels();
  if (hoverHex) drawHover();
}

function drawOcean() {
  for (let c = 0; c < GRID_W; c++) {
    for (let r = 0; r < GRID_H; r++) {
      const { x, y } = hexToPixel(c, r);
      const shade = OCEAN_COLORS[(c + r * 3) % OCEAN_COLORS.length];
      drawHex(ctx, x, y, shade, null);
    }
  }
}

function drawGrid() {
  for (let c = 0; c < GRID_W; c++) {
    for (let r = 0; r < GRID_H; r++) {
      const { x, y } = hexToPixel(c, r);
      drawHex(ctx, x, y, null, 'rgba(100,160,220,0.25)', 0.7);
    }
  }
}

function drawHighlights() {
  // Move range
  for (const h of moveHexes) {
    const { x, y } = hexToPixel(h.col, h.row);
    drawHex(ctx, x, y, 'rgba(0,230,118,0.22)', 'rgba(0,230,118,0.7)', 1.5);
  }
  // Attack range
  for (const h of atkHexes) {
    const { x, y } = hexToPixel(h.col, h.row);
    const declared  = pendingAtks.some(a => a.targetId === h.unitId);
    drawHex(ctx, x, y,
      declared ? 'rgba(255,80,80,0.45)' : 'rgba(255,80,80,0.20)',
      declared ? 'rgba(255,120,120,1)'  : 'rgba(255,80,80,0.7)', 1.8);
  }
}

function drawUnits() {
  if (!gameState) return;
  for (const u of gameState.units) {
    if (u.hp <= 0) continue;
    const { x, y } = hexToPixel(u.col, u.row);
    drawUnitCounter(ctx, u, x, y, u.id === selUnitId);
  }
}

function drawCoordLabels() {
  ctx.fillStyle    = 'rgba(130,180,230,0.5)';
  ctx.font         = `${Math.round(HEX_R * 0.28)}px 'Courier New', monospace`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'top';
  for (let c = 0; c < GRID_W; c++) {
    const { x } = hexToPixel(c, 0);
    ctx.fillText(hexLabel(c), x, OY / 2 - 6);
  }
  ctx.textAlign    = 'right';
  ctx.textBaseline = 'middle';
  for (let r = 0; r < GRID_H; r++) {
    const { y } = hexToPixel(0, r);
    ctx.fillText(r + 1, OX - 6, y);
  }
}

function drawHover() {
  if (!hoverHex) return;
  const { col, row } = hoverHex;
  if (col < 0 || col >= GRID_W || row < 0 || row >= GRID_H) return;
  const { x, y } = hexToPixel(col, row);
  drawHex(ctx, x, y, 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.3)', 1);
}

// ─── Error flash ──────────────────────────────────────────────────────────────
function flashError(msg) {
  const el = $('error-flash');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(flashError._t);
  flashError._t = setTimeout(() => el.classList.add('hidden'), 3000);
}
function showLobbyErr(msg) {
  lobbyErr.textContent = msg;
  lobbyErr.classList.remove('hidden');
  setTimeout(() => lobbyErr.classList.add('hidden'), 4000);
}
