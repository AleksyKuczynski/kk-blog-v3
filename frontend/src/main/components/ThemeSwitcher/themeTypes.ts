// src/main/lib/themeTypes.ts

export type Theme = 'default' | 'rounded' | 'sharp';
export type ColorMode = 'light' | 'dark';
export type ColorScheme = 'default' | 'scheme1' | 'scheme2';

export type ThemeKey = `${Theme}-${ColorMode}`;

export const allThemeKeys: ThemeKey[] = [
  'default-light', 'default-dark',
  'rounded-light', 'rounded-dark',
  'sharp-light', 'sharp-dark'
];

export interface ThemeState {
  theme: Theme;
  colorMode: ColorMode;
  colorScheme: ColorScheme;
}