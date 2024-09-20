// src/main/components/ArticleCards/promotedCardStyles.ts
import { Theme } from '@/main/lib/actions';
import { CardThemeStyles } from '@/main/lib/themeUtils';

export const promotedCardStyles: Record<Theme, CardThemeStyles> = {
  default: {
    container: 'bg-accent text-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg',
    contentWrapper: 'p-6',
    imageWrapper: 'relative overflow-hidden rounded-t-lg',
    content: 'mt-6 space-y-4',
    title: 'text-3xl font-bold line-clamp-2 mb-3',
    date: 'text-sm opacity-80 mb-2',
    description: 'text-base line-clamp-3 mb-4',
    readMore: 'text-sm font-semibold hover:underline transition-colors duration-200 flex items-center',
    image: 'transition-transform duration-300 group-hover:scale-105',
    authorWrapper: 'bg-white bg-opacity-20 p-3 rounded-b-lg',
    authorLink: 'text-white hover:text-accent-light text-sm sm:text-base inline-block',
  },
  rounded: {
    container: 'bg-accent text-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl',
    contentWrapper: 'p-8',
    imageWrapper: 'relative overflow-hidden rounded-t-2xl',
    content: 'mt-8 space-y-5',
    title: 'text-4xl font-semibold line-clamp-2 mb-4',
    date: 'text-base opacity-90 mb-3',
    description: 'text-lg line-clamp-3 mb-5',
    readMore: 'text-base font-medium hover:underline transition-colors duration-200 flex items-center',
    image: 'transition-transform duration-300 group-hover:scale-105',
    authorWrapper: 'bg-white bg-opacity-20 p-4 rounded-b-2xl',
    authorLink: 'text-white hover:text-accent-light text-base sm:text-lg inline-block',
  },
  sharp: {
    container: 'bg-accent text-white border-2 border-accent-dark transition-shadow duration-300',
    contentWrapper: 'p-5',
    imageWrapper: 'relative overflow-hidden',
    content: 'mt-5 space-y-3',
    title: 'text-2xl font-extrabold uppercase line-clamp-2 mb-2',
    date: 'text-xs opacity-70 uppercase mb-1',
    description: 'text-sm line-clamp-3 mb-3',
    readMore: 'text-xs font-bold uppercase hover:underline transition-colors duration-200 flex items-center',
    image: 'transition-transform duration-300 group-hover:scale-105',
    authorWrapper: 'bg-white bg-opacity-20 p-2',
    authorLink: 'text-white hover:text-accent-light text-xs uppercase inline-block',
  },
};