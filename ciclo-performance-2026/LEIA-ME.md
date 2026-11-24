# Vídeo: Revisão Geral do Ciclo de Performance 2026 (HyperFrames)

## Rodar no seu computador
1. Instale o **Node.js 22 ou mais novo** (nodejs.org) e o **FFmpeg**.
2. Descompacte esta pasta, abra o terminal dentro dela e rode `npm install`.
3. Prévia no navegador: `npm run dev`
4. Gerar o MP4: `npm run render` (o arquivo sai na pasta `renders/` ou `out/`).

## Onde mexer
- `build/cenas.mjs`: o roteiro visual. Cada cena lista o que é desenhado e em que segundo da narração.
  Os tempos são do vídeo inteiro (ex.: 70.9 = 1:10,9), tirados da transcrição em `build/palavras.json`.
- `build/lib.mjs`: o estilo quadro branco (tinta com tremor de mão, marcador nas cores da marca deslocado do contorno,
  fonte Figtree, caneta que acompanha o traço). Funções: `ink`, `fill`, `shape`, `txt`, `count`, `img`, `clear`,
  e ícones prontos (`predio`, `pessoa`, `seta`, `sublinha`, `circula`).
- `build/palavras.json`: a fala palavra a palavra, usada nas legendas. Corrija grafias ali ou em `FIX` (build/build.mjs).
- `assets/brand/`: logos da Cury, fundo topográfico e a textura de papel.
- Depois de editar esses arquivos, rode `node build/build.mjs` para regenerar `index.html` e `compositions/`.
- `assets/audio/narracao.m4a`: a narração (áudio do NotebookLM já editado).

## Situação
- Vídeo completo (7:26), cenas 1 a 9. Ilustrações geradas no Gemini, preparadas por `build/ilustracoes.py`.
- Renderizar só um trecho: `CENAS=mutirao,atingimento node build/build.mjs` e depois `npm run render`.
  Rode `node build/build.mjs` sem CENAS para voltar ao vídeo inteiro.
- Juntar partes renderizadas: concat do ffmpeg com `-c copy` e a narração `assets/audio/narracao.m4a` por cima.

## Com o Claude Code
Abra o Claude Code nesta pasta e peça, por exemplo:
"Use /hyperframes. Ajuste a cena planta em build/cenas.mjs para ... e rode node build/build.mjs e npm run render."
