import strokes from '../data/stroke-counts.json';

// Stroke-aware collator: orders CJK by stroke, Latin alphabetically. Used to
// sort items within each section. Falls back gracefully if ICU lacks the
// 'stroke' collation.
let coll;
try { coll = new Intl.Collator('zh-Hant-u-co-stroke', { numeric: true }); }
catch { coll = new Intl.Collator('zh-Hant'); }

const firstChar = s => [...String(s ?? '')][0] || '';

// Group items into an ordered list of sections for an A–Z / 筆畫 index.
// keyFn(item) -> display name whose first char decides the bucket:
//   - A–Z  : Latin initial (upper-cased)
//   - 0–9  : digit initial → bucket '0–9'
//   - 漢字  : by stroke count of first char (from stroke-counts.json) → 'N 劃'
//   - 其他  : first char not covered above (or stroke unknown)
// Order: A…Z, 0–9, then 1 劃…N 劃, then 其他. Items within a section are
// stroke/alpha sorted. Returns [{ label, items }].
export function groupByInitial(items, keyFn = x => x.value ?? x.name) {
  const buckets = new Map();   // key -> { sort, label, items }
  const put = (key, sort, label, item) => {
    let b = buckets.get(key);
    if (!b) buckets.set(key, (b = { sort, label, items: [] }));
    b.items.push(item);
  };
  for (const it of items) {
    const ch = firstChar(keyFn(it));
    if (/[A-Za-z]/.test(ch)) { const L = ch.toUpperCase(); put('a:' + L, [0, L], L, it); }
    else if (/[0-9]/.test(ch)) put('a:#', [1, ''], '0–9', it);
    else if (strokes[ch] != null) { const s = strokes[ch]; put('s:' + s, [2, s], `${s} 劃`, it); }
    else put('z:other', [3, ''], '其他', it);
  }
  return [...buckets.values()]
    .sort((a, b) => a.sort[0] - b.sort[0] || (a.sort[1] > b.sort[1] ? 1 : a.sort[1] < b.sort[1] ? -1 : 0))
    .map(b => ({ label: b.label, items: b.items.sort((x, y) => coll.compare(keyFn(x), keyFn(y))) }));
}
