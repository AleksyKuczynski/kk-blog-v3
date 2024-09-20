// /frontend/src/main/lib/directus/fetchCategories.ts

import { Category, CategoryTranslation, DIRECTUS_URL } from "./index";
import { Lang } from '@/main/lib/dictionaries/types';

export async function fetchAllCategories(lang: Lang): Promise<Category[]> {
  try {
    // Fetch all category slugs
    const categoriesUrl = `${DIRECTUS_URL}/items/categories?fields=slug`;
    const categoriesResponse = await fetch(categoriesUrl, { cache: 'no-store' });
    
    if (!categoriesResponse.ok) {
      throw new Error(`Failed to fetch categories. Status: ${categoriesResponse.status}`);
    }

    const categoriesData = await categoriesResponse.json();
    const categories = categoriesData.data as { slug: string }[];

    // Fetch translations for the categories
    const slugs = categories.map(category => category.slug);
    const translationsUrl = `${DIRECTUS_URL}/items/categories_translations?filter[categories_slug][_in]=${slugs.join(',')}&filter[languages_code][_eq]=${lang}`;
    const translationsResponse = await fetch(translationsUrl, { cache: 'no-store' });

    if (!translationsResponse.ok) {
      throw new Error(`Failed to fetch category translations. Status: ${translationsResponse.status}`);
    }

    const translationsData = await translationsResponse.json();
    const translations = translationsData.data as CategoryTranslation[];

    // Merge categories with their translations
    const categoriesWithTranslations: Category[] = categories.map(category => {
      const translation = translations.find(t => t.categories_slug === category.slug);
      return {
        slug: category.slug,
        name: translation ? translation.name : category.slug // Fallback to slug if no translation found
      };
    });

    return categoriesWithTranslations;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}