'use strict';

/**
 * replay.js — Visualizador de uma partida do simulador construtivo.
 * =================================================================
 *
 * Recebe o traço da partida (GET /api/construtivo/replay), dobra os deltas em
 * quadros completos e deixa o usuário percorrer a partida passo a passo.
 *
 * Tudo dentro de uma IIFE de propósito: hex.js, terrain.js e units.js são
 * scripts clássicos que declaram dezenas de `const` no escopo global
 * (HEX_R, GRID_W, INFRA, TERRAIN_MAP…). Redeclarar qualquer um deles aqui é
 * SyntaxError de redeclaração — e mata a página inteira, não só esta função.
 */
(function () {

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g,
  c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const hexNome = (col, row) => `${hexLabel(col)}${row + 1}`;
const PERIODO = { day: 'Diurno', night: 'Noturno' };
const EQUIPE  = { blue: 'Força Azul', red: 'Força Vermelha' };

let T = null;            // traço vindo da API
let CAT = new Map();     // id → unidade do catálogo (o que não muda)
let QUADROS = [];        // um quadro por passo: Map(id → campos mutáveis)
let i = 0;               // passo atual
let tocando = false;
let timer = null;
let fatorVel = 1;

// Quanto tempo cada tipo de passo fica na tela a 1×. Não é uniforme porque os
// tipos carregam quantidades muito diferentes de informação: um engajamento
// pede leitura, uma declaração de ataque é um piscar.
const DWELL = {
  game_start: 900, phase_start: 600, movement_committed: 900, attacks_declared: 500,
  combat_queue_built: 1000, engagement_resolved: 1200, phase_resolved: 1400, game_over: 3000,
};

// ─── Carga ───────────────────────────────────────────────────────────────────

async function carregar() {
  try {
    const res = await fetch('/api/construtivo/replay' + location.search);
    const dados = await res.json();
    if (!res.ok) throw new Error(dados.error || 'Falha ao reproduzir a partida.');
    T = dados;
  } catch (err) {
    $('rp-carregando').classList.add('hidden');
    $('rp-erro').textContent = '⚠ ' + err.message;
    $('rp-erro').classList.remove('hidden');
    return;
  }

  CAT = new Map(T.catalogo.map(u => [u.id, u]));
  QUADROS = materializar(T.quadroInicial, T.passos);

  $('rp-carregando').classList.add('hidden');
  $('rp-app').classList.remove('hidden');
  $('rp-rotulo').textContent = T.partida.rotulo
    || `semente ${T.partida.seed} · ${T.partida.custoTotal} EAC`;
  $('rp-doutrina').textContent = T.partida.doutrinaBot;
  $('rp-params').innerHTML = paramsHtml();

  if (!T.conferencia.ok) mostrarDivergencia();
  if (T.truncado) avisarTruncado();

  $('rp-scrub').max = String(QUADROS.length - 1);
  // Em tela estreita o mapa inteiro deixa cada contador com ~14px: seguir a
  // ação passa a ser o padrão. Em tela larga o mapa inteiro é legível, e o
  // deslocamento automático só desorienta.
  $('rp-seguir').checked = window.innerWidth < 1000;

  rpInit($('rp-canvas'));
  initIcons(() => { TINT_CACHE.clear(); desenhar(); });
  ligarControles();
  irPara(0);
}

/** Dobra os deltas em quadros completos — um por passo. */
function materializar(quadroInicial, passos) {
  const atual = new Map(quadroInicial.map(u => {
    const { id, ...resto } = u;
    return [id, resto];
  }));
  const quadros = [];
  for (const passo of passos) {
    for (const d of passo.delta) {
      const { id, ...campos } = d;
      atual.set(id, { ...(atual.get(id) || {}), ...campos });
    }
    quadros.push(new Map([...atual].map(([id, u]) => [id, { ...u }])));
  }
  return quadros;
}

/** Unidade completa num passo: o que ela é (catálogo) + como está (quadro). */
function un(idx, id) {
  const base = CAT.get(id);
  const q = QUADROS[idx]?.get(id);
  return base && q ? { ...base, ...q } : null;
}
const nome = id => CAT.get(id)?.name || id;
const time = id => CAT.get(id)?.team || 'blue';

// ─── Navegação ───────────────────────────────────────────────────────────────

function irPara(n) {
  i = Math.max(0, Math.min(QUADROS.length - 1, n));
  $('rp-scrub').value = String(i);
  desenhar();
  pintarPainel();
  atualizarBotoes();
}

const proximo  = () => irPara(i + 1);
const anterior = () => irPara(i - 1);

function tocar() {
  tocando = true;
  $('rp-play').textContent = '⏸';
  $('rp-play').setAttribute('aria-label', 'Pausar');
  agendar();
}
function pausar() {
  tocando = false;
  clearTimeout(timer);
  $('rp-play').textContent = '▶';
  $('rp-play').setAttribute('aria-label', 'Reproduzir');
}
function agendar() {
  clearTimeout(timer);
  if (!tocando) return;
  if (i >= QUADROS.length - 1) { pausar(); return; }
  const ms = (DWELL[T.passos[i].kind] || 800) * fatorVel;
  timer = setTimeout(() => { proximo(); agendar(); }, ms);
}

function atualizarBotoes() {
  $('rp-inicio').disabled = i === 0;
  $('rp-ant').disabled    = i === 0;
  $('rp-prox').disabled   = i >= QUADROS.length - 1;
  $('rp-fim').disabled    = i >= QUADROS.length - 1;
  const p = T.passos[i];
  $('rp-pos').textContent =
    `passo ${i + 1} de ${QUADROS.length} · Turno ${p.turn} · ${PERIODO[p.period] || p.period} · ${rotuloTipo(p)}`;
}

function rotuloTipo(p) {
  switch (p.kind) {
    case 'game_start':         return 'início';
    case 'phase_start':        return 'abertura da fase';
    case 'movement_committed': return `movimento ${EQUIPE[p.team]}`;
    case 'attacks_declared':   return `alvos ${EQUIPE[p.team]}`;
    case 'combat_queue_built': return 'fila de combate';
    case 'engagement_resolved':return `engajamento ${p.engagement.id}`;
    case 'phase_resolved':     return 'fim da fase';
    case 'game_over':          return 'desfecho';
    default:                   return p.kind;
  }
}

// ─── Tabuleiro ───────────────────────────────────────────────────────────────

function desenhar() {
  const p = T.passos[i];
  RP.unidades = [...QUADROS[i]].map(([id, q]) => ({ ...CAT.get(id), ...q }));
  RP.rotas    = [];
  RP.disparos = [];
  RP.foco     = [];

  if (p.kind === 'movement_committed') {
    for (const m of p.moves) {
      if (m.path && m.path.length > 1) RP.rotas.push({ path: m.path, team: p.team });
    }
    RP.foco = p.moves.filter(m => m.path?.length > 1).map(m => m.path[m.path.length - 1]);
  }

  if (p.kind === 'attacks_declared') {
    RP.foco = p.attacks.map(a => posDe(a.targetId)).filter(Boolean);
  }

  if (p.kind === 'combat_queue_built') {
    RP.foco = p.queue.map(e => ({ col: e.targetCol, row: e.targetRow }));
  }

  if (p.kind === 'engagement_resolved') {
    const e  = p.engagement;
    const r  = e.results[0]?.result;
    const de = posAnterior(e.attackerId);
    const pa = { col: e.targetCol, row: e.targetRow };
    if (de) {
      RP.disparos.push({ de: de, para: pa,
                         acertou: !!(r && r.ok && r.totalDamage > 0),
                         destruiu: !!(r && r.destroyed) });
      RP.foco = [de, pa];
    }
  }

  rpFocar(RP.foco, { ativo: $('rp-seguir').checked });
  rpRender();
}

/** Posição da unidade no quadro atual. */
function posDe(id) {
  const q = QUADROS[i]?.get(id);
  return q ? { col: q.col, row: q.row } : null;
}
/** Posição no quadro anterior — um alvo destruído some do tabuleiro atual. */
function posAnterior(id) {
  const q = (QUADROS[i - 1] || QUADROS[i])?.get(id);
  return q ? { col: q.col, row: q.row } : null;
}

// ─── Painel ──────────────────────────────────────────────────────────────────

function pintarPainel() {
  const p = T.passos[i];
  $('rp-cab').textContent =
    `Turno ${p.turn} · ${PERIODO[p.period] || p.period} — ${rotuloTipo(p)}`;
  $('rp-narr').innerHTML = narrar(p);
  if (!$('rp-aba-objetivos').classList.contains('hidden')) pintarObjetivos();
  if (!$('rp-aba-forcas').classList.contains('hidden'))    pintarForcas();
}

function narrar(p) {
  switch (p.kind) {
    case 'game_start':         return narrarInicio();
    case 'phase_start':        return narrarFase(p);
    case 'movement_committed': return narrarMovimento(p);
    case 'attacks_declared':   return narrarAtaques(p);
    case 'combat_queue_built': return narrarFila(p);
    case 'engagement_resolved':return narrarEngajamento(p);
    case 'phase_resolved':     return narrarFimDeFase(p);
    case 'game_over':          return narrarDesfecho(p);
    default:                   return '';
  }
}

function narrarInicio() {
  const az = T.catalogo.filter(u => u.team === 'blue').length;
  const vm = T.catalogo.filter(u => u.team === 'red').length;
  return li('', `<b>Partida iniciada.</b> ${az} unidades azuis contra ${vm} vermelhas. `
    + `Pacote de ${T.partida.custoTotal} EAC, ${T.partida.nCapacidades} de 5 capacidades presentes. `
    + `Força Vermelha: ${esc(T.partida.forcaVermelha)}. `
    + `Vitória por ${T.partida.victoryRule === 'exhaustion' ? 'exaustão ofensiva' : 'objetivos do cenário'}.`);
}

/** O delta da virada de turno conta a história: recompletamento e combustível. */
function narrarFase(p) {
  if (!p.delta.length) return li('', 'Abertura da fase.');
  const rec = [], comb = [];
  for (const d of p.delta) {
    if (d.weapons) {
      const antes = QUADROS[i - 1]?.get(d.id)?.weapons || {};
      for (const [t, w] of Object.entries(d.weapons)) {
        const q0 = antes[t]?.quantity ?? 0;
        if (w.quantity > q0) rec.push(`${nome(d.id)} ${rotuloArma(t)} ${q0}→${w.quantity}`);
      }
    }
    if (d.fuel) {
      const f0 = QUADROS[i - 1]?.get(d.id)?.fuel;
      if (f0 && d.fuel.current > f0.current) comb.push(`${nome(d.id)} ${f0.current}→${d.fuel.current} FP`);
    }
  }
  let h = li('', `<b>Turno ${p.turn} · ${PERIODO[p.period]}.</b>`);
  if (rec.length)  h += li('', `<b>Recompletamento:</b> ${colapsar(rec)}`);
  if (comb.length) h += li('', `<b>Reabastecimento:</b> ${colapsar(comb)}`);
  return h;
}

function narrarMovimento(p) {
  const cls = p.team === 'blue' ? 'rp-li-azul' : 'rp-li-verm';
  const moveram = p.moves.filter(m => m.path && m.path.length > 1);
  if (!moveram.length) {
    return li(cls, `<b>${EQUIPE[p.team]}</b> não moveu nenhuma unidade nesta fase.`);
  }
  const linhas = moveram.map(m => {
    const a = m.path[0], b = m.path[m.path.length - 1];
    return `${esc(nome(m.unitId))} ${hexNome(a.col, a.row)} → ${hexNome(b.col, b.row)} `
         + `<span class="cs-sd">(${m.path.length - 1} hexes)</span>`;
  });
  return li(cls, `<b>${EQUIPE[p.team]} move ${moveram.length} unidade(s).</b>`)
       + li(cls, colapsar(linhas, 6));
}

function narrarAtaques(p) {
  const cls = p.team === 'blue' ? 'rp-li-azul' : 'rp-li-verm';
  if (!p.attacks.length) return li(cls, `<b>${EQUIPE[p.team]}</b> não declarou ataques.`);
  const linhas = p.attacks.map(a => {
    const da = posDe(a.attackerId), pa = posDe(a.targetId);
    const d = da && pa ? hexDist(da.col, da.row, pa.col, pa.row) : '?';
    return `${esc(nome(a.attackerId))} → ${esc(nome(a.targetId))} <span class="cs-sd">(dist. ${d})</span>`;
  });
  return li(cls, `<b>${EQUIPE[p.team]} declara ${p.attacks.length} ataque(s).</b> `
    + `<span class="cs-sd">A arma ainda não foi escolhida neste passo.</span>`)
       + li(cls, colapsar(linhas, 6));
}

function narrarFila(p) {
  // A diferença entre o que foi declarado e o que entrou na fila é informativa:
  // buildCombatQueue descarta ataque cujo alvo já morreu, alvo neutro, ou para
  // o qual nenhuma arma serve à distância.
  const decl = declaradosNaFase();
  const desc = decl - p.queue.length;
  const inicia = p.turn % 2 === 1 ? 'Azul' : 'Vermelho';
  let h = li('', `<b>Fila: ${p.queue.length} engajamento(s)</b>, alternando entre os lados `
    + `<span class="cs-sd">(turno ${p.turn % 2 === 1 ? 'ímpar' : 'par'} ⇒ ${inicia} resolve primeiro)</span>.`);
  if (desc > 0) {
    h += li('rp-li-miss', `${desc} ataque(s) declarado(s) não entraram na fila — alvo já destruído, `
      + `alvo neutro, ou nenhuma arma disponível ao alcance.`);
  }
  h += li('', colapsar(p.queue.map(e => {
    const prof = T.armas.perfis[e.weaponType] || {};
    const salva = prof.expendable
      ? `salva <b>${e.amount}</b>`
      : `<span class="cs-sd">tiro único (arma não descartável)</span>`;
    const rodadas = e.maxBattleRounds > 1
      ? ` <span class="cs-sd">· até ${e.maxBattleRounds} rodadas, mas o laço construtivo resolve só a 1ª</span>`
      : '';
    return `<b>${esc(e.id)}</b> ${esc(nome(e.attackerId))} → ${esc(nome(e.targetId))} · `
         + `<b>${esc(prof.label || e.weaponType)}</b> · ${salva}${rodadas}`;
  }), 5));
  return h;
}

/** Quantos ataques os dois lados declararam nesta fase. */
function declaradosNaFase() {
  let n = 0;
  for (let k = i - 1; k >= 0; k--) {
    const p = T.passos[k];
    if (p.kind === 'attacks_declared') n += p.attacks.length;
    if (p.kind === 'phase_start') break;
  }
  return n;
}

function narrarEngajamento(p) {
  const e = p.engagement;
  const r = e.results[0]?.result;
  const prof = T.armas.perfis[e.weaponType] || {};
  const atk = nome(e.attackerId), alvo = nome(e.targetId);
  const azul = time(e.attackerId) === 'blue';

  if (!r || !r.ok) {
    return li('rp-li-miss', `<b>${esc(e.id)}</b> — ${esc(atk)} não pôde atacar ${esc(alvo)}: `
      + `${esc(r?.reason || 'engajamento inválido')}.`);
  }

  const cls = r.destroyed ? 'rp-li-kill' : r.totalDamage > 0 ? 'rp-li-hit' : 'rp-li-miss';
  let h = li(cls,
    `<b>${esc(e.id)}</b> — <b>${esc(atk)}</b> (${azul ? 'Azul' : 'Vermelho'}) dispara `
    + `<b>${r.launched} ${esc(prof.label || e.weaponType)}</b> contra <b>${esc(alvo)}</b> `
    + `<span class="cs-sd">(distância ${r.distance}, alcance ${r.range})</span>.`);

  const itc = r.interception;
  if (itc && itc.intercepted > 0) {
    const rolls = (itc.details || []).flatMap(d => d.rolls || []);
    h += li(cls, `<b>Interceptação:</b> ${itc.intercepted} de ${r.launched} abatido(s)`
      + (rolls.length ? ` <span class="cs-sd">rolagens:</span> ${dados(rolls)}` : '')
      + `. Restam ${itc.remaining}.`);
  }

  if (r.attackRolls && r.attackRolls.length) {
    h += li(cls, `<b>Impacto:</b> ` + r.attackRolls.map(a =>
      `${dados([a.roll])}${a.reroll != null ? `+${dados([a.reroll])}` : ''}`
      + `<span class="cs-sd">→ ${a.damage} SP</span>`).join(' &nbsp; '));
  }

  if (r.destroyed) {
    h += li(cls, `💥 <b>${esc(alvo)} DESTRUÍDO</b> — ${r.totalDamage} SP de dano.`);
  } else if (r.totalDamage > 0) {
    const max = CAT.get(e.targetId)?.maxHp ?? '?';
    h += li(cls, `<b>Dano total ${r.totalDamage} SP.</b> ${esc(alvo)} fica com ${r.remainingHp}/${max} SP.`);
    if (r.degradation) h += li(cls, `↘ <b>Degradação:</b> ${esc(r.degradation)}`);
  } else {
    h += li(cls, `Nenhum dano — o ataque falhou.`);
  }

  if (r.advantage) h += li(cls, `<span class="cs-sd">★ Iniciativa: rolagem com vantagem.</span>`);
  return h;
}

function narrarFimDeFase(p) {
  let h = '';
  if (p.winner) {
    h += li('rp-li-kill', `<b>Partida decidida:</b> ${EQUIPE[p.winner]} venceu.`);
  }
  if (p.culminationTurn != null) {
    h += li('', `<span class="cs-sd">Culminância da ofensiva Vermelha registrada no turno ${p.culminationTurn}.</span>`);
  }
  if (p.objetivos) {
    for (const lado of ['blue', 'red']) {
      const o = p.objetivos[lado];
      h += li(lado === 'blue' ? 'rp-li-azul' : 'rp-li-verm',
        `<b>${EQUIPE[lado]}:</b> ${o.achieved} de ${o.needed} condições cumpridas.`);
    }
  }
  return h || li('', 'Fase encerrada sem decisão.');
}

function narrarDesfecho(p) {
  const m = p.metrics || {};
  const cens = !p.winner;
  let h = li(cens ? '' : 'rp-li-kill', cens
    ? `<b>Sem decisão.</b> A partida atingiu o limite de turnos — o último turno jogado foi o `
      + `${p.lastPlayedTurn}. <span class="cs-sd">(O campo "turnos" do relatório registra `
      + `${p.turns}: o laço vira o turno antes de sair pela contagem de fases.)</span>`
    : `<b>${EQUIPE[p.winner]} venceu</b> no turno ${p.lastPlayedTurn}.`);

  const linha = (r, v, u) => v == null ? '' : `<tr><th>${r}</th><td class="n">${v}${u || ''}</td></tr>`;
  h += `<table class="rp-forcas" style="margin-top:10px">
    ${linha('E1 atrito imposto ao Vermelho', fmt(m.E1_atrito), '%')}
    ${linha('E1 kcv (Vermelho inoperante)', m.E1_kcv)}
    ${linha('E2 vp (FPSOs preservadas)', fmt(m.E2_vp), '%')}
    ${linha('E2 sloc (índice de portos)', fmt(m.E2_sloc))}
    ${linha('E3 culminância (turno)', m.E3_culminancia ?? '—')}
    ${linha('Atrito sofrido pela Força Azul', fmt(m.atrito_azul), '%')}
  </table>`;
  return h;
}

const fmt = v => (v == null ? null : (Math.round(v * 100) / 100));

// ─── Abas ────────────────────────────────────────────────────────────────────

function pintarObjetivos() {
  // A última leitura de objetivos até o passo atual.
  let obj = null;
  for (let k = i; k >= 0; k--) { if (T.passos[k].objetivos) { obj = T.passos[k].objetivos; break; } }
  if (!obj) {
    $('rp-aba-objetivos').innerHTML =
      `<p class="cs-help">Os objetivos são apurados ao fim de cada fase — avance até o primeiro fim de fase.</p>`;
    return;
  }
  const rot = T.objetivosRotulos;
  const bloco = lado => {
    const o = obj[lado];
    const rr = Object.fromEntries(rot[lado].map(c => [c.id, c.label]));
    return `<h3 class="cs-h3">${EQUIPE[lado]} — ${o.achieved} cumprida(s), precisa ${o.needed}</h3>` + o.conds.map(c => `
      <div class="rp-obj ${c.met ? 'rp-obj-met' : ''}">
        <div class="rp-obj-top">
          <span>${c.met ? '✓' : '○'} ${esc(rr[c.id] || c.id)}</span>
          <span class="cs-sd">${esc(c.current || '')}</span>
        </div>
        <div class="rp-obj-bar"><div class="rp-obj-fill ${lado === 'red' ? 'verm' : ''}"
             style="width:${Math.round((c.progress || 0) * 100)}%"></div></div>
      </div>`).join('');
  };
  $('rp-aba-objetivos').innerHTML = bloco('blue') + bloco('red');
}

function pintarForcas() {
  const linhas = lado => [...QUADROS[i]]
    .map(([id, q]) => ({ ...CAT.get(id), ...q }))
    .filter(u => u.team === lado)
    .map(u => {
      const morta = (u.hp ?? 0) <= 0;
      const arsenal = Object.entries(u.weapons || {})
        .filter(([, w]) => (w.quantity ?? 0) > 0)
        .map(([t, w]) => `${rotuloArma(t)} ${w.quantity}`)
        // O arsenal das baterias costeiras mora em `capabilities`, não em
        // `weapons` — getWeaponQuantity consulta os dois.
        .concat(Object.entries(u.capabilities || {})
          .filter(([t, v]) => v > 0 && T.armas.perfis[t])
          .map(([t, v]) => `${rotuloArma(t)} ${v}`));
      return `<tr class="${morta ? 'rp-morta' : ''}">
        <td>${esc(u.name)}</td>
        <td class="n">${morta ? '—' : `${u.hp}/${u.maxHp}`}</td>
        <td class="n">${morta ? '—' : hexNome(u.col, u.row)}</td>
        <td class="cs-sd">${morta ? 'perdida' : esc(arsenal.join(' · ') || '—')}</td>
      </tr>`;
    }).join('');
  const viva = lado => [...QUADROS[i]].filter(([id, q]) => CAT.get(id)?.team === lado && (q.hp ?? 0) > 0).length;
  $('rp-aba-forcas').innerHTML = ['blue', 'red'].map(lado => `
    <h3 class="cs-h3">${EQUIPE[lado]} — ${viva(lado)} em operação</h3>
    <table class="rp-forcas">
      <thead><tr><th>Unidade</th><th>SP</th><th>Hex</th><th>Arsenal</th></tr></thead>
      <tbody>${linhas(lado)}</tbody>
    </table>`).join('');
}

function paramsHtml() {
  const p = T.partida;
  const f = Object.entries(p.factors).map(([k, v]) => `${k}×${v}`).join(' · ');
  return `<b>Parâmetros desta reprodução:</b> semente ${p.seed} · limite de ${p.maxTurns} turnos · `
       + `${f} · Força Vermelha: ${esc(p.forcaVermelha)} · ${p.custoTotal} EAC.`;
}

// ─── Avisos ──────────────────────────────────────────────────────────────────

function mostrarDivergencia() {
  const c = T.conferencia;
  $('rp-divergencia').innerHTML =
    `<b>Esta reprodução divergiu do lote.</b> O relatório registrou `
    + `<b>${esc(c.esperado.vencedor)}</b> em ${c.esperado.turnos} turno(s); a re-execução deu `
    + `<b>${esc(c.obtido.vencedor)}</b> em ${c.obtido.turnos}. ${esc(c.motivo || '')}`;
  $('rp-divergencia').classList.remove('hidden');
}

function avisarTruncado() {
  const d = document.createElement('div');
  d.className = 'rp-divergencia';
  d.textContent = 'Partida longa demais: o registro foi truncado e o replay não chega ao fim.';
  $('rp-divergencia').insertAdjacentElement('afterend', d);
}

// ─── Utilidades de texto ─────────────────────────────────────────────────────

function li(cls, html) { return `<div class="rp-li ${cls}">${html}</div>`; }
function dados(rolls) { return rolls.map(r => `<span class="rp-dado">${r}</span>`).join(''); }
function rotuloArma(t) { return T.armas.perfis[t]?.label || t; }

/** Lista longa vira lista curta + "mostrar todas". */
let colSeq = 0;
function colapsar(itens, n = 4) {
  if (itens.length <= n) return itens.join('<br>');
  const id = 'col' + (++colSeq);
  return itens.slice(0, n).join('<br>')
    + `<span id="${id}" class="hidden"><br>${itens.slice(n).join('<br>')}</span>`
    + `<br><button type="button" class="rp-mais" data-alvo="${id}">mostrar as outras ${itens.length - n}</button>`;
}

// ─── Controles ───────────────────────────────────────────────────────────────

function ligarControles() {
  $('rp-inicio').addEventListener('click', () => { pausar(); irPara(0); });
  $('rp-fim').addEventListener('click',    () => { pausar(); irPara(QUADROS.length - 1); });
  $('rp-ant').addEventListener('click',    () => { pausar(); anterior(); });
  $('rp-prox').addEventListener('click',   () => { pausar(); proximo(); });
  $('rp-play').addEventListener('click',   () => (tocando ? pausar() : tocar()));
  $('rp-scrub').addEventListener('input', e => { pausar(); irPara(Number(e.target.value)); });
  $('rp-vel').addEventListener('change', e => { fatorVel = Number(e.target.value); agendar(); });
  $('rp-seguir').addEventListener('change', desenhar);

  document.addEventListener('click', e => {
    const mais = e.target.closest('.rp-mais');
    if (mais) {
      document.getElementById(mais.dataset.alvo)?.classList.remove('hidden');
      mais.remove();
      return;
    }
    const aba = e.target.closest('.rp-tab');
    if (aba) trocarAba(aba);
  });

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, select, textarea')) return;
    if (e.key === 'ArrowRight') { pausar(); proximo(); e.preventDefault(); }
    if (e.key === 'ArrowLeft')  { pausar(); anterior(); e.preventDefault(); }
    if (e.key === 'Home')       { pausar(); irPara(0); e.preventDefault(); }
    if (e.key === 'End')        { pausar(); irPara(QUADROS.length - 1); e.preventDefault(); }
    if (e.key === ' ')          { tocando ? pausar() : tocar(); e.preventDefault(); }
  });

  window.addEventListener('resize', desenhar);
}

function trocarAba(btn) {
  for (const t of document.querySelectorAll('.rp-tab')) {
    const on = t === btn;
    t.classList.toggle('rp-tab-on', on);
    t.setAttribute('aria-selected', String(on));
  }
  for (const nomeAba of ['passo', 'objetivos', 'forcas', 'sobre']) {
    $('rp-aba-' + nomeAba).classList.toggle('hidden', nomeAba !== btn.dataset.aba);
  }
  if (btn.dataset.aba === 'objetivos') pintarObjetivos();
  if (btn.dataset.aba === 'forcas')    pintarForcas();
}

carregar();

})();
