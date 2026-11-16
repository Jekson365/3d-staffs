import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGBA')
W, H = im.size
px = im.load()
def lum(x, y):
    r, g, b, a = px[x, y]
    if a < 128: return 255
    return (r + g + b) / 3
mode = sys.argv[2]
if mode == 'map':
    s = int(sys.argv[3])
    x0, y0, x1, y1 = [int(v) for v in sys.argv[4:8]] if len(sys.argv) > 7 else (0, 0, W, H)
    for y in range(y0, y1, s):
        row = ''
        for x in range(x0, x1, s):
            l = lum(x + s // 2, y + s // 2)
            row += '#' if l < 80 else ('+' if l < 160 else ('.' if l < 235 else ' '))
        print('%4d %s' % (y, row))
elif mode == 'row':  # dark runs along row y
    for y in [int(v) for v in sys.argv[3].split(',')]:
        runs, st = [], None
        for x in range(W):
            d = lum(x, y) < 80
            if d and st is None: st = x
            if not d and st is not None: runs.append((st, x - 1)); st = None
        print('row', y, [r for r in runs if r[1] - r[0] >= 2])
elif mode == 'col':
    for x in [int(v) for v in sys.argv[3].split(',')]:
        runs, st = [], None
        for y in range(H):
            d = lum(x, y) < 80
            if d and st is None: st = y
            if not d and st is not None: runs.append((st, y - 1)); st = None
        print('col', x, [r for r in runs if r[1] - r[0] >= 2])
