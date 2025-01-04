// src/main/lib/directus/fetchArticleCard.ts

import { ArticleCardType, DIRECTUS_URL } from "./index";
import { Lang } from '@/main/lib/dictionaries/dictionariesTypes';
import { fetchAuthorsForArticle } from './fetchAuthorsForArticle';

const API_TOKEN = process.env.DIRECTUS_API_TOKEN;

export async function fetchArticleCard(slug: string, lang: Lang): Promise<ArticleCardType | null> {
  try {
    const fields = [
      'slug',
      'status',
      'layout',
      'published_at',
      'external_link',
      'article_heading_img',
      'rubric_slug',
      'translations.languages_code',
      'translations.title',
      'translations.description'
    ].join(',');

    const filter = encodeURIComponent(JSON.stringify({ slug: { _eq: slug } }));
    const deepFilter = encodeURIComponent(JSON.stringify({
      translations: {
        _filter: {
          languages_code: { _eq: lang }
        }
      }
    }));

    const url = `${DIRECTUS_URL}/items/articles?fields=${fields}&filter=${filter}&deep=${deepFilter}`;

    const response = await fetch(url, {
      headers: API_TOKEN ? { 'Authorization': `Bearer ${API_TOKEN}` } : undefined,
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch article card. Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      console.log(`fetchArticleCard: No data found for slug: ${slug}`);
      return null;
    }

    const article = data.data[0];
    if (!article.translations || article.translations.length === 0) {
      console.log(`fetchArticleCard: No translation found for ${slug} in language ${lang}.`);
      return null;
    }

    const translation = article.translations[0];

    // Fetch authors
    const authors = await fetchAuthorsForArticle(slug, lang);

    const articleCard: ArticleCardType = {
      slug: article.slug,
      status: article.status,
      layout: article.layout,
      published_at: article.published_at,
      external_link: article.external_link,
      article_heading_img: article.article_heading_img,
      rubric_slug: article.rubric_slug,
      translations: [{
        languages_code: translation.languages_code,
        title: translation.title,
        description: translation.description
      }],
      authors: authors.length > 0 ? authors : [{ name: 'Editorial Team', slug: '' }],
      link: `/${lang}/${article.rubric_slug?.slug || 'articles'}/${article.slug}`
    };

    return articleCard;
  } catch (error) {
    console.error(`Error in fetchArticleCard for slug ${slug}:`, error);
    return null;
  }
}