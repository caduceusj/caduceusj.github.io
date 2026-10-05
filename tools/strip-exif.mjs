// Removes EXIF metadata (GPS position, camera model...) from JPEG files, applying the
// orientation to the pixels first so the picture still looks upright.
//   node tools/strip-exif.mjs                 -> every .jpg/.jpeg in assets/
//   node tools/strip-exif.mjs assets/Eu.jpg   -> only the given files
// Files without EXIF (or that do not exist) are left untouched.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

export async function hasExif(file) {
  const m = await sharp(file, { failOn: 'none' }).metadata();
  return Boolean(m.exif);
}

export async function strip(file) {
  if (!(await hasExif(file))) return false;
  const buf = await sharp(file, { failOn: 'none' }).rotate().jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' }).toBuffer();
  fs.writeFileSync(file, buf);
  return true;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const assets = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets');
  const args = process.argv.slice(2);
  const files = args.length ? args : fs.readdirSync(assets).filter((n) => /\.jpe?g$/i.test(n)).map((n) => path.join(assets, n));
  for (const f of files) {
    if (!fs.existsSync(f)) { console.log(`${f}: not found, skipped`); continue; }
    const before = fs.statSync(f).size;
    const changed = await strip(f);
    console.log(`${f}: ${changed ? `EXIF removed (${(before / 1024).toFixed(0)} KB -> ${(fs.statSync(f).size / 1024).toFixed(0)} KB)` : 'no EXIF, unchanged'}`);
  }
}
