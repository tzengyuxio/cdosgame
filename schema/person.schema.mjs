// Zod schema for a person profile (content/people/*.md). Filename = the person's
// canonical zh name; linked from games via staff[].name or staff[].person.
// Imported by both src/content.config.ts and scripts/validate_content.mjs.
import { z } from "zod";
import { mediaArray, PERSON_MEDIA_KINDS } from "./media.schema.mjs";

export const personSchema = z.object({
  name_zh: z.string(),
  published: z.boolean().default(false),    // false = visible in dev only (same gate as games)
  aliases: z.array(z.string()).default([]),   // 英文名 / 藝名 / 署名代號 (e.g. T.M.H.)
  name_en: z.string().optional(),
  born: z.number().optional(),
  // free-text roles, e.g. 程式設計 / 遊戲企劃 / 編劇 / 製作人 / 代言人
  roles: z.array(z.string()).default([]),
  affiliations: z.array(z.string()).default([]),  // company/team strings
  featured_games: z.array(z.string()).default([]),  // games tied to them but not via staff (代言/客串)
  references: z.array(z.object({ title: z.string().optional(), url: z.string().url() })).default([]),
  external_links: z.record(z.string(), z.string().url()).default({}),
  media: mediaArray(PERSON_MEDIA_KINDS),  // public/media/people/<slug>/
});

export default personSchema;
