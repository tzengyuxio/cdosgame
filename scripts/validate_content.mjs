// Validate every content/games/*.md frontmatter against the Zod schema.
// Usage: npm run validate
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { gameSchema } from "../schema/game.schema.mjs";

const DIR = "content/games";
const FM = /^---\n([\s\S]*?)\n---/;

const files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
let ok = 0;
const errors = [];
const ids = new Set();

for (const f of files) {
  const text = readFileSync(join(DIR, f), "utf8");
  const m = text.match(FM);
  if (!m) {
    errors.push({ f, issue: "no frontmatter" });
    continue;
  }
  const data = yaml.load(m[1]);
  if (ids.has(data?.id)) errors.push({ f, issue: `duplicate id ${data.id}` });
  ids.add(data?.id);
  const r = gameSchema.safeParse(data);
  if (r.success) ok++;
  else errors.push({ f, issue: r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") });
}

console.log(`files: ${files.length}  valid: ${ok}  errors: ${errors.length}  unique ids: ${ids.size}`);
for (const e of errors.slice(0, 15)) console.log(`  ✗ ${e.f}: ${e.issue}`);
process.exit(errors.length ? 1 : 0);
