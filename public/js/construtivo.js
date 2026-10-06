'use strict';
// ═════════════════════════════════════════════════════════════════════════════
// SIMULADOR CONSTRUTIVO — Planejamento Baseado em Capacidades
// Monta o pacote de capacidades, dispara o lote no servidor, acompanha o
// progresso e desenha o relatório. Toda a simulação roda no servidor
// (shared/constructive_sim.js) sobre o mesmo motor do wargame.
// ═════════════════════════════════════════════════════════════════════════════

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g,
  c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let META = null;
let estado = {};          // chave do fator azul  -> quantidade (0..MAX)
let estadoRed = {};       // sigla do grupo verm. -> quantidade (0..MAX)
let jobAtual = null;
let ultimoResultado = null;
let timerEfetivo = null;
let textoFora = '', textoRed = '';

// Rampas sequenciais de uma só matiz, validadas contra a superfície naval
// escura (#071929): a magnitude cresce do passo mais escuro ao mais claro.
// Azul para as perdas da própria força; laranja para o atrito imposto.
const RAMPA = {
  blue: ['#184f95', '#256abf', '#3987e5', '#6da7ec', '#9ec5f4', '#cde2fb'],
  red:  ['#8f3a1a', '#c04d22', '#eb6834', '#f49a6a', '#f9bd9d', '#fde0d1'],
};
// Tinta do rótulo dentro da célula: clara nos passos escuros, escura nos claros.
const TINTA_CLARA = '#f2f7ff', TINTA_ESCURA = '#07203a';

function corDaCelula(pct, lado) {
  const r = RAMPA[lado];
  if (pct === null || pct === undefined) return { bg: 'transparent', fg: 'var(--cs-dim)' };
  const i = Math.min(r.length - 1, Math.max(0, Math.round((pct / 100) * (r.length - 1))));
  return { bg: r[i], fg: i >= r.length - 3 ? TINTA_ESCURA : TINTA_CLARA };
}

// ─── 1. Ordem de batalha ─────────────────────────────────────────────────────
// A OB em uso: 'padrao', ou a impressão digital de uma planilha carregada.
//
// O servidor guarda as OBs carregadas só em memória, e o servidor reinicia. Por
// isso o navegador guarda a OB validada (localStorage `ob:<id>`) e, quando o
// servidor responde que não a conhece, reenvia-a e tenta de novo — conteúdo
// igual dá o mesmo id, então nada muda para quem está usando.
let OB_ID = 'padrao';

// localStorage pode lançar (janela privada, armazenamento bloqueado): a tela
// tem de funcionar sem ele, só perdendo a OB ao recarregar a página.
const LS = {
  get(k)    { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); return true; } catch { return false; } },
  del(k)    { try { localStorage.removeItem(k); } catch { /* sem armazenamento */ } },
};
function obGuardada(id) {
  try { return JSON.parse(LS.get('ob:' + id) || 'null'); } catch { return null; }
}
const qsOB = (sep = '?') => (OB_ID !== 'padrao' ? `${sep}ob=${encodeURIComponent(OB_ID)}` : '');

/** Reenvia a OB guardada ao servidor. true se ele a reconheceu com o mesmo id. */
async function reenviarOB(id) {
  const g = obGuardada(id);
  if (!g?.ob) return false;
  try {
    const res = await fetch('/api/construtivo/ob/json', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ob: g.ob, nome: g.nome }),
    });
    return res.ok && (await res.json()).obId === id;
  } catch { return false; }
}

/** fetch que sobrevive a um servidor que esqueceu a OB: reenvia e repete. */
async function fetchComOB(url, opts) {
  let res = await fetch(url, opts);
  if (res.status === 404 && OB_ID !== 'padrao') {
    const j = await res.clone().json().catch(() => ({}));
    if (j.codigo === 'OB_DESCONHECIDA' && await reenviarOB(OB_ID)) res = await fetch(url, opts);
  }
  return res;
}

function renderOB() {
  const ob = META.ob;
  const padrao = ob.id === 'padrao';
  $('ob-nome').textContent = ob.nome;
  $('ob-id').textContent   = padrao ? '' : `· ${ob.id}`;
  $('btn-ob-padrao').classList.toggle('hidden', padrao);
  const r = ob.resumo;
  const partes = [`${r.blue.unidades} unidades azuis, ${r.red.unidades} vermelhas`];
  const mud = lado => [
    r[lado].incluidas.length ? `${r[lado].incluidas.length} incluída(s)` : '',
    r[lado].removidas.length ? `${r[lado].removidas.length} removida(s)` : '',
  ].filter(Boolean).join(', ');
  if (mud('blue')) partes.push(`Azul: ${mud('blue')}`);
  if (mud('red'))  partes.push(`Vermelho: ${mud('red')}`);
  $('ob-resumo').textContent = partes.join(' · ') + (padrao ? '' : ' em relação à padrão.');
}

