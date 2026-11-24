# Vídeo: Revisão Geral do Ciclo de Performance 2026 (HyperFrames)

## Rodar no seu computador
1. Instale o **Node.js 22 ou mais novo** (nodejs.org) e o **FFmpeg**.
2. Descompacte esta pasta, abra o terminal dentro dela e rode `npm install`.
3. Prévia no navegador: `npm run dev`
4. Gerar o MP4: `npm run render` (o arquivo sai na pasta `renders/` ou `out/`).

## Onde mexer
- `build/cenas.mjs`: o roteiro visual. Cada cena lista o que é desenhado e em que segundo (`t`).
- `build/lib.mjs`: o estilo (traço à mão, cores da marca, fonte Figtree, caneta).
- Depois de editar esses arquivos, rode `node build/build.mjs` para regenerar `index.html` e `compositions/`.
- `assets/audio/narracao.m4a`: a narração (áudio do NotebookLM já editado).

## Com o Claude Code
Abra o Claude Code nesta pasta e peça, por exemplo:
"Use /hyperframes. Ajuste a cena planta em build/cenas.mjs para ... e rode node build/build.mjs e npm run render."
