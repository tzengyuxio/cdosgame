import { execSync } from 'node:child_process';

// Build-time map of content file -> last commit date (ISO 8601), for JSON-LD
// `dateModified`. One `git log` pass, memoised. Requires full history at build
// (CI checkout must use fetch-depth: 0); degrades to empty map if git is
// unavailable (e.g. shallow clone, no repo) — then dateModified is simply omitted.
let cache;
function build() {
  const map = new Map();
  try {
    const out = execSync("git log --no-renames --format='C:%cI' --name-only -- content", {
      encoding: 'utf8', maxBuffer: 128 * 1024 * 1024,
    });
    let cur = null;
    for (const line of out.split('\n')) {
      if (line.startsWith('C:')) cur = line.slice(2).trim();
      else if (line && cur && !map.has(line)) map.set(line, cur);  // newest-first → first wins
    }
  } catch { /* no git / shallow clone → empty */ }
  return map;
}
const data = () => (cache ??= build());

export const lastModified = relPath => data().get(relPath);
export const latestModified = () => {
  let m;
  for (const v of data().values()) if (!m || v > m) m = v;
  return m;
};
