# Dark-pixel runs along a few rows/columns of the plan image. py scan.py plan.jpg
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("L"); W, H = im.size; px = im.load()
print("size", W, H)
def runs(vals):
    out, s = [], None
    for i, v in enumerate(vals + [255]):
        if v < 90 and s is None: s = i
        elif v >= 90 and s is not None: out.append((s, i - 1)); s = None
    return out
for y in [300, 600, 900, 1500, 1800, 2100]: print("row", y, runs([px[x, y] for x in range(W)]))
for x in [400, 1000, 1500, 1800, 2400, 3000, 3330]: print("col", x, runs([px[x, y] for y in range(H)]))
