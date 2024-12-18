// src/main/lib/actions/getArticlePageData.ts
'use server'

import { getDictionary } from "../dictionaries";
import { Lang } from "../dictionaries/types";
import { AuthorDetails, fetchAllRubrics, fetchAuthorBySlug, fetchAuthorsForArticle, fetchFullArticle, fetchRubricDetails } from "../directus";
import { processContent } from "../markdown/processContent";

export async function getArticlePageData(params: { rubric: string, slug: string, lang: Lang }, searchParams: { author?: string }) {
  const [article, dict, rubrics, rubricDetails] = await Promise.all([
    fetchFullArticle(params.slug, params.lang),
    getDictionary(params.lang),
    fetchAllRubrics(params.lang),
    fetchRubricDetails(params.rubric, params.lang)
  ]);

  if (!article || !rubricDetails) {
    return null;
  }

  const authorDetails: AuthorDetails[] = await fetchAuthorsForArticle(params.slug, params.lang);
  const translation = article.translations.find(t => t.languages_code === params.lang) || article.translations[0];
  const rubricName = rubricDetails.translations.find(t => t.languages_code === params.lang)?.name || params.rubric;

  let breadcrumbItems;
  if (searchParams.author) {
    const author = await fetchAuthorBySlug(searchParams.author, params.lang);
    breadcrumbItems = [
      { label: dict.sections.authors.ourAuthors, href: `/${params.lang}/authors` },
      { label: author?.name || searchParams.author, href: `/${params.lang}/authors/${searchParams.author}` },
      { label: translation.title, href: `/${params.lang}/${params.rubric}/${params.slug}?context=author&author=${searchParams.author}` },
    ];
  } else {
    breadcrumbItems = [
      { label: dict.sections.rubrics.allRubrics, href: `/${params.lang}/rubrics` },
      { label: rubricName, href: `/${params.lang}/${params.rubric}` },
      { label: translation.title, href: `/${params.lang}/${params.rubric}/${params.slug}` },
    ];
  }

  const rubricBasics = rubrics.map(r => ({
    slug: r.slug,
    name: r.translations.find(t => t.languages_code === params.lang)?.name || r.slug
  }));

  const formattedDate = new Intl.DateTimeFormat(params.lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(article.published_at));

  const articleContent = translation.article_body.map((block: any) => block.item.content).join('\n');
  const processedContent = await processContent(articleContent);

  return {
    article: {
      ...article,
      authors: authorDetails,
    },
    translation,
    breadcrumbItems,
    rubricBasics,
    formattedDate,
    processedContent,
    dict,
  };
}