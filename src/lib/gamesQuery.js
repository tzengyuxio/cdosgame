export const NONE = '未分類';

const PUNCT = /[\s\-_:：·・／/、，,.。！？!?'"""()（）[\]【】~～]+/g;

export function normalize(s) {
  return (s || '').toLowerCase().replace(PUNCT, '');
}

export function searchGames(games, query) {
  const q = normalize(query);
  if (!q) return games;
  return games.filter(g =>
    normalize(g.title_zh).includes(q) ||
    (g.title_aliases || []).some(a => normalize(a).includes(q))
  );
}

export function decadeOf(year) {
  if (!year) return null;
  return `${Math.floor(year / 10) * 10}s`;
}

// Decades to break out into individual years in the 年代 facet, because the
// bucket is so large that "1990s" alone is barely a filter. Other decades stay
// as a single bucket. decadeOf() (homepage / /decades pages) is unaffected.
export const EXPAND_DECADES = new Set(['1990s']);

// Facet bucket for a year: an individual year (string) inside an expanded
// decade, else the decade. parseInt() of either form yields the year/decade
// start, so chronological sorting in deriveFacets keeps working.
export function decadeFacetOf(year) {
  if (!year) return null;
  const d = decadeOf(year);
  return EXPAND_DECADES.has(d) ? String(year) : d;
}

export function vendorsOf(g) {
  const v = [];
  if (g.developer) v.push(g.developer);
  for (const p of (g.publisher_tw || [])) v.push(p);
  return v;
}

function facetValues(g, facet) {
  if (facet === 'decade') { const d = decadeFacetOf(g.year); return d ? [d] : [NONE]; }
  if (facet === 'genre') return g.genre ? [g.genre] : [NONE];
  if (facet === 'loc') return g.localization_level ? [g.localization_level] : [NONE];
  if (facet === 'vendor') { const v = vendorsOf(g); return v.length ? v : [NONE]; }
  return [];
}

export function applyFacets(games, selected) {
  return games.filter(g =>
    Object.entries(selected).every(([facet, vals]) =>
      !vals || vals.length === 0 || facetValues(g, facet).some(v => vals.includes(v))
    )
  );
}

export function sortGames(games, key, dir = 'asc') {
  const sign = dir === 'desc' ? -1 : 1;
  const cmp = {
    year: (a, b) => (a.year ?? Infinity) - (b.year ?? Infinity),
    title: (a, b) => a.title_zh.localeCompare(b.title_zh, 'zh-Hant'),
    vendor: (a, b) => (vendorsOf(a)[0] || '').localeCompare(vendorsOf(b)[0] || '', 'zh-Hant'),
  }[key] || (() => 0);
  return [...games].sort((a, b) => sign * cmp(a, b));
}

export function paginate(games, page, size = 50) {
  const total = games.length;
  const pages = Math.max(1, Math.ceil(total / size));
  const p = Math.min(Math.max(1, page || 1), pages);
  return { items: games.slice((p - 1) * size, p * size), total, pages, page: p };
}

export function deriveFacets(games) {
  const acc = { decade: new Map(), genre: new Map(), vendor: new Map(), loc: new Map() };
  const bump = (m, k) => m.set(k, (m.get(k) || 0) + 1);
  for (const g of games) {
    bump(acc.decade, decadeFacetOf(g.year) || NONE);
    bump(acc.genre, g.genre || NONE);
    bump(acc.loc, g.localization_level || NONE);
    const vs = vendorsOf(g);
    if (vs.length) for (const v of new Set(vs)) bump(acc.vendor, v);
    else bump(acc.vendor, NONE);
  }
  const byCount = m => [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
  // 年代 lists chronologically (1980s → 1990s → …) with 未分類 last — a time
  // axis reads better in order than ranked by count; other facets stay by count.
  const byDecade = m => [...m.entries()]
    .sort((a, b) => (a[0] === NONE) - (b[0] === NONE) || parseInt(a[0]) - parseInt(b[0]))
    .map(([value, count]) => ({ value, count }));
  return { decade: byDecade(acc.decade), genre: byCount(acc.genre), loc: byCount(acc.loc), vendor: byCount(acc.vendor) };
}

export function toIndexRecord(d) {
  return {
    id: d.id,
    title_zh: d.title_zh,
    title_aliases: d.title_aliases || [],
    year: d.year ?? null,
    developer: d.developer ?? null,
    publisher_tw: d.publisher_tw || [],
    genre: d.genre ?? null,
    localization_level: d.localization_level ?? null,
  };
}

export function seriesOf(g) {
  return g.series || null;
}

export function groupBy(games, keyFn) {
  const m = new Map();
  for (const g of games) {
    for (const k of new Set([].concat(keyFn(g)))) {
      if (k == null || k === '') continue;
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(g);
    }
  }
  return m;
}

export function distinctValues(games, keyFn) {
  const m = new Map();
  for (const g of games) {
    for (const k of new Set([].concat(keyFn(g)))) {
      if (k == null || k === '') continue;
      m.set(k, (m.get(k) || 0) + 1);
    }
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
}

export function yearRange(games) {
  const ys = games.map(g => g.year).filter(y => y != null);
  return ys.length ? { min: Math.min(...ys), max: Math.max(...ys) } : null;
}

export function topValue(games, keyFn) {
  const dv = distinctValues(games, keyFn);
  return dv.length ? dv[0].value : null;
}

// FNV-1a string hash → stable 32-bit int, for deterministic per-page ordering.
function hashStr(s) {
  let x = 2166136261;
  for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); }
  return x >>> 0;
}

// Spread candidates by a hash seeded on the current game's id. The collection
// is id-ascending, so a plain slice(0,N) always surfaces the lowest-id games —
// they end up over-represented across every page's "related" lists. Seeding on
// the current id gives each page a different but build-stable sample.
function spread(items, seed) {
  return [...items].sort((a, b) => hashStr(seed + '|' + a.id) - hashStr(seed + '|' + b.id));
}

export function relatedFor(game, all, limit = 6) {
  const cut = a => a.slice(0, limit);
  // series: chronological — a series reads naturally oldest-to-newest.
  const sameSeries = game.series
    ? all.filter(g => g.id !== game.id && g.series === game.series)
         .sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999))
    : [];
  // Taiwan-catalog oriented "other works" blocks: when the developer is a
  // Taiwan studio, show only its block (even if a TW publisher also exists) —
  // its own catalogue is the relevant grouping. Only when the developer is
  // foreign (e.g. a Japanese original) do we fall back to the TW publisher(s).
  const relVendors = (game.developer && game.developer_region === 'TW')
    ? [game.developer]
    : (game.publisher_tw || []);
  const byVendor = [...new Set(relVendors)]
    .map(vendor => ({ vendor, games: cut(spread(all.filter(g => g.id !== game.id && vendorsOf(g).includes(vendor)), game.id)) }))
    .filter(v => v.games.length > 0);
  // "same year" intentionally dropped: it appeared on ~94% of pages (almost
  // every game has a year) yet a shared release year is a weak relationship —
  // it crowded out the body for little value. Browse-by-year stays reachable
  // via the infobox 發行年 link.
  return { sameSeries: cut(sameSeries), byVendor };
}
