# One-bedroom flat with a balcony, 74.52 m2 (data onebed75). Run from source: py ../results/onebed-balcony-75m2/gen.py
# Coordinates below are ORIGINAL image pixel edges (plan.webp, 790x600); the flat is turned 180 deg, so
# X = (664 - x) / P, Z = (600 - y) / P.  args: ppm, bath bottom y, bath west wall x, west wall inner face x
import json, sys
a = [float(v) for v in sys.argv[1:]] + [None] * 4
P = a[0] or 58.2
BB = a[1] or 563          # bath floor south (original) edge, drawn 563
BW = a[2] or 498          # bath west wall west face, drawn 498
WI = a[3] or 138          # west wall inner face, drawn 138
def X(p): return round((664 - p) / P, 3)
def Z(p): return round((600 - p) / P, 3)
def R(x0, y0, x1, y1): return [X(x1), Z(y1), X(x0), Z(y0)]
def pa(rs): return sum((r[2] - r[0]) * (r[3] - r[1]) for r in rs)
T = P * P
YH = 563 - (4.50 * T - 41 * 19) / (241 - WI)
YK = 475 - (10.37 * T - (BW - 246) * 107) / (BW - 241)
rooms_px = {
 'hall': [[WI, YH, 241, 563], [200, 563, 241, 582]],
 'kit': [[241, YK, BW, 475], [246, 475, BW, 582]],
 'living': [[WI, 155, 200, YH], [200, 130, 241, YH], [241, 130, 429, YK], [429, 374, 566, 437], [429, 437, 460, YK]],
 'bed': [[435, 130, 498, 368], [498, 155, 571, 368], [571, 130, 646, 368]],
 'bath': [[BW + 5, 442, 646, BB], [571, 374, 646, 442]],
 'balc': [[206, 14, 573, 113]],
}
for k, v in rooms_px.items(): print(k, round(pa(v) / T, 3))
print("YH", round(YH, 1), "YK", round(YK, 1))
def rr(k): return [R(*r) for r in rooms_px[k]]
fl = lambda m, uv='plank': {"mat": m, "uv": uv}
def lab(x, y): return [X(x), Z(y)]
rooms = [
 {"id": "hall", "ka": "ჰოლი", "en": "Hall", "area": 4.50, "rects": rr('hall'), "label": lab(180, 520), "floor": fl("floorHall")},
 {"id": "kit", "ka": "სამზარეულო", "en": "Kitchen", "area": 10.37, "rects": rr('kit'), "label": lab(370, 500), "floor": fl("floorLiv", "tile")},
 {"id": "living", "ka": "საერთო ოთახი", "en": "Living room", "area": 27.28, "rects": rr('living'), "label": lab(330, 250), "floor": fl("floorLiv")},
 {"id": "bed", "ka": "საძინებელი", "en": "Bedroom", "area": 14.29, "rects": rr('bed'), "label": lab(520, 330), "floor": fl("floorBed")},
 {"id": "bath", "ka": "WC", "en": "Bathroom", "area": 7.61, "rects": rr('bath'), "label": lab(580, 480), "floor": fl("floorBath", "tile"), "walls": "wallTile"},
 {"id": "balc", "ka": "აივანი", "en": "Balcony", "area": 10.80, "rects": rr('balc'), "label": lab(390, 60), "outdoor": True},
]
walls_px = [
 [126, 155, WI, 563], [126, 113, 200, 155], [126, 563, 200, 600], [200, 582, BW, 600],
 [BW, BB, 646, 600], [646, 113, 664, 600],
 [200, 113, 498, 130], [498, 113, 571, 155], [571, 113, 646, 130], [187, 1, 206, 113],
 [429, 130, 435, 368], [429, 368, 646, 374], [566, 374, 571, 437], [460, 437, 571, 442],
 [BW, 442, BW + 5, BB], [241, 475, 246, 582],
]
walls = [R(*w) for w in walls_px]
shafts = []
def op(i, kind, axis, at, a_, b_, **kw):
    if axis == 'x': d = {"id": i, "kind": kind, "axis": "x", "at": sorted([Z(at[0]), Z(at[1])]), "a": min(X(a_), X(b_)), "b": max(X(a_), X(b_))}
    else: d = {"id": i, "kind": kind, "axis": "z", "at": sorted([X(at[0]), X(at[1])]), "a": min(Z(a_), Z(b_)), "b": max(Z(a_), Z(b_))}
    d.update(kw); return d
