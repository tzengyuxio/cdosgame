// One-off backfill: generate the 160px mini/ variant for every image that
// already has a 360px thumb/. process_media.mjs writes both sizes for anything
// new, so this only has to catch up the library that predates mini/.
// Run: node scripts/backfill_mini.mjs [--dry-run]
import { readdirSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { execFileSync } from "node:child_process";

const DRY = process.argv.includes("--dry-run");
const ROOT = "public/media";

const walk = function* (dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && e.name.endsWith(".webp")) yield p;
  }
};

let made = 0, skipped = 0, missing = 0;
for (const thumbPath of walk(ROOT)) {
  if (basename(dirname(thumbPath)) !== "thumb") continue;
  const entityDir = dirname(dirname(thumbPath));
  const name = basename(thumbPath);
  // Prefer the full-size original as the source; fall back to the thumb.
  const full = join(entityDir, name);
  const source = existsSync(full) ? full : thumbPath;
  const outDir = join(entityDir, "mini");
  const out = join(outDir, name);
  if (existsSync(out)) { skipped++; continue; }
  if (!existsSync(source)) { missing++; continue; }
  if (DRY) { made++; continue; }
  mkdirSync(outDir, { recursive: true });
  execFileSync("magick", [source, "-resize", "160x>", "-quality", "75", out]);
  made++;
  if (made % 250 === 0) console.log(`  … ${made}`);
}
console.log(`${DRY ? "[dry-run] " : ""}mini 產生 ${made}，已存在 ${skipped}，來源缺漏 ${missing}`);
