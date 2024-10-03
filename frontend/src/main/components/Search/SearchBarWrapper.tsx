// src/main/components/SearchBar/SearchBarWrapper.tsx
'use client';

import { SearchProvider } from './SearchContext';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import SearchInput from './SearchInput';

interface SearchBarWrapperProps {
  initialSearch?: string;
  translations: SearchTranslations;
  showButton?: boolean;
}

export default function SearchBarWrapper({ 
  initialSearch = '', 
  translations, 
  showButton = true,
}: SearchBarWrapperProps) {

  return (
    <SearchProvider initialSearch={initialSearch} translations={translations}>
      <SearchInput 
        showButton={showButton} 
        translations={translations}
      />
    </SearchProvider>
  );
}