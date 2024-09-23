// src/main/components/ArticleCards/latestCardStyles.ts
import { Theme } from '@/main/lib/actions';
import { CardThemeStyles } from '@/main/lib/themeUtils';

export const latestCardStyles: Record<Theme, CardThemeStyles> = {
  default: {
    container: `
      relative 
      px-2 sm:px-0
    `,
    contentWrapper: `
      lg:h-full
      flex flex-col
      sm:max-lg:grid xl:grid grid-cols-3 gap-4 2xl:gap-6
    `,
    imageWrapper: `
      w-full sm:max-md:h-full xl:h-full
      px-4
      rounded-lg 
      aspect-[12/10] sm:max-lg:aspect-[11/12] xl:aspect-[11/12]
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
      col-span-2
      mx-4 sm:mx-0      
    `,
    title: `
      lg:max-xl:grow
      text-lg 2xl:text-xl
      font-custom
      mb-2 
      transition-colors
      duration-600
    `,
    date: `
      sm:max-lg:grow xl:grow
      text-xs lg:text-sm text-gray-500
    `,
    description: `
      max-sm:hidden
      text-sm lg:text-base line-clamp-3 
      mb-4 
      transition-colors duration-600
    `,
    readMore: `
      sm:max-lg:grow xl:grow
      text-sm 
      font-medium text-secondary hover:text-secondary-dark 
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
      px-2 sm:px-0
    `,
    contentWrapper: `
      lg:h-full
      flex flex-col
      sm:max-lg:grid xl:grid grid-cols-3
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
      w-full sm:max-md:h-full xl:h-full
      aspect-[12/10] sm:max-lg:aspect-[11/12] xl:aspect-[11/12]
    `,
    content: `
      grow 
      space-y-2 xl:space-y-3
      leading-loose 
      flex flex-col 
      col-span-2
      p-5
    `,
    title: `
      lg:max-xl:grow
      text-xl 2xl:text-2xl
      font-display
      mb-2 
      transition-colors
      duration-600
    `,
    date: `
      sm:max-lg:grow xl:grow
      text-xs lg:text-sm text-gray-500
    `,
    description: `
      max-sm:hidden
      text-sm lg:text-base line-clamp-3 
      mb-4 
      transition-colors duration-600
    `,
    readMore: `
      sm:max-lg:grow xl:grow
      text-sm 
      font-medium text-secondary hover:text-secondary-dark 
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
      px-2 sm:px-0
    `,
    contentWrapper: `
      lg:h-full
      flex flex-col
      sm:max-lg:grid xl:grid grid-cols-3 gap-4 2xl:gap-6
    `,
    imageWrapper: `
      w-full sm:max-md:h-full xl:h-full
      px-4
      aspect-[12/10] sm:max-lg:aspect-[11/12] xl:aspect-[11/12]
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
      col-span-2
      mx-4 sm:mx-0      
    `,
    title: `
      lg:max-xl:grow
      text-lg 2xl:text-xl
      font-custom
      mb-2 
      transition-colors
      duration-600
    `,
    date: `
      sm:max-lg:grow xl:grow
      text-xs lg:text-sm text-gray-500
    `,
    description: `
      max-sm:hidden
      text-sm lg:text-base line-clamp-3 
      mb-4 
      transition-colors duration-600
    `,
    readMore: `
      sm:max-lg:grow xl:grow
      text-sm 
      font-medium text-secondary hover:text-secondary-dark 
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