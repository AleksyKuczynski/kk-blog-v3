// /frontend/src/main/components/ArticleCards/ArticleCardVariant.tsx
'use client';

import { CardThemeStyles } from '@/main/components/ThemeSwitcher/themeUtils';
import { ArticleCardVariantProps } from './interfaces';
import { NewsCard } from './NewsCard';
import { AdvertisingCard } from './AdvertisingCard';
import { StandardCard } from './StandardCard';
import { regularCardStyles } from './regularCardStyles';
import { latestCardStyles } from './latestCardStyles';
import { promotedCardStyles } from './promotedCardStyles';
import { useTheme } from '../ThemeSwitcher';

export function ArticleCardVariant(props: ArticleCardVariantProps) {
  const { currentTheme } = useTheme();

  const getCardComponent = () => {
    let themeClasses: CardThemeStyles;

    switch (props.layout) {
      case 'latest':
        themeClasses = latestCardStyles[currentTheme];
        break;
      case 'promoted':
        themeClasses = promotedCardStyles[currentTheme];
        break;
      default:
        themeClasses = regularCardStyles[currentTheme];
    }

    // Merge the themeClasses with the cardStyles
    const mergedClasses: CardThemeStyles = {
      ...themeClasses,
      container: `${props.cardStyles.container} ${themeClasses.container}`,
      imageWrapper: `${props.cardStyles.imageWrapper} ${themeClasses.imageWrapper}`,
    };

    switch (props.layout) {
      case 'news':
        return <NewsCard {...props} themeClasses={mergedClasses} />;
      case 'advertising':
        return <AdvertisingCard {...props} themeClasses={mergedClasses} />;
      default:
        return (
          <StandardCard 
            {...props} 
            themeClasses={mergedClasses}
          />
        );
    }
  };

  return (
    <>
      {getCardComponent()}
    </>
  );
}