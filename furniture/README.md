# furniture

The furniture for every flat page. Pages load `index.js`, and it loads the files listed in it from this folder.
Keep this folder next to `results\`, because the pages in `results\<folder>\` load `../../furniture/index.js`.

## Add a piece

1. Add a file named after the piece, for example `stool.js`:

   ```js
   'use strict';
   // round oak stool 0.35 across, 0.45 high. native: any
   piece('stool', { name: 'Stool', add: 40 }, function (p) {
     pAt(p, () => {
       CY('oak', 0, 0, 0, 0.17, 0.17, 0.45, { seg: 20 });   // material, x, y0, z, top radius, bottom radius, height
       colCircle(0, 0, 0.18);                              // so people cannot walk through it
     });
   });
   ```

   - `name`: the label in the Furniture panel.
   - `add`: its place in the Add list. Leave it out to keep the piece off the list.
   - `values`: the starting values when it is added, for example `values: { mat: 'oak' }`.
2. From `source\`, run `node tools/furniture-index.mjs`. It checks every file and rewrites `index.js`; a broken file is
   reported and the list is left as it was.
3. Reload any flat page. The piece is in the Add list (Furniture panel, G). No flat needs rebuilding.

To put the piece into a flat's design, add `{ "t": "stool", "x": ..., "z": ... }` to that flat's `furniture` in
`source\flats\<name>.json` and rebuild that flat (`node tools/build.mjs <name>`).

The building helpers (boxes, cylinders, cushions, lamps) are listed in `CLAUDE.md` under "Builder cheat sheet".
The materials are in `source\src\20-mats.js`. The shared parts (chairs, plants, lamps) are in `_parts.js`.

## Change or remove a piece

- Change: edit its file and reload. Every flat shows the change.
- Rename or delete: change the file, then run `node tools/furniture-index.mjs`. A flat whose design still uses a deleted
  piece will fail to build.
