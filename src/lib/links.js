const enc = s => encodeURIComponent(s);
// Site base path (e.g. '/cdosgame' on GitHub Pages, '' in dev). Astro sets
// import.meta.env.BASE_URL to base + '/'; strip the trailing slash so we can
// concatenate cleanly. All internal link builders prefix this.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const withBase = p => `${BASE}${p}`;
export const homeUrl = () => `${BASE}/`;
export const gameUrl = id => `${BASE}/games/${id}`;
export const genreUrl = g => `${BASE}/genres/${enc(g)}`;
export const yearUrl = y => `${BASE}/years/${y}`;
export const decadeUrl = d => `${BASE}/decades/${d}`;
export const companyUrl = c => `${BASE}/companies/${enc(c)}`;
export const seriesUrl = s => `${BASE}/series/${enc(s)}`;
export const teamUrl = t => `${BASE}/teams/${enc(t)}`;
export const personUrl = p => `${BASE}/people/${enc(p)}`;
export const fandomUrl = t => `https://cn-dos-games.fandom.com/zh/wiki/${enc(t)}`;
