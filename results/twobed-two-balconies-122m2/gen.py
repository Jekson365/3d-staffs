# Two-bedroom flat with two balconies, 122 m2 (data twobed122). Run from source: py ../results/twobed-two-balconies-122m2/gen.py [ppm]
# Pixels are in the ORIGINAL image (960x776 WebP behind a .png link). Turned 90 deg anticlockwise so the living room's
# slanted glazed facade (drawn on the left) faces south: X = (y - OY)/P, Z = (OX - x)/P.
# Diagonal lines are 45 deg; given as x + y = c or y - x = c in original pixels.
import json, math, sys
a = sys.argv[1:]
P = float(a[0]) if len(a) > 0 else 42.6
T = P * P
OX, OY = 777, 40
S2 = math.sqrt(2)
A = {'liv': 46.9, 'bedA': 17.4, 'bedB': 14.6, 'hall': 7.9, 'balcN': 11.5, 'balcS': 7.5, 'bath': 6.8, 'wc': 3.9}
# area knobs (original px), defaults = as drawn
k = dict(livN=197, nwIn=528, swIn=128, bedBfac=797, railN_L=517, railN_R=-437, railS_NW=800, railS_SW=406,
         hallS=614, bedAs=707, bathE=738, wcS=530, bedBs=578, bathS=728, hallTop=420, bedAw=326, wcW=547)
for s in a[1:]:
    n, v = s.split('='); k[n] = float(v)

def line_x_sum(c, y): return c - y        # x on x + y = c
def line_x_diff(c, y): return y - c       # x on y - x = c
def inter(csum, cdiff):                   # x + y = csum, y - x = cdiff
    y = (csum + cdiff) / 2; return (csum - y, y)

wcS, hallS, bedAs, bathE, bedBs, bathS, hallTop, bedAw, wcW = (k[n] for n in ['wcS', 'hallS', 'bedAs', 'bathE', 'bedBs', 'bathS', 'hallTop', 'bedAw', 'wcW'])
livN = k['livN']
# --- rooms in px: rect lists and convex polys
tip = inter(k['nwIn'], k['swIn'])
rooms_px = {
 'liv': {'poly': [(line_x_sum(k['nwIn'], livN), livN), (618, livN), (618, hallTop), (line_x_diff(k['swIn'], hallTop), hallTop), tip],
         'rects': [[(line_x_diff(k['swIn'], hallTop) + line_x_diff(k['swIn'], 438)) / 2, hallTop, 484, 438]]},
 'bedB': {'poly': [(line_x_diff(k['swIn'], 442), 442), (484, 442), (484, bedBs), (line_x_diff(268, bedBs), bedBs),
                   inter(k['bedBfac'], 268), inter(k['bedBfac'], k['swIn'])],
          'rects': [[484, 490, 496, bedBs]]},
 'bedA': {'rects': [[bedAw, 581, 500, bedAs], [500, hallS + 4, 610, bedAs]]},
 'hall': {'rects': [[500, hallTop, wcW, wcS + 16], [500, wcS + 16, 618, hallS]]},
 'wc': {'rects': [[wcW + 4, 423, 618, wcS]]},
 'bath': {'rects': [[626, 618, bathE, bathS]]},
 'balcN': {'poly': [(line_x_sum(k['railN_L'], 185), 185), inter(k['railN_L'], k['railN_R']), (line_x_diff(k['railN_R'], 185), 185)]},
 'balcS': {'poly': [inter(k['railS_NW'], k['railS_SW']), inter(k['railS_NW'], 272), (321, 321 + 272), (321, 712), (line_x_diff(k['railS_SW'], 712), 712)]},
}
def parea(pts):
    s = 0
    for i in range(len(pts)):
        x0, y0 = pts[i]; x1, y1 = pts[(i + 1) % len(pts)]; s += x0 * y1 - x1 * y0
    return abs(s) / 2
