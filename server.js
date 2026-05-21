'use strict';
const express  = require('express');
const http     = require('http');
const { Server } = require('socket.io');
const path     = require('path');

const PORT   = process.env.PORT || 3000;
const GRID_W = 14;
const GRID_H = 10;

// ─── Unit definitions ────────────────────────────────────────────────────────
const UNIT_DEFS = {
  fragata:    { name: 'Fragata',           hp: 4, mov: 3, detect: 4, subDetect: 2, atkRange: 3, atkPower: 4 },
  destroier:  { name: 'Destróier',         hp: 5, mov: 4, detect: 4, subDetect: 3, atkRange: 4, atkPower: 5 },
  corveta:    { name: 'Corveta',           hp: 3, mov: 3, detect: 3, subDetect: 3, atkRange: 3, atkPower: 3 },
  submarino:  { name: 'Submarino',         hp: 3, mov: 3, detect: 3, subDetect: 2, atkRange: 4, atkPower: 5, stealthy: true },
  helicoptero:{ name: 'Helicóptero ASW',   hp: 2, mov: 5, detect: 4, subDetect: 5, atkRange: 3, atkPower: 3 },
  patrulha:   { name: 'Patrulha Marítima', hp: 2, mov: 7, detect: 7, subDetect: 6, atkRange: 5, atkPower: 4 },
};

// ─── Hex math (odd-r offset, pointy-top) ────────────────────────────────────
function oddrToCube(col, row) {
  const x = col - (row - (row & 1)) / 2;
  const z = row;
  return { x, y: -x - z, z };
}
function cubeToOddr(x, z) {
  return { col: x + (z - (z & 1)) / 2, row: z };
}
const CUBE_DIRS = [
  { dx:+1, dy:-1, dz: 0 }, { dx:+1, dy: 0, dz:-1 }, { dx: 0, dy:+1, dz:-1 },
  { dx:-1, dy:+1, dz: 0 }, { dx:-1, dy: 0, dz:+1 }, { dx: 0, dy:-1, dz:+1 },
];
function hexNeighbors(col, row) {
  const c = oddrToCube(col, row);
  return CUBE_DIRS
    .map(d => cubeToOddr(c.x + d.dx, c.z + d.dz))
    .filter(({ col: nc, row: nr }) => nc >= 0 && nc < GRID_W && nr >= 0 && nr < GRID_H);
}
function hexDist(c1, r1, c2, r2) {
  const a = oddrToCube(c1, r1), b = oddrToCube(c2, r2);
  return Math.max(Math.abs(a.x-b.x), Math.abs(a.y-b.y), Math.abs(a.z-b.z));
}

// ─── Fog of war ──────────────────────────────────────────────────────────────
function detectedEnemies(state, team) {
  const night   = state.period === 'night';
  const mine    = state.units.filter(u => u.team === team && u.hp > 0);
  const enemies = state.units.filter(u => u.team !== team && u.hp > 0);
  return enemies.filter(enemy => {
    const stealthy = !!UNIT_DEFS[enemy.type].stealthy;
    return mine.some(f => {
      const def   = UNIT_DEFS[f.type];
      let range   = stealthy ? def.subDetect : def.detect;
      if (night)  range -= stealthy ? 1 : 2;
      return range >= 1 && hexDist(f.col, f.row, enemy.col, enemy.row) <= range;
    });
  }).map(e => ({ ...e, detected: true }));
}

function stateFor(state, team) {
  const mine = state.units.filter(u => u.team === team);
  const foe  = detectedEnemies(state, team);
  return {
    ...state,
    units:       [...mine, ...foe],
    blueAttacks: team === 'blue' ? state.blueAttacks : (state.blueAttacks !== null ? '✓' : null),
    redAttacks:  team === 'red'  ? state.redAttacks  : (state.redAttacks  !== null ? '✓' : null),
  };
}

// ─── Initial units ───────────────────────────────────────────────────────────
let _uid = 1;
function mkUnit(team, type, col, row) {
  const d = UNIT_DEFS[type];
  return { id: _uid++, team, type, name: d.name, col, row, hp: d.hp, maxHp: d.hp, moved: false };
}
function initialUnits() {
  _uid = 1;
  return [
    // Força Azul (oeste)
    mkUnit('blue', 'fragata',     1, 1), mkUnit('blue', 'fragata',     1, 6),
    mkUnit('blue', 'destroier',   2, 3), mkUnit('blue', 'corveta',      0, 8),
    mkUnit('blue', 'submarino',   0, 4), mkUnit('blue', 'submarino',    1, 9),
    mkUnit('blue', 'helicoptero', 3, 2), mkUnit('blue', 'helicoptero',  2, 7),
    mkUnit('blue', 'patrulha',    2, 0),
    // Força Vermelha (leste)
    mkUnit('red',  'fragata',    12, 1), mkUnit('red',  'fragata',    12, 6),
    mkUnit('red',  'destroier',  11, 3), mkUnit('red',  'corveta',    13, 8),
    mkUnit('red',  'submarino',  13, 4), mkUnit('red',  'submarino',  12, 9),
    mkUnit('red',  'helicoptero',10, 2), mkUnit('red',  'helicoptero',11, 7),
    mkUnit('red',  'patrulha',   11, 0),
  ];
}

