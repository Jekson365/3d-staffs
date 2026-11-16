# Three-room flat, 82 m2 (data threebed80). Run from source: py ../results/threebed-80m2/gen.py [ppm]
# Pixels are in the ORIGINAL (unturned) image; the plan is turned 180 deg, so X = (1403 - x)/P, Z = (850 - y)/P.
import json, sys
a = sys.argv[1:]
P = float(a[0]) if a else 101.238
YK = float(a[1]) if len(a) > 1 else 605   # kitchen north face (drawn 585)
OXo, OYo = 1403, 850
T0 = P * P
# partitions solved from the areas (drawn: 503/512 for the long partition, 500/510 east of 976, bath wall 1063-1073, 666-675)
ya = 182 + 27.2 * T0 / 883          # living south face
yb = 833 - 9.9 * T0 / 316           # bedroom 2 / hall north face
yc = 182 + 12.7 * T0 / 411          # bedroom 1 south face
yd = yc + 5                         # bathroom north face (thin partition)
BX = 1061                           # bath/laundry west face - 10 (wall 1061-1071)
BW = 1387 - (BX + 10)
yf = 833 - 5.1 * T0 / BW            # laundry north face
ye = yf - 5                         # bathroom south face
yk = YK
KX = BX - 7.7 * T0 / (833 - yk)     # kitchen west face, solved
KW = KX - 10
yh = yk - 9                         # hall strip south face
def _pa(rs): return sum((r[2] - r[0]) * (r[3] - r[1]) for r in rs)
_h = [[408, yb, KW, 833], [KW, yb, 976, yh], [976, yd, BX, yh]]
yh0 = yb - (12.5 * T0 - _pa(_h)) / (976 - 408)   # hall north face (thinner partition over the hall)
rooms_px = {
 'liv':  [[83, 182, 966, ya]],
 'bed1': [[976, 182, 1387, yc]],
 'bed2': [[83, yb, 399, 833]],
 'hall': [[408, yh0, KW, 833], [KW, yh0, 976, yh], [976, yd, BX, yh]],
 'kit':  [[KX, yk, BX, 833]],
 'bath': [[BX + 10, yd, 1387, ye]],
 'laun': [[BX + 10, yf, 1387, 833]],
 'balc': [[1403, 662, 1403 + 2.0 * T0 / 173, 835]],
}
AREAS = {'liv': 27.2, 'bed1': 12.7, 'bed2': 9.9, 'hall': 12.5, 'kit': 7.7, 'bath': 4.9, 'laun': 5.1, 'balc': 2.0}
def pa(rs): return sum((r[2] - r[0]) * (r[3] - r[1]) for r in rs)
if not P:
    P = (sum(pa(v) for v in rooms_px.values()) / sum(AREAS.values())) ** 0.5
T = P * P
for k, v in rooms_px.items(): print(k, round(pa(v) / T, 3), AREAS[k], f"{(pa(v) / T / AREAS[k] - 1) * 100:+.1f}%")
def X(p): return round((OXo - p) / P, 3)
def Z(p): return round((OYo - p) / P, 3)
def R(x0, y0, x1, y1):
    xs = sorted([X(x0), X(x1)]); zs = sorted([Z(y0), Z(y1)]); return [xs[0], zs[0], xs[1], zs[1]]
