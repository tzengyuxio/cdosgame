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

export function vendorsOf(g) {
  const v = [];
  if (g.developer) v.push(g.developer);
  for (const p of (g.publisher_tw || [])) v.push(p);
  return v;
}

function facetValues(g, facet) {
  if (facet === 'decade') { const d = decadeOf(g.year); return d ? [d] : [NONE]; }
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
    bump(acc.decade, decadeOf(g.year) || NONE);
    bump(acc.genre, g.genre || NONE);
    bump(acc.loc, g.localization_level || NONE);
    const vs = vendorsOf(g);
    if (vs.length) for (const v of new Set(vs)) bump(acc.vendor, v);
    else bump(acc.vendor, NONE);
  }
  const toSorted = m => [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
  return { decade: toSorted(acc.decade), genre: toSorted(acc.genre), loc: toSorted(acc.loc), vendor: toSorted(acc.vendor) };
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

export function relatedFor(game, all, limit = 12) {
  const cut = a => a.slice(0, limit);
  const sameSeries = game.series
    ? all.filter(g => g.id !== game.id && g.series === game.series) : [];
  const comps = new Set(vendorsOf(game));
  const sameCompany = comps.size
    ? all.filter(g => g.id !== game.id && vendorsOf(g).some(v => comps.has(v))) : [];
  const sameYear = game.year
    ? all.filter(g => g.id !== game.id && g.year === game.year) : [];
  return { sameSeries: cut(sameSeries), sameCompany: cut(sameCompany), sameYear: cut(sameYear) };
}
