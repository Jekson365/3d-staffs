# Writes flats/twobed95.json from pixel measurements of ref/twobed95.png (plan turned 180 degrees).
# Run from source: py -I "../results/twobed-one-balcony-95m2/gen.py" [P D K BN]
#   P  pixels per metre, D bedroom-2 door wall y (drawn 142), K east wall thickening px, BN balcony north wall bottom y (drawn 502)
import sys, json
a = sys.argv[1:]
P = float(a[0]) if len(a) > 0 else 55.8
D = float(a[1]) if len(a) > 1 else 121.5
K = float(a[2]) if len(a) > 2 else 6.9
BN = float(a[3]) if len(a) > 3 else 497
OX, OY = 92, 9
E = 681 - K          # east wall inner face

def X(px): return round((px - OX) / P, 3)
def Z(py): return round((py - OY) / P, 3)
def R(x0, y0, x1, y1): return [X(x0), Z(y0), X(x1), Z(y1)]
def M(px): return round(px / P, 3)

rooms = [
 dict(id="hall", ka="ჰოლი", en="Hall", area=11.3,
      rects=[R(203, 20, 469, 94), R(203, 94, 474, D), R(269, D, 474, 142), R(303, 142, 474, 165)],
      label=[X(330), Z(80)], floor=dict(mat="floorHall", uv="plank", off=[0.83, 1.4])),
 dict(id="living", ka="საერთო ოთახი", en="Living room", area=30,
      rects=[R(474, 20, E, 465), R(474, 465, 663, 489)],
      label=[X(560), Z(230)], floor=dict(mat="floorLiv", uv="plank", off=[0.31, 0.2])),
 dict(id="bedA", ka="საძინებელი", en="Bedroom", area=22.1,
      rects=[R(303, 171, 469, 212), R(295, 212, 469, 465), R(321, 465, 469, 500), R(289, 500, 469, 571)],
      label=[X(380), Z(240)], floor=dict(mat="floorBed", uv="plank", off=[1.07, 1.9])),
 dict(id="bedB", ka="საძინებელი", en="Bedroom", area=21.7,
      rects=[R(203, D + 6, 269, 212), R(103, 212, 277, 465), R(103, 465, 251, 500), R(103, 500, 283, 571)],
      label=[X(190), Z(280)], floor=dict(mat="floorBed", uv="plank", off=[0.4, 0.7])),
 dict(id="bath", ka="სანკვანძი", en="Bathroom", area=5.6,
      rects=[R(103, 20, 197.5, 206)], label=[X(150), Z(95)],
      floor=dict(mat="floorBath", uv="tile"), walls="wallTile"),
 dict(id="balc", ka="აივანი", en="Balcony", area=5.2,
      rects=[R(481, BN, E, 571), R(481, 571, 645, 583)], label=[X(560), Z(530)], outdoor=True),
]

walls = [
 R(92, 9, 692, 20),            # north
 R(92, 20, 103, 583),          # west
 R(E, 20, 692, 583),           # east (thickened K px for the living-room area)
 R(103, 571, 481, 583),        # south, bedrooms
 R(645, 571, E, 583),          # south pier beside the balcony
 R(197.5, 20, 203, 212),       # bathroom east
 R(103, 206, 197.5, 212),      # bathroom south
 R(203, D, 269, D + 6),        # bedroom 2 door wall
 R(269, 142, 303, 212),        # column, top
 R(277, 212, 295, 465),        # wall between the bedrooms
 R(251, 465, 321, 500),        # column, bottom
 R(283, 500, 289, 571),        # thin wall between the desks
 R(303, 165, 474, 171),        # bedroom 1 north
 R(469, 171, 474, BN),         # living / bedroom 1
 R(469, BN, 481, 571),         # bedroom 1 / balcony
 R(474, 489, E, BN),           # living / balcony
 R(663, 465, E, 489),          # pier in the living room corner
 R(469, 20, 474, 94),          # kitchen west
 R(440, 88, 469, 94),          # hall wardrobe end
]

def op(**k): return k
ops = [
 op(id="entry", kind="entry", axis="x", at=[Z(9), Z(20)], a=X(350), b=X(410), handle="b"),
 op(id="winHall", kind="window", axis="x", at=[Z(9), Z(20)], a=X(236), b=X(332)),
 op(id="winKit", kind="window", axis="x", at=[Z(9), Z(20)], a=X(646), b=round(X(E) - 0.04, 3), sill=1.0),
 op(id="bath", kind="door", leaf="plain", hinge="b", into=-1, rest=0.4, axis="z", at=[X(197.5), X(203)], a=Z(74), b=Z(120)),
 op(id="bedB", kind="door", leaf="plain", hinge="b", into=1, rest=0.35, axis="x", at=[Z(D), Z(D + 6)], a=X(210), b=X(262)),
 op(id="bedA", kind="door", leaf="plain", hinge="b", into=1, rest=0.35, axis="x", at=[Z(165), Z(171)], a=X(410), b=X(462)),
 op(id="balcA", kind="door", leaf="glazed", hinge="b", into=-1, rest=0.3, axis="z", at=[X(469), X(481)], a=Z(507), b=Z(565)),
 op(id="balcL", kind="door", leaf="glazed", hinge="a", into=-1, rest=0.3, axis="x", at=[Z(489), Z(BN)], a=X(496), b=X(547)),
 op(id="balcF", kind="fixed", axis="x", at=[Z(489), Z(BN)], a=X(549), b=X(598)),
 op(id="winB", kind="window", axis="x", at=[Z(571), Z(583)], a=X(214), b=X(264)),
 op(id="winA", kind="window", axis="x", at=[Z(571), Z(583)], a=X(361), b=X(411)),
]