def rr(k): return [R(*r) for r in rooms_px[k]]
fl = lambda m, uv='plank': {"mat": m, "uv": uv}
def lab(x, y): return [X(x), Z(y)]
rooms = [
 {"id": "liv", "ka": "მისაღები", "en": "Living room", "area": 27.2, "rects": rr('liv'), "label": lab(520, 300), "floor": fl("floorLiv")},
 {"id": "bed1", "ka": "საძინებელი 1", "en": "Bedroom 1", "area": 12.7, "rects": rr('bed1'), "label": lab(1180, 300), "floor": fl("floorBed")},
 {"id": "bed2", "ka": "სამზარეულო", "en": "Kitchen", "area": 9.9, "rects": rr('bed2'), "label": lab(240, 660), "floor": fl("floorLiv", "tile")},
 {"id": "hall", "ka": "შესასვლელი", "en": "Entrance", "area": 12.5, "rects": rr('hall'), "label": lab(630, 650), "floor": fl("floorHall")},
 {"id": "kit", "ka": "სააბაზანო", "en": "Bathroom", "area": 7.7, "rects": rr('kit'), "label": lab(905, 700), "floor": fl("floorBath", "tile"), "walls": "wallTile"},
 {"id": "bath", "ka": "საძინებელი 2", "en": "Bedroom 2", "area": 4.9, "rects": rr('bath'), "label": lab(1230, 590), "floor": fl("floorBed")},
 {"id": "laun", "ka": "საძინებელი 3", "en": "Bedroom 3", "area": 5.1, "rects": rr('laun'), "label": lab(1230, 760), "floor": fl("floorBed")},
 {"id": "balc", "ka": "აივანი", "en": "Balcony", "area": 2.0, "rects": rr('balc'), "label": lab(1465, 750), "outdoor": True},
]
walls_px = [
 [67, 166, 1403, 182], [67, 833, 1403, 850], [67, 182, 83, 833], [1387, 182, 1403, 833],
 [83, ya, 408, yb], [408, ya, 976, yh0], [976, yc, 1387, yd], [966, 182, 976, ya], [399, yb, 408, 833], [KW, yh, KX, 833],
 [KX, yh, BX, yk], [BX, yd, BX + 10, 833], [BX + 10, ye, 1387, yf],
]
walls = [R(*w) for w in walls_px]
def op(i, kind, wall, s0, s1, **kw):
    # wall: ('h', y0, y1) horizontal run, ('v', x0, x1) vertical run; s0..s1 the span along it (orig px)
    if wall[0] == 'h':
        zs = sorted([Z(wall[1]), Z(wall[2])]); xs = sorted([X(s0), X(s1)])
        d = {"id": i, "kind": kind, "axis": "x", "at": zs, "a": xs[0], "b": xs[1]}
    else:
        xs = sorted([X(wall[1]), X(wall[2])]); zs = sorted([Z(s0), Z(s1)])
        d = {"id": i, "kind": kind, "axis": "z", "at": xs, "a": zs[0], "b": zs[1]}
    d.update(kw); return d
