# Writes flats/onebed62.json from pixel measurements of ref/onebed62.png (plan turned 180 degrees).
# Run from source: py -I "../results/onebed-balcony-62m2/gen.py" [P K W SH BS]
#   P  pixels per metre, K east wall thickening px, W bath/hall wall x (drawn 338), SH bath shaft east x (drawn 266),
#   BS balcony slab edge y (drawn rail about 586)
import sys, json
a = sys.argv[1:]
P = float(a[0]) if len(a) > 0 else 55.8
K = float(a[1]) if len(a) > 1 else 9
W = float(a[2]) if len(a) > 2 else 344
SH = float(a[3]) if len(a) > 3 else 251
BS = float(a[4]) if len(a) > 4 else 586.5
OX, OY = 195, 0
E = 583 - K            # east wall inner face (kitchen and living)

def X(px): return round((px - OX) / P, 3)
def Z(py): return round((py - OY) / P, 3)
def R(x0, y0, x1, y1): return [X(x0), Z(y0), X(x1), Z(y1)]

# kitchen / living split line (notional, open plan) chosen so the kitchen is 6.49
kpx = 6.49 * P * P
base = (518 - 440) * 24 + (E - 564) * 24 + (E - 440) * (161 - 35)
YK = 161 + (kpx - base) / (559 - 391)

rooms = [
 dict(id="hall", ka="ჰოლი", en="Hall", area=4.24,
      rects=[R(W + 5, 11, 434, 68), R(W + 5, 68, 440, 161)],
      label=[X(395), Z(45)], floor=dict(mat="floorHall", uv="plank", off=[0.83, 1.4])),
 dict(id="kitchen", ka="სამზარეულო", en="Kitchen", area=6.49,
      rects=[R(440, 11, 518, 35), R(564, 11, E, 35), R(440, 35, E, 161), R(391, 161, 559, YK)],
      label=[X(500), Z(95)], floor=dict(mat="floorLiv", uv="plank", off=[0.31, 0.2])),
 dict(id="living", ka="საერთო ოთახი", en="Living room", area=18.87,
      rects=[R(391, YK, 559, 231), R(391, 231, E, 478), R(391, 478, 523, 501)],
      label=[X(470), Z(300)], floor=dict(mat="floorLiv", uv="plank", off=[0.31, 0.2])),
 dict(id="bed", ka="საძინებელი", en="Bedroom", area=16.15,
      rects=[R(319, 166, 386, 232), R(212, 232, 386, 478), R(254, 478, 386, 501)],
      label=[X(300), Z(300)], floor=dict(mat="floorBed", uv="plank", off=[1.07, 1.9])),
 dict(id="bath", ka="WC", en="Bathroom", area=7.41,
      rects=[R(224, 35, W, 161), R(SH, 11, W, 35), R(230, 161, 315, 227)],
      label=[X(285), Z(95)], floor=dict(mat="floorBath", uv="tile"), walls="wallTile"),
 dict(id="balc", ka="აივანი", en="Balcony", area=7.93,
      rects=[R(217, 517, 572, BS)], label=[X(390), Z(550)], outdoor=True),
]

walls = [
 R(213, 0, 594, 11),           # north, entrance
 R(213, 11, 224, 161),         # west, bathroom
 R(195, 161, 230, 232),        # west block beside the shower recess
 R(195, 232, 212, 478),        # west, bedroom
 R(195, 478, 254, 501),        # south-west pier
 R(195, 501, 594, 517),        # south facade with the balcony glazing
 R(E, 11, 594, 161),           # east, kitchen (thickened K px)
 R(559, 161, 594, 231),        # east block
 R(E, 231, 594, 478),          # east, living (thickened K px)
 R(523, 478, 594, 501),        # south-east pier
 R(W, 11, W + 5, 161),         # bathroom / hall
 R(230, 227, 319, 232),        # shower recess / bedroom wardrobe
 R(315, 161, 319, 227),        # shower recess / bedroom nook
 R(319, 161, 386, 166),        # bedroom nook / hall
 R(386, 161, 391, 501),        # bedroom / living, door at the north end
 R(434, 11, 440, 68),          # hall / kitchen stub
 R(208, 517, 217, BS),         # balcony west
 R(572, 517, 581, BS),         # balcony east
]
shafts = [dict(rect=R(224, 11, SH, 35)), dict(rect=R(518, 11, 564, 35))]

def op(**k): return k
ops = [
 op(id="entry", kind="entry", axis="x", at=[Z(0), Z(11)], a=X(362), b=X(421), handle="b"),
 op(id="bath", kind="door", leaf="plain", hinge="a", into=-1, rest=0.35, axis="z", at=[X(W), X(W + 5)], a=Z(70), b=Z(113)),
 op(id="bed", kind="door", leaf="plain", hinge="a", into=-1, rest=0.35, axis="z", at=[X(386), X(391)], a=Z(172), b=Z(227)),
 op(id="balcB", kind="door", leaf="glazed", hinge="b", into=-1, rest=0.3, axis="x", at=[Z(501), Z(517)], a=X(312), b=X(360)),
 op(id="balcBF", kind="fixed", axis="x", at=[Z(501), Z(517)], a=X(257), b=X(310)),
 op(id="balcL", kind="door", leaf="glazed", hinge="a", into=-1, rest=0.3, axis="x", at=[Z(501), Z(517)], a=X(395), b=X(442)),
 op(id="balcLF", kind="fixed", axis="x", at=[Z(501), Z(517)], a=X(444), b=X(498)),
]

