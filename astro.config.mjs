import { defineConfig, passthroughImageService } from 'astro/config';

// GitHub Pages project site: served under https://tzengyuxio.github.io/cdosgame/
const BASE = '/cdosgame';

// Astro applies `base` to its own routing/assets, but does NOT rewrite absolute
// links written inside markdown bodies (e.g. [大宇](/companies/大宇)). This rehype
// plugin prefixes BASE onto absolute internal <a href> so content cross-links work
// under the project base. External (http/protocol-relative) links are left alone.
function rehypeBaseLinks() {
  const walk = (node) => {
    if (node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
      const h = node.properties.href;
      if (h.startsWith('/') && !h.startsWith('//')) node.properties.href = BASE + h;
    }
    for (const child of node.children || []) walk(child);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://tzengyuxio.github.io',
  base: BASE,
  // v1 has no images; use a no-op image service so the build does not require
  // the native `sharp` dependency.
  image: { service: passthroughImageService() },
  markdown: { rehypePlugins: [rehypeBaseLinks] },
});
