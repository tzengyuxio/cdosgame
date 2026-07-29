// NostaLib（懷舊圖書館）雜誌每期連結。
//
// 每期 URL 為確定式：<base>/<code>/no.<NNN>，NNN 為三位補零的期號；
// 合刊用連字號（如 070-071）。code 恰好＝現有 footnote key 前綴（swm/ace/sgm/cgw）。
//
// 兩個用途：
//   1. 撰寫雜誌 footnote 時組出該期 URL（供 game-entry / press-import 使用）。
//   2. media 圖片的雜誌連結：media.js 的 decorate 用 magazineHref 從 caption 解析出
//      該期 URL，掛在縮圖 button 的 data-mag-url/label；lightbox 放大時才渲染成
//      「雜誌：<刊名期號>」連結（縮圖 caption 本身維持純文字，不散連結）。

export const MAG_BASE = 'https://nostalib.simagame.me/magazines';

// 刊名（正文/caption 用字）→ NostaLib code。key 亦為 footnote key 前綴。
// 同一刊物不同時期的刊名並列（《電腦遊戲世界》後改名《遊戲世界》，期號連續、
// 同屬 cgw）；比對時長名在前，免得「遊戲世界」先吃掉「電腦遊戲世界」。
export const MAG_CODES = {
  軟體世界: 'swm',
  電腦玩家: 'ace',
  新遊戲時代: 'sgm',
  電腦遊戲世界: 'cgw',
  遊戲世界: 'cgw',
};

// (code, issue) → 該期 NostaLib URL。issue 可為 '40' 或合刊 '70-71'。
export function magazineIssueUrl(code, issue) {
  const pad = s => String(s).padStart(3, '0');
  const norm = String(issue)
    .replace(/\+/g, '-')
    .split('-')
    .map(pad)
    .join('-');
  return `${MAG_BASE}/${code}/no.${norm}/`;
}

// 特殊期號 → 期數（NostaLib 慣例：試刊號＝no.000、創刊號＝no.001）。
const SPECIAL_ISSUES = { 試刊號: '0', 創刊號: '1' };

// 從 caption 文字解析出雜誌期別連結，回傳 { url, label } 或 null。
// label＝比對到的「刊名＋期號」片段（供 lightbox 顯示）。文字期號不補零，URL 補零。
// 容錯：可選《》、可選「第」、可選空白、合刊 N+M / N-M、特殊期號（創刊號/試刊號）。
// 注意：期號是否確實存在於 NostaLib 不在此驗證（少數期或特殊刊可能 404）；
// 有疑慮的期別可在 footnote 直接手寫完整 URL 覆蓋。
export function magazineHref(text) {
  if (!text) return null;
  for (const [name, code] of Object.entries(MAG_CODES)) {
    const sp = text.match(new RegExp(`(《?${name}》?\\s*(創刊號|試刊號))`));
    if (sp) return { url: magazineIssueUrl(code, SPECIAL_ISSUES[sp[2]]), label: sp[1] };
    const m = text.match(new RegExp(`(《?${name}》?\\s*第?\\s*([0-9]+(?:[-+][0-9]+)?)\\s*期)`));
    if (m) return { url: magazineIssueUrl(code, m[2]), label: m[1] };
  }
  return null;
}
