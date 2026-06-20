import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalize, searchGames, decadeOf, vendorsOf, applyFacets,
  sortGames, paginate, deriveFacets, toIndexRecord, NONE,
  seriesOf, groupBy, relatedFor, distinctValues,
  yearRange, topValue,
} from './gamesQuery.js';

const G = [
  { id:'cdg-1', title_zh:'仙劍奇俠傳1', title_aliases:['Chinese Paladin','仙剑奇侠传'], year:1995, developer:'大宇', publisher_tw:['大宇'], genre:'RPG', localization_level:'A' },
  { id:'cdg-2', title_zh:'三國志2', title_aliases:[], year:1991, developer:'KOEI', publisher_tw:['智冠'], genre:'SLG', localization_level:'B' },
  { id:'cdg-3', title_zh:'某遊戲', title_aliases:[], year:null, developer:null, publisher_tw:[], genre:null, localization_level:null },
];

test('normalize strips punctuation and case', () => {
  assert.equal(normalize('A-B C：D'), 'abcd');
});

test('searchGames matches title, english + simplified alias, empty=all', () => {
  assert.equal(searchGames(G, '仙劍').length, 1);
  assert.equal(searchGames(G, 'paladin').length, 1);
  assert.equal(searchGames(G, '仙剑').length, 1);
  assert.equal(searchGames(G, '').length, 3);
});

test('decadeOf', () => {
  assert.equal(decadeOf(1995), '1990s');
  assert.equal(decadeOf(2003), '2000s');
  assert.equal(decadeOf(null), null);
});

test('vendorsOf merges developer + publisher_tw', () => {
  assert.deepEqual(vendorsOf(G[1]), ['KOEI', '智冠']);
});

test('applyFacets: AND across facets, OR within, 未分類 bucket', () => {
  assert.equal(applyFacets(G, { genre:['RPG'] }).length, 1);
  assert.equal(applyFacets(G, { genre:['RPG','SLG'] }).length, 2);
  assert.equal(applyFacets(G, { vendor:['智冠'] }).length, 1);
  assert.equal(applyFacets(G, { genre:[NONE] }).length, 1);
  assert.equal(applyFacets(G, { genre:['RPG'], loc:['B'] }).length, 0);
});

test('sortGames year asc puts null last, desc reverses', () => {
  assert.deepEqual(sortGames(G,'year','asc').map(g=>g.id), ['cdg-2','cdg-1','cdg-3']);
  assert.deepEqual(sortGames(G,'year','desc').map(g=>g.id), ['cdg-3','cdg-1','cdg-2']);
});

test('paginate', () => {
  const r = paginate(G, 1, 2);
  assert.equal(r.items.length, 2);
  assert.equal(r.pages, 2);
  assert.equal(r.total, 3);
});

test('deriveFacets counts incl 未分類', () => {
  const f = deriveFacets(G);
  const genre = Object.fromEntries(f.genre.map(o => [o.value, o.count]));
  assert.equal(genre['RPG'], 1);
  assert.equal(genre[NONE], 1);
});

test('toIndexRecord keeps only index fields', () => {
  const r = toIndexRecord(G[0]);
  assert.deepEqual(
    Object.keys(r).sort(),
    ['developer','genre','id','localization_level','publisher_tw','title_aliases','title_zh','year']
  );
});

const H = [
  { id:'a', title_zh:'仙劍1', year:1995, developer:'大宇', publisher_tw:['大宇'], genre:'即時角色扮演', series:'仙劍奇俠傳' },
  { id:'b', title_zh:'仙劍2', year:2002, developer:'大宇', publisher_tw:[], genre:'即時角色扮演', series:'仙劍奇俠傳' },
  { id:'c', title_zh:'三國志2', year:1995, developer:'KOEI', publisher_tw:['智冠'], genre:'計策戰略', series:null },
];

test('seriesOf', () => {
  assert.equal(seriesOf(H[0]), '仙劍奇俠傳');
  assert.equal(seriesOf(H[2]), null);
});

test('groupBy scalar and array keyFn', () => {
  const byGenre = groupBy(H, g => g.genre);
  assert.equal(byGenre.get('即時角色扮演').length, 2);
  const byVendor = groupBy(H, vendorsOf);   // array keyFn
  assert.equal(byVendor.get('大宇').length, 2);
  assert.equal(byVendor.get('智冠').length, 1);
});

test('distinctValues counts, sorted desc, skips null', () => {
  const dv = distinctValues(H, g => g.genre);
  assert.deepEqual(dv[0], { value: '即時角色扮演', count: 2 });
  assert.equal(dv.find(d => d.value === '計策戰略').count, 1);
});

test('distinctValues dedups per game (vendorsOf dev==pub not double-counted)', () => {
  const dv = distinctValues(H, vendorsOf);   // H[0] is dev 大宇 AND publisher 大宇
  assert.equal(dv.find(d => d.value === '大宇').count, 2);   // games a,b — not 3
});

test('relatedFor: same series/company/year, excludes self, caps', () => {
  const r = relatedFor(H[0], H);
  assert.deepEqual(r.sameSeries.map(g => g.id), ['b']);       // 仙劍2
  assert.deepEqual(r.byVendor.map(v => v.vendor), ['大宇']);  // one block per vendor
  assert.deepEqual(r.byVendor[0].games.map(g => g.id), ['b']); // 大宇's other game
  assert.deepEqual(r.sameYear.map(g => g.id), ['c']);         // 1995
  assert.ok(!r.sameSeries.some(g => g.id === 'a'));           // no self
});

test('relatedFor byVendor: foreign developer excluded, TW publisher kept', () => {
  const F = [
    { id:'x', developer:'姬屋', developer_region:'JP', publisher_tw:['天堂鳥'], year:1995, series:null },
    { id:'y', developer:'姬屋', developer_region:'JP', publisher_tw:['天堂鳥'], year:1996, series:null },
  ];
  const r = relatedFor(F[0], F);
  assert.deepEqual(r.byVendor.map(v => v.vendor), ['天堂鳥']);   // not 姬屋 (foreign dev)
  assert.deepEqual(r.byVendor[0].games.map(g => g.id), ['y']);
});

test('yearRange', () => {
  assert.deepEqual(yearRange(H), { min: 1995, max: 2002 });
  assert.equal(yearRange([{ year: null }]), null);
});

test('topValue returns most common', () => {
  assert.equal(topValue(H, g => g.developer), '大宇');   // a,b 大宇 vs c KOEI
});
