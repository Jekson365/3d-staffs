# Builds the hosted site folder: results/<folder>/*.html, furniture/*.js, showroom.html and a list page.
# Usage: python tools-deploy/make-site.py <out dir>   (run from the repo root)
import glob, html, os, shutil, sys

out = sys.argv[1]
shutil.rmtree(out, ignore_errors=True)
pages = sorted(glob.glob('results/*/*.html'))
for f in pages + glob.glob('furniture/*.js') + ['showroom.html']:
    dst = os.path.join(out, f)
    os.makedirs(os.path.dirname(dst) or out, exist_ok=True)
    shutil.copy2(f, dst)
links = ''.join(f'<li><a href="{html.escape(p)}">{html.escape(os.path.basename(p)[:-5])}</a></li>' for p in pages)
with open(os.path.join(out, 'index.html'), 'w', encoding='utf-8') as fh:
    fh.write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
             '<title>3D flats</title><style>body{font:16px system-ui;margin:2rem auto;max-width:40rem;padding:0 16px;background:#faf9f7;color:#222}'
             'a{color:#1f6068}li{margin:.5rem 0}</style></head><body><h1>3D flats</h1><ul>' + links +
             '<li><a href="showroom.html">showroom</a></li></ul></body></html>')
print(len(pages), 'flat pages ->', out)
