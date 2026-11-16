# One-bedroom flat, ~159 m2 (data onebed150). Run from source: py ../results/onebed-150m2/gen.py [ppm] [kitchen/bath wall top y]
# Pixels are in the ORIGINAL image (3460x2340); turned 180 deg, so X = (3339 - x)/P, Z = (2219 - y)/P.
import json, sys
from PIL import Image
a = sys.argv[1:]
P = float(a[0]) if a else 196.27
YW = float(a[1]) if len(a) > 1 else 1248   # kitchen/bath wall north face (drawn 1250)
OXo, OYo = 3339, 2219
rooms_px = {
 'liv': [[170, 1270, 2070, 2170], [1310, 170, 2070, 1270]],
 'bed': [[170, 170, 1290, 1250]],
 'bath': [[2090, 170, 3290, YW]],
 'kit': [[2090, YW + 20, 3290, 2170]],
}
AREAS = {'bed': 31.4, 'bath': 33.5, 'kit': 28.2, 'liv': None}
T = P * P
def pa(rs): return sum((r[2] - r[0]) * (r[3] - r[1]) for r in rs)
for k, v in rooms_px.items(): print(k, round(pa(v) / T, 2), AREAS[k])
AREAS['liv'] = round(pa(rooms_px['liv']) / T, 1)
def X(p): return round((OXo - p) / P, 3)
def Z(p): return round((OYo - p) / P, 3)
def R(x0, y0, x1, y1):
    xs = sorted([X(x0), X(x1)]); zs = sorted([Z(y0), Z(y1)]); return [xs[0], zs[0], xs[1], zs[1]]
def rr(k): return [R(*r) for r in rooms_px[k]]
fl = lambda m, uv='plank': {"mat": m, "uv": uv}
def lab(x, y): return [X(x), Z(y)]
rooms = [
 {"id": "liv", "ka": "მისაღები", "en": "Living room", "area": AREAS['liv'], "rects": rr('liv'), "label": lab(1450, 1700), "floor": fl("floorLiv", "tile")},
 {"id": "bed", "ka": "საძინებელი", "en": "Bedroom", "area": 31.4, "rects": rr('bed'), "label": lab(560, 560), "floor": fl("floorBed")},
 {"id": "bath", "ka": "სანკვანძი", "en": "WC", "area": 33.5, "rects": rr('bath'), "label": lab(2850, 600), "floor": fl("floorBath", "tile"), "walls": "wallTile"},
 {"id": "kit", "ka": "სამზარეულო", "en": "Kitchen", "area": 28.2, "rects": rr('kit'), "label": lab(2850, 1730), "floor": fl("floorLiv", "tile")},
]
walls_px = [
 [120, 120, 3340, 170], [120, 2170, 3340, 2220], [120, 170, 170, 2170], [3290, 170, 3340, 2170],
 [1290, 170, 1310, 1270], [170, 1250, 1290, 1270], [2070, 170, 2090, 2170], [2090, YW, 3290, YW + 20],
]
walls = [R(*w) for w in walls_px]
def op(i, kind, wall, s0, s1, **kw):
    if wall[0] == 'h':
        zs = sorted([Z(wall[1]), Z(wall[2])]); xs = sorted([X(s0), X(s1)])
        d = {"id": i, "kind": kind, "axis": "x", "at": zs, "a": xs[0], "b": xs[1]}
    else:
        xs = sorted([X(wall[1]), X(wall[2])]); zs = sorted([Z(s0), Z(s1)])
        d = {"id": i, "kind": kind, "axis": "z", "at": xs, "a": zs[0], "b": zs[1]}
    d.update(kw); return d
openings = [
 op("entry", "entry", ('v', 120, 170), 1582, 1901, handle="a"),
 op("bed", "door", ('v', 1290, 1310), 593, 910, leaf="plain", hinge="a", into=1, rest=0.4),
 op("bath", "door", ('v', 2070, 2090), 600, 921, leaf="plain", hinge="b", into=-1, rest=0.4),
 op("kit", "door", ('v', 2070, 2090), 1582, 1901, leaf="plain", hinge="b", into=-1, rest=0.4),
 op("winN", "window", ('h', 120, 170), 2473, 2791, sill=1.2),
 op("winE", "window", ('v', 3290, 3340), 579, 900, sill=1.2),
]
def F(t, x, z, **kw): d = {"t": t, "x": round(x, 3), "z": round(z, 3)}; d.update(kw); return d
def C(k): r = rooms_px[k][0]; return (X((r[0] + r[2]) / 2), Z((r[1] + r[3]) / 2))
furn = []
for xx in (500, 1100, 1700): furn += [F("downlight", X(xx), Z(1500), I=1.2, ch=1), F("downlight", X(xx), Z(1950), I=1.2, ch=1)]
furn += [F("downlight", X(1690), Z(450), I=1.2, ch=1), F("downlight", X(1690), Z(1000), I=1.2, ch=1)]
bx, bz = C('bed'); furn.append(F("ceilingLamp", bx, bz, s=0.22, I=1.6, col="SOFT", ch=2))
for k in ('bath', 'kit'):
    cx, cz = C(k); furn.append(F("ceilingLamp", cx, cz, s=0.18, I=1.2, col="COOL", ch=1))
# turned reference image for the overlay
im = Image.open("../results/onebed-150m2/plan.jpg").convert("RGB").rotate(180)
im.save("ref/onebed150.png")
W, H = im.size
data = {"name": "onebed150", "file": "onebed-150m2",
 "title": {"ka": "ბინა", "en": "One-bedroom flat", "rooms": "4 rooms"},
 "total": round(AREAS['liv'] + 31.4 + 33.5 + 28.2, 1),
 "ref": {"image": "onebed150.png", "ppm": round(P, 3), "origin": [W - 1 - OXo, H - 1 - OYo], "turn": 180},
 "start": [X(700), Z(1700), 180], "rooms": rooms, "walls": walls, "shafts": [], "openings": openings,
 "rails": [], "switches": [], "furniture": furn}
json.dump(data, open("flats/onebed150.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("P", P, "liv", AREAS['liv'])
