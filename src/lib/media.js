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
  'box-front': '包裝封面', 'box-back': '包裝背面', 'box-spine': '包裝側面', 'package': '包裝',
  'disc': '光碟', 'floppy': '磁片', 'manual-cover': '說明書封面', 'manual': '說明書內頁',
  'ad': '廣告', 'title': '標題畫面', 'screenshot': '遊戲畫面',
  'logo': '標誌', 'building': '辦公室', 'product': '產品', 'portrait': '人物照', 'photo': '照片',
  'other': '圖片',
};
export const kindLabel = k => KIND_LABELS[k] || k;

// Caption used in gallery cards / lightbox — user-set caption first, then kind label.
export const galleryCaption = m => m.caption || KIND_LABELS[m.kind] || m.kind;

// Caption used under the infobox cover (figcaption) and in cover lightbox.
// Always leads with the kind label (so the reader can tell what kind of image
// they're looking at, even when it's a fallback like title/manual-cover/ad);
// appends user caption with a separator when present.
export const coverFigcaption = m => {
  const label = KIND_LABELS[m.kind] || m.kind;
  return m.caption ? `${label}・${m.caption}` : label;
};

export const mediaUrl = (coll, slug, src) => withBase(`/media/${coll}/${slug}/${src}`);
export const thumbUrl = (coll, slug, src) => withBase(`/media/${coll}/${slug}/thumb/${src}`);

// Resolve a source code to { name, url }. Per-item source_url overrides the
// registry URL; unknown codes display as-is.
export function expandSource(code, sourceUrl) {
  const s = sources[code];
  return { name: (s && s.name) || code, url: sourceUrl || (s && s.url) || null };
}

// Cover for infobox / og:image. Resolution order:
//   1) explicit `cover: true` (respected even when `gallery: false`)
//   2) by kind priority across items NOT hidden by `gallery: false`:
//      box-front → title → manual-cover → logo → portrait → ad
// `kind` is the enum value; numbered variants (ad-01, manual-cover) all share
// the same kind, so this naturally picks the first ad / manual-cover.
// `ad` is last so a publisher's magazine ad doesn't beat a real logo/portrait.
const COVER_KIND_PRIORITY = ['box-front', 'title', 'manual-cover', 'logo', 'portrait', 'ad'];
export function coverOf(media = []) {
  if (!media.length) return null;
  const explicit = media.find(m => m.cover);
  if (explicit) return explicit;
  const visible = media.filter(m => m.gallery !== false);
  for (const kind of COVER_KIND_PRIORITY) {
    const hit = visible.find(m => m.kind === kind);
    if (hit) return hit;
  }
  return null;
}

// Decorate a media item with resolved URLs + source + gallery caption fallback.
export function decorate(m, coll, slug) {
  return {
    ...m,
    full: mediaUrl(coll, slug, m.src),
    thumb: thumbUrl(coll, slug, m.src),
    src_obj: expandSource(m.source, m.source_url),
    gallery_caption: galleryCaption(m),
  };
}

// Group already-decorated items (gallery !== false) by category. Within each
// category, sort by explicit `order`, then by the kind's position in the
// category's `kinds` array (so box-front beats box-back beats box-spine, and
// title beats screenshot), then by src filename as a stable tiebreaker.
export function groupDecorated(items = []) {
  const vis = items.filter(m => m.gallery !== false);
  return CATEGORIES
    .map(c => {
      const sortInCat = (a, b) =>
        (a.order ?? 1e9) - (b.order ?? 1e9)
        || c.kinds.indexOf(a.kind) - c.kinds.indexOf(b.kind)
        || String(a.src).localeCompare(String(b.src));
      return { label: c.label, items: vis.filter(m => c.kinds.includes(m.kind)).sort(sortInCat) };
    })
    .filter(g => g.items.length > 0);
}

export function galleryGroups(media = [], coll, slug) {
  return groupDecorated(media.map(m => decorate(m, coll, slug)));
}
