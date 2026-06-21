// Helpers for the curated media library (see docs/media.md). Works for any
// collection: games / companies / people. Paths are /media/<coll>/<slug>/<src>.
import { withBase } from './links.js';
import sources from '../../data/media-sources.json';

// Gallery categories (kind → grouped, ordered display). Covers all collections'
// kinds; only the kinds an entity actually has will show.
export const CATEGORIES = [
  { label: '盒裝', kinds: ['box-front', 'box-back', 'box-spine', 'package'] },
  { label: '光碟／磁片', kinds: ['disc', 'floppy'] },
  { label: '說明書', kinds: ['manual-cover', 'manual'] },
  { label: '廣告', kinds: ['ad'] },
  { label: '截圖', kinds: ['title', 'screenshot'] },
  { label: '標誌', kinds: ['logo'] },
  { label: '產品', kinds: ['product'] },
  { label: '照片', kinds: ['portrait', 'photo', 'building'] },
  { label: '其他', kinds: ['other'] },
];

export const KIND_LABELS = {
  'box-front': '封面', 'box-back': '封底', 'box-spine': '側標', 'package': '包裝',
  'disc': '光碟', 'floppy': '磁片', 'manual-cover': '說明書封面', 'manual': '說明書內頁',
  'ad': '廣告', 'title': '標題畫面', 'screenshot': '遊戲畫面',
  'logo': '標誌', 'building': '辦公室', 'product': '產品', 'portrait': '人物照', 'photo': '照片',
  'other': '圖片',
};
export const kindLabel = k => KIND_LABELS[k] || k;

export const mediaUrl = (coll, slug, src) => withBase(`/media/${coll}/${slug}/${src}`);
export const thumbUrl = (coll, slug, src) => withBase(`/media/${coll}/${slug}/thumb/${src}`);

// Resolve a source code to { name, url }. Per-item source_url overrides the
// registry URL; unknown codes display as-is.
export function expandSource(code, sourceUrl) {
  const s = sources[code];
  return { name: (s && s.name) || code, url: sourceUrl || (s && s.url) || null };
}

// Cover for infobox / og:image: explicit cover:true → first box-front/logo/portrait.
// No generic fallback — an ad/screenshot/manual shouldn't auto-become the cover.
export function coverOf(media = []) {
  return media.find(m => m.cover)
    || media.find(m => ['box-front', 'logo', 'portrait'].includes(m.kind))
    || null;
}

const bySort = (a, b) => (a.order ?? 1e9) - (b.order ?? 1e9) || String(a.src).localeCompare(String(b.src));

// Decorate a media item with resolved URLs + source for rendering.
export function decorate(m, coll, slug) {
  return { ...m, full: mediaUrl(coll, slug, m.src), thumb: thumbUrl(coll, slug, m.src), src_obj: expandSource(m.source, m.source_url) };
}

// Group already-decorated items (gallery !== false) by category. Use this when
// merging media from multiple owners (e.g. a game's own media + publisher ads).
export function groupDecorated(items = []) {
  const vis = items.filter(m => m.gallery !== false);
  return CATEGORIES
    .map(c => ({ label: c.label, items: vis.filter(m => c.kinds.includes(m.kind)).sort(bySort) }))
    .filter(g => g.items.length > 0);
}

export function galleryGroups(media = [], coll, slug) {
  return groupDecorated(media.map(m => decorate(m, coll, slug)));
}
