'use strict';

/**
 * state_snapshot.js — Serialização do estado de uma partida.
 * ==========================================================
 *
 * Dois consumidores, com necessidades diferentes:
 *
 *   `snapshotState`  — usado por game_logger.js para gravar o dataset de
 *                      treinamento em JSONL. Grava o estado inteiro a cada
 *                      evento, porque cada linha do arquivo precisa ser
 *                      legível isoladamente.
 *
 *   `staticUnit` /   — usados pelo traço de replay (shared/replay_trace.js).
 *   `frameUnit`        Ali o estado inteiro por passo seria caro demais (~11 KB
 *                      × ~300 passos), então o que não muda durante a partida
 *                      sai uma vez só, no catálogo, e cada passo carrega apenas
 *                      os campos mutáveis das unidades que mudaram.
 *
 * A divisão entre estático e mutável não é estética: é o contrato de que o
 * delta depende. Campo mutável classificado como estático vira um replay que
 * mente. Os mutáveis são os que o motor altera em partida — posição e dano,
 * mas também tudo o que `applyDegradation` (server.js) corrói: alcance de
 * detecção, movimentação, capacidades e teto de combustível.
 */

// ── Formato do dataset (game_logger) ─────────────────────────────────────────
// Mantido byte a byte como estava em game_logger.js: os arquivos já gravados
// em data/game-logs/ dependem dele.
function snapshotState(state) {
  return {
    turn:   state.turn,
    period: state.period,
    phase:  state.phase,
    units:  state.units.map(u => ({
      id:        u.id,
      team:      u.team,
      col:       u.col,
      row:       u.row,
      hp:        u.hp,
      maxHp:     u.maxHp,
      category:  u.category,
      type:      u.type,
      moved:     u.moved   || false,
      fuel:      u.fuel    ? { current: u.fuel.current, max: u.fuel.max } : null,
      weapons:   u.weapons || null,
      airStatus: u.airStatus || null,
    })),
  };
}

// ── Formato do traço de replay ───────────────────────────────────────────────

/**
 * O que a unidade é, e não muda enquanto a partida corre. Vai uma vez por
 * partida, no catálogo.
 *
 * `attackRange` entra aqui porque nada no motor o altera — só `detectionRange`
 * é corroído por dano. Os campos `init*` entram porque a tela precisa mostrar
 * a degradação como diferença ("Detecção 4 → 3"), e sem a referência original
 * o número sozinho não diz nada.
 */
function staticUnit(u) {
  return {
    id:          u.id,
    name:        u.name,
    team:        u.team,
    category:    u.category,
    type:        u.type,
    maxHp:       u.maxHp,
    stealthy:    !!u.stealthy,
    attackRange: u.attackRange ? { ...u.attackRange } : {},
    baseHex:     u.baseHex ? { ...u.baseHex } : null,
    baseUnitId:  u.baseUnitId || null,   // aeronave embarcada: navio de origem
    hostId:      u.hostId     || null,   // força especial: hospedeiro
    initMovement:       u.initMovement ?? u.movement,
    initDetectionRange: { ...(u.initDetectionRange || {}) },
    initCapabilities:   { ...(u.initCapabilities   || {}) },
    initWeapons:        cloneWeapons(u.initWeapons),
    initFuelMax:        u.initFuelMax ?? (u.fuel?.max ?? 0),
  };
}

/**
 * O que muda. É sobre estes campos que o delta é calculado — e só sobre eles.
 *
 * `capabilities` não é só adorno: `getWeaponQuantity` (shared/combat_engine.js)
 * consulta `weapons[t].quantity` E `capabilities[t]`, então o arsenal das
 * baterias costeiras — o fator E_Terra — mora aqui e em nenhum outro lugar.
 */
function frameUnit(u) {
  return {
    col:            u.col,
    row:            u.row,
    hp:             u.hp ?? 0,
    moved:          !!u.moved,
    airStatus:      u.airStatus || null,
    movement:       u.movement,
    fuel:           u.fuel ? { current: u.fuel.current, max: u.fuel.max } : null,
    detectionRange: { ...(u.detectionRange || {}) },
    capabilities:   { ...(u.capabilities   || {}) },
    weapons:        cloneWeapons(u.weapons),
  };
}

/** Só `quantity` muda; `range` e o resto do perfil são fixos. */
function cloneWeapons(weapons) {
  if (!weapons) return null;
  const out = {};
  for (const [tipo, w] of Object.entries(weapons)) out[tipo] = { ...w };
  return out;
}

/**
 * Diferença entre dois quadros de unidade. Devolve null quando nada mudou —
 * é o que mantém o delta pequeno, já que a maioria das unidades fica parada
 * na maioria dos passos.
 */
const ESCALARES = ['col', 'row', 'hp', 'moved', 'airStatus', 'movement'];
const OBJETOS   = ['fuel', 'detectionRange', 'capabilities', 'weapons'];

function diffUnit(antes, depois) {
  const d = {};
  for (const k of ESCALARES) if (antes[k] !== depois[k]) d[k] = depois[k];
  for (const k of OBJETOS) {
    if (JSON.stringify(antes[k]) !== JSON.stringify(depois[k])) d[k] = depois[k];
  }
  return Object.keys(d).length ? d : null;
}

module.exports = { snapshotState, staticUnit, frameUnit, diffUnit, cloneWeapons };
