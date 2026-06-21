// Intake for the curated media library (see docs/media.md §5).
//
//   node scripts/process_media.mjs
//
// Reads raw/media/_inbox/:
//   games   — flat  <cdg-id>__<kind>[-NN]__<source>[__caption][__cover].<ext>
//             or    <cdg-id>/<kind>[-NN]__<source>[__caption][__cover].<ext>
//   公司／人物 — companies/<公司名>/<kind>…  ·  people/<人名>/<kind>…
// For each: writes WebP full (≤1MP) + thumb to public/media/<coll>/<slug>/,
// archives the original to raw/media/<coll>/<slug>/ (+ manifest.jsonl), clears
// the inbox, and prints a media[] snippet to paste into the entity's .md.
import { readdirSync, existsSync, mkdirSync, renameSync, statSync, appendFileSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { execFileSync } from "node:child_process";
import { MEDIA_KINDS } from "../schema/game.schema.mjs";
import { COMPANY_MEDIA_KINDS, PERSON_MEDIA_KINDS } from "../schema/media.schema.mjs";

const INBOX = "raw/media/_inbox";
const MAX_PIXELS = 1_000_000;  // cap full image area to ~1 MP (only shrink, never enlarge)
const LOSSLESS_KINDS = new Set(["title", "screenshot", "logo"]);
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"]);
const KINDS = { games: MEDIA_KINDS, companies: COMPANY_MEDIA_KINDS, people: PERSON_MEDIA_KINDS };
const MD_DIR = { games: "content/games", companies: "content/companies", people: "content/people" };

const normId = (s) => {
  const m = String(s).match(/(\d{3,})/);
  return m ? `cdg-${m[1].padStart(4, "0")}` : null;
};

// → { coll, slug, rawKind, kind, source, caption, cover } | null
function parse(file, coll, slug) {
  let fields = basename(file, extname(file)).split("__").map((x) => x.trim()).filter(Boolean);
  if (!slug) { slug = coll === "games" ? normId(fields[0]) : fields[0]; fields = fields.slice(1); }
  const cover = fields.includes("cover");
  fields = fields.filter((x) => x !== "cover");
  const rawKind = fields[0] || "";
  const kind = rawKind.replace(/-\d+$/, "");
  const source = fields[1] || "";
  const caption = fields.slice(2).join(" ");
  if (!slug || !KINDS[coll].includes(kind)) return null;
  return { coll, slug, rawKind, kind, source, caption, cover };
}

function webp(input, output, lossless) {
  const resize = ["-resize", `${MAX_PIXELS}@>`];
  const args = lossless ? [input, ...resize, "-define", "webp:lossless=true", output] : [input, ...resize, "-quality", "82", output];
  execFileSync("magick", args);
}
const thumb = (input, output) => execFileSync("magick", [input, "-resize", "360x>", "-quality", "75", output]);

if (!existsSync(INBOX)) { console.log(`(無 inbox：${INBOX})`); process.exit(0); }

// collect jobs: games (flat / cdg-folder) + companies/<slug>/ + people/<slug>/
const jobs = [];
const imgsIn = (dir) => readdirSync(dir).filter((f) => IMG_EXT.has(extname(f).toLowerCase()));
for (const ent of readdirSync(INBOX)) {
  if (ent.startsWith(".") || ent === "_done") continue;
  const p = join(INBOX, ent);
  if (ent === "companies" || ent === "people") {
    if (!statSync(p).isDirectory()) continue;
    for (const sub of readdirSync(p)) {
      if (sub.startsWith(".")) continue;
      const sp = join(p, sub);
      if (statSync(sp).isDirectory()) for (const f of imgsIn(sp)) jobs.push({ file: join(sp, f), name: f, coll: ent, slug: sub });
      else if (IMG_EXT.has(extname(sub).toLowerCase())) jobs.push({ file: sp, name: sub, coll: ent, slug: null });  // flat: slug from filename
    }
  } else if (statSync(p).isDirectory()) {
    for (const f of imgsIn(p)) jobs.push({ file: join(p, f), name: f, coll: "games", slug: normId(ent) });
  } else if (IMG_EXT.has(extname(ent).toLowerCase())) {
    jobs.push({ file: p, name: ent, coll: "games", slug: null });
  }
}

const out = {};  // `${coll}/${slug}` -> items
let done = 0;
const skipped = [];
for (const { file, name, coll, slug } of jobs) {
  const meta = parse(name, coll, slug);
  if (!meta) { skipped.push(name); continue; }
  const outDir = join("public/media", meta.coll, meta.slug);
  const thumbDir = join(outDir, "thumb");
  const archDir = join("raw/media", meta.coll, meta.slug);
  for (const d of [outDir, thumbDir, archDir]) mkdirSync(d, { recursive: true });
  const src = `${meta.rawKind}.webp`;
  webp(file, join(outDir, src), LOSSLESS_KINDS.has(meta.kind));
  thumb(file, join(thumbDir, src));
  renameSync(file, join(archDir, name));
  appendFileSync(join(archDir, "manifest.jsonl"), JSON.stringify({ src, ...meta, original: name }) + "\n");
  (out[`${meta.coll}/${meta.slug}`] ||= []).push({ ...meta, src });
  done++;
}

console.log(`處理 ${done} 張、跳過 ${skipped.length}${skipped.length ? "（" + skipped.join(", ") + "）" : ""}\n`);
for (const [key, items] of Object.entries(out)) {
  const [coll, slug] = key.split("/");
  console.log(`# ${key} → 貼進 ${MD_DIR[coll]}/${slug}.md 的 media:`);
  console.log("media:");
  for (const m of items) {
    console.log(`- src: ${m.src}`);
    console.log(`  kind: ${m.kind}`);
    console.log(`  source: ${m.source || "TODO"}`);
    if (m.caption) console.log(`  caption: ${m.caption}`);
    if (m.cover) console.log(`  cover: true`);
    if (coll === "companies" && m.kind === "ad") console.log(`  # games: [cdg-XXXX]  ← 若為多款代理廣告，補上涵蓋的遊戲`);
  }
  console.log("");
}
