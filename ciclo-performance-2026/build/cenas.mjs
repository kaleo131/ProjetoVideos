// Roteiro visual: cada cena desenha seus elementos com tempos (em segundos, relativos ao início da cena)
// sincronizados com a narração (assets/audio/narracao.m4a).
// AUDIO_INICIO: ponto do áudio onde o vídeo começa (no teste, só a cena "planta", que começa em 59,0 s).
export const AUDIO_INICIO = 59.0;

export const CENAS = [
  {
    id: 'planta', dur: 33.8, // áudio 0:59,0 a 1:32,8
    desenho({ shape, txt, pill, person, kettlebell, C }) {
      txt(90, 120, 'A planta da nota final', { size: 64, w: 800, color: C.dark }, 0.3, 1.3);
      shape('line', [92, 145, 640, 140], { stroke: C.green, sw: 7, rough: 1.4 }, 1.5, 0.5);
      const X0 = 150, X1 = 1450, Y0 = 230, Y1 = 900, XM = 1060, YM = 677;
      shape('rectangle', [X0, Y0, X1 - X0, Y1 - Y0], { stroke: C.dark, sw: 7, rough: 0.9, seed: 11 }, 1.2, 2.4);
      shape('line', [XM, Y0, XM, Y1], { stroke: C.dark, sw: 7, rough: 0.9 }, 3.5, 0.9);
      shape('line', [XM, YM, X1, YM], { stroke: C.dark, sw: 7, rough: 0.9 }, 4.4, 0.7);
      // cota de medida da planta: "como fica o peso de cada pilar"
      shape('line', [X0, Y0 - 70, X1, Y0 - 70], { stroke: C.ink, sw: 3, rough: 0.6 }, 5.6, 1.0);
      shape('line', [X0, Y0 - 90, X0, Y0 - 50], { stroke: C.ink, sw: 3 }, 6.5, 0.3);
      shape('line', [X1, Y0 - 90, X1, Y0 - 50], { stroke: C.ink, sw: 3 }, 6.8, 0.3);
      txt((X0 + X1) / 2 + 260, Y0 - 85, 'nota final = 100%', { size: 34, w: 700, color: C.ink, anchor: 'middle' }, 7.4, 1.0);
      // Metas (fala "metas representam 70%")
      shape('rectangle', [X0 + 18, Y0 + 18, XM - X0 - 36, Y1 - Y0 - 36], { fill: C.blue, stroke: C.blue, sw: 2, rough: 1.6, seed: 5 }, 11.0, 1.0);
      txt((X0 + XM) / 2, 470, 'METAS', { size: 72, w: 800, color: '#fff', anchor: 'middle' }, 11.7, 0.9);
      txt((X0 + XM) / 2, 650, '70%', { size: 170, w: 900, color: '#fff', anchor: 'middle' }, 12.5, 1.0);
      pill((X0 + XM) / 2 - 110, Y0 - 28, 220, 62, 'O QUÊ', C.green, C.dark, 14.2, 34);
      txt((X0 + XM) / 2, 790, 'o que foi entregue na prática', { size: 38, w: 600, color: '#fff', anchor: 'middle' }, 15.4, 1.4);
      // Competências e Cultura
      shape('rectangle', [XM + 18, Y0 + 18, X1 - XM - 36, YM - Y0 - 36], { fill: C.green, stroke: C.green, sw: 2, rough: 1.6, seed: 9 }, 18.3, 0.9);
      txt((XM + X1) / 2, 420, 'COMPETÊNCIAS', { size: 40, w: 800, color: C.dark, anchor: 'middle' }, 19.0, 0.9);
      txt((XM + X1) / 2, 540, '20%', { size: 110, w: 900, color: C.dark, anchor: 'middle' }, 19.9, 0.7);
      shape('rectangle', [XM + 18, YM + 18, X1 - XM - 36, Y1 - YM - 36], { fill: C.dark, stroke: C.dark, sw: 2, rough: 1.6, seed: 13 }, 20.6, 0.8);
      txt((XM + X1) / 2, 800, 'CULTURA  10%', { size: 48, w: 800, color: '#fff', anchor: 'middle' }, 21.3, 0.9);
      // "o como" + comportamentos do dia a dia
      shape('path', [`M${X1 + 40} ${Y0 + 10} Q ${X1 + 80} ${Y0 + 10} ${X1 + 80} ${(Y0 + Y1) / 2 - 20} L ${X1 + 105} ${(Y0 + Y1) / 2} L ${X1 + 80} ${(Y0 + Y1) / 2 + 20} Q ${X1 + 80} ${Y1 - 10} ${X1 + 40} ${Y1 - 10}`], { stroke: C.ink, sw: 5 }, 23.4, 1.1);
      pill(X1 + 125, (Y0 + Y1) / 2 - 36, 190, 72, 'COMO', C.blue, '#fff', 24.4, 38);
      person(X1 + 200, 860, C.blue, 25.6, 0.8);
      person(X1 + 330, 860, C.green, 26.4, 0.8);
      // "70% é um peso gigantesco"
      shape('ellipse', [(X0 + XM) / 2, 560, 560, 330], { stroke: C.green, sw: 8, rough: 1.8, seed: 21 }, 28.7, 1.0);
      kettlebell(XM - 110, 610, 29.6, '70');
    },
  },
];