zN = Z(11)
xE = X(E)
leafy = lambda x, z, seed, h=1.3: dict(t="plantLeafy", x=x, z=z, seed=seed, h=h, n=18, leaf=0.26,
                                       mats=["leafA", "leafD", "leafA"], pot="pot", potR=0.15, potH=0.3)
furn = [
 # kitchen: fridge and a short run on the north wall, the main run on the east wall
 dict(t="fridge", x=X(458), z=zN),
 dict(t="counter", rect=[X(476), zN, X(518), round(zN + 0.6, 3)], face="s"),
 dict(t="counter", rect=[round(xE - 0.62, 3), Z(35), xE, Z(158)], face="w", hob=0.75, sink=1.65, sinkW=0.5),
 dict(t="fruitBowl", x=round(xE - 0.3, 3), z=Z(140)),
 dict(t="jars", x=round(xE - 0.15, 3), z=Z(45)),
 dict(t="downlight", x=X(490), z=Z(70), I=0.85, col="COOL", ch=1),
 dict(t="downlight", x=X(530), z=Z(115), I=0.85, col="COOL", ch=1),
 dict(t="diningSet", x=X(479), z=Z(162), w=0.86, d=0.86, ends="", endPlates=False),
 dict(t="pendant", x=X(479), z=Z(162)),
 # sitting: sofa on the east wall facing the TV on the partition
 dict(t="sofa", x=round(xE - 0.56, 3), z=Z(349), r=-90),
 dict(t="block", rect=R(467, 305, 502, 395), h=0.4, mat="oak"),
 dict(t="rug", mat="rugTri", rect=[X(440), Z(280), X(525), Z(420)]),
 dict(t="media", x=X(391), z=Z(349)),
 leafy(round(xE - 0.3, 3), Z(468), 3, 1.4),
 dict(t="downlight", x=X(440), z=Z(260), I=0.85, col="COOL", ch=1), dict(t="downlight", x=X(440), z=Z(440), I=0.85, col="COOL", ch=1),
 dict(t="downlight", x=X(520), z=Z(260), I=0.85, col="COOL", ch=1), dict(t="downlight", x=X(520), z=Z(440), I=0.85, col="COOL", ch=1),
 # hall
 dict(t="closet", rect=[X(W + 5), Z(132), X(391), Z(161)], face="n"),
 dict(t="rug", mat="rubber", rect=[X(367), round(zN + 0.08, 3), X(416), round(zN + 0.56, 3)]),
 dict(t="ceilingLamp", x=X(392), z=Z(60), s=0.11, I=0.6, col="COOL", ch=1),
 dict(t="ceilingLamp", x=X(392), z=Z(115), s=0.11, I=0.6, col="COOL", ch=1),
 # bathroom
 dict(t="washer", x=X(240), z=Z(35)),
 dict(t="toilet", x=X(300), z=zN),
 dict(t="vanity", x=X(224), z=Z(117), r=90),
 dict(t="shower", x=X(272.5), z=Z(161), w=1.45, d=1.15, glass=""),
 dict(t="ceilingLamp", x=X(285), z=Z(95), s=0.16, I=1, col="COOL", ch=1),
 # bedroom
 dict(t="closet", rect=R(212, 232, 315, 280), face="s"),
 dict(t="bed", x=round(X(212) + 1.07, 3), z=Z(381)),
 dict(t="nightTable", x=round(X(212) + 0.24, 3), z=Z(312)),
 dict(t="nightTable", x=round(X(212) + 0.24, 3), z=Z(450)),
 dict(t="rug", mat="rugTri", rect=[X(290), Z(320), X(375), Z(445)]),
 dict(t="ceilingLamp", x=X(300), z=Z(381), s=0.22, I=1.6, col="SOFT", ch=2),
 # balcony
 dict(t="rattanChair", x=X(535), z=Z(545), r=180),
 dict(t="planter", x=X(240), z=Z(550), seed=21),
 dict(t="ceilingLamp", x=X(390), z=Z(550), s=0.14, I=0.9, col="SOFT", ch=2),
]

data = dict(
 name="onebed62", file="onebed-balcony-62m2",
 title=dict(ka="ბინა", en="One-bedroom flat", rooms="6 rooms incl. balcony"),
 total=61.67,
 ref=dict(image="onebed62.png", ppm=P, origin=[OX, OY], turn=180),
 start=[X(392), round(zN + 0.6, 3), 180],
 rooms=rooms, walls=walls, shafts=shafts, openings=ops,
 rails=[dict(pts=[[X(217), Z(BS)], [X(572), Z(BS)]])],
 switches=[[X(430), zN, 0], [X(391), Z(240), -90], [X(W + 5), Z(125), -90]],
 furniture=furn,
)

def area(rs): return sum((r[2] - r[0]) * (r[3] - r[1]) for r in rs)
print('YK %.1f' % YK)
for r in rooms:
    v = area(r['rects'])
    print('%-8s %6.2f / %5.2f  %+5.1f%%' % (r['id'], v, r['area'], 100 * (v / r['area'] - 1)))

out = 'flats/onebed62.json'
with open(out, 'w', encoding='utf-8') as f:
    f.write(json.dumps(data, ensure_ascii=False, indent=1) + '\n')
print('wrote', out)
