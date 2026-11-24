// Monta as cenas (compositions/*.html), as legendas e o index.html a partir de build/cenas.mjs.
// Uso: node build/build.mjs
import fs from 'node:fs';
import { makeScene } from './lib.mjs';
import { CENAS as TODAS } from './cenas.mjs';
// Para renderizar só um trecho: CENAS=mutirao,atingimento node build/build.mjs
const SO = process.env.CENAS ? process.env.CENAS.split(',') : null;
const CENAS = SO ? TODAS.filter(c => SO.includes(c.id)) : TODAS;
const AUDIO_INICIO = CENAS[0].start;

const r2 = n => Math.round(n * 100) / 100;
const hosts = [];
for (const c of CENAS) {
  const dur = r2(c.end - c.start);
  const s = makeScene(c.id, c.start, dur);
  c.desenho(s);
  fs.writeFileSync(`compositions/${c.id}.html`, s.html());
  hosts.push(`      <div id="${c.id}" data-composition-id="${c.id}" data-composition-src="compositions/${c.id}.html" data-start="${r2(c.start - AUDIO_INICIO)}" data-duration="${dur}" data-track-index="1" data-track-kind="graphics" data-width="1920" data-height="1080"></div>`);
}
const total = r2(CENAS[CENAS.length - 1].end - AUDIO_INICIO);

// ---------- legendas palavra a palavra ----------
// build/palavras.json: [{w, s, e}] com tempos da narração. Correções de grafia ficam em FIX.
const FIX = { ciclo: 'Ciclo', performance: 'Performance', chegar: 'chega' };
const palavras = JSON.parse(fs.readFileSync('build/palavras.json', 'utf8'))
  .map(p => ({ ...p, w: FIX[p.w] || p.w, s: r2(p.s - AUDIO_INICIO), e: r2(p.e - AUDIO_INICIO) }))
  .filter(p => p.s >= 0 && p.s < total);
const linhas = [];
let cur = [];
for (const p of palavras) {
  cur.push(p);
  const fimFrase = /[.?!]$/.test(p.w);
  const chars = cur.reduce((a, q) => a + q.w.length + 1, 0);
  if ((fimFrase && cur.length >= 2) || chars > 42) { linhas.push(cur); cur = []; }
}
if (cur.length) linhas.push(cur);
const L = linhas.map((ws, i) => {
  const s = ws[0].s, prox = linhas[i + 1] ? linhas[i + 1][0].s : total;
  return { s, e: r2(Math.min(prox, ws[ws.length - 1].e + 0.8)), w: ws.map(q => [q.w, q.s]) };
});
const legendas = `<template>
  <style>
    @font-face { font-family: 'Figtree'; src: url('assets/fonts/figtree-latin.woff2') format('woff2'); font-weight: 300 900; }
    @font-face { font-family: 'Figtree'; src: url('assets/fonts/figtree-latin-ext.woff2') format('woff2'); font-weight: 300 900; unicode-range: U+0100-024F; }
    #legendas { position: absolute; inset: 0; pointer-events: none; }
    #legendas .faixa { position: absolute; left: 50%; bottom: 52px; transform: translateX(-50%); max-width: 1300px;
      font-family: 'Figtree', sans-serif; font-size: 38px; font-weight: 700; line-height: 1.2; color: #1B1F3B;
      background: rgba(252,252,252,.92); border: 3px solid #1B1F3B; border-radius: 18px; padding: 12px 28px; white-space: nowrap;
      box-shadow: 6px 6px 0 rgba(26,53,230,.18); }
    #legendas .w { opacity: .35; }
    #legendas .w.on { opacity: 1; }
    #legendas .w.agora { color: #1A35E6; }
  </style>
  <div id="legendas" data-composition-id="legendas" data-width="1920" data-height="1080" data-layout-allow-overlap>
    <div id="leg-faixa" class="faixa clip" data-start="0" data-duration="${total}"></div>
  </div>
  <script>
    (function () {
      const L = ${JSON.stringify(L)};
      const el = document.getElementById('leg-faixa');
      let atual = -2, spans = [];
      function draw(t) {
        let i = -1;
        for (let k = 0; k < L.length; k++) if (t >= L[k].s && t < L[k].e) { i = k; break; }
        if (i !== atual) {
          atual = i;
          if (i < 0) { el.style.visibility = 'hidden'; spans = []; return; }
          el.style.visibility = 'visible';
          el.innerHTML = L[i].w.map(w => '<span class="w">' + w[0] + '</span>').join(' ');
          spans = Array.from(el.querySelectorAll('.w'));
        }
        if (i < 0) return;
        const ws = L[i].w;
        let ag = -1;
        ws.forEach((w, k) => { const on = t >= w[1]; spans[k].classList.toggle('on', on); if (on) ag = k; });
        spans.forEach((s, k) => s.classList.toggle('agora', k === ag));
      }
      const relogio = { t: 0 };
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(relogio, { t: 0 }, { t: ${total}, duration: ${total}, ease: 'none', onUpdate: () => draw(relogio.t) }, 0);
      draw(0);
      window.__timelines['legendas'] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync('compositions/legendas.html', legendas);

const index = `<!doctype html>
<html lang="pt-BR" data-resolution="landscape">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #FCFCFC; }
      #main { position: relative; width: 100%; height: 100%; }
      #papel { position: absolute; inset: 0; width: 1920px; height: 1080px; }
      #marca { position: absolute; right: 64px; top: 48px; width: 150px; opacity: .9; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="${total}" data-width="1920" data-height="1080">
      <img id="papel" class="clip" src="assets/brand/papel.jpg" alt="" data-start="0" data-duration="${total}" data-track-index="0" />
${hosts.join('\n')}
      <img id="marca" class="clip" src="assets/brand/logo-azul.svg" alt="Cury" data-start="${r2(Math.max(0, 16.5 - AUDIO_INICIO))}" data-duration="${r2(total - Math.max(0, 16.5 - AUDIO_INICIO))}" data-track-index="3" />
      <div id="legendas" data-composition-id="legendas" data-composition-src="compositions/legendas.html" data-start="0" data-duration="${total}" data-track-index="4" data-width="1920" data-height="1080"></div>
      <audio id="narracao" src="assets/audio/narracao.m4a" data-start="0" data-duration="${total}" data-media-start="${AUDIO_INICIO}" data-volume="1" data-track-index="2"></audio>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;
fs.writeFileSync('index.html', index);
console.log('cenas:', CENAS.map(c => c.id).join(', '), '| legendas:', L.length, 'linhas | duração total:', total, 's');
