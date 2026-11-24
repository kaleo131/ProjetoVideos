// Gera o HTML de cada cena no estilo "quadro branco profissional":
// traço de tinta limpo (com leve tremor de mão via filtro), preenchimento de marcador
// nas cores da marca deslocado do contorno, e texto em Figtree escrito da esquerda para a direita.
//
// Todos os tempos passados para a API são do VÍDEO (segundos da narração), não da cena.
// A cena converte sozinha (t - início da cena).
//
// Camadas (de baixo para cima): marcador (preenchimentos) > tinta (contornos e textos) > imagens > caneta.

export const C = {
  blue: '#1A35E6', dark: '#082381', green: '#30C7B2', gray: '#E7EAF0', white: '#FCFCFC',
  ink: '#1B1F3B', soft: '#4A5578', skin: '#F3D2B5', red: '#D9534F', yellow: '#FFD873',
};
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const r2 = n => Math.round(n * 100) / 100;

// ---------- geometria ----------
export const G = {
  rect: (x, y, w, h, r = 0) => r
    ? `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`
    : `M${x},${y} H${x + w} V${y + h} H${x} Z`,
  circle: (cx, cy, r) => `M${cx},${cy - r} A${r},${r} 0 1,1 ${cx - 0.01},${cy - r} Z`,
  line: (x1, y1, x2, y2) => `M${x1},${y1} L${x2},${y2}`,
  // ponto no círculo, ângulo em graus a partir das 12h no sentido horário
  pol: (cx, cy, r, deg) => [cx + r * Math.sin(deg * Math.PI / 180), cy - r * Math.cos(deg * Math.PI / 180)],
  // fatia de rosca de a0 a a1 (graus, 12h = 0, horário)
  slice(cx, cy, R, r, a0, a1) {
    const [x0, y0] = G.pol(cx, cy, R, a0), [x1, y1] = G.pol(cx, cy, R, a1);
    const [x2, y2] = G.pol(cx, cy, r, a1), [x3, y3] = G.pol(cx, cy, r, a0);
    const big = a1 - a0 > 180 ? 1 : 0;
    return `M${r2(x0)},${r2(y0)} A${R},${R} 0 ${big},1 ${r2(x1)},${r2(y1)} L${r2(x2)},${r2(y2)} A${r},${r} 0 ${big},0 ${r2(x3)},${r2(y3)} Z`;
  },
  arc(cx, cy, R, a0, a1) {
    const [x0, y0] = G.pol(cx, cy, R, a0), [x1, y1] = G.pol(cx, cy, R, a1);
    return `M${r2(x0)},${r2(y0)} A${R},${R} 0 ${a1 - a0 > 180 ? 1 : 0},1 ${r2(x1)},${r2(y1)}`;
  },
  // seta: curva de (x1,y1) a (x2,y2) com barriga "bend"; devolve [corpo, ponta]
  arrow(x1, y1, x2, y2, bend = 0.2, head = 18) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
    const cx = mx - dy * bend, cy = my + dx * bend;
    const ang = Math.atan2(y2 - cy, x2 - cx), a1 = ang + Math.PI * 0.82, a2 = ang - Math.PI * 0.82;
    return [
      `M${r2(x1)},${r2(y1)} Q${r2(cx)},${r2(cy)} ${r2(x2)},${r2(y2)}`,
      `M${r2(x2 + head * Math.cos(a1))},${r2(y2 + head * Math.sin(a1))} L${r2(x2)},${r2(y2)} L${r2(x2 + head * Math.cos(a2))},${r2(y2 + head * Math.sin(a2))}`,
    ];
  },
  check: (x, y, s = 1) => `M${x - 22 * s},${y} L${x - 6 * s},${y + 18 * s} L${x + 26 * s},${y - 22 * s}`,
  cross: (x, y, s = 1) => [`M${x - 20 * s},${y - 20 * s} L${x + 20 * s},${y + 20 * s}`, `M${x + 20 * s},${y - 20 * s} L${x - 20 * s},${y + 20 * s}`],
};

