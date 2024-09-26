// src/main/components/Main/HeroArticles.tsx
import { Suspense } from 'react';
import { Lang } from '@/main/lib/dictionaries/types';
import ArticleCard from '../ArticleCards/ArticleCard';

interface HeroArticlesProps {
  heroSlugs: string[];
  lang: Lang;
  rubricSlug?: string;
}

const heroStyles = {
  container: `
    grid 
    grid-cols-1 xl:grid-cols-2 
    gap-6 lg:gap-12 xl:gap-8 2xl:gap-12
    container mx-auto 
    py-6 md:py-8 lg:py-12
    px-2 sm:px-6 2xl:px-8
  `,
  promotedCard: {
    container: '',
    imageWrapper: 'relative overflow-hidden',
    contentWrapper: 'p-6',
  },
  latestCard: {
    container: 'xl:col-span-2',
    imageWrapper: 'relative overflow-hidden',
    contentWrapper: 'p-4',
  },
};

async function HeroArticlesContent({ heroSlugs, lang, rubricSlug }: HeroArticlesProps) {
  if (heroSlugs.length === 0) {
    return null;
  }

  const [promotedSlug, ...latestSlugs] = heroSlugs;

  return (
    <div className={heroStyles.container}>
      <div className='pb-12 sm:pb-0'>
        <ArticleCard 
          slug={promotedSlug} 
          lang={lang} 
          rubricSlug={rubricSlug} 
          layout="promoted"
          cardStyles={heroStyles.promotedCard}
        />
      </div>
      <div className={`
        grid 
        lg:max-xl:grid-cols-3 2xl:grd-rows-3 gap-12 sm:gap-6 xl:gap-8 2xl:gap-12
      `}>
        {latestSlugs.map((slug) => (
          <ArticleCard 
            key={slug} 
            slug={slug} 
            lang={lang} 
            rubricSlug={rubricSlug} 
            layout="latest"
            cardStyles={heroStyles.latestCard}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroArticles(props: HeroArticlesProps) {
  return (
    <Suspense fallback={<div>Loading featured articles...</div>}>
      <HeroArticlesContent {...props} />
    </Suspense>
  );
}