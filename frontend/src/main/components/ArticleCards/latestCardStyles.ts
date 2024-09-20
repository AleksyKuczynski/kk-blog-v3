// src/main/components/ArticleCards/latestCardStyles.ts
import { Theme } from '@/main/lib/actions';
import { CardThemeStyles } from '@/main/lib/themeUtils';

export const latestCardStyles: Record<Theme, CardThemeStyles> = {
  default: {
    container: 'bg-secondary text-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-md',
    contentWrapper: 'p-4',
    imageWrapper: 'relative overflow-hidden rounded-t-md',
    content: 'mt-4 space-y-2',
    title: 'text-xl font-semibold line-clamp-2 mb-2',
    date: 'text-xs opacity-80 mb-1',
    description: 'text-sm line-clamp-2 mb-3',
    readMore: 'text-xs font-semibold hover:underline transition-colors duration-200 flex items-center',
    image: 'transition-transform duration-300 group-hover:scale-105',
    authorWrapper: 'bg-white bg-opacity-20 p-2 rounded-b-md',
    authorLink: 'text-white hover:text-secondary-light text-xs sm:text-sm inline-block',
  },
  rounded: {
    container: 'bg-secondary text-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl',
    contentWrapper: 'p-6',
    imageWrapper: 'relative overflow-hidden rounded-t-xl',
    content: 'mt-6 space-y-3',
    title: 'text-2xl font-medium line-clamp-2 mb-3',
    date: 'text-sm opacity-90 mb-2',
    description: 'text-base line-clamp-2 mb-4',
    readMore: 'text-sm font-medium hover:underline transition-colors duration-200 flex items-center',
    image: 'transition-transform duration-300 group-hover:scale-105',
    authorWrapper: 'bg-white bg-opacity-20 p-3 rounded-b-xl',
    authorLink: 'text-white hover:text-secondary-light text-sm sm:text-base inline-block',
  },
  sharp: {
    container: 'bg-secondary text-white border border-secondary-dark transition-shadow duration-300',
    contentWrapper: 'p-3',
    imageWrapper: 'relative overflow-hidden',
    content: 'mt-3 space-y-1',
    title: 'text-lg font-bold uppercase line-clamp-2 mb-1',
    date: 'text-xs opacity-70 uppercase mb-1',
    description: 'text-xs line-clamp-2 mb-2',
    readMore: 'text-xs font-bold uppercase hover:underline transition-colors duration-200 flex items-center',
    image: 'transition-transform duration-300 group-hover:scale-105',
    authorWrapper: 'bg-white bg-opacity-20 p-2',
    authorLink: 'text-white hover:text-secondary-light text-xs uppercase inline-block',
  },
};