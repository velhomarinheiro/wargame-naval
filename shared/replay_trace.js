'use strict';

/**
 * replay_trace.js — Gravação passo a passo de uma partida construtiva.
 * ====================================================================
 *
 * O simulador construtivo (shared/constructive_sim.js) joga partidas inteiras
 * e devolve só agregados. Este módulo grava o caminho: cada ordem de movimento
 * com sua rota, cada alvo escolhido, a arma e a salva empregadas, as rolagens
 * de dado e o dano resultante — o bastante para reconstruir a partida na tela.
 *
 * TRÊS DECISÕES QUE MOLDAM O FORMATO
 *
 * 1. Catálogo + quadro inicial + deltas. Um estado completo são ~11 KB; uma
 *    partida de 12 turnos tem ~300 passos, o que daria 3,5 MB. Então o que não
 *    muda sai uma vez (`catalogo`), o estado inicial sai uma vez
 *    (`quadroInicial`), e cada passo carrega só as unidades que mudaram.
 *    Resultado na casa das centenas de KB.
 *
 * 2. Cópia no momento do passo, nunca referência. `state` é mutado no lugar, e
 *    `resolveBattleRound` muta os PRÓPRIOS objetos de `state.combatQueue`
 *    (empilha em `results`, muda `status`). Guardar a referência da fila e
 *    serializar no fim mostraria a fila já resolvida — justamente o passo cujo
 *    sentido é mostrar o que foi decidido ANTES de rolar os dados.
 *
 * 3. Nada de narração aqui. O traço carrega dados; a prosa é montada na tela
 *    (public/js/replay.js). Assim a redação pode mudar sem mexer no servidor,
 *    e a resposta não carrega texto duplicado.
 *
 * O vocabulário de eventos espelha o de game_logger.js — `game_start`,
 * `movement_committed`, `attacks_declared`, `engagement_resolved`, `game_over`
 * — para que um leitor de data/game-logs possa um dia alimentar a mesma tela.
 * Os três passos a mais (`phase_start`, `combat_queue_built`, `phase_resolved`)
 * não têm análogo lá porque no jogo interativo essas escolhas são do humano.
 */

const { staticUnit, frameUnit, diffUnit } = require('./state_snapshot');

const STEP_KINDS = [
  'game_start',          // abertura: catálogo e quadro inicial no envelope
  'phase_start',         // virada de período: recompletamento, combustível, moved=false
  'movement_committed',  // uma equipe moveu — rota completa de cada unidade
  'attacks_declared',    // uma equipe escolheu alvos (ainda sem arma)
  'combat_queue_built',  // arma, salva e ordem de resolução ficam decididas
  'engagement_resolved', // rolagens, interceptação, dano
  'phase_resolved',      // objetivos ao fim da fase
  'game_over',           // desfecho
];

/** Coletor desligado: o caminho do lote passa por aqui 200 mil vezes. */
const NO_TRACE = Object.freeze({ step() {} });

/**
 * @param {object} opts
 *   maxSteps — teto de passos (partida de 40 turnos sob exaustão é o pior caso)
 *   maxBytes — teto de bytes do traço serializado
 */
function createCollector(opts = {}) {
  const maxSteps = opts.maxSteps ?? 5000;
  const maxBytes = opts.maxBytes ?? 4e6;

  let engine   = null;
  let catalogo = null;
  let quadroInicial = null;
  let anterior = null;          // Map(id → frameUnit) do passo anterior
  const passos = [];
  let bytes = 0;
  let truncado = false;

  function delta(atual) {
    if (!anterior) return [];
    const out = [];
    for (const [id, depois] of atual) {
      const antes = anterior.get(id);
      // Id desconhecido = unidade criada em partida. Não acontece no laço
      // construtivo (as mortas ficam com hp 0), mas o modo com facilitador cria
      // neutros — tratar como inserção custa três linhas e evita um bug obscuro.
      if (!antes) { out.push({ id, ...depois }); continue; }
      const d = diffUnit(antes, depois);
      if (d) out.push({ id, ...d });
    }
    return out;
  }

  return {
    /** Chamado uma vez por partida, antes do primeiro passo. */
    bindEngine(e) { engine = e; },

    step(kind, payload, state) {
      if (truncado) return;

      const atual = new Map(state.units.map(u => [u.id, frameUnit(u)]));
      if (!anterior) {
        catalogo      = state.units.map(staticUnit);
        quadroInicial = [...atual].map(([id, f]) => ({ id, ...f }));
      }

      const passo = {
        kind,
        turn:   state.turn,
        period: state.period,
        phase:  state.phase,
        ...clonePayload(kind, payload, state, engine),
        delta:  delta(atual),
      };

      bytes += JSON.stringify(passo).length;
      if (passos.length >= maxSteps || bytes > maxBytes) {
        truncado = true;
        return;
      }
      passos.push(passo);
      anterior = atual;
    },

    result() {
      return { catalogo: catalogo || [], quadroInicial: quadroInicial || [], passos, truncado };
    },
  };
}

