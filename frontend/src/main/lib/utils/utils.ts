// src/main/lib/utils/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ThemeStyles = {
  base?: string;
  default?: string;
  rounded?: string;
  sharp?: string;
};

export function createThemeStyles(styles: ThemeStyles): string {
  const { base = '', default: defaultStyles = '', rounded = '', sharp = '' } = styles;
  
  return cn(
    base,
    defaultStyles.split(' ').map(s => `theme-default:${s}`).join(' '),
    rounded.split(' ').map(s => `theme-rounded:${s}`).join(' '),
    sharp.split(' ').map(s => `theme-sharp:${s}`).join(' ')
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}