export const NONE = '未分類';

// localization_level facet display order: a meaning axis (most→least Chinese),
// not ranked by count. 未分類 (and any unknown value) sorts last.
export const LOC_ORDER = ['native', 'localized', 'packaging', 'foreign'];
const locRank = v => { const i = LOC_ORDER.indexOf(v); return i === -1 ? LOC_ORDER.length + 1 : i; };

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

export function vendorsOf(g) {
  const v = [];
  if (g.developer) v.push(g.developer);
  for (const p of (g.publisher_tw || [])) v.push(p);
  return v;
}

function facetValues(g, facet) {
  // decade facet is two-level: a game belongs to both its decade ("1990s") and
  // its exact year ("1995"), so selecting either the decade or a single year matches.
  if (facet === 'decade') { return g.year ? [decadeOf(g.year), String(g.year)] : [NONE]; }
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
  const acc = { genre: new Map(), vendor: new Map(), loc: new Map() };
  const decadeCount = new Map();          // decade → count
  const yearCount = new Map();            // decade → Map(yearStr → count)
  const bump = (m, k) => m.set(k, (m.get(k) || 0) + 1);
  for (const g of games) {
    const d = decadeOf(g.year);
    if (d) {
      bump(decadeCount, d);
      if (!yearCount.has(d)) yearCount.set(d, new Map());
      bump(yearCount.get(d), String(g.year));
    } else {
      bump(decadeCount, NONE);
    }
    bump(acc.genre, g.genre || NONE);
    bump(acc.loc, g.localization_level || NONE);
    const vs = vendorsOf(g);
    if (vs.length) for (const v of new Set(vs)) bump(acc.vendor, v);
    else bump(acc.vendor, NONE);
  }
  const byCount = m => [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
  // 在地化 lists in meaning order (原生→中文化→中文包裝→外文→未分類), not by count.
  const byLoc = m => [...m.entries()]
    .sort((a, b) => locRank(a[0]) - locRank(b[0]))
    .map(([value, count]) => ({ value, count }));
  // 年代 is two-level: decades chronologically (1980s → 1990s → …) with 未分類
  // last, each carrying its years (also chronological) for an expandable second
  // level. A time axis reads better in order than ranked by count.
  const decade = [...decadeCount.entries()]
    .sort((a, b) => (a[0] === NONE) - (b[0] === NONE) || parseInt(a[0]) - parseInt(b[0]))
    .map(([value, count]) => ({
      value,
      count,
      years: value === NONE ? [] : [...(yearCount.get(value) || new Map()).entries()]
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        .map(([y, c]) => ({ value: y, count: c })),
    }));
  return { decade, genre: byCount(acc.genre), loc: byLoc(acc.loc), vendor: byCount(acc.vendor) };
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

// Predicate for topic `list_games` auto-aggregation, single-sourced so the topic
// page (builds its list) and the game page (reverse "see also" link) stay in sync.
// A game matches when every filter present in `q` is satisfied (AND); tag filters
// the game's tags[], adaptation_* filter the adaptation object.
export function matchesListGames(g, q) {
  if (!q) return false;
  const hasFilter = q.tag || q.adaptation_author || q.adaptation_title || q.adaptation_medium;
  if (!hasFilter) return false;
  if (q.tag && !(g.tags || []).includes(q.tag)) return false;
  if (q.adaptation_author || q.adaptation_title || q.adaptation_medium) {
    if (!g.adaptation) return false;
    if (q.adaptation_author && g.adaptation.author !== q.adaptation_author) return false;
    if (q.adaptation_title && g.adaptation.title !== q.adaptation_title) return false;
    if (q.adaptation_medium && g.adaptation.medium !== q.adaptation_medium) return false;
  }
  return true;
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
