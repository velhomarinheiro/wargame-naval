'use strict';

/**
 * metrics.js
 * ==========
 *
 * Medidas de variável dependente (E1/E2/E3 + M Dsp) do estudo de comparação
 * de capacidades (PBC), portadas de `simulacao-construtiva-OAS`:
 *
 *   E1_atrito      — atrito imposto ao Vermelho (pontos de staying power perdidos)
 *   E1_kcv         — 1 se o Vermelho como um todo ficou incapaz de combater
 *   E2_vp          — pontos de infraestrutura crítica preservados (FPSO 1-4)
 *   E2_sloc        — índice [0,1] de segurança das SLOC (sobrevivência dos portos)
 *   E3_culminancia — turno em que a ofensiva Vermelha caiu a <=50% do nível inicial
 *   atrito_azul    — atrito sofrido pelo Azul (M Dsp)
 *
 * ⚠ E2_sloc e E3_culminancia são proxies operacionais derivados do estado de
 * jogo disponível: os documentos-fonte não fixam fórmula determinística.
 * Recomenda-se validação de fachada por especialistas antes do uso analítico.
 */

const { FPSO_UNIT_IDS, PORT_UNIT_IDS } = require('./capability_factors');
const { COMBAT_CONFIG } = require('./combat_config');
const { classifyUnit } = require('./force_taxonomy');

// Interceptadores puros: não contam como meio ofensivo nem no estoque ofensivo.
const DEFENSIVE_CAPABILITIES = new Set(['airDefense', 'bmd']);

/**
 * Um lado retém meios ofensivos se tiver ao menos uma arma com estoque ou uma
 * capacidade ofensiva > 0. `attackRange` é deliberadamente ignorado: é uma
 * tabela estática > 0 para quase toda unidade, e incluí-la faria o predicado
 * disparar só quando literalmente tudo fosse afundado.
 */
function hasOffensiveMeans(unit) {
  const weaponStock = Object.values(unit.weapons || {}).some(w => (w?.quantity || 0) > 0);
  const offensiveCapability = Object.entries(unit.capabilities || {})
    .some(([cap, v]) => (v || 0) > 0 && !DEFENSIVE_CAPABILITIES.has(cap));
  return weaponStock || offensiveCapability;
}

/** Valor esperado de uma linha da tabela d6 ('1d6' → 3,5; inteiro → ele mesmo). */
function expectedFromRow(row) {
  if (!row) return 0;
  let sum = 0;
  for (let face = 1; face <= 6; face++) {
    const v = row[String(face)];
    sum += v === '1d6' ? 3.5 : (Number(v) || 0);
  }
  return sum / 6;
}

/**
 * Dano esperado que uma unidade de `weaponType` em estoque representa — o maior
 * valor esperado entre as categorias-alvo válidas da arma, pelas tabelas d6
 * deste projeto. Pondera o "estoque ofensivo" que dirige a culminância (E3),
 * para que um paiol de ASCM conte pelo potencial de combate e não como "um
 * tiro" cada. Interceptadores puros valem 0.
 */
function weaponOffensiveWeight(weaponType, team = 'blue') {
  if (DEFENSIVE_CAPABILITIES.has(weaponType)) return 0;
  const profile = COMBAT_CONFIG.weaponProfiles?.[weaponType];
  if (!profile) return 0;
  const tables = COMBAT_CONFIG.damageTables?.[team]?.[profile.damageProfile] || {};
  const vals = (profile.targets || []).map(cat => expectedFromRow(tables[cat]));
  return vals.length ? Math.max(...vals) : 0;
}

/**
 * Estoque ofensivo das unidades vivas de `team`, ponderado pelo dano esperado
 * (e não por contagem crua), excluindo capacidades puramente defensivas.
 */
function offensiveStock(state, team) {
  let total = 0;
  for (const u of state.units) {
    if (u.team !== team || u.hp <= 0) continue;
    for (const [wt, w] of Object.entries(u.weapons || {})) {
      total += (w?.quantity || 0) * weaponOffensiveWeight(wt, team);
    }
    for (const [cap, v] of Object.entries(u.capabilities || {})) {
      if (v > 0 && !DEFENSIVE_CAPABILITIES.has(cap)) total += v * weaponOffensiveWeight(cap, team);
    }
  }
  return total;
}

/**
 * Estoque ofensivo que `team` tinha no início da partida — mesma ponderação de
 * offensiveStock, mas sobre os valores iniciais (initWeapons/initCapabilities)
 * e incluindo unidades já destruídas. Serve de denominador quando se quer a
 * fração de potencial de combate que ainda resta (adjudicação por exaustão).
 */
