import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:content';
import { gameSchema } from '../schema/game.schema.mjs';

// Force entry id = filename (not the frontmatter slug, which is non-unique for games;
// for companies/series the filename IS the entity string used to join to game data).
const fileId = ({ entry }) => entry.replace(/\.md$/, '');

const games = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/games', generateId: fileId }),
  schema: gameSchema,
});

const companies = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/companies', generateId: fileId }),
  schema: z.object({
    name_zh: z.string(),
    aliases: z.array(z.string()).default([]),
    name_en: z.string().optional(),          // omit when unverified/inconsistent
    founded: z.number().optional(),
    dissolved: z.number().optional(),         // year defunct / acquired / merged away
    status: z.enum(['active', 'defunct', 'acquired', 'merged', 'renamed']).optional(),
    successor: z.string().optional(),         // e.g. 漢堂→智樂堂, 宇峻→宇峻奧汀
    predecessor: z.array(z.string()).default([]),  // e.g. 宇峻奧汀 ← 宇峻 + 奧汀
    region: z.string().optional(),
    hq: z.string().optional(),                // headquarters city
    founder: z.array(z.string()).default([]),
    roles: z.array(z.enum(['developer', 'publisher', 'localizer', 'distributor'])).default([]),
    website: z.string().url().optional(),
    featured_series: z.array(z.string()).default([]),
    featured_games: z.array(z.string()).default([]),
    sources: z.array(z.string().url()).default([]),  // rendered as 參考資料
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/series', generateId: fileId }),
  schema: z.object({
    name_zh: z.string(),
    aliases: z.array(z.string()).default([]),
    lead_developer: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { games, companies, series };