// ─── Cópia do payload, por tipo de passo ──────────────────────────────────────
// Explícita de propósito, e não um JSON.parse(JSON.stringify()) genérico: um
// clone cego arrastaria campos irrelevantes e engoliria state.rng em silêncio.

function clonePayload(kind, p, state, engine) {
  switch (kind) {
    case 'movement_committed':
      return {
        team:  p.team,
        moves: (p.moves || []).map(m => ({
          unitId: m.unitId,
          path:   (m.path || []).map(h => ({ col: h.col, row: h.row })),
        })),
      };

    case 'attacks_declared':
      // `amount` é sempre nulo aqui: computeBotAttacks escolhe o alvo, não a
      // arma — isso só acontece em buildCombatQueue, no passo seguinte.
      return {
        team:    p.team,
        attacks: (p.attacks || []).map(a => ({ attackerId: a.attackerId, targetId: a.targetId })),
      };

    case 'combat_queue_built':
      return { queue: (p.queue || []).map(cloneEngagement) };

    case 'engagement_resolved':
      return { engagement: cloneEngagement(p.engagement, true) };

    case 'phase_resolved':
      return {
        winner:          p.winner || null,
        culminationTurn: p.culminationTurn ?? null,
        objetivos:       engine ? resumoObjetivos(engine.computeObjectives(state)) : null,
      };

    case 'game_over':
      return {
        winner:         p.winner || null,
        reason:         p.reason,
        turns:          p.turns,
        lastPlayedTurn: p.lastPlayedTurn ?? null,
        metrics:        p.metrics      ? { ...p.metrics }      : null,
        groupMetrics:   p.groupMetrics ? { ...p.groupMetrics } : null,
        objetivos:      engine ? resumoObjetivos(engine.computeObjectives(state)) : null,
      };

    default:
      return {};
  }
}

/**
 * `comResultados` separa os dois usos do mesmo objeto: na fila ele ainda não
 * foi resolvido (e tem de ser gravado assim), no passo de resolução ele traz
 * as rolagens. Sem essa distinção a fila apareceria já resolvida, porque é o
 * mesmo objeto mutado no lugar.
 */
function cloneEngagement(e, comResultados = false) {
  const out = {
    id:              e.id,
    attackerId:      e.attackerId,
    targetId:        e.targetId,
    weaponType:      e.weaponType,
    amount:          e.amount,
    maxBattleRounds: e.maxBattleRounds,
    status:          e.status,
    targetCol:       e.targetCol,
    targetRow:       e.targetRow,
    targetTeam:      e.targetTeam,
    targetCategory:  e.targetCategory,
    results:         [],
  };
  if (comResultados) {
    out.results = (e.results || []).map(r => ({
      battleRound:         r.battleRound,
      initiativeBonusTeam: r.initiativeBonusTeam ?? null,
      result:              r.result ? JSON.parse(JSON.stringify(r.result)) : null,
    }));
  }
  return out;
}

/** Só o que varia: os rótulos das condições vão uma vez, no envelope. */
function resumoObjetivos(obj) {
  const lado = o => ({
    achieved: o.achieved,
    needed:   o.needed,
    won:      o.won,
    conds:    o.conditions.map(c => ({ id: c.id, met: c.met, progress: c.progress, current: c.current })),
  });
  return { blue: lado(obj.blue), red: lado(obj.red) };
}

/** Rótulos fixos das condições — vão uma vez por partida, no envelope. */
function rotulosObjetivos(obj) {
  const lado = o => o.conditions.map(c => ({ id: c.id, label: c.label }));
  return { blue: lado(obj.blue), red: lado(obj.red), needed: { blue: obj.blue.needed, red: obj.red.needed } };
}

/**
 * Dobra os deltas de volta em quadros completos — um por passo.
 * É o inverso exato do que o coletor faz, e a tela (public/js/replay.js)
 * reimplementa esta mesma lógica em ~20 linhas; o teste daqui é o que garante
 * que a versão de referência está correta.
 */
function materialize(trace) {
  const atual = new Map(trace.quadroInicial.map(u => {
    const { id, ...resto } = u;
    return [id, resto];
  }));
  const quadros = [];
  for (const passo of trace.passos) {
    for (const d of passo.delta) {
      const { id, ...campos } = d;
      atual.set(id, { ...(atual.get(id) || {}), ...campos });
    }
    quadros.push(new Map([...atual].map(([id, u]) => [id, { ...u }])));
  }
  return quadros;
}

module.exports = {
  STEP_KINDS,
  NO_TRACE,
  createCollector,
  materialize,
  rotulosObjetivos,
};
