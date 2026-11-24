// Gera o HTML estático de cada cena (traço à mão com rough.js) para o HyperFrames.
// Uso: node build/build.mjs  -> escreve compositions/<cena>.html
import rough from 'roughjs';

export const C = { blue: '#1A35E6', dark: '#082381', green: '#30C7B2', gray: '#E7EAF0', white: '#FCFCFC', ink: '#1B1F3B', red: '#E5484D', skin: '#F3D2B5' };
const gen = rough.generator();
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function makeScene(id) {
  const items = [];
  const P = `${id}-`;
  const r2 = n => Math.round(n * 100) / 100;
  const api = {
    C,
    // forma desenhada à mão: kind = rectangle | line | ellipse | circle | path | arc | polygon | linearPath
    shape(kind, args, o = {}, t = 0, d = 0.6) {
      const ro = {
        stroke: o.stroke || C.ink, strokeWidth: o.sw || 4, roughness: o.rough ?? 1.1, bowing: o.bow ?? 1,
        seed: o.seed || (items.length * 7 + 3), fillStyle: 'solid', preserveVertices: true,
      };
      if (o.fill) ro.fill = o.fill;
      const paths = gen.toPaths(gen[kind](...args, ro));
      const fills = paths.filter(p => p.fill && p.fill !== 'none');
      const strokes = paths.filter(p => !(p.fill && p.fill !== 'none'));
      const n = items.length;
      let svg = `<g id="${P}i${n}" class="hd" data-kind="shape" data-t="${r2(t)}" data-d="${r2(d)}"${o.nopen ? ' data-nopen="1"' : ''}>`;
      fills.forEach(p => { svg += `<path class="fil" d="${p.d}" fill="${p.fill}" stroke="none"/>`; });
      strokes.forEach(p => { svg += `<path class="stk" pathLength="1" d="${p.d}" fill="none" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`; });
      svg += `</g>`;
      items.push(svg);
    },
    // texto escrito da esquerda para a direita
    txt(x, y, s, o = {}, t = 0, d) {
      d = d || Math.max(0.4, String(s).length * 0.045);
      const n = items.length;
      items.push(`<text id="${P}i${n}" class="hd" data-kind="text" data-t="${r2(t)}" data-d="${r2(d)}"${o.nopen ? ' data-nopen="1"' : ''} x="${x}" y="${y}" font-size="${o.size || 48}" font-weight="${o.w || 700}" fill="${o.color || C.ink}" text-anchor="${o.anchor || 'start'}">${esc(s)}</text>`);
    },
    html(dur) {
      return sceneHtml(id, dur, items.join('\n      '));
    },
  };
  // atalhos de ícones
  api.pill = (x, y, w, h, label, bg, fg, t, size = 34) => {
    api.shape('rectangle', [x, y, w, h], { fill: bg, stroke: C.ink, sw: 3, rough: 0.8 }, t, 0.5);
    api.txt(x + w / 2, y + h / 2 + size * 0.36, label, { size, w: 800, color: fg, anchor: 'middle', nopen: true }, t + 0.35, 0.4);
  };
  api.person = (x, y, col, t, s = 1) => {
    api.shape('circle', [x, y - 70 * s, 46 * s], { fill: C.skin, stroke: C.ink, sw: 4 }, t, 0.5);
    api.shape('path', [`M${x - 55 * s} ${y + 60 * s} Q ${x - 55 * s} ${y - 30 * s} ${x} ${y - 30 * s} Q ${x + 55 * s} ${y - 30 * s} ${x + 55 * s} ${y + 60 * s} Z`], { fill: col, stroke: C.ink, sw: 4 }, t + 0.4, 0.6);
  };
  api.kettlebell = (x, y, t, label) => {
    api.shape('path', [`M${x - 45} ${y - 40} C ${x - 55} ${y - 120} ${x + 55} ${y - 120} ${x + 45} ${y - 40}`], { stroke: C.ink, sw: 14, rough: 0.6 }, t, 0.5);
    api.shape('path', [`M${x - 75} ${y + 55} C ${x - 110} ${y - 10} ${x - 60} ${y - 55} ${x} ${y - 55} C ${x + 60} ${y - 55} ${x + 110} ${y - 10} ${x + 75} ${y + 55} Z`], { fill: C.gray, stroke: C.ink, sw: 4 }, t + 0.4, 0.6);
    if (label) api.txt(x, y + 28, label, { size: 48, w: 900, color: C.dark, anchor: 'middle', nopen: true }, t + 0.9, 0.4);
  };
  return api;
}

