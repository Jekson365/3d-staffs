# One-bedroom flat, ~159 m2, five windows (data onebed150w). Run from source: py ../results/onebed-150m2-five-windows/gen.py [ppm] [bath/kitchen wall y]
# Pixel EDGES in the ORIGINAL image (3528x2473, from scan.py); turned 180 deg: X = (3374 - x)/P, Z = (2253 - y)/P.
import json, sys
from PIL import Image
a = sys.argv[1:]
P = float(a[0]) if a else 196.3
YW = float(a[1]) if len(a) > 1 else 1282   # bath/kitchen wall north edge (drawn 1284)
OXo, OYo = 3374, 2253
rooms_px = {
 'liv': [[204, 1303, 2104, 2204], [1344, 204, 2104, 1303]],
 'bed': [[204, 204, 1324, 1284]],
 'bath': [[2124, 204, 3324, YW]],
 'kit': [[2124, YW + 20, 3324, 2204]],
}
AREAS = {'bed': 31.4, 'bath': 33.5, 'kit': 28.2}
T = P * P
def pa(rs): return sum((r[2] - r[0]) * (r[3] - r[1]) for r in rs)
for k, v in rooms_px.items(): print(k, round(pa(v) / T, 2), AREAS.get(k))
AREAS['liv'] = round(pa(rooms_px['liv']) / T, 1)
def X(p): return round((OXo - p) / P, 3)
def Z(p): return round((OYo - p) / P, 3)
def R(x0, y0, x1, y1):
    xs = sorted([X(x0), X(x1)]); zs = sorted([Z(y0), Z(y1)]); return [xs[0], zs[0], xs[1], zs[1]]
def rr(k): return [R(*r) for r in rooms_px[k]]
fl = lambda m, uv='plank': {"mat": m, "uv": uv}
def lab(x, y): return [X(x), Z(y)]
rooms = [
 {"id": "liv", "ka": "მისაღები", "en": "Living room", "area": AREAS['liv'], "rects": rr('liv'), "label": lab(1450, 1750), "floor": fl("floorLiv", "tile")},
 {"id": "bed", "ka": "საძინებელი", "en": "Bedroom", "area": 31.4, "rects": rr('bed'), "label": lab(600, 600), "floor": fl("floorBed")},
 {"id": "bath", "ka": "სანკვანძი", "en": "WC", "area": 33.5, "rects": rr('bath'), "label": lab(2890, 640), "floor": fl("floorBath", "tile"), "walls": "wallTile"},
 {"id": "kit", "ka": "სამზარეულო", "en": "Kitchen", "area": 28.2, "rects": rr('kit'), "label": lab(2890, 1780), "floor": fl("floorLiv", "tile")},
]
walls_px = [
 [154, 154, 3374, 204], [154, 2204, 3374, 2253], [154, 204, 204, 2204], [3324, 204, 3374, 2204],
 [1324, 204, 1344, 1303], [204, 1284, 1324, 1303], [2104, 204, 2124, 2204], [2124, YW, 3324, YW + 20],
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
DW = round(0.75 * P)   # door width 0.75 m, hinge end kept where drawn
openings = [
 op("entry", "entry", ('v', 154, 204), 1934 - DW, 1934, handle="a"),
 op("bed", "door", ('v', 1324, 1344), 944 - DW, 944, leaf="plain", hinge="a", into=1, rest=0.4),
 op("bath", "door", ('v', 2104, 2124), 634, 634 + DW, leaf="plain", hinge="b", into=-1, rest=0.4),
 op("kit", "door", ('v', 2104, 2124), 1613, 1613 + DW, leaf="plain", hinge="b", into=-1, rest=0.4),
 op("winBed", "window", ('h', 154, 204), 613, 875, sill=0.3, head=2.6),
 op("winBathN", "window", ('h', 154, 204), 2533, 2795, sill=0.3, head=2.6),
 op("winBathE", "window", ('v', 3324, 3374), 643, 905, sill=0.3, head=2.6),
 op("winKitE", "window", ('v', 3324, 3374), 1472, 1955, sill=0.9, head=2.4),
 op("winKitS", "window", ('h', 2204, 2253), 2533, 3015, sill=0.9, head=2.4),
]
def F(t, x, z, **kw): d = {"t": t, "x": round(x, 3), "z": round(z, 3)}; d.update(kw); return d
def C(k): r = rooms_px[k][0]; return (X((r[0] + r[2]) / 2), Z((r[1] + r[3]) / 2))
furn = []
for xx in (500, 1100, 1750): furn += [F("downlight", X(xx), Z(1550), I=1.2, ch=1), F("downlight", X(xx), Z(1980), I=1.2, ch=1)]
furn += [F("downlight", X(1724), Z(480), I=1.2, ch=1), F("downlight", X(1724), Z(1030), I=1.2, ch=1)]
bx, bz = C('bed'); furn.append(F("ceilingLamp", bx, bz, s=0.22, I=1.6, col="SOFT", ch=2))
for k in ('bath', 'kit'):
    cx, cz = C(k); furn.append(F("ceilingLamp", cx, cz, s=0.18, I=1.2, col="COOL", ch=1))
im = Image.open("../results/onebed-150m2-five-windows/plan.jpg").convert("RGB").rotate(180)
im.save("ref/onebed150w.png")
W, H = im.size
data = {"name": "onebed150w", "file": "onebed-150m2-five-windows",
 "title": {"ka": "ბინა", "en": "One-bedroom flat", "rooms": "4 rooms"},
 "total": round(AREAS['liv'] + 31.4 + 33.5 + 28.2, 1),
 "ref": {"image": "onebed150w.png", "ppm": round(P, 3), "origin": [W - OXo, H - OYo], "turn": 180},
 "start": [X(700), Z(1750), 180], "rooms": rooms, "walls": walls, "shafts": [], "openings": openings,
 "rails": [], "switches": [], "furniture": furn}
json.dump(data, open("flats/onebed150w.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("P", P, "liv", AREAS['liv'], "total", data["total"])
