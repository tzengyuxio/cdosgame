// Helpers for the curated media library (see docs/media.md).
import { withBase } from './links.js';
import sources from '../../data/media-sources.json';

// Gallery categories (kind → grouped, ordered display). Order here = display order.
export const CATEGORIES = [
  { key: 'box', label: '盒裝', kinds: ['box-front', 'box-back', 'box-spine', 'package'] },
  { key: 'disc', label: '光碟／磁片', kinds: ['disc', 'floppy'] },
  { key: 'manual', label: '說明書', kinds: ['manual-cover', 'manual'] },
  { key: 'ad', label: '廣告', kinds: ['ad'] },
  { key: 'screenshot', label: '截圖', kinds: ['title', 'screenshot'] },
  { key: 'other', label: '其他', kinds: ['other'] },
];

// kind → display label (cover caption fallback)
export const KIND_LABELS = {
  'box-front': '封面', 'box-back': '封底', 'box-spine': '側標', 'package': '包裝',
  'disc': '光碟', 'floppy': '磁片', 'manual-cover': '說明書封面', 'manual': '說明書內頁',
  'ad': '廣告', 'title': '標題畫面', 'screenshot': '遊戲畫面', 'other': '圖片',
};
export const kindLabel = k => KIND_LABELS[k] || k;

export const mediaUrl = (id, src) => withBase(`/media/games/${id}/${src}`);
export const thumbUrl = (id, src) => withBase(`/media/games/${id}/thumb/${src}`);

// Resolve a source code to { name, url }. Per-item source_url overrides the
// registry URL; unknown codes display as-is.
export function expandSource(code, sourceUrl) {
  const s = sources[code];
  return { name: (s && s.name) || code, url: sourceUrl || (s && s.url) || null };
}

// Cover for infobox / og:image: explicit cover:true → first box-front → first.
export function coverOf(media = []) {
  return media.find(m => m.cover) || media.find(m => m.kind === 'box-front') || media[0] || null;
}

export function heroOf(media = []) {
  return media.find(m => m.slot === 'hero') || null;
}

const bySort = (a, b) => (a.order ?? 1e9) - (b.order ?? 1e9) || String(a.src).localeCompare(String(b.src));

// Decorate a media item with resolved URLs + source for rendering.
export function decorate(m, id) {
  return { ...m, full: mediaUrl(id, m.src), thumb: thumbUrl(id, m.src), src_obj: expandSource(m.source, m.source_url) };
}

// Grouped gallery: items with gallery !== false, by category, non-empty groups.
export function galleryGroups(media = [], id) {
  const items = media.filter(m => m.gallery !== false).map(m => decorate(m, id));
  return CATEGORIES
    .map(c => ({ label: c.label, items: items.filter(m => c.kinds.includes(m.kind)).sort(bySort) }))
    .filter(g => g.items.length > 0);
}