function sceneHtml(id, dur, body) {
  return `<template>
  <style>
    @font-face { font-family: 'Figtree'; src: url('assets/fonts/figtree-latin.woff2') format('woff2'); font-weight: 300 900; }
    @font-face { font-family: 'Figtree'; src: url('assets/fonts/figtree-latin-ext.woff2') format('woff2'); font-weight: 300 900; unicode-range: U+0100-024F; }
    #${id} { position: absolute; inset: 0; background: var(--quadro, #FCFCFC); }
    #${id} svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    #${id} text { font-family: 'Figtree', sans-serif; }
  </style>
  <div id="${id}" data-composition-id="${id}" data-width="1920" data-height="1080" data-layout-allow-overlap data-layout-allow-overflow>
    <svg id="${id}-sv" class="clip" data-start="0" data-duration="${dur}" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
      <g id="${id}-rodape" opacity="0.9">
        <path d="M1760 990 l40 -18 l40 18" stroke="#1A35E6" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M1760 1004 l40 -18 l40 18" stroke="#30C7B2" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M1760 1018 l40 -18 l40 18" stroke="#1A35E6" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M1760 1032 l40 -18 l40 18" stroke="#30C7B2" stroke-width="6" fill="none" stroke-linecap="round"/>
        <text x="70" y="1035" font-size="28" font-weight="600" fill="#082381" opacity="0.75">Ciclo de Performance 2026</text>
      </g>
      ${body}
      <g id="${id}-caneta">
        <path d="M0,0 L18,-10 L120,-190 L150,-172 L48,8 Z" fill="#082381" stroke="#1B1F3B" stroke-width="3" stroke-linejoin="round"/>
        <path d="M110,-172 L140,-154 L160,-188 L130,-206 Z" fill="#30C7B2" stroke="#1B1F3B" stroke-width="3"/>
        <path d="M0,0 L18,-10 L30,-3 L8,6 Z" fill="#1B1F3B"/>
      </g>
    </svg>
  </div>
  <script>
    (function () {
      // Tudo o que aparece é função do tempo da cena: cada elemento .hd tem data-t (início) e data-d (duração), em segundos.
      const DUR = ${dur}, FADE_IN = 0.35, FADE_OUT = 0.45;
      const root = document.getElementById('${id}-sv');
      const pen = document.getElementById('${id}-caneta');
      const els = Array.from(root.querySelectorAll('.hd')).map(e => ({
        e, kind: e.dataset.kind, t: +e.dataset.t, d: +e.dataset.d, nopen: !!e.dataset.nopen,
        stk: Array.from(e.querySelectorAll('.stk')), fil: Array.from(e.querySelectorAll('.fil')),
      }));
      const clamp = x => (x < 0 ? 0 : x > 1 ? 1 : x);
      const ease = x => (1 - Math.cos(Math.PI * clamp(x))) / 2;
      els.forEach(it => it.stk.forEach(s => { s.style.strokeDasharray = '1 1.02'; }));
      function draw(t) {
        let penAt = null;
        for (const it of els) {
          const p = clamp((t - it.t) / it.d);
          it.e.style.opacity = t < it.t ? 0 : 1;
          if (it.kind === 'shape') {
            const n = it.stk.length;
            it.stk.forEach((s, i) => {
              const q = clamp((p - i / n) * n);
              s.style.strokeDashoffset = 1 - q;
              if (q > 0 && q < 1 && !it.nopen) { const L = s.getTotalLength(); penAt = s.getPointAtLength(L * q); }
            });
            const fp = clamp((t - (it.t + it.d * 0.55)) / (it.d * 0.6 + 0.15));
            it.fil.forEach(f => { f.style.opacity = fp; });
          } else {
            const q = ease(p);
            it.e.style.clipPath = 'inset(-20% ' + ((1 - q) * 100) + '% -20% -2%)';
            if (p > 0 && p < 1 && !it.nopen) {
              const b = it.e.getBBox();
              penAt = { x: b.x + b.width * q, y: b.y + b.height * 0.75 };
            }
          }
        }
        if (penAt) { pen.style.opacity = 1; pen.setAttribute('transform', 'translate(' + penAt.x + ',' + penAt.y + ')'); }
        else pen.style.opacity = 0;
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
