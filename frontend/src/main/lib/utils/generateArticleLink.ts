// src/main/lib/utils/generateArticleLink.ts
export function generateArticleLink(
  rubricSlug: string,
  articleSlug: string, 
  lang: string
): string {
  return `/${lang}/${rubricSlug}/${articleSlug}`;
}