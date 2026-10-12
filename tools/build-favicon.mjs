// Draws the 16x16 pixel-art "J" tile and writes favicon.svg + PNG icons (nearest-neighbour upscales).
//   node tools/build-favicon.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets');
const PAL = { K: '#082a8f', A: '#7bb6ff', B: '#2f7cf5', C: '#0a52d8', W: '#ffffff', S: '#c9dcff', O: '#ff9a1f', G: '#47b84a', '.': null };
const ROWS = [
  '..KKKKKKKKKKKK..',
  '.KAAAAAAAAAAAAK.',
  'KAABBBBBBBBBBBCK',
  'KABBWWWWWWWWBBCK',
  'KABBSSSWWSSSBBCK',
  'KABBBBBWWBBBBBCK',
  'KABBBBBWWBBBBBCK',
  'KABBBBBWWBBBBBCK',
  'KABBBBBWWBBBBBCK',
  'KABBWBBWWBBBBBCK',
  'KABBWWBWWBBBOOCK',
  'KABBBWWWWBBBOOCK',
  'KABBBBSSSBBBBBCK',
  'KBBBBBBBBBBBBBCK',
  '.KCCCCCCCCCCCCK.',
  '..KKKKKKKKKKKK..',
];
ROWS.forEach((r, i) => { if (r.length !== 16) throw new Error('row ' + i + ' has ' + r.length); });

const rgba = Buffer.alloc(16 * 16 * 4);
let rects = '';
ROWS.forEach((row, y) => [...row].forEach((ch, x) => {
  const col = PAL[ch];
  if (!col) return;
  const i = (y * 16 + x) * 4;
  rgba[i] = parseInt(col.slice(1, 3), 16); rgba[i + 1] = parseInt(col.slice(3, 5), 16); rgba[i + 2] = parseInt(col.slice(5, 7), 16); rgba[i + 3] = 255;
}));
// SVG: one <path> per colour, cells merged into rectangles
const byColour = {};
ROWS.forEach((row, y) => [...row].forEach((ch, x) => { if (PAL[ch]) (byColour[ch] = byColour[ch] || []).push([x, y]); }));
for (const ch of Object.keys(byColour)) {
  const used = new Set(), cells = new Set(byColour[ch].map(([x, y]) => x + ',' + y));
  let d = '';
  for (const [x, y] of byColour[ch]) {
    if (used.has(x + ',' + y)) continue;
    let w = 1; while (cells.has((x + w) + ',' + y) && !used.has((x + w) + ',' + y)) w++;
    let h = 1; outer: while (true) { for (let i = 0; i < w; i++) if (!cells.has((x + i) + ',' + (y + h)) || used.has((x + i) + ',' + (y + h))) break outer; h++; }
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) used.add((x + i) + ',' + (y + j));
    d += `M${x} ${y}h${w}v${h}h-${w}z`;
  }
  rects += `<path fill="${PAL[ch]}" d="${d}"/>`;
}
fs.writeFileSync(path.join(OUT, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">${rects}</svg>\n`);

const base = sharp(rgba, { raw: { width: 16, height: 16, channels: 4 } });
const up = (n) => base.clone().resize(n, n, { kernel: 'nearest' });
await up(32).png({ palette: true }).toFile(path.join(OUT, 'favicon-32.png'));
await up(192).png({ palette: true }).toFile(path.join(OUT, 'icon-192.png'));
await up(512).png({ palette: true }).toFile(path.join(OUT, 'icon-512.png'));
// iOS / maskable: tile centred on a solid Luna-blue square (safe zone)
const pad = async (inner, size, file) => sharp({ create: { width: size, height: size, channels: 4, background: '#245edb' } })
  .composite([{ input: await up(inner).png().toBuffer(), gravity: 'center' }]).png({ palette: true }).toFile(path.join(OUT, file));
await pad(144, 180, 'apple-touch-icon.png');
await pad(320, 512, 'icon-maskable-512.png');
for (const f of ['favicon.svg', 'favicon-32.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'icon-maskable-512.png']) console.log(f, (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(1) + ' KB');
