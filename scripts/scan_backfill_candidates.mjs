#!/usr/bin/env node
// scan_backfill_candidates.mjs — list unpublished Chinese titles that already
// have a chiuinan intro page, i.e. the best candidates for writing entries next.
//
// Criteria (all must hold):
//   published: false                      — not written up yet
//   localization_level ∈ {native, localized}  — in the core scope (中文遊戲)
//   references.chiuinan present           — an intro page exists, so there is
//                                           substance to research (a bare
//                                           catalog code gives you nothing)
//
// Writes derived/backfill-candidates.tsv, sorted by year then id. The TSV is the
// summary to review — the main line never needs to read the .md files.
//
// Usage: node scripts/scan_backfill_candidates.mjs

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const FM = /^---\n([\s\S]*?)\n---/;
const DIR = "content/games";
const OUT = "derived/backfill-candidates.tsv";

const games = fs.readdirSync(DIR)
  .filter(f => f.endsWith(".md"))
  .map(f => yaml.load(FM.exec(fs.readFileSync(path.join(DIR, f), "utf8"))[1]));

const rows = games
  .filter(g => !g.published
    && ["native", "localized"].includes(g.localization_level)
    && g.references?.chiuinan)
  .sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999) || a.id.localeCompare(b.id));

const tsv = [
  ["id", "title_zh", "year", "developer", "publisher_tw", "loc", "platform", "chiuinan_url"].join("\t"),
  ...rows.map(g => [
    g.id,
    g.title_zh,
    g.year ?? "",
    g.developer ?? "",
    (g.publisher_tw || []).join("/"),
    g.localization_level,
    g.platform_note ?? "",
    g.references.chiuinan,
  ].join("\t")),
].join("\n") + "\n";

fs.writeFileSync(OUT, tsv);

const tally = key => rows.reduce((m, g) => {
  const k = key(g) ?? "(null)";
  m[k] = (m[k] || 0) + 1;
  return m;
}, {});

console.log(`${OUT}: ${rows.length} 款`);
console.log("中文化程度:", tally(g => g.localization_level));
console.log("年代:", tally(g => (g.year ? `${Math.floor(g.year / 10) * 10}s` : null)));
