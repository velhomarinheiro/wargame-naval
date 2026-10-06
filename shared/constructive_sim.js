'use strict';

/**
 * constructive_sim.js
 * ===================
 *
 * Simulação construtiva para Planejamento Baseado em Capacidades (PBC).
 *
 * Joga partidas inteiras sem jogadores humanos e sem rede: os dois lados são
 * conduzidos pela heurística do bot deste projeto, sobre a MESMA máquina de
 * estados do jogo interativo (server.js). O que varia entre as partidas é o
 * **pacote de capacidades** da Força Azul — cinco fatores que acrescentam ou
 * retiram meios da ordem de batalha (shared/capability_factors.js) — e a
 * semente do gerador aleatório, que torna cada réplica reprodutível.
 *
 * Por que reusar o motor do jogo em vez de um modelo próprio: é o que faz da
 * plataforma uma só. O pacote avaliado aqui é jogável no modo solo, e o
 * resultado de uma partida humana é comparável ao do lote — mesmas regras,
 * mesma ordem de batalha, mesmas tabelas de dano.
 *
 * O servidor expõe este módulo em /api/construtivo/* (ver server.js); a
 * página public/construtivo.html é o front-end.
 */

const { ORDER_OF_BATTLE } = require('./order_of_battle');
const { applyForceConfig, FACTOR_KEYS, RED_GROUP_KEYS, totalCost, countActive,
        quantityOf, describeRedConfig } = require('./capability_factors');
const { createCulminationTracker, computeFinalMetrics, groupLossMetrics } = require('./metrics');
const { groupLabels } = require('./force_taxonomy');
const { FACTORIAL_CONDITIONS, ABLATION_CONDITIONS } = require('./conditions');

// Injetado por server.js (evita dependência circular: server.js requer este
// módulo, e este precisa das funções de partida que vivem lá).
let ENGINE = null;
function useEngine(engine) { ENGINE = engine; }

const DEFAULT_MAX_TURNS = 12;

/**
 * Joga uma partida completa, headless, para um pacote de capacidades.
 *
 * O ciclo espelha o do jogo interativo: movimentação dos dois lados →
 * fase de combate com os ataques declarados pelos dois bots → resolução da
 * fila de engajamentos → virada de turno. Sem facilitador e sem decisões de
 * rodada (cada engajamento resolve a 1ª rodada, como no selfplay de
 * scripts/balance_sim.js).
 *
 * @param {object} factors     { A_SSN, B_SSK, C_Azuis, D_MSS, E_Terra } +1/-1
 * @param {number} seed        semente da réplica (reprodutibilidade)
 * @param {number} maxTurns    teto de turnos-dia; ao atingir, a partida é "censurada"
 * @param {string} victoryRule 'objectives' (padrão) ou 'exhaustion' — ver
 *                             VICTORY_RULES no server.js. A regra muda o que
 *                             conta como partida decidida e, por consequência,
 *                             a métrica E1_kcv.
 * @param {object} redGroups   quantidade por grupo-tarefa Vermelho (opcional);
 *                             ausente = ordem de batalha original
 * @returns {{winner, turns, metrics, groupMetrics}}
 */
function runGame(factors, seed, maxTurns = DEFAULT_MAX_TURNS, victoryRule = undefined, redGroups = undefined) {
  if (!ENGINE) throw new Error('constructive_sim: motor não injetado (useEngine)');
  const ob    = applyForceConfig(ORDER_OF_BATTLE, { factors, redGroups });
  const state = ENGINE.newGame(ob, { seed, victoryRule });

  const culmination = createCulminationTracker();
  culmination.update(state);

  const maxPhases = maxTurns * 2;          // dia + noite por turno
  let winner = null;
  for (let phase = 0; phase < maxPhases && !winner && state.turn <= maxTurns; phase++) {
    // ── Movimentação (os dois lados pela heurística do bot) ──
    for (const team of ['blue', 'red']) {
      ENGINE.applyBotMovesToState(state, team, ENGINE.computeBotMoves(state, team));
    }

    // ── Combate ──
    state.phase       = 'combat';
    state.blueAttacks = ENGINE.computeBotAttacks(state, 'blue');
    state.redAttacks  = ENGINE.computeBotAttacks(state, 'red');
    state.combatQueue = ENGINE.buildCombatQueue(state);
    for (const eng of state.combatQueue) {
      eng.battleRound = 1;
      ENGINE.resolveBattleRound(state, eng);
    }
    state.combatQueue = [];
    state.currentEngagementIndex = 0;

    winner = ENGINE.checkWinner(state);
    culmination.update(state);
    if (winner) break;
    ENGINE.nextTurn(state);
  }

  return {
    winner,
    turns:        state.turn,
    metrics:      computeFinalMetrics(state, culmination.turn),
    groupMetrics: groupLossMetrics(state),
  };
}

