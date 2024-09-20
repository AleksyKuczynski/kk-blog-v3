// src/main/lib/directus/fetchAllAuthors.ts

import { AuthorDetails, DIRECTUS_URL } from "./index";
import { Lang } from '@/main/lib/dictionaries/types';

export async function fetchAllAuthors(lang: Lang): Promise<AuthorDetails[]> {
  try {
    const authorsUrl = `${DIRECTUS_URL}/items/authors?fields=slug,avatar&sort=slug`;
    const authorsResponse = await fetch(authorsUrl, { cache: 'no-store' });
    
    if (!authorsResponse.ok) {
      throw new Error(`Failed to fetch authors. Status: ${authorsResponse.status}`);
    }

    const authorsData = await authorsResponse.json();
    const authors = authorsData.data;

    const slugs = authors.map((author: any) => author.slug);
    const translationsUrl = `${DIRECTUS_URL}/items/authors_translations?filter[authors_slug][_in]=${slugs.join(',')}&filter[languages_code][_eq]=${lang}&fields=authors_slug,name,bio`;
    const translationsResponse = await fetch(translationsUrl, { cache: 'no-store' });

    if (!translationsResponse.ok) {
      throw new Error(`Failed to fetch author translations. Status: ${translationsResponse.status}`);
    }

    const translationsData = await translationsResponse.json();
    const translations = translationsData.data;

    const completeAuthors: AuthorDetails[] = authors.map((author: any) => {
      const translation = translations.find((t: any) => t.authors_slug === author.slug);
      return {
        slug: author.slug,
        avatar: author.avatar || '',
        name: translation ? translation.name : author.slug,  // Changed from last_name to name
        bio: translation ? translation.bio : ''
      };
    });

    return completeAuthors;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}