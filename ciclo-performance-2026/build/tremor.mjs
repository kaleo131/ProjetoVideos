// "Tremor de mão" vetorial: reamostra o caminho SVG e aplica uma ondulação suave
// (perpendicular ao traço), devolvendo curvas Bézier lisas. Sem filtros de pixel = sem serrilhado.
// Suporta os comandos absolutos usados no projeto: M L H V Q C A Z.

function arcPts(x1, y1, rx, ry, phi, fa, fs, x2, y2) {
  const rad = phi * Math.PI / 180, cos = Math.cos(rad), sin = Math.sin(rad);
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
  const x1p = cos * dx + sin * dy, y1p = -sin * dx + cos * dy;
  rx = Math.abs(rx); ry = Math.abs(ry);
  const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
  let num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  num = Math.max(0, num);
  let co = Math.sqrt(num / (rx * rx * y1p * y1p + ry * ry * x1p * x1p)) * (fa === fs ? -1 : 1);
  const cxp = co * rx * y1p / ry, cyp = -co * ry * x1p / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2, cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  const ang = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const t1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  let dt = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!fs && dt > 0) dt -= 2 * Math.PI; else if (fs && dt < 0) dt += 2 * Math.PI;
  return t => { const a = t1 + dt * t; return [cx + rx * Math.cos(a) * cos - ry * Math.sin(a) * sin, cy + rx * Math.cos(a) * sin + ry * Math.sin(a) * cos]; };
}

// devolve lista de subcaminhos: { pts: [[x,y]...], closed }
function amostrar(d, passo = 10) {
  const tk = d.match(/[MLHVQCAZmlhvqcaz]|-?\d*\.?\d+(?:e-?\d+)?/g);
  const subs = []; let cur = null, x = 0, y = 0, sx = 0, sy = 0, i = 0, cmd = '';
  const num = () => +tk[i++];
  const seg = (f, L) => { const n = Math.max(2, Math.ceil(L / passo)); for (let k = 1; k <= n; k++) cur.pts.push(f(k / n)); };
  while (i < tk.length) {
    if (/[A-Za-z]/.test(tk[i])) cmd = tk[i++];
    if (cmd === 'M') { x = num(); y = num(); sx = x; sy = y; cur = { pts: [[x, y]], closed: false }; subs.push(cur); cmd = 'L'; continue; }
    if (cmd === 'Z' || cmd === 'z') { if (cur) { cur.closed = true; const [a, b] = [x, y]; seg(t => [a + (sx - a) * t, b + (sy - b) * t], Math.hypot(sx - a, sy - b)); } x = sx; y = sy; cmd = ''; continue; }
    let nx, ny;
    if (cmd === 'L' || cmd === 'H' || cmd === 'V') {
      nx = cmd === 'V' ? x : num(); ny = cmd === 'H' ? y : (cmd === 'V' ? num() : num());
      const [a, b] = [x, y]; seg(t => [a + (nx - a) * t, b + (ny - b) * t], Math.hypot(nx - a, ny - b));
    } else if (cmd === 'Q') {
      const qx = num(), qy = num(); nx = num(); ny = num(); const [a, b] = [x, y];
      seg(t => [(1 - t) ** 2 * a + 2 * (1 - t) * t * qx + t * t * nx, (1 - t) ** 2 * b + 2 * (1 - t) * t * qy + t * t * ny], Math.hypot(qx - a, qy - b) + Math.hypot(nx - qx, ny - qy));
    } else if (cmd === 'C') {
      const c1x = num(), c1y = num(), c2x = num(), c2y = num(); nx = num(); ny = num(); const [a, b] = [x, y];
      const B = (p0, p1, p2, p3, t) => (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t * t * p2 + t ** 3 * p3;
      seg(t => [B(a, c1x, c2x, nx, t), B(b, c1y, c2y, ny, t)], Math.hypot(c1x - a, c1y - b) + Math.hypot(c2x - c1x, c2y - c1y) + Math.hypot(nx - c2x, ny - c2y));
    } else if (cmd === 'A') {
      const rx = num(), ry = num(), ph = num(), fa = num(), fs = num(); nx = num(); ny = num();
      const f = arcPts(x, y, rx, ry, ph, fa, fs, nx, ny);
      const L = Math.hypot(nx - x, ny - y) + Math.PI * Math.max(rx, ry) * (fa ? 1.5 : 0.6);
      seg(f, L);
    } else { i++; continue; }
    x = nx; y = ny;
  }
  return subs;
}

// ruído suave determinístico ao longo do comprimento
function ruido(seed) {
  const r = k => { const v = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
  const f1 = 1 / (40 + 30 * r(1)), f2 = 1 / (110 + 60 * r(2)), p1 = r(3) * 6.28, p2 = r(4) * 6.28;
  return s => 0.65 * Math.sin(s * f1 + p1) + 0.35 * Math.sin(s * f2 + p2);
}

// Catmull-Rom -> Bézier cúbica
function suave(pts, closed) {
  const r2 = n => Math.round(n * 10) / 10;
  const P = closed ? pts.slice(0, -1) : pts, n = P.length;
  if (n < 2) return '';
  const g = k => closed ? P[(k + n) % n] : P[Math.max(0, Math.min(n - 1, k))];
  let d = `M${r2(P[0][0])},${r2(P[0][1])}`;
  const last = closed ? n : n - 1;
  for (let k = 0; k < last; k++) {
    const p0 = g(k - 1), p1 = g(k), p2 = g(k + 1), p3 = g(k + 2);
    d += ` C${r2(p1[0] + (p2[0] - p0[0]) / 6)},${r2(p1[1] + (p2[1] - p0[1]) / 6)} ${r2(p2[0] - (p3[0] - p1[0]) / 6)},${r2(p2[1] - (p3[1] - p1[1]) / 6)} ${r2(p2[0])},${r2(p2[1])}`;
  }
  return d + (closed ? ' Z' : '');
}

export function tremor(d, amp = 1.8, seed = 1) {
  return amostrar(d).map((sub, j) => {
    const n = ruido(seed * 7 + j), pts = sub.pts;
    let s = 0;
    const out = pts.map((p, k) => {
      if (k) s += Math.hypot(p[0] - pts[k - 1][0], p[1] - pts[k - 1][1]);
      const a = pts[Math.max(0, k - 1)], b = pts[Math.min(pts.length - 1, k + 1)];
      let nx = -(b[1] - a[1]), ny = b[0] - a[0]; const L = Math.hypot(nx, ny) || 1; nx /= L; ny /= L;
      const w = amp * n(s);
      return [p[0] + nx * w, p[1] + ny * w];
    });
    if (sub.closed) out[out.length - 1] = out[0];
    return suave(out, sub.closed);
  }).join(' ');
}
