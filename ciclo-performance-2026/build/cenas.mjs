// Roteiro visual. Todos os tempos são do VÍDEO (segundo da narração em assets/audio/narracao.m4a),
// tirados da transcrição palavra a palavra (build/palavras.json).
// Para ajustar: mude o tempo/texto aqui e rode `node build/build.mjs`.
export const AUDIO_INICIO = 0;

export const CENAS = [
  // ---------------- CENA 1: gancho (a vistoria) + abertura ----------------
  {
    id: 'abertura', start: 0, end: 28.9,
    desenho(s) {
      const { txt, ink, shape, predio, chao, seta, sublinha, circula, clear, img, pessoa, fill, G, C } = s;
      txt(960, 170, 'Qual é o momento mais tenso de uma obra?', { size: 64, w: 800, anchor: 'middle' }, 0.1, 1.8);
      chao(260, 1010, 820, 0.9);
      predio(440, 820, 270, 470, 1.2);
      // guindaste simples
      ink(['M820,820 L820,300', 'M760,300 L1060,300', 'M820,360 L870,300', 'M1030,300 L1030,380'], { sw: 4.5 }, 2.2, 0.8);
      // lista de verificação
      const L = 1170;
      txt(L + 70, 470, 'Fundação', { size: 46, w: 700, color: C.soft }, 3.44, 0.5);
      ink(G.cross(L + 20, 455, 0.9), { color: C.red, sw: 6, nopen: true }, 4.0, 0.3);
      txt(L + 70, 580, 'Concretagem', { size: 46, w: 700, color: C.soft }, 4.68, 0.6);
      ink(G.cross(L + 20, 565, 0.9), { color: C.red, sw: 6, nopen: true }, 5.25, 0.3);
      txt(L + 70, 700, 'Vistoria final', { size: 58, w: 900, color: C.blue }, 5.94, 0.6);
      ink(G.check(L + 20, 682, 1.1), { color: C.green, sw: 8 }, 6.4, 0.35);
      sublinha(L + 66, L + 450, 722, C.green, 6.6);
      clear(7.1);

      // logo + título
      img('assets/brand/logo-azul.svg', 680, 210, 560, 185, {}, 7.4, 0.9);
      txt(960, 500, 'REVISÃO GERAL', { size: 30, w: 800, color: C.green, anchor: 'middle', ls: 8, nopen: true }, 8.5, 0.6);
      txt(960, 610, 'Ciclo de Performance 2026', { size: 100, w: 900, color: C.dark, anchor: 'middle' }, 8.9, 1.6);
      sublinha(500, 1420, 645, C.green, 10.6, { d: 0.6 });
      pessoa(700, 870, C.blue, 11.82, 0.85);
      txt(790, 850, 'Anfitriã', { size: 40, w: 800 }, 12.3, 0.5);
      pessoa(1150, 870, C.green, 13.24, 0.85);
      txt(1240, 850, 'Especialista', { size: 40, w: 800 }, 13.7, 0.6);
      clear(16.5);

      // dezembro e o cansaço
      const cx = 280, cy = 280, cw = 540, ch = 470;
      shape(G.rect(cx, cy, cw, ch, 18), C.white, { sw: 5 }, 16.7, 0.9);
      fill(G.rect(cx, cy, cw, 110, 18), C.blue, { off: [0, 0] }, 17.1, 0.4);
      txt(cx + cw / 2, cy + 75, 'DEZEMBRO', { size: 54, w: 900, color: C.white, anchor: 'middle', nopen: true }, 17.3, 0.5);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
        const x = cx + 40 + c * 68, y = cy + 145 + r * 75, k = r * 7 + c;
        ink(G.rect(x, y, 52, 56, 6), { sw: 3, color: C.soft, nopen: true }, 17.4 + k * 0.03, 0.2);
        ink(`M${x + 10},${y + 46} L${x + 42},${y + 10}`, { sw: 4, color: C.red, nopen: true }, 18.0 + k * 0.05, 0.12);
      }
      // bateria descarregando
      const bx = 1050, by = 400;
      ink([G.rect(bx, by, 380, 170, 22), G.rect(bx + 380, by + 55, 30, 60, 6)], { sw: 6 }, 18.0, 0.8);
      fill(G.rect(bx + 14, by + 14, 70, 142, 12), C.red, { off: [0, 0] }, 18.9, 0.4);
      txt(bx + 190, by + 260, 'cansaço do ano inteiro', { size: 44, w: 800, anchor: 'middle' }, 19.2, 0.9);
      txt(bx + 190, by - 40, 'bateu forte!', { size: 38, w: 700, color: C.soft, anchor: 'middle' }, 21.2, 0.5);
      clear(22.5);

      // provar que o prédio não vai cair
      chao(330, 1000, 860, 22.6);
      predio(530, 860, 270, 500, 22.8);
      txt(1080, 520, 'Provar que o prédio', { size: 60, w: 800 }, 25.0, 1.0);
      txt(1080, 600, 'construído no ano', { size: 60, w: 800 }, 26.28, 1.0);
      txt(1080, 700, 'não vai cair.', { size: 76, w: 900, color: C.blue }, 27.7, 0.7);
      sublinha(1080, 1540, 725, C.green, 28.3, { d: 0.35 });
    },
  },

  // ---------------- CENA 2: a data e o que já fizemos ----------------
  {
    id: 'linha-do-tempo', start: 28.9, end: 59.0,
    desenho(s) {
      const { txt, ink, shape, fill, sublinha, circula, seta, clear, G, C } = s;
      // cartão de data
      shape(G.rect(560, 230, 800, 470, 26), C.white, { sw: 5 }, 29.1, 1.0);
      fill(G.rect(560, 230, 800, 100, 26), C.blue, { off: [0, 0] }, 29.7, 0.4);
      txt(960, 295, 'VISTORIA MARCADA', { size: 40, w: 900, color: C.white, anchor: 'middle', ls: 6, nopen: true }, 29.9, 0.6);
      ink(['M680,215 L680,260', 'M1240,215 L1240,260'], { sw: 8 }, 30.6, 0.4);
      txt(960, 480, '01/12 → 08/01', { size: 130, w: 900, color: C.dark, anchor: 'middle' }, 32.46, 1.8);
      sublinha(640, 1280, 510, C.green, 34.3);
      txt(960, 600, 'Avaliação final', { size: 54, w: 800, anchor: 'middle' }, 34.98, 0.8);
      txt(960, 660, 'do Ciclo de Performance 2026', { size: 40, w: 600, color: C.soft, anchor: 'middle' }, 36.0, 1.1);
      clear(38.3);

      // linha do tempo do ano
      txt(130, 170, 'O que já fizemos até aqui', { size: 64, w: 800 }, 38.5, 1.3);
      sublinha(132, 880, 200, C.green, 39.9);
      const X = i => 180 + i * (1560 / 11), Y = 580;
      ink(`M150,${Y} C600,${Y - 4} 1200,${Y + 4} 1770,${Y}`, { sw: 6 }, 39.4, 1.3);
      const M = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
      M.forEach((m, i) => {
        if (![1, 2, 3, 4, 6, 9, 10, 11].includes(i)) ink(G.line(X(i), Y - 14, X(i), Y + 14), { sw: 4, nopen: true }, 40.4 + i * 0.09, 0.12);
        txt(X(i), Y + 60, m, { size: 28, w: 700, color: C.soft, anchor: 'middle', nopen: true }, 40.5 + i * 0.09, 0.2);
      });
      // fev–mar: lançamento de metas
      shape(G.rect(X(1) - 26, Y - 70, X(2) - X(1) + 52, 40, 20), C.blue, { sw: 4 }, 43.2, 0.5);
      txt((X(1) + X(2)) / 2, Y - 100, 'Lançamento de metas', { size: 34, w: 800, color: C.dark, anchor: 'middle' }, 43.7, 0.9);
      // abr, jul, out: acompanhamentos
      [3, 6, 9].forEach((i, k) => shape(G.circle(X(i), Y, 20), C.green, { sw: 4 }, [46.88, 47.58, 48.28][k], 0.3));
      txt(X(6), Y + 185, 'Acompanhamentos', { size: 36, w: 800, color: C.ink, anchor: 'middle' }, 46.1, 0.8);
      seta(X(6) - 170, Y + 170, X(3) + 10, Y + 82, 47.0, { bend: -0.12, d: 0.35 });
      seta(X(6), Y + 145, X(6), Y + 82, 47.6, { bend: 0, d: 0.25 });
      seta(X(6) + 170, Y + 170, X(9) - 10, Y + 82, 48.3, { bend: 0.12, d: 0.35 });
      // mai: PDI
      shape(`M${X(4)},${Y - 30} L${X(4) + 30},${Y} L${X(4)},${Y + 30} L${X(4) - 30},${Y} Z`, C.dark, { sw: 4 }, 49.14, 0.4);
      txt(X(4), Y - 60, 'PDI', { size: 44, w: 900, color: C.dark, anchor: 'middle' }, 49.5, 0.4);
      // nov: indicações
      shape(G.rect(X(10) - 22, Y - 22, 44, 44, 8), C.blue, { sw: 4 }, 52.26, 0.35);
      txt(X(10) + 30, Y - 100, 'Indicação de', { size: 32, w: 800, color: C.dark, anchor: 'end' }, 52.5, 0.5);
      txt(X(10) + 30, Y - 62, 'clientes internos', { size: 32, w: 800, color: C.dark, anchor: 'end' }, 53.0, 0.6);
      // dez: você está aqui
      const px = X(11);
      shape(`M${px},${Y - 18} C${px - 40},${Y - 70} ${px - 34},${Y - 120} ${px},${Y - 120} C${px + 34},${Y - 120} ${px + 40},${Y - 70} ${px},${Y - 18} Z`, C.green, { sw: 4 }, 54.6, 0.5);
      ink(G.circle(px, Y - 88, 12), { sw: 4, nopen: true }, 55.0, 0.2);
      txt(px, Y + 185, 'você está aqui', { size: 32, w: 800, color: C.green, anchor: 'middle' }, 55.3, 0.6);
      txt(960, 860, 'A base está pronta. Falta só a vistoria final.', { size: 50, w: 800, anchor: 'middle' }, 56.48, 1.4);
      sublinha(1290, 1480, 885, C.green, 57.9, { d: 0.3 });
      circula(px, Y - 58, 66, 100, 58.0, { color: C.blue, d: 0.6 });
    },
  },

  // ---------------- CENA 3: a planta da nota (rosca 70/20/10) ----------------
  {
    id: 'planta-da-nota', start: 59.0, end: 92.8,
    desenho(s) {
      const { txt, ink, shape, fill, count, sublinha, circula, seta, G, C } = s;
      txt(130, 150, 'CICLO DE PERFORMANCE 2026', { size: 26, w: 800, color: C.blue, ls: 5, nopen: true }, 59.3, 0.6);
      txt(130, 232, 'Como sua nota é formada', { size: 76, w: 800 }, 59.7, 1.5);
      sublinha(132, 1010, 262, C.green, 61.3);

      const cx = 820, cy = 650, R = 250, r = 130;
      ink(G.circle(cx, cy, R), { sw: 5 }, 62.4, 1.2);
      ink(G.circle(cx, cy, r), { sw: 5 }, 63.4, 0.6);
      const div = a => { const [x1, y1] = G.pol(cx, cy, R, a), [x2, y2] = G.pol(cx, cy, r, a); return G.line(x1, y1, x2, y2); };
      ink([div(0), div(252), div(324)], { sw: 5 }, 63.9, 0.9);

      // cartão "o quê x como"
      const tf = 'rotate(2 1630 430)';
      shape(G.rect(1450, 270, 390, 300, 22), C.gray, { sw: 0.01, tf, nopen: true }, 65.6, 0.3);
      txt(1490, 335, 'O QUÊ  ×  COMO', { size: 32, w: 900, color: C.blue, tf }, 66.3, 0.9);
      txt(1490, 395, 'O quê: o que você', { size: 28, w: 600, tf }, 74.3, 0.6);
      txt(1490, 432, 'entregou (metas).', { size: 28, w: 600, tf }, 74.9, 0.6);
      txt(1490, 490, 'Como: o jeito de entregar', { size: 28, w: 600, tf }, 82.9, 0.8);
      txt(1490, 527, '(comportamentos).', { size: 28, w: 600, tf }, 85.9, 0.7);

      // metas 70%
      fill(G.slice(cx, cy, R, r, 0, 252), C.blue, { pulse: [88.38] }, 70.9, 1.0);
      seta(1080, 760, 1230, 724, 71.6, { bend: 0.15 });
      count(1250, 720, 0, 70, '%', { size: 120, color: C.blue, pulse: [88.38] }, 71.96, 1.0);
      txt(1256, 780, 'Metas', { size: 44, w: 800 }, 72.6, 0.5);
      txt(1256, 826, 'o que você entregou', { size: 32, w: 500, color: C.soft }, 74.4, 0.8);
      ink(G.arc(cx, cy, R + 34, 4, 248), { color: C.blue, sw: 6 }, 73.1, 1.1);

      // nota final no centro
      txt(cx, cy - 8, 'nota final', { size: 30, w: 700, color: C.soft, anchor: 'middle', nopen: true }, 75.9, 0.5);
      count(cx, cy + 48, 0, 100, '%', { size: 72, anchor: 'middle' }, 76.3, 0.9);

      // competências 20%
      fill(G.slice(cx, cy, R, r, 252, 324), C.green, {}, 78.6, 0.6);
      seta(575, 700, 440, 700, 79.0, { bend: -0.15 });
      count(420, 690, 0, 20, '%', { size: 84, color: '#1E9E8C', anchor: 'end' }, 79.5, 0.7);
      txt(420, 736, 'Competências', { size: 36, w: 800, anchor: 'end' }, 79.9, 0.6);

      // cultura 10% (fatia destacada)
      fill(G.slice(cx, cy, R, r, 324, 360), C.dark, { off: [-14, -10] }, 80.64, 0.5);
      seta(720, 430, 560, 380, 80.9, { bend: 0.15 });
      count(540, 392, 0, 10, '%', { size: 64, color: C.dark, anchor: 'end' }, 81.06, 0.5);
      txt(540, 434, 'Cultura', { size: 32, w: 800, anchor: 'end' }, 81.5, 0.4);
      ink(G.arc(cx, cy, R + 34, 256, 356), { color: C.green, sw: 6 }, 83.3, 0.8);

      // "70% é um peso gigantesco"
      circula(1345, 680, 150, 85, 88.6, { color: C.green, d: 0.8 });
    },
  },
];
