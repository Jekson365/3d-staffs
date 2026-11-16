import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGBA')
W, H = im.size
px = im.load()
def dark(x, y):
    r, g, b, a = px[x, y]
    if a < 128: return False
    return r + g + b < 200
def runs(seq):
    out = []; s = None
    for i, d in enumerate(seq):
        if d and s is None: s = i
        if not d and s is not None: out.append((s, i - 1)); s = None
    if s is not None: out.append((s, len(seq) - 1))
    return out
for a in sys.argv[2:]:
    k, v = a[0], int(a[1:])
    if k == 'y': print(a, runs([dark(x, v) for x in range(W)]))
    else: print(a, runs([dark(v, y) for y in range(H)]))
