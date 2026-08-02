// Sampling for the homepage media walls (ads, screenshots): shuffle the entries,
// take `limit` of them, then pick one image from each. Grouping by entry is the
// point — a game holding six ads must not swallow six tiles.
//
// A group is { id, t, items: [src, …] }; only the media filename travels, so the
// inline JSON payload stays small. Callers rebuild URLs with gameUrl/thumbUrl.
export function pickFeaturedMedia(groups = [], limit = 16, random = Math.random) {
  const shuffled = groups.filter(group => group.items?.length).slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.max(0, limit)).map(group => {
    const { items, ...game } = group;
    return { ...game, src: items[Math.floor(random() * items.length)] };
  });
}
