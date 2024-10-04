// /frontend/src/main/components/ThemeSwitcher/themeActions.ts

'use server'

import { cookies } from 'next/headers'
import { ColorMode, ColorScheme, Theme } from './themeTypes';

export async function getTheme(): Promise<Theme> {
  const theme = cookies().get('theme')?.value as Theme;
  return theme && ['default', 'rounded', 'sharp'].includes(theme) ? theme : 'default';
}

export async function setTheme(theme: Theme): Promise<Theme> {
  cookies().set('theme', theme)
  return theme
}

export async function getColorMode(): Promise<ColorMode> {
  const colorMode = cookies().get('colorMode')?.value as ColorMode;
  return colorMode === 'dark' ? 'dark' : 'light';
}

export async function setColorMode(colorMode: ColorMode): Promise<ColorMode> {
  cookies().set('colorMode', colorMode)
  return colorMode
}

export async function getColorScheme(): Promise<ColorScheme> {
  const colorScheme = cookies().get('colorScheme')?.value as ColorScheme;
  return colorScheme && ['default', 'scheme1', 'scheme2'].includes(colorScheme) ? colorScheme : 'default';
}

export async function setColorScheme(colorScheme: ColorScheme): Promise<ColorScheme> {
  cookies().set('colorScheme', colorScheme)
  return colorScheme
}












