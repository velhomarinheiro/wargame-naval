'use strict';

const UNIT_DEFS = {
  fragata:     { name: 'Fragata',           abbr: 'FR', hp: 4, mov: 3, detect: 4, subDetect: 2, atkRange: 3, atkPower: 4 },
  destroier:   { name: 'Destróier',         abbr: 'DE', hp: 5, mov: 4, detect: 4, subDetect: 3, atkRange: 4, atkPower: 5 },
  corveta:     { name: 'Corveta',           abbr: 'CO', hp: 3, mov: 3, detect: 3, subDetect: 3, atkRange: 3, atkPower: 3 },
  submarino:   { name: 'Submarino',         abbr: 'SB', hp: 3, mov: 3, detect: 3, subDetect: 2, atkRange: 4, atkPower: 5, stealthy: true },
  helicoptero: { name: 'Helicóptero ASW',   abbr: 'HE', hp: 2, mov: 5, detect: 4, subDetect: 5, atkRange: 3, atkPower: 3 },
  patrulha:    { name: 'Patrulha Marítima', abbr: 'PA', hp: 2, mov: 7, detect: 7, subDetect: 6, atkRange: 5, atkPower: 4 },
};

function drawUnitCounter(ctx, unit, cx, cy, selected) {
  const isBlue = unit.team === 'blue';
  const bg     = isBlue ? '#0c2d5a' : '#5a0c0c';
  const border = isBlue ? '#82b1ff' : '#ff8a80';
  const R      = HEX_R * 0.50;
  const top    = cy - R * 0.72;

  if (selected) { ctx.shadowColor = '#ffd700'; ctx.shadowBlur = 14; }

  ctx.fillStyle   = bg;
  ctx.strokeStyle = selected ? '#ffd700' : border;
  ctx.lineWidth   = selected ? 2.5 : 1.5;
  roundRect(ctx, cx - R, top, R * 2, R * 1.44, 4);
  ctx.fill(); ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.save();
  drawPlatformSilhouette(ctx, unit.type, cx, top + R * 0.68, R * 0.90, border);
  ctx.restore();

  const hpFrac = unit.hp / unit.maxHp;
  const bw = R * 2 - 4, bh = 3;
  const bx = cx - R + 2, by = top + R * 1.44 + 2;
  ctx.fillStyle = '#050d15';
  ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = hpFrac > 0.6 ? '#69f0ae' : hpFrac > 0.3 ? '#ffca28' : '#ff5252';
  ctx.fillRect(bx, by, bw * hpFrac, bh);
}

function drawPlatformSilhouette(ctx, type, cx, cy, sz, color) {
  ctx.fillStyle   = color;
  ctx.strokeStyle = color;
  switch (type) {
    case 'corveta':     drawShipShape(ctx, cx, cy, sz, 0.40, 0.48); break;
    case 'fragata':     drawShipShape(ctx, cx, cy, sz, 0.48, 0.52); break;
    case 'destroier':   drawShipShape(ctx, cx, cy, sz, 0.56, 0.56); break;
    case 'submarino':   drawSubShape(ctx, cx, cy, sz); break;
    case 'helicoptero': drawHelicopterShape(ctx, cx, cy, sz); break;
    case 'patrulha':    drawAircraftShape(ctx, cx, cy, sz); break;
  }
}

// Top-down ship hull, bow pointing up; hw/hh are half-width/height fractions
function drawShipShape(ctx, cx, cy, sz, hw, hh) {
  const w = sz * hw, h = sz * hh;
  ctx.beginPath();
  ctx.moveTo(cx,          cy - h);
  ctx.lineTo(cx + w,      cy - h * 0.15);
  ctx.lineTo(cx + w * 0.88, cy + h);
  ctx.lineTo(cx - w * 0.88, cy + h);
  ctx.lineTo(cx - w,      cy - h * 0.15);
  ctx.closePath();
  ctx.fill();
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.40)';
  ctx.fillRect(cx - w * 0.40, cy - h * 0.05, w * 0.80, h * 0.55);
  ctx.restore();
}

// Top-down submarine: horizontal torpedo ellipse + conning tower bump
function drawSubShape(ctx, cx, cy, sz) {
  ctx.beginPath();
  ctx.ellipse(cx, cy, sz * 0.56, sz * 0.20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.50)';
  ctx.fillRect(cx - sz * 0.08, cy - sz * 0.20 - sz * 0.12, sz * 0.16, sz * 0.14);
  ctx.restore();
}

// Helicopter: main rotor cross + fuselage oval + tail boom + tail rotor
function drawHelicopterShape(ctx, cx, cy, sz) {
  const blade = sz * 0.52;
  ctx.lineWidth = Math.max(1.5, sz * 0.08);
  ctx.beginPath();
  ctx.moveTo(cx - blade, cy); ctx.lineTo(cx + blade, cy);
  ctx.moveTo(cx, cy - blade); ctx.lineTo(cx, cy + blade);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, sz * 0.13, sz * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = Math.max(1, sz * 0.06);
  ctx.beginPath();
  ctx.moveTo(cx, cy + sz * 0.22);
  ctx.lineTo(cx, cy + sz * 0.50);
  ctx.stroke();
  ctx.lineWidth = Math.max(1, sz * 0.05);
  ctx.beginPath();
  ctx.moveTo(cx - sz * 0.11, cy + sz * 0.50);
  ctx.lineTo(cx + sz * 0.11, cy + sz * 0.50);
  ctx.stroke();
}

// Fixed-wing maritime patrol aircraft: fuselage + swept wings + tail fin
function drawAircraftShape(ctx, cx, cy, sz) {
  ctx.beginPath();
  ctx.ellipse(cx, cy, sz * 0.10, sz * 0.48, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx,              cy - sz * 0.04);
  ctx.lineTo(cx + sz * 0.50,  cy + sz * 0.16);
  ctx.lineTo(cx + sz * 0.46,  cy + sz * 0.28);
  ctx.lineTo(cx,              cy + sz * 0.13);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx,              cy - sz * 0.04);
  ctx.lineTo(cx - sz * 0.50,  cy + sz * 0.16);
  ctx.lineTo(cx - sz * 0.46,  cy + sz * 0.28);
  ctx.lineTo(cx,              cy + sz * 0.13);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx,              cy + sz * 0.38);
  ctx.lineTo(cx + sz * 0.14,  cy + sz * 0.48);
  ctx.lineTo(cx - sz * 0.14,  cy + sz * 0.48);
  ctx.closePath(); ctx.fill();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h,     x, y + h - r);
  ctx.lineTo(x, y + r);     ctx.quadraticCurveTo(x, y,         x + r, y);
  ctx.closePath();
}
