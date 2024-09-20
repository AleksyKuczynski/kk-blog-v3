// src/main/lib/dictionaries/types.ts

export interface NavigationTranslations {
  home: string;
  articles: string;
  authors: string;
  rubrics: string;
  search: string;
}

export interface FooterTranslations {
  quickLinks: string;
  about: string;
  contact: string;
  copyright: string;
  findWhatYouNeed: string;
  designedWithLove: string;
  visitKuKraft: string;
  clickForSurprise: string;
  poweredBy: string;
}

export interface CommonTranslations {
  readMore: string;
  loadMore: string;
  published: string;
  by: string;
  editorial: string;
  tableOfContents: string;
  loading: string;
}

export interface SearchTranslations {
  placeholder: string;
  noResults: string;
  results: string;
  resultsFor: string;
  pageTitle: string;
  pageDescription: string;
  relatedTo: string;
  submit: string;
  minCharacters: string;
}

export interface SortingTranslations {
  sortOrder: string;
  newest: string;
  oldest: string;
}

export interface FilterTranslations {
  reset: string;
}

export interface HomeTranslations {
  welcomeTitle: string;
  welcomeDescription: string;
  featuredArticles: string;
  noFeaturedArticles: string;
  exploreRubrics: string;
  viewAllRubrics: string;
}

export interface ArticlesTranslations {
  featuredArticles: string;
  noFeaturedArticles: string;
  allArticles: string;
  latestArticles: string;
}

export interface AuthorsTranslations {
  pageTitle: string;
  pageDescription: string;
  ourAuthors: string;
  noAuthorsFound: string;
  moreAuthorsToLoad: string;
}

export interface AuthorTranslations {
  noArticlesFound: string;
  articlesByAuthor: string;
  authorProfile: string;
  articlesWrittenBy: string;
}

export interface RubricsTranslations {
  allRubrics: string;
  featuredRubric: string;
  rubricList: string;
}

export interface CategoryTranslations {
  allCategories: string;
  selectCategory: string;
}

export interface SectionsTranslations {
  home: HomeTranslations;
  articles: ArticlesTranslations;
  authors: AuthorsTranslations;
  author: AuthorTranslations;
  rubrics: RubricsTranslations;
}

export interface Dictionary {
  navigation: NavigationTranslations;
  footer: FooterTranslations;
  common: CommonTranslations;
  search: SearchTranslations;
  sections: SectionsTranslations;
  sorting: SortingTranslations;
  filter: FilterTranslations;
  categories: CategoryTranslations;
}

export const DEFAULT_SEARCH_TRANSLATIONS: SearchTranslations = {
  placeholder: "Search articles...",
  noResults: "No results found",
  results: "Search Results",
  resultsFor: "Results for \"{query}\"",
  pageTitle: "Search",
  pageDescription: "Search for articles",
  relatedTo: "related to",
  submit: "Search",
  minCharacters: "Type at least 3 characters"
};

export type Lang = 'ru' | 'en' | 'fr' | 'pl';