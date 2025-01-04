// src/main/components/ArticleCards/ArticleCard.tsx
import { Suspense } from 'react';
import { ArticleCardVariant } from './ArticleCardVariant';
import { getArticleCardData } from '@/main/lib/actions';
import { generateArticleLink, generateArticleLinkAsync } from '@/main/lib/utils';
import { getDictionary } from '@/main/lib/dictionaries';
import { ArticleCardProps } from './interfaces';
import { DIRECTUS_URL } from '@/main/lib/directus';
import { getTheme } from '../ThemeSwitcher';
import { IMAGE_RATIO } from '../mainConstants';


export default async function ArticleCard({ 
  slug, 
  lang, 
  authorSlug, 
  rubricSlug, 
  layout, 
  cardStyles,
}: ArticleCardProps) {
  const article = await getArticleCardData(slug, lang);
  const dict = await getDictionary(lang);
  const theme = await getTheme();

  if (!article || !article.translations[0]) {
    return null;
  }

  const translation = article.translations[0];
  const formattedDate = new Date(article.published_at).toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const articleLink = rubricSlug
    ? generateArticleLink(rubricSlug, slug, lang)
    : await generateArticleLinkAsync(slug, lang, authorSlug);

  const cardLayout = layout || article.layout || 'regular';

  const imageProps = article.article_heading_img ? {
    src: `${DIRECTUS_URL}/assets/${article.article_heading_img}`,
    alt: translation.title,
    aspectRatio: IMAGE_RATIO,
  } : null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleCardVariant
        article={article}
        formattedDate={formattedDate}
        articleLink={articleLink}
        dict={{ common: dict.common }}
        cardStyles={cardStyles}
        imageProps={imageProps}
        layout={cardLayout}
        lang={lang}
      />
    </Suspense>
  );
}