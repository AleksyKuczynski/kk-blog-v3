// src/app/fonts/fonts.ts
import { Jost, Literata, Unbounded, Yeseva_One } from 'next/font/google'

export const fontSans = Jost({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-sans',
})

export const fontSerif = Literata({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-serif',
})

export const fontDisplay = Yeseva_One({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
  variable: '--font-display',
})

export const fontCustom = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: '800',
  display: 'swap',
  variable: '--font-custom',
})