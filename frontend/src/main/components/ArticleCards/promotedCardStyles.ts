// src/main/components/ArticleCards/promotedCardStyles.ts
import { Theme } from '@/main/lib/actions';
import { CardThemeStyles } from '@/main/lib/themeUtils';

export const promotedCardStyles: Record<Theme, CardThemeStyles> = {
  default: {
    container: `
      relative 
      h-full
      sm:max-lg:pb-6
    `,
    contentWrapper: `
      h-full
      flex flex-col
      sm:max-xl:grid grid-cols-3 lg:grid-cols-2 gap-4 2xl:gap-6
    `,
    imageWrapper: `
      w-full sm:max-md:h-full
      rounded-lg 
      aspect-[12/10] sm:max-lg:aspect-[11/12]
      shadow-md
      hover:shadow-xl
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
      rounded-lg
    `,
    content: `
      grow 
      space-y-2 xl:space-y-3 
      leading-loose 
      flex flex-col 
      sm:max-lg:col-span-2
      mx-4 sm:mx-0      
    `,
    title: `
      lg:max-xl:grow
      text-2xl lg:max-xl:text-3xl
      font-custom
      mb-2 
      transition-colors
      duration-600
    `,
    date: `
      sm:max-lg:grow
      text-xs lg:text-sm text-gray-500
    `,
    description: `
      xl:grow
      max-sm:hidden
      text-sm lg:text-base line-clamp-3 mb-4 
      transition-colors duration-600
    `,
    readMore: `
      sm:max-lg:grow 
      text-sm 
      font-medium text-primary hover:text-secondary-dark 
      transition-colors duration-200 
      flex justify-end items-end
    `,
    image: '',
    authorWrapper: `
    hidden
      bg-background-light bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-50 
      top-2 left-2 
      pb-1 px-3 
      rounded-md
    `,
    authorLink: `
      text-xs 
      sm:text-sm 
      inline-block 
      mr-1 
      last:mr-0 
      hover:text-primary
      dark:text-white 
      transition-colors 
      duration-200 

    `,
  },
  rounded: {
    container: `
      relative 
      h-full
      sm:max-lg:pb-6
    `,
    contentWrapper: `
      h-full
      flex flex-col
      sm:max-xl:grid grid-cols-3 lg:grid-cols-2
      border
      dark:border-neutral-800
      rounded-3xl 
      shadow-md
      hover:shadow-lg
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
      overflow-hidden
    `,
    imageWrapper: `
      w-full sm:max-xl:h-full
      aspect-[12/10] sm:max-xl:aspect-[11/12]
    `,
    content: `
      grow 
      space-y-2 xl:space-y-3 
      leading-loose 
      flex flex-col 
      sm:max-lg:col-span-2
      p-6      
    `,
    title: `
      lg:max-xl:grow
      text-2xl lg:text-4xl
      font-display
      mb-2 
      transition-colors
      duration-600
    `,
    date: `
      sm:max-lg:grow
      text-xs lg:text-sm text-gray-500
    `,
    description: `
      xl:grow
      max-sm:hidden
      text-sm lg:text-base line-clamp-3 mb-4 
      transition-colors duration-600
    `,
    readMore: `
      sm:max-lg:grow 
      text-sm 
      font-medium text-primary hover:text-secondary-dark 
      transition-colors duration-200 
      flex justify-end items-end
    `,
    image: '',
    authorWrapper: `
    hidden
      bg-background-light bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-50 
      top-2 left-2 
      pb-1 px-3 
      rounded-md
    `,
    authorLink: `
      text-xs 
      sm:text-sm 
      inline-block 
      mr-1 
      last:mr-0 
      hover:text-primary
      dark:text-white 
      transition-colors 
      duration-200 

    `,
  },
  sharp: {
    container: `
      relative 
      h-full
      sm:max-lg:pb-6
    `,
    contentWrapper: `
      h-full
      flex flex-col
      sm:max-xl:grid grid-cols-3 lg:grid-cols-2 gap-4 2xl:gap-6
    `,
    imageWrapper: `
      w-full sm:max-md:h-full
      aspect-[12/10] sm:max-lg:aspect-[11/12]
      shadow-md
      hover:shadow-xl
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
    `,
    content: `
      grow 
      space-y-2 xl:space-y-3 
      leading-loose 
      flex flex-col 
      sm:max-lg:col-span-2
      mx-4 sm:mx-0      
    `,
    title: `
      lg:max-xl:grow
      text-2xl lg:max-xl:text-3xl
      font-custom
      mb-2 
      transition-colors
      duration-600
    `,
    date: `
      sm:max-lg:grow
      text-xs lg:text-sm text-gray-500
    `,
    description: `
      xl:grow
      max-sm:hidden
      text-sm lg:text-base line-clamp-3 mb-4 
      transition-colors duration-600
    `,
    readMore: `
      sm:max-lg:grow 
      text-sm 
      font-medium text-primary hover:text-secondary-dark 
      transition-colors duration-200 
      flex justify-end items-end
    `,
    image: '',
    authorWrapper: `
    hidden
      bg-background-light bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-50 
      top-2 left-2 
      pb-1 px-3 
      rounded-md
    `,
    authorLink: `
      text-xs 
      sm:text-sm 
      inline-block 
      mr-1 
      last:mr-0 
      hover:text-primary
      dark:text-white 
      transition-colors 
      duration-200 

    `,
  },
};