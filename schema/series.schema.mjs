// Zod schema for a series profile (content/series/*.md). Filename = the series
// string used in game data. Imported by both src/content.config.ts and
// scripts/validate_content.mjs.
import { z } from "zod";

export const seriesSchema = z.object({
  name_zh: z.string(),
  published: z.boolean().default(false),    // false = visible in dev only (same gate as games)
  aliases: z.array(z.string()).default([]),
  lead_developer: z.string().optional(),
  summary: z.string().optional(),
  // Citation footer, same shape as companies/teams/people (see docs/refs-convention.md).
  footnotes: z.array(z.union([z.string(), z.object({ key: z.string(), text: z.string() })])).default([]),
  references: z.array(z.object({ title: z.string().optional(), url: z.string().url(), cited: z.boolean().optional(), key: z.string().optional() })).default([]),
  external_links: z.record(z.string(), z.string().url()).default({}),
});

export default seriesSchema;
