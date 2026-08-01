// Validate every content/*/*.md frontmatter against its Zod schema.
// Usage: npm run validate   (covers games, companies, series)
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import yaml from "js-yaml";
import { gameSchema } from "../schema/game.schema.mjs";
import { companySchema } from "../schema/company.schema.mjs";
import { seriesSchema } from "../schema/series.schema.mjs";
import { teamSchema } from "../schema/team.schema.mjs";
import { personSchema } from "../schema/person.schema.mjs";
import { topicSchema } from "../schema/topic.schema.mjs";

const FM = /^---\n([\s\S]*?)\n---/;

const MEDIA_SOURCES = JSON.parse(readFileSync("data/media-sources.json", "utf8"));

// Extra checks for curated media[]: file presence under public/media/<coll>/<slug>/,
// source code in the registry (warning), at most one cover. Returns { errors[], warnings[] }.
function checkMedia(coll, slug, media = []) {
  const errors = [];
  const warnings = [];
  let covers = 0;
  for (const m of media) {
    const p = join("public/media", coll, slug, m.src);
    if (!existsSync(p)) errors.push(`media ${m.src}: 檔案不存在 (${p})`);
    if (m.cover) covers++;
    if (m.source && !(m.source in MEDIA_SOURCES)) warnings.push(`media ${m.src}: 來源碼 "${m.source}" 未登錄於 media-sources.json`);
  }
  if (covers > 1) errors.push(`media: 有 ${covers} 張標記 cover，至多一張`);
  return { errors, warnings };
}

// 連結文字規範（docs/refs-convention.md「連結文字」）：references 的 general 來源
// 中，chiuinan/fandom/omega 用固定 label，其餘來源 key 須帶頁面標題（{url, title}）。
// 只給 URL 字串的會在渲染時 fallback 成站名/key，違反規範——警告而非報錯。
const RESERVED_REF_KEYS = new Set(["chiuinan", "fandom", "omega", "cited"]);
function checkRefLabels(references = {}) {
  const warnings = [];
  for (const [k, v] of Object.entries(references)) {
    if (RESERVED_REF_KEYS.has(k)) continue;
    if (typeof v === "string") warnings.push(`references.${k}: 只有 URL、缺 title，連結文字會 fallback 成站名/key；應改 { url, title }`);
  }
  return warnings;
}

// 正文的 <sup class="cite" data-ref="KEY"> 必須指得到某個來源，否則渲染成 href="#"
// 的死連結（見 docs/refs-convention.md）。可指的目標：references.cited 的 key、
// keyed footnote 的 key，以及 general 來源本身的 key（chiuinan/fandom/wikipedia…）。
const CITE_RE = /<sup class="cite" data-ref="([^"]+)"/g;
// 雜誌來源的 key ＝ <刊名縮寫><期號>[<語意後綴>]；縮寫表見 docs/refs-convention.md。
const MAGAZINE_CODES = ["ace", "swm", "sgm", "cgw"];
const MAGAZINE_KEY_RE = new RegExp(`^(${MAGAZINE_CODES.join("|")})(\\d{1,3}(-\\d{1,3})?)([a-z]+\\d*)?$`);

function citeKeys(data) {
  const keys = new Set();
  for (const [k, v] of Object.entries(data.references || {})) {
    if (k === "cited") for (const ck of Object.keys(v || {})) keys.add(ck);
    else keys.add(k);
  }
  // entity collections keep references as an array of {url, title, key?}
  if (Array.isArray(data.references)) for (const r of data.references) if (r.key) keys.add(r.key);
  for (const fn of data.footnotes || []) if (typeof fn === "object" && fn.key) keys.add(fn.key);
  return keys;
}

function checkCites(body, data) {
  const errors = [];
  const warnings = [];
  const known = citeKeys(data);
  const used = new Set([...body.matchAll(CITE_RE)].map((m) => m[1]));
  for (const key of used) {
    if (!known.has(key)) errors.push(`cite data-ref="${key}" 指不到任何來源（會渲染成死連結）`);
    // catch self-invented magazine abbreviations (sw/swf/pcgamer…) before they spread
    else if (/^(sw|swf|pcgamer|softworld_mag)\d*$/.test(key)) warnings.push(`cite key "${key}" 疑似自創刊名縮寫；見 docs/refs-convention.md 對照表`);
    else if (MAGAZINE_CODES.some((c) => key.startsWith(c)) && !MAGAZINE_KEY_RE.test(key)) warnings.push(`cite key "${key}" 不符雜誌 key 格式 <縮寫><期號>[<後綴>]`);
  }
  return { errors, warnings };
}

// platform_note 受控詞彙（規範見 schema.md「platform_note」）：canonical token 以
// 頓號「、」連接（token 內部可含「/」如 DOS/V）。未知 token 出警告（非報錯），
// 避免 Win31/Windows95/typo 等再漂。
const PLATFORM_TOKENS = new Set(["DOS", "DOS/V", "Apple II", "Win3.1", "Win9x", "WinXP", "Win64", "Windows", "Sega Saturn", "PlayStation"]);
function checkPlatform(note) {
  if (note == null || note === "") return [];
  const bad = note.split("、").map((t) => t.trim()).filter((t) => !PLATFORM_TOKENS.has(t));
  return bad.length ? [`platform_note: 非受控 token「${bad.join("、")}」（值「${note}」）；見 schema.md 平台詞彙`] : [];
}

// games carry an `id` field (checked for uniqueness); companies/series use the
// filename as id (unique on disk by definition), so only schema-validate them.
const COLLECTIONS = [
  { dir: "content/games", schema: gameSchema, checkId: true, coll: "games" },
  { dir: "content/companies", schema: companySchema, checkId: false, coll: "companies" },
  { dir: "content/series", schema: seriesSchema, checkId: false },
  { dir: "content/teams", schema: teamSchema, checkId: false, coll: "teams" },
  { dir: "content/people", schema: personSchema, checkId: false, coll: "people" },
  { dir: "content/topics", schema: topicSchema, checkId: false },
];

let failed = 0;

for (const { dir, schema, checkId, coll } of COLLECTIONS) {
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
      if (coll && data.media?.length) {
        const slug = checkId ? data.id : basename(f, ".md");
        const mc = checkMedia(coll, slug, data.media);
        for (const e of mc.errors) errors.push({ f, issue: e });
        for (const w of mc.warnings) warnings.push({ f, issue: w });
      }
      if (coll === "games" && data.references) {
        for (const w of checkRefLabels(data.references)) warnings.push({ f, issue: w });
      }
      if (coll === "games") {
        for (const w of checkPlatform(data.platform_note)) warnings.push({ f, issue: w });
      }
      const cc = checkCites(text.slice(m[0].length), data);
      for (const e of cc.errors) errors.push({ f, issue: e });
      for (const w of cc.warnings) warnings.push({ f, issue: w });
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