// ─── Agregação ────────────────────────────────────────────────────────────────

function mean(xs) {
  const v = xs.filter(x => x !== null && x !== undefined && !Number.isNaN(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
}

/** Desvio-padrão amostral (n−1); null com menos de 2 observações. */
function stdDev(xs) {
  const v = xs.filter(x => x !== null && x !== undefined && !Number.isNaN(x));
  if (v.length < 2) return null;
  const m = mean(v);
  return Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1));
}

const METRIC_KEYS = ['E1_atrito', 'E1_kcv', 'E2_vp', 'E2_sloc', 'E3_culminancia', 'atrito_azul'];

/** Resume as réplicas de uma condição: média e desvio por métrica + desfechos. */
function summarize(rows) {
  const resumo = {};
  for (const key of METRIC_KEYS) {
    const xs = rows.map(r => r[key]);
    resumo[key] = { media: mean(xs), desvio: stdDev(xs), n: xs.filter(x => x !== null && x !== undefined).length };
  }
  // E3 é censurada quando a culminância nunca ocorre: registrar quantas.
  resumo.E3_censuradas = rows.filter(r => r.E3_culminancia === null).length;
  resumo.vitorias = {
    blue:      rows.filter(r => r.vencedor === 'blue').length,
    red:       rows.filter(r => r.vencedor === 'red').length,
    censurado: rows.filter(r => r.vencedor === 'censurado').length,
  };
  const grupos = {};
  for (const r of rows) {
    for (const [k, v] of Object.entries(r)) {
      if (!k.startsWith('grp_')) continue;
      (grupos[k] = grupos[k] || []).push(v);
    }
  }
  resumo.grupos = Object.fromEntries(Object.entries(grupos).map(([k, xs]) => [k, mean(xs)]));
  return resumo;
}

/** Condições de um bloco: 'fatorial', 'ablacao', ou um pacote avulso. */
function buildConditions(spec) {
  if (spec.bloco === 'fatorial') return FACTORIAL_CONDITIONS;
  if (spec.bloco === 'ablacao')  return ABLATION_CONDITIONS;

  // Pacote avulso montado na interface — aqui as quantidades são livres.
  const factors = {};
  for (const key of FACTOR_KEYS) factors[key] = quantityOf(spec.factors?.[key]);
  const replicas  = Math.max(1, Math.min(200, Number(spec.replicas) || 20));
  const seedBase  = Number(spec.seedBase) || 7000;
  return [{
    bloco:         'Pacote',
    condicao:      spec.nome || 'Pacote',
    factors,
    n_capacidades: countActive(factors),
    custo_total:   totalCost(factors),
    replicas,
    seeds:         Array.from({ length: replicas }, (_, r) => seedBase + r + 1),
  }];
}

/**
 * Roda um lote completo. `onProgress(feito, total, parcial)` é chamado a cada
 * partida — o servidor usa isso para transmitir progresso, já que um bloco
 * fatorial são 640 partidas.
 */
