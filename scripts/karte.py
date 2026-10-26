# Aufruf: python3 scripts/karte.py public/media/karte-menznau.webp <ordner-fuer-kacheln>
# Standort per Nominatim ermittelt: Allmendweg 4, 6122 Menznau. Kartendaten © OpenStreetMap-Mitwirkende (ODbL).
# Erstellt ein statisches Kartenbild aus OpenStreetMap-Kacheln (einmalig, wird lokal ausgeliefert).
import math, sys, io, urllib.request, os
from PIL import Image, ImageDraw, ImageOps
lat, lon, z = 47.0846322, 8.0440744, 16
out, tiles = sys.argv[1], sys.argv[2]
n = 2 ** z
xf = (lon + 180) / 360 * n
yf = (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n
cx, cy = int(xf), int(yf)
W, H = 2400, 1200  # 2x für scharfe Darstellung; breit genug für volle Breite, mittig zuschneidbar auf 4:3
r = 4
canvas = Image.new('RGB', ((2 * r + 1) * 256, (2 * r + 1) * 256))
for dx in range(-r, r + 1):
    for dy in range(-r, r + 1):
        p = os.path.join(tiles, f'{z}_{cx+dx}_{cy+dy}.png')
        if not os.path.exists(p):
            req = urllib.request.Request(f'https://tile.openstreetmap.org/{z}/{cx+dx}/{cy+dy}.png',
                                         headers={'User-Agent': 'landwerker-website-build/1.0 (statische Standortkarte)'})
            open(p, 'wb').write(urllib.request.urlopen(req, timeout=30).read())
        canvas.paste(Image.open(p).convert('RGB'), ((dx + r) * 256, (dy + r) * 256))
# Punkt im Mosaik
px = (xf - (cx - r)) * 256
py = (yf - (cy - r)) * 256
# 2x hochskalieren, damit Strassen bei Retina nicht matschig wirken
canvas = canvas.resize((canvas.width * 2, canvas.height * 2), Image.LANCZOS)
px, py = px * 2, py * 2
left, top = int(px - W / 2), int(py - H / 2)
img = canvas.crop((left, top, left + W, top + H))
# Farbgebung der Website: Graustufen, eingefärbt von Tinte (dunkel) zu Creme (hell)
g = ImageOps.grayscale(img)
g = ImageOps.autocontrast(g, cutoff=1)
img = ImageOps.colorize(g, black='#6b6243', white='#f6f2e4', mid='#d9d1bb')
d = ImageDraw.Draw(img)
mx, my = W / 2, H / 2
# Markierung im gedämpften Markenrot mit weissem Rand
for rad, col in [(34, '#ffffff'), (26, '#943838')]:
    d.ellipse([mx - rad, my - rad, mx + rad, my + rad], fill=col)
d.ellipse([mx - 9, my - 9, mx + 9, my + 9], fill='#ffffff')
img.save(out, 'WEBP', quality=82)
print('ok', img.size, os.path.getsize(out))
