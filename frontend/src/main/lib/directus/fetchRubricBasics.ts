// src/main/lib/directus/fetchRubricBasics.ts

import { DIRECTUS_URL } from './constants';
import { RubricBasic } from './interfaces';
import { Lang } from '@/main/lib/dictionaries/types';

export async function fetchRubricBasics(lang: Lang): Promise<RubricBasic[]> {
  try {
    const fields = 'slug,translations.name';
    const filter = JSON.stringify({
      translations: {
        languages_code: {
          _eq: lang
        }
      }
    });
    const url = `${DIRECTUS_URL}/items/rubrics?fields=${fields}&filter=${encodeURIComponent(filter)}`;

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch rubric basics. Status: ${response.status}`);
    }

    const data = await response.json();

    return data.data.map((rubric: any) => ({
      slug: rubric.slug,
      name: rubric.translations[0]?.name || rubric.slug,
    }));
  } catch (error) {
    console.error('Error fetching rubric basics:', error);
    return [];
  }
}