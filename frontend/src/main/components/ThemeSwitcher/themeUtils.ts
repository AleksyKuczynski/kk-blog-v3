// src/main/components/ThemeSwitcher/themeUtils.ts

import { allThemeKeys, ColorMode, Theme, ThemeKey } from "./themeTypes";

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
  authorWrapper: string;
  authorLink: string;   
};

export function getCardThemeClasses(theme: Theme, styles: Record<Theme, CardThemeStyles>) {
  return Object.entries(styles[theme]).reduce((acc, [key, value]) => {
    acc[key as keyof CardThemeStyles] = value;
    return acc;
  }, {} as CardThemeStyles);
}


export function parseTheme(themeString: ThemeKey): { geometry: Theme; mode: ColorMode } {
  const [geometry, mode] = themeString.split('-') as [Theme, ColorMode];
  return { geometry, mode };
}

export function combineTheme(theme: Theme, mode: ColorMode): ThemeKey {
  return `${theme}-${mode}` as ThemeKey;
}

export function isValidTheme(theme: unknown): theme is ThemeKey {
  return typeof theme === 'string' && allThemeKeys.includes(theme as ThemeKey);
}

export function getSchemeColors(scheme: string) {
  const styles = getComputedStyle(document.documentElement);
  const colorSchemes = JSON.parse(styles.getPropertyValue('--color-schemes').replace(/'/g, '"'));
  
  return {
    accolor: colorSchemes[scheme].accent,
    prcolor: colorSchemes[scheme].primary
  };
}