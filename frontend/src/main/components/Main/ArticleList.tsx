// src/main/components/Main/ArticleList.tsx
import { Suspense } from 'react';
import { Lang } from '@/main/lib/dictionaries/types';
import { ArticleSlugInfo } from '@/main/lib/directus/interfaces';
import ArticleCard from '../ArticleCards/ArticleCard';

interface ArticleListProps {
  slugInfos: ArticleSlugInfo[];
  lang: Lang;
  authorSlug?: string;
  rubricSlug?: string;
}

const listStyles = {
  container: `
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-2
    px-3 sm:px-0 
    
  `,
  card: {
    container: 'bg-white shadow-md self-stretch',
    imageWrapper: 'relative overflow-hidden',
  },
};

async function ArticleListContent({ slugInfos, lang, authorSlug, rubricSlug }: ArticleListProps) {

  if (slugInfos.length === 0) {
    return <p className="text-text-secondary">No articles found.</p>;
  }

  return (
    <div className={listStyles.container}>
      {slugInfos.map((slugInfo) => (
        <ArticleCard 
          key={slugInfo.slug}
          slug={slugInfo.slug}
          lang={lang} 
          authorSlug={authorSlug}
          rubricSlug={rubricSlug}
          layout={slugInfo.layout}
          cardStyles={listStyles.card}
        />
      ))}
    </div>
  );
}

export default function ArticleList(props: ArticleListProps) {
  return (
    <Suspense fallback={<div>Loading articles...</div>}>
      <ArticleListContent {...props} />
    </Suspense>
  );
}