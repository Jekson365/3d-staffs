# flat-3d: walkable flats built from plan renders

Guide for Claude sessions working in this folder. Browser 3D (three.js r159, plain JavaScript, no bundler).
The Pygame guide in `Desktop\CLAUDE.md` belongs to a different project and does not apply here.

Sections: State · Rules · Route a request · Commands · Find it fast · Conventions · Builder cheat sheet ·
Per-flat procedure · Measuring a plan · Gotchas · Ask the user for

## State

Update this section whenever it changes.

- Template setup **done** 2026-11-13. One engine (`source\src`) builds every flat from `source\flats\<name>.json`
  (format in `source\flats\FORMAT.md`). Backup of the engine before the setup: `backup\source-before-setup-2026-11-12.tgz`.
  Checked: flat 1 rebuilt from its data matches its old top view (0.1 % of pixels differ clearly; the
  dining plates and table edge), both flats pass `walktest.mjs` on desktop and phone, flat 2's overlay lines up.
- flat1 (56.7 m², one bedroom): offline `flat-3d.html`. Its web copy (https://claude.ai/artifact/W3DJVs39omrZ6dChUmsVfD)
  went dead on 2026-11-12 (deleted, or on the user's other Claude account). Ask before publishing a new one.
- flat2 (120.47 m², two bedrooms, two bathrooms, L-shaped balcony): offline `flat2.html`; published at
  https://claude.ai/artifact/NmG8fTXXBq99ekuCbUCfSc from the pre-template copy `Desktop\flat-3d-flat2` (that folder is
  now redundant). Republishing `source\dist\flat2\flat2.html` to that link needs the account that owns it: run
  Artifact `list` first. Bake about 25 s headless (flat 1: about 1–12 s).
- flat4 (63.9 m², one bedroom, built 2026-11-13 from `flat 4\design.png`; `flat 4\blueprint.png` and
  `measurements.txt` gave the room names and areas): offline `flat4.html`; published at
  https://claude.ai/artifact/D2LCFWRgxKSs24Ns3bWP8P. The tracer is no help on this render (white page, not transparent):
  the walls were measured by hand. Left out: the freestanding bathtub in the bedroom's south-west corner (no piece).
- flat5 (96.1 m², two bedrooms, built 2026-11-13 from `flat 5\667e947f31983.webp`, turned 180°; areas from
  `flat 5\measurements.txt`): offline `flat5.html`; published at https://claude.ai/artifact/W3kJhc3nKF8CryKXK9jWFs.
  Tracer output was fragmented (walls are white-on-render but broken by shadows): walls measured by hand at ppm 55.2.
  Added `along: "x"` to the `bath` piece for an east-west tub. The walk test's flood fill steps 0.1 m and only jumps
  0.3 m thresholds: keep slider walls at most about 0.18 m thick with a face on a 0.1 m line.
- flat6 (56.5 m², one bedroom, built 2026-11-13 from `flat 6\648895ea0d505.webp`, turned 180°; areas from
  `flat 6\measurements.txt`): offline `flat6.html`; published at https://claude.ai/artifact/5hMZqxnWUvXYUtnZboQzJL.
  Dark walls on a transparent render: the tracer was no help. Walls came from scanning dark pixel runs along rows and
  columns (alpha treated as white), ppm 59.85. The render's only glazing is the balcony side (balcony doors from bedroom and living
  room, one window each); the thin outer-wall stretches on the long sides are recesses, not windows.
- 2026-11-13: every flat page got an **Empty** button (X: furniture out, shell re-lit, walls and openings outlined in green)
  and a **Finishes** panel (T: floor per room, walls per room group, saved per flat in the browser). Engine fixes then:
  casement glass was a solid light blocker (bedrooms behind `window` openings were nearly dark by day); fixed. All four flats
  rebuilt and pass `walktest.mjs` on desktop and touch. Only flat5's artifact was republished; flat2 and flat4 links show the old page.
- 2026-11-13: new piece `shellSofa` (JYSK channel-tufted 2.5-seat sofa, material `terracotta`) and a one-room
  `flats/showroom.json` for viewing single pieces (offline `showroom.html`, not published). Both walk tests pass.
