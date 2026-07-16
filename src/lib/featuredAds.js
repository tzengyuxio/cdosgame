export function pickFeaturedAds(groups = [], limit = 16, random = Math.random) {
  const shuffled = groups.filter(group => group.ads?.length).slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.max(0, limit)).map(group => {
    const { ads, ...game } = group;
    return { ...game, ...ads[Math.floor(random() * ads.length)] };
  });
}
