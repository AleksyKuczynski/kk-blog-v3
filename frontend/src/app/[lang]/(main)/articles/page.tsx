// src/app/[lang]/(main)/articles/page.tsx

import { Suspense } from 'react';
import { getDictionary } from '@/main/lib/dictionaries';
import { Lang } from '@/main/lib/dictionaries/types';
import { fetchHeroSlugs, fetchArticleSlugs, fetchAllCategories } from '@/main/lib/directus/index';
import { ArticleSlugInfo } from '@/main/lib/directus/interfaces';
import ArticleList from '@/main/components/Main/ArticleList';
import LoadMoreButton from '@/main/components/Main/LoadMoreButton';
import FilterGroup from '@/main/components/Main/FilterGroup';
import HeroArticles from '@/main/components/Main/HeroArticles';
import Section from '@/main/components/Main/Section';

export const dynamic = 'force-dynamic';

export default async function ArticlesPage({ params: { lang }, searchParams }: { 
  params: { lang: Lang }, 
  searchParams: { page?: string, sort?: string, category?: string, search?: string } 
}) {
  const dict = await getDictionary(lang);
  const categories = await fetchAllCategories(lang);
  const currentPage = Number(searchParams.page) || 1;
  const currentSort = searchParams.sort || 'desc';
  const currentCategory = searchParams.category || '';
  const currentSearch = searchParams.search || '';
  const isDefaultView = currentSort === 'desc' && !currentCategory && !currentSearch;

  let heroSlugs: string[] = [];
  let allSlugs: ArticleSlugInfo[] = [];
  let hasMore = false;

  if (isDefaultView) {
    try {
      heroSlugs = await fetchHeroSlugs(lang);
    } catch (error) {
      console.error('Error fetching hero articles:', error);
    }
  }

  for (let page = 1; page <= currentPage; page++) {
    const { slugs, hasMore: pageHasMore } = await fetchArticleSlugs(
      page, 
      currentSort,
      currentCategory, 
      currentSearch, 
      heroSlugs
    );
    allSlugs = [...allSlugs, ...slugs];
    hasMore = pageHasMore;
    if (!pageHasMore) break;
  }

  return (
    <>
      <Section isOdd={true}>
        <FilterGroup
          currentSort={currentSort}
          currentCategory={currentCategory}
          categories={categories}
          sortingTranslations={dict.sorting}
          categoryTranslations={dict.categories}
          resetText={dict.filter.reset}
          lang={lang}
        />
      </Section>

      {isDefaultView && (
        <Section 
          isOdd={false}
          title={dict.sections.articles.featuredArticles}
        >
          <Suspense fallback={<div>{dict.common.loading}</div>}>
            {heroSlugs.length > 0 ? (
              <HeroArticles heroSlugs={heroSlugs} lang={lang} />
            ) : (
              <div>{dict.sections.articles.noFeaturedArticles}</div>
            )}
          </Suspense>
        </Section>
      )}

      <Section 
        isOdd={true}
        title={isDefaultView ? dict.sections.articles.latestArticles : dict.sections.articles.allArticles}
      >
        <Suspense fallback={<div>{dict.common.loading}</div>}>
          <ArticleList 
            slugInfos={allSlugs}
            lang={lang} 
          />
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <LoadMoreButton 
                currentPage={currentPage}
                loadMoreText={dict.common.loadMore}
              />
            </div>
          )}
        </Suspense>
      </Section>
    </>
  );
}