function newGame() {
  return {
    turn: 1,
    period: 'day',
    phase: 'movement',          // movement | combat
    blueDone: false,
    redDone:  false,
    blueAttacks: null,          // null = not submitted
    redAttacks:  null,
    units: initialUnits(),
    log: ['──── Turno 1 · Período Diurno ────', 'Fase de Movimentação. Mova suas unidades.'],
    winner: null,
  };
}

// ─── Combat resolution ────────────────────────────────────────────────────────
function resolveCombat(state) {
  const all = [...(state.blueAttacks || []), ...(state.redAttacks || [])];
  const dmg = {};

  for (const atk of all) {
    const attacker = state.units.find(u => u.id === atk.attackerId && u.hp > 0);
    const target   = state.units.find(u => u.id === atk.targetId   && u.hp > 0);
    if (!attacker || !target) continue;

    const def  = UNIT_DEFS[attacker.type];
    const dist = hexDist(attacker.col, attacker.row, target.col, target.row);
    if (dist > def.atkRange) {
      state.log.unshift(`⚠ ${attacker.name} fora de alcance de ${target.name}.`);
      continue;
    }
    const hitPct = Math.max(20, Math.min(90, 70 - (dist - 1) * 10));
    const roll   = Math.ceil(Math.random() * 100);
    if (roll <= hitPct) {
      const d = Math.ceil(def.atkPower / 2);
      dmg[target.id] = (dmg[target.id] || 0) + d;
      state.log.unshift(`✓ ${attacker.name}(${attacker.team}) atingiu ${target.name}(${target.team}) −${d}HP [${roll}≤${hitPct}]`);
    } else {
      state.log.unshift(`✗ ${attacker.name}(${attacker.team}) errou ${target.name}(${target.team}) [${roll}>${hitPct}]`);
    }
  }

  for (const [idStr, d] of Object.entries(dmg)) {
    const u = state.units.find(u => u.id === +idStr);
    if (!u) continue;
    u.hp = Math.max(0, u.hp - d);
    if (u.hp === 0) state.log.unshift(`💥 ${u.name}(${u.team}) DESTRUÍDO!`);
  }

  if (state.log.length > 30) state.log = state.log.slice(0, 30);
}

function checkWinner(state) {
  const b = state.units.some(u => u.team === 'blue' && u.hp > 0);
  const r = state.units.some(u => u.team === 'red'  && u.hp > 0);
  if (!b) return 'red';
  if (!r) return 'blue';
  return null;
}

function nextTurn(state) {
  state.units.forEach(u => { u.moved = false; });
  state.period     = state.period === 'day' ? 'night' : 'day';
  if (state.period === 'day') state.turn++;
  state.phase      = 'movement';
  state.blueDone   = false;
  state.redDone    = false;
  state.blueAttacks = null;
  state.redAttacks  = null;
  const per = state.period === 'day' ? 'Diurno' : 'Noturno';
  state.log.unshift(`──── Turno ${state.turn} · Período ${per} ────`);
  state.log.unshift('Fase de Movimentação. Mova suas unidades.');
  if (state.log.length > 30) state.log = state.log.slice(0, 30);
}