openings = [
 op("entry", "entry", "z", (126, WI), 488, 551, handle="a"),
 op("winLiv", "window", "x", (113, 130), 232, 343),
 op("balcLiv", "door", "x", (113, 130), 345, 398, leaf="glazed", hinge="b", into=1, rest=0.3),
 op("balcBed", "door", "x", (113, 130), 441, 497, leaf="glazed", hinge="a", into=1, rest=0.3),
 op("winBed", "window", "x", (113, 130), 573, 621),
 op("bed", "door", "x", (368, 374), 445, 504, leaf="plain", hinge="b", into=1, rest=0.4),
 op("bath", "door", "x", (437, 442), 509, 559, leaf="plain", hinge="b", into=1, rest=0.4),
]
rails = [{"pts": [[X(206), Z(14)], [X(573), Z(14)], [X(573), Z(113)]]}]
def F(t, x=None, y=None, **kw):
    d = {"t": t}
    if x is not None: d["x"] = X(x); d["z"] = Z(y)
    d.update(kw); return d
def FR(t, r, **kw): d = {"t": t, "rect": R(*r)}; d.update(kw); return d
leafy = dict(seed=3, h=1.3, n=16, leaf=0.3, mats=["leafA", "leafA", "leafD"], pot="pot", potR=0.16, potH=0.32)
furn = [
 # kitchen (original: L along the south wall and the bath wall)
 FR("counter", [270, 548, BW, 582], face="s", hob=0.45),
 FR("counter", [BW - 38, 440, BW, 548], face="e", sink=0.5),
 F("kitchenShelf", 390, 582, r=0),
 F("fruitBowl", 420, 565),
 F("diningSet", 342, 428, w=0.9, d=0.9, ends="", endPlates=False),
 F("pendant", 342, 428),
 F("downlight", 330, 520, I=0.85, col="COOL", ch=1),
 F("downlight", 420, 500, I=0.85, col="COOL", ch=1),
 # living
 F("sofa", WI + 33, 265, r=-90),
 F("shellSofa", 265, 130 + 25, r=180),
 FR("block", [240, 215, 290, 310], h=0.4, mat="oak"),
 F("media", 429, 268, r=0),
 dict(F("plantLeafy", 155, 170), **leafy),
 F("floorLamp", 215, 145),
 F("downlight", 200, 220), F("downlight", 350, 220), F("downlight", 200, 340), F("downlight", 350, 340),
 F("downlight", 500, 405, I=0.7, col="SOFT", ch=1),
 # hall
 FR("closet", [222, 475, 241, 563], face="e"),
 FR("rug", [WI + 7, 495, WI + 37, 545], mat="rubber"),
 F("ceilingLamp", 180, 520, s=0.11, I=0.6, col="COOL", ch=1),
 # bedroom (bed head to the original east wall)
 F("bed", 577, 240, r=0),
 F("nightTable", 632, 200), F("nightTable", 632, 285),
 F("ceilingLamp", 560, 250, s=0.22, I=1.6, col="SOFT", ch=2),
 # bath
 F("vanity", 535, BB, r=0),
 F("washer", 582, BB),
 F("toilet", 626, BB),
 F("shower", 608, 442, w=1.25, d=1.1, glass=""),
 F("ceilingLamp", 575, 480, s=0.16, I=1, col="COOL", ch=1),
 # balcony
 F("bistroTable", 300, 60), F("rattanChair", 260, 60, r=90),
 F("planter", 540, 30, seed=21),
 F("ceilingLamp", 390, 60, s=0.14, I=0.9, col="SOFT", ch=2),
]
data = {"name": "onebed75", "file": "onebed-balcony-75m2",
 "title": {"ka": "ბინა", "en": "One-bedroom flat", "rooms": "6 rooms incl. balcony"},
 "total": 74.52, "ref": {"image": "onebed75.png", "ppm": P, "origin": [126, 0], "turn": 180},
 "start": [X(165), Z(520), 90], "rooms": rooms, "walls": walls, "shafts": shafts, "openings": openings,
 "rails": rails, "switches": [], "furniture": furn}
json.dump(data, open("flats/onebed75.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
