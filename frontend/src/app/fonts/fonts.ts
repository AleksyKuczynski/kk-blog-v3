// src/app/fonts/fonts.ts
import localFont from 'next/font/local'
import { Jost, Literata, Unbounded, Oswald, Bona_Nova, Noto_Serif, PT_Serif, Roboto_Serif, Roboto_Slab } from 'next/font/google';

export const fontSans = Jost({
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

export const fontDisplay = PT_Serif({
  subsets: ['latin', 'cyrillic'],
  weight: '700',
  display: 'swap',
  variable: '--font-display',
});

export const fontCustom = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: '800',
  display: 'swap',
  variable: '--font-custom',
});

export const fontCumbersome = localFont({
  src: './local/PF-Expo.otf',
  variable: '--font-cumbersome',
  display: 'swap',
});