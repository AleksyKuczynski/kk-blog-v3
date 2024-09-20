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
  container: 'grid grid-cols-1 lg:grid-cols-3 gap-6',
  promotedCard: {
    container: 'lg:col-span-2 bg-accent text-white',
    imageWrapper: 'relative overflow-hidden',
    contentWrapper: 'p-6',
  },
  latestCard: {
    container: 'bg-secondary',
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
      <div className="lg:col-span-2">
        <ArticleCard 
          slug={promotedSlug} 
          lang={lang} 
          rubricSlug={rubricSlug} 
          layout="promoted"
          cardStyles={heroStyles.promotedCard}
        />
      </div>
      <div className="space-y-6">
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