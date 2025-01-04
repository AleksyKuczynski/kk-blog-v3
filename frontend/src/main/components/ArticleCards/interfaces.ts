// /frontend/src/main/components/ArticleCards/interfaces.ts
import { Lang } from "@/main/lib/dictionaries/dictionariesTypes";
import { ArticleCardType } from "@/main/lib/directus";

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

export interface ArticleCardProps {
  slug: string;
  lang: Lang;
  authorSlug?: string;
  rubricSlug?: string;
  layout?: ArticleCardType['layout'];
}

export interface ArticleCardVariantProps extends BaseArticleCardProps {
  formattedDate: string;
  imageProps: ImageProps | null;
  layout: ArticleCardType['layout'];
  lang: string;
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