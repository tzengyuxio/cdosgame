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
};
