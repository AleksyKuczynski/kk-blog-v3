// src/main/components/Main/ArticleList.tsx
import { Suspense } from 'react';
import { Lang } from '@/main/lib/dictionaries/types';
import { ArticleSlugInfo } from '@/main/lib/directus/interfaces';
import ArticleCard from '../ArticleCards/ArticleCard';
import { Theme } from '@/main/components/ThemeSwitcher/themeTypes';
import { CardStyles } from '../ArticleCards/interfaces';
import { getTheme } from '../ThemeSwitcher';

interface ArticleListProps {
  slugInfos: ArticleSlugInfo[];
  lang: Lang;
  authorSlug?: string;
  categorySlug?: string;
  rubricSlug?: string;
}

const listStyles = {
  common: {
    container: `
      grid 
      grid-cols-1 lg:grid-cols-3 xl:grid-cols-2
      container mx-auto 
      py-6 md:py-8 lg:py-12
      sm:px-6 2xl:px-8 
    `,
  },
  themeSensitive: {
    default: {
      container: 'gap-6 lg:gap-12 xl:gap-8 2xl:gap-12',
    },
    rounded: {
      container: 'gap-6 lg:gap-8',
    },
    sharp: {
      container: 'gap-2',
    },
  },
};

const cardStyles: CardStyles = {
  common: {
    container: 'bg-bgcolor-alt shadow-md self-stretch',
    contentWrapper: 'flex flex-col h-full',
    imageWrapper: 'relative overflow-hidden aspect-video',
    content: 'p-4 flex flex-col flex-grow',
    title: 'text-lg font-bold mb-2',
    date: 'text-sm text-txcolor-muted mb-2',
    description: 'text-sm mb-4 flex-grow',
    readMore: 'text-sm font-medium text-prcolor hover:text-prcolor-dark',
    image: 'object-cover',
    authorWrapper: 'mt-2 text-sm',
    authorLink: 'text-prcolor hover:text-prcolor-dark',
  },
  themeSensitive: {
    default: {
      container: 'rounded-lg',
    },
    rounded: {
      container: 'rounded-3xl',
      imageWrapper: 'rounded-t-3xl',
    },
    sharp: {
      container: 'border p-1',
    },
  },
};

async function ArticleListContent({ slugInfos, lang, authorSlug, rubricSlug }: ArticleListProps) {
  const theme = await getTheme();

  if (slugInfos.length === 0) {
    return <p className="text-txcolor-secondary">No articles found.</p>;
  }

  const containerClassName = `${listStyles.common.container} ${listStyles.themeSensitive[theme].container}`.trim();

  return (
    <div className={containerClassName}>
      {slugInfos.map((slugInfo) => (
        <ArticleCard 
          key={slugInfo.slug}
          slug={slugInfo.slug}
          lang={lang} 
          authorSlug={authorSlug}
          rubricSlug={rubricSlug}
          layout={slugInfo.layout}
          theme={theme}
          cardStyles={cardStyles}
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