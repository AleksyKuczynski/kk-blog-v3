// src/main/lib/dictionaries.ts
import 'server-only'
import { Dictionary, Lang } from './dictionaries/dictionariesTypes';

const dictionaries = {
  ru: () => import('./dictionaries/ru.json').then((module) => module.default as Dictionary),
  en: () => import('./dictionaries/en.json').then((module) => module.default as Dictionary),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default as Dictionary),
  pl: () => import('./dictionaries/pl.json').then((module) => module.default as Dictionary),
} as const;

export const getDictionary = async (locale: Lang) => dictionaries[locale]();