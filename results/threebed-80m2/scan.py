# dark-pixel runs along given rows (r<y>) and columns (c<x>): py scan.py img r500 c400 ...
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('L'); W, H = im.size; px = im.load()
print('size', W, H)
for a in sys.argv[2:]:
    n = int(a[1:]); runs = []; s = None
    L = W if a[0] == 'r' else H
    for i in range(L):
        v = px[i, n] if a[0] == 'r' else px[n, i]
        d = v < 110
        if d and s is None: s = i
        if not d and s is not None: runs.append((s, i - 1)); s = None
    if s is not None: runs.append((s, L - 1))
    print(a, [r for r in runs if r[1] - r[0] >= 2])