zW = Z(20)
xE = X(E)
leafy = lambda x, z, seed, h=1.3: dict(t="plantLeafy", x=x, z=z, seed=seed, h=h, n=18, leaf=0.26,
                                       mats=["leafA", "leafD", "leafA"], pot="pot", potR=0.15, potH=0.3)
furn = [
 # kitchen
 dict(t="fridge", x=X(496), z=zW),
 dict(t="counter", rect=[X(529), zW, X(645), round(zW + 0.6, 3)], face="s", hob=0.55, sink=1.45, sinkW=0.5),
 dict(t="fruitBowl", x=X(625), z=round(zW + 0.3, 3)),
 dict(t="jars", x=X(540), z=round(zW + 0.15, 3)),
 dict(t="downlight", x=X(540), z=Z(80), I=0.85, col="COOL", ch=1),
 dict(t="downlight", x=X(620), z=Z(80), I=0.85, col="COOL", ch=1),
 dict(t="diningSet", x=X(610), z=Z(176), w=1.2, d=0.85, ends="", endPlates=False),
 dict(t="pendant", x=X(610), z=Z(176)),
 # sitting
 dict(t="sofa", x=round(xE - 0.56, 3), z=Z(335), r=-90),
 dict(t="rug", mat="rugTri", rect=[X(537), Z(258), X(645), Z(448)]),
 dict(t="coffeeTable", x=X(570), z=Z(335)),
 dict(t="armchair", x=X(590), z=Z(438), r=-135),
 dict(t="media", x=X(474), z=Z(335)),
 leafy(round(xE - 0.3, 3), Z(236), 3, 1.4),
 dict(t="downlight", x=X(530), z=Z(280)), dict(t="downlight", x=X(530), z=Z(400)),
 dict(t="downlight", x=X(625), z=Z(280)), dict(t="downlight", x=X(625), z=Z(400)),
 # hall
 dict(t="closet", rect=[X(440), zW, X(469), Z(88)], face="w"),
 dict(t="rug", mat="rubber", rect=[X(355), round(zW + 0.08, 3), X(405), round(zW + 0.56, 3)]),
 dict(t="ceilingLamp", x=X(300), z=Z(70), s=0.11, I=0.6, col="COOL", ch=1),
 dict(t="ceilingLamp", x=X(400), z=Z(120), s=0.11, I=0.6, col="COOL", ch=1),
 dict(t="ceilingLamp", x=X(236), z=Z(105), s=0.11, I=0.6, col="COOL", ch=1),
 # bathroom
 dict(t="washer", x=X(124), z=zW),
 dict(t="toilet", x=X(172), z=zW),
 dict(t="vanity", x=X(103), z=Z(115), r=90),
 dict(t="bath", rect=R(103, 150, 197.5, 206), along="x", mixer="w", head="n"),
 dict(t="ceilingLamp", x=X(150), z=Z(100), s=0.16, I=1, col="COOL", ch=1),
 # bedroom 1 (east of the column)
 dict(t="closet", rect=R(303, 171, 400, 206), face="s"),
 dict(t="bed", x=round(X(295) + 1.07, 3), z=Z(337)),
 dict(t="nightTable", x=round(X(295) + 0.24, 3), z=Z(266)),
 dict(t="nightTable", x=round(X(295) + 0.24, 3), z=Z(408)),
 dict(t="rug", mat="rugTri", rect=[X(345), Z(258), X(450), Z(400)]),
 dict(t="ceilingLamp", x=X(380), z=Z(337), s=0.22, I=1.6, col="SOFT", ch=2),
 # bedroom 2 (west of the column)
 dict(t="closet", rect=R(103, 212, 197.5, 250), face="s"),
 dict(t="bed", x=round(X(277) - 1.07, 3), z=Z(337), r=180),
 dict(t="nightTable", x=round(X(277) - 0.24, 3), z=Z(266)),
 dict(t="nightTable", x=round(X(277) - 0.24, 3), z=Z(408)),
 dict(t="rug", mat="rugTri", rect=[X(112), Z(300), X(222), Z(440)]),
 dict(t="ceilingLamp", x=X(190), z=Z(337), s=0.22, I=1.6, col="SOFT", ch=2),
 # balcony
 dict(t="planter", x=round(xE - 0.35, 3), z=Z(545), seed=21),
 dict(t="ceilingLamp", x=X(560), z=Z(530), s=0.14, I=0.9, col="SOFT", ch=2),
]

data = dict(
 name="twobed95", file="twobed-one-balcony-95m2",
 title=dict(ka="ბინა", en="Two-bedroom flat", rooms="6 rooms incl. balcony"),
 total=95.6,
 ref=dict(image="twobed95.png", ppm=P, origin=[OX, OY], turn=180),
 start=[X(380), round(zW + 0.6, 3), 180],
 rooms=rooms, walls=walls, shafts=[], openings=ops,
 rails=[dict(pts=[[X(481), Z(583)], [X(645), Z(583)]])],
 switches=[[X(420), zW, 0], [X(470), Z(171), 0], [X(255), Z(D + 6), 0], [X(203), Z(135), -90]],
 furniture=furn,
)

def area(rs): return sum((r[2] - r[0]) * (r[3] - r[1]) for r in rs)
for r in rooms:
    v = area(r['rects'])
    print('%-7s %6.2f / %5.1f  %+5.1f%%' % (r['id'], v, r['area'], 100 * (v / r['area'] - 1)))

out = 'flats/twobed95.json'
with open(out, 'w', encoding='utf-8') as f:
    s = json.dumps(data, ensure_ascii=False, indent=1)
    f.write(s + '\n')
print('wrote', out)