/** Mensagens da carga: lista de erros por célula, ou confirmação com avisos. */
function msgsOB(tipo, titulo, itens = []) {
  const caixa = $('ob-msgs');
  caixa.className = `cs-ob-msgs ${tipo === 'erro' ? 'cs-ob-erros' : 'cs-ob-ok'}`;
  caixa.innerHTML = `<b>${esc(titulo)}</b>` +
    (itens.length ? `<ul>${itens.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : '');
}

async function ativarOB(id) {
  OB_ID = id;
  if (id === 'padrao') LS.del('ob:ativa'); else LS.set('ob:ativa', id);
  await carregarMeta();
}

async function carregarPlanilha(arquivo) {
  msgsOB('ok', `Lendo ${arquivo.name}…`);
  let res, r;
  try {
    // O File vai como corpo bruto. Content-Type forçado: File.type pode vir
    // vazio, e o servidor só lê application/octet-stream.
    res = await fetch('/api/construtivo/ob', {
      method: 'POST', body: arquivo,
      headers: { 'Content-Type': 'application/octet-stream', 'X-Nome-Arquivo': encodeURIComponent(arquivo.name) },
    });
    r = await res.json();
  } catch {
    msgsOB('erro', 'Não foi possível enviar a planilha ao servidor.');
    return;
  }
  if (!res.ok) {
    const n = r.erros?.length || 0;
    msgsOB('erro', `A planilha não foi carregada: ${n} problema(s) a corrigir. A ordem de batalha em uso não mudou.`,
      [...(r.erros || []), ...(r.avisos || []).map(a => '⚠ ' + a)]);
    return;
  }
  if (r.padrao) {
    await ativarOB('padrao');
    msgsOB('ok', 'A planilha é idêntica à ordem de batalha padrão — nada a mudar.');
    return;
  }
  const guardou = LS.set('ob:' + r.obId, JSON.stringify({ nome: r.nome, ob: r.ob }));
  await ativarOB(r.obId);
  const avisos = [...r.avisos];
  if (!guardou) avisos.push('O navegador não permitiu guardar a planilha: se o servidor reiniciar, será preciso carregá-la de novo.');
  msgsOB('ok', `Ordem de batalha carregada: ${r.nome}. As próximas simulações usam esta OB.`, avisos);
}

async function baixarPlanilha() {
  try {
    const res = await fetchComOB('/api/construtivo/ob/planilha' + qsOB());
    if (!res.ok) throw new Error();
    const blob = await res.blob();
    const nome = /filename="([^"]+)"/.exec(res.headers.get('Content-Disposition') || '')?.[1] || 'ordem_de_batalha.xlsx';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nome;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  } catch {
    msgsOB('erro', 'Não foi possível gerar a planilha.');
  }
}

$('btn-ob-baixar').addEventListener('click', baixarPlanilha);
$('btn-ob-padrao').addEventListener('click', async () => {
  await ativarOB('padrao');
  msgsOB('ok', 'De volta à ordem de batalha padrão.');
});
$('ob-arquivo').addEventListener('change', e => {
  const f = e.target.files?.[0];
  e.target.value = '';        // permite carregar o mesmo arquivo de novo depois de corrigi-lo
  if (f) carregarPlanilha(f);
});

// ─── 2. Pacote ───────────────────────────────────────────────────────────────
const MAXQ = () => META?.quantidadeMaxima ?? 4;

async function carregarMeta() {
  let res = await fetchComOB('/api/construtivo/meta' + qsOB());
  if (!res.ok && OB_ID !== 'padrao') {
    // A OB guardada sumiu do servidor e do navegador: volta à padrão e avisa,
    // em vez de deixar a tela vazia.
    OB_ID = 'padrao';
    LS.del('ob:ativa');
    msgsOB('erro', 'A ordem de batalha carregada antes não está mais disponível — usando a padrão. Carregue a planilha de novo, se quiser.');
    res = await fetch('/api/construtivo/meta');
  }
  META = await res.json();
  // Mantém as quantidades já escolhidas ao trocar de OB: as chaves de pacote e
  // de grupo são as mesmas em qualquer OB.
  for (const f of META.fatores) estado[f.chave] ??= 1;
  for (const g of META.gruposVermelhos) estadoRed[g.sigla] ??= 1;
  renderOB();
  renderFatores();
  renderGruposVermelhos();
  atualizarTotais();
  atualizarTotaisRed();
  atualizarPlano();
  atualizarRegra();
}

/**
 * Controle de quantidade. A quantidade é o estado em si — por isso aparece
 * como número, e não como caixa marcada: 0 é "fora da força", 1 é a ordem de
 * batalha, acima disso são cópias.
 */
function stepper(escopo, chave, qty) {
  const max = MAXQ();
  return `<span class="cs-qty" role="group" aria-label="Quantidade">
    <button type="button" class="cs-qty-btn" data-step="${escopo}" data-key="${chave}" data-delta="-1"
            ${qty <= 0 ? 'disabled' : ''} aria-label="Diminuir">−</button>
    <span class="cs-qty-val ${qty === 0 ? 'zero' : qty > 1 ? 'mais' : ''}">${qty}</span>
    <button type="button" class="cs-qty-btn" data-step="${escopo}" data-key="${chave}" data-delta="1"
            ${qty >= max ? 'disabled' : ''} aria-label="Aumentar">+</button>
  </span>`;
}

function renderFatores() {
  $('fatores').innerHTML = META.fatores.map(f => {
    const q = estado[f.chave];
    return `
    <div class="cs-factor ${q === 0 ? 'off' : 'on'}" data-fator="${f.chave}">
      ${stepper('blue', f.chave, q)}
      <span class="cs-factor-body">
        <span class="cs-factor-top">
          <span class="cs-factor-label">${esc(f.rotulo)}</span>
          <span class="cs-factor-cost">${f.custo * q} EAC${q > 1 ? ` <span class="cs-sd">(${q}×${f.custo})</span>` : ''}</span>
        </span>
        <span class="cs-factor-units">${f.unidades.map(u => esc(u.nome)).join(' · ')}${
          q > 1 ? ` <span class="cs-sd">— ${f.unidades.length * q} unidades</span>` : ''}</span>
      </span>
    </div>`;
  }).join('');
}

function renderGruposVermelhos() {
  $('grupos-vermelhos').innerHTML = META.gruposVermelhos.map(g => {
    const q = estadoRed[g.sigla];
    return `
    <div class="cs-factor cs-factor-red ${q === 0 ? 'off' : 'on'}" data-grupo="${g.sigla}">
      ${stepper('red', g.sigla, q)}
      <span class="cs-factor-body">
        <span class="cs-factor-top">
          <span class="cs-factor-label">${esc(g.sigla)} — ${esc(g.rotulo)}</span>
          <span class="cs-factor-cost">${esc(g.dominio)}</span>
        </span>
        <span class="cs-factor-units">${g.unidades.map(u => esc(u.nome)).join(' · ')}${
          q > 1 ? ` <span class="cs-sd">— ${g.unidades.length * q} unidades</span>` : ''}</span>
      </span>
    </div>`;
  }).join('');
}

function atualizarTotais() {
  const custo = META.fatores.reduce((s, f) => s + f.custo * estado[f.chave], 0);
  const presentes = META.fatores.filter(f => estado[f.chave] >= 1);
  $('custo').textContent  = custo;
  $('n-caps').textContent = presentes.length;
  $('custo-pct').textContent =
    `${Math.round(100 * custo / META.custoTotal)}% da linha de base (${META.custoTotal} EAC, todas em quantidade 1)`;
  const fora = META.fatores.filter(f => estado[f.chave] === 0).flatMap(f => f.unidades);
  const extra = META.fatores.filter(f => estado[f.chave] > 1)
    .map(f => `${f.chave}×${estado[f.chave]}`);
  const partes = [];
  if (fora.length)  partes.push(`${fora.length} unidade(s) fora: ${fora.map(u => u.nome).join(', ')}`);
  if (extra.length) partes.push(`reforçado: ${extra.join(', ')}`);
  textoFora = partes.length ? partes.join(' · ') : 'ordem de batalha original';
  $('unidades-fora').textContent = textoFora;
  agendarEfetivo();
}

function atualizarTotaisRed() {
  const total = META.gruposVermelhos.length;
  const presentes = META.gruposVermelhos.filter(g => estadoRed[g.sigla] >= 1).length;
  const alterados = META.gruposVermelhos.filter(g => estadoRed[g.sigla] !== 1)
    .map(g => `${g.sigla}×${estadoRed[g.sigla]}`);
  $('red-resumo').textContent  = alterados.length ? 'alterada' : 'padrão';
  textoRed = alterados.length ? alterados.join(' · ') : 'ordem de batalha original';
  $('red-detalhe').textContent = textoRed;
  $('red-n').textContent     = presentes;
  $('red-n-tot').textContent = `/${total}`;
  agendarEfetivo();
}

// ─── Efetivo real das duas forças ────────────────────────────────────────────
// Quantidade arrasta dependentes, e a cascata atravessa grupos: sem o
// porta-aviões a ala aérea embarcada nele também não entra, ainda que pertença
// a DAE/PATMAR. Somar unitIds aqui daria um número errado — quem conta é o
// servidor, pelo mesmo applyForceConfig que monta a partida.
function agendarEfetivo() {
  clearTimeout(timerEfetivo);
  timerEfetivo = setTimeout(atualizarEfetivo, 150);
}

async function atualizarEfetivo() {
  const corpo = { factors: fatoresSelecionados(), redGroups: grupoVermelhoSelecionado() || {}, obId: OB_ID };
  try {
    const res = await fetchComOB('/api/construtivo/forca', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo),
    });
    if (!res.ok) throw new Error('falhou');
    const f = await res.json();
    $('unidades-fora').textContent = `${textoFora} — ${f.azul.n} unidades em campo`;
    $('red-detalhe').textContent   = `${textoRed} — ${f.vermelha.n} unidades em campo`;
  } catch {
    /* O efetivo é informação de apoio: se o servidor não responder, a tela
       segue utilizável com a composição que o usuário já vê. */
  }
}

// Delegação dos controles de quantidade.
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-step]');
  if (!btn || btn.disabled) return;
  const delta = Number(btn.dataset.delta);
  const key   = btn.dataset.key;
  if (btn.dataset.step === 'blue') {
    estado[key] = Math.max(0, Math.min(MAXQ(), estado[key] + delta));
    renderFatores(); atualizarTotais();
  } else {
    estadoRed[key] = Math.max(0, Math.min(MAXQ(), estadoRed[key] + delta));
    renderGruposVermelhos(); atualizarTotaisRed();
  }
});

$('btn-red-reset').addEventListener('click', () => {
  if (!META) return;
  for (const g of META.gruposVermelhos) estadoRed[g.sigla] = 1;
  renderGruposVermelhos(); atualizarTotaisRed();
});

// ─── 2. Execução ─────────────────────────────────────────────────────────────
// A regra de vitória muda o que conta como partida decidida — e, com ela, a
// métrica E1_kcv. Dizer isso aqui evita que o número seja lido fora de contexto.
const AVISO_REGRA = {
  objectives: 'Regra padrão do wargame: a partida se decide quando um lado cumpre suas condições, '
    + 'normalmente em poucos turnos. Como o Vermelho raramente chega a ficar sem meios ofensivos antes '
    + 'disso, a medida E1_kcv tende a ficar em zero sob esta regra.',
  exhaustion: 'Regra do estudo de capacidades: "decisivo" passa a significar reduzir o adversário à '
    + 'incapacidade de combate — nenhuma unidade sobrevivente com arma em estoque ou capacidade ofensiva. '
    + 'É a definição de que E1_kcv depende; sob ela a métrica volta a discriminar. As partidas ficam mais '
    + 'longas, então convém elevar o limite de turnos.',
};

function atualizarRegra() {
  $('regra-aviso').textContent = AVISO_REGRA[$('regra').value] || '';
}

function atualizarPlano() {
  const bloco = $('bloco').value;
  const reps  = Math.max(1, Number($('replicas').value) || 1);
  const conds = bloco === 'fatorial' ? 32 : bloco === 'ablacao' ? 6 : 1;
  const total = conds * reps;
  const nomes = { pacote: 'o pacote montado acima', ablacao: '6 condições (C0 a C5)', fatorial: '32 condições' };
  $('plano-aviso').textContent =
    `${nomes[bloco]} × ${reps} réplicas = ${total} partida(s). ` +
    (bloco === 'pacote'
      ? 'Os fatores desligados acima saem da ordem de batalha.'
      : 'Neste delineamento os fatores são definidos pelo próprio bloco — a seleção acima é ignorada.');
  $('btn-jogar').disabled = bloco !== 'pacote';
}

function fatoresSelecionados() { return { ...estado }; }

/** Só envia os grupos alterados — assim "padrão" fica explícito no servidor. */
function grupoVermelhoSelecionado() {
  const alterados = {};
  for (const k of Object.keys(estadoRed)) if (estadoRed[k] !== 1) alterados[k] = estadoRed[k];
  return Object.keys(alterados).length ? alterados : null;
}

async function rodar() {
  const bloco = $('bloco').value;
  const corpo = {
    maxTurns:    Number($('maxturns').value) || META.maxTurnsPadrao,
    replicas:    Number($('replicas').value) || 20,
    victoryRule: $('regra').value,
  };
  if (bloco === 'pacote') { corpo.factors = fatoresSelecionados(); corpo.nome = 'Pacote'; }
  else corpo.bloco = bloco;
  // A composição Vermelha vale para qualquer delineamento: os blocos variam a
  // Força Azul, e a ameaça contra a qual ela é medida é escolha do cenário.
  const red = grupoVermelhoSelecionado();
  if (red) corpo.redGroups = red;
  if (OB_ID !== 'padrao') corpo.obId = OB_ID;

  $('erro').classList.add('hidden');
  $('btn-run').disabled = true;
  $('progresso').classList.remove('hidden');
  atualizarProgresso(0, 1, null);

  try {
    const res = await fetchComOB('/api/construtivo/run', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo),
    });
    const inicio = await res.json();
    if (!res.ok) throw new Error(inicio.error || 'Falha ao iniciar o lote.');
    jobAtual = inicio.id;
    await acompanhar(inicio.id, inicio.total);
  } catch (err) {
    mostrarErro(err.message);
    $('btn-run').disabled = false;
    $('progresso').classList.add('hidden');
  }
}

function atualizarProgresso(feito, total, cond) {
  const pct = total ? Math.round(100 * feito / total) : 0;
  $('progresso-fill').style.width = pct + '%';
  $('progresso-txt').textContent =
    `${feito} de ${total} partidas (${pct}%)` + (cond ? ` · condição ${cond}` : '');
}

async function acompanhar(id, total) {
  for (;;) {
    await new Promise(r => setTimeout(r, 350));
    const res = await fetch(`/api/construtivo/job/${id}`);
    if (!res.ok) throw new Error('O lote expirou ou não foi encontrado.');
    const j = await res.json();
    atualizarProgresso(j.feito, j.total || total, j.condicaoAtual);
    if (j.status === 'running') continue;
    if (j.status === 'error') throw new Error(j.erro || 'O lote falhou.');
    ultimoResultado = j.resultado;
    renderRelatorio(j.resultado);
    $('btn-run').disabled = false;
    $('progresso').classList.add('hidden');
    return;
  }
}

function mostrarErro(msg) {
  $('erro').textContent = '⚠ ' + msg;
  $('erro').classList.remove('hidden');
}

// ─── 3. Relatório ────────────────────────────────────────────────────────────
const n1 = x => (x === null || x === undefined ? '—' : Number(x).toFixed(1));
const n3 = x => (x === null || x === undefined ? '—' : Number(x).toFixed(3));

function renderRelatorio(r) {
  $('relatorio').classList.remove('hidden');

  const v = r.rows.reduce((a, row) => { a[row.vencedor] = (a[row.vencedor] || 0) + 1; return a; }, {});
  const tile = (label, val, foot) => `
    <div class="cs-tile">
      <div class="cs-tile-label">${label}</div>
      <div class="cs-tile-value">${val}</div>
      <div class="cs-tile-foot">${foot}</div>
    </div>`;
  const pc = n => r.total ? Math.round(100 * n / r.total) + '%' : '0%';
  const regra = r.victoryRule === 'exhaustion' ? 'exaustão ofensiva' : 'objetivos do cenário';
  $('resumo-tiles').innerHTML =
    tile('Partidas simuladas', r.total,
         `${r.porCondicao.length} condição(ões) · limite de ${r.maxTurns} turnos<br>` +
         `vitória por ${regra}<br>Força Vermelha: ${esc(r.forcaVermelha || 'padrão')}`) +
    tile('Vitórias da Força Azul', v.blue || 0, pc(v.blue || 0)) +
    tile('Vitórias da Força Vermelha', v.red || 0, pc(v.red || 0)) +
    tile('Sem decisão', v.censurado || 0, `${pc(v.censurado || 0)} · atingiram o limite de turnos`);

  renderTabela(r);
  renderHeatmaps(r);
  renderSelecao(r);
}

function renderTabela(r) {
  const cab = `
    <thead>
      <tr>
        <th scope="col">Condição</th><th scope="col">Caps.</th><th scope="col">Custo</th>
        <th scope="col">E1 atrito<br><span class="cs-th-sub">imposto ao Vermelho</span></th>
        <th scope="col">E1 kcv<br><span class="cs-th-sub">Vermelho inoperante</span></th>
        <th scope="col">E2 vp<br><span class="cs-th-sub">FPSOs preservadas</span></th>
        <th scope="col">E2 sloc<br><span class="cs-th-sub">índice de portos</span></th>
        <th scope="col">E3 culminância<br><span class="cs-th-sub">turno</span></th>
        <th scope="col">Atrito azul<br><span class="cs-th-sub">M Dsp</span></th>
        <th scope="col">Desfechos<br><span class="cs-th-sub">A / V / s.d.</span></th>
        <th scope="col"><span class="cs-th-sub">assistir</span></th>
      </tr>
    </thead>`;
  const linhas = r.porCondicao.map(c => {
    const m = c.resumo;
    const mm = (k, f = n1) => `${f(m[k].media)}<span class="cs-sd"> ± ${m[k].desvio === null ? '—' : f(m[k].desvio)}</span>`;
    const cens = m.E3_censuradas ? `<span class="cs-sd"> (${m.E3_censuradas} cens.)</span>` : '';
    const caps = Object.keys(c.factors).filter(k => c.factors[k] === 1).map(k => k[0]).join('') || '—';
    return `<tr>
      <th scope="row">${esc(c.condicao)}${c.capacidade_removida ? `<br><span class="cs-th-sub">− ${esc(c.capacidade_removida)}</span>` : ''}</th>
      <td title="${esc(Object.keys(c.factors).filter(k => c.factors[k] === 1).join(', ') || 'nenhuma')}">${c.n_capacidades} <span class="cs-sd">${caps}</span></td>
      <td>${c.custo_total}</td>
      <td>${mm('E1_atrito')}</td>
      <td>${n3(m.E1_kcv.media)}</td>
      <td>${mm('E2_vp')}</td>
      <td>${mm('E2_sloc', n3)}</td>
      <td>${mm('E3_culminancia')}${cens}</td>
      <td>${mm('atrito_azul')}</td>
      <td class="cs-outcomes">${m.vitorias.blue} / ${m.vitorias.red} / ${m.vitorias.censurado}</td>
      <td><button type="button" class="cs-ver" data-ver-cond="${esc(c.condicao)}"
          title="Assistir a uma partida típica desta condição (réplica mediana por turnos)">▶</button></td>
    </tr>`;
  }).join('');
  $('tabela-cond').innerHTML = cab + `<tbody>${linhas}</tbody>`;
}

function renderHeatmaps(r) {
  const lados = [
    { lado: 'blue', titulo: 'Perdas da própria força (Azul)', nota: 'quanto maior, mais a Força Azul se desgastou' },
    { lado: 'red',  titulo: 'Atrito imposto (Vermelho)',      nota: 'quanto maior, mais dano a Força Azul infligiu' },
  ];
  $('heatmaps').innerHTML = lados.map(({ lado, titulo, nota }) => {
    const grupos = r.gruposPresentes.filter(g => g.side === lado);
    if (!grupos.length) return '';
    const conds = r.porCondicao;
    // Rótulo curto na coluna ('Cond_07' → '07'); o nome inteiro e as capacidades
    // ativas vão no title, que é onde cabem.
    const cab = `<tr><th scope="col" class="cs-hm-corner">Grupo</th>${
      conds.map(c => {
        const caps = Object.keys(c.factors).filter(k => c.factors[k] === 1).join(', ') || 'nenhuma';
        return `<th scope="col" class="cs-hm-col" title="${esc(c.condicao)} — capacidades: ${esc(caps)} · custo ${c.custo_total} EAC">${
          esc(c.condicao.replace(/^Cond_/, ''))}</th>`;
      }).join('')}</tr>`;
    const linhas = grupos.map(g => {
      const celulas = conds.map(c => {
        const pct = c.resumo.grupos[g.key];
        const { bg, fg } = corDaCelula(pct, lado);
        const t = pct === null || pct === undefined
          ? `${g.label} · ${c.condicao}: grupo ausente nesta condição`
          : `${g.label} · ${c.condicao}: ${pct.toFixed(1)}% do SP perdido`;
        return `<td class="cs-hm-cell" style="background:${bg};color:${fg}" title="${esc(t)}" tabindex="0">${
          pct === null || pct === undefined ? '·' : Math.round(pct)}</td>`;
      }).join('');
      return `<tr><th scope="row" class="cs-hm-row" title="${esc(g.domain)}">${esc(g.sigla)}
        <span class="cs-hm-rowlabel">${esc(g.label)}</span></th>${celulas}</tr>`;
    }).join('');
    const legenda = RAMPA[lado].map((cor, i) => {
      const de = Math.round(i * 100 / RAMPA[lado].length);
      const ate = Math.round((i + 1) * 100 / RAMPA[lado].length);
      return `<span class="cs-leg-step" style="background:${cor}" title="${de}–${ate}% do SP perdido"></span>`;
    }).join('');
    return `
      <figure class="cs-hm">
        <figcaption class="cs-hm-title">${titulo}
          <span class="cs-hm-note">— ${nota}</span></figcaption>
        <div class="cs-table-wrap">
          <table class="cs-hm-table">${cab}${linhas}</table>
        </div>
        <div class="cs-legend">
          <span class="cs-leg-end">0%</span>${legenda}<span class="cs-leg-end">100% do SP perdido</span>
        </div>
      </figure>`;
  }).join('');
}


// ─── Seleção de partida para assistir ────────────────────────────────────────
// Um bloco fatorial são 640 partidas: uma tabela com todas seria inutilizável e
// cara em DOM. Então dois selects (≤32 + N opções) e, acima deles, atalhos que
// respondem direto à pergunta "qual partida explica este resultado?".

const FATORES_URL = ['A_SSN', 'B_SSK', 'C_Azuis', 'D_MSS', 'E_Terra'];

function urlReplay(row, r) {
  const q = new URLSearchParams({
    seed:     row.semente,
    maxTurns: r.maxTurns,
    rule:     r.victoryRule,
    // O desfecho que o lote registrou: o replay confere e avisa se divergir.
    expect:   `${row.vencedor}:${row.turnos}`,
    label:    `${row.condicao} · réplica ${row.replica}`,
  });
  for (const k of FATORES_URL) q.set(k, row[k]);
  const red = Object.entries(r.redGroupsUsados || {});
  if (red.length) q.set('red', red.map(([s, n]) => `${s}:${n}`).join(','));
  // A OB do LOTE (não a que estiver ativa agora): a partida só se reproduz com
  // a mesma ordem de batalha com que foi jogada.
  if (r.obId && r.obId !== 'padrao') q.set('ob', r.obId);
  return '/replay?' + q.toString();
}

/** As partidas que vale a pena olhar, extraídas das linhas do lote. */
function notaveis(r) {
  const rows = r.rows;
  if (!rows.length) return [];
  const porMax = (f, rotulo, fmt) => {
    const cand = rows.filter(x => f(x) !== null && f(x) !== undefined);
    if (!cand.length) return null;
    const m = cand.reduce((a, b) => (f(b) > f(a) ? b : a));
    return { row: m, rotulo, detalhe: fmt(m) };
  };
  const primeira = (cond, rotulo) => {
    const m = rows.find(cond);
    return m ? { row: m, rotulo, detalhe: `${m.condicao} · réplica ${m.replica}` } : null;
  };
  const turnos = x => x.turnos;
  const decididas = rows.filter(x => x.vencedor !== 'censurado');
  const maisCurta = decididas.length
    ? { row: decididas.reduce((a, b) => (b.turnos < a.turnos ? b : a)),
        rotulo: 'Decisão mais rápida',
        detalhe: `${decididas.reduce((a, b) => (b.turnos < a.turnos ? b : a)).turnos} turnos` }
    : null;

  return [
    maisCurta,
    porMax(turnos, 'Partida mais longa', m => `${m.turnos} turnos`),
    porMax(x => x.E1_atrito, 'Maior atrito imposto', m => `E1 ${Math.round(m.E1_atrito)}%`),
    porMax(x => x.atrito_azul, 'Maior atrito sofrido', m => `${Math.round(m.atrito_azul)}% da Força Azul`),
    primeira(x => x.vencedor === 'blue', 'Uma vitória Azul'),
    primeira(x => x.vencedor === 'red', 'Uma vitória Vermelha'),
    primeira(x => x.vencedor === 'censurado', 'Uma sem decisão'),
  ].filter(Boolean);
}

function renderSelecao(r) {
  // Atalhos
  const ns = notaveis(r);
  $('notaveis').innerHTML = ns.map((n, k) =>
    `<button type="button" class="cs-notavel" data-notavel="${k}">
       <b>${esc(n.rotulo)}</b><br><span class="cs-sd">${esc(n.detalhe)}</span>
     </button>`).join('');
  $('notaveis')._itens = ns;

  // Condição — omitida quando o lote tem uma só (pacote avulso)
  const umaSo = r.porCondicao.length === 1;
  $('campo-cond').classList.toggle('hidden', umaSo);
  $('rep-cond').innerHTML = r.porCondicao.map(c => {
    const caps = Object.keys(c.factors).filter(k => c.factors[k] >= 1).map(k => k[0]).join('') || '—';
    return `<option value="${esc(c.condicao)}">${esc(c.condicao)} — ${caps} · ${c.custo_total} EAC</option>`;
  }).join('');
  renderReplicas(r);
}

function renderReplicas(r) {
  const cond = $('rep-cond').value || r.porCondicao[0]?.condicao;
  const linhas = r.rows.filter(x => x.condicao === cond);
  const desfecho = x => (x.vencedor === 'censurado' ? 'sem decisão' : `${x.vencedor === 'blue' ? 'Azul' : 'Vermelho'} em ${x.turnos} turnos`);
  $('rep-replica').innerHTML = linhas.map(x =>
    `<option value="${x.semente}">#${x.replica} · semente ${x.semente} · ${desfecho(x)}</option>`).join('');
}

/** A linha atualmente escolhida nos dois selects. */
function linhaEscolhida(r) {
  const cond = $('rep-cond').value || r.porCondicao[0]?.condicao;
  const sem  = Number($('rep-replica').value);
  return r.rows.find(x => x.condicao === cond && x.semente === sem) || null;
}

/** Réplica mediana por turnos — "uma partida típica desta condição". */
function replicaTipica(r, condicao) {
  const linhas = r.rows.filter(x => x.condicao === condicao).slice().sort((a, b) => a.turnos - b.turnos);
  return linhas[Math.floor(linhas.length / 2)] || null;
}

function abrirReplay(row) {
  if (!row || !ultimoResultado) return;
  window.open(urlReplay(row, ultimoResultado), '_blank', 'noopener');
}

// ─── Ações ───────────────────────────────────────────────────────────────────
$('btn-run').addEventListener('click', rodar);

$('btn-csv').addEventListener('click', () => {
  if (jobAtual) window.location.href = `/api/construtivo/job/${jobAtual}/csv`;
});

// Interação com o wargame: a mesma configuração vira uma partida jogável.
$('btn-jogar').addEventListener('click', () => {
  sessionStorage.setItem('pendingAction', 'solo');
  sessionStorage.setItem('soloTeam', 'blue');
  sessionStorage.setItem('soloFactors', JSON.stringify(fatoresSelecionados()));
  const red = grupoVermelhoSelecionado();
  if (red) sessionStorage.setItem('soloRedGroups', JSON.stringify(red));
  else sessionStorage.removeItem('soloRedGroups');
  // A OB carregada vai junto: a partida solo é jogada com ela.
  if (OB_ID !== 'padrao') sessionStorage.setItem('soloObId', OB_ID);
  else sessionStorage.removeItem('soloObId');
  window.location.href = '/game';
});

$('rep-cond').addEventListener('change', () => renderReplicas(ultimoResultado));
$('btn-assistir').addEventListener('click', () => abrirReplay(linhaEscolhida(ultimoResultado)));
$('btn-link').addEventListener('click', async () => {
  const row = linhaEscolhida(ultimoResultado);
  if (!row) return;
  const url = location.origin + urlReplay(row, ultimoResultado);
  try {
    await navigator.clipboard.writeText(url);
    $('btn-link').textContent = '✓ Link copiado';
  } catch {
    // Área de transferência bloqueada (http sem TLS, permissão negada): mostrar
    // o link é melhor que falhar em silêncio.
    window.prompt('Copie o link desta partida:', url);
  }
  setTimeout(() => { $('btn-link').textContent = '🔗 Copiar link'; }, 2500);
});

// Atalhos de partidas notáveis e a coluna ▶ da tabela por condição.
document.addEventListener('click', e => {
  const at = e.target.closest('[data-notavel]');
  if (at) { abrirReplay($('notaveis')._itens?.[Number(at.dataset.notavel)]?.row); return; }
  const ver = e.target.closest('[data-ver-cond]');
  if (ver) abrirReplay(replicaTipica(ultimoResultado, ver.dataset.verCond));
});

$('bloco').addEventListener('change', atualizarPlano);
$('replicas').addEventListener('input', atualizarPlano);
$('regra').addEventListener('change', atualizarRegra);

// A OB carregada na visita anterior continua ativa, se o navegador a guardou.
{
  const ativa = LS.get('ob:ativa');
  if (ativa && obGuardada(ativa)) OB_ID = ativa;
}
carregarMeta().catch(err => mostrarErro('Não foi possível carregar a configuração: ' + err.message));
