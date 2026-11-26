// Roteiro visual. Todos os tempos são do VÍDEO (segundo da narração em assets/audio/narracao.m4a),
// tirados da transcrição palavra a palavra (build/palavras.json).
// Para ajustar: mude o tempo/texto aqui e rode `node build/build.mjs`.

export const CENAS = [
  // ---------------- CENA 1: gancho (a vistoria) + abertura ----------------
  {
    id: 'abertura', start: 0, end: 28.9,
    desenho(s) {
      const { txt, ink, shape, predio, chao, seta, sublinha, circula, clear, img, pessoa, fill, G, C } = s;
      const { ilustra } = s;
      txt(960, 150, 'Qual é o momento mais tenso de uma obra?', { size: 60, w: 800, anchor: 'middle' }, 0.1, 1.8);
      ilustra('obra', {}, 0.4, 2.6);
      txt(290, 905, 'Fundação', { size: 40, w: 700, color: C.soft, anchor: 'middle' }, 3.44, 0.5);
      ink(G.cross(150, 892, 0.75), { color: C.red, sw: 6, nopen: true }, 4.0, 0.3);
      txt(760, 905, 'Concretagem', { size: 40, w: 700, color: C.soft, anchor: 'middle' }, 4.68, 0.6);
      ink(G.cross(590, 892, 0.75), { color: C.red, sw: 6, nopen: true }, 5.25, 0.3);
      txt(1660, 905, 'Vistoria final', { size: 50, w: 900, color: C.blue, anchor: 'middle' }, 5.94, 0.6);
      ink(G.check(1470, 890, 1.0), { color: C.green, sw: 8 }, 6.4, 0.35);
      sublinha(1500, 1820, 925, C.green, 6.6);
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
      ilustra('operario', {}, 16.7, 2.4);
      txt(1300, 330, 'DEZEMBRO', { size: 72, w: 900, color: C.blue }, 16.9, 0.8);
      sublinha(1300, 1700, 355, C.green, 17.7);
      const bx = 1330, by = 470;
      ink([G.rect(bx, by, 330, 150, 22), G.rect(bx + 330, by + 48, 26, 54, 6)], { sw: 6 }, 18.0, 0.8);
      fill(G.rect(bx + 14, by + 14, 60, 122, 12), C.red, { off: [0, 0] }, 18.9, 0.4);
      txt(bx + 165, by + 230, 'cansaço do ano inteiro', { size: 40, w: 800, anchor: 'middle' }, 19.2, 0.9);
      txt(bx + 165, by + 290, 'bateu forte!', { size: 36, w: 700, color: C.soft, anchor: 'middle' }, 21.2, 0.5);
      clear(22.5);

      // provar que o prédio não vai cair
      ilustra('vistoria', {}, 22.6, 2.4);
      txt(1400, 470, 'Provar que o prédio', { size: 52, w: 800 }, 25.0, 1.0);
      txt(1400, 540, 'construído no ano', { size: 52, w: 800 }, 26.28, 1.0);
      txt(1400, 640, 'não vai cair.', { size: 70, w: 900, color: C.blue }, 27.7, 0.7);
      sublinha(1400, 1830, 665, C.green, 28.3, { d: 0.35 });
    },
  },

  // ---------------- CENA 2: a data e o que já fizemos ----------------
  {
    id: 'linha-do-tempo', start: 28.9, end: 59.72,
    desenho(s) {
      const { txt, ink, shape, fill, sublinha, circula, seta, clear, G, C } = s;
      // cartão de data
      shape(G.rect(560, 230, 800, 470, 26), C.white, { sw: 5 }, 29.25, 1.0);
      fill(G.rect(560, 230, 800, 100, 26), C.blue, { off: [0, 0] }, 30.43, 0.4);
      txt(960, 295, 'VISTORIA MARCADA', { size: 40, w: 900, color: C.white, anchor: 'middle', ls: 6, nopen: true }, 30.82, 0.6);
      ink(['M680,215 L680,260', 'M1240,215 L1240,260'], { sw: 8 }, 31.6, 0.4);
      txt(960, 480, '01/12  →  08/01', { size: 104, w: 900, color: C.dark, anchor: 'middle' }, 33.85, 1.8);
      sublinha(640, 1280, 510, C.green, 35.69);
      txt(960, 600, 'Avaliação final', { size: 54, w: 800, anchor: 'middle' }, 36.37, 0.8);
      txt(960, 660, 'do Ciclo de Performance 2026', { size: 40, w: 600, color: C.soft, anchor: 'middle' }, 37.39, 1.1);
      clear(39.69);

      // linha do tempo do ano
      txt(130, 170, 'O que já fizemos até aqui', { size: 64, w: 800 }, 39.89, 1.3);
      sublinha(132, 880, 200, C.green, 41.29);
      const X = i => 180 + i * (1560 / 11), Y = 580;
      ink(`M150,${Y} C600,${Y - 4} 1200,${Y + 4} 1770,${Y}`, { sw: 6 }, 40.79, 1.3);
      const M = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
      M.forEach((m, i) => {
        if (![1, 2, 3, 4, 6, 9, 10, 11].includes(i)) ink(G.line(X(i), Y - 14, X(i), Y + 14), { sw: 4, nopen: true }, 41.79 + i * 0.09, 0.12);
        txt(X(i), Y + 60, m, { size: 28, w: 700, color: C.soft, anchor: 'middle', nopen: true }, 41.89 + i * 0.09, 0.2);
      });
      // fev–mar: lançamento de metas
      shape(G.rect(X(1) - 26, Y - 70, X(2) - X(1) + 52, 40, 20), C.blue, { sw: 4 }, 44.59, 0.5);
      txt((X(1) + X(2)) / 2, Y - 100, 'Lançamento de metas', { size: 34, w: 800, color: C.dark, anchor: 'middle' }, 45.09, 0.9);
      // abr, jul, out: acompanhamentos
      [3, 6, 9].forEach((i, k) => shape(G.circle(X(i), Y, 20), C.green, { sw: 4 }, [48.27, 48.97, 49.67][k], 0.3));
      txt(X(6), Y + 185, 'Acompanhamentos', { size: 36, w: 800, color: C.ink, anchor: 'middle' }, 47.49, 0.8);
      seta(X(6) - 170, Y + 170, X(3) + 10, Y + 82, 48.39, { bend: -0.12, d: 0.35 });
      seta(X(6), Y + 145, X(6), Y + 82, 48.99, { bend: 0, d: 0.25 });
      seta(X(6) + 170, Y + 170, X(9) - 10, Y + 82, 49.69, { bend: 0.12, d: 0.35 });
      // mai: PDI
      shape(`M${X(4)},${Y - 30} L${X(4) + 30},${Y} L${X(4)},${Y + 30} L${X(4) - 30},${Y} Z`, C.dark, { sw: 4 }, 50.53, 0.4);
      txt(X(4), Y - 60, 'PDI', { size: 44, w: 900, color: C.dark, anchor: 'middle' }, 50.89, 0.4);
      // nov: indicações
      shape(G.rect(X(10) - 22, Y - 22, 44, 44, 8), C.blue, { sw: 4 }, 53.65, 0.35);
      txt(X(10) + 30, Y - 100, 'Indicação de', { size: 32, w: 800, color: C.dark, anchor: 'end' }, 53.89, 0.5);
      txt(X(10) + 30, Y - 62, 'clientes internos', { size: 32, w: 800, color: C.dark, anchor: 'end' }, 54.39, 0.6);
      // dez: você está aqui
      const px = X(11);
      shape(`M${px},${Y - 18} C${px - 40},${Y - 70} ${px - 34},${Y - 120} ${px},${Y - 120} C${px + 34},${Y - 120} ${px + 40},${Y - 70} ${px},${Y - 18} Z`, C.green, { sw: 4 }, 55.99, 0.5);
      ink(G.circle(px, Y - 88, 12), { sw: 4, nopen: true }, 56.39, 0.2);
      txt(px, Y + 185, 'você está aqui', { size: 32, w: 800, color: C.green, anchor: 'middle' }, 56.69, 0.6);
      txt(960, 860, 'A base está pronta. Falta só a vistoria final.', { size: 50, w: 800, anchor: 'middle' }, 57.87, 1.4);
      sublinha(1290, 1480, 885, C.green, 59.29, { d: 0.3 });
      circula(px, Y - 58, 66, 100, 59.39, { color: C.blue, d: 0.6 });
    },
  },

  // ---------------- CENA 3: a planta da nota (rosca 70/20/10) ----------------
  {
    id: 'planta-da-nota', start: 59.72, end: 92.31,
    desenho(s) {
      const { txt, ink, shape, fill, count, sublinha, circula, seta, G, C } = s;
      txt(130, 150, 'CICLO DE PERFORMANCE 2026', { size: 26, w: 800, color: C.blue, ls: 5, nopen: true }, 59.72, 0.6);
      txt(130, 232, 'Como sua nota é formada', { size: 76, w: 800 }, 60.67, 1.5);
      sublinha(132, 1010, 262, C.green, 63.23);
      s.ilustra('planta', { out: 65.94 }, 60.51, 2.0);

      const cx = 820, cy = 650, R = 250, r = 130;
      ink(G.circle(cx, cy, R), { sw: 5 }, 66.58, 1.0);
      ink(G.circle(cx, cy, r), { sw: 5 }, 67.6, 0.5);
      const div = a => { const [x1, y1] = G.pol(cx, cy, R, a), [x2, y2] = G.pol(cx, cy, r, a); return G.line(x1, y1, x2, y2); };
      ink([div(0), div(252), div(324)], { sw: 5 }, 68, 0.8);

      // cartão "o quê x como"
      const tf = 'rotate(2 1630 430)';
      shape(G.rect(1450, 270, 390, 300, 22), C.gray, { sw: 0.01, tf, nopen: true }, 69, 0.3);
      txt(1490, 335, 'O QUÊ  ×  COMO', { size: 32, w: 900, color: C.blue, tf }, 69.88, 0.9);
      txt(1490, 395, 'O quê: o que você', { size: 28, w: 600, tf }, 78.81, 0.6);
      txt(1490, 432, 'entregou (metas).', { size: 28, w: 600, tf }, 79.41, 0.6);
      txt(1490, 490, 'Como: o jeito de entregar', { size: 28, w: 600, tf }, 87.41, 0.8);
      txt(1490, 527, '(comportamentos).', { size: 28, w: 600, tf }, 90.41, 0.7);

      // metas 70%
      fill(G.slice(cx, cy, R, r, 0, 252), C.blue, {}, 75.41, 1.0);
      seta(1080, 760, 1230, 724, 76.11, { bend: 0.15 });
      count(1250, 720, 0, 70, '%', { size: 120, color: C.blue }, 76.47, 1.0);
      txt(1256, 780, 'Metas', { size: 44, w: 800 }, 77.11, 0.5);
      txt(1256, 826, 'o que você entregou', { size: 32, w: 500, color: C.soft }, 78.91, 0.8);
      ink(G.arc(cx, cy, R + 34, 4, 248), { color: C.blue, sw: 6 }, 77.61, 1.1);

      // nota final no centro
      txt(cx, cy - 8, 'nota final', { size: 30, w: 700, color: C.soft, anchor: 'middle', nopen: true }, 80.41, 0.5);
      count(cx, cy + 48, 0, 100, '%', { size: 72, anchor: 'middle' }, 80.81, 0.9);

      // competências 20%
      fill(G.slice(cx, cy, R, r, 252, 324), C.green, {}, 83.11, 0.6);
      seta(575, 700, 440, 700, 83.51, { bend: -0.15 });
      count(420, 690, 0, 20, '%', { size: 84, color: '#1E9E8C', anchor: 'end' }, 84.01, 0.7);
      txt(420, 736, 'Competências', { size: 36, w: 800, anchor: 'end' }, 84.41, 0.6);

      // cultura 10% (fatia destacada)
      fill(G.slice(cx, cy, R, r, 324, 360), C.dark, { off: [-14, -10] }, 85.15, 0.5);
      seta(720, 430, 560, 380, 85.41, { bend: 0.15 });
      count(540, 392, 0, 10, '%', { size: 64, color: C.dark, anchor: 'end' }, 85.57, 0.5);
      txt(540, 434, 'Cultura', { size: 32, w: 800, anchor: 'end' }, 86.01, 0.4);
      ink(G.arc(cx, cy, R + 34, 256, 356), { color: C.green, sw: 6 }, 87.81, 0.8);

    },
  },
  // ---------------- CENA 4: efeito mutirão e "não é média" ----------------
  {
    id: 'mutirao', start: 92.31, end: 121.29,
    desenho(s) {
      const { txt, ink, fill, sublinha, circula, seta, clear, ilustra, G, C } = s;
      txt(130, 120, 'METAS · 70% DA NOTA', { size: 26, w: 800, color: C.blue, ls: 5, nopen: true }, 92.41, 0.5);
      txt(130, 195, 'O efeito mutirão', { size: 64, w: 800 }, 92.71, 1.0);
      sublinha(132, 640, 222, C.green, 93.81);
      ilustra('mutirao', { tf: 'translate(40,235) scale(0.78)' }, 93.51, 2.6);
      txt(1300, 430, 'Tudo em', { size: 48, w: 800 }, 97.11, 0.5);
      txt(1300, 500, 'novembro?', { size: 60, w: 900, color: C.red }, 98.11, 0.7);
      txt(1300, 600, 'Como o sistema', { size: 36, w: 600, color: C.soft }, 99.91, 0.6);
      txt(1300, 645, 'evita isso?', { size: 36, w: 600, color: C.soft }, 100.51, 0.5);
      clear(101.51);

      ilustra('diario', {}, 101.81, 2.6);
      txt(1340, 300, 'A nota de metas', { size: 44, w: 700 }, 106.11, 0.7);
      txt(1340, 365, 'NÃO é média', { size: 58, w: 900, color: C.red }, 107.01, 0.6);
      txt(1340, 420, 'dos trimestres', { size: 40, w: 700, color: C.soft }, 107.71, 0.6);
      ink('M1335,345 C1500,338 1640,350 1760,342', { color: C.red, sw: 7 }, 108.41, 0.4);
      txt(1340, 530, 'É o resultado', { size: 44, w: 700 }, 109.11, 0.6);
      txt(1340, 595, 'acumulado do período', { size: 46, w: 900, color: C.blue }, 109.81, 1.0);
      sublinha(1340, 1820, 618, C.green, 111.01);
      txt(1340, 720, 'Acompanhamentos =', { size: 38, w: 700 }, 112.81, 0.7);
      txt(1340, 775, 'diário de obra', { size: 46, w: 900, color: C.dark }, 114.01, 0.7);
      txt(1340, 860, 'bloco por bloco, mês a mês', { size: 34, w: 600, color: C.soft }, 117.31, 1.0);
    },
  },

  // ---------------- CENA 5: atingimento (mínimo, alvo, teto), golfe e exemplo A–D ----------------
  {
    id: 'atingimento', start: 121.29, end: 206.39,
    desenho(s) {
      const { txt, ink, fill, shape, count, sublinha, circula, seta, clear, ilustra, G, C } = s;
      txt(130, 120, 'METAS · ATINGIMENTO', { size: 26, w: 800, color: C.blue, ls: 5, nopen: true }, 121.39, 0.5);
      txt(130, 195, 'Como a meta vira porcentagem', { size: 64, w: 800 }, 121.69, 1.3);
      sublinha(132, 1060, 222, C.green, 123.09);
      // régua
      const Y = 560, X0 = 200, XM = 640, XA = 1240, XT = 1560, X1 = 1720;
      ink(`M${X0},${Y} L${X1},${Y}`, { sw: 6 }, 122.19, 0.9);
      fill(G.rect(X0, Y - 60, XM - X0, 60, 8), '#F4B6B3', { off: [0, 0] }, 123.39, 0.6);
      ink(G.line(XM, Y - 90, XM, Y + 30), { sw: 5 }, 123.79, 0.3);
      txt(XM, Y + 75, 'Mínimo', { size: 34, w: 800, anchor: 'middle' }, 123.99, 0.5);
      txt((X0 + XM) / 2, Y - 100, 'nota 0', { size: 58, w: 900, color: C.red, anchor: 'middle' }, 125.39, 0.6);
      txt((X0 + XM) / 2, Y + 75, 'abaixo do mínimo', { size: 28, w: 600, color: C.soft, anchor: 'middle' }, 126.99, 0.7);
      fill(G.rect(XM, Y - 60, XA - XM, 60, 8), '#BFC8FA', { off: [0, 0] }, 128.79, 1.2);
      ink(G.line(XA, Y - 90, XA, Y + 30), { sw: 5 }, 130.59, 0.3);
      txt(XA, Y + 75, 'Alvo = 100%', { size: 34, w: 800, anchor: 'middle' }, 130.79, 0.6);
      txt((XM + XA) / 2, Y - 100, 'aproximação do alvo', { size: 40, w: 800, color: C.blue, anchor: 'middle' }, 130.99, 1.2);
      txt((XM + XA) / 2, Y + 150, 'ex.: alvo 100, realizado 90 → 90%', { size: 30, w: 600, color: C.soft, anchor: 'middle' }, 131.99, 1.2);
      fill(G.rect(XA, Y - 60, XT - XA, 60, 8), '#A6E8DE', { off: [0, 0] }, 133.19, 0.6);
      ink(G.line(XT, Y - 90, XT, Y + 30), { sw: 5 }, 133.79, 0.3);
      txt(XT, Y + 75, 'Teto', { size: 34, w: 800, anchor: 'middle' }, 133.99, 0.4);
      count((XA + XT) / 2, Y - 100, 100, 110, '%', { size: 64, color: '#1E9E8C', anchor: 'middle' }, 134.19, 1.0);
      clear(136.49);

      ilustra('golfe', {}, 136.79, 2.6);
      txt(1360, 330, 'Metas de redução:', { size: 40, w: 700 }, 136.99, 0.8);
      txt(1360, 395, 'custos · erros · acidentes', { size: 34, w: 600, color: C.soft }, 139.79, 1.2);
      txt(1360, 510, 'Menor é melhor', { size: 62, w: 900, color: C.blue }, 143.09, 0.9);
      sublinha(1360, 1800, 535, C.green, 144.19);
      txt(1360, 640, 'Como no golfe: menos', { size: 38, w: 700 }, 148.29, 0.8);
      txt(1360, 690, 'tacadas, melhor nota.', { size: 38, w: 700 }, 149.09, 0.8);
      txt(1360, 800, 'Acidentes: zero é o troféu', { size: 36, w: 800, color: C.dark }, 151.99, 1.1);
      clear(162.59);

      // exemplo A–D
      txt(130, 120, 'EXEMPLO PRÁTICO', { size: 26, w: 800, color: C.blue, ls: 5, nopen: true }, 162.99, 0.5);
      txt(130, 195, 'Somando a nota de metas', { size: 64, w: 800 }, 163.29, 1.2);
      sublinha(132, 880, 222, C.green, 164.59);
      const cx = [300, 640, 1030, 1430], Y0 = 320, DY = 100;
      ['Meta', 'Peso', 'Atingimento', 'Pontos'].forEach((h, i) => txt(cx[i], Y0, h, { size: 34, w: 800, color: C.soft, anchor: 'middle', nopen: true }, 165.39 + i * 0.25, 0.3));
      ink(`M180,${Y0 + 25} L1560,${Y0 + 25}`, { sw: 4 }, 166.39, 0.5);
      const linhas = [['A', '30', '100%', 30, 167.47], ['B', '30', '110%', 33, 173.95], ['C', '20', '80%', 16, 182.15], ['D', '20', '90%', 18, 189.01]];
      linhas.forEach(([m, p, at, pts, t], k) => {
        const y = Y0 + DY * (k + 1);
        txt(cx[0], y, m, { size: 48, w: 900, color: C.dark, anchor: 'middle' }, t, 0.3);
        txt(cx[1], y, p, { size: 46, w: 700, anchor: 'middle' }, t + 1.6, 0.3);
        txt(cx[2], y, at, { size: 46, w: 700, anchor: 'middle', color: at === '110%' ? '#1E9E8C' : C.ink }, t + (m === 'B' ? 2.8 : 2.4), 0.4);
        count(cx[3], y, 0, pts, '', { size: 52, w: 900, color: C.blue, anchor: 'middle' }, t + (m === 'B' ? 5.3 : m === 'C' ? 4.8 : 3.6), 0.6);
      });
      txt(cx[2] + 140, Y0 + DY * 2 + 6, 'teto!', { size: 28, w: 800, color: '#1E9E8C' }, 177.99, 0.3);
      ink(`M180,${Y0 + DY * 4 + 45} L1560,${Y0 + DY * 4 + 45}`, { sw: 4 }, 194.19, 0.5);
      txt(cx[2], Y0 + DY * 5 + 10, '30 + 33 + 16 + 18 =', { size: 42, w: 700, anchor: 'middle' }, 195.39, 2.4);
      count(cx[3], Y0 + DY * 5 + 18, 0, 97, '%', { size: 84, w: 900, color: C.blue, anchor: 'middle' }, 198.39, 1.2);
      circula(cx[3], Y0 + DY * 5 - 10, 130, 70, 200.79, { color: C.green });
      txt(1680, Y0 + DY * 5, '= o quê', { size: 40, w: 800, color: C.dark }, 204.99, 0.6);
    },
  },

  // ---------------- CENA 6: competências, a nova escala de 0 a 10 ----------------
  {
    id: 'competencias', start: 206.39, end: 288.53,
    desenho(s) {
      const { txt, ink, fill, shape, count, sublinha, circula, seta, clear, ilustra, G, C } = s;
      txt(130, 120, 'O COMO · 30% DA NOTA', { size: 26, w: 800, color: C.green, ls: 5, nopen: true }, 206.59, 0.5);
      txt(130, 195, 'Competências: nova escala', { size: 64, w: 800 }, 209.11, 1.3);
      sublinha(132, 930, 222, C.green, 211.03);
      txt(330, 330, 'ANTES', { size: 34, w: 900, color: C.soft, anchor: 'middle', ls: 4 }, 213.13, 0.4);
      const antes = [['Nunca', 214.53], ['Raramente', 215.43], ['Às vezes', 216.43], ['Frequentemente', 218.13], ['Supera as expectativas', 219.33]];
      antes.forEach(([w, t], k) => {
        shape(G.rect(130, 370 + k * 95, 400, 70, 35), C.gray, { sw: 3, nopen: true }, t, 0.3);
        txt(330, 418 + k * 95, w, { size: w.length > 15 ? 26 : 32, w: 700, anchor: 'middle', nopen: true }, t + 0.15, 0.3);
      });
      ink(G.cross(330, 600, 6.2), { color: C.red, sw: 9 }, 225.53, 0.7);
      txt(330, 900, 'muita subjetividade', { size: 30, w: 700, color: C.red, anchor: 'middle' }, 226.33, 0.8);
      seta(620, 600, 860, 600, 222.13, { bend: -0.1, sw: 6 });
      txt(1300, 330, 'AGORA', { size: 34, w: 900, color: C.blue, anchor: 'middle', ls: 4 }, 222.73, 0.4);
      txt(1300, 560, '0 a 10', { size: 180, w: 900, color: C.blue, anchor: 'middle' }, 223.73, 1.2);
      txt(1300, 680, 'análise mais clara e objetiva', { size: 36, w: 700, anchor: 'middle' }, 234.03, 1.2);
      clear(240.43);

      // a régua de 0 a 10 com 6 faixas
      txt(130, 150, 'A nova escala: 6 faixas', { size: 56, w: 800 }, 240.83, 1.0);
      const X = v => 160 + v * 150, Y = 330;
      const faixas = [
        [0, 3, '#F4B6B3', '0 a 2', 'Muito abaixo do esperado', 243.23],
        [3, 5, '#F7D2A8', '3 a 4', 'Abaixo do esperado', 246.93],
        [5, 7, '#FFE9A8', '5 a 6', 'Atende parcialmente', 249.23],
        [7, 9, '#A6E8DE', '7 a 8', 'Atende ao esperado', 256.33],
        [9, 10, '#BFC8FA', '9', 'Acima do esperado', 269.03],
        [10, 11, '#8C9BEF', '10', 'Referência', 271.03],
      ];
      ink(`M${X(0)},${Y + 40} L${X(11)},${Y + 40}`, { sw: 5 }, 240.73, 0.8);
      faixas.forEach(([a, b, cor, num, nome, t], k) => {
        shape(G.rect(X(a) + 4, Y - 40, X(b) - X(a) - 8, 80, 14), cor, { sw: 4, nopen: true }, t, 0.4);
        txt((X(a) + X(b)) / 2, Y + 14, num, { size: 40, w: 900, anchor: 'middle', nopen: true }, t + 0.2, 0.3);
        const yl = k % 2 ? Y - 70 : Y + 100;
        txt((X(a) + X(b)) / 2, yl, nome, { size: num === '7 a 8' ? 30 : 26, w: num === '7 a 8' ? 900 : 700, color: num === '7 a 8' ? '#1E9E8C' : C.ink, anchor: 'middle' }, t + 0.5, 0.7);
      });
      // 7 ou 8 não é nota baixa
      ilustra('corda-bamba', { tf: 'translate(60,470) scale(0.46)' }, 259.53, 2.2);
      txt(1060, 640, '7 ou 8 NÃO é nota baixa:', { size: 46, w: 900, color: C.dark }, 256.33, 1.2);
      txt(1060, 705, 'é exatamente o esperado.', { size: 46, w: 900, color: '#1E9E8C' }, 257.73, 1.1);
      sublinha(1060, 1640, 728, C.green, 260.23);
      circula((X(7) + X(9)) / 2, Y, 170, 70, 257.13, { color: C.green });
      // justificativa
      txt(1060, 830, 'Notas 0 a 2, 9 e 10 exigem', { size: 36, w: 700 }, 275.43, 1.6);
      txt(1060, 880, 'justificativa obrigatória', { size: 40, w: 900, color: C.red }, 279.13, 1.0);
      circula(X(1.5), Y, 250, 62, 276.03, { color: C.red, d: 0.6 });
      circula(X(10), Y, 175, 66, 277.33, { color: C.red, d: 0.6 });
    },
  },
  // ---------------- CENA 7: quem avalia (competências e cultura) ----------------
  {
    id: 'quem-avalia', start: 288.53, end: 344.26,
    desenho(s) {
      const { txt, ink, fill, shape, count, sublinha, circula, seta, clear, ilustra, pessoa, G, C } = s;
      txt(130, 120, 'QUEM AVALIA', { size: 26, w: 800, color: C.blue, ls: 5, nopen: true }, 288.73, 0.4);
      txt(130, 195, 'Competências: quem dá a nota', { size: 60, w: 800 }, 289.03, 1.3);
      sublinha(132, 990, 222, C.green, 290.43);
      ilustra('gestora', { tf: 'translate(20,250) scale(0.75)' }, 290.73, 2.6);
      txt(1180, 420, 'Autoavaliação', { size: 46, w: 800 }, 295.13, 0.7);
      txt(1780, 420, '0%', { size: 64, w: 900, color: C.red, anchor: 'end' }, 296.13, 0.4);
      txt(1180, 470, 'não entra no cálculo', { size: 32, w: 600, color: C.soft }, 292, 0.7);
      txt(1180, 540, 'serve para reflexão e', { size: 32, w: 600, color: C.soft }, 297, 0.8);
      txt(1180, 582, 'preparar o feedback', { size: 32, w: 600, color: C.soft }, 302.06, 0.8);
      ink('M1170,640 L1800,640', { sw: 3, color: C.soft }, 306, 0.4);
      txt(1180, 740, 'Gestor direto', { size: 50, w: 900, color: C.dark }, 310.66, 0.8);
      count(1780, 740, 0, 100, '%', { size: 72, color: C.blue, anchor: 'end' }, 311.76, 1.2);
      sublinha(1180, 1800, 768, C.green, 309);
      clear(317.76);

      txt(130, 120, 'QUEM AVALIA', { size: 26, w: 800, color: C.blue, ls: 5, nopen: true }, 318.06, 0.4);
      txt(130, 195, 'Cultura: a dinâmica muda', { size: 60, w: 800 }, 318.26, 1.2);
      sublinha(132, 870, 222, C.green, 319.56);
      const X0 = 200, X1 = 1720, XM = X0 + (X1 - X0) * 0.7;
      shape(G.rect(X0, 330, XM - X0, 110, 16), C.blue, { sw: 5 }, 320.56, 0.8);
      txt((X0 + XM) / 2, 404, 'Gestor 70%', { size: 50, w: 900, color: C.white, anchor: 'middle', nopen: true }, 317, 0.6);
      shape(G.rect(XM + 10, 330, X1 - XM - 10, 110, 16), C.green, { sw: 5 }, 322.46, 0.6);
      txt((XM + X1) / 2 + 5, 404, '30%', { size: 50, w: 900, color: C.ink, anchor: 'middle', nopen: true }, 322.96, 0.4);
      txt((XM + X1) / 2 + 5, 500, 'média de 2 clientes internos', { size: 30, w: 700, anchor: 'middle' }, 323.56, 1.0);
      txt(960, 600, 'Quem indica os clientes internos?', { size: 40, w: 800, anchor: 'middle' }, 322, 1.2);
      pessoa(620, 820, C.blue, 329.56, 0.8);
      txt(620, 935, '1 indicado pelo profissional', { size: 30, w: 700, anchor: 'middle' }, 327, 1.0);
      pessoa(1300, 820, C.green, 331.76, 0.8);
      txt(1300, 935, '1 indicado pelo gestor', { size: 30, w: 700, anchor: 'middle' }, 332.56, 0.9);
      clear(337.66);

      ilustra('sigilo', { tf: 'translate(20,170) scale(0.78)' }, 337.76, 2.4);
      txt(1240, 420, 'Notas dos clientes', { size: 48, w: 800 }, 338.76, 0.9);
      txt(1240, 490, 'internos são', { size: 48, w: 800 }, 339.76, 0.6);
      txt(1240, 575, 'confidenciais', { size: 66, w: 900, color: C.blue }, 340.46, 0.8);
      sublinha(1240, 1700, 600, C.green, 341.36);
      txt(1240, 700, 'Ninguém vê quem deu o quê.', { size: 36, w: 700, color: C.soft }, 342.26, 1.0);
    },
  },

  // ---------------- CENA 8: juntando tudo (92,6%) ----------------
  {
    id: 'conta-final', start: 344.26, end: 398.33,
    desenho(s) {
      const { txt, ink, fill, shape, count, sublinha, circula, seta, clear, G, C } = s;
      txt(130, 120, 'JUNTANDO TUDO', { size: 26, w: 800, color: C.blue, ls: 5, nopen: true }, 344.46, 0.4);
      txt(130, 195, 'A nota final, na prática', { size: 60, w: 800 }, 344.76, 1.2);
      sublinha(132, 820, 222, C.green, 342);
      const L = 160, V = 900, P = 1180, R = 1560, Y = [350, 500, 650];
      // metas
      shape(G.rect(L - 30, Y[0] - 62, 60, 80, 12), C.blue, { sw: 3, nopen: true }, 351.33, 0.3);
      txt(L + 50, Y[0], 'Metas', { size: 50, w: 900 }, 351.53, 0.5);
      count(V, Y[0], 0, 97, '%', { size: 58, w: 900, color: C.ink, anchor: 'end' }, 354.33, 0.8);
      txt(P, Y[0], '× 70%', { size: 50, w: 700, color: C.soft, anchor: 'end' }, 355.93, 0.5);
      txt(P + 60, Y[0], '=', { size: 50, w: 700, color: C.soft }, 357.33, 0.2);
      count(R, Y[0], 0, 67.9, '', { size: 64, w: 900, color: C.blue, anchor: 'end', dec: 1 }, 357.93, 1.2);
      // competências
      shape(G.rect(L - 30, Y[1] - 62, 60, 80, 12), C.green, { sw: 3, nopen: true }, 364.13, 0.3);
      txt(L + 50, Y[1], 'Competências', { size: 50, w: 900 }, 364.33, 0.6);
      txt(L + 50, Y[1] + 50, 'nota 8 do gestor = 80%', { size: 28, w: 600, color: C.soft }, 366.33, 1.0);
      count(V, Y[1], 0, 80, '%', { size: 58, w: 900, color: C.ink, anchor: 'end' }, 367.13, 0.8);
      txt(P, Y[1], '× 20%', { size: 50, w: 700, color: C.soft, anchor: 'end' }, 369.13, 0.5);
      txt(P + 60, Y[1], '=', { size: 50, w: 700, color: C.soft }, 370.53, 0.2);
      count(R, Y[1], 0, 16, '', { size: 64, w: 900, color: '#1E9E8C', anchor: 'end' }, 370.93, 1.0);
      // cultura
      shape(G.rect(L - 30, Y[2] - 62, 60, 80, 12), C.dark, { sw: 3, nopen: true }, 373.53, 0.3);
      txt(L + 50, Y[2], 'Cultura', { size: 50, w: 900 }, 373.73, 0.5);
      txt(L + 50, Y[2] + 50, 'gestor 9 × 70% + clientes internos 8 × 30%', { size: 28, w: 600, color: C.soft }, 376.13, 2.6);
      count(V, Y[2], 0, 87, '%', { size: 58, w: 900, color: C.ink, anchor: 'end' }, 380.73, 0.8);
      txt(P, Y[2], '× 10%', { size: 50, w: 700, color: C.soft, anchor: 'end' }, 383.33, 0.5);
      txt(P + 60, Y[2], '=', { size: 50, w: 700, color: C.soft }, 385.13, 0.2);
      count(R, Y[2], 0, 8.7, '', { size: 64, w: 900, color: C.dark, anchor: 'end', dec: 1 }, 385.53, 1.0);
      // soma
      ink(`M${L - 40},${Y[2] + 100} L${R + 60},${Y[2] + 100}`, { sw: 5 }, 387.63, 0.6);
      txt(L + 50, Y[2] + 210, 'Nota final', { size: 58, w: 900 }, 388.33, 0.6);
      txt(P + 60, Y[2] + 200, '67,9 + 16 + 8,7 =', { size: 34, w: 600, color: C.soft, anchor: 'end' }, 388.73, 2.2);
      count(R + 40, Y[2] + 215, 0, 92.6, '%', { size: 96, w: 900, color: C.blue, anchor: 'end', dec: 1 }, 393.73, 1.6);
      circula(R - 120, Y[2] + 180, 230, 85, 395.73, { color: C.green, d: 0.8 });
    },
  },

  // ---------------- CENA 9: o recado, o feedback e o fechamento ----------------
  {
    id: 'fechamento', start: 398.33, end: 455.16,
    desenho(s) {
      const { txt, ink, fill, shape, count, sublinha, circula, seta, clear, ilustra, img, G, C } = s;
      txt(960, 260, 'O recado', { size: 34, w: 900, color: C.soft, anchor: 'middle', ls: 6 }, 398.53, 0.5);
      txt(960, 400, 'Gênio nas metas', { size: 70, w: 900, color: C.blue, anchor: 'middle' }, 401.13, 1.0);
      txt(960, 500, '+ trator com os colegas', { size: 60, w: 900, color: C.red, anchor: 'middle' }, 403.93, 1.2);
      ink(G.arrow(960, 545, 960, 640, 0, 22), { sw: 6 }, 407.13, 0.4);
      txt(960, 740, 'competências e cultura derrubam a nota', { size: 46, w: 800, anchor: 'middle' }, 407.53, 1.8);
      sublinha(560, 1360, 765, C.green, 409.53);
      clear(411.53);

      ilustra('feedback', { tf: 'translate(20,160) scale(0.78)' }, 411.73, 2.6);
      txt(1240, 380, 'Feedback', { size: 70, w: 900, color: C.blue }, 417.03, 0.7);
      txt(1240, 450, 'presencial, com o gestor', { size: 40, w: 800 }, 417.93, 1.1);
      sublinha(1240, 1820, 475, C.green, 419.23);
      txt(1240, 560, 'Não é só conferir um número:', { size: 32, w: 600, color: C.soft }, 419.53, 1.0);
      txt(1240, 605, 'é alinhar rotas.', { size: 40, w: 800, color: C.dark }, 421.73, 0.8);
      txt(1240, 710, 'Registro obrigatório no sistema,', { size: 32, w: 700 }, 424.43, 1.1);
      txt(1240, 755, 'em etapa própria da avaliação final', { size: 32, w: 700 }, 428.13, 1.4);
      clear(430.73);

      txt(960, 330, 'Dúvidas sobre o ciclo?', { size: 54, w: 800, anchor: 'middle' }, 431.26, 1.2);
      const ex = 600, ey = 430;
      ink([G.rect(ex, ey, 140, 96, 10), `M${ex},${ey} L${ex + 70},${ey + 52} L${ex + 140},${ey}`], { sw: 5, color: C.blue }, 434.41, 0.7);
      txt(780, 500, 'remuneracao.rh@cury.net', { size: 62, w: 900, color: C.blue }, 435.27, 2.2);
      sublinha(780, 1560, 528, C.green, 437.65);
      clear(444.56);

      ilustra('vistoria', { tf: 'translate(20,120) scale(0.8)' }, 444.76, 2.4);
      txt(1180, 450, 'Se a vistoria', { size: 60, w: 800 }, 450.76, 0.7);
      txt(1180, 530, 'fosse hoje,', { size: 60, w: 800 }, 451.46, 0.6);
      txt(1180, 640, 'o seu prédio passaria?', { size: 54, w: 900, color: C.blue }, 452.16, 1.2);
      sublinha(1180, 1800, 665, C.green, 453.46, { d: 0.4 });
    },
  },
];