function runBatch(spec = {}, onProgress = null) {
  const conditions  = buildConditions(spec);
  const maxTurns    = Math.max(1, Math.min(40, Number(spec.maxTurns) || DEFAULT_MAX_TURNS));
  const victoryRule = spec.victoryRule;
  const redGroups   = spec.redGroups;
  const replicasOverride = spec.bloco && Number(spec.replicas) ? Number(spec.replicas) : null;

  const total = conditions.reduce(
    (n, c) => n + (replicasOverride ? Math.min(replicasOverride, c.seeds.length) : c.seeds.length), 0);

  const rows = [];
  const porCondicao = [];
  let feito = 0;

  for (const cond of conditions) {
    const seeds = replicasOverride ? cond.seeds.slice(0, replicasOverride) : cond.seeds;
    const condRows = [];

    seeds.forEach((seed, idx) => {
      const { winner, turns, metrics, groupMetrics } =
        runGame(cond.factors, seed, maxTurns, victoryRule, redGroups);
      const row = {
        condicao:      cond.condicao,
        replica:       idx + 1,
        semente:       seed,
        n_capacidades: cond.n_capacidades,
        custo_total:   cond.custo_total,
        ...metrics,
        vencedor:      winner || 'censurado',
        turnos:        turns,
        regra_vitoria: victoryRule === 'exhaustion' ? 'exhaustion' : 'objectives',
        forca_vermelha: describeRedConfig(redGroups),
        ...groupMetrics,
      };
      for (const key of FACTOR_KEYS) row[key] = cond.factors[key];
      if (cond.capacidade_removida !== undefined) row.capacidade_removida = cond.capacidade_removida || '';
      rows.push(row);
      condRows.push(row);
      feito++;
      if (onProgress) onProgress(feito, total, cond.condicao);
    });

    porCondicao.push({
      condicao:            cond.condicao,
      bloco:               cond.bloco,
      capacidade_removida: cond.capacidade_removida ?? null,
      factors:             cond.factors,
      n_capacidades:       cond.n_capacidades,
      custo_total:         cond.custo_total,
      replicas:            condRows.length,
      resumo:              summarize(condRows),
    });
  }

  return { rows, porCondicao, total, maxTurns,
           victoryRule: victoryRule === 'exhaustion' ? 'exhaustion' : 'objectives',
           forcaVermelha: describeRedConfig(redGroups),
           gruposPresentes: presentGroups(rows) };
}

/** Chaves grp_* presentes no lote, na ordem doutrinária da taxonomia. */
function presentGroups(rows) {
  const present = new Set();
  for (const r of rows) for (const k of Object.keys(r)) if (k.startsWith('grp_')) present.add(k);
  const ordered = [];
  for (const side of ['blue', 'red']) {
    for (const g of groupLabels(side)) {
      const k = `grp_${side}_${g.sigla}`;
      if (present.has(k)) ordered.push({ key: k, side, sigla: g.sigla, label: g.label, domain: g.domain });
    }
  }
  return ordered;
}

// ─── CSV ──────────────────────────────────────────────────────────────────────

function csvValue(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v.toFixed(4);
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** CSV por partida, no formato das planilhas Coleta_Fatorial / Coleta_Ablacao. */
function toCsv(rows) {
  if (!rows.length) return '';
  const base = ['condicao', 'capacidade_removida', 'replica', 'semente',
    ...FACTOR_KEYS, 'n_capacidades', 'custo_total',
    ...METRIC_KEYS, 'vencedor', 'turnos', 'regra_vitoria', 'forca_vermelha'];
  // Colunas de grupo na ordem doutrinária da taxonomia (não na ordem em que
  // aparecem nas linhas), para o CSV sair comparável entre lotes.
  const grupos = presentGroups(rows).map(g => g.key);
  const cols  = [...base.filter(c => rows.some(r => r[c] !== undefined)), ...grupos];
  const lines = [cols.join(',')];
  for (const r of rows) lines.push(cols.map(c => csvValue(r[c])).join(','));
  return lines.join('\n') + '\n';
}

module.exports = {
  useEngine,
  runGame,
  runBatch,
  summarize,
  buildConditions,
  presentGroups,
  toCsv,
  METRIC_KEYS,
  DEFAULT_MAX_TURNS,
};
