// src/main/components/ArticleCards/regularCardStyles.ts
import { Theme } from '@/main/lib/actions';
import { CardThemeStyles } from '@/main/lib/themeUtils';

const baseStyles = {
  container: `
    relative 
    overflow-hidden
    bg-background-light 
    dark:bg-neutral-900 
    

  `,
}

export const regularCardStyles: Record<Theme, CardThemeStyles> = {
  default: {
    container: `
      ${baseStyles.container}
      shadow-sm
      hover:shadow-md
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
      rounded-lg
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
      text-lg lg:text-xl
      max-sm:font-sans
      max-sm:font-semibold
      font-display 
      line-clamp-3 
      mb-2 
      transition-colors
      duration-600
    `,
    date: 'text-xs lg:text-sm text-gray-500',
    description: `
      max-sm:hidden
      text-sm lg:text-base line-clamp-3 mb-4 
      transition-colors duration-600
    `,
    readMore: `
          hidden

      grow 
      text-xs lg:text-sm 
      font-medium text-secondary hover:text-secondary-dark 
      transition-colors duration-200 
      flex justify-end items-end
    `,
    image: '',
    authorWrapper: `
    hidden
      bg-background-light bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-50 
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
      hover:text-primary
      dark:text-white 
      transition-colors 
      duration-200 

    `,
  },
  rounded: {
    container: `
      ${baseStyles.container}
      shadow-sm
      hover:shadow-md
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
      rounded-3xl
    `,
    contentWrapper: `
      lg:h-full
      flex flex-col 
      sm:max-lg:grid xl:grid grid-cols-3
      p-2
    `,
    imageWrapper: `
      relative
      rounded-2xl 
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
      text-lg lg:text-xl
      max-sm:font-sans
      max-sm:font-semibold
      font-display 
      line-clamp-3 
      mb-2 
    `,
    date: 'text-xs lg:text-sm text-gray-500',
    description: `
      max-sm:hidden
      text-sm lg:text-base line-clamp-3 mb-4 
      transition-colors duration-600
    `,
    readMore: `
          hidden

      grow 
      text-xs lg:text-sm 
      font-medium text-secondary hover:text-secondary-dark 
      transition-colors duration-200 
      flex justify-end items-end
    `,
    image: '',
    authorWrapper: `
    hidden
      bg-background-light bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-50 
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
      hover:text-primary
      dark:text-white 
      transition-colors 
      duration-200 

    `,
  },
  sharp: {
    container: `
      ${baseStyles.container}
      shadow-sm
      hover:shadow-md
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
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
      text-xl
      max-sm:font-sans
      font-bold
      line-clamp-3 
      mb-2 
      transition-colors
      duration-600
    `,
    date: 'text-xs lg:text-sm text-gray-500',
    description: `
      max-sm:hidden
      text-sm lg:text-base line-clamp-3 mb-4 
      transition-colors duration-600
    `,
    readMore: `
          hidden

      grow 
      text-xs lg:text-sm 
      font-medium text-secondary hover:text-secondary-dark 
      transition-colors duration-200 
      flex justify-end items-end
    `,
    image: '',
    authorWrapper: `
    hidden
      bg-background-light bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-50 
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
      hover:text-primary
      dark:text-white 
      transition-colors 
      duration-200 

    `,
  },
};