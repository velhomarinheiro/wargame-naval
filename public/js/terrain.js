'use strict';

// ─── Terrain type constants ──────────────────────────────────────────────────
const T_LAND    = 0;  // Área Terrestre — impassável
const T_SHALLOW = 1;  // Águas Rasas < 200m — navios ok, submarinos não
const T_SHELF   = 2;  // Plataforma Continental
const T_DEEP    = 3;  // Águas Profundas — bônus de furtividade para subs
const T_OIL     = 4;  // Bacia Petrolífera — objetivo estratégico

// ─── 14 colunas × 10 linhas (col = O→L, row = N→S) ─────────────────────────
//   Baseado na Carta Náutica OAS-MAP-001 (~19°S a ~30°S / ~39°W a ~52°W)
//
//   col:  0  1  2  3  4  5  6  7  8  9 10 11 12 13
const TERRAIN_MAP = [
  [0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],  // row 0  ~19°S  Vitória / ES
  [0, 0, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],  // row 1
  [0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3],  // row 2         Vitória / Campos
  [0, 0, 1, 2, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3],  // row 3  ~22°S  Bacia de Campos  ★ PLT
  [0, 0, 1, 1, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],  // row 4         Rio de Janeiro
  [0, 0, 1, 1, 2, 4, 3, 3, 3, 3, 3, 3, 3, 3],  // row 5  ~24°S  Santos / RJ       ★ PLT
  [0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3],  // row 6         São Paulo
  [0, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],  // row 7
  [0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],  // row 8
  [0, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],  // row 9  ~30°S  Sul
];

// ─── Cores — sem imagem de fundo (sólidas) ───────────────────────────────────
const T_COLOR_SOLID = {
  [T_LAND]:    '#c8a15a',
  [T_SHALLOW]: '#3aadcc',
  [T_SHELF]:   '#1e72a0',
  [T_DEEP]:    '#0d3c68',
  [T_OIL]:     '#c07820',
};

// ─── Cores — sobreposição sobre o mapa (semi-transparentes) ──────────────────
const T_COLOR_OVERLAY = {
  [T_LAND]:    'rgba(200, 161, 90, 0.55)',
  [T_SHALLOW]: 'rgba(58, 173, 204, 0.38)',
  [T_SHELF]:   'rgba(30, 114, 160, 0.28)',
  [T_DEEP]:    'rgba(13,  60, 104, 0.18)',
  [T_OIL]:     'rgba(192, 120,  32, 0.52)',
};

// ─── Border colors per terrain (grid lines) ───────────────────────────────────
const T_BORDER = {
  [T_LAND]:    'rgba(140, 100, 40, 0.45)',
  [T_SHALLOW]: 'rgba(80, 180, 210, 0.35)',
  [T_SHELF]:   'rgba(50, 140, 190, 0.30)',
  [T_DEEP]:    'rgba(60, 120, 180, 0.22)',
  [T_OIL]:     'rgba(210, 140, 40, 0.50)',
};

// ─── Terrain names (for tooltip) ─────────────────────────────────────────────
const T_NAME = {
  [T_LAND]:    'Área Terrestre',
  [T_SHALLOW]: 'Águas Rasas (<200m)',
  [T_SHELF]:   'Plataforma Continental',
  [T_DEEP]:    'Águas Profundas',
  [T_OIL]:     'Bacia Petrolífera',
};

// ─── Infrastructure ──────────────────────────────────────────────────────────
//  type: 'naval' | 'port' | 'aero' | 'oil'
//  drawn on the hex (even if on land col) for visual reference
const INFRA = [
  { col: 1, row: 0, type: 'naval', label: '✛', name: 'BN Vitória'          },
  { col: 1, row: 2, type: 'naval', label: '✛', name: 'BN Rio de Janeiro'    },
  { col: 1, row: 3, type: 'port',  label: '⚓', name: 'Porto do Rio'         },
  { col: 1, row: 4, type: 'aero',  label: '✈', name: 'BA Galeão'            },
  { col: 1, row: 5, type: 'port',  label: '⚓', name: 'Porto de Santos'      },
  { col: 1, row: 5, type: 'aero',  label: '✈', name: 'BA Guaratinguetá'     },
  { col: 3, row: 3, type: 'oil',   label: '▲', name: 'PLT-Campos'           },
  { col: 4, row: 3, type: 'oil',   label: '▲', name: 'PLT-Campos 2'         },
  { col: 4, row: 5, type: 'oil',   label: '▲', name: 'PLT-Santos'           },
  { col: 5, row: 5, type: 'oil',   label: '▲', name: 'PLT-Santos 2'         },
];

// ─── Movement rules ───────────────────────────────────────────────────────────
function canEnterTerrain(unitType, terrain) {
  if (terrain === T_LAND) return false;
  // Helicopters and patrol aircraft fly over everything (including land)
  if (unitType === 'helicoptero' || unitType === 'patrulha') return true;
  // Submarines can't navigate shallow waters
  if (unitType === 'submarino' && terrain === T_SHALLOW) return false;
  return true;
}
