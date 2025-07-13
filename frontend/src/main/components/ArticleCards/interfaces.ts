// /frontend/src/main/components/ArticleCards/interfaces.ts
import { Lang } from "@/main/lib/dictionaries/dictionariesTypes";
import { ArticleCardType } from "@/main/lib/directus";
import { Theme, CardThemeStyles } from "@/main/components/ThemeSwitcher/themeTypes";

interface ImageProps {
  src: string;
  alt: string;
  aspectRatio: number;
}

interface BaseArticleCardProps {
  article: ArticleCardType;
  articleLink: string;
  dict: { common: { readMore: string } };
}

export interface CardStyles {
  common: CardThemeStyles;
  themeSensitive: Record<Theme, Partial<CardThemeStyles>>;
}

export interface HeroStyles {
  grid: {
    common: {
      outer: string;
      inner: string;
      promotedWrapper: string;
    };
    themeSensitive: Record<Theme, {
      outer: string;
      inner: string;
      promotedWrapper: string;
    }>;
  };
  cards: {
    common: CardThemeStyles;
    themeSensitive: Record<Theme, Partial<CardThemeStyles>>;
  };
}

export interface ArticleCardProps {
  slug: string;
  lang: Lang;
  authorSlug?: string;
  rubricSlug?: string;
  layout?: ArticleCardType['layout'];
  cardStyles?: CardStyles;
  theme?: Theme;
}

export interface ArticleCardVariantProps extends BaseArticleCardProps {
  formattedDate: string;
  imageProps: ImageProps | null;
  layout: ArticleCardType['layout'];
  lang: string;
  cardStyles?: CardStyles;
}

export interface NewsCardProps extends BaseArticleCardProps {
  formattedDate: string;
}

export interface AdvertisingCardProps extends BaseArticleCardProps {}

export interface StandardCardProps extends BaseArticleCardProps {
  formattedDate: string;
  imageProps: ImageProps | null;
  layout: 'regular' | 'latest' | 'promoted';
  lang: string;
}