def room_area(r): return (parea(r['poly']) if 'poly' in r else 0) + sum((q[2] - q[0]) * (q[3] - q[1]) for q in r.get('rects', []))
tot = 0
for n, r in rooms_px.items():
    ar = room_area(r) / T; tot += ar
    print(f"{n:6s} {ar:7.2f} {A[n]:6.2f} {(ar / A[n] - 1) * 100:+6.2f}%")
print('sum', round(tot, 2), 'given', sum(A.values()), 'P', P)

def X(py): return round((py - OY) / P, 3)
def Z(px): return round((OX - px) / P, 3)
def pt(p): return [X(p[1]), Z(p[0])]
def R(x0, y0, x1, y1):
    xs = sorted([X(y0), X(y1)]); zs = sorted([Z(x0), Z(x1)]); return [xs[0], zs[0], xs[1], zs[1]]
def conv(r):
    d = {}
    if 'poly' in r: d['poly'] = [pt(p) for p in r['poly']]
    d['rects'] = [R(*q) for q in r.get('rects', [])]
    return d
fl = lambda m, uv='plank': {"mat": m, "uv": uv}
def lab(x, y): return [X(y), Z(x)]
def room(i, ka, en, lb, floor, **kw):
    d = {"id": i, "ka": ka, "en": en, "area": A[i]}; d.update(conv(rooms_px[i])); d["label"] = lab(*lb); d["floor"] = floor; d.update(kw); return d
rooms = [
 room('liv', "მისაღები", "Living room", (430, 360), fl("floorLiv")),
 room('bedA', "საძინებელი", "Bedroom", (440, 610), fl("floorBed")),
 room('bedB', "საძინებელი", "Bedroom", (420, 545), fl("floorBed")),
 room('hall', "ჰოლი", "Hall", (560, 575), fl("floorHall")),
 room('wc', "სველი წერტილი", "Shower room", (575, 455), fl("floorBath", "tile"), walls="wallTile"),
 room('bath', "სველი წერტილი", "Bathroom", (670, 650), fl("floorBath", "tile"), walls="wallTile"),
 room('balcN', "აივანი", "Balcony", (478, 120), fl("floorBalc", "slab"), outdoor=True),
 room('balcS', "აივანი", "Balcony", (262, 650), fl("floorBalc", "slab"), outdoor=True),
]
walls_px = [
 [314, 185, 639, 197], [328, 197, 365, 210], [328, 210, 348, 227], [593, 197, 618, 210],   # north wall, corner piers
 [618, 185, 626, 530], [618, 530, 626, 602],                                               # east wall (kitchen, entrance)
 [328, 392, 348, 438], [605, 392, 618, hallTop],                                           # piers
 [305, 438, 484, 442],                                                                     # living / bedroom B
 [496, 490, 500, bedBs],                                                                   # bedroom B / hall
 [wcW, hallTop - 1, wcW + 4, wcS + 16], [wcW + 4, hallTop - 1, 618, 423], [wcW + 4, wcS, 618, wcS + 16],  # shower room
 [496, hallS, 610, hallS + 4],                                                             # hall / bedroom A
 [308, bedBs, 500, 581],                                                                   # bedroom B / bedroom A
 [321, 578, 335, 610], [bedAw - 5, 610, bedAw, bedAs], [324, 683, 348, 728],               # bedroom A west wall, pier, pillar
 [bedAw - 5, bedAs, 610, bedAs + 8],                                                       # bedroom A south wall
 [610, 602, 626, 735], [626, 602, 777, 618], [bathE, 618, 777, bathS], [626, bathS, 777, 735],  # bathroom
]
walls = [R(*w) for w in walls_px]
shafts = [{"rect": R(484, 406, 500, 490)}]
def op(i, kind, wall, s0, s1, **kw):
    if wall[0] == 'h':
        at = sorted([X(wall[1]), X(wall[2])]); ss = sorted([Z(s0), Z(s1)]); d = {"id": i, "kind": kind, "axis": "z", "at": at, "a": ss[0], "b": ss[1]}
    else:
        at = sorted([Z(wall[1]), Z(wall[2])]); ss = sorted([X(s0), X(s1)]); d = {"id": i, "kind": kind, "axis": "x", "at": at, "a": ss[0], "b": ss[1]}
    d.update(kw); return d
