'use strict';
// Hex grid — odd-r offset, pointy-top hexagons
const HEX_R  = 38;                         // circumradius (center → corner)
const HEX_W  = HEX_R * Math.sqrt(3);       // flat-to-flat width
const GRID_W = 14;
const GRID_H = 10;
const OX     = Math.ceil(HEX_W);           // canvas X offset (padding)
const OY     = HEX_R + 4;                  // canvas Y offset (padding)

// Canvas pixel dimensions
const CVS_W  = Math.ceil(HEX_W * (GRID_W + 0.5) + OX * 2);
const CVS_H  = Math.ceil(HEX_R * 1.5 * (GRID_H - 1) + HEX_R * 2 + OY * 2);

// ─── Coordinate conversions ──────────────────────────────────────────────────
function oddrToCube(col, row) {
  const x = col - (row - (row & 1)) / 2;
  const z = row;
  return { x, y: -x - z, z };
}
function cubeToOddr(x, z) {
  return { col: x + (z - (z & 1)) / 2, row: z };
}
const CUBE_DIRS = [
  { dx:+1,dy:-1,dz: 0 },{ dx:+1,dy: 0,dz:-1 },{ dx: 0,dy:+1,dz:-1 },
  { dx:-1,dy:+1,dz: 0 },{ dx:-1,dy: 0,dz:+1 },{ dx: 0,dy:-1,dz:+1 },
];
function hexNeighbors(col, row) {
  const c = oddrToCube(col, row);
  return CUBE_DIRS
    .map(d => cubeToOddr(c.x + d.dx, c.z + d.dz))
    .filter(({ col: nc, row: nr }) => nc >= 0 && nc < GRID_W && nr >= 0 && nr < GRID_H);
}
function hexDist(c1, r1, c2, r2) {
  const a = oddrToCube(c1, r1), b = oddrToCube(c2, r2);
  return Math.max(Math.abs(a.x-b.x), Math.abs(a.y-b.y), Math.abs(a.z-b.z));
}

// ─── Pixel ↔ Hex ─────────────────────────────────────────────────────────────
function hexToPixel(col, row) {
  return {
    x: HEX_W * (col + 0.5 * (row & 1)) + OX,
    y: HEX_R * 1.5 * row + OY,
  };
}
function pixelToHex(px, py) {
  const row = Math.round((py - OY) / (HEX_R * 1.5));
  const col = Math.round((px - OX - 0.5 * (row & 1) * HEX_W) / HEX_W);
  // Refine by checking all candidates
  let best = { col, row }, bestD = Infinity;
  for (const cand of [{ col, row }, ...hexNeighbors(Math.max(0,Math.min(GRID_W-1,col)), Math.max(0,Math.min(GRID_H-1,row)))]) {
    const { x, y } = hexToPixel(cand.col, cand.row);
    const d = (px - x) ** 2 + (py - y) ** 2;
    if (d < bestD) { bestD = d; best = cand; }
  }
  return best;
}

// ─── Reachable hexes (BFS, ignores occupied) ─────────────────────────────────
function hexesInRange(col, row, range) {
  const seen = new Set([`${col},${row}`]);
  const out  = [];
  let frontier = [{ col, row }];
  for (let d = 0; d < range; d++) {
    const next = [];
    for (const h of frontier) {
      for (const nb of hexNeighbors(h.col, h.row)) {
        const k = `${nb.col},${nb.row}`;
        if (!seen.has(k)) { seen.add(k); out.push(nb); next.push(nb); }
      }
    }
    frontier = next;
  }
  return out;
}

// ─── Drawing helpers ──────────────────────────────────────────────────────────
function drawHex(ctx, cx, cy, fill, stroke, lw = 1) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;   // pointy-top, first corner at top
    const vx = cx + HEX_R * Math.cos(a);
    const vy = cy + HEX_R * Math.sin(a);
    i === 0 ? ctx.moveTo(vx, vy) : ctx.lineTo(vx, vy);
  }
  ctx.closePath();
  if (fill)   { ctx.fillStyle   = fill;   ctx.fill();   }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
}

function hexLabel(col) { return String.fromCharCode(65 + col); }
