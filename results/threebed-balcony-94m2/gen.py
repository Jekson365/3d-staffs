# Three-bedroom flat, 93.9 m2 (data threebed94). Run from source: py ../results/threebed-balcony-94m2/gen.py [ppm]
# Pixels are in the ORIGINAL image (1600x689). Turned 90 deg anticlockwise so the west windows face south:
# X = (y - 53)/P, Z = (1534 - x)/P.
import json, sys
a = sys.argv[1:]
P = float(a[0]) if a else 86.0
T = P * P
OX, OY = 1534, 53
A = {'liv': 29.6, 'bed1': 15.1, 'kit': 12.4, 'hall': 13.9, 'bath': 9.7, 'bed2': 6.1, 'bed3': 5.7, 'balc': 1.4}
# solved partitions (drawn: long partition 323-330, living/bed1 968-976, kitchen/hall 420-428,
# bath N 411-418, bath W 685-693, bath E 1092-1099, bed2/bed3 464-471)
yP = 74 + (A['liv'] + A['bed1']) * T / (1428 - 74 - 8)   # long partition north face
yQ = yP + 7
xL = 74 + A['liv'] * T / (yP - 74)                         # living east face
xK = 74 + A['kit'] * T / (596 - yQ)                        # kitchen east face
xE = 1428 - 7 - (A['bed2'] + A['bed3']) * T / (596 - yQ - 7)  # bath east wall west face
yb = yQ + A['bed2'] * T / (1428 - xE - 7)                  # bed2 south face
def hall_area(xw):
    yn = 596 - A['bath'] * T / (xE - xw - 8)
    return ((xE - xK - 8) * (596 - yQ) - (xE - xw) * (596 - yn + 7)) / T, yn
lo, hi = 600.0, 760.0
for _ in range(60):
    m = (lo + hi) / 2
    if hall_area(m)[0] > A['hall']: hi = m
    else: lo = m
xw = 685.0  # drawn; hall comes out +0.6 %, inside 1 %
yn = hall_area(xw)[1]
bx1 = 1449 + A['balc'] * T / 125
rooms_px = {
 'liv': [[74, 74, xL, yP]], 'bed1': [[xL + 8, 74, 1428, yP]],
 'kit': [[74, yQ, xK, 596]],
 'hall': [[xK + 8, yQ, xE, yn - 7], [xK + 8, yn - 7, xw, 596]],
 'bath': [[xw + 8, yn, xE, 596]],
 'bed2': [[xE + 7, yQ, 1428, yb]], 'bed3': [[xE + 7, yb + 7, 1428, 596]],
 'balc': [[1449, 471, bx1, 596]],
}
def pa(rs): return sum((r[2] - r[0]) * (r[3] - r[1]) for r in rs)
for k, v in rooms_px.items(): print(k, round(pa(v) / T, 3), A[k], f"{(pa(v) / T / A[k] - 1) * 100:+.2f}%")
def X(py): return round((py - OY) / P, 3)
def Z(px): return round((OX - px) / P, 3)
def R(x0, y0, x1, y1):
    xs = sorted([X(y0), X(y1)]); zs = sorted([Z(x0), Z(x1)]); return [xs[0], zs[0], xs[1], zs[1]]
def rr(k): return [R(*r) for r in rooms_px[k]]
fl = lambda m, uv='plank': {"mat": m, "uv": uv}
def lab(x, y): return [X(y), Z(x)]
rooms = [
 {"id": "liv", "ka": "მისაღები", "en": "Living room", "area": A['liv'], "rects": rr('liv'), "label": lab(520, 200), "floor": fl("floorLiv")},
 {"id": "bed1", "ka": "საძინებელი 1", "en": "Bedroom 1", "area": A['bed1'], "rects": rr('bed1'), "label": lab(1200, 200), "floor": fl("floorBed")},
 {"id": "kit", "ka": "სამზარეულო", "en": "Kitchen", "area": A['kit'], "rects": rr('kit'), "label": lab(245, 460), "floor": fl("floorLiv", "tile")},
 {"id": "hall", "ka": "შესასვლელი", "en": "Entrance", "area": A['hall'], "rects": rr('hall'), "label": lab(560, 460), "floor": fl("floorHall")},
 {"id": "bath", "ka": "სააბაზანო", "en": "Bathroom", "area": A['bath'], "rects": rr('bath'), "label": lab(890, 505), "floor": fl("floorBath", "tile"), "walls": "wallTile"},
 {"id": "bed2", "ka": "საძინებელი 2", "en": "Bedroom 2", "area": A['bed2'], "rects": rr('bed2'), "label": lab(1260, 400), "floor": fl("floorBed")},
 {"id": "bed3", "ka": "საძინებელი 3", "en": "Bedroom 3", "area": A['bed3'], "rects": rr('bed3'), "label": lab(1260, 535), "floor": fl("floorBed")},
 {"id": "balc", "ka": "აივანი", "en": "Balcony", "area": A['balc'], "rects": rr('balc'), "label": lab(1487, 510), "outdoor": True},
]
walls_px = [
 [53, 53, 1449, 74], [53, 596, 1449, 617], [53, 74, 74, 596], [1428, 74, 1449, 596],
 [74, yP, 1428, yQ], [xL, 74, xL + 8, yP], [xK, yQ, xK + 8, 596],
 [xw, yn - 7, xE, yn], [xw, yn, xw + 8, 596], [xE, yQ, xE + 7, 596], [xE + 7, yb, 1428, yb + 7],
]
walls = [R(*w) for w in walls_px]
def op(i, kind, wall, s0, s1, **kw):
    # ('h', y0, y1): wall running along original x -> along Z after the turn; ('v', x0, x1): along X
    if wall[0] == 'h':
        at = sorted([X(wall[1]), X(wall[2])]); ss = sorted([Z(s0), Z(s1)]); d = {"id": i, "kind": kind, "axis": "z", "at": at, "a": ss[0], "b": ss[1]}
    else:
        at = sorted([Z(wall[1]), Z(wall[2])]); ss = sorted([X(s0), X(s1)]); d = {"id": i, "kind": kind, "axis": "x", "at": at, "a": ss[0], "b": ss[1]}
    d.update(kw); return d
