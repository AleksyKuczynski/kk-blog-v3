// src/main/components/ArticleCards/interfaces.tsx

import { Lang } from "@/main/lib/dictionaries/types";
import { ArticleCardType } from "@/main/lib/directus";
import { Theme, CardThemeStyles } from "../ThemeSwitcher/themeTypes";

interface GridStyles {
  outer: string;
  inner: string;
  promotedWrapper: string;
}

export interface CardStyles {
  common: CardThemeStyles;
  themeSensitive: Record<Theme, CardThemeStyles>;
}

export interface HeroStyles {
  grid: {
    common: GridStyles;
    themeSensitive: Record<Theme, GridStyles>;
  };
  cards: CardStyles;
}

export interface ArticleCardProps {
  slug: string;
  lang: Lang;
  authorSlug?: string;
  rubricSlug?: string;
  layout?: ArticleCardType['layout'];
  cardStyles: CardStyles;
  theme: Theme;
}

interface ImageProps {
  src: string;
  alt: string;
  aspectRatio: number;
}

interface BaseArticleCard {
  article: ArticleCardType;
  articleLink: string;
  lang: string;
  dict: { common: { readMore: string } };
}

export interface ArticleCardVariantProps extends BaseArticleCard {
  formattedDate: string;
  cardStyles: CardStyles;
  imageProps: ImageProps | null;
  layout: ArticleCardType['layout'];
}

export interface NewsCardProps extends BaseArticleCard {
  formattedDate: string;
  themeClasses: CardThemeStyles;
}

export interface AdvertisingCardProps extends BaseArticleCard {
  themeClasses: CardThemeStyles;
}

export interface StandardCardProps extends BaseArticleCard {
  formattedDate: string;
  themeClasses: CardThemeStyles;
  imageProps: ImageProps | null;
}
