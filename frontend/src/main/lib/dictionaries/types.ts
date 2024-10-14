// src/main/lib/dictionaries/types.ts

export interface NavigationTranslations {
  home: string;
  articles: string;
  authors: string;
  rubrics: string;
  search: string;
}

export interface FooterTranslations {
  about: {
    title: string;
    description: string;
    companyDescription: string;
  };
  quickLinks: {
    title: string;
  };
  contact: {
    title: string;
    emailUs: string;
    faq: string;
    helpCenter: string;
    form: {
      button: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      sendButton: string;
    };
  };
  socialLinks: {
    title: string;
    description: string;
    facebook: string;
    twitter: string;
    instagram: string;
    vk: string;
    telegram: string;
    whatsapp: string;
  };
  newsletter: {
    title: string;
    placeholder: string;
    submitButton: string;
    successMessage: string;
  };
  feedback: {
    title: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
  };
  search: {
    title: string;
  };
  kuKraft: {
    designedWithLove: string;
    visitKuKraft: string;
  };
  surprise: {
    clickForSurprise: string;
  };
  credentials: {
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
  };
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
  searching: string;
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

export interface CategoriesTranslations {
  allCategories: string;
  noArticlesFound: string;
}

export interface RubricsTranslations {
  allRubrics: string;
  featuredRubric: string;
  rubricList: string;
}

export interface CategoryTranslations {
  categories: string;
  allCategories: string;
  selectCategory: string;
}

export interface SectionsTranslations {
  home: HomeTranslations;
  articles: ArticlesTranslations;
  authors: AuthorsTranslations;
  author: AuthorTranslations;
  categories: CategoriesTranslations;
  rubrics: RubricsTranslations;
}

export interface ThemesTranslations {
  name: string;
  default: string;
  rounded: string;
  sharp: string;
}

export interface ColorsTranslations {
  name: string;
  default: string;
  scheme1: string;
  scheme2: string;
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
  themes: ThemesTranslations;
  colors: ColorsTranslations;
}

export const DEFAULT_SEARCH_TRANSLATIONS: SearchTranslations = {
  placeholder: "Search articles...",
  searching: "Searching...",
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