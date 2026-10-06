'use strict';
/**
 * test_constructive.js — Testes do simulador construtivo (PBC).
 *
 * Cobre as invariantes que fazem o dataset valer alguma coisa: custos e
 * remoção de unidades por fator, cobertura da taxonomia, semântica das
 * métricas, delineamento experimental, reprodutibilidade por semente e
 * estabilidade do motor ao longo de muitas partidas no mesmo processo.
 *
 * Uso: node scripts/test_constructive.js
 */

const assert = require('assert');
const { ORDER_OF_BATTLE } = require('../shared/order_of_battle');
const CF   = require('../shared/capability_factors');
const TAX  = require('../shared/force_taxonomy');
const M    = require('../shared/metrics');
const COND = require('../shared/conditions');
const SIM  = require('../shared/constructive_sim');
const ENGINE = require('../server');

SIM.useEngine(ENGINE);

let pass = 0;
function ok(cond, msg) {
  assert.ok(cond, msg);
  console.log('✅ ' + msg);
  pass++;
}
function eq(a, b, msg) {
  assert.deepStrictEqual(a, b, `${msg} — esperado ${JSON.stringify(b)}, veio ${JSON.stringify(a)}`);
  console.log('✅ ' + msg);
  pass++;
}

// ─── Fatores de capacidade ───────────────────────────────────────────────────
const TODAS = Object.fromEntries(CF.FACTOR_KEYS.map(k => [k, 1]));
eq(CF.totalCost(TODAS), 248, 'custo com as 5 capacidades = 248 EAC');
eq(CF.countActive(TODAS), 5, 'contagem de capacidades ativas');
eq(CF.totalCost(Object.fromEntries(CF.FACTOR_KEYS.map(k => [k, -1]))), 0, 'custo sem capacidade alguma = 0');

const obBase = ORDER_OF_BATTLE.forces.blue.length;
for (const key of CF.FACTOR_KEYS) {
  const ob = CF.applyCapabilityConfig(ORDER_OF_BATTLE, { ...TODAS, [key]: -1 });
  const n = CF.CAPABILITY_FACTORS[key].unitIds.length;
  eq(ob.forces.blue.length, obBase - n, `desligar ${key} retira ${n} unidade(s) da OB azul`);
  ok(CF.CAPABILITY_FACTORS[key].unitIds.every(id => !ob.forces.blue.some(u => u.id === id)),
    `  unidades de ${key} ausentes da OB resultante`);
}
ok(CF.applyCapabilityConfig(ORDER_OF_BATTLE, TODAS).forces.red.length === ORDER_OF_BATTLE.forces.red.length,
  'a força Vermelha nunca é alterada pelos fatores');
const antesOB = JSON.stringify(ORDER_OF_BATTLE);
CF.applyCapabilityConfig(ORDER_OF_BATTLE, { ...TODAS, A_SSN: -1 });
eq(JSON.stringify(ORDER_OF_BATTLE), antesOB, 'applyCapabilityConfig não muta a OB original');

// ─── Taxonomia ───────────────────────────────────────────────────────────────
const todosIds = [...ORDER_OF_BATTLE.forces.blue, ...ORDER_OF_BATTLE.forces.red].map(u => u.id);
ok(todosIds.every(id => !!TAX.classifyUnit(id, id.startsWith('BLUE') ? 'blue' : 'red').sigla),
  'toda unidade da OB classifica em algum grupo de capacidade');
eq(TAX.classifyUnit('BLUE-FPSO1', 'blue').sigla, 'INFRA', 'ativo protegido cai em INFRA (fallback)');
eq(TAX.classifyUnit('BLUE-SAG-P', 'blue').sigla, 'INTERV', 'decisão de cenário preservada: SAG-P em INTERV');
eq(TAX.classifyUnit('RED-GE-1', 'red').sigla, 'INTERV', 'decisão de cenário preservada: ESCCSG em INTERV');

// ─── Métricas ────────────────────────────────────────────────────────────────
const st = ENGINE.newGame(undefined, { seed: 1 });
eq(M.attrition(st, 'red'), 0, 'atrito inicial é zero');
eq(M.redForceCombatIneffective(st), 0, 'no início o Vermelho é combativo');
ok(M.offensiveStock(st, 'red') > 0, 'estoque ofensivo Vermelho inicial > 0');
ok(M.slocSecurityIndex(st) === 1, 'índice SLOC inicial = 1 (portos intactos)');

const alvo = st.units.find(u => u.id === 'RED-GE-3');
alvo.hp -= 3;
eq(M.attrition(st, 'red'), 3, 'atrito acompanha a perda de SP');

// hasOffensiveMeans: interceptador puro não conta como meio ofensivo
ok(!M.hasOffensiveMeans({ weapons: {}, capabilities: { airDefense: 6, bmd: 2 } }),
  'bateria só de interceptação não conta como meio ofensivo');
ok(M.hasOffensiveMeans({ weapons: {}, capabilities: { asw: 2 } }), 'capacidade ASW conta como ofensiva');
ok(M.hasOffensiveMeans({ weapons: { mss: { quantity: 1 } }, capabilities: {} }), 'arma com estoque conta');
ok(!M.hasOffensiveMeans({ weapons: { mss: { quantity: 0 } }, capabilities: {} }), 'arma esgotada não conta');

