// src/main/components/ThemeSwitcher/themeUtils.ts

import { Theme } from '../../lib/actions';

export type CardThemeStyles = {
  container: string;
  imageWrapper: string;
  image: string;
  contentWrapper: string;
  content: string;
  title: string;
  date: string;
  description: string;
  readMore: string;
  authorWrapper: string;  // Add this line
  authorLink: string;     // Add this line
};

export function getCardThemeClasses(theme: Theme, styles: Record<Theme, CardThemeStyles>) {
  return Object.entries(styles[theme]).reduce((acc, [key, value]) => {
    acc[key as keyof CardThemeStyles] = value;
    return acc;
  }, {} as CardThemeStyles);
}