H = ('h', ya, yb); H2 = ('h', ya, yh0); HE = ('h', yc, yd)
openings = [
 op("entry", "entry", ('h', 833, 850), 553, 641, handle="a"),
 op("bed2", "door", H, 208, 297, leaf="plain", hinge="a", into=1, rest=0.4),
 op("liv", "door", H2, 540, 630, leaf="plain", hinge="a", into=1, rest=0.4),
 op("bed1", "door", HE, 976, BX, leaf="plain", hinge="a", into=1, rest=0.4),
 op("kit", "door", ('h', yh, yk), 806, 895, leaf="plain", hinge="a", into=1, rest=0.4),
 op("bath", "door", ('v', BX, BX + 10), yd + 6, yh - 4, leaf="plain", hinge="b", into=1, rest=0.3),
 op("laun", "door", ('h', ye, yf), 1300, 1387, leaf="plain", hinge="b", into=-1, rest=0.4),
 op("balc", "door", ('v', 1387, 1403), 700, 790, leaf="glazed", hinge="a", into=-1, rest=0.3),
 op("winL1", "window", ('h', 166, 182), 200, 420),
 op("winL2", "window", ('h', 166, 182), 600, 820),
 op("winB1", "window", ('h', 166, 182), 1090, 1290),
 op("winB2", "window", ('v', 67, 83), 600, 760),
 op("winK", "window", ('h', 833, 850), 860, 1000, sill=1.2),
 op("winBa", "window", ('v', 1387, 1403), 560, 630),
]
rails = [{"pts": [[X(1403), Z(662)], [X(1525), Z(662)], [X(1525), Z(835)], [X(1403), Z(835)]]}]
# furniture in turned metres
def F(t, x, z, **kw): d = {"t": t, "x": round(x, 3), "z": round(z, 3)}; d.update(kw); return d
def FR(t, r, **kw): d = {"t": t, "rect": [round(v, 3) for v in r]}; d.update(kw); return d
L = dict(x0=X(966), x1=X(83), z0=Z(ya), z1=Z(182))          # living
B1 = dict(x0=X(1387), x1=X(976), z0=Z(yc), z1=Z(182))
B2 = dict(x0=X(399), x1=X(83), z0=Z(833), z1=Z(yb))
K = dict(x0=X(BX), x1=X(KX), z0=Z(833), z1=Z(yk))
BA = dict(x0=X(1387), x1=X(BX + 10), z0=Z(ye), z1=Z(yd))
LA = dict(x0=X(1387), x1=X(BX + 10), z0=Z(833), z1=Z(yf))
HA = dict(x0=X(KW), x1=X(408), z0=Z(833), z1=Z(yh0))
leafy = dict(seed=3, h=1.3, n=16, leaf=0.3, mats=["leafA", "leafA", "leafD"], pot="pot", potR=0.16, potH=0.32)
lz = (L['z0'] + L['z1']) / 2
furn = [
 # living: TV on the west partition, sofa facing it, dining at the east end
 F("media", L['x0'], lz, r=0),
 F("sofa", L['x0'] + 3.0, lz, r=-90),
 F("coffeeTable", L['x0'] + 1.7, lz),
 FR("rug", [L['x0'] + 1.0, lz - 1.1, L['x0'] + 2.4, lz + 1.1], mat="rugTri"),
 F("floorLamp", L['x0'] + 3.3, L['z1'] - 0.35),
 F("diningSet", L['x1'] - 2.0, lz + 0.2, w=1.6, d=0.9),
 F("pendant", L['x1'] - 2.0, lz + 0.2),
 dict(F("plantLeafy", L['x1'] - 0.35, L['z1'] - 0.35), **leafy),
 F("downlight", L['x0'] + 1.5, L['z0'] + 0.9), F("downlight", L['x0'] + 1.5, L['z1'] - 0.9),
 F("downlight", L['x0'] + 4.5, L['z0'] + 0.9), F("downlight", L['x0'] + 4.5, L['z1'] - 0.9),
 # bedroom 1
 F("bed", B1['x0'] + 1.1, (B1['z0'] + B1['z1']) / 2 + 0.3, r=0),
 F("nightTable", B1['x0'] + 0.25, (B1['z0'] + B1['z1']) / 2 - 0.85),
 F("nightTable", B1['x0'] + 0.25, (B1['z0'] + B1['z1']) / 2 + 1.45),
 FR("closet", [B1['x0'], B1['z0'], B1['x0'] + 2.8, B1['z0'] + 0.6], face="s"),
 F("ceilingLamp", B1['x0'] + 2.0, (B1['z0'] + B1['z1']) / 2, s=0.22, I=1.6, col="SOFT", ch=2),
 # bedroom 2
 F("bed", B2['x0'] + 1.1, (B2['z0'] + B2['z1']) / 2 - 0.2, r=0),
 F("nightTable", B2['x0'] + 0.25, B2['z0'] + 0.3),
 F("ceilingLamp", (B2['x0'] + B2['x1']) / 2, (B2['z0'] + B2['z1']) / 2, s=0.2, I=1.4, col="SOFT", ch=2),
 # hall
 F("coatBench", HA['x0'], HA['z0'] + 0.9, r=0),
 FR("rug", [7.55, HA['z0'] + 0.1, 8.3, HA['z0'] + 0.6], mat="rubber"),
 F("ceilingLamp", (HA['x0'] + HA['x1']) / 2, 1.4, s=0.14, I=0.8, col="COOL", ch=1),
 F("ceilingLamp", 4.9, 2.95, s=0.11, I=0.6, col="COOL", ch=1),
 # kitchen
 FR("counter", [K['x0'], K['z0'], K['x1'], K['z0'] + 0.6], face="s", sink=1.6, hob=0.7),
 F("fridge", K['x1'] - 0.4, K['z0'] + 0.6, r=0) if False else F("fruitBowl", K['x0'] + 2.4, K['z0'] + 0.3),
 F("diningSet", K['x0'] + 0.9, K['z1'] - 0.75, w=0.8, d=0.7, ends="", endPlates=False),
 F("downlight", K['x0'] + 1.0, K['z0'] + 0.9, I=0.85, col="COOL", ch=1),
 F("downlight", K['x0'] + 2.2, K['z0'] + 0.9, I=0.85, col="COOL", ch=1),
 # bathroom: vanity and toilet on the north wall, bath along the south wall
 F("toilet", BA['x0'] + 0.45, BA['z1'], r=180),
 F("vanity", BA['x0'] + 1.3, BA['z1'], r=180),
 F("shower", BA["x1"] - 0.5, BA["z0"], w=0.85, d=0.9, glass="w"),
 F("ceilingLamp", BA['x0'] + 1.5, (BA['z0'] + BA['z1']) / 2, s=0.16, I=1, col="COOL", ch=1),
 # laundry
 F("washer", LA['x1'] - 0.45, LA['z0'], r=0),
 F("washer", LA['x1'] - 1.1, LA['z0'], r=0),
 F("ceilingLamp", LA['x0'] + 1.5, (LA['z0'] + LA['z1']) / 2, s=0.14, I=0.9, col="COOL", ch=1),
 # balcony
 F("planter", X(1490), Z(690), seed=21),
 F("rattanChair", X(1470), Z(800), r=-90),
]
data = {"name": "threebed80", "file": "threebed-balcony-82m2",
 "title": {"ka": "ბინა", "en": "Three-bedroom flat", "rooms": "8 rooms incl. balcony"},
 "total": 82.0, "ref": {"image": "threebed80.png", "ppm": round(P, 3), "origin": [1600 - 1 - OXo, 918 - 1 - OYo], "turn": 180},
 "start": [X(597), Z(780), 180], "rooms": rooms, "walls": walls, "shafts": [], "openings": openings,
 "rails": rails, "switches": [], "furniture": [f for f in furn if f["t"] in ("downlight","ceilingLamp")]}
json.dump(data, open("flats/threebed80.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("P", round(P, 3))
