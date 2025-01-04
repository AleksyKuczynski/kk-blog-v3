// src/main/components/Main/ArticleList.tsx
import { Suspense } from 'react';
import { Lang } from '@/main/lib/dictionaries/dictionariesTypes';
import { ArticleSlugInfo } from '@/main/lib/directus/directusInterfaces';
import ArticleCard from '../ArticleCards/ArticleCard';

interface ArticleListProps {
  slugInfos: ArticleSlugInfo[];
  lang: Lang;
  authorSlug?: string;
  categorySlug?: string;
  rubricSlug?: string;
}

export default function ArticleList({ 
  slugInfos, 
  lang, 
  authorSlug, 
  rubricSlug 
}: ArticleListProps) {
  if (slugInfos.length === 0) {
    return <p className="text-on-sf">No articles found.</p>;
  }

  return (
    <Suspense fallback={<div>Loading articles...</div>}>
      <div className={`
        container mx-auto 
        grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2
        py-6 md:py-8 lg:py-12
        sm:px-6 2xl:px-8
        theme-default:gap-6 theme-default:lg:gap-12 theme-default:xl:gap-8 theme-default:2xl:gap-12
        theme-rounded:gap-6 theme-rounded:lg:gap-8
        theme-sharp:gap-2
      `}>
        {slugInfos.map((slugInfo) => (
          <ArticleCard 
            key={slugInfo.slug}
            slug={slugInfo.slug}
            lang={lang} 
            authorSlug={authorSlug}
            rubricSlug={rubricSlug}
            layout={slugInfo.layout}
          />
        ))}
      </div>
    </Suspense>
  );
}