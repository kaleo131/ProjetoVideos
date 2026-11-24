// Monta as cenas (compositions/*.html) e o index.html a partir de build/cenas.mjs.
import fs from 'node:fs';
import { makeScene } from './lib.mjs';
import { CENAS, AUDIO_INICIO } from './cenas.mjs';

let t = 0;
const hosts = [];
for (const c of CENAS) {
  const s = makeScene(c.id);
  c.desenho(s);
  fs.writeFileSync(`compositions/${c.id}.html`, s.html(c.dur));
  hosts.push(`      <div id="${c.id}" data-composition-id="${c.id}" data-composition-src="compositions/${c.id}.html" data-start="${t}" data-duration="${c.dur}" data-track-index="1" data-track-kind="graphics" data-width="1920" data-height="1080"></div>`);
  t = Math.round((t + c.dur) * 100) / 100;
}
const total = t;
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
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="${total}" data-width="1920" data-height="1080">
${hosts.join('\n')}
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
console.log('cenas:', CENAS.map(c => c.id).join(', '), '| duração total:', total, 's');
