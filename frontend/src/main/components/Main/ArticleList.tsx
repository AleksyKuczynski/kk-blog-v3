// src/main/components/Main/ArticleList.tsx
import { Suspense } from 'react';
import { Lang } from '@/main/lib/dictionaries/types';
import { ArticleSlugInfo } from '@/main/lib/directus/interfaces';
import ArticleCard from '../ArticleCards/ArticleCard';
import { regularCardStyles } from '../ArticleCards/regularCardStyles';
import { Theme } from '@/main/components/ThemeSwitcher/themeTypes';
import { getTheme } from '@/main/components/ThemeSwitcher/themeActions';

interface ArticleListProps {
  slugInfos: ArticleSlugInfo[];
  lang: Lang;
  authorSlug?: string;
  categorySlug?: string;
  rubricSlug?: string;
}

const listStyles = {
  grid: {
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
  },
};

async function ArticleListContent({ 
  slugInfos, 
  lang, 
  authorSlug, 
  rubricSlug,
}: ArticleListProps) {
  const theme = await getTheme();

  if (slugInfos.length === 0) {
    return <p className="text-txcolor-secondary">No articles found.</p>;
  }

  const gridClasses = `${listStyles.grid.common.container} ${listStyles.grid.themeSensitive[theme].container}`.trim();

  return (
    <div className={gridClasses}>
      {slugInfos.map((slugInfo) => (
        <ArticleCard 
          key={slugInfo.slug}
          slug={slugInfo.slug}
          lang={lang} 
          authorSlug={authorSlug}
          rubricSlug={rubricSlug}
          layout="regular"
          cardStyles={{
            common: {},
            themeSensitive: regularCardStyles
          }}
          theme={theme}
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