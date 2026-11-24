# Prepara as ilustrações do Gemini para a animação "desenha e pinta":
#   <nome>-cor.jpg    : a ilustração em 1920x1080 (fundo branco, entra com mix-blend multiply)
#   <nome>-traco.png  : só o traço de tinta (cinza-escuro sobre branco), revelado primeiro pela caneta
# Uso: python3 build/ilustracoes.py   (lê build/originais/*.jpg, grava em assets/ilustracoes/)
import glob, os, json
import numpy as np
from PIL import Image, ImageFilter
caixas = {}
for f in sorted(glob.glob('build/originais/*.jpg')):
    nome = os.path.splitext(os.path.basename(f))[0]
    im = Image.open(f).convert('RGB').resize((1920, 1080), Image.LANCZOS)
    a = np.asarray(im).astype(float)
    # clareia o fundo de papel para branco puro (some no multiply)
    lum = a.mean(axis=2)
    branco = np.clip((lum - 238) / 12, 0, 1)[..., None]
    cor = a * (1 - branco) + 255 * branco
    # "cor para transparência": o branco vira transparente (assim a ilustração assenta no papel em qualquer fundo)
    def para_alfa(rgb):
        al = (255 - rgb.min(axis=2)) / 255
        al = np.clip(al * 1.15, 0, 1)
        c = (rgb - 255 * (1 - al[..., None])) / np.maximum(al[..., None], 1e-3)
        return np.dstack([c.clip(0, 255), al * 255]).astype('uint8')
    Image.fromarray(para_alfa(cor), 'RGBA').save(f'assets/ilustracoes/{nome}-cor.png', optimize=True)
    # traço: pixels escuros e pouco saturados viram tinta
    sat = a.max(axis=2) - a.min(axis=2)
    tinta = np.clip((135 - lum) / 60, 0, 1) * np.clip((120 - sat) / 60, 0.35, 1)
    # bordas de cor também viram traço leve (dá forma às áreas sem contorno)
    g = Image.fromarray(lum.astype('uint8')).filter(ImageFilter.FIND_EDGES)
    borda = np.clip((np.asarray(g).astype(float) - 25) / 60, 0, 0.55)
    t = np.maximum(tinta, borda)
    t[:4, :] = 0; t[-4:, :] = 0; t[:, :4] = 0; t[:, -4:] = 0
    ys, xs = np.where(t > 0.3)
    caixas[nome] = [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]
    out = np.stack([255 - t * (255 - 27), 255 - t * (255 - 31), 255 - t * (255 - 59)], axis=2)
    Image.fromarray(para_alfa(out.clip(0, 255)), 'RGBA').save(f'assets/ilustracoes/{nome}-traco.png', optimize=True)
    print(nome)
json.dump(caixas, open('assets/ilustracoes/caixas.json', 'w'))
print(caixas)
