// src/main/components/Main/CategorySelectorWrapper.tsx

import { fetchAllCategories } from '@/main/lib/directus/index';
import CategorySelector from '@/main/components/Main/CategorySelector';
import { CategoryTranslations } from '@/main/lib/dictionaries/types';
import { Lang } from '@/main/lib/dictionaries/types';

interface CategorySelectorWrapperProps {
  translations: CategoryTranslations;
  lang: Lang;
}

export async function CategorySelectorWrapper({ translations, lang }: CategorySelectorWrapperProps) {
  const categories = await fetchAllCategories(lang);
  return <CategorySelector categories={categories} translations={translations} />;
}