// Intrinsic dimensions for the curated media library, read at build time so
// every <img> can carry width/height and reserve its box before it loads.
// The library is 100% WebP (process_media writes nothing else), so a 32-byte
// header read beats pulling in an image dependency.
import { openSync, readSync, closeSync } from 'node:fs';
import { join } from 'node:path';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const cache = new Map();

// RIFF container: 'RIFF' <size> 'WEBP' <fourcc> … Three codings carry the
// dimensions in three different places.
function parseWebp(b) {
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;
  const fourcc = b.toString('ascii', 12, 16);
  if (fourcc === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  if (fourcc === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (fourcc === 'VP8X') {
    const u24 = o => b[o] | (b[o + 1] << 8) | (b[o + 2] << 16);
    return { width: u24(24) + 1, height: u24(27) + 1 };
  }
  return null;
}

// Takes a site-absolute URL as rendered into the page (already base-prefixed)
// and resolves it back to the file under public/. Returns null when the file
// is missing or unparseable — callers then simply omit width/height.
export function imageSize(url) {
  if (!url) return null;
  if (cache.has(url)) return cache.get(url);
  const rel = (BASE && url.startsWith(BASE) ? url.slice(BASE.length) : url).replace(/^\//, '');
  const file = join(process.cwd(), 'public', decodeURIComponent(rel));
  let size = null;
  let fd;
  try {
    fd = openSync(file, 'r');
    const head = Buffer.alloc(32);
    readSync(fd, head, 0, 32, 0);
    size = parseWebp(head);
  } catch { size = null; } finally { if (fd !== undefined) closeSync(fd); }
  cache.set(url, size);
  return size;
}
