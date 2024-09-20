// src/main/components/ArticleCards/interfaces.tsx

import { Lang } from "@/main/lib/dictionaries/types";
import { ArticleCardType } from "@/main/lib/directus";
import { CardThemeStyles } from "@/main/lib/themeUtils";


export interface ArticleCardProps {
  slug: string;
  lang: Lang;
  authorSlug?: string;
  rubricSlug?: string;
  layout?: ArticleCardType['layout'];
  cardStyles: CardStyles;
}

interface CardStyles {
  container: string;
  imageWrapper: string;
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
