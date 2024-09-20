// src/main/components/SearchBar/SearchPageWrapper.tsx
'use client';

import { SearchProvider } from './SearchContext';
import SearchInput from './SearchInput';
import { SearchTranslations } from '@/main/lib/dictionaries/types';

interface SearchPageWrapperProps {
  initialSearch: string;
  translations: SearchTranslations;
}

export default function SearchPageWrapper({ initialSearch, translations }: SearchPageWrapperProps) {
  return (
    <SearchProvider initialSearch={initialSearch} translations={translations}>
      <SearchInput />
    </SearchProvider>
  );
}