export function makeScene(id, start, dur) {
  const P = `${id}-`;
  const layers = { mk: [], ink: [], img: [] };
  let n = 0;
  const T = t => r2(t - start);
  const attrs = (kind, t, d, o) =>
    `id="${P}e${n++}" class="hd" data-kind="${kind}" data-t="${T(t)}" data-d="${r2(d)}"` +
    (o.out != null ? ` data-out="${T(o.out)}"` : '') +
    (o.nopen ? ' data-nopen="1"' : '') +
    (o.pulse ? ` data-pulse="${[].concat(o.pulse).map(T).join(',')}"` : '') +
    (o.tf ? ` transform="${o.tf}"` : '');

  const api = {
    C, G,
    // contorno de tinta: d = string ou lista de paths (desenhados em sequência no tempo d)
    ink(d, o = {}, t = 0, du = 0.8) {
      const ds = [].concat(d);
      let s = `<g ${attrs('stroke', t, du, o)}>`;
      ds.forEach(p => { s += `<path class="stk" pathLength="1" d="${p}" fill="none" stroke="${o.color || C.ink}" stroke-width="${o.sw || 5}" stroke-linecap="round" stroke-linejoin="round"/>`; });
      layers.ink.push(s + '</g>');
    },
    // preenchimento de marcador (pinta da esquerda p/ direita ou de baixo p/ cima)
    fill(d, color, o = {}, t = 0, du = 0.6) {
      const off = o.off ?? [6, 6];
      const dir = o.dir || 'x';
      layers.mk.push(`<g ${attrs('fill', t, du, o)} data-dir="${dir}"><path d="${d}" fill="${color}" transform="translate(${off[0]},${off[1]})" opacity="${o.op ?? 1}"/></g>`);
    },
    // forma completa: contorno + preenchimento logo depois
    shape(d, color, o = {}, t = 0, du = 0.8) {
      api.ink(d, o, t, du);
      if (color) api.fill([].concat(d)[0], color, { ...o, tf: o.tf }, t + du * 0.7, o.fd || 0.5);
    },
    // texto escrito à mão (revelado da esquerda p/ direita, caneta acompanha)
    txt(x, y, s, o = {}, t = 0, du) {
      du = du || Math.max(0.35, String(s).length * 0.04);
      const ls = o.ls ? ` letter-spacing="${o.ls}"` : '';
      layers.ink.push(`<text ${attrs('text', t, du, o)} x="${x}" y="${y}" font-size="${o.size || 44}" font-weight="${o.w || 700}" fill="${o.color || C.ink}" text-anchor="${o.anchor || 'start'}"${ls}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.ssw || 1.5}"` : ''}>${esc(s)}</text>`);
    },
    // número que conta de "de" até "ate"
    count(x, y, de, ate, suf, o = {}, t = 0, du = 1.2) {
      layers.ink.push(`<text ${attrs('count', t, du, o)} data-from="${de}" data-to="${ate}" data-suf="${esc(suf)}" data-dec="${o.dec || 0}" x="${x}" y="${y}" font-size="${o.size || 100}" font-weight="${o.w || 900}" fill="${o.color || C.ink}" text-anchor="${o.anchor || 'start'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.ssw || 1.5}"` : ''}>${de}${esc(suf)}</text>`);
    },
    // imagem (logo etc.) com entrada suave
    img(href, x, y, w, h, o = {}, t = 0, du = 0.8) {
      layers.img.push(`<g ${attrs('img', t, du, { ...o, nopen: true })}><image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/></g>`);
    },
    // apaga do quadro tudo o que já foi desenhado e ainda está visível
    clear(t) {
      for (const k of ['mk', 'ink', 'img']) layers[k] = layers[k].map(s => s.includes('data-out=') ? s : s.replace('class="hd"', `class="hd" data-out="${T(t)}"`));
    },
    html() { return sceneHtml(id, dur, layers); },
  };

  // ---- ícones prontos ----
  api.pessoa = (x, y, cor, t, s = 1, o = {}) => {
    const R = 44 * s;
    api.shape(G.circle(x, y - 78 * s, R), C.skin, o, t, 0.6);
    api.ink(`M${x - 40 * s},${y - 100 * s} Q${x},${y - 150 * s} ${x + 42 * s},${y - 96 * s}`, { ...o, sw: 5 }, t + 0.5, 0.3);
    const corpo = `M${x - 70 * s},${y + 70 * s} Q${x - 70 * s},${y - 20 * s} ${x},${y - 22 * s} Q${x + 70 * s},${y - 20 * s} ${x + 70 * s},${y + 70 * s} Z`;
    api.shape(corpo, cor, o, t + 0.7, 0.7);
  };
  api.predio = (x, y, w, h, t, o = {}) => { // x,y = canto inferior esquerdo
    api.shape(G.rect(x, y - h, w, h, 4), C.gray, { ...o, sw: 5 }, t, 1.0);
    const cols = 3, rows = Math.max(3, Math.round(h / 95)), ww = w / (cols * 1.9), wh = h / (rows * 2.1);
    let k = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const wx = x + w * (c + 0.5) / cols - ww / 2, wy = y - h + h * (r + 0.42) / rows - wh / 2;
      api.shape(G.rect(r2(wx), r2(wy), r2(ww), r2(wh), 2), (r + c) % 3 === 0 ? C.blue : C.green, { ...o, sw: 3.5, nopen: true }, t + 1.0 + k * 0.06, 0.25);
      k++;
    }
    api.shape(G.rect(x + w / 2 - w * 0.12, y - h * 0.16, w * 0.24, h * 0.16, 2), C.dark, { ...o, sw: 4 }, t + 1.0 + k * 0.06, 0.3);
  };
  api.chao = (x1, x2, y, t, o = {}) => api.ink(`M${x1},${y} C${x1 + (x2 - x1) * 0.3},${y - 4} ${x1 + (x2 - x1) * 0.7},${y + 4} ${x2},${y}`, { ...o, sw: 6 }, t, 0.6);
  api.seta = (x1, y1, x2, y2, t, o = {}) => api.ink(G.arrow(x1, y1, x2, y2, o.bend ?? 0.2, o.head || 18), { sw: 4.5, ...o }, t, o.d || 0.6);
  api.sublinha = (x1, x2, y, cor, t, o = {}) =>
    api.fill(`M${x1},${y - 7} C${x1 + (x2 - x1) * 0.35},${y - 13} ${x1 + (x2 - x1) * 0.7},${y + 1} ${x2},${y - 6} L${x2},${y + 6} C${x1 + (x2 - x1) * 0.7},${y + 13} ${x1 + (x2 - x1) * 0.35},${y - 1} ${x1},${y + 7} Z`, cor, { off: [0, 0], op: 0.9, ...o }, t, o.d || 0.5);
  api.circula = (cx, cy, rx, ry, t, o = {}) => {
    const d = `M${cx + rx},${cy - 4} C${cx + rx},${cy - ry * 1.1} ${cx - rx},${cy - ry * 1.05} ${cx - rx * 1.02},${cy} C${cx - rx},${cy + ry * 1.08} ${cx + rx * 1.05},${cy + ry} ${cx + rx * 0.96},${cy - ry * 0.25}`;
    api.ink(d, { color: o.color || C.blue, sw: o.sw || 6, ...o }, t, o.d || 0.7);
  };
  api.marca = (x1, x2, y, cor, t, o = {}) => // marca-texto translúcido atrás de uma palavra
    api.fill(G.rect(x1, y - 30, x2 - x1, 46, 10), cor, { off: [0, 0], op: 0.45, ...o }, t, o.d || 0.4);
  return api;
}

