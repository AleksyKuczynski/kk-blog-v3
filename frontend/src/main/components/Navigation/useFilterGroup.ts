// /frontend/src/main/hooks/useFilterGroup.ts
import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Category } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';

export function useFilterGroup(categories: Category[], lang: Lang) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Derive current category and sort from URL
  const currentCategory = useMemo(() => {
    const categorySlug = pathname.split('/').pop();
    return categories.some(cat => cat.slug === categorySlug) ? categorySlug : '';
  }, [pathname, categories]);

  const currentSort = useMemo(() => {
    return searchParams.get('sort') || 'desc';
  }, [searchParams]);

  const handleCategoryChange = useCallback((newCategory: string) => {
    if (newCategory) {
      router.push(`/${lang}/category/${newCategory}`);
    } else {
      router.push(`/${lang}/articles`);
    }
  }, [router, lang]);

  const handleSortChange = useCallback((newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const handleReset = useCallback(() => {
    const isArticlesPage = pathname.endsWith('/articles');
    
    if (isArticlesPage) {
      if (currentCategory || currentSort !== 'desc') {
        router.push(`/${lang}/articles`);
      }
    } else {
      router.push(`/${lang}/articles`);
    }
  }, [router, pathname, currentCategory, currentSort, lang]);

  return {
    currentCategory,
    currentSort,
    handleCategoryChange,
    handleSortChange,
    handleReset,
  };
}