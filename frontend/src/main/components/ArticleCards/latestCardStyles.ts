// src/main/components/ArticleCards/latestCardStyles.ts
import { Theme, CardThemeStyles } from "../ThemeSwitcher/themeTypes";

const commonStyles = {
  container: 'px-2 sm:px-0',
  contentWrapper: 'lg:h-full sm:max-lg:grid xl:grid grid-cols-3',
  imageWrapper: 'xl:h-full xl:aspect-[11/12]',
  content: 'col-span-2',
  title: '',
  date: 'sm:max-lg:grow xl:grow',
  description: '',
  readMore: 'xl:grow',
  image: '',
  authorWrapper: '',
  authorLink: '',
};

export const latestCardStyles: Record<Theme, CardThemeStyles> = {
  default: {
    ...commonStyles,
    imageWrapper: `
      ${commonStyles.imageWrapper}
      px-4
    `,
    title: `
      ${commonStyles.title}
      text-lg 2xl:text-xl
    `,
    readMore: `
      ${commonStyles.readMore}
      text-prcolor hover:text-prcolor-dark 
    `,
  },
  rounded: {
    ...commonStyles,
    content: `
      ${commonStyles.content}
      p-5
    `,
    title: `
      ${commonStyles.title}
      text-xl 2xl:text-2xl
      transition-colors
      duration-600
    `,
    readMore: `
      ${commonStyles.readMore}
      text-prcolor hover:text-prcolor-dark 
    `,
  },
  sharp: {
    ...commonStyles,
    contentWrapper: `
      ${commonStyles.contentWrapper}
      border-b-8 border-prcolor-light
    `,
    imageWrapper: `
      ${commonStyles.imageWrapper}
      px-4
    `,
    content: `
      ${commonStyles.content}
    `,
    title: `
      ${commonStyles.title}
      text-lg 2xl:text-xl
    `,
    readMore: `
      ${commonStyles.readMore}
      text-prcolor hover:text-prcolor-dark
      
    `,
  },
};