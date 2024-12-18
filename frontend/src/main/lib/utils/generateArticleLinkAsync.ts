// src/main/lib/utils/generateArticleLinkAsync.ts
import { fetchRubricSlug } from "../directus";

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