- 2026-11-13: every flat page got a **Furniture** panel (G): drag a piece to move it, R / Shift+R turn it (15°, a quarter for
  rect pieces; bath, box and curtains only move), Delete removes, Ctrl+Z undoes, Add list, Copy list (the furniture JSON, to paste
  into a flat file), All as designed. Each piece now has its own meshes (`buildPiece`, `PIECE_RECS`); a change rebuilds that piece
  and re-bakes the light 0.3 s later. Edits are kept per flat in the browser (key `flat3d:<name>:furniture`, dropped when the
  flat file's furniture changes). Backup before: `backupsource-before-furniture-edit-2026-11-13.tgz`. Rebuilt flat1, 2, 4, 5, 6
  (all walk tests pass; flat4 desktop failed once, then passed twice); only flat6's artifact republished. `showroom` not rebuilt.
- 2026-11-13: pictures in both panels. Finishes: a row of swatches per surface (2D, cut from the real canvas textures,
  `swatch`, `markFin`). Furniture: Add is a grid of pictures of the pieces, and the chosen piece shows one; each picture is the
  real piece built far outside the flat and rendered at 144 px with the day look (`drawThumbs`, `thumbFor`), 4 per frame, drawn
  the first time the panel opens. All flats rebuilt, walk tests pass; only flat6 republished.
- (Until 2026-11-16 a new piece also had to go into `NAMES` and `ADD` in `60-app.js`; now each piece file carries its own `name` and `add`.)
- 2026-11-13: Empty (X) while the Furniture panel is open, the panel's Remove all, or opening the panel from the Empty view takes
  every piece out for real (`clearAll`, one undo entry) so the flat can be furnished piece by piece. New pieces are moved to the
  nearest spot where their whole footprint (sampled every 8 cm) is on clear floor.
- flat7 (61.49 m², one bedroom, built 2026-11-13 from `flat 7/plan.webp` (a WebP behind a .png link), turned 180°; areas from the user):
  offline `flat7.html`; published at https://claude.ai/artifact/AMqSGj3LQuoouWQyk5sck1. Dark walls on a transparent render, measured from
  pixel scans at ppm 161.8, origin px (20, 203). Its balcony is slanted (26.57°, slope 1:2): first flat with the new `poly` room, `slants`
  walls and slanted rail runs. The drawn glass line gave 6.3 m², so the slab edge sits about 0.11 m beyond it to make 7.13. The plan
  shows no windows in the living room or on the bedroom's outer wall (TV, kitchen and bed headboard stand against them), so none were
  built and the living-room downlights are on by day. Left out: the louvres at the balcony end (a rail stands there instead) and the
  long box outside the rail. New pieces `shower`, `acUnit`.
- 2026-11-13 engine (backup `backup/source-before-slants-2026-11-13.tgz`): `poly` rooms and `slants` (FORMAT.md); `roomHas`, `inPoly`, `polyStrips`,
  `polyGeo` in `10-util.js`; `slantWall`, `railRun`, `slabEdge` in `30-plan.js`. `walktest.mjs` reach fill now counts hinged doorways and gaps
  plus 0.25 m either side as floor (a 0.32 m wall left no free point in flat 7's balcony door). Rebuilt and walk-tested: flat7, flat6;
  flat1, 2, 4, 5 and showroom not rebuilt (their pages still work: nothing they use changed).
- flat8 (75.68 m², one bedroom, built 2026-11-13 from `flat 8/plan.png` (WebP behind a .png link), turned 180°; areas from the user):
  offline `flat8.html`; published at https://claude.ai/artifact/UGc8ETxZWqrnekkDXTPEMk. Dark walls on a transparent render, pixel scans,
  ppm 50.82, origin px (78, 299). The data is generated by `flat 8/gen8.py` from original-image pixels (args: living-room west face,
  balcony 7.22 end line, balcony 7.54 edge line). Whole plan on a 1:2 slanted grid: both balconies are `poly`, the living room is
  `rects` + `poly`, and its balcony wall and glazed corner are `slants` with openings. Moved for the areas: the living room's outer
  wall face 0.2 m out (pilasters merged into it), the bedroom's outer wall 0.12 m out (the two piers stay), balcony 7.22 ends about
  0.5 m short of the drawn planter and AC box (both left out). The rest is as drawn.
- 2026-11-13 engine (backup `backup/source-before-slant-openings-2026-11-13.tgz`): `slants` take `in` (the indoor finish) and `ops`
  (`door` / `fixed`, `from`..`to` metres along a -> b; FORMAT.md). Glazing feeds the bake via `SLANT_OPEN`; poly parts of indoor rooms
  now count as indoors in the bake. `walktest.mjs` walks slanted doors and starts 0.45 m out when 0.9 m is past a rail. flat7 rebuilt
  and passes both walk tests; flat1, 2, 4, 5, 6 not rebuilt (nothing they use changed).
- flat9 (58.3 m², one bedroom, built 2026-11-13 from `flat 9/plan.png` (WebP), turned 180°; areas from the user): offline `flat9.html`;
  published at https://claude.ai/artifact/5UWZhNMQ4PH5bL89XgYtcq. Opaque grey render (walls about 127 grey, pilasters black, floor 221,
  background 241): tracer useless, pixel scans, ppm 59.25, origin px (251, 42). Data from `flat 9/gen9.py` (area knobs as arguments; built
  with `59.25 503 511 7.4 409.5 686 302`). 45° slants: triangular balcony `poly`, living room `rects` + `poly`, a solid slanted wall and
  a thin glazed one holding the balcony door and fixed glass. Moved for the areas: bedroom/storage wall 2 px (3 cm) south, bedroom's
  outer wall 0.1 m out, balcony rails about 0.12 m in from the drawn outer lines, the hall's notional edge in the open plan. Kitchen
  window sill 1.0, bathroom windows sill 1.2. Known flaw (also flat 8): blotchy baked light along slanted walls and the slanted ceiling part.
- 2026-11-13: `Desktop/flat-maker` (Node app, `npm start`, http://localhost:5180) takes a plan image and areas, runs Claude through the
  Agent SDK here with the user's API key, then re-runs build.mjs and both walk tests and serves the page at /flats/<name>/. Its uploads
  land in `plans/<name>/`; its runs may only write inside this folder and have no network (`flat-maker/policy.mjs`).
- flat10 (61.1 m², one bedroom, built 2026-11-13 from `flat 10/plan.png` (WebP behind a .png link), turned 180°; areas from the user, total = their sum):
  offline `flat10.html`; published at https://claude.ai/artifact/TRftKq4gTyFd5w8sDKHsQF. Opaque grey render (walls about 128 grey, pilasters black): tracer
  not used, pixel scans, ppm 57.3, origin px (263, 40) in the turned image. Data from `flat 10/gen10.py` (run from `source`: `py "../flat 10/gen10.py"`;
  args ppm, bedroom north face, balcony inset; built with the defaults `57.3 252 -1`). Same shape as flat 9 (45° slants, pointed balcony `poly`, solid slanted wall
  plus a thin glazed one with the balcony door and fixed glass) but the partition between living room and bedroom/bathroom is vertical, so both doors sit in it.
  The bedroom takes in the wardrobe strip along its south side (`closet`). Moved for the areas: hall's top edge 1 px, bathroom's north wall and the hall niche's east
  wall 1 to 3 px thicker, balcony slab edge 1 px out. Left out: the two stools at the breakfast bar, the louvres and thin screen on the balcony, the niche's door line.
  The west-wall strip (hollow cells, TV on it) is a solid `walls` block with `wallTV`. The balcony chair in front of the door was moved 0.2 m so the walk test can start there.
  The toilet's dark patch at its base is in flat 9 too (the piece, not this data).
- flat10b (61.1 m², one bedroom, built 2026-11-13 as a blind rebuild of the flat 10 plan, without looking at flat10's files; from `flat 10b/plan.png`
  (WebP behind a .png link), turned 180°; areas from the user): offline `flat10b.html`; published at https://claude.ai/artifact/9N7ZUupPYWUofx45M8m5Ai
  (published right after the user switched accounts with /login). Pixel scans on the original image, pixel edges, ppm 57.3, origin px (257, 39) in the turned image.
  Data from `flat 10b/gen10b.py` (run from `source`; args ppm, bedroom south face, hall north edge, balcony inset; built with `57.3 566 650 0.5`).
  Moved for the areas: bedroom/bathroom wall 2 px south, hall's notional north edge 2 px, balcony rails 0.5 px in. Assumed: the hollow-cell strip on the
  living room's outer wall is a solid block carrying the TV; the hall includes the niche east of the entrance. Left out: bar stools, the balcony louvres and screen.
  Rectangular coffee table is a `block`.
- flat9b (79.57 m², one bedroom, built 2026-11-14 from `flat 9b/plan.png` (WebP with alpha, 1811x1280, downloaded from the URL in the request), turned 180°;
  areas from the user plus the living room's 25.59 from the plan's own label, because the request's list left it out): asked for as "Flat 9", but `flat9.json`
  (58.3 m², another plan) already existed, so this one is **`flat9b`** and the old flat 9 is untouched. Offline `flat9b.html`; published at
  https://claude.ai/artifact/UEbAeBDv5F7sqUN2aw6GCx. Dark walls on a transparent render: tracer fragments (used only for `ref/flat9b.png`), pixel scans, ppm 89.5,
  origin px (262, 155) in the turned image. Data from `flat 9b/gen9b.py` (run from `source`: `py "../flat 9b/gen9b.py"`; args ppm, out, living-room split y, balcony A/B edges;
  built with the defaults `89.5 flats/flat9b.json 580 1264 -111`). Plan on a 1:2 slanted grid: slanted top facade (solid, glazed stretch with a door and fixed panes, solid),
  glazed corner, thick right wall, triangular west balcony `poly`; living room = `poly` + `rects`. Bedroom, bathroom and hall fit the areas at once; living and kitchen were
  about 6 % and 3 % short, so: top facade's inner face 0.1 m out (glass flush with it), the hollow-cell TV wall treated as a `lowShelf` with floor in front (wall kept at the
  bedroom's 12 px), kitchen's south wall 0.17 m out, kitchen/bath north wall 3 cm north, balcony slab edges inside the drawn outer lines. Open-plan split: living / kitchen
  at plan y 580 (x < 1041) and the kitchen / hall at x 1339. The glazed corner is `fixed` (the drawn door there opens onto nothing). Left out: planter strip and the louvre
  ticks on the balcony (one `planter` stands there), the closed pocket beside the kitchen (built solid). Both walk tests pass; the top-view overlay lines up.
- 2026-11-14: new piece `modularSofa` (gorgia.ge MLM-110293 / BM-00227947, sizes from the shop: W 2.81, D 0.82 or 1.43 with the
  ottoman, H 0.85): flanged pillow-top seats on box cushions, three flanged back pillows, track arms, ottoman, two throw pillows.
  New helper `pillowGeo` / `PIL` in `10-util.js` (stuffed cushion with a sewn flange, pinched corners); new materials `chenille`
  (`texChenille`) and `ebony`. In `NAMES` and `ADD`. `flats/showroom.json` now shows it (was `shellSofa`); showroom walk tests pass.
  Rebuilt flat1, 2, 4, 5, 6, 7, 8, 9, 9b, 10, 10b; no artifact republished. Not rebuilt: flat11, twobed-curved, dbg (not in State).
- Two-bedroom flat with one balcony, 95.6 m² (data `twobed95`, built 2026-11-14 from https://x2.ge/assets/2d_render_images/667e7ffdb2aee.webp,
  turned 180°; a mirror of flat5's plan): offline `results\twobed-one-balcony-95m2\twobed-one-balcony-95m2.html`; published at https://claude.ai/artifact/HLVtyrUXUZ69Vs6hujSLJa.
  Dark walls on a transparent render, tracer fragmented: pixel scans, ppm 55.8, origin px (92, 9). Data from `results\twobed-one-balcony-95m2\gen.py`
  (run from `source`; args ppm, bedroom-2 door wall y, east wall thickening px, balcony wall bottom y; built with `55.8 121.5 6.9 497`); that folder's
  `info.txt` holds the URL, measurements and an API cost estimate. Moved for the areas: bedroom 2's door wall 0.37 m north, east wall inner face 0.12 m in,
  balcony north wall thinned. Left out: the two small desks with chairs at the south end of the column. Both walk tests pass; overlay lines up.
- One-bedroom flat with a balcony, 61.67 m² (data `onebed62`, built 2026-11-14 from https://x2.ge/assets/2d_render_images/68384ad39f075.webp,
  turned 180°): offline `results\onebed-balcony-62m2\onebed-balcony-62m2.html`; published at https://claude.ai/artifact/QHfn4TPZjqBHioAVc23e7j.
  Dark walls on a transparent render, tracer fragmented: pixel scans, ppm 55.8, origin px (195, 0). Data from `results\onebed-balcony-62m2\gen.py`
  (run from `source`; args ppm, east wall thickening px, bath/hall wall x, bath shaft east x, balcony slab edge y; built with `55.8 9 344 251 586.5`).
  Bedroom door is in the living/bedroom partition, into a nook; the WC takes in a shower recess. Kitchen/living split is notional (open plan).
  Moved for the areas: east wall inner face 0.16 m in, bath/hall wall 0.11 m east, bath riser shaft narrowed to 0.48 m. Sofa is the 2.52 m `sofa`
  (drawn about 3.7 m); coffee table is an oak `block`; AC units outside the rail left out. Both walk tests pass; overlay lines up.
- One-bedroom flat with a balcony, 61.67 m², **rebuild** (data `onebed62r`, 2026-11-14, same plan as `onebed62`, done from scratch on request;
  `onebed62` untouched): offline `results\onebed-balcony-62m2-rebuild\onebed-balcony-62m2-rebuild.html`; published at https://claude.ai/artifact/K5vsvBq9MRQk56n46kD7cv.
  Pixel scans, ppm 55.8, origin px (195, 0). Data from `results\onebed-balcony-62m2-rebuild\gen.py` (args ppm, east thickening px, bath/hall wall x,
  bath shaft east x, balcony slab y; built with `55.8 9 345 254 584.6`). Moved: east wall 0.16 m in, WC/hall wall 0.11 m east, shaft narrowed;
  hall/kitchen/living splits solved for the areas. Both walk tests pass; overlay lines up.
- Three-bedroom flat with a small balcony, 82.0 m², **unfurnished** (data `threebed80`, built 2026-11-14 from
  `Desktop\WhatsApp Image 2026-11-14 at 17.25.38.jpeg`, turned 180°; areas from the plan's own labels, which add to 82.0, not the header's 80.0):
  offline `results\threebed-80m2\threebed-balcony-82m2.html`; published at https://claude.ai/artifact/QgeyTmgw4szsmXLvZn5bpg. Dark walls on white, ppm 101.24.
  Data from `results\threebed-80m2\gen.py` (run from `source`). No windows or furniture drawn: windows assumed on outer walls, balcony door from
  bedroom 3, balcony built rectangular (drawn slightly trapezoid). Only ceiling lights; the user adds furniture in the Furniture panel. Both walk tests pass; overlay lines up.
- One-bedroom flat with a balcony, 74.52 m² (data `onebed75`, built 2026-11-14 from https://x2.ge/assets/2d_render_images/68384b240dc42.webp,
  turned 180°): offline `results\onebed-balcony-75m2\onebed-balcony-75m2.html`; published at https://claude.ai/artifact/CnRNfAsHGm2wGGvFZxKrQy.
  Dark walls on a transparent render: pixel scans (tracer not run), ppm 58.2, origin px (126, 0) in the turned image. Data from `results\onebed-balcony-75m2\gen.py`
  (written in ORIGINAL image pixels, turned inside; run from `source`; args ppm, WC bottom y, WC west wall x, west wall inner x; built with `58.2 582 494 146`).
  Entrance is in the original west wall beside the kitchen; hall/kitchen/living splits notional. Moved for the areas: WC floor over the thick wall chunk and
  shaft south of it (shaft not built), WC west wall 0.07 m west, living's outer wall 0.14 m in, balcony to the inner rail line. Left out: tall fridge stack,
  the small counter with the plant, the balcony's small box. Both walk tests pass; overlay lines up.
- One-bedroom flat, 159.2 m², **unfurnished** (data `onebed150`, built 2026-11-14 from `Downloads\floor-plan.jpg` (3460x2340 JPEG, a plain
  planner export, no furniture drawn), turned 180°): offline `results\onebed-150m2\onebed-150m2.html`; published at https://claude.ai/artifact/UFw6csrtLzGH1cQT2E3yji.
  Dark walls on white: pixel scans, ppm 196.27 (from the bedroom's 31.4). Data from `results\onebed-150m2\gen.py` (run from `source`; writes `ref/onebed150.png` too).
  Request total 150 conflicts with the drawing: the living room is built at its drawn 66.1 m² (150 would need 56.9). Only windows: two in the WC;
  the living-room downlights are on by day. Both walk tests pass; overlay lines up.
- One-bedroom flat with five windows, 159.2 m², **unfurnished** (data `onebed150w`, built 2026-11-14 from `Downloads\floor-plan (3).jpg`
  (3528x2473; same walls as `onebed150` but windows drawn: bedroom and bathroom on the top wall, two east, one kitchen at the bottom), turned 180°):
  offline `results\onebed-150m2-five-windows\onebed-150m2-five-windows.html`; published at https://claude.ai/artifact/TKFSCzaADuU4ZvqMzuDMTs. Pixel scans (pixel edges),
  ppm 196.3. Data from `results\onebed-150m2-five-windows\gen.py` (run from `source`; args ppm, bath/kitchen wall y; built with `196.3 1282`).
  Same 150-vs-drawing conflict: living room kept at its drawn 66.1. Tall windows sill 0.3 / head 2.6, kitchen ones 0.9 / 2.4. All doors 0.75 m on request (drawn 1.6). Both walk tests pass; overlay lines up.
- Three-bedroom flat with a small balcony, 93.9 m², **unfurnished** (data `threebed94`, built 2026-11-14 from
  `Desktop\WhatsApp Image 2026-11-14 at 19.35.19.jpeg`, turned 90° anticlockwise so the living/kitchen windows face south; areas from the plan labels,
  the request gave none): offline `results\threebed-balcony-94m2\threebed-balcony-94m2.html`; published at https://claude.ai/artifact/1FGkrQiwCKxArTHUeffZgg.
  Dark walls on white, tracer one blob: pixel scans, ppm 86.0. Data from `results\threebed-balcony-94m2\gen.py` (run from `source`). Partitions moved
  2-6 px for the areas; hall +0.5 %. No furniture drawn: lights only. Both walk tests pass; overlay lines up.
- 2026-11-16: **shared furniture folder** `furniture\` at the top of this copy (backup `backup\source-before-furniture-folder-2026-11-16.tgz`).
  Every piece is its own file `furniture\<t>.js` (`piece('<t>', { name, add, values }, function (p) { ... })`); shared parts are in `furniture\_parts.js`.
  Pages no longer copy the furniture in: they load only `furniture\index.js` by a relative path (`results\<folder>\*.html` -> `../../furniture/index.js`), and it
  loads the files it lists (document.write, in order, before the engine's second half). So a results page needs the folder two levels up.
  **Adding a piece needs no rebuild:** drop `furniture\<t>.js`, run `node tools/furniture-index.mjs` (checks every file, rewrites the list; `build.mjs` runs it
  too), reload any flat: the piece is in its Add list. Tested 2026-11-16 with a throwaway piece on an un-rebuilt page (listed, placed); a broken file is refused.
  The engine is no longer one closure: the data plus 10..40, then the furniture files, then 50..60 run as classic scripts sharing the global scope.
  The Furniture panel's `NAMES` / `ADD` come from the piece files (same order as before). Checked: twobed95's top view is pixel-identical before/after with the
  same bake stats, and the offline page works opened as a file. Every `results\` flat was rebuilt into its same file name and walk-tested.
  Not rebuilt: flat1..10b, showroom, flat11, twobed-curved (their old pages still carry their own copy and still work). No artifact republished.
- 2026-11-16: new piece `channelCornerSofa` ("Corner sofa (channel)", add 33; gorgia.ge BM-00157269): teal L sofa, channel-tufted seat and back, rolled arms, chaise west (`chaise: -1` east), chrome legs. `showroom.json` now shows it (was `modularSofa`; coffee table moved); both showroom walk tests pass. No flat rebuilt.
- 2026-11-16: new piece `pcChair` ("pc chair", add 34; gorgia.ge BM-00195991): beige high-back office swivel chair, padded arms, five-star base on casters. `showroom.json` now shows it (was `channelCornerSofa`); both showroom walk tests pass. No flat rebuilt.
- 2026-11-16: new piece `kajada` ("კაჟადა", add 35; gorgia.ge BM-00170661): painted chest, two panelled doors over a drawer, shaped apron, brass knobs. `showroom.json` now shows it (was `pcChair`); both showroom walk tests pass. No flat rebuilt.
- Per-flat output in this copy: one folder `results\<descriptive name>\` holding the offline page, plan image, `info.txt` (URL, measurements, cost), scripts.
  Since 2026-11-16 the pages live inside those folders (moved, `../furniture` rewritten to `../../furniture`; checked: a moved page opened as a file loads all 51 pieces).
  `build.mjs` alone writes the offline page to `..\<file>.html`: pass the folder path, e.g. `node tools/build.mjs threebed80 "../results/threebed-80m2/threebed-balcony-82m2.html"`.
- The user wants many more flats done this way with the least time and tokens.
- Open question for the user: one page with a flat picker, or one file per flat (now: one file per flat)?

## Rules

1. Do not read whole source files to get oriented. Use "Find it fast", then `grep -n` and read that part.
2. A new flat is data, not code: write `flats/<name>.json`. Touch `src/` only for a furniture piece or opening kind that does not exist yet.
3. Stay faithful to the render: walls, openings and furniture positions come from the picture, room areas from the user. Leave people out. The entrance door stays shut.
4. A Bash command over about 8,000 characters is cut off on this PC, and Bash turns `\\` into `\` even in quoted heredocs. Write scripts with the Write tool; change files with Edit.
5. Screenshots are the expensive part. Prefer text checks (`build.mjs` area table, `walktest.mjs` RESULT line). Aim for about 4 images per flat.
6. After any edit: build, run `walktest.mjs`, then look only at what changed. Delete `source\dist\shots` when done.
7. One style for every flat unless the user says otherwise: ceiling 2.7 m, same finishes, lamps, town outside.
8. Room labels are Georgian names with areas in m². Never apply CSS `text-transform: uppercase` to Georgian text.
9. Report what was assumed and what was not checked. Publish only the `dist\<name>\<file>.html` page.

## Route a request

| the user asks | do |
| --- | --- |
| "build these flats" | Per-flat procedure for each |
| a change to an existing flat (move, recolour, add) | edit its `flats/<name>.json`, build, walktest, republish to the same artifact |
| a furniture type that does not exist yet | add a file `furniture\<t>.js` (Builder cheat sheet), run `node tools/furniture-index.mjs`, add a row in `FORMAT.md`; no flat rebuild needed. Test it in `flats/showroom.json` |
| a diagonal or curved wall | tell the user before building. Straight slanted walls and convex slanted rooms work now (`slants`, `poly`; flat 7); curves do not |
| something looks wrong (black patches, bright lines, gaps) | Gotchas |

## Commands

Run from `C:\Users\Jeko\Desktop\flat-3d\source`. Chrome path comes from `CHROME`, else the default install.

| purpose | command |
| --- | --- |
| new flat: turn the render, find white walls, write a skeleton | `node tools/trace.mjs <image> <name> <total m²> <0\|90\|180\|270>` (quarter turns anticlockwise) |
| build one flat (checks the data, prints areas) | `node tools/build.mjs <name>` |
| after adding / renaming / deleting a furniture file | `node tools/furniture-index.mjs` (checks the files, rewrites `furniture/index.js`; every built flat picks it up) |
| walk test, desktop / phone | `node tools/walktest.mjs <name>` / `node tools/walktest.mjs <name> touch` |
| screenshots | `SCHEME=light node tools/shot.mjs dist/<name>/preview.html dist/shots/a 1400 900 "new Promise(r => setTimeout(r, 1200))" "(__flat.walk(x, z, yaw, -6), 0)"` |
| true top view | `... dist/shots/top 1400 900 "new Promise(r => setTimeout(r, 1200)).then(() => { document.querySelector('.hud').hidden = true; __flat.top(); })"` |
| overlay on the render | `node tools/shot.mjs "tools/compare.html#<name>/mix" dist/shots/cmp 1400 900 "0"` (also `/ref`, `/mine`; needs `top-0.png`) |
| read pixels off a plan image | `node tools/shot.mjs tools/measure.html dist/shots/m 1260 1200 "load('../ref/<name>.png').then(() => crop(160, 0, 210, 200, 6, 10))"` |

- Outputs: `..\<file>.html` offline (loads the furniture from the shared `furniture\` folder by a relative path, never a copy), `dist\<name>\<file>.html` to publish, `dist\<name>\preview.html` to test, `dist\<name>\flat.js` for compare.
- `walktest.mjs` takes its route from the data: every hinged door, every slider, a reachability flood fill over all rooms. Last line `RESULT: PASS` or `RESULT: FAIL` with reasons.
- `shot.mjs`: one screenshot per quoted expression. Start with the 1200 ms wait so the opening sheet has faded.
- Environment switches: `SCHEME=light|dark` (headless Chrome reports dark), `MOBILE=1` (phone), `STRICT=1` (open like a double-click).
- Hooks on `window.__flat`: `walk(x, z, yawDeg, pitchDeg)`, `plan(theta, phi, dist)`, `evening(on)`, `top()`, `room(x, z)`, `free(x, z)`, `data`, `stats`, `S`, `doors`.
  Also `empty(on)` (a promise; first call re-bakes the light without furniture), `finish(key, id)`, `surfaces` (keys `floor@<room id>`, `wall@<n>`).
  Yaw: 0 looks north, 90 west, 180 south, -90 east.

## Find it fast

All in `source\src`, except the furniture: the top-level `furniture\` folder, one file per piece plus `_parts.js` for shared parts.
Sizes: `10-util` 350 lines, `20-mats` 520, `30-plan` 490, `40-furn` 35 (registry only), `50-bake` 350, `55-town` 140, `60-app` 815.

| to change | file | symbols |
| --- | --- | --- |
| a flat's rooms, walls, openings, furniture, lamps | `flats/<name>.json` | see `flats/FORMAT.md` |
| checks on the data, worked-out values, page text | `tools/build.mjs` | "checks", "worked-out values"; `{{...}}` in `00-head.html` |
| opening kinds and their defaults | `30-plan.js` | `KINDS`, `OPEN`, `innerOf`, `frameOf` |
| walls, roof, light stand-ins | `30-plan.js` | `buildWalls`, `wallRun`, `cells`, `cover` |
| wall surfaces, outside of the block, ceilings | `30-plan.js` | `buildPlan`, `roomGroups`, `outline`, `edgeFace`, `skirting` |
| floors | `30-plan.js` | `floorSpec`, `slab`; materials per room in the data |
| doors and glazing | `30-plan.js` | `hingedDoor`, `swingDoor`, `doorTrim`, `glazedTrim`, `entryDoor`, `casement`, `fixedGlass`, `slider`, `railing` |
| furniture pieces | `furniture\<t>.js`, one per piece; registry `PIECES`, `piece()` in `40-furn.js` | helpers `pAt`, `pFrom`, `pLamp`, `pMirror`, `BXS` in `furniture\_parts.js` |
| reusable parts | `furniture\_parts.js` | `diningChair`, `doubleBed`, `plantLeafy`, `plantSpiky`, `bush`, `art`, `curtain`, `books`, `wineGlass`, `pot` |
| lamps | `furniture\_parts.js` | `downlight`, `ceilingLamp`, `pendant`; `lamp` in `30-plan.js` |
| colours, textures | `20-mats.js` | `initMaterials` (`mk`, `mkRaw`), `tex...` functions |
| Finishes panel: floor and wall choices | `20-mats.js`; `30-plan.js`; `60-app.js` | `FINISHES`, `applyFinish`, `SURF`, `mkLike`; per-room materials in `buildPlan`; panel in section "finishes" |
| Empty button: furniture apart, green frame | `40-furn.js`; `30-plan.js`; `60-app.js` | `buildFurniture`, `buildPiece` (`PIECE_RECS`, `FIXED`); `FRAME`; `prepEmpty`, `setEmpty` |
| Furniture panel: pick, drag, turn, add, undo | `60-app.js` section "furniture"; `00-head.html` `#edit` | `setPiece`, `movedP`, `turnedP`, `addPiece`, `ADD`, `NAMES` (both built from each piece file's `name` / `add` / `values`), `pickAt`, `bakeAgain`; hooks `__flat.furniture` |
| sun, sky, day and evening | `60-app.js` | `TOSUN`, `LIGHT`, `LOOKS`, `applyLook` |
| values from the flat's bounds | `60-app.js` top (`BX0..BZ1`, `MIDX`, `REST`, `START`, `MAPR`); bake `input` (`grid`, `patchBox`, `probe`, `open`) |
| light bake | `60-app.js` section "the light bake"; `50-bake.js` `bakeCore`, `runBake` |
| walking, collisions, doors opening | `60-app.js` | `walkStep`, `settle`, `pushOut`, `stepDoors`, `poseDoor`, `standNear`, `openYaw` |
| plan view, flying in and out | `60-app.js` | `planPose`, `fitDist`, `goWalk`, `goPlan` |
| HUD | `00-head.html`; `60-app.js` | `syncUI`, `hint`, `placeTags`, `captureMap`, `drawMap` |
| mirrors | `pMirror` in `furniture\_parts.js`; `drawMirrors` in `60-app.js` |
| town outside | `55-town.js` `makeTown` (assumes the windows face +Z); `20-mats.js` `texPanorama` |
| wall tracer | `tools/trace.mjs`, `tools/trace.html` (`trace`, `strips`) |

## Conventions

- Metres. X west to east, Z north to south, Y up. Origin at the outer north-west corner. Right angles, except `slants` and `poly` rooms.
- Turn every flat so its main glazing faces +Z: the sun, the town and the painted panorama assume it.
- Image to metres: `X = (px - origin[0]) / ppm`, `Z = (py - origin[1]) / ppm`, from the data's `ref`.
- A wall run is one rectangle; an opening finds its run by `at` (both faces) and `a..b` lying inside it.
- Rooms with no wall run between them share walls and ceiling. A room's `rects` are free floor, face to face.
- Doors: `hinge` `a`/`b` is the end it hangs on, `into` `1`/`-1` the side it swings to (+X/+Z or -X/-Z), `rest` 0..1.
- `lamp(x, y, z, strength, colour, ch, opts)`: `ch` 1 is lit day and evening, 2 evening only; `down: 1` for recessed lights.
- Baked light has three channels: A daylight, B lamps always on, C evening lamps. `LOOKS` holds their multipliers.
- Things hanging from the ceiling go in `into(CEIL, () => { ... })` so the plan view hides them; plan-only caps go in `CAPS`.
- Materials: `mk(name, { color, map, rough, metal, env, fine, two, cast, alb })`. `build.mjs` rejects names that `20-mats.js` does not define.

## Builder cheat sheet

From `10-util.js`. `y0` is the underside of the piece. A new piece is a new file `furniture\<t>.js`: `'use strict';` then `piece('<t>', { name: 'Label', add: <place in the Add list> }, function (p) { pAt(p, () => { ... }); });`:
build it in its own frame (native direction in the comment), add a collider, use `pLamp`/`pMirror` for lights and mirrors.

| call | makes |
| --- | --- |
| `B(mat, x, y0, z, w, h, d, o)` | box centred on x, z |
| `BX(mat, x0, y0, z0, x1, y1, z1, o)` | box from two corners (`BXS` takes them in any order) |
| `RB(mat, x, y0, z, w, h, d, r, o)` | box with rounded edges |
| `CY(mat, x, y0, z, rTop, rBot, h, o)` | cylinder or cone |
| `LA(mat, x, y0, z, [[r, y], ...], o)` | turned shape; list the profile bottom to top |
| `SP(mat, x, y, z, r, o)` | sphere; `sx, sy, sz` stretch it |
| `PIL(mat, x, y, z, w, h, d, o)` | stuffed cushion centred on its seam, with a flange (`flange`, `lower`, `seed`, `lump`); `rx` near PI/2 stands it up |
| `TU(mat, [[x, y, z], ...], r, o)`, `BAR(mat, a, b, r, o)` | bent tube, straight rod |
| `basin(...)`, `rim(...)` | hollow of a bath or sink, and its flat rim |
| `place(x, y, z, ry, () => { ... })` | build in a local frame, turned by ry |
| `occBox(...)`, `occLocal(...)`, `pOcc(...)` | stand-in box for the light bake |
| `COL.push({ k: 0, x0, z0, x1, z1 })`, `colRect`, `colCircle` | walk colliders (`colRect`, `colCircle` work inside `place`) |

Options `o`: `ry, rx, rz` turn the piece; `cell` sets tessellation; `occ: false` no light stand-in, `occ: true` force one;
`free: true` for a piece that sits inside another stand-in on purpose; `uv: 'keep'`, `uvScale`, `swap` for textures.

## Per-flat procedure

1. `node tools/trace.mjs <image> <name> <total m²> <turn>`: writes `ref/<name>.png`, `dist/shots/trace.png` and a
   skeleton `flats/<name>.json` with the white walls and a first scale. Look at `trace.png` once.
   It finds walls drawn in white (flat 1's style). Partitions drawn in other colours (flat 2's dark and brown lines) are
   missed: measure those by hand (Measuring a plan). The first scale counts furniture as floor and comes out a few %
   high; the room areas set the real one.
2. Write rooms (rects, Georgian names, areas), the missing walls, shafts, openings, rails, start spot. Build: the area
   table must show every room within 1 %; move walls by centimetres until it does.
3. Furniture from at most three zoomed crops (`measure.html`), placed with the pieces in `FORMAT.md`; copy lamps,
   plants and looks from `flat1.json` / `flat2.json`.
4. Build, `walktest.mjs <name>` and `walktest.mjs <name> touch` until both say PASS.
5. One top-view overlay and one view from inside.
6. Publish `dist\<name>\<file>.html` as that flat's artifact **with the furniture folder**: in `files`, map `furniture/index.js` and every
   `furniture/<f>.js` (the page refers to the index by that path) to `..\furniture\<f>.js`. The offline file is `..\results\<folder>\<file>.html` (second argument to `build.mjs`) and needs `..\furniture\` two levels up.
7. Add the flat and its artifact link to State.

## Measuring a plan

1. One full view at 2x with a 50 px grid, then at most three zooms (6x, 10 px grid) where furniture is dense.
2. Note the outer north-west corner pixel and every inner wall line.
3. Scale: `S = sqrt(pixel area of all rooms / total m²)`. Each room should come out within 5 % of its given area,
   then move walls by a few centimetres until every room is within 1 %.
4. Usual sizes: outer walls 0.22 to 0.38, partitions 0.10 to 0.15, doors 0.8 to 0.9 wide. A door drawn ajar gives its `rest`.
5. When the user's dimensions disagree with their areas (flat 2's blueprint did), trust the areas and say so.
6. Furniture: centre, size and turn from pixels, then pushed against the nearest wall. Keep 0.8 m walkways, or the walk test's reachability fails.

## Gotchas

- Black patches: the vertices lie inside a light stand-in. Keep stand-ins inside the visible shape, or use `free: true` or `occ: false`.
- A lamp inside a stand-in gives no light. Lamp shades need `occ: false`.
- A thin bright line along wall tops is sunlight leaking in. Meshes that only cast shadows need `shadowSide = T.DoubleSide`.
- Hairline gaps showing sky: floors and ceilings must lap into the walls (`LAP`), walls run past floor and ceiling, and all grids share `GX`, `GZ`, `HARDY`.
- The first render into a mirror compiles a second set of shaders. The warm-up at the end of `boot` covers it (`warm` in the data moves it).
- Rooms lit only by lamps wash out easily. Tune the lamp strengths, not the exposure.
- A new furniture piece needs a collider, or people walk through it.
- "opening lies in no wall run": its `at` must equal the two faces of one run in `walls`, and `a..b` must lie inside that run.
- A sliding door can only be walked through at its opening half; the walk test aims there by itself.

## Ask the user for

Per flat: the image as large as it exists, the room areas, a name. Useful if they have it: one real dimension, or
dimensioned drawings. Say which side the main windows are on if it is not obvious, and what to call rooms that share a name.
Suggest three to five flats per session, a fresh session per batch, and normal effort.
