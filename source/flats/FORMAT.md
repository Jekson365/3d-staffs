# Flat data files

One JSON file per flat, `flats/<name>.json`. `node tools/build.mjs <name>` checks it (problems are reported by field),
works out the rest and builds the pages. `flat1.json` and `flat2.json` are complete examples.

Units are metres. X runs west to east, Z north to south, Y up; the origin is the outer north-west corner.
Turn every plan so its main glazing faces south (+Z): the sun, the town and the painted panorama assume it.
Angles (`r`, `start`, `switches`) are degrees, anticlockwise seen from above: 0 keeps a piece as it stands natively,
90 turns a piece that faces south to face east. Walking yaw: 0 looks north, 90 west, 180 south, -90 east.

## Top level

| key | what |
| --- | --- |
| `name`, `file` | the flat's name; `file` names the output pages (default: the name) |
| `title` | `{ "ka": "ბინა", "en": "Two-bedroom flat", "rooms": "8 rooms incl. balcony" }` for the HUD |
| `total` | total area in m² as given (default: sum of the room areas) |
| `ref` | `{ "image": "flat2.webp", "ppm": 37.35, "origin": [px, py] }`: the turned render in `ref/`, its pixels per metre, the pixel of the outer north-west corner. Used by `tools/compare.html` |
| `start` | `[x, z, yaw]`: where a walk starts, just inside the entrance |
| `height` | ceiling height (default 2.7) |
| `warm` | `[x, z]` the camera visits while loading, in front of a mirror (default: 1.2 m in front of the first mirror) |
| `map` | `{ x0, z0, w, d }` the key-plan area (default: the flat's bounds plus 0.2 m) |
| `rooms`, `walls`, `shafts`, `openings`, `rails`, `switches`, `furniture` | below |

Worked out by `build.mjs` and added to the page's data: `bounds` (box around all walls and rooms), `map`, `digits`
(decimals shown for areas, from the given figures), `total`. Everything listed under "Flat-specific values" in the
old guide comes from these: camera target, town centre, sun-shadow box, roof, bake grid, probe lattice, walk limits.

## rooms

```json
{ "id": "kit", "ka": "სამზარეულო", "en": "Kitchen", "area": 11.96, "rects": [[x0, z0, x1, z1], ...], "label": [x, z],
  "floor": { "mat": "floorLiv", "uv": "plankX", "off": [0.31, 0.2] }, "walls": "wallTile", "outdoor": true, "covered": false }
```

- `rects`: union of rectangles of free floor, wall face to wall face. Their summed area is what `build.mjs` prints against `area`.
- `floor.mat`: `floorLiv` (oak, default), `floorHall` (dark oak), `floorBed` (pale oak), `floorBath` (terrazzo), `floorBalc`
  (concrete, default outdoors). `floor.uv`: `plank` (boards run north-south), `plankX` (east-west), `tile`, `slab`. `off` shifts the boards.
- `walls`: wall finish, `wall` (default, with skirting) or `wallTile`.
- `outdoor`: a balcony or terrace: facade finish, not lit as indoors, gets the slab edge. `covered: false` leaves it without a slab overhead.
- `poly`: a convex polygon `[[x, z], ...]` of free floor instead of (or as well as) `rects`, for a room with slanted sides (flat 7's balcony).
  Its floor, ceiling (unless `covered: false`), slab edge, light stand-ins and walk area follow the polygon. It never joins a room group.
- Rooms that touch with no wall run between them (hall, kitchen, living room) share walls and ceiling automatically.

## walls and shafts

`walls`: rectangles `[x0, z0, x1, z1]` in plan, full height, one per straight run. A run must be one piece wherever an
opening crosses it, because an opening finds its wall by matching both faces (`at`) and lying within the run.
Wall surfaces, skirting, the outside of the block, ceilings and the roof are worked out from rooms and walls.

`slants`: full-height walls at an angle, `{ "a": [x, z], "b": [x, z], "t": thickness, "mat": "facade" }` (centre line a -> b). They take no
openings in `openings` and get no wall faces from the rooms: each is one box in `mat` with a turned collider and stair-step light stand-ins.
Optional: `"in": "wall"` gives the indoor face its own finish (the box splits in two halves); `"ops": [...]` puts openings in it,
`{ "kind": "door" | "fixed", "from", "to" }` in metres along a -> b, `head` (2.1 / 2.32); a door also takes `id`, `hinge` `a`/`b`,
`into` (1: the side left of a -> b seen from above), `rest`, `leaf`. Fixed glazing lets daylight in (flat 8).

`shafts`: riser shafts, solid and full height like walls, drawn dark in the plan view: `{ "rect": [...], "dark": [...]
(the dark part, default 5.5 cm inside), "rings": 2 or [0.27, 0.73] (ducts along the long side) }`.

## openings

```json
{ "id": "bedA", "kind": "door", "axis": "x", "at": [3.64, 3.75], "a": 2.95, "b": 3.81, "leaf": "plain", "hinge": "b", "into": 1, "rest": 0.4 }
```

- `axis` `"x"`: the opening spans `a..b` along X in a wall whose faces are at Z = `at[0]` and `at[1]`. `"z"`: the other way round.
- `kind`, with its default `sill` and `head`:
  - `entry` (0, 2.1): the entrance door, kept shut. `handle`: `"a"` (default) or `"b"`, the end the lever is at.
  - `door` (0, 2.1): hinged. `leaf` `plain` or `glazed`; `hinge` `"a"` or `"b"` (the end it hangs on); `into` `1` or `-1`
    (the side of the wall it opens to: +X/+Z or -X/-Z); `rest` how far it stands open when nobody is near (0..1).
  - `slide` (0, 2.32): glazed slider. `panes` 2 (one fixed pane at end `fixed`, `"b"` by default, one sliding) or 4 (fixed
    at both ends, the middle two part; default when wider than 2.6 m).
  - `fixed` (0, 2.32): floor-to-head fixed glazing, mullions about every 1.1 m.
  - `window` (0.8, 2.4): casement window with sill boards.
  - `gap` (0, 2.1): an open doorway with a lining.
- `sill`, `head` override the defaults. The room side is found by itself (indoors beats the balcony beats outside).
- Every glazed opening lets daylight into the bake.

## rails, switches

- `rails`: glass balustrades, `{ "pts": [[x, z], ...], "top": 1.05 }` (segments may be slanted) along the outer edge of a balcony; each has a walk collider.
- `switches`: `[x, z, r]` light switches 1.05 m up on a wall face; r 0 faces south.

## furniture

`{ "t": piece, "x", "z", "r", ...values }`. Pieces that fill a rectangle take `rect` instead of `x, z`.
The comment at the top of each piece file in the shared folder `furniture/` (one file per piece, `furniture/<t>.js`) gives its size and values. "Native" is how it stands at r 0.

| piece | stands natively | values |
| --- | --- | --- |
| `downlight` | in the ceiling | `I` (0.75), `col` (`SOFT`, `WARM`, `COOL`), `ch` (2: evening only; 1: day and evening) |
| `ceilingLamp` | flush dish | `s` radius (0.16), `I`, `col`, `ch` (1) |
| `pendant` | black dome, evening only | `y` its rim (1.55) |
| `wallLight` | on an east wall, facing west | |
| `floorLamp` | drum shade, lit | |
| `plantLeafy`, `plantSpiky` | pot plants | `seed`, size and look: see flat1.json; `y` lifts the pot |
| `planter` | square pot with a round bush | `seed` |
| `bath` | built in, `rect` long side along Z (`along: "x"`: along X, mixer w = south side, head n = west end) | `mixer` `w`/`e` (tap wall), `head` `n`/`s` (shower end), `rain`, `screen` (false to leave out), `hole` [w, d] |
| `toilet` | back to a north wall at (x, z) | |
| `vanity` | back to a north wall, 0.77 wide, mirror above | `zone` [x0, z0, x1, z1] it is seen from (default: its room) |
| `towelLadder` | on an east wall, facing west | |
| `rug` | flat | `mat` (`rugTri`, `rubber`, `towel`, ...), `rect`, `h`, `round` |
| `roundRug` | plaid, radius 0.78 | |
| `closet` | sliding wardrobe filling a recess | `rect`, `face` `w`/`e`/`n`/`s` (where the doors are) |
| `entryPhone` | on a west wall, facing east | |
| `mirrorShelf` | on a west wall: shelf under a round mirror | `zone` |
| `coatBench` | on a west wall: shoe bench and coat hooks, 0.95 long | |
| `counter` | kitchen run, `rect` worktop back to front | `face` (where the fronts look), `sink`, `hob` (distance along the run from its west/north end), `sinkW`, `oven`, `hood`, `splash`, `fronts` [from, to] |
| `fridge` | back to a north wall | `w`, `d`, `h` |
| `washer` | back to a north wall | |
| `kitchenShelf` | on a north wall | `w` (0.8) |
| `fruitBowl`, `jars` | on the worktop | `y` (0.9); jars run southwards |
| `teaRail` | on a cabinet front facing south | |
| `diningSet` | table along X with four chairs | `w`, `d`, `ends` (`w`, `e`, `we`, ``), `endPlates` |
| `media` | console and TV, back to a west wall | |
| `coffeeTable`, `sideTable` | round | |
| `sofa` (2.52 x 1.11), `cornerSofa` (chaise at the east end), `armchair` | sitter faces south | |
| `shellSofa` (1.72 x 0.82, 0.80 high; channel-tufted shell, JYSK-style) | sitter faces south | `mat` fabric (default `terracotta`), `legs` (default `oak`) |
| `modularSofa` (2.81 x 0.82, 1.43 deep with the ottoman, 0.85 high; gorgia.ge MLM-110293) | sitter faces south | `mat` (default `chenille`), `legs` (default `ebony`), `ottoman` 1 east / -1 west / 0 none, `pillows` 0 no throw pillows |
| `channelCornerSofa` (2.55 x 0.92, 1.60 deep at the chaise, 0.86 high; gorgia.ge BM-00157269) | sitter faces south, chaise west | `mat` (default `teal`), `chaise` 1 west / -1 east, `pillows` 0 no throw pillows |
| `art` | framed print on a wall, facing south | `mat` (`art1`..`art3`), `y` centre height, `w`, `h` |
| `curtain`, `curtainTrack` | along X only | `x0`, `x1`, `z`, `y0`, `y1` |
| `bed` | double, head to the west | |
| `nightTable` | drum table with a lit globe | |
| `wallTV` | on an east wall, facing west | |
| `crib` | oval, long side along X | |
| `bench` | back to a south wall, facing north | |
| `radiator` | on a south wall | |
| `wardrobe` | free-standing, `rect` | `face` |
| `lowShelf` | oak cabinet 0.9 high, `rect` | |
| `rattanChair` | sitter faces south | |
| `bistroTable` | round, 0.6 across | |
| `block` | solid low block, `rect` | `h`, `mat` |
| `shower` | walk-in tray, back to a north wall at (x, z), runs south | `w` (0.9), `d` (1.0), `glass` `w`/`e`/`` (side screen) |
| `acUnit` | outdoor air-conditioner 0.8 x 0.3, back to a north wall, fan faces south | |
| `box` | plain box `b` [x0, y0, z0, x1, y1, z1] | `mat`, `occ`, `col` (true: walk collider) |

Every piece except `downlight` and `ceilingLamp` is furniture: the page's **Empty** button hides it (with its lamps, mirrors and
colliders) and shows the shell lit without it. Add `"fixed": true` to keep another piece (a built-in) when the flat is emptied.
The **Finishes** panel gives every room its own floor and every group of rooms its own walls; the choices are `FINISHES` in
`src/20-mats.js`, and the room's `floor` / `walls` in the data stay the "As designed" choice.

A piece that is not in the list needs a new file `furniture/<t>.js`: `'use strict';` then
`piece('<t>', { name: 'Panel label', add: <place in the Add list>, values: { Add defaults } }, function (p) { ... });`
(leave `add` out to keep it off the Add list). Build it inside `pAt(p, () => ...)`
in its own frame, give it a collider (`colRect`, `colCircle`), and use `pLamp` / `pMirror` for lights and mirrors.
Then run `node tools/furniture-index.mjs`: it checks the files and rewrites `furniture/index.js`, the list every page
loads. No flat needs a rebuild: reload a page and the new piece is in its Add list. Changes to an existing piece file
also show in every built flat at once (the pages load the folder, they do not copy it). See `furniture/README.md`.
