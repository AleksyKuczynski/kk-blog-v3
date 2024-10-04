// src/main/components/ThemeSwitcher/theme.ts

export type ThemeGeometry = 'default' | 'rounded' | 'sharp';
export type ColorMode = 'light' | 'dark';

export interface Theme {
  geometry: ThemeGeometry;
  mode: ColorMode;
}

export type ThemeKey = `${ThemeGeometry}-${ColorMode}`;

export const allThemeKeys: ThemeKey[] = [
  'default-light', 'default-dark',
  'rounded-light', 'rounded-dark',
  'sharp-light', 'sharp-dark'
];

export function parseTheme(themeString: ThemeKey): Theme {
  const [geometry, mode] = themeString.split('-') as [ThemeGeometry, ColorMode];
  return { geometry, mode };
}

export function combineTheme(theme: Theme): ThemeKey {
  return `${theme.geometry}-${theme.mode}`;
}

export function isValidTheme(theme: unknown): theme is ThemeKey {
  return typeof theme === 'string' && allThemeKeys.includes(theme as ThemeKey);
}