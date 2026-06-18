const enc = s => encodeURIComponent(s);
export const gameUrl = id => `/games/${id}`;
export const genreUrl = g => `/genres/${enc(g)}`;
export const yearUrl = y => `/years/${y}`;
export const decadeUrl = d => `/decades/${d}`;
export const companyUrl = c => `/companies/${enc(c)}`;
export const seriesUrl = s => `/series/${enc(s)}`;
export const fandomUrl = t => `https://cn-dos-games.fandom.com/zh/wiki/${enc(t)}`;
