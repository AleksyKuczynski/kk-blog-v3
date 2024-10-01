// src/app/fonts/fonts.ts
import localFont from 'next/font/local'
import { Jost, Literata, Unbounded, Yeseva_One, Noto_Serif, PT_Serif, Roboto, Roboto_Slab, Montserrat } from 'next/font/google';

export const fontSans = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-sans',
});

export const fontSerif = Literata({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-serif',
});

export const fontDisplay = Yeseva_One({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
  variable: '--font-display',
});

export const fontCustom = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: '800',
  display: 'swap',
  variable: '--font-custom',
});

export const fontCustom__ = localFont({
  src: './local/Belarus.otf',
  variable: '--font-custom',
  display: 'swap',
});