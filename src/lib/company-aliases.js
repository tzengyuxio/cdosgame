// Curated company name changes: alias (former / alternate name) → canonical page id.
//
// Adding an entry here does two things, in sync:
//   1. /companies/<alias> redirects to the canonical page (astro.config.mjs).
//   2. games that reference <alias> as developer/publisher attribute to the
//      canonical company page, and no thin alias page is generated
//      (src/pages/companies/[name].astro getStaticPaths).
//
// This is a *curated* list on purpose — not every value in a company md's
// `aliases` belongs here (some are ambiguous or collide with a real page).
// Candidates not yet enabled are tracked in docs/backlog/company-aliases.md.
export const COMPANY_ALIASES = {
  世紀縱橫: '貳碼科技',
  // 遊戲橘子（Gamania）改名史：富進軟體工作室 → 富優／富峰群（1995 並立、1997 合併）
  // → 富峰群資訊 → 遊戲橘子（1999）。前身名只做 redirect、無獨立頁；遊戲頁仍標當時廠名。
  富進: '遊戲橘子',
  富優: '遊戲橘子',
  富峰群: '遊戲橘子',
  // 中英別名（同公司）：catalog 統一用中文「工畫堂」，舊資料/外部 DB 仍用 Kogado。
  Kogado: '工畫堂',
  'Kogado Studio': '工畫堂',
  // 同一日本社多寫法：canonical 用日文正名「呉ソフトウェア工房」；KSK 為縮寫、吳氏工房/坊為中文寫法。
  KSK: '呉ソフトウェア工房',
  'Kure Software Koubou': '呉ソフトウェア工房',
  吳氏工房: '呉ソフトウェア工房',
  吳氏工坊: '呉ソフトウェア工房',
  // 中英別名（同公司）：catalog 統一用中文「富士通」，舊資料/公司頁舊檔名用 FUJITSU。
  FUJITSU: '富士通',
  // 香港勁一番（1993 成立）→ 2000 改名智傲（英文品牌 GameOne）。canonical 用現名/中文正名「智傲」；
  // 早期作品的 developer 仍留當時名「勁一番」，只做 redirect、不另生 alias 頁。
  勁一番: '智傲',
  GameOne: '智傲',
  Gameone: '智傲',
  // 代理商全稱「歐樂影視」，「歐樂」為簡寫。
  歐樂: '歐樂影視',
  // 中國大陸成都斯普軟件（CPSOFT，徐威 1998 創立），「斯普」為簡寫、「斯普電腦」為異寫。
  斯普: '斯普軟件',
  斯普電腦: '斯普軟件',
  CPSOFT: '斯普軟件',
  'CP SOFT': '斯普軟件',
  // 「盤古」為簡寫，全名盤古軟件。
  盤古: '盤古軟件',
  // 純簡稱↔全名合併（同一公司不同寫法），canonical 取通行簡稱、全名做 redirect。
  大新資訊: '大新',
  智傲娛樂: '智傲',
  天泉科技: '天泉',
  天碁多媒體: '天碁',
  皇統光碟: '皇統',
  憶弘國際: '憶弘',
};
