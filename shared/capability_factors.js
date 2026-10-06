'use strict';

/**
 * capability_factors.js
 * ======================
 *
 * Composição de força para o estudo de Planejamento Baseado em Capacidades.
 *
 * FORÇA AZUL — os 5 fatores de capacidade do estudo (delineamento de ablação +
 * fatorial 2^5), conforme "Projeto de Pesquisa com Simulação Construtiva v3.0"
 * (Tabela 1). Cada fator mapeia um conjunto de unidades da ordem de batalha.
 * Custos normalizados em EAC: A_SSN=100, B_SSK=31, C_Azuis=78, D_MSS=27,
 * E_Terra=12 (soma 248, a linha de base C0 da matriz de ablação).
 *
 * FORÇA VERMELHA — os grupos-tarefa da taxonomia (Camada 2, componentes de
 * força de Coutau-Bégarié; ver force_taxonomy.json). O Vermelho é a ameaça do
 * cenário, não o que está sendo adquirido: por isso varia em composição, mas
 * não tem custo EAC.
 *
 * QUANTIDADE — cada fator/grupo tem uma quantidade inteira:
 *   0  retira as unidades da partida;
 *   1  é a ordem de batalha original (padrão);
 *   N>1 acrescenta N−1 cópias de cada unidade do conjunto.
 * Valores legados (+1/-1, true/false) continuam válidos e significam 1 e 0 —
 * é o que mantém `conditions.js` (fatorial/ablação) funcionando sem mudança.
 *
 * Uma cópia recebe ID próprio (`BLUE-SUB-N~2`) e leva junto o que viaja nela:
 * aeronaves embarcadas e forças especiais hospedadas são duplicadas e
 * repontadas para a cópia, para não se criar um porta-aviões sem ala aérea.
 */

const { TAXONOMY } = require('./force_taxonomy');

const CAPABILITY_FACTORS = {
  A_SSN: {
    label: 'A_SSN — Dissuasão/Negação por Submarino Nuclear',
    cost: 100,
    unitIds: ['BLUE-SUB-N'],
  },
  B_SSK: {
    label: 'B_SSK — Negação por Submarinos Convencionais',
    cost: 31,
    unitIds: ['BLUE-SUB-1', 'BLUE-SUB-2', 'BLUE-SUB-3'],
  },
  C_Azuis: {
    label: 'C_Azuis — Controle de Águas Azuis (Grupos de Tarefa de Superfície)',
    cost: 78,
    unitIds: ['BLUE-SAG-S1', 'BLUE-SAG-S2'],
  },
  D_MSS: {
    label: 'D_MSS — Patrulha Armada com Mísseis de Superfície',
    cost: 27,
    unitIds: ['BLUE-PAT-O1', 'BLUE-PAT-O2', 'BLUE-PAT-C1', 'BLUE-PAT-C2'],
  },
  E_Terra: {
    label: 'E_Terra — Negação Terrestre (Defesa Costeira)',
    cost: 12,
    unitIds: ['BLUE-DCOST1', 'BLUE-DCOST2'],
  },
};

const FACTOR_KEYS = Object.keys(CAPABILITY_FACTORS);

/** Grupos-tarefa ajustáveis da Força Vermelha, derivados da taxonomia. */
const RED_GROUPS = (() => {
  const out = {};
  for (const dom of TAXONOMY.red || []) {
    for (const grp of dom.groups) {
      if (!grp.units?.length) continue;
      out[grp.sigla] = { label: grp.label, domain: dom.domain, unitIds: [...grp.units] };
    }
  }
  return out;
})();
const RED_GROUP_KEYS = Object.keys(RED_GROUPS);

// E2_vp: pontos de valor de infraestrutura crítica (plataformas offshore).
const FPSO_UNIT_IDS = ['BLUE-FPSO1', 'BLUE-FPSO2', 'BLUE-FPSO3', 'BLUE-FPSO4'];

// E2_sloc: nós logísticos/portuários cuja sobrevivência indica segurança
// das linhas de comunicação marítimas (SLOC).
const PORT_UNIT_IDS = ['BLUE-PORTO-S', 'BLUE-PORTO-RJ', 'BLUE-PORTO-V', 'BLUE-PORTO-ACU'];

// Teto de cópias por fator/grupo: segura tanto o absurdo de cenário quanto o
// custo de um lote (cada cópia é mais uma unidade em cada uma das N partidas).
const MAX_QUANTITY = 4;

// Separador do sufixo de cópia. Escolhido por não ocorrer em nenhum ID da OB.
const COPY_SEP = '~';

/** ID original de uma unidade, descartando o sufixo de cópia. */
function baseUnitId(unitId) {
  const i = String(unitId).indexOf(COPY_SEP);
  return i === -1 ? String(unitId) : String(unitId).slice(0, i);
}

/** Quantidade de um fator/grupo. Aceita a forma legada (+1/-1, true/false). */
function quantityOf(value) {
  if (value === undefined || value === null) return 1;
  if (value === true || value === '+1') return 1;
  if (value === false) return 0;
  const n = Number(value);
  if (Number.isNaN(n)) return 1;
  if (n < 0) return 0;                       // -1 legado = capacidade ausente
  return Math.max(0, Math.min(MAX_QUANTITY, Math.round(n)));
}

/** factors[key] presente (quantidade >= 1)? */
function isActive(value) {
  return quantityOf(value) >= 1;
}

/**
 * Custo EAC do pacote: cada cópia custa o mesmo que a original.
 * `costs` (opcional) traz os custos de uma OB carregada de planilha, onde o
 * usuário pode tê-los editado na aba Cenário; ausente, valem os do estudo.
 */
function totalCost(factors, costs = null) {
  return FACTOR_KEYS.reduce((sum, key) =>
    sum + quantityOf(factors?.[key]) * (costs?.[key] ?? CAPABILITY_FACTORS[key].cost), 0);
}

/**
 * Ids que pertencem a um pacote (Azul) ou grupo-tarefa (Vermelho).
 *
 * Numa OB anotada (carregada de planilha, `ob.anotada`), a pertença é a coluna
 * `pacote`/`grupo` de cada unidade — é o que faz uma fragata nova classificada
 * em C_Azuis sair junto com C_Azuis=0 e ser duplicada com C_Azuis=2. Sem
 * anotação, valem as listas fixas acima, exatamente como antes.
 */
function factorUnitIds(ob, key) {
  if (!ob?.anotada) return CAPABILITY_FACTORS[key].unitIds;
  return ob.forces.blue.filter(s => s.pacote === key).map(s => s.id);
}
function redGroupUnitIds(ob, sigla) {
  if (!ob?.anotada) return RED_GROUPS[sigla]?.unitIds || [];
  return ob.forces.red.filter(s => s.grupo === sigla).map(s => s.id);
}

/** Quantos dos 5 fatores estão presentes (quantidade >= 1). */
function countActive(factors) {
  return FACTOR_KEYS.reduce((n, key) => n + (isActive(factors?.[key]) ? 1 : 0), 0);
}

/**
 * Cópia de um spec com ID e nome próprios. `n` é o número da cópia (2, 3, …).
 *
 * `usados` é o conjunto de ids já presentes na força. Sem ele, um dependente
 * podia ser copiado duas vezes com o mesmo id: INTERV×2 copia as aeronaves
 * embarcadas no porta-aviões (RED-KMF-1~2) e DAE×2 copia as mesmas aeronaves
 * de novo — dois RED-KMF-1~2 na partida, quebrando tudo o que indexa por id.
 * Com ele, a segunda cópia recebe o próximo sufixo livre. Quando não há
 * colisão, o sufixo é exatamente o de antes.
 */
function copySpec(spec, n, usados = null) {
  const copy = JSON.parse(JSON.stringify(spec));
  let k = n;
  while (usados && usados.has(`${spec.id}${COPY_SEP}${k}`)) k++;
  copy.id   = `${spec.id}${COPY_SEP}${k}`;
  copy.name = `${spec.name} (${k})`;
  if (usados) usados.add(copy.id);
  return copy;
}

/**
 * Expande um conjunto de unidades para a quantidade pedida, dentro de `specs`
 * (array da força). Devolve o array resultante.
 *
 * - quantidade 0 → remove as unidades do conjunto E o que viajava nelas;
 * - quantidade 1 → inalterado;
 * - quantidade N → acrescenta N−1 cópias de cada unidade, levando junto
 *   aeronaves embarcadas (`embarked`) e hóspedes (`hostId`) repontados.
 */
function expandSet(specs, unitIds, qty) {
  const alvo = new Set(unitIds);
  if (qty === 1) return specs;

  if (qty === 0) {
    // Sai a unidade e sai quem só existe a bordo dela.
    const fora = new Set(unitIds);
    for (const s of specs) {
      if ((s.embarked && fora.has(s.embarked)) || (s.hostId && fora.has(s.hostId))) fora.add(s.id);
    }
    return specs.filter(s => !fora.has(s.id));
  }

  const out = [...specs];
  const usados = new Set(specs.map(s => s.id));
  for (const spec of specs) {
    if (!alvo.has(spec.id)) continue;
    const dependentes = specs.filter(s => s.embarked === spec.id || s.hostId === spec.id);
    for (let n = 2; n <= qty; n++) {
      const copia = copySpec(spec, n, usados);
      out.push(copia);
      for (const dep of dependentes) {
        const depCopia = copySpec(dep, n, usados);
        if (depCopia.embarked) depCopia.embarked = copia.id;
        if (depCopia.hostId)   depCopia.hostId   = copia.id;
        out.push(depCopia);
      }
    }
  }
  return out;
}

/**
 * Ordem de batalha com a composição pedida aplicada aos dois lados.
 *
 * @param {object} baseOB    ORDER_OF_BATTLE
 * @param {object} config    { factors, redGroups } — quantidades por fator
 *                           (Azul) e por grupo-tarefa (Vermelho)
 * @returns {object} OB clonada; a original nunca é tocada
 */
function applyForceConfig(baseOB, config = {}) {
  const ob = JSON.parse(JSON.stringify(baseOB));
  const { factors = {}, redGroups = {} } = config;

  // A pertença é lida da OB de ENTRADA, antes de qualquer expansão: cópias e
  // dependentes acrescentados por um pacote nunca devem mudar quem pertence ao
  // pacote seguinte.
  for (const key of FACTOR_KEYS) {
    ob.forces.blue = expandSet(ob.forces.blue, factorUnitIds(baseOB, key), quantityOf(factors[key]));
  }
  for (const sigla of RED_GROUP_KEYS) {
    // Sem chave informada, o grupo fica como está (quantidade 1).
    if (!(sigla in redGroups)) continue;
    ob.forces.red = expandSet(ob.forces.red, redGroupUnitIds(baseOB, sigla), quantityOf(redGroups[sigla]));
  }
  return ob;
}

/** Forma histórica: só os fatores azuis. Mantida para conditions.js e testes. */
function applyCapabilityConfig(baseOB, factors) {
  return applyForceConfig(baseOB, { factors });
}

/** Resumo textual da composição Vermelha, para log e dataset. */
function describeRedConfig(redGroups = {}) {
  const partes = RED_GROUP_KEYS
    .filter(s => s in redGroups && quantityOf(redGroups[s]) !== 1)
    .map(s => `${s}×${quantityOf(redGroups[s])}`);
  return partes.length ? partes.join(' ') : 'padrão';
}

module.exports = {
  CAPABILITY_FACTORS,
  FACTOR_KEYS,
  RED_GROUPS,
  RED_GROUP_KEYS,
  FPSO_UNIT_IDS,
  PORT_UNIT_IDS,
  MAX_QUANTITY,
  COPY_SEP,
  baseUnitId,
  quantityOf,
  isActive,
  totalCost,
  countActive,
  expandSet,
  factorUnitIds,
  redGroupUnitIds,
  applyForceConfig,
  applyCapabilityConfig,
  describeRedConfig,
};
