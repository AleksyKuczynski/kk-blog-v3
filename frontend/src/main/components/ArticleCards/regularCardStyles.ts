// src/main/components/ArticleCards/regularCardStyles.ts
import { Theme, CardThemeStyles } from "../ThemeSwitcher/themeTypes";

const commonStyles = {
  container: `
    relative 
    overflow-hidden
    bg-sf-cont 
  `,
  contentWrapper: `
    lg:h-full
    flex flex-col 
    sm:max-lg:grid xl:grid grid-cols-3
  `,
  imageWrapper: `
    relative 
    w-full sm:max-md:h-full xl:h-full
    overflow-hidden 
    aspect-[12/10] sm:max-lg:aspect-[11/12] xl:aspect-[11/12]
  `,
  content: `
    grow 
    p-4 
    space-y-2 
    flex flex-col 
    col-span-2
    mb-1
  `,
  title: `
    line-clamp-3 
    mb-2 
    transition-colors
    duration-600
  `,
  date: 'text-xs lg:text-sm text-on-sf-var',
  description: `
    max-sm:hidden
    text-sm lg:text-base line-clamp-3 mb-4 
    transition-colors duration-600
  `,
  readMore: `
    grow 
    text-xs lg:text-sm 
    font-medium 
    transition-colors duration-200 
    flex justify-end items-end
  `,
  image: '',
  authorWrapper: `
    hidden
    bg-sf-cont bg-opacity-80
    top-2 left-2 
    py-1 px-3 
    rounded-md
  `,
  authorLink: `
    text-xs 
    sm:text-sm 
    inline-block 
    mr-1 
    last:mr-0 
    hover:text-pr-fix
    transition-colors 
    duration-200 
  `,
};

export const regularCardStyles: Record<Theme, CardThemeStyles> = {
  default: {
    ...commonStyles,
    container: `
      ${commonStyles.container}
      shadow-sm
      hover:shadow-md
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
      rounded-lg
    `,
    title: `
      ${commonStyles.title}
      text-lg lg:text-xl
      max-sm:font-sans
      max-sm:font-semibold
      font-display 
    `,
    readMore: `
      ${commonStyles.readMore}
      text-pr-cont hover:text-pr-fix 
    `,
  },
  rounded: {
    ...commonStyles,
    container: `
      ${commonStyles.container}
      border
      border-ol-var
      shadow-sm
      hover:shadow-md
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
      rounded-2xl
    `,
    contentWrapper: `
      ${commonStyles.contentWrapper}
      p-0
    `,
    imageWrapper: `
      ${commonStyles.imageWrapper}
      rounded-xl 
    `,
    title: `
      ${commonStyles.title}
      text-lg lg:text-xl
      max-sm:font-sans
      max-sm:font-semibold
      font-display 
    `,
    readMore: `
      ${commonStyles.readMore}
      text-pr-cont hover:text-pr-fix 
    `,
  },
  sharp: {
    ...commonStyles,
    container: `
      ${commonStyles.container}
      border
      border-ol-var
      p-2
      shadow-sm
      hover:shadow-md
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
    `,
    title: `
      ${commonStyles.title}
      text-xl
      max-sm:font-sans
      font-bold
    `,
    readMore: `
      ${commonStyles.readMore}
      text-pr-cont hover:text-pr-fix
    `,
  },
};