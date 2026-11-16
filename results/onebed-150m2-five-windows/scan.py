import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("L"); W, H = im.size; px = im.load()
print("size", W, H)
def runs(vals, thr=90):
    out = []; s = None
    for i, v in enumerate(vals):
        if v < thr and s is None: s = i
        if v >= thr and s is not None: out.append((s, i - 1)); s = None
    if s is not None: out.append((s, len(vals) - 1))
    return [r for r in out if r[1] - r[0] >= 3]
for y in [300, 900, 1500, 2000, 2150]:
    print("row", y, runs([px[x, y] for x in range(W)]))
for x in [300, 1000, 1700, 2500, 3200]:
    print("col", x, runs([px[x, y] for y in range(H)]))
# light runs (windows/doors) on outer walls: scan along wall centre lines
def gaps(vals):
    out = []; s = None
    for i, v in enumerate(vals):
        if v >= 90 and s is None: s = i
        if v < 90 and s is not None: out.append((s, i - 1)); s = None
    return [g for g in out if g[1]-g[0] > 30]
import itertools
for name, y in [("top", 178), ("bot", 2230)]:
    print(name, gaps([px[x, y] for x in range(W)]))
for name, x in [("left", 178), ("right", 3350), ("midwall", 2112), ("bedwall", 1332)]:
    print(name, gaps([px[x, y] for y in range(H)]))
