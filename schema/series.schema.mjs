// Zod schema for a series profile (content/series/*.md). Filename = the series
// string used in game data. Imported by both src/content.config.ts and
// scripts/validate_content.mjs.
import { z } from "zod";

export const seriesSchema = z.object({
  name_zh: z.string(),
  aliases: z.array(z.string()).default([]),
  lead_developer: z.string().optional(),
  summary: z.string().optional(),
});

export default seriesSchema;