LP = ('h', yP, yQ)
openings = [
 op("entry", "entry", ('h', 596, 617), 530, 600, handle="a"),
 op("kit", "door", LP, 186, 256, leaf="plain", hinge="a", into=-1, rest=0.4),
 op("liv", "door", LP, 510, 578, leaf="plain", hinge="b", into=1, rest=0.4),
 op("bed1", "door", LP, 1000, 1070, leaf="plain", hinge="a", into=-1, rest=0.4),
 op("bed2", "door", ('v', xE, xE + 7), yQ + 4, yQ + 62, leaf="plain", hinge="a", into=-1, rest=0.4),
 op("bed3", "door", ('h', yb, yb + 7), 1353, 1421, leaf="plain", hinge="a", into=1, rest=0.4),
 op("bath", "door", ('h', yn - 7, yn), 747, 817, leaf="plain", hinge="b", into=1, rest=0.4),
 op("balc", "door", ('v', 1428, 1449), 538, 594, leaf="glazed", hinge="b", into=-1, rest=0.3),
 op("winL", "window", ('v', 53, 74), 105, 212),
 op("winK", "window", ('v', 53, 74), 432, 540),
 op("winB1", "window", ('v', 1428, 1449), 109, 217),
 op("winB2", "window", ('v', 1428, 1449), 334, 389),
 op("winB3", "window", ('v', 1428, 1449), 476, 530),
]
rails = [{"pts": [[X(471), Z(1449)], [X(471), Z(bx1)], [X(596), Z(bx1)], [X(596), Z(1449)]]}]
def F(t, x, y, **kw):  # orig px
    d = {"t": t, "x": X(y), "z": Z(x)}; d.update(kw); return d
furn = [
 F("downlight", 300, 150), F("downlight", 300, 250), F("downlight", 700, 150), F("downlight", 700, 250),
 F("ceilingLamp", 1200, 200, s=0.22, I=1.6, col="SOFT", ch=2),
 F("ceilingLamp", 245, 460, s=0.2, I=1.4, col="SOFT", ch=2),
 F("ceilingLamp", 555, 400, s=0.14, I=0.8, col="COOL", ch=1),
 F("ceilingLamp", 880, 370, s=0.14, I=0.8, col="COOL", ch=1),
 F("ceilingLamp", 890, 505, s=0.16, I=1, col="COOL", ch=1),
 F("ceilingLamp", 1260, 395, s=0.18, I=1.3, col="SOFT", ch=2),
 F("ceilingLamp", 1260, 535, s=0.18, I=1.3, col="SOFT", ch=2),
]
data = {"name": "threebed94", "file": "threebed-balcony-94m2",
 "title": {"ka": "ბინა", "en": "Three-bedroom flat", "rooms": "8 rooms incl. balcony"},
 "total": round(sum(A.values()), 2), "ref": {"image": "threebed94.png", "ppm": round(P, 3), "origin": [OY, 1599 - OX], "turn": 90},
 "start": [X(500), Z(560), 0], "rooms": rooms, "walls": walls, "shafts": [], "openings": openings,
 "rails": rails, "switches": [], "furniture": furn}
json.dump(data, open("flats/threebed94.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("P", P, "yP", round(yP, 1), "xL", round(xL, 1), "xK", round(xK, 1), "xE", round(xE, 1), "yb", round(yb, 1), "xw", round(xw, 1), "yn", round(yn, 1))
