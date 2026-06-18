import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toIndexRecord } from '../lib/gamesQuery.js';

export const GET: APIRoute = async () => {
  const all = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  const records = all.map(e => toIndexRecord(e.data));
  records.sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999));
  return new Response(JSON.stringify(records), {
    headers: { 'Content-Type': 'application/json' },
  });
};
