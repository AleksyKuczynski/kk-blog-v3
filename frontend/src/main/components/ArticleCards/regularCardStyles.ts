// src/main/components/ArticleCards/regularCardStyles.ts
import { Theme } from '@/main/lib/actions';
import { CardThemeStyles } from '@/main/lib/themeUtils';

const baseStyles = {
  container: `
    relative 
    overflow-hidden
    bg-background-light 
    dark:bg-neutral-900 
    transition-shadow
    
  `,
}

export const regularCardStyles: Record<Theme, CardThemeStyles> = {
  default: {
    container: `
      ${baseStyles.container}
      shadow-sm
      hover:shadow-md
      dark:hover:shadow-[0px_5px_15px_5px_rgba(255,255,255,0.2)]
      rounded-lg
    `,
    contentWrapper: `
      lg:h-full
      flex flex-col sm:max-md:grid xl:grid grid-cols-3
    `,
    imageWrapper: `
      relative 
      w-full sm:h-full
      overflow-hidden 
      aspect-[11/12]
    `,
    content: `
      grow 
      p-4 
      space-y-2 
      flex flex-col 
      col-span-2
    `,
    title: `
      text-lg lg:text-xl
      font-display 
      line-clamp-2
      sm:line-clamp-3 
      mb-2 
      transition-colors
      duration-600
    `,
    date: 'text-xs lg:text-sm text-gray-500',
    description: 'text-sm lg:text-base line-clamp-3 mb-4 transition-colors duration-600',
    readMore: 'grow text-xs lg:text-sm font-medium text-secondary hover:text-secondary-dark transition-colors duration-200 flex justify-end items-end',
    image: '',
    authorWrapper: 'bg-secondary bg-opacity-80 top-2 left-2 py-1 px-3 rounded-md',
    authorLink: `
      text-xs 
      sm:text-sm 
      inline-block 
      mr-1 
      last:mr-0 
      hover:text-white
      dark:text-white 
      dark:hover:text-primary
      transition-colors 
      duration-200 

    `,
  },
  rounded: {
    container: 'bg-background-light shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl',
    contentWrapper: 'p-6',
    imageWrapper: 'relative overflow-hidden rounded-t-xl',
    content: 'mt-6 space-y-3',
    title: 'text-2xl font-semibold line-clamp-2 mb-2',
    date: 'text-base text-gray-600 mb-2',
    description: 'text-base line-clamp-3 mb-4',
    readMore: 'text-base font-medium text-primary hover:text-primary-dark transition-colors duration-200 flex items-center',
    image: 'transition-transform duration-300 group-hover:scale-105',
    authorWrapper: 'bg-white bg-opacity-75 p-3 rounded-b-xl',
    authorLink: 'text-primary hover:text-primary-dark text-sm sm:text-base inline-block',
  },
  sharp: {
    container: 'bg-background-light border border-gray-200 transition-shadow duration-300',
    contentWrapper: 'p-4',
    imageWrapper: 'relative overflow-hidden',
    content: 'mt-4 space-y-2',
    title: 'text-lg font-bold uppercase line-clamp-2 mb-1',
    date: 'text-xs text-gray-700 uppercase mb-1',
    description: 'text-sm line-clamp-3 mb-3',
    readMore: 'text-xs font-bold text-primary hover:text-primary-dark uppercase transition-colors duration-200 flex items-center',
    image: 'transition-transform duration-300 group-hover:scale-105',
    authorWrapper: 'bg-white bg-opacity-75 p-2',
    authorLink: 'text-primary hover:text-primary-dark text-xs uppercase inline-block',
  },
};