NW = ('h', 185, 197)
openings = [
 op("entry", "entry", ('v', 618, 626), 553, 592, handle="a"),
 op("balcN1", "door", NW, 370, 405, leaf="glazed", hinge="b", into=1, rest=0.3),
 op("fixN1", "fixed", NW, 407, 445),
 op("balcN2", "door", NW, 472, 507, leaf="glazed", hinge="b", into=1, rest=0.3),
 op("fixN2", "fixed", NW, 509, 547),
 op("winK1", "window", ('v', 618, 626), 245, 315, sill=0.9),
 op("winK2", "window", ('v', 618, 626), 325, 380, sill=0.9),
 op("wc", "door", ('v', wcW, wcW + 4), 460, 498, leaf="plain", hinge="a", into=-1, rest=0.4),
 op("bedB", "door", ('v', 496, 500), 498, 536, leaf="plain", hinge="b", into=1, rest=0.4),
 op("bedA", "door", ('h', hallS, hallS + 4), 507, 545, leaf="plain", hinge="b", into=1, rest=0.4),
 op("bath", "door", ('v', 610, 626), 634, 671, leaf="plain", hinge="a", into=-1, rest=0.4),
 op("balcS", "door", ('v', bedAw - 5, bedAw), 614, 652, leaf="glazed", hinge="a", into=-1, rest=0.3),
]
# slanted walls: centre lines in px, openings as px distance along a -> b
def slant(pa, pb, tpx, ops=(), inn=True, side=None):
    d = {"a": pt(pa), "b": pt(pb), "t": round(tpx / P, 3), "mat": "facade"}
    if inn: d["in"] = "wall"
    if ops:
        L = []
        for o in ops:
            q = dict(o); q["from"] = round(o["from"] / P, 3); q["to"] = round(o["to"] / P, 3)
            if q["kind"] == "door":   # into: 1 when the room point `side` is left of a -> b (new coords, left = (dz, -dx))
                A_, B_ = pt(pa), pt(pb); dx, dz = B_[0] - A_[0], B_[1] - A_[1]; sp = pt(q.pop("side"))
                q["into"] = 1 if (sp[0] - A_[0]) * dz + (sp[1] - A_[1]) * (-dx) > 0 else -1
            L.append(q)
        d["ops"] = L
    return d
nwC, swC, fbC = k['nwIn'] - 9, k['swIn'] + 8.5, k['bedBfac'] - 8.5     # centre lines, walls 0.29 m
tipC = inter(nwC, swC); cor = inter(fbC, swC)
pNW = (line_x_sum(nwC, 191), 191)
d = lambda y0, y: (y - y0) * S2
slants = [
 slant(pNW, tipC, 12.7, ops=[{"kind": "fixed", "from": d(191, 228), "to": d(191, 254)},
                             {"id": "livW", "kind": "door", "from": d(191, 256), "to": d(191, 288), "leaf": "glazed", "hinge": "b", "rest": 0.3, "side": (300, 280)}]),
 slant(tipC, cor, 12.7, ops=[{"kind": "fixed", "from": d(tipC[1], 357), "to": d(tipC[1], 381)},
                             {"id": "livS", "kind": "door", "from": d(tipC[1], 383), "to": d(tipC[1], 413), "leaf": "glazed", "hinge": "b", "rest": 0.3, "side": (300, 360)}]),
 slant(cor, inter(fbC, 270), 12.7),
 slant(inter(fbC, 270), (321, 591), 4.5, inn=False,
       ops=[{"id": "bedBb", "kind": "door", "from": 4, "to": 40, "leaf": "glazed", "hinge": "a", "rest": 0.3, "side": (330, 540)},
            {"kind": "fixed", "from": 42, "to": 76}]),
]
rails = [
 {"pts": [pt((line_x_sum(k['railN_L'], 185), 185)), pt(inter(k['railN_L'], k['railN_R'])), pt((line_x_diff(k['railN_R'], 185), 185))]},
 {"pts": [pt(inter(k['railS_NW'], 272)), pt(inter(k['railS_NW'], k['railS_SW'])), pt((line_x_diff(k['railS_SW'], 712), 712))]},
]
def F(t, x, y, **kw):
    d = {"t": t, "x": X(y), "z": Z(x)}; d.update(kw); return d