function initialOffensiveStock(state, team) {
  let total = 0;
  for (const u of state.units) {
    if (u.team !== team) continue;
    const w0 = u.initWeapons || u.weapons || {};
    const c0 = u.initCapabilities || u.capabilities || {};
    for (const [wt, w] of Object.entries(w0)) total += (w?.quantity || 0) * weaponOffensiveWeight(wt, team);
    for (const [cap, v] of Object.entries(c0)) {
      if (v > 0 && !DEFENSIVE_CAPABILITIES.has(cap)) total += v * weaponOffensiveWeight(cap, team);
    }
  }
  return total;
}

/** Fração [0,1] do potencial ofensivo inicial que `team` ainda retém. */
function offensiveStockRatio(state, team) {
  const inicial = initialOffensiveStock(state, team);
  return inicial > 0 ? offensiveStock(state, team) / inicial : 0;
}

/** Soma de (maxHp - hp) sobre as unidades de `team` — atrito sofrido por esse lado. */
function attrition(state, team) {
  let total = 0;
  for (const u of state.units) {
    if (u.team !== team) continue;
    total += Math.max(0, (u.maxHp || 0) - (u.hp || 0));
  }
  return total;
}

/** 1 se nenhuma unidade Vermelha viva retém meios ofensivos (decisivo), senão 0. */
function redForceCombatIneffective(state) {
  const combative = state.units.some(u => u.team === 'red' && u.hp > 0 && hasOffensiveMeans(u));
  return combative ? 0 : 1;
}

/** Soma do hp restante das FPSOs (E2_vp — infraestrutura crítica preservada). */
function fpsoValuePreserved(state) {
  let total = 0;
  for (const id of FPSO_UNIT_IDS) {
    const u = state.units.find(x => x.id === id);
    if (u) total += Math.max(0, u.hp || 0);
  }
  return total;
}

/** Razão [0,1] de hp/maxHp agregado dos portos (E2_sloc). */
function slocSecurityIndex(state) {
  let hp = 0, maxHp = 0;
  for (const id of PORT_UNIT_IDS) {
    const u = state.units.find(x => x.id === id);
    if (!u) continue;
    hp += Math.max(0, u.hp || 0);
    maxHp += u.maxHp || 0;
  }
  return maxHp > 0 ? hp / maxHp : null;
}

/**
 * Perda de staying power por grupo de capacidade (Camada 2), para cada lado:
 * `grp_<lado>_<SIGLA>` = 100·(1 − Σ SP_atual / Σ SP_inicial). Ativos protegidos
 * agregam em `grp_<lado>_INFRA` (fallback). Grupos ausentes não geram chave.
 */
function groupLossMetrics(state) {
  const out = {};
  for (const side of ['blue', 'red']) {
    const acc = new Map();
    for (const u of state.units) {
      if (u.team !== side) continue;
      const sigla = classifyUnit(u.id, side).sigla;
      const a = acc.get(sigla) || { hp: 0, maxHp: 0 };
      a.hp += Math.max(0, u.hp || 0);
      a.maxHp += u.maxHp || 0;
      acc.set(sigla, a);
    }
    for (const [sigla, a] of acc) {
      if (a.maxHp <= 0) continue;
      out[`grp_${side}_${sigla}`] = Number((100 * (1 - a.hp / a.maxHp)).toFixed(2));
    }
  }
  return out;
}

/**
 * Rastreia a culminância Vermelha (E3): primeiro turno em que o estoque
 * ofensivo cai a <=50% da linha de base do turno 1. `update(state)` uma vez por
 * turno (após o combate); `.turn` é null se nunca ocorreu ("censurado").
 */
function createCulminationTracker() {
  let baseline = null;
  let culminationTurn = null;
  return {
    update(state) {
      const stock = offensiveStock(state, 'red');
      if (baseline === null) baseline = stock;
      if (culminationTurn === null && baseline > 0 && stock <= baseline * 0.5) {
        culminationTurn = state.turn;
      }
    },
    get turn() { return culminationTurn; },
  };
}

/** Linha final de métricas de uma partida. */
function computeFinalMetrics(state, culminationTurn) {
  return {
    E1_atrito:      attrition(state, 'red'),
    E1_kcv:         redForceCombatIneffective(state),
    E2_vp:          fpsoValuePreserved(state),
    E2_sloc:        slocSecurityIndex(state),
    E3_culminancia: culminationTurn,
    atrito_azul:    attrition(state, 'blue'),
  };
}

module.exports = {
  DEFENSIVE_CAPABILITIES,
  hasOffensiveMeans,
  weaponOffensiveWeight,
  offensiveStock,
  initialOffensiveStock,
  offensiveStockRatio,
  attrition,
  redForceCombatIneffective,
  fpsoValuePreserved,
  slocSecurityIndex,
  groupLossMetrics,
  createCulminationTracker,
  computeFinalMetrics,
};