function sceneHtml(id, dur, L) {
  return `<template>
  <style>
    @font-face { font-family: 'Figtree'; src: url('assets/fonts/figtree-latin.woff2') format('woff2'); font-weight: 300 900; }
    @font-face { font-family: 'Figtree'; src: url('assets/fonts/figtree-latin-ext.woff2') format('woff2'); font-weight: 300 900; unicode-range: U+0100-024F; }
    #${id} { position: absolute; inset: 0; }
    #${id} svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    #${id} text { font-family: 'Figtree', sans-serif; }
  </style>
  <div id="${id}" data-composition-id="${id}" data-width="1920" data-height="1080" data-layout-allow-overlap data-layout-allow-overflow>
    <svg id="${id}-sv" class="clip" data-start="0" data-duration="${dur}" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${id}-tinta" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/></filter>
        <filter id="${id}-marcador" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>
      </defs>
      <g id="${id}-mk" filter="url(#${id}-marcador)">
      ${L.mk.join('\n      ')}
      </g>
      <g id="${id}-ink" filter="url(#${id}-tinta)">
      ${L.ink.join('\n      ')}
      </g>
      <g id="${id}-img">
      ${L.img.join('\n      ')}
      </g>
      <g id="${id}-caneta" opacity="0">
        <g transform="rotate(-28)">
          <rect x="-11" y="-150" width="22" height="118" rx="5" fill="#082381" stroke="#1B1F3B" stroke-width="3"/>
          <rect x="-11" y="-150" width="22" height="34" rx="5" fill="#30C7B2" stroke="#1B1F3B" stroke-width="3"/>
          <path d="M-11,-32 L11,-32 L6,-8 L-6,-8 Z" fill="#E7EAF0" stroke="#1B1F3B" stroke-width="3" stroke-linejoin="round"/>
          <path d="M-5,-8 L5,-8 L2,0 L-2,0 Z" fill="#1B1F3B"/>
        </g>
      </g>
    </svg>
  </div>
  <script>
    (function () {
      // Tudo é função do tempo da cena: cada .hd tem data-t (início), data-d (duração) e, opcional, data-out (quando é apagado).
      const DUR = ${dur}, FADE_IN = 0.35, FADE_OUT = 0.45, APAGA = 0.45;
      const root = document.getElementById('${id}-sv');
      const pen = document.getElementById('${id}-caneta');
      const els = Array.from(root.querySelectorAll('.hd')).map(e => ({
        e, kind: e.dataset.kind, t: +e.dataset.t, d: +e.dataset.d, out: e.dataset.out ? +e.dataset.out : 1e9,
        nopen: !!e.dataset.nopen, dir: e.dataset.dir || 'x',
        pulse: e.dataset.pulse ? e.dataset.pulse.split(',').map(Number) : [],
        stk: Array.from(e.querySelectorAll('.stk')),
        from: +e.dataset.from, to: +e.dataset.to, suf: e.dataset.suf || '', dec: +(e.dataset.dec || 0),
        tf: e.getAttribute('transform') || '',
      }));
      const clamp = x => (x < 0 ? 0 : x > 1 ? 1 : x);
      const ease = x => (1 - Math.cos(Math.PI * clamp(x))) / 2;
      const easeOut = x => 1 - Math.pow(1 - clamp(x), 3);
      els.forEach(it => { it.stk.forEach(s => { s.style.strokeDasharray = '1 1.02'; }); });
      // medidas feitas uma vez (e refeitas quando a fonte carrega), antes de qualquer quadro
      function medir() {
        els.forEach(it => {
          const b = it.e.getBBox(); it.cx = b.x + b.width / 2; it.cy = b.y + b.height / 2; it.bb = b;
          const m = it.e.getCTM() || root.createSVGMatrix();
          it.m = m;
          it.pts = it.stk.map(s => { const L = s.getTotalLength(), a = []; for (let k = 0; k <= 60; k++) a.push(s.getPointAtLength(L * k / 60).matrixTransform(m)); return a; });
        });
      }
      medir();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
      const ptAt = (a, q) => { const f = q * (a.length - 1), k = Math.min(a.length - 2, Math.floor(f)), u = f - k; return { x: a[k].x + (a[k + 1].x - a[k].x) * u, y: a[k].y + (a[k + 1].y - a[k].y) * u }; };
      function draw(t) {
        let penAt = null;
        for (const it of els) {
          const p = clamp((t - it.t) / it.d);
          const vis = t >= it.t;
          const o = vis ? 1 - clamp((t - it.out) / APAGA) : 0;
          it.e.style.opacity = o;
          if (o <= 0) continue;
          let sc = 1;
          for (const pt of it.pulse) { const q = (t - pt) / 0.7; if (q > 0 && q < 1) sc = 1 + 0.08 * Math.sin(Math.PI * q); }
          if (it.kind === 'stroke') {
            const n = it.stk.length;
            it.stk.forEach((s, i) => {
              const q = clamp((p - i / n) * n);
              s.style.strokeDashoffset = 1 - q;
              if (q > 0 && q < 1 && !it.nopen && t < it.out) penAt = ptAt(it.pts[i], q);
            });
          } else if (it.kind === 'fill') {
            const q = ease(p);
            it.e.style.clipPath = it.dir === 'y' ? 'inset(' + ((1 - q) * 100) + '% -5% -5% -5%)' : 'inset(-5% ' + ((1 - q) * 100) + '% -5% -5%)';
          } else if (it.kind === 'text' || it.kind === 'count') {
            if (it.kind === 'count') {
              const v = it.from + (it.to - it.from) * easeOut(p);
              it.e.textContent = v.toFixed(it.dec).replace('.', ',') + it.suf;
            } else {
              const q = ease(p);
              it.e.style.clipPath = 'inset(-30% ' + ((1 - q) * 100) + '% -30% -3%)';
              if (p > 0 && p < 1 && !it.nopen) { const b = it.bb; penAt = new DOMPoint(b.x + b.width * q, b.y + b.height * 0.78).matrixTransform(it.m); }
            }
          } else if (it.kind === 'img') {
            sc *= 0.92 + 0.08 * easeOut(p);
            it.e.style.opacity = o * easeOut(p);
          }
          if (sc !== 1 || it.kind === 'img') it.e.setAttribute('transform', it.tf + ' translate(' + it.cx + ',' + it.cy + ') scale(' + sc + ') translate(' + (-it.cx) + ',' + (-it.cy) + ')');
          else if (it.pulse.length) it.e.setAttribute('transform', it.tf);
        }
        if (penAt) { pen.setAttribute('opacity', 1); pen.setAttribute('transform', 'translate(' + penAt.x + ',' + penAt.y + ')'); }
        else pen.setAttribute('opacity', 0);
        root.style.opacity = Math.min(clamp(t / FADE_IN), clamp((DUR - t) / FADE_OUT));
      }
      const relogio = { t: 0 };
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(relogio, { t: 0 }, { t: DUR, duration: DUR, ease: 'none', onUpdate: () => draw(relogio.t) }, 0);
      draw(0);
      window.__timelines['${id}'] = tl;
    })();
  </script>
</template>
`;
}
