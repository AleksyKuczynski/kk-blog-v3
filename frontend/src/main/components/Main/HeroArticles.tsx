// src/main/components/Main/HeroArticles.tsx
import { Suspense } from 'react';
import { Lang } from '@/main/lib/dictionaries/dictionariesTypes';
import ArticleCard from '../ArticleCards/ArticleCard';

interface HeroArticlesProps {
  heroSlugs: string[];
  lang: Lang;
  rubricSlug?: string;
}

export default async function HeroArticles({ heroSlugs, lang, rubricSlug }: HeroArticlesProps) {
  if (heroSlugs.length === 0) {
    return null;
  }

  const [promotedSlug, ...latestSlugs] = heroSlugs;

  return (
    <Suspense fallback={<div>Loading featured articles...</div>}>
      <div className={`
        container mx-auto 
        grid grid-cols-1 xl:grid-cols-2
        py-6 md:py-8 lg:py-12
        sm:px-6 2xl:px-8
        theme-default:gap-6 theme-default:lg:gap-12 theme-default:xl:gap-8 theme-default:2xl:gap-12
        theme-rounded:gap-6 theme-rounded:lg:gap-8
        theme-sharp:gap-2
      `}>
        <div className={`
          col-span-full xl:col-span-1
          pb-12 md:pb-0
        `}>
          <ArticleCard 
            slug={promotedSlug} 
            lang={lang} 
            rubricSlug={rubricSlug} 
            layout="promoted"
          />
        </div>
        <div className={`
          grid grid-cols-1 md:max-xl:grid-cols-3
          theme-default:gap-6 theme-default:lg:gap-12 theme-default:xl:gap-8 theme-default:2xl:gap-12
          theme-rounded:gap-6 theme-rounded:lg:gap-8
          theme-sharp:gap-2
        `}>
          {latestSlugs.map((slug) => (
            <ArticleCard 
              key={slug} 
              slug={slug} 
              lang={lang} 
              rubricSlug={rubricSlug} 
              layout="latest"
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
}