// ─── Server setup ─────────────────────────────────────────────────────────────
const app    = express();
const server = http.createServer(app);
const io     = new Server(server, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/game', (_, res) => res.sendFile(path.join(__dirname, 'public', 'game.html')));

const rooms = new Map();
function genId() { return Math.random().toString(36).slice(2, 8).toUpperCase(); }
function broadcast(room) {
  if (!room.state) return;
  if (room.players.blue) io.to(room.players.blue).emit('game_update', stateFor(room.state, 'blue'));
  if (room.players.red)  io.to(room.players.red ).emit('game_update', stateFor(room.state, 'red'));
}

io.on('connection', socket => {
  console.log('+ connect', socket.id);

  socket.on('create_room', () => {
    const roomId = genId();
    rooms.set(roomId, { id: roomId, players: { blue: socket.id, red: null }, state: null });
    socket.data.roomId = roomId;
    socket.data.team   = 'blue';
    socket.join(roomId);
    socket.emit('room_created', { roomId, team: 'blue' });
  });

  socket.on('join_room', ({ roomId }) => {
    const room = rooms.get(roomId?.toUpperCase?.());
    if (!room)           { socket.emit('join_error', 'Sala não encontrada.'); return; }
    if (room.players.red){ socket.emit('join_error', 'Sala cheia.');           return; }
    room.players.red    = socket.id;
    socket.data.roomId  = room.id;
    socket.data.team    = 'red';
    socket.join(room.id);
    room.state = newGame();
    io.to(room.players.blue).emit('game_start', { team: 'blue', state: stateFor(room.state, 'blue') });
    socket.emit('game_start',                    { team: 'red',  state: stateFor(room.state, 'red')  });
  });

  // ── Movement ──────────────────────────────────────────────────────────────
  socket.on('move_unit', ({ unitId, toCol, toRow }) => {
    const room = rooms.get(socket.data.roomId);
    if (!room?.state) return;
    const { state } = room;
    const { team }  = socket.data;

    if (state.phase !== 'movement')               { socket.emit('action_error', 'Não é a fase de movimentação.'); return; }
    if (state[team === 'blue' ? 'blueDone' : 'redDone'])
                                                  { socket.emit('action_error', 'Você já encerrou a movimentação.'); return; }
    const unit = state.units.find(u => u.id === unitId && u.team === team && u.hp > 0);
    if (!unit)       { socket.emit('action_error', 'Unidade inválida.'); return; }
    if (unit.moved)  { socket.emit('action_error', 'Esta unidade já se moveu neste turno.'); return; }
    if (toCol < 0 || toCol >= GRID_W || toRow < 0 || toRow >= GRID_H)
                     { socket.emit('action_error', 'Posição fora do tabuleiro.'); return; }
    if (state.units.some(u => u.col === toCol && u.row === toRow && u.hp > 0))
                     { socket.emit('action_error', 'Hexágono ocupado.'); return; }
    const dist = hexDist(unit.col, unit.row, toCol, toRow);
    if (dist > UNIT_DEFS[unit.type].mov) { socket.emit('action_error', `Alcance de movimento: ${UNIT_DEFS[unit.type].mov} hex.`); return; }

    unit.col   = toCol;
    unit.row   = toRow;
    unit.moved = true;
    const col  = String.fromCharCode(65 + toCol);
    state.log.unshift(`${unit.name}(${team}) → ${col}${toRow + 1}`);
    if (state.log.length > 30) state.log = state.log.slice(0, 30);
    broadcast(room);
  });

  socket.on('end_movement', () => {
    const room = rooms.get(socket.data.roomId);
    if (!room?.state) return;
    const { state } = room;
    const { team }  = socket.data;
    if (state.phase !== 'movement') return;

    if (team === 'blue') state.blueDone = true;
    else                 state.redDone  = true;

    if (state.blueDone && state.redDone) {
      state.phase = 'combat';
      state.log.unshift('Fase de Combate iniciada. Declare seus ataques.');
    } else {
      const waiting = team === 'blue' ? 'Força Vermelha' : 'Força Azul';
      state.log.unshift(`${team === 'blue' ? 'Força Azul' : 'Força Vermelha'} encerrou movimentação. Aguardando ${waiting}...`);
    }
    if (state.log.length > 30) state.log = state.log.slice(0, 30);
    broadcast(room);
  });

  // ── Combat ────────────────────────────────────────────────────────────────
  socket.on('declare_attacks', attacks => {
    const room = rooms.get(socket.data.roomId);
    if (!room?.state) return;
    const { state } = room;
    const { team }  = socket.data;
    if (state.phase !== 'combat') { socket.emit('action_error', 'Não é a fase de combate.'); return; }

    if (team === 'blue') state.blueAttacks = attacks || [];
    else                 state.redAttacks  = attacks || [];

    state.log.unshift(`${team === 'blue' ? 'Força Azul' : 'Força Vermelha'} confirmou ${(attacks||[]).length} ataque(s).`);

    if (state.blueAttacks !== null && state.redAttacks !== null) {
      state.log.unshift('── Resolução de Combate ──');
      resolveCombat(state);
      const winner = checkWinner(state);
      if (winner) {
        state.winner = winner;
        const wName  = winner === 'blue' ? 'Força Azul' : 'Força Vermelha';
        state.log.unshift(`🏆 ${wName} VENCEU A BATALHA!`);
        io.to(room.players.blue).emit('game_over', { winner, state: stateFor(state, 'blue') });
        io.to(room.players.red ).emit('game_over', { winner, state: stateFor(state, 'red')  });
        return;
      }
      nextTurn(state);
    }
    broadcast(room);
  });

  socket.on('restart', () => {
    const room = rooms.get(socket.data.roomId);
    if (!room) return;
    room.state = newGame();
    io.to(room.players.blue).emit('game_start', { team: 'blue', state: stateFor(room.state, 'blue') });
    io.to(room.players.red ).emit('game_start', { team: 'red',  state: stateFor(room.state, 'red')  });
  });

  socket.on('disconnect', () => {
    const { roomId, team } = socket.data;
    if (!roomId) return;
    const room = rooms.get(roomId);
    if (!room) return;
    const other = team === 'blue' ? room.players.red : room.players.blue;
    if (other) io.to(other).emit('opponent_disconnected');
    rooms.delete(roomId);
    console.log('- room closed', roomId);
  });
});

server.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
