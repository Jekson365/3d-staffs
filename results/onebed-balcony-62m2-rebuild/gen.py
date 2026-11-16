# Rebuild of the 61.67 m2 one-bedroom plan (data onebed62r). Run from source: py ../results/onebed-balcony-62m2-rebuild/gen.py
# args: ppm, east-wall thickening px, bath/hall wall west x, bath shaft east x, balcony slab edge y
import json, sys
a = [float(v) for v in sys.argv[1:]] + [None] * 5
P = a[0] or 55.8
K = a[1] if a[1] is not None else 9
BW = a[2] or 345          # bath/hall wall west face (drawn 339)
SH = a[3] or 254          # bath shaft east (drawn 266)
YS = a[4] or 584.6        # balcony slab edge
OX, OY = 195, 0
E = 583 - K
def X(p): return round((p - OX) / P, 3)
def Z(p): return round((p - OY) / P, 3)
def R(x0, z0, x1, z1): return [X(x0), Z(z0), X(x1), Z(z1)]
def pa(rs): return sum((r[2] - r[0]) * (r[3] - r[1]) for r in rs)
T = P * P
HB = BW + 4
# hall: [HB,11,434,162] + [434,67,hx,162] -> solve hx
hx = 434 + (4.24 * T - (434 - HB) * 151) / 95
kfix = [[439, 11, 518, 35], [564, 11, E, 35], [439, 35, E, 67]]
# kitchen [hx,67,E,162] + [hx,162,559,yk] -> solve yk
yk = 162 + (6.49 * T - pa(kfix) - (E - hx) * 95) / (559 - hx)
rooms_px = {
 'hall': [[HB, 11, 434, 162], [434, 67, hx, 162]],
 'kit': kfix + [[hx, 67, E, 162], [hx, 162, 559, yk]],
 'living': [[391, 162, hx, yk], [391, yk, 559, 231], [391, 231, E, 478], [391, 478, 524, 501]],
 'bed': [[212, 231, 386, 478], [254, 478, 386, 501], [319, 166, 386, 231]],
 'bath': [[SH, 11, BW, 35], [224, 35, BW, 161], [230, 161, 315, 227]],
 'balc': [[212, 517, 577, YS]],
}
for k, v in rooms_px.items(): print(k, round(pa(v) / T, 3))
def rr(k): return [R(*r) for r in rooms_px[k]]
fl = lambda m, uv='plank': {"mat": m, "uv": uv}
rooms = [
 {"id": "hall", "ka": "ჰოლი", "en": "Hall", "area": 4.24, "rects": rr('hall'), "label": [X(390), Z(95)], "floor": fl("floorHall")},
 {"id": "kit", "ka": "სამზარეულო", "en": "Kitchen", "area": 6.49, "rects": rr('kit'), "label": [X(490), Z(105)], "floor": fl("floorLiv", "tile")},
 {"id": "living", "ka": "საერთო ოთახი", "en": "Living room", "area": 18.87, "rects": rr('living'), "label": [X(450), Z(440)], "floor": fl("floorLiv")},
 {"id": "bed", "ka": "საძინებელი", "en": "Bedroom", "area": 16.15, "rects": rr('bed'), "label": [X(300), Z(450)], "floor": fl("floorBed")},
 {"id": "bath", "ka": "WC", "en": "Bathroom", "area": 7.41, "rects": rr('bath'), "label": [X(290), Z(100)], "floor": fl("floorBath", "tile"), "walls": "wallTile"},
 {"id": "balc", "ka": "აივანი", "en": "Balcony", "area": 7.93, "rects": rr('balc'), "label": [X(300), Z(555)], "outdoor": True},
]
walls_px = [
 [213, 0, 594, 11], [213, 11, 224, 161], [195, 161, 230, 231], [195, 231, 212, 517], [212, 478, 254, 501],
 [E, 11, 594, 517], [559, 162, E, 231], [524, 478, E, 501], [212, 501, 594, 517],
 [386, 166, 391, 501], [315, 161, 391, 166], [315, 166, 319, 227], [230, 227, 319, 231],
 [BW, 11, HB, 161], [434, 11, 439, 67],
]
walls = [R(*w) for w in walls_px]
shafts = [{"rect": R(224, 11, SH, 35)}, {"rect": R(518, 11, 564, 35)}]
def op(i, kind, axis, at, a_, b_, **kw):
    if axis == 'x': d = {"id": i, "kind": kind, "axis": "x", "at": [Z(at[0]), Z(at[1])], "a": X(a_), "b": X(b_)}
    else: d = {"id": i, "kind": kind, "axis": "z", "at": [X(at[0]), X(at[1])], "a": Z(a_), "b": Z(b_)}
    d.update(kw); return d
