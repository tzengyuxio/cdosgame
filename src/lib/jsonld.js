// Schema.org JSON-LD builders for AEO (answer-engine optimization). Each builder
// returns a plain object; Base.astro renders it as <script type="application/ld+json">.
import { withBase, gameUrl, companyUrl, seriesUrl, personUrl, fandomUrl } from './links.js';
import { genreLabel } from './labels.js';

const clean = o => Object.fromEntries(
  Object.entries(o).filter(([, v]) => v != null && v !== '' && !(Array.isArray(v) && v.length === 0))
);
const abser = site => rel => site.replace(/\/$/, '') + rel;

// Keep only URLs that identify the same real-world entity elsewhere — these are
// what answer engines use to disambiguate (Wikipedia/Wikidata/MobyGames/…).
export const identityLinks = urls => [...new Set(
  (urls || []).filter(Boolean).filter(u =>
    /wikipedia\.org|wikidata\.org|mobygames\.com|bgm\.tv|bangumi\.tv|imdb\.com|fandom\.com|baike\.baidu\.com/i.test(u))
)];

export function breadcrumb(site, trail) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => clean({
      '@type': 'ListItem', position: i + 1, name: t.name, item: t.url,
    })),
  };
}

export function gameJsonLd(g, { site, url, description, dateModified }) {
  const abs = abser(site);
  const refUrls = [
    ...Object.values(g.references?.cited || {}),
    ...Object.values(g.external_links || {}),
    g.references?.fandom ? fandomUrl(g.references.fandom) : null,
  ];
  const platform = (g.platform_note && g.platform_note !== '無') ? g.platform_note : 'MS-DOS';
  return clean({
    '@context': 'https://schema.org', '@type': 'VideoGame',
    name: g.title_zh,
    alternateName: (g.title_aliases || []).filter(a => !/^[A-Z]\d/.test(a)),  // drop catalog codes like "G123-名"
    url, description,
    inLanguage: g.content_language || 'zh-Hant',
    datePublished: g.year ? String(g.year) : undefined,
    genre: genreLabel(g.genre) || undefined,
    gamePlatform: platform,
    author: g.developer ? { '@type': 'Organization', name: g.developer, url: abs(companyUrl(g.developer)) } : undefined,
    publisher: (g.publisher_tw || []).map(p => ({ '@type': 'Organization', name: p, url: abs(companyUrl(p)) })),
    isPartOf: g.series ? { '@type': 'CreativeWorkSeries', name: `${g.series}系列`, url: abs(seriesUrl(g.series)) } : undefined,
    sameAs: identityLinks(refUrls),
    dateModified,
  });
}

export function organizationJsonLd(c, name, { site, url, sameAs, dateModified }) {
  return clean({
    '@context': 'https://schema.org', '@type': 'Organization',
    name: c?.name_zh || name,
    alternateName: [c?.name_en, ...((c?.aliases) || [])].filter(Boolean),
    url,
    foundingDate: c?.founded ? String(c.founded) : undefined,
    dissolutionDate: c?.dissolved ? String(c.dissolved) : undefined,
    sameAs: identityLinks(sameAs),
    dateModified,
  });
}

export function personJsonLd(c, name, { url, sameAs, dateModified }) {
  return clean({
    '@context': 'https://schema.org', '@type': 'Person',
    name: c?.name_zh || name,
    alternateName: [c?.name_en, ...((c?.aliases) || [])].filter(Boolean),
    url,
    jobTitle: (c?.roles || []).join('、') || undefined,
    affiliation: (c?.affiliations || []).map(a => ({ '@type': 'Organization', name: a })),
    sameAs: identityLinks(sameAs),
    dateModified,
  });
}

export function seriesJsonLd(name, { url, description, dev, dateModified }) {
  return clean({
    '@context': 'https://schema.org', '@type': 'CreativeWorkSeries',
    name: `${name}系列`, url, description,
    publisher: dev ? { '@type': 'Organization', name: dev } : undefined,
    dateModified,
  });
}

export function websiteJsonLd({ site, description }) {
  const home = site.replace(/\/$/, '') + withBase('/');
  return {
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: '中文 DOS 遊戲資料庫', alternateName: 'cdosgame',
    url: home, inLanguage: 'zh-Hant', description,
  };
}

export function datasetJsonLd({ site, description, count, dateModified }) {
  const home = site.replace(/\/$/, '') + withBase('/');
  return clean({
    '@context': 'https://schema.org', '@type': 'Dataset',
    name: '中文 DOS 遊戲資料庫', description,
    url: home, inLanguage: 'zh-Hant',
    keywords: ['DOS 遊戲', '中文遊戲', '台灣遊戲史', '懷舊遊戲', 'abandonware'],
    creator: { '@type': 'Organization', name: '中文 DOS 遊戲資料庫' },
    isAccessibleForFree: true,
    measurementTechnique: '人工考據、多來源交叉驗證',
    variableMeasured: count ? `${count} 款已收錄遊戲` : undefined,
    dateModified,
  });
}