// Pesos ofensivos derivados das tabelas d6 deste projeto
ok(M.weaponOffensiveWeight('airDefense') === 0, 'interceptador tem peso ofensivo zero');
ok(M.weaponOffensiveWeight('ascm') > M.weaponOffensiveWeight('navalGun'),
  'ASCM pesa mais que canhão no estoque ofensivo');

// Vermelho sem meios ofensivos → kcv = 1
const st2 = ENGINE.newGame(undefined, { seed: 2 });
for (const u of st2.units.filter(x => x.team === 'red')) {
  for (const w of Object.values(u.weapons || {})) w.quantity = 0;
  u.capabilities = { airDefense: 4 };
}
eq(M.redForceCombatIneffective(st2), 1, 'Vermelho sem armas nem capacidade ofensiva → E1_kcv = 1');

// Grupos: chaves só para grupos presentes
const g = M.groupLossMetrics(st);
ok(Object.keys(g).every(k => /^grp_(blue|red)_[A-Z]+$/.test(k)), 'chaves de grupo no formato grp_<lado>_<SIGLA>');
ok(Object.values(g).every(v => v >= 0 && v <= 100), 'perda por grupo fica em [0,100]%');
const semSub = ENGINE.newGame(CF.applyCapabilityConfig(ORDER_OF_BATTLE, { ...TODAS, A_SSN: -1, B_SSK: -1 }), { seed: 3 });
ok(!('grp_blue_DISS' in M.groupLossMetrics(semSub)), 'grupo ausente da força não gera chave');

// ─── Delineamento ────────────────────────────────────────────────────────────
eq(COND.FACTORIAL_CONDITIONS.length, 32, 'fatorial 2^5 tem 32 condições');
eq(COND.ABLATION_CONDITIONS.length, 6, 'ablação tem C0 + 5 condições');
eq(COND.ABLATION_CONDITIONS[0].custo_total, 248, 'C0 custa 248 (linha de base)');
ok(COND.ABLATION_CONDITIONS.slice(1).every(c => c.n_capacidades === 4),
  'cada condição de ablação retira exatamente uma capacidade');
const assinaturas = new Set(COND.FACTORIAL_CONDITIONS.map(c => JSON.stringify(c.factors)));
eq(assinaturas.size, 32, 'as 32 condições do fatorial são todas distintas');
ok(COND.FACTORIAL_CONDITIONS.every(c => c.seeds.length === 20), 'fatorial: 20 réplicas por condição');

// ─── Reprodutibilidade ───────────────────────────────────────────────────────
const r1 = SIM.runGame(TODAS, 4242, 8);
const r2 = SIM.runGame(TODAS, 4242, 8);
const r3 = SIM.runGame(TODAS, 9999, 8);
eq(JSON.stringify(r1), JSON.stringify(r2), 'mesma semente → partida idêntica');
ok(JSON.stringify(r1) !== JSON.stringify(r3), 'sementes distintas → partidas distintas');

// O motor não pode acumular estado entre partidas no mesmo processo: se a OB
// global fosse corrompida, esta repetição divergiria da primeira execução.
const obAntes = JSON.stringify(ORDER_OF_BATTLE);
for (let i = 0; i < 25; i++) SIM.runGame(TODAS, 5000 + i, 6);
eq(JSON.stringify(ORDER_OF_BATTLE), obAntes, 'ORDER_OF_BATTLE intacta após 25 partidas');
eq(JSON.stringify(SIM.runGame(TODAS, 4242, 8)), JSON.stringify(r1),
  'partida com a mesma semente continua idêntica após 25 outras no mesmo processo');

// ─── Lote ────────────────────────────────────────────────────────────────────
const lote = SIM.runBatch({ bloco: 'ablacao', replicas: 3, maxTurns: 8 });
eq(lote.rows.length, 18, 'lote de ablação: 6 condições × 3 réplicas = 18 partidas');
eq(lote.porCondicao.length, 6, 'resumo por condição cobre as 6 condições');
ok(lote.porCondicao.every(c => c.resumo.E1_atrito.media !== null), 'todas as condições têm média de E1');
ok(lote.rows.every(r => ['blue', 'red', 'censurado'].includes(r.vencedor)), 'desfecho sempre classificado');
ok(lote.gruposPresentes.length > 0 && lote.gruposPresentes[0].sigla, 'grupos presentes vêm rotulados');

const ordem = lote.gruposPresentes.filter(g => g.side === 'blue').map(g => g.sigla);
const ordemTax = TAX.groupLabels('blue').map(g => g.sigla).filter(s => ordem.includes(s));
eq(ordem, ordemTax, 'grupos saem na ordem doutrinária da taxonomia');

const csv = SIM.toCsv(lote.rows);
const linhas = csv.trim().split('\n');
eq(linhas.length, 19, 'CSV tem cabeçalho + uma linha por partida');
ok(linhas[0].includes('E1_atrito') && linhas[0].includes('custo_total') && linhas[0].includes('grp_blue_'),
  'CSV traz métricas, custo e colunas de grupo');

// Um pacote avulso respeita a seleção enviada
const avulso = SIM.runBatch({ factors: { A_SSN: -1, B_SSK: -1, C_Azuis: -1, D_MSS: -1, E_Terra: -1 }, replicas: 2, maxTurns: 6 });
eq(avulso.porCondicao[0].custo_total, 0, 'pacote vazio custa 0');
eq(avulso.porCondicao[0].n_capacidades, 0, 'pacote vazio tem 0 capacidades');

console.log(`\nALL PASS (${pass} asserts)`);
