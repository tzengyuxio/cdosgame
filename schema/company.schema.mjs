// Zod schema for a company profile (content/companies/*.md). Filename = the
// developer/publisher string used in game data, joined to game entries at build.
// Imported by both src/content.config.ts and scripts/validate_content.mjs.
import { z } from "zod";

export const companySchema = z.object({
  name_zh: z.string(),
  aliases: z.array(z.string()).default([]),
  name_en: z.string().optional(),          // omit when unverified/inconsistent
  founded: z.number().optional(),
  dissolved: z.number().optional(),         // year defunct / acquired / merged away
  status: z.enum(["active", "defunct", "acquired", "merged", "renamed"]).optional(),
  successor: z.string().optional(),         // e.g. 漢堂→智樂堂, 宇峻→宇峻奧汀
  predecessor: z.array(z.string()).default([]),  // e.g. 宇峻奧汀 ← 宇峻 + 奧汀
  region: z.string().optional(),
  hq: z.string().optional(),                // headquarters city
  founder: z.array(z.string()).default([]),
  roles: z.array(z.enum(["developer", "publisher", "localizer", "distributor"])).default([]),
  website: z.string().url().optional(),
  featured_series: z.array(z.string()).default([]),
  featured_games: z.array(z.string()).default([]),
  // 參考資料 (References): {title, url}. Same field name as games' references
  // (games keep their typed map shape; a shared RefSection renders both).
  references: z.array(z.object({ title: z.string().optional(), url: z.string().url() })).default([]),
  external_links: z.record(z.string(), z.string().url()).default({}),  // 外部連結
});

export default companySchema;
