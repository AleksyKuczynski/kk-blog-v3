// src/main/components/ArticleCards/ArticleCardVariant.tsx
'use client';

import { ArticleCardVariantProps } from './interfaces';
import { NewsCard } from './NewsCard';
import { AdvertisingCard } from './AdvertisingCard';
import { StandardCard } from './StandardCard';
import { promotedCardStyles } from './promotedCardStyles';
import { latestCardStyles } from './latestCardStyles';
import { regularCardStyles } from './regularCardStyles';
import { CardThemeStyles } from '../ThemeSwitcher/themeTypes';

// Helper function to merge classes
const mergeClasses = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export function ArticleCardVariant(props: ArticleCardVariantProps) {
  const { cardStyles, theme, layout } = props;

  

  const getCardComponent = () => {
    let layoutStyles: Record<string, CardThemeStyles>;

    switch (layout) {
      case 'promoted':
        layoutStyles = promotedCardStyles;
        break;
      case 'latest':
        layoutStyles = latestCardStyles;
        break;
      default:
        layoutStyles = regularCardStyles;
    }

    // Helper function to merge styles for a single property
const mergeStylesForProp = (prop: keyof CardThemeStyles) => 
  mergeClasses(
    cardStyles.common[prop],
    cardStyles.themeSensitive[theme][prop],
    layoutStyles[theme][prop]
  );

// Merge the styles
const mergedStyles: CardThemeStyles = (Object.keys(cardStyles.common) as Array<keyof CardThemeStyles>)
  .reduce((acc, prop) => {
    acc[prop] = mergeStylesForProp(prop);
    return acc;
  }, {} as CardThemeStyles);

    const commonProps = {
      ...props,
      themeClasses: mergedStyles,
    };

    switch (layout) {
      case 'news':
        return <NewsCard {...commonProps} />;
      case 'advertising':
        return <AdvertisingCard {...commonProps} />;
      default:
        return <StandardCard {...commonProps} />;
    }
  };

  return getCardComponent();
}