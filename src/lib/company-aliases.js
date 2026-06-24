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
};