def FR(t, x0, y0, x1, y1, **kw):
    d = {"t": t, "rect": R(x0, y0, x1, y1)}; d.update(kw); return d
furn = [
 # living room: sofa faces the coffee table (drawn below it), dining table by the kitchen
 F("sofa", 395, 268, r=90), F("sideTable", 335, 272), F("sideTable", 457, 272),
 F("coffeeTable", 400, 310), F("armchair", 330, 315, r=180), F("armchair", 443, 338, r=-45),
 FR("rug", 345, 285, 455, 345, mat="rugTri"),
 F("diningSet", 525, 297, w=2.1, d=0.9, ends=""),
 FR("counter", 595, 228, 618, 352, face="s", sink=2.15, hob=0.6),
 F("fridge", 607, 368, r=-90, w=0.6, d=0.6, h=1.85),
 F("plantLeafy", 600, 228 - 15, seed=5, h=1.3, n=14, leaf=0.3, mats=["leafA", "leafA", "leafD"], pot="pot", potR=0.16, potH=0.32),
 F("floorLamp", 300, 245),
 # bedroom B (14.6): head to the drawn north wall
 F("bed", 420, 487), F("nightTable", 362, 455), F("nightTable", 478, 455),
 # bedroom A (17.4): head to the drawn south wall, wardrobe strip in the east part
 F("bed", 440, 662, r=180), F("nightTable", 385, 692), F("nightTable", 495, 692),
 FR("closet", 500, 674, 610, bedAs, face="w"),
 # shower room
 F("vanity", 578, 423, r=90), F("toilet", 565, wcS, r=-90), F("shower", 618, 502, r=0, w=1.15, d=0.85, glass="w"),
 # bathroom
 FR("bath", 700, 620, bathE, 695, along="x"), F("toilet", 712, 718, r=0), F("vanity", 645, bathS, r=-90),
 # balconies
 F("rattanChair", 482, 88, r=135), F("rattanChair", 540, 140, r=90), F("bistroTable", 505, 113), F("planter", 480, 165, seed=4),
 F("rattanChair", 232, 608, r=-45), F("rattanChair", 284, 655, r=-90), F("bistroTable", 260, 630),
 # lamps
 F("downlight", 330, 260), F("downlight", 330, 360), F("downlight", 440, 240), F("downlight", 440, 390), F("downlight", 570, 380),
 F("pendant", 525, 297),
 F("ceilingLamp", 420, 515, s=0.2, I=1.4, col="SOFT", ch=2), F("ceilingLamp", 440, 640, s=0.2, I=1.4, col="SOFT", ch=2),
 F("ceilingLamp", 560, 580, s=0.14, I=0.8, col="COOL", ch=1), F("ceilingLamp", 523, 470, s=0.12, I=0.7, col="COOL", ch=1),
 F("ceilingLamp", 585, 475, s=0.14, I=0.9, col="COOL", ch=1), F("ceilingLamp", 680, 670, s=0.16, I=1, col="COOL", ch=1),
]
data = {"name": "twobed122", "file": "twobed-two-balconies-122m2",
 "title": {"ka": "ბინა", "en": "Two-bedroom flat with two balconies", "rooms": "8 rooms incl. 2 balconies"},
 "total": 122, "ref": {"image": "twobed122.png", "ppm": round(P, 3), "origin": [OY, 959 - OX], "turn": 90},
 "start": [X(572), Z(605), 180], "rooms": rooms, "walls": walls, "shafts": shafts, "slants": slants, "openings": openings,
 "rails": rails, "switches": [], "furniture": furn}
json.dump(data, open("flats/twobed122.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
