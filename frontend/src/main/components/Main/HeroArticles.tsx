// src/main/components/Main/HeroArticles.tsx
import { Suspense } from 'react';
import { Lang } from '@/main/lib/dictionaries/types';
import ArticleCard from '../ArticleCards/ArticleCard';
import { HeroStyles, CardStyles } from '../ArticleCards/interfaces';
import { getTheme } from '../ThemeSwitcher';

interface HeroArticlesProps {
  heroSlugs: string[];
  lang: Lang;
  rubricSlug?: string;
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
      date: 'text-xs lg:text-sm text-on-sf-var',
      description: 'text-sm lg:text-base line-clamp-3 mb-4 max-sm:hidden',
      readMore: 'sm:max-lg:grow text-sm font-medium transition-colors duration-200 flex justify-end items-end',
      authorWrapper: 'hidden bg-sf-cont bg-opacity-80 top-2 left-2 pb-1 px-3 rounded-md',
      authorLink: 'text-xs sm:text-sm inline-block mr-1 last:mr-0 hover:text-pr-cont transition-colors duration-200',
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
          bg-sf-cont
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
        contentWrapper: 'gap-2 bg-sf border border-ol-var p-3',
        imageWrapper: `
        `,
        image: '',
        content: 'p-2',
        title: 'font-custom',
        date: '',
        description: '',
        readMore: '',
        authorWrapper: '',
        authorLink: '',
      },
    },
  },
};

export default async function HeroArticles({ heroSlugs, lang, rubricSlug }: HeroArticlesProps) {
  const theme = await getTheme();
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