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
let estado = {};          // chave do fator -> true/false
let jobAtual = null;
let ultimoResultado = null;

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

// ─── 1. Pacote ───────────────────────────────────────────────────────────────
async function carregarMeta() {
  const res = await fetch('/api/construtivo/meta');
  META = await res.json();
  for (const f of META.fatores) estado[f.chave] = true;
  renderFatores();
  atualizarTotais();
  atualizarPlano();
  atualizarRegra();
}

function renderFatores() {
  $('fatores').innerHTML = META.fatores.map(f => `
    <label class="cs-factor ${estado[f.chave] ? 'on' : 'off'}" data-fator="${f.chave}">
      <input type="checkbox" ${estado[f.chave] ? 'checked' : ''} data-chk="${f.chave}">
      <span class="cs-factor-mark" aria-hidden="true"></span>
      <span class="cs-factor-body">
        <span class="cs-factor-top">
          <span class="cs-factor-label">${esc(f.rotulo)}</span>
          <span class="cs-factor-cost">${f.custo} EAC</span>
        </span>
        <span class="cs-factor-units">${f.unidades.map(u => esc(u.nome)).join(' · ')}</span>
      </span>
    </label>`).join('');
}

function atualizarTotais() {
  const ativos = META.fatores.filter(f => estado[f.chave]);
  const custo  = ativos.reduce((s, f) => s + f.custo, 0);
  $('custo').textContent   = custo;
  $('n-caps').textContent  = ativos.length;
  $('custo-pct').textContent = `${Math.round(100 * custo / META.custoTotal)}% do total (${META.custoTotal} EAC)`;
  const fora = META.fatores.filter(f => !estado[f.chave]).flatMap(f => f.unidades);
  $('unidades-fora').textContent = fora.length
    ? `${fora.length} unidade(s) fora: ${fora.map(u => u.nome).join(', ')}`
    : 'ordem de batalha completa';
}

document.addEventListener('change', e => {
  const chk = e.target.closest('[data-chk]');
  if (chk) {
    estado[chk.dataset.chk] = chk.checked;
    chk.closest('.cs-factor').classList.toggle('on', chk.checked);
    chk.closest('.cs-factor').classList.toggle('off', !chk.checked);
    atualizarTotais();
    return;
  }
  if (e.target.closest('#bloco, #replicas')) atualizarPlano();
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

function fatoresSelecionados() {
  const f = {};
  for (const k of Object.keys(estado)) f[k] = estado[k] ? 1 : -1;
  return f;
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

  $('erro').classList.add('hidden');
  $('btn-run').disabled = true;
  $('progresso').classList.remove('hidden');
  atualizarProgresso(0, 1, null);

  try {
    const res = await fetch('/api/construtivo/run', {
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
         `${r.porCondicao.length} condição(ões) · limite de ${r.maxTurns} turnos<br>vitória por ${regra}`) +
    tile('Vitórias da Força Azul', v.blue || 0, pc(v.blue || 0)) +
    tile('Vitórias da Força Vermelha', v.red || 0, pc(v.red || 0)) +
    tile('Sem decisão', v.censurado || 0, `${pc(v.censurado || 0)} · atingiram o limite de turnos`);

  renderTabela(r);
  renderHeatmaps(r);
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
  window.location.href = '/game';
});

$('bloco').addEventListener('change', atualizarPlano);
$('replicas').addEventListener('input', atualizarPlano);
$('regra').addEventListener('change', atualizarRegra);

carregarMeta().catch(err => mostrarErro('Não foi possível carregar a configuração: ' + err.message));
