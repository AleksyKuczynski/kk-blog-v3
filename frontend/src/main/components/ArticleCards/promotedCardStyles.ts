// src/main/components/ArticleCards/promotedCardStyles.ts
import { Theme, CardThemeStyles } from "../ThemeSwitcher/themeTypes";

const commonStyles = {
  container: 'h-full sm:max-lg:pb-6',
  contentWrapper: 'h-full sm:max-xl:grid grid-cols-3 lg:grid-cols-2',
  imageWrapper: '',
  content: 'sm:max-lg:col-span-2',
  title: 'text-2xl lg:max-xl:text-3xl',
  date: 'sm:max-lg:grow',
  description: 'xl:grow',
  readMore: '',
  image: '',
  authorWrapper: '',
  authorLink: '',
};

export const promotedCardStyles: Record<Theme, CardThemeStyles> = {
  default: {
    ...commonStyles,
    readMore: `
      ${commonStyles.readMore}
      text-accolor hover:text-accolor-dark
    `,
  },
  rounded: {
    ...commonStyles,
    imageWrapper: `
      ${commonStyles.imageWrapper}
      sm:max-xl:h-full
    `,
    content: `
      ${commonStyles.content}
      p-6      
    `,
    title: `
      ${commonStyles.title}
      lg:text-4xl
    `,
    readMore: `
      ${commonStyles.readMore}
      text-accolor hover:text-accolor-dark 
    `,
  },
  sharp: {
    ...commonStyles,
    contentWrapper: `
      ${commonStyles.contentWrapper}
    `,
    imageWrapper: `
      ${commonStyles.imageWrapper}
    `,
    content: `
      ${commonStyles.content}
    `,
    title: `
      ${commonStyles.title}
    `,
    readMore: `
      ${commonStyles.readMore}
      text-prcolor hover:text-prcolor-dark
       
    `,
  },
};