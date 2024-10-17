// src/main/components/Main/HeroArticles.tsx
import { Suspense } from 'react';
import { Lang } from '@/main/lib/dictionaries/types';
import ArticleCard from '../ArticleCards/ArticleCard';
import { Theme } from '@/main/components/ThemeSwitcher/themeTypes';
import { HeroStyles, CardStyles } from '../ArticleCards/interfaces';

interface HeroArticlesProps {
  heroSlugs: string[];
  lang: Lang;
  rubricSlug?: string;
  theme: Theme;
}


const heroStyles: HeroStyles = {
  grid: {
    common: {
      outer: `
        grid 
        grid-cols-1 xl:grid-cols-2
        container mx-auto 
        py-6 md:py-8 lg:py-12
        sm:px-6 2xl:px-8
      `,
      inner: `
        grid 
        grid-cols-1 md:max-xl:grid-cols-3 
      `,
      promotedWrapper: `
        col-span-full xl:col-span-1
        pb-12 md:pb-0
      `,
    },
    themeSensitive: {
      default: {
        outer: 'gap-6 lg:gap-12 xl:gap-8 2xl:gap-12',
        inner: 'gap-6 lg:gap-12 xl:gap-8 2xl:gap-12',
        promotedWrapper: '',
      },
      rounded: {
        outer: 'gap-6 lg:gap-8',
        inner: 'gap-6 lg:gap-8',
        promotedWrapper: '',
      },
      sharp: {
        outer: 'gap-2',
        inner: 'gap-2',
        promotedWrapper: '',
      },
    },
  },
  cards: {
    common: {
      container: 'group relative',
      contentWrapper: 'flex flex-col',
      imageWrapper: 'relative w-full sm:max-md:h-full overflow-hidden aspect-[12/10] sm:max-lg:aspect-[11/12]',
      image: '',
      content: 'grow space-y-2 xl:space-y-3 leading-loose flex flex-col',
      title: 'lg:max-xl:grow mb-2',
      date: 'text-xs lg:text-sm text-txcolor-muted',
      description: 'text-sm lg:text-base line-clamp-3 mb-4 max-sm:hidden',
      readMore: 'sm:max-lg:grow text-sm font-medium transition-colors duration-200 flex justify-end items-end',
      authorWrapper: 'hidden bg-bgcolor-alt bg-opacity-80 top-2 left-2 pb-1 px-3 rounded-md',
      authorLink: 'text-xs sm:text-sm inline-block mr-1 last:mr-0 hover:text-prcolor transition-colors duration-200',
    },
    themeSensitive: {
      default: {
        container: 'group',
        contentWrapper: 'gap-4 2xl:gap-6',
        imageWrapper: `
          rounded-lg 
          shadow-md
          group-hover:shadow-xl
          group-hover:dark:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
          transition-shadow
          duration-200
        `,
        image: 'mx-4 sm:mx-0',
        content: '',
        title: 'font-custom',
        date: '',
        description: '',
        readMore: 'hover:underline underline-offset-4',
        authorWrapper: '',
        authorLink: '',
        },
      rounded: {
        container: '',
        contentWrapper: `
          bg-bgcolor-alt
          rounded-3xl 
          shadow-md
          hover:shadow-lg
          dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
          transition-shadow
          duration-200
          overflow-hidden
        `,
        imageWrapper: '',
        image: '',
        content: '',
        title: 'font-display',
        date: '',
        description: '',
        readMore: '',
        authorWrapper: '',
        authorLink: '',
      },
      sharp: {
        container: '',
        contentWrapper: 'gap-4 2xl:gap-6 bg-gradient-to-br from-bgcolor-alt via-bgcolor-accent to-bgcolor',
        imageWrapper: `
        `,
        image: '',
        content: 'm-4',
        title: 'font-custom',
        date: '',
        description: '',
        readMore: 'underline underline-offset-2',
        authorWrapper: '',
        authorLink: '',
      },
    },
  },
};

export default function HeroArticles({ heroSlugs, lang, rubricSlug, theme }: HeroArticlesProps) {
  if (heroSlugs.length === 0) {
    return null;
  }

  const [promotedSlug, ...latestSlugs] = heroSlugs;
  
  const gridStyles = {
    outer: `${heroStyles.grid.common.outer} ${heroStyles.grid.themeSensitive[theme].outer}`.trim(),
    inner: `${heroStyles.grid.common.inner} ${heroStyles.grid.themeSensitive[theme].inner}`.trim(),
    promotedWrapper: `${heroStyles.grid.common.promotedWrapper} ${heroStyles.grid.themeSensitive[theme].promotedWrapper}`.trim(),
  };


  const cardStyles: CardStyles = {
    common: heroStyles.cards.common,
    themeSensitive: heroStyles.cards.themeSensitive,
  };

  return (
    <Suspense fallback={<div>Loading featured articles...</div>}>
      <div className={gridStyles.outer}>
        <div className={gridStyles.promotedWrapper}>
          <ArticleCard 
            slug={promotedSlug} 
            lang={lang} 
            rubricSlug={rubricSlug} 
            layout="promoted"
            cardStyles={cardStyles}
            theme={theme}
          />
        </div>
        <div className={gridStyles.inner}>
          {latestSlugs.map((slug) => (
            <ArticleCard 
              key={slug} 
              slug={slug} 
              lang={lang} 
              rubricSlug={rubricSlug} 
              layout="latest"
              cardStyles={cardStyles}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
}