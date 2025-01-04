// src/main/lib/themeTypes.ts

import { ColorsTranslations, ThemesTranslations } from "@/main/lib/dictionaries/dictionariesTypes";

export type Theme = 'default' | 'rounded' | 'sharp';
export type ColorMode = 'light' | 'dark';
export type ColorScheme = 'default' | 'scheme1' | 'scheme2';

export type ThemeKey = `${Theme}-${ColorMode}`;

export interface ThemeState {
  theme: Theme;
  colorMode: ColorMode;
  colorScheme: ColorScheme;
}

export interface CardThemeStyles {
  container?: string;
  contentWrapper?: string;
  imageWrapper?: string;
  image?: string;
  content?: string;
  title?: string;
  date?: string;
  description?: string;
  readMore?: string;
  authorWrapper?: string;
  authorLink?: string;   
};

export interface ThemeSwitcherProps {
  themeTranslations: ThemesTranslations;
  colorTranslations: ColorsTranslations;
  context?: 'mobile' | 'desktop';
}