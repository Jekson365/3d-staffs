// Writes furniture/index.js, the list of furniture files every flat page loads, after checking each file.
// Run it after adding, renaming or deleting a file in furniture/ (build.mjs runs it too). Built pages do not need a
// rebuild: they load furniture/index.js, and it loads the files listed in it, so a new piece shows in every flat's Add list.
// Usage: node tools/furniture-index.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

export const FURN_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'furniture');

// Checks every file and writes index.js. Returns { files, pieces, errors }; nothing is written when there are errors.
export function furnitureIndex(dir = FURN_DIR) {
  const errors = [], pieces = new Map();
  if (!existsSync(join(dir, '_parts.js'))) return { files: [], pieces, errors: ['missing ' + join(dir, '_parts.js')] };
  const files = ['_parts.js', ...readdirSync(dir).filter((f) => f.endsWith('.js') && f !== '_parts.js' && f !== 'index.js').sort()];
  for (const f of files) {
    const code = readFileSync(join(dir, f), 'utf8');
    try { new vm.Script(code, { filename: f }); } catch (e) { errors.push(f + ': ' + e.message); continue; }
    if (code.toLowerCase().includes('<' + '/script')) errors.push(f + ': contains a script end tag');
    if (!/^\s*(\/\/[^\n]*\n\s*)*'use strict';/.test(code)) errors.push(f + ": must start with 'use strict';");
    const names = [...code.matchAll(/^piece\('(\w+)'/gm)].map((m) => m[1]);
    if (f === '_parts.js') continue;
    if (!names.length) errors.push(f + ": no piece('name', ...) at the start of a line");
    for (const n of names) {
      if (pieces.has(n)) errors.push(f + ': piece "' + n + '" is also in ' + pieces.get(n));
      else pieces.set(n, f);
    }
    if (names.length && !names.includes(f.slice(0, -3))) errors.push(f + ': name the file after its piece (' + names[0] + '.js)');
  }
  if (errors.length) return { files, pieces, errors };
  const list = files.map((f) => "  '" + f.slice(0, -3) + "',").join('\n');
  writeFileSync(join(dir, 'index.js'), `// ---------- furniture/index.js : the furniture every flat page loads ----------
// Written by source/tools/furniture-index.mjs from the files in this folder; run it again after adding, renaming or
// deleting a piece file (or add the name to the list by hand). Pages load only this file; it loads the ones listed,
// in order, from this same folder, before the rest of the page's program runs.
(function () {
  var FILES = [
${list}
  ];
  var base = document.currentScript.src.replace(/[^/]*$/, '');
  for (var i = 0; i < FILES.length; i++) document.write('<script src="' + base + FILES[i] + '.js"><' + '/script>');
})();
`);
  return { files, pieces, errors };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { files, pieces, errors } = furnitureIndex();
  if (errors.length) { console.error('furniture/index.js not written:\n  ' + errors.join('\n  ')); process.exit(1); }
  console.log('furniture/index.js: ' + files.length + ' files, ' + pieces.size + ' pieces: ' + [...pieces.keys()].join(', '));
}
