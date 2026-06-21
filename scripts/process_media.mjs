// Intake for the curated media library (see docs/media.md §5).
//
//   node scripts/process_media.mjs
//
// Reads raw/media/_inbox/ — flat files named
//   <cdg-id>__<kind>[-NN]__<source>[__caption][__cover].<ext>
// or per-game subfolders  <cdg-id>/<kind>[-NN]__<source>[__caption][__cover].<ext>
// For each: writes WebP full + thumb to public/media/games/<id>/, archives the
// original to raw/media/games/<id>/ (+ manifest.jsonl), clears it from the inbox,
// and prints a media[] snippet to paste into the game's .md.
import { readdirSync, existsSync, mkdirSync, renameSync, statSync, appendFileSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { execFileSync } from "node:child_process";
import { MEDIA_KINDS } from "../schema/game.schema.mjs";

const INBOX = "raw/media/_inbox";
const MAX_PIXELS = 1_000_000;  // cap full image area to ~1 MP (only shrink, never enlarge)
const LOSSLESS_KINDS = new Set(["title", "screenshot"]);
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"]);

const normId = (s) => {
  const m = String(s).match(/(\d{3,})/);
  return m ? `cdg-${m[1].padStart(4, "0")}` : null;
};

// → { id, kind, source, caption, cover } | null
function parse(file, folderId) {
  const base = basename(file, extname(file));
  let fields = base.split("__").map((x) => x.trim()).filter(Boolean);
  let id = folderId;
  if (!id) { id = normId(fields[0]); fields = fields.slice(1); }
  const cover = fields.includes("cover");
  fields = fields.filter((x) => x !== "cover");
  const rawKind = fields[0] || "";          // may carry a -NN sequence (manual-01)
  const kind = rawKind.replace(/-\d+$/, ""); // enum value (manual, screenshot…)
  const source = fields[1] || "";
  const caption = fields.slice(2).join(" ");
  if (!id || !MEDIA_KINDS.includes(kind)) return null;
  return { id, rawKind, kind, source, caption, cover };
}

function webp(input, output, lossless) {
  const resize = ["-resize", `${MAX_PIXELS}@>`];  // shrink to ≤ MAX_PIXELS area
  const args = lossless
    ? [input, ...resize, "-define", "webp:lossless=true", output]
    : [input, ...resize, "-quality", "82", output];
  execFileSync("magick", args);
}
function thumb(input, output) {
  execFileSync("magick", [input, "-resize", "360x>", "-quality", "75", output]);
}

if (!existsSync(INBOX)) { console.log(`(無 inbox：${INBOX})`); process.exit(0); }

// collect inbox entries: flat files + one level of per-game subfolders
const jobs = [];
for (const ent of readdirSync(INBOX)) {
  if (ent.startsWith(".") || ent === "_done") continue;
  const p = join(INBOX, ent);
  if (statSync(p).isDirectory()) {
    const fid = normId(ent);
    for (const f of readdirSync(p)) if (IMG_EXT.has(extname(f).toLowerCase())) jobs.push({ file: join(p, f), name: f, folderId: fid });
  } else if (IMG_EXT.has(extname(ent).toLowerCase())) {
    jobs.push({ file: p, name: ent, folderId: null });
  }
}

const byId = {};
let done = 0;
const skipped = [];
for (const { file, name, folderId } of jobs) {
  const meta = parse(name, folderId);
  if (!meta) { skipped.push(name); continue; }
  const { id, rawKind, kind, source, caption, cover } = meta;
  const outDir = join("public/media/games", id);
  const thumbDir = join(outDir, "thumb");
  const archDir = join("raw/media/games", id);
  for (const d of [outDir, thumbDir, archDir]) mkdirSync(d, { recursive: true });
  const src = `${rawKind}.webp`;
  webp(file, join(outDir, src), LOSSLESS_KINDS.has(kind));
  thumb(file, join(thumbDir, src));
  const archived = join(archDir, name);
  renameSync(file, archived);
  appendFileSync(join(archDir, "manifest.jsonl"), JSON.stringify({ src, kind, source, caption, cover, original: name }) + "\n");
  (byId[id] ||= []).push({ src, kind, source, caption, cover });
  done++;
}

console.log(`處理 ${done} 張、跳過 ${skipped.length}${skipped.length ? "（" + skipped.join(", ") + "）" : ""}\n`);
for (const [id, items] of Object.entries(byId)) {
  console.log(`# ${id} → 貼進 content/games/${id}.md 的 media:`);
  console.log("media:");
  for (const m of items) {
    console.log(`- src: ${m.src}`);
    console.log(`  kind: ${m.kind}`);
    console.log(`  source: ${m.source || "TODO"}`);
    if (m.caption) console.log(`  caption: ${m.caption}`);
    if (m.cover) console.log(`  cover: true`);
  }
  console.log("");
}
