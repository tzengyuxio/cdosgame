export function normalizeUrlForDuplicateCheck(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  try {
    const url = new URL(raw);
    url.hash = '';
    const normalized = url.toString();
    return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
  } catch {
    const withoutHash = raw.split('#')[0];
    return withoutHash.endsWith('/') ? withoutHash.slice(0, -1) : withoutHash;
  }
}

export function extractGameLinks(game) {
  const links = [];
  const references = game.references || {};

  for (const key of ['omega', 'chiuinan']) {
    if (references[key]) {
      links.push({
        path: `references.${key}`,
        label: key,
        url: references[key],
      });
    }
  }

  for (const [key, value] of Object.entries(references.cited || {})) {
    const url = typeof value === 'string' ? value : value?.url;
    const label = typeof value === 'string' ? key : value?.label || key;
    if (url) {
      links.push({
        path: `references.cited.${key}`,
        label,
        url,
      });
    }
  }

  for (const [label, url] of Object.entries(game.external_links || {})) {
    if (url) {
      links.push({
        path: `external_links.${label}`,
        label,
        url,
      });
    }
  }

  return links;
}

export function findDuplicateGameLinks(games) {
  const duplicates = [];

  for (const game of games) {
    const byUrl = new Map();
    for (const link of extractGameLinks(game)) {
      const normalizedUrl = normalizeUrlForDuplicateCheck(link.url);
      if (!normalizedUrl) continue;
      if (!byUrl.has(normalizedUrl)) byUrl.set(normalizedUrl, []);
      byUrl.get(normalizedUrl).push(link);
    }

    for (const [normalizedUrl, occurrences] of byUrl.entries()) {
      if (occurrences.length < 2) continue;
      duplicates.push({
        gameId: game.id,
        title: game.title_zh,
        normalizedUrl,
        occurrences,
      });
    }
  }

  return duplicates;
}
