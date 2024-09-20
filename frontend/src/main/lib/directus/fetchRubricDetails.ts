// src/main/lib/directus/fetchRubricDetails.ts

import { DIRECTUS_URL, Rubric } from './index';
import { Lang } from '@/main/lib/dictionaries/types';

export async function fetchRubricDetails(slug: string, lang: Lang): Promise<Rubric | null> {
  try {
    // Fetch rubric details
    const fields = [
      'slug',
      'translations.*',
    ].join(',');

    const filter = {
      slug: { _eq: slug },
    };

    const rubricUrl = `${DIRECTUS_URL}/items/rubrics?fields=${fields}&filter=${JSON.stringify(filter)}`;
    const rubricResponse = await fetch(rubricUrl, { cache: 'no-store' });

    if (!rubricResponse.ok) {
      throw new Error(`Failed to fetch rubric details. Status: ${rubricResponse.status}`);
    }

    const rubricData = await rubricResponse.json();

    if (!rubricData.data || rubricData.data.length === 0) {
      return null;
    }

    const rubric = rubricData.data[0];

    // Fetch article count
    const countUrl = `${DIRECTUS_URL}/items/articles?aggregate[count]=*&filter[rubric_slug][_eq]=${slug}`;
    const countResponse = await fetch(countUrl, { cache: 'no-store' });

    if (!countResponse.ok) {
      throw new Error(`Failed to fetch article count. Status: ${countResponse.status}`);
    }

    const countData = await countResponse.json();
    const articleCount = countData.data[0]?.count ?? 0;

    // Combine the results
    return {
      slug: rubric.slug,
      translations: rubric.translations,
      articleCount: articleCount,
      // Note: We're not fetching articles here, so we'll omit the 'articles' and 'hasMore' properties
    };
  } catch (error) {
    console.error('Error fetching rubric details:', error);
    return null;
  }
}