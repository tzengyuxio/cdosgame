// Validate every content/*/*.md frontmatter against its Zod schema.
// Usage: npm run validate   (covers games, companies, series)
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { gameSchema } from "../schema/game.schema.mjs";
import { companySchema } from "../schema/company.schema.mjs";
import { seriesSchema } from "../schema/series.schema.mjs";
import { teamSchema } from "../schema/team.schema.mjs";
import { personSchema } from "../schema/person.schema.mjs";

const FM = /^---\n([\s\S]*?)\n---/;

const MEDIA_SOURCES = JSON.parse(readFileSync("data/media-sources.json", "utf8"));

// Extra checks for a game's curated media[]: file presence, source code in the
// registry (warning), at most one cover. Returns { errors[], warnings[] }.
function checkMedia(id, media = []) {
  const errors = [];
  const warnings = [];
  let covers = 0;
  for (const m of media) {
    const p = join("public/media/games", id, m.src);
    if (!existsSync(p)) errors.push(`media ${m.src}: 檔案不存在 (${p})`);
    if (m.cover) covers++;
    if (m.source && !(m.source in MEDIA_SOURCES)) warnings.push(`media ${m.src}: 來源碼 "${m.source}" 未登錄於 media-sources.json`);
  }
  if (covers > 1) errors.push(`media: 有 ${covers} 張標記 cover，至多一張`);
  return { errors, warnings };
}

// games carry an `id` field (checked for uniqueness); companies/series use the
// filename as id (unique on disk by definition), so only schema-validate them.
const COLLECTIONS = [
  { dir: "content/games", schema: gameSchema, checkId: true },
  { dir: "content/companies", schema: companySchema, checkId: false },
  { dir: "content/series", schema: seriesSchema, checkId: false },
  { dir: "content/teams", schema: teamSchema, checkId: false },
  { dir: "content/people", schema: personSchema, checkId: false },
];

let failed = 0;

for (const { dir, schema, checkId } of COLLECTIONS) {
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  let ok = 0;
  const errors = [];
  const warnings = [];
  const ids = new Set();

  for (const f of files) {
    const text = readFileSync(join(dir, f), "utf8");
    const m = text.match(FM);
    if (!m) {
      errors.push({ f, issue: "no frontmatter" });
      continue;
    }
    const data = yaml.load(m[1]);
    if (checkId) {
      if (ids.has(data?.id)) errors.push({ f, issue: `duplicate id ${data.id}` });
      ids.add(data?.id);
    }
    const r = schema.safeParse(data);
    if (r.success) {
      ok++;
      if (checkId && data.media?.length) {
        const mc = checkMedia(data.id, data.media);
        for (const e of mc.errors) errors.push({ f, issue: e });
        for (const w of mc.warnings) warnings.push({ f, issue: w });
      }
    } else {
      errors.push({ f, issue: r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") });
    }
  }

  const idNote = checkId ? `  unique ids: ${ids.size}` : "";
  const warnNote = warnings.length ? `  warnings: ${warnings.length}` : "";
  console.log(`${dir}  files: ${files.length}  valid: ${ok}  errors: ${errors.length}${idNote}${warnNote}`);
  for (const e of errors.slice(0, 15)) console.log(`  ✗ ${e.f}: ${e.issue}`);
  for (const w of warnings.slice(0, 15)) console.log(`  ⚠ ${w.f}: ${w.issue}`);
  failed += errors.length;
}

process.exit(failed ? 1 : 0);
