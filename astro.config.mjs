import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

// GitHub Pages project site: served under https://tzengyuxio.github.io/cdosgame/
const BASE = '/cdosgame';

// In a production build only published games get a detail page (see the
// `PROD ? data.published : true` gate in the routes). Entity bodies — e.g. a
// company's product-catalogue table — routinely link games that don't have a
// page yet; in PROD those <a> are unwrapped to plain text so the static site
// ships no dangling hrefs. In dev every game is reachable, so nothing is
// stripped. Computed once from frontmatter at config load.
const PROD = process.env.NODE_ENV === 'production'
  || process.argv.includes('build')
  || process.env.npm_lifecycle_event === 'build';
const PUBLISHED_GAME_IDS = (() => {
  if (!PROD) return null;
  const dir = new URL('./content/games/', import.meta.url);
  const ids = new Set();
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const fm = (readFileSync(new URL(file, dir), 'utf8').match(/^---\n([\s\S]*?)\n---/) || [, ''])[1];
    const id = (fm.match(/^id:\s*(\S+)/m) || [])[1];
    if (id && /^published:\s*true\s*$/m.test(fm)) ids.add(id);
  }
  return ids;
})();

// Astro applies `base` to its own routing/assets, but does NOT rewrite absolute
// links written inside markdown bodies (e.g. [大宇](/companies/大宇)). This rehype
// plugin prefixes BASE onto absolute internal <a href> so content cross-links
// work under the project base (external links are left alone), and unwraps links
// to unpublished games in PROD (see above).
function rehypeBaseLinks() {
  const visit = (parent) => {
    const out = [];
    for (const node of parent.children || []) {
      if (node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
        const href = node.properties.href;
        const gm = href.match(/^\/games\/(cdg-\d+)$/);
        if (PUBLISHED_GAME_IDS && gm && !PUBLISHED_GAME_IDS.has(gm[1])) {
          visit(node);                       // base-prefix any nested links first
          out.push(...(node.children || [])); // unwrap: keep the link text only
          continue;
        }
        if (href.startsWith('/') && !href.startsWith('//')) node.properties.href = BASE + href;
        else if (/^https?:\/\//.test(href) || href.startsWith('//')) {
          // external link → open in a new tab
          node.properties.target = '_blank';
          node.properties.rel = 'noopener nofollow';
        }
      }
      visit(node);
      out.push(node);
    }
    parent.children = out;
  };
  return (tree) => visit(tree);
}

// Inline media embeds: a markdown image whose src is `media:<file>[#align]`
// (align = right|left|center, default right) becomes a floated <figure> pointing
// at public/media/games/<id>/<file>. The game id is read from the content file
// path. See docs/media.md §4.
function rehypeMedia() {
  return (tree, file) => {
    // derive collection + slug from the content file path (games/companies/people)
    const pm = String(file?.path || file?.history?.[0] || '').match(/content\/(games|companies|people)\/(.+?)\.md$/);
    const dir = pm ? `${BASE}/media/${pm[1]}/${pm[2]}` : null;
    const toFigure = (alt, src) => {
      const [name, align = 'right'] = src.slice('media:'.length).split('#');
      const href = dir ? `${dir}/${name}` : name;
      return {
        type: 'element', tagName: 'figure', properties: { className: ['fig', align] },
        children: [
          { type: 'element', tagName: 'img', properties: { className: ['fig-img'], src: href, alt, loading: 'lazy', dataFull: href, dataCaption: alt }, children: [] },
          ...(alt ? [{ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: alt }] }] : []),
        ],
      };
    };
    const visit = (node) => {
      for (const child of node.children || []) {
        if (child.tagName === 'img' && typeof child.properties?.src === 'string' && child.properties.src.startsWith('media:')) {
          const fig = toFigure(child.properties.alt || '', child.properties.src);
          const onlyChild = node.tagName === 'p'
            && node.children.filter(c => !(c.type === 'text' && !c.value.trim())).length === 1;
          Object.assign(onlyChild ? node : child, fig);  // unwrap <p><img></p>, else replace img
          continue;
        }
        visit(child);
      }
    };
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://tzengyuxio.github.io',
  base: BASE,
  // v1 has no images; use a no-op image service so the build does not require
  // the native `sharp` dependency.
  image: { service: passthroughImageService() },
  markdown: { rehypePlugins: [rehypeBaseLinks, rehypeMedia] },
  // 公司改名／別名的舊網址導向不在這裡設定：改由 companies/[name].astro 依精選表
  // src/lib/company-aliases.js 生成「即時 client redirect + 重導向自橫幅」的頁面，
  // 避免 Astro 內建 redirect 的白頁閃動。
  integrations: [sitemap()],
});
