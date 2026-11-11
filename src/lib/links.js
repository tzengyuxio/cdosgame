const enc = s => encodeURIComponent(s);
// Site base path (e.g. '/cdosgame' on GitHub Pages, '' in dev). Astro sets
// import.meta.env.BASE_URL to base + '/'; strip the trailing slash so we can
// concatenate cleanly. All internal link builders prefix this.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
// Pages are served as directories, so a slashless URL costs a 301 to the
// slashed form. Add the trailing slash to page paths (not to files such as
// /sitemap.xml, and keeping any ?query or #hash after it).
export const slash = p => p.replace(/^([^?#]*?)\/?([?#].*)?$/, (m, path, rest = '') =>
  !path || /\.[a-z0-9]+$/i.test(path) ? m : `${path}/${rest}`);
export const withBase = p => slash(`${BASE}${p}`);
export const homeUrl = () => `${BASE}/`;
export const gameUrl = id => `${BASE}/games/${id}/`;
export const genreUrl = g => `${BASE}/genres/${enc(g)}/`;
export const yearUrl = y => `${BASE}/years/${y}/`;
export const decadeUrl = d => `${BASE}/decades/${d}/`;
export const companyUrl = c => `${BASE}/companies/${enc(c)}/`;
export const seriesUrl = s => `${BASE}/series/${enc(s)}/`;
export const teamUrl = t => `${BASE}/teams/${enc(t)}/`;
export const personUrl = p => `${BASE}/people/${enc(p)}/`;
export const topicUrl = t => `${BASE}/topics/${enc(t)}/`;
export const fandomUrl = t => `https://cn-dos-games.fandom.com/zh/wiki/${enc(t)}`;
