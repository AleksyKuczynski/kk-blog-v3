// src/main/lib/directus/fetchAllRubrics.ts

import { DIRECTUS_URL, Rubric, fetchRubricDetails } from './index';
import { Lang } from '@/main/lib/dictionaries/dictionariesTypes';

export async function fetchAllRubrics(lang: Lang): Promise<Rubric[]> {
  try {
    // Fetch all rubric slugs
    const url = `${DIRECTUS_URL}/items/rubrics?fields=slug`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch rubric slugs. Status: ${response.status}`);
    }

    const data = await response.json();
    const slugs = data.data.map((item: { slug: string }) => item.slug);

    // Fetch details for each rubric
    const rubricPromises = slugs.map((slug: string) => fetchRubricDetails(slug, lang));
    const rubrics = await Promise.all(rubricPromises);

    // Filter out any null results (in case a rubric wasn't found)
    return rubrics.filter((rubric): rubric is Rubric => rubric !== null);
  } catch (error) {
    console.error('Error fetching all rubrics:', error);
    return [];
  }
}