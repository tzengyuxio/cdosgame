import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { gameSchema } from '../schema/game.schema.mjs';
import { companySchema } from '../schema/company.schema.mjs';
import { seriesSchema } from '../schema/series.schema.mjs';
import { teamSchema } from '../schema/team.schema.mjs';
import { personSchema } from '../schema/person.schema.mjs';

// Force entry id = filename (not the frontmatter slug, which is non-unique for games;
// for companies/series the filename IS the entity string used to join to game data).
const fileId = ({ entry }) => entry.replace(/\.md$/, '');

const games = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/games', generateId: fileId }),
  schema: gameSchema,
});

const companies = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/companies', generateId: fileId }),
  schema: companySchema,
});

const series = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/series', generateId: fileId }),
  schema: seriesSchema,
});

const teams = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/teams', generateId: fileId }),
  schema: teamSchema,
});

const people = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/people', generateId: fileId }),
  schema: personSchema,
});

export const collections = { games, companies, series, teams, people };
