'use strict';
// Unit definitions (client mirror of server)
const UNIT_DEFS = {
  fragata:     { name: 'Fragata',           abbr: 'FR', hp: 4, mov: 3, detect: 4, subDetect: 2, atkRange: 3, atkPower: 4 },
  destroier:   { name: 'Destróier',         abbr: 'DE', hp: 5, mov: 4, detect: 4, subDetect: 3, atkRange: 4, atkPower: 5 },
  corveta:     { name: 'Corveta',           abbr: 'CO', hp: 3, mov: 3, detect: 3, subDetect: 3, atkRange: 3, atkPower: 3 },
  submarino:   { name: 'Submarino',         abbr: 'SB', hp: 3, mov: 3, detect: 3, subDetect: 2, atkRange: 4, atkPower: 5, stealthy: true },
  helicoptero: { name: 'Helicóptero ASW',   abbr: 'HE', hp: 2, mov: 5, detect: 4, subDetect: 5, atkRange: 3, atkPower: 3 },
  patrulha:    { name: 'Patrulha Marítima', abbr: 'PA', hp: 2, mov: 7, detect: 7, subDetect: 6, atkRange: 5, atkPower: 4 },
};

// Draw a unit counter in the classic wargame style
function drawUnitCounter(ctx, unit, cx, cy, selected) {
  const isBlue = unit.team === 'blue';
  const fill   = isBlue ? '#0d47a1' : '#b71c1c';
  const border = isBlue ? '#82b1ff' : '#ff8a80';
  const R      = HEX_R * 0.50;
  const top    = cy - R * 0.72;

  // Selection glow
  if (selected) {
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur  = 14;
  }

  // Counter background (rounded rectangle)
  ctx.fillStyle   = fill;
  ctx.strokeStyle = selected ? '#ffd700' : border;
  ctx.lineWidth   = selected ? 2.5 : 1.5;
  roundRect(ctx, cx - R, top, R * 2, R * 1.44, 4);
  ctx.fill(); ctx.stroke();

  ctx.shadowBlur = 0;

  // NATO-style unit symbol
  const def = UNIT_DEFS[unit.type];
  drawNATOSymbol(ctx, unit.type, cx, top + R * 0.44, R * 0.9, border);

  // Abbreviation label (bottom of counter)
  ctx.fillStyle    = border;
  ctx.font         = `bold ${Math.round(R * 0.42)}px 'Courier New', monospace`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(def.abbr, cx, top + R * 1.15);

  // HP bar
  const hpFrac = unit.hp / unit.maxHp;
  const bw     = R * 2 - 4, bh = 3;
  const bx     = cx - R + 2,  by = top + R * 1.44 + 2;
  ctx.fillStyle = '#111';
  ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = hpFrac > 0.6 ? '#69f0ae' : hpFrac > 0.3 ? '#ffca28' : '#ff5252';
  ctx.fillRect(bx, by, bw * hpFrac, bh);
}

function drawNATOSymbol(ctx, type, cx, cy, size, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle   = 'transparent';
  ctx.lineWidth   = 1.5;

  switch (type) {
    case 'fragata': case 'destroier': case 'corveta':
      // Surface ship: box with horizontal line
      ctx.strokeRect(cx - size * 0.55, cy - size * 0.32, size * 1.1, size * 0.64);
      ctx.beginPath(); ctx.moveTo(cx - size * 0.55, cy); ctx.lineTo(cx + size * 0.55, cy); ctx.stroke();
      break;
    case 'submarino':
      // Submarine: dashed oval / wave under box
      ctx.strokeRect(cx - size * 0.55, cy - size * 0.32, size * 1.1, size * 0.64);
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(cx - size * 0.55, cy + size * 0.42); ctx.lineTo(cx + size * 0.55, cy + size * 0.42); ctx.stroke();
      ctx.setLineDash([]);
      break;
    case 'helicoptero':
      // Rotary-wing: filled circle + rotor cross
      ctx.beginPath(); ctx.arc(cx, cy, size * 0.38, 0, Math.PI * 2); ctx.strokeStyle = color; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.52, cy); ctx.lineTo(cx + size * 0.52, cy);
      ctx.moveTo(cx, cy - size * 0.52); ctx.lineTo(cx, cy + size * 0.52);
      ctx.stroke();
      break;
    case 'patrulha':
      // Fixed-wing: triangle (plan view)
      ctx.beginPath();
      ctx.moveTo(cx, cy - size * 0.48);
      ctx.lineTo(cx + size * 0.55, cy + size * 0.38);
      ctx.lineTo(cx - size * 0.55, cy + size * 0.38);
      ctx.closePath(); ctx.stroke();
      break;
  }
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
