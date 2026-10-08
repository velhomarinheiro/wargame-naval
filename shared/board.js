'use strict';

/**
 * board.js — Tabuleiro e tipos de plataforma, compartilhados pelo servidor e
 * pelo validador de ordens de batalha carregadas de planilha.
 *
 * Saíram de server.js sem mudança: o validador (shared/scenario.js) precisa
 * recusar uma unidade posta em terreno impossível e uma composição de tipo
 * desconhecido, e nada em shared/ pode requerer server.js.
 */

// Grade 20×10, hexágonos odd-q (espelho de public/js/terrain.js).
const GRID_W = 20;
const GRID_H = 10;

const T_LAND = 0, T_SHALLOW = 1, T_SHELF = 2, T_DEEP = 3, T_OIL = 4;
const TERRAIN_MAP = [
  [0,0,0,0,0,0,1,2,3,3,3,3,3,3,3,3,3,3,3,3],
  [0,0,0,0,0,1,1,2,3,3,3,3,3,3,3,3,3,3,3,3],
  [0,0,0,0,1,1,2,4,3,3,3,3,3,3,3,3,3,3,3,3],
  [0,0,0,1,1,2,4,4,3,3,3,3,3,3,3,3,3,3,3,3],
  [0,0,1,1,2,4,4,2,3,3,3,3,3,3,3,3,3,3,3,3],
  [0,1,1,2,4,4,2,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [1,1,2,4,4,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [1,2,2,4,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [1,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [1,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
];
const TERRAIN_NAMES = {
  [T_LAND]: 'terra', [T_SHALLOW]: 'águas rasas', [T_SHELF]: 'plataforma continental',
  [T_DEEP]: 'águas profundas', [T_OIL]: 'bacia petrolífera',
};

function getTerrain(col, row) {
  if (row < 0 || row >= GRID_H || col < 0 || col >= GRID_W) return T_LAND;
  return TERRAIN_MAP[row][col];
}
function canEnterTerrain(category, terrain) {
  if (category === 'air' || category === 'specops') return true;
  if (category === 'land')      return terrain === T_LAND || terrain === T_SHALLOW;
  if (category === 'submarine') return terrain !== T_LAND && terrain !== T_SHALLOW;
  return terrain !== T_LAND; // surface
}

// Tipo de composição (o 1º item de `composition`) → tipo de plataforma exibido.
// O tipo dirige o comportamento do bot (botIsCombatant, botGenericPrio) e o
// modelo de combustível — é por isso que a ordem da composição importa.
const COMP_DISPLAY_TYPE = {
  'operacoes_especiais':   'specops',
  'navio_aeródromo':       'carrier',
  'navio_doca':            'amphib',
  'navio_desembarque':     'amphib',
  'fragata':               'fragata',
  'corveta':               'corveta',
  'destroier':             'destroier',
  'destroyer':             'destroier',
  'cruzador':              'cruzador',
  'navio_patoc':           'patrulha_oc',
  'navio_patrulha':        'patrulha_c',
  'navio_logistico':       'logistico',
  'navio_tanque':          'tanque',
  'submarino_nuclear':     'sub_nuclear',
  'submarino_convencional':'submarino',
  'patrulha_maritima':     'patrulha',
  'caca':                  'caca',
  'ataque':                'ataque',
  'aew':                   'aew',
  'helicoptero_ASW':       'helicoptero',
  'helicoptero_ASup':      'helicoptero',
  'bateria_costeira':      'bateria_costeira',
  'bateria_ada':           'bateria_ada',
  'base_naval':            'bateria_ada',
  'plataforma':            'fpso',
  'porto':                 'porto',
  'aeroporto':             'aeroporto',
};
const DISPLAY_TYPE_FALLBACK = { surface: 'fragata', submarine: 'submarino', air: 'patrulha', land: 'corveta', specops: 'specops' };

module.exports = {
  GRID_W, GRID_H,
  T_LAND, T_SHALLOW, T_SHELF, T_DEEP, T_OIL,
  TERRAIN_MAP, TERRAIN_NAMES, getTerrain, canEnterTerrain,
  COMP_DISPLAY_TYPE, DISPLAY_TYPE_FALLBACK,
};