openings = [
 op("entry", "entry", "x", (0, 11), 365, 418, handle="a"),
 op("bath", "door", "z", (BW, HB), 70, 116, leaf="plain", hinge="a", into=-1, rest=0.4),
 op("bed", "door", "z", (386, 391), 174, 226, leaf="plain", hinge="a", into=-1, rest=0.4),
 op("winBed", "window", "x", (501, 517), 257, 312),
 op("balcBed", "door", "x", (501, 517), 314, 361, leaf="glazed", hinge="a", into=1, rest=0.3),
 op("balcLiv", "door", "x", (501, 517), 393, 441, leaf="glazed", hinge="b", into=1, rest=0.3),
 op("winLiv", "window", "x", (501, 517), 443, 497),
]
rails = [{"pts": [[X(212), Z(517)], [X(212), Z(YS)], [X(577), Z(YS)], [X(577), Z(517)]]}]
def F(t, x=None, z=None, **kw):
    d = {"t": t}
    if x is not None: d["x"] = X(x); d["z"] = Z(z)
    d.update(kw); return d
def FR(t, r, **kw): d = {"t": t, "rect": R(*r)}; d.update(kw); return d
leafy = dict(seed=3, h=1.3, n=16, leaf=0.3, mats=["leafA", "leafA", "leafD"], pot="pot", potR=0.16, potH=0.32)
furn = [
 FR("counter", [439, 11, 518, 52], face="s", sink=0.6),
 FR("counter", [E - 34, 35, E, 158], face="w", hob=0.5),
 F("kitchenShelf", 478, 11, r=0),
 F("fruitBowl", 470, 25),
 F("diningSet", 480, 162, w=0.9, d=0.9, ends="", endPlates=False),
 F("pendant", 480, 162),
 F("downlight", 490, 60, I=0.85, col="COOL", ch=1),
 F("downlight", 490, 120, I=0.85, col="COOL", ch=1),
 F("sofa", E - 31, 350, r=-90),
 FR("rug", [440, 270, 525, 430], mat="rugTri"),
 FR("block", [466, 302, 503, 396], h=0.4, mat="oak"),
 F("media", 391, 350, r=0),
 F("floorLamp", E - 15, 465),
 dict(F("plantLeafy", E - 18, 248), **leafy),
 F("downlight", 430, 280), F("downlight", 530, 280), F("downlight", 430, 420), F("downlight", 530, 420),
 F("bed", 274, 385, r=0),
 F("nightTable", 225, 318), F("nightTable", 225, 452),
 FR("closet", [212, 231, 316, 276], face="s"),
 F("ceilingLamp", 300, 380, s=0.22, I=1.6, col="SOFT", ch=2),
 FR("closet", [HB, 128, 391, 162], face="n"),
 FR("rug", [368, 18, 415, 45], mat="rubber"),
 F("ceilingLamp", 392, 95, s=0.11, I=0.6, col="COOL", ch=1),
 F("toilet", 302, 11),
 F("washer", 241, 35),
 F("vanity", 224, 115, r=90),
 F("shower", 272, 166, w=1.4, d=1.05, glass="e"),
 F("ceilingLamp", 285, 95, s=0.16, I=1, col="COOL", ch=1),
 F("bistroTable", 540, 545), F("rattanChair", 510, 545, r=-90),
 F("planter", 235, 540, seed=21),
 F("ceilingLamp", 400, 550, s=0.14, I=0.9, col="SOFT", ch=2),
]
data = {"name": "onebed62r", "file": "onebed-balcony-62m2-rebuild",
 "title": {"ka": "ბინა", "en": "One-bedroom flat", "rooms": "6 rooms incl. balcony"},
 "total": 61.67, "ref": {"image": "onebed62r.png", "ppm": P, "origin": [OX, OY], "turn": 180},
 "start": [X(392), Z(30), 180], "rooms": rooms, "walls": walls, "shafts": shafts, "openings": openings,
 "rails": rails, "switches": [], "furniture": furn}
json.dump(data, open("flats/onebed62r.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("hx", round(hx, 1), "yk", round(yk, 1))
