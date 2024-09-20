// src/main/lib/utils.ts
import { ReadonlyURLSearchParams } from 'next/navigation';
import { fetchRubricSlug } from '@/main/lib/directus/index';

export interface TocItem {
  id: string;
  text: string;
}

export function generateToc(content: string): TocItem[] {
  const headings = content.match(/^## (.*$)/gm);
  if (!headings || headings.length === 0) return [];

  return headings.map((heading, index) => {
    const text = heading.replace('## ', '');
    const id = `heading-${index}`;
    return { id, text };
  });
}

export function smoothScrollTo(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

export function createSearchUrl(
  searchQuery: string, 
  searchParams: ReadonlyURLSearchParams, 
  baseUrl: string = '/search/'
): string {
  const currentSort = searchParams.get('sort') || 'desc';
  const currentCategory = searchParams.get('category') || '';
  
  const urlSearchParams = new URLSearchParams({
    search: searchQuery,
    sort: currentSort,
    category: currentCategory,
    page: '1'
  });

  return `${baseUrl}?${urlSearchParams.toString()}`;
}

export function generateArticleLink(
  rubricSlug: string,
  articleSlug: string, 
  lang: string
): string {
  return `/${lang}/${rubricSlug}/${articleSlug}`;
}

export async function generateArticleLinkAsync(
  articleSlug: string, 
  lang: string,
  authorSlug?: string
): Promise<string> {
  const rubricSlug = await fetchRubricSlug(articleSlug);

  if (!rubricSlug) {
    console.error(`Unable to generate link for article: ${articleSlug}`);
    return `/${lang}`; // Fallback to home page
  }

  const basePath = `/${lang}/${rubricSlug}/${articleSlug}`;
  
  if (authorSlug) {
    return `${basePath}?context=author&author=${authorSlug}`;
  }

  return basePath;
}