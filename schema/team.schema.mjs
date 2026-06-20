// Zod schema for a dev team / sub-studio profile (content/teams/*.md). Filename =
// the team string used in game data (game.dev_team), joined to games at build.
// Imported by both src/content.config.ts and scripts/validate_content.mjs.
import { z } from "zod";

export const teamSchema = z.object({
  name_zh: z.string(),
  published: z.boolean().default(false),    // false = visible in dev only (same gate as games)
  aliases: z.array(z.string()).default([]),
  name_en: z.string().optional(),
  parent_company: z.string().optional(),    // owning company string (game.developer), e.g. 大宇
  founded: z.number().optional(),
  dissolved: z.number().optional(),
  status: z.enum(["active", "defunct", "merged", "renamed"]).optional(),
  members: z.array(z.string()).default([]), // key people (person names); linked to /people if a page exists
  featured_games: z.array(z.string()).default([]),  // representative cdg-NNNN
  references: z.array(z.object({ title: z.string().optional(), url: z.string().url() })).default([]),
  external_links: z.record(z.string(), z.string().url()).default({}),
});

export default teamSchema;
