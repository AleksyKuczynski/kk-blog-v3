// src/main/lib/actions/getArticleCardData.ts
'use server'

import { Lang } from "../dictionaries/dictionariesTypes";
import { fetchArticleCard } from "../directus";

export async function getArticleCardData(slug: string, lang: Lang) {
  return await fetchArticleCard(slug, lang);
}
