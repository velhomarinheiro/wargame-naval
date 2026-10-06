'use strict';

/**
 * ob_xlsx_worker.js — Lê uma planilha de OB fora da thread principal.
 *
 * O arquivo vem do usuário. Mesmo depois da conferência do zip, um .xlsx
 * malicioso pode estourar memória ou CPU dentro do exceljs. Aqui isso derruba
 * só este worker (criado com limite de memória e morto por tempo — ver
 * lerPlanilhaIsolada), e não as salas de jogo e os lotes do servidor.
 */

const { parentPort, workerData } = require('worker_threads');
const { lerPlanilha } = require('./ob_spreadsheet');

lerPlanilha(Buffer.from(workerData))
  .then(r => parentPort.postMessage({ ok: true, r }))
  .catch(err => parentPort.postMessage({ ok: false, erro: String(err?.message || err) }));
