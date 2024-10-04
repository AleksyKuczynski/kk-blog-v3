// src/main/components/Search/SearchPageWrapper.tsx
'use client';

import { SearchProvider } from './SearchContext';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import SearchInput from './SearchInput';

interface SearchPageWrapperProps {
  initialSearch: string;
  translations: SearchTranslations;
}

export default function SearchPageWrapper({ initialSearch, translations }: SearchPageWrapperProps) {
  return (
    <SearchProvider initialSearch={initialSearch} translations={translations}>
      <SearchInput 
        showButton={true} 
        translations={translations}
        isExpandable={false}
      />
    </SearchProvider>
  );
}