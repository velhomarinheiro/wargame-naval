'use strict';

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const lobbyScreen  = $('lobby-screen');
const gameScreen   = $('game-screen');
const canvas       = $('game-canvas');
const ctx          = canvas.getContext('2d');
const teamBadge    = $('team-badge');
const turnLabel    = $('turn-label');
const periodLabel  = $('period-label');
const phaseLabel   = $('phase-label');
const myTurnBanner = $('my-turn-banner');
const unitPanel    = $('unit-panel');
const endPhaseBtn  = $('end-phase-btn');
const combatBtn    = $('combat-btn');
const cancelBtn    = $('cancel-btn');
const fleetBlue    = $('fleet-blue');
const fleetRed     = $('fleet-red');
const logEl        = $('battle-log');
const gameOver     = $('game-over');
const winnerMsg    = $('winner-msg');
const disconnected = $('disconnected');
const lobbyMenu    = $('lobby-menu');
const lobbyWaiting = $('lobby-waiting');
const lobbyErr     = $('lobby-err');
const roomDisplay  = $('room-display');
const roomInput    = $('room-input');
const btnCreate    = $('btn-create');
const btnJoin      = $('btn-join');
const terrainTip   = $('terrain-tip');

// ─── Canvas setup ─────────────────────────────────────────────────────────────
canvas.width  = CVS_W;
canvas.height = CVS_H;

// ─── Map background image ─────────────────────────────────────────────────────
const mapImg  = new Image();
let   mapReady = false;
mapImg.onload  = () => { mapReady = true;  if (gameState) render(); };
mapImg.onerror = () => { mapReady = false; if (gameState) render(); };
mapImg.src = '/mapa.jpeg';   // place the map image at public/mapa.jpeg

// ─── Game state ───────────────────────────────────────────────────────────────
let myTeam     = null;
let gameState  = null;
let selUnitId  = null;
let moveHexes  = [];
let atkHexes   = [];
let pendingAtks = [];
let hoverHex   = null;

// ─── Socket ───────────────────────────────────────────────────────────────────
const socket = io();

socket.on('room_created', ({roomId, team}) => {
  myTeam = team;
  roomDisplay.textContent = roomId;
  lobbyMenu.classList.add('hidden');
  lobbyWaiting.classList.remove('hidden');
});
socket.on('join_error', msg => showLobbyErr(msg));

socket.on('game_start', ({team, state}) => {
  myTeam = team; gameState = state;
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
socket.on('game_over', ({winner, state}) => {
  gameState = state; updateUI(); render();
  const mine = winner === myTeam;
  winnerMsg.textContent = mine ? '🏆 VITÓRIA! Sua força prevaleceu.' : '💀 DERROTA. Sua frota foi afundada.';
  winnerMsg.className   = mine ? 'victory' : 'defeat';
  gameOver.classList.remove('hidden');
});
socket.on('opponent_disconnected', () => disconnected.classList.remove('hidden'));
socket.on('action_error', msg => flashError(msg));
socket.on('combat_result', data => showCombatModal(data));

// ─── Lobby actions ────────────────────────────────────────────────────────────
btnCreate.addEventListener('click', () => socket.emit('create_room'));
btnJoin.addEventListener('click', () => {
  const code = roomInput.value.trim().toUpperCase();
  if (code) socket.emit('join_room', {roomId: code});
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
  pendingAtks = []; deselect();
});
cancelBtn.addEventListener('click', deselect);
$('btn-restart').addEventListener('click', () => { socket.emit('restart'); gameOver.classList.add('hidden'); });
$('combat-modal-close').addEventListener('click', () => $('combat-modal').classList.add('hidden'));
$('btn-back').addEventListener('click', () => location.reload());

// ─── Canvas input ─────────────────────────────────────────────────────────────
canvas.addEventListener('mousemove', e => {
  const r  = canvas.getBoundingClientRect();
  const sx = canvas.width  / r.width;
  const sy = canvas.height / r.height;
  const h  = pixelToHex((e.clientX - r.left) * sx, (e.clientY - r.top) * sy);
  hoverHex = h;
  // Show terrain tooltip
  if (h.col >= 0 && h.col < GRID_W && h.row >= 0 && h.row < GRID_H) {
    const t = TERRAIN_MAP[h.row][h.col];
    const inf = INFRA.filter(i => i.col === h.col && i.row === h.row);
    let tip = `${hexLabel(h.col)}${h.row + 1} · ${T_NAME[t]}`;
    if (inf.length) tip += ' · ' + inf.map(i => i.name).join(', ');
    terrainTip.textContent = tip;
    terrainTip.style.display = 'block';
  } else {
    terrainTip.style.display = 'none';
  }
  render();
});
canvas.addEventListener('mouseleave', () => {
  hoverHex = null;
  terrainTip.style.display = 'none';
  render();
});
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
  const {phase} = gameState;

  if (phase === 'movement' && isMyTurn() && selUnitId !== null) {
    const move = moveHexes.find(h => h.col === col && h.row === row);
    if (move) { socket.emit('move_unit', {unitId: selUnitId, toCol: col, toRow: row}); deselect(); return; }
  }
  if (phase === 'combat' && isMyTurn() && selUnitId !== null) {
    const atk = atkHexes.find(h => h.col === col && h.row === row);
    if (atk) {
      const idx = pendingAtks.findIndex(a => a.attackerId === selUnitId && a.targetId === atk.unitId);
      if (idx >= 0) pendingAtks.splice(idx, 1); else pendingAtks.push({attackerId: selUnitId, targetId: atk.unitId});
      render(); return;
    }
  }
  const unit = gameState.units.find(u => u.col === col && u.row === row && u.hp > 0);
  if (unit && unit.team === myTeam) {
    selUnitId = unit.id; recalcHighlights(unit); updateUI(); render();
  } else { deselect(); }
}

function deselect() { selUnitId = null; moveHexes = []; atkHexes = []; updateUI(); render(); }

function recalcHighlights(unit) {
  const def = UNIT_DEFS[unit.type];
  const {phase} = gameState;

  if (phase === 'movement' && !unit.moved && isMyTurn()) {
    // BFS respecting terrain and occupied hexes
    const occ  = new Set(gameState.units.filter(u => u.hp > 0 && u.id !== unit.id).map(u => `${u.col},${u.row}`));
    const seen = new Set([`${unit.col},${unit.row}`]);
    let front  = [{col: unit.col, row: unit.row}];
    moveHexes  = [];
    for (let d = 0; d < def.mov; d++) {
      const next = [];
      for (const h of front) {
        for (const nb of hexNeighbors(h.col, h.row)) {
          const k = `${nb.col},${nb.row}`;
          if (seen.has(k)) continue;
          seen.add(k);
          const t = TERRAIN_MAP[nb.row][nb.col];
          if (!canEnterTerrain(unit.type, t)) continue;
          if (!occ.has(k)) { moveHexes.push(nb); next.push(nb); }
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
        atkHexes.push({col: e.col, row: e.row, unitId: e.id});
      }
    }
  } else { atkHexes = []; }
}

function isMyTurn() {
  if (!gameState) return false;
  const {phase, blueDone, redDone} = gameState;
  if (phase === 'movement') return myTeam === 'blue' ? !blueDone : !redDone;
  if (phase === 'combat')   return myTeam === 'blue' ? gameState.blueAttacks === null : gameState.redAttacks === null;
  return false;
}

// ─── UI update ────────────────────────────────────────────────────────────────
function updateUI() {
  if (!gameState) return;
  const {turn, period, phase, units, log, winner} = gameState;

  teamBadge.textContent  = myTeam === 'blue' ? 'FORÇA AZUL' : 'FORÇA VERMELHA';
  teamBadge.className    = `team-badge ${myTeam}`;
  turnLabel.textContent  = `Turno ${turn}`;
  periodLabel.textContent= period === 'day' ? '☀ Diurno' : '🌙 Noturno';
  phaseLabel.textContent = phase === 'movement' ? 'Movimentação' : 'Combate';

  myTurnBanner.classList.toggle('visible', isMyTurn() && !winner);
  endPhaseBtn.classList.add('hidden');
  combatBtn.classList.add('hidden');
  cancelBtn.classList.toggle('hidden', selUnitId === null);
  if (isMyTurn() && !winner) {
    if (phase === 'movement') endPhaseBtn.classList.remove('hidden');
    if (phase === 'combat')   combatBtn.classList.remove('hidden');
  }
  combatBtn.textContent = `Confirmar Ataques (${pendingAtks.length})`;

  const b = units.filter(u => u.team === 'blue' && u.hp > 0).length;
  const r = units.filter(u => u.team === 'red'  && u.hp > 0).length;
  fleetBlue.textContent = `Azul: ${b}`;
  fleetRed.textContent  = `Verm: ${r}`;

  const sel = selUnitId ? gameState.units.find(u => u.id === selUnitId && u.hp > 0) : null;
  if (sel) {
    const def  = UNIT_DEFS[sel.type];
    const hpPct= sel.hp / sel.maxHp * 100;
    const bar  = hpPct > 60 ? '#69f0ae' : hpPct > 30 ? '#ffca28' : '#ff5252';
    const t    = sel.col >= 0 ? TERRAIN_MAP[sel.row][sel.col] : 3;
    unitPanel.innerHTML = `
      <div class="u-name ${sel.team}">${def.name}</div>
      <div class="hp-bar"><div class="hp-fill" style="width:${hpPct}%;background:${bar}"></div></div>
      <div class="u-stats">
        <span>HP</span><span>${sel.hp}/${sel.maxHp}</span>
        <span>MOV</span><span>${def.mov}</span>
        <span>DET</span><span>${def.detect}/${def.subDetect}★</span>
        <span>ATK</span><span>${def.atkRange}hex·P${def.atkPower}</span>
        <span>Moveu</span><span>${sel.moved?'✓':'–'}</span>
        <span>Terreno</span><span style="font-size:0.7em">${T_NAME[t]}</span>
      </div>
      ${atkHexes.length ? `<div class="u-hint">Clique em alvos vermelhos p/ declarar ataque</div>` : ''}
      ${pendingAtks.filter(a=>a.attackerId===sel.id).length ? `<div class="u-hint atk-declared">${pendingAtks.filter(a=>a.attackerId===sel.id).length} ataque(s) declarado(s)</div>` : ''}
    `;
  } else {
    unitPanel.innerHTML = '<p class="no-sel">Clique em uma unidade sua</p>';
  }
  logEl.innerHTML = (log||[]).map(l=>`<p>${l}</p>`).join('');
}

// ═══ RENDERING ════════════════════════════════════════════════════════════════
function render() {
  if (!gameState) return;
  ctx.clearRect(0, 0, CVS_W, CVS_H);
  drawBackground();       // 1. Mapa ou gradiente oceânico
  // drawTerrainLayer();  // desativado: o mapa já traz a arte e a grade base
  drawHighlights();       // 3. Alcance de movimento / ataque
  drawGrid();             // 4. Grade hexagonal
  drawInfrastructure();   // 5. Portos, bases, plataformas
  drawUnits();            // 6. Fichas de unidade
  drawCoordLabels();      // 7. Coordenadas A-N / 1-10
  if (hoverHex) drawHover(); // 8. Efeito de hover
}

// ── Layer 1: Background ───────────────────────────────────────────────────────
function drawBackground() {
  if (mapReady) {
    ctx.drawImage(mapImg, 0, 0, CVS_W, CVS_H);
  } else {
    // Fallback gradient when mapa.jpg is not available
    const g = ctx.createLinearGradient(0, 0, CVS_W, CVS_H);
    g.addColorStop(0.0, '#0d2a45');
    g.addColorStop(0.2, '#0a2238');
    g.addColorStop(1.0, '#071520');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, CVS_W, CVS_H);
  }
}

// ── Layer 2: Terrain colored hexes ───────────────────────────────────────────
function drawTerrainLayer() {
  for (let r = 0; r < GRID_H; r++) {
    for (let c = 0; c < GRID_W; c++) {
      const t = TERRAIN_MAP[r][c];
      const {x, y} = hexToPixel(c, r);
      const fill = mapReady ? T_COLOR_OVERLAY[t] : T_COLOR_SOLID[t];
      drawHex(ctx, x, y, fill, null);
    }
  }
}

// ── Layer 3: Highlights ───────────────────────────────────────────────────────
function drawHighlights() {
  for (const h of moveHexes) {
    const {x, y} = hexToPixel(h.col, h.row);
    drawHex(ctx, x, y, 'rgba(0,230,118,0.25)', 'rgba(0,230,118,0.75)', 1.8);
  }
  for (const h of atkHexes) {
    const {x, y} = hexToPixel(h.col, h.row);
    const declared = pendingAtks.some(a => a.targetId === h.unitId);
    drawHex(ctx, x, y,
      declared ? 'rgba(255,60,60,0.50)' : 'rgba(255,60,60,0.22)',
      declared ? 'rgba(255,120,120,1)'  : 'rgba(255,80,80,0.75)', 2.0);
  }
}

// ── Layer 4: Hex grid ─────────────────────────────────────────────────────────
function drawGrid() {
  for (let r = 0; r < GRID_H; r++) {
    for (let c = 0; c < GRID_W; c++) {
      const t = TERRAIN_MAP[r][c];
      const {x, y} = hexToPixel(c, r);
      drawHex(ctx, x, y, null, T_BORDER[t], 0.8);
    }
  }
}

// ── Layer 5: Infrastructure ───────────────────────────────────────────────────
const INFRA_COLORS = { naval:'#82b1ff', port:'#80cbc4', aero:'#b0bec5', oil:'#ffcc02' };

function drawInfrastructure() {
  for (const inf of INFRA) {
    const {x, y} = hexToPixel(inf.col, inf.row);
    const col = INFRA_COLORS[inf.type] || '#fff';
    // Shadow for visibility
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur  = 4;
    ctx.fillStyle    = col;
    ctx.font         = `bold ${Math.round(HEX_R * 0.38)}px sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(inf.label, x, y - HEX_R * 0.1);
    ctx.shadowBlur = 0;
    ctx.fillStyle  = 'rgba(255,255,200,0.7)';
    ctx.font       = `${Math.round(HEX_R * 0.2)}px 'Courier New', monospace`;
    ctx.fillText(inf.name, x, y + HEX_R * 0.38);
  }
}

// ── Layer 6: Units ────────────────────────────────────────────────────────────
function drawUnits() {
  if (!gameState) return;
  for (const u of gameState.units) {
    if (u.hp <= 0) continue;
    const {x, y} = hexToPixel(u.col, u.row);
    drawUnitCounter(ctx, u, x, y, u.id === selUnitId);
  }
}

// ── Layer 7: Coordinate labels ────────────────────────────────────────────────
function drawCoordLabels() {
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur  = 3;
  const fs        = Math.round(HEX_R * 0.27);
  ctx.fillStyle   = 'rgba(200,220,240,0.55)';
  ctx.font        = `${fs}px 'Courier New', monospace`;

  ctx.textAlign    = 'center';
  ctx.textBaseline = 'top';
  for (let c = 0; c < GRID_W; c++) {
    const {x} = hexToPixel(c, 0);
    ctx.fillText(hexLabel(c), x, OY / 2 - 6);
  }
  ctx.textAlign    = 'right';
  ctx.textBaseline = 'middle';
  for (let r = 0; r < GRID_H; r++) {
    const {y} = hexToPixel(0, r);
    ctx.fillText(r + 1, OX - 6, y);
  }
  ctx.shadowBlur = 0;
}

// ── Layer 8: Hover ────────────────────────────────────────────────────────────
function drawHover() {
  const {col, row} = hoverHex;
  if (col < 0 || col >= GRID_W || row < 0 || row >= GRID_H) return;
  const {x, y} = hexToPixel(col, row);
  drawHex(ctx, x, y, 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.35)', 1.2);
}

// ─── Utility ──────────────────────────────────────────────────────────────────
function flashError(msg) {
  const el = $('error-flash');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(flashError._t);
  flashError._t = setTimeout(() => el.classList.add('hidden'), 3500);
}
function showLobbyErr(msg) {
  lobbyErr.textContent = msg;
  lobbyErr.classList.remove('hidden');
  setTimeout(() => lobbyErr.classList.add('hidden'), 4000);
}

function showCombatModal(data) {
  const body = $('combat-modal-body');
  let html = `<div class="cm-header">── Resolução de Combate · Turno ${data.turn} ──</div>`;
  if (!data.results || data.results.length === 0) {
    html += '<div class="cm-empty">Nenhum ataque declarado neste turno.</div>';
  } else {
    for (const r of data.results) {
      const aC = r.attackerTeam === 'blue' ? 'cm-blue' : 'cm-red';
      const tC = r.targetTeam  === 'blue' ? 'cm-blue' : 'cm-red';
      if (r.outOfRange) {
        html += `<div class="cm-row cm-oor">⚠ <span class="${aC}">${r.attacker}</span> → <span class="${tC}">${r.target}</span> — fora de alcance</div>`;
      } else if (r.hit) {
        const dest = r.destroyed ? ' <strong>DESTRUÍDO!</strong>' : '';
        const cls  = r.destroyed ? 'cm-destroyed' : 'cm-hit';
        html += `<div class="cm-row ${cls}">✓ <span class="${aC}">${r.attacker}</span> → <span class="${tC}">${r.target}</span> −${r.damage}HP${dest} <small>[${r.roll}/${r.chance}%]</small></div>`;
      } else {
        html += `<div class="cm-row cm-miss">✗ <span class="${aC}">${r.attacker}</span> → <span class="${tC}">${r.target}</span> — errou <small>[${r.roll}/${r.chance}%]</small></div>`;
      }
    }
  }
  body.innerHTML = html;
  $('combat-modal').classList.remove('hidden');
}
