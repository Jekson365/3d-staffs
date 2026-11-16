# Walkable flats from plan renders

Each flat is a 3D model built to scale from a top-down render and the room areas given with it. The page opens on a
plan view like the render; click a spot on the floor to stand there and walk. One engine (`src/`) builds every
flat from its data file (`flats/<name>.json`, described in `flats/FORMAT.md`).

| flat | data | offline page | web page to publish |
| --- | --- | --- | --- |
| flat 1, 56.7 m², one bedroom | `flats/flat1.json` | `../flat-3d.html` | `dist/flat1/flat-3d.html` |
| flat 2, 120.47 m², two bedrooms | `flats/flat2.json` | `../flat2.html` | `dist/flat2/flat2.html` |

## Build and check

Run from this folder. The tools start headless Chrome (path from `CHROME`, else the default install).

```
node tools/build.mjs flat2                  # check the data, print room areas against the figures, write the pages
node tools/walktest.mjs flat2               # keys and mouse: every door, the sliding doors, reachability; ends RESULT: PASS/FAIL
node tools/walktest.mjs flat2 touch         # phone: tap, thumbs, pinch
node tools/trace.mjs <image> <name> <m²> 90 # new flat: turn the render, find white walls, write a data-file skeleton
```

`dist/<name>/preview.html` is the page for local checks. `shot.mjs` takes screenshots after evaluating expressions:

```
node tools/shot.mjs dist/flat2/preview.html dist/shots/a 1400 900 "new Promise(r => setTimeout(r, 1200))" "(__flat.walk(7.95, 3.1, -112, -6), 0)"
```

Hooks on `window.__flat`: `walk(x, z, yawDeg, pitchDeg)`, `plan(theta, phi, dist)`, `evening(on)`, `top()` (true top
view), `room(x, z)`, `free(x, z)`, `data` (the flat's data with worked-out values), `stats` (bake timing).
`SCHEME=light|dark`, `MOBILE=1` and `STRICT=1` in the environment change the emulation.

To compare a model with its render: take `dist/shots/top-0.png` with `__flat.top()` (hide `.hud` first), then open
`tools/compare.html#flat2/mix` (or `/ref`, `/mine`); it lays both over a metre grid at the same scale.
`tools/measure.html` draws enlarged crops of a picture with a labelled pixel grid (usage at its top).

## Source files

| file | what it holds |
| --- | --- |
| `00-head.html` | title, styles (light and dark), the HUD markup; `{{...}}` placeholders filled by `build.mjs` |
| `10-util.js` | geometry batching (one mesh per material), primitive builders, light occluders, walk colliders |
| `20-mats.js` | procedural textures and materials; the shader hook that feeds baked light in |
| `30-plan.js` | builds the flat from its data: walls, surfaces, ceilings, roof, doors, windows, glazing, rails |
| `40-furn.js` | the furniture registry (`PIECES`, `piece()`) and per-piece building; the pieces themselves are in `../furniture/` (one file per piece, shared by every flat page) |
| `50-bake.js` | the light bake: daylight through the glazing, lamps, one bounce via probes; runs in web workers |
| `55-town.js` | streets, houses and trees south of the block |
| `60-app.js` | scene, sun and shadows, mirrors, plan view, walking, doors, day and evening, HUD |

Things to tune for every flat: sun, sky and the day and evening looks at the top of `60-app.js` (`TOSUN`, `LIGHT`,
`LOOKS`); materials in `initMaterials()` in `20-mats.js`. Per flat: lamp strengths are values in the data file.

## Decisions worth knowing

- Room outlines are measured from the render, then nudged by a few centimetres so each room's area matches its
  figure. Ceiling height (2.7 m) and all heights are assumptions; the renders show none.
- The entrance door is shut. The other doors swing or slide open as you come near and return to the render's position.
- People in the renders are left out. Wall-hung things the render cannot show (pictures, mirrors, radiators,
  switches, ceiling lights, cooker hoods) are added; hanging lights and hoods are hidden in the plan view.
- Everything outside the windows is invented, and the same for every flat.

`..\CLAUDE.md` is the working guide for Claude sessions.
