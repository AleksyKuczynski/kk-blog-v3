// src/main/components/Footer/SearchSection.tsx
import React from 'react';
import SearchBarWrapper from '@/main/components/Search/SearchBarWrapper';
import { Lang, SearchTranslations } from '@/main/lib/dictionaries/types';

interface SearchSectionProps {
    lang: Lang;
    translations: {
      title: string;
    };
    searchTranslations: SearchTranslations;
  }

export default function SearchSection({ lang, translations, searchTranslations }: SearchSectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">{translations.title}</h3>
      <SearchBarWrapper translations={searchTranslations} />
    </div>
  );
}