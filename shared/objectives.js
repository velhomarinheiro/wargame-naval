'use strict';

/**
 * objectives.js — Alvos e limiares das condições de vitória da OB padrão.
 * =======================================================================
 *
 * Moram aqui, e não em server.js, porque o módulo de cenário (shared/scenario.js)
 * precisa deles para anotar a ordem de batalha padrão — e nada em shared/ pode
 * requerer server.js. server.js continua exportando os dois, com os mesmos nomes.
 *
 * São o *fallback*: uma OB carregada de planilha traz a própria classificação
 * (coluna `objetivo` de cada unidade e aba Cenário), e o motor a lê de
 * `state.cenario`. Sem OB anotada, valem estes valores — exatamente como antes.
 */

// IDs das condições de vitória — compartilhados com o bot (botObjectiveWeights)
// para que a IA persiga exatamente o que pontua.
const OBJECTIVE_IDS = {
  blueTargets: {
    carrier:   'RED-GBPA',
    logistics: ['RED-AOR-G', 'RED-GLOG', 'RED-AKE'],
    amphib:    'RED-GANF',
    nucsub:    'RED-KSN',
    surface:   ['RED-GBPA', 'RED-GE-1', 'RED-GE-2', 'RED-GE-3', 'RED-GANF'],
  },
  redTargets: {
    fpsos: ['BLUE-FPSO1', 'BLUE-FPSO2', 'BLUE-FPSO3', 'BLUE-FPSO4'],
    ports: ['BLUE-PORTO-S', 'BLUE-PORTO-RJ', 'BLUE-PORTO-V', 'BLUE-PORTO-ACU'],
  },
};

// Limiares — os rótulos exibidos são derivados destes números para que UI e
// regra nunca divirjam.
const OBJECTIVE_THRESHOLDS = {
  blueLogisticsKills: 2,   // de 3 navios logísticos vermelhos
  blueSurfaceDegPct:  50,  // % do SP agregado dos combatentes de superfície
  redFpsoKills:       3,   // de 4 plataformas FPSO
  redPortDegPct:      40,  // % do SP agregado dos 4 portos
};

// Quem pode ser marcado com cada categoria de objetivo: as vermelhas são alvo do
// Azul, as azuis são alvo do Vermelho.
const OBJECTIVE_SIDE = {
  carrier: 'red', logistics: 'red', amphib: 'red', nucsub: 'red', surface: 'red',
  fpsos: 'blue', ports: 'blue',
};

// Rótulos em português, para a planilha e para as mensagens de validação.
const OBJECTIVE_LABELS = {
  carrier:   'porta-aviões',
  logistics: 'logístico',
  amphib:    'anfíbio',
  nucsub:    'submarino nuclear',
  surface:   'combatente de superfície',
  fpsos:     'FPSO',
  ports:     'porto',
};

module.exports = { OBJECTIVE_IDS, OBJECTIVE_THRESHOLDS, OBJECTIVE_SIDE, OBJECTIVE_LABELS };
