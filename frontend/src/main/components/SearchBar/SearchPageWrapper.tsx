// src/main/components/SearchBar/SearchPageWrapper.tsx
'use client';

import { SearchProvider } from './SearchContext';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import SearchInput from './SearchInput';
import { useTheme } from '@/main/components/ThemeContext';

interface SearchPageWrapperProps {
  initialSearch: string;
  translations: SearchTranslations;
}

export default function SearchPageWrapper({ initialSearch, translations }: SearchPageWrapperProps) {
  const { currentTheme } = useTheme();

  const wrapperClasses = `
    w-full h-12
    ${currentTheme === 'rounded' ? 'rounded-full' : currentTheme === 'sharp' ? 'rounded-none' : 'rounded-md'}
  `;

  return (
    <SearchProvider initialSearch={initialSearch} translations={translations}>
      <SearchInput 
        className={wrapperClasses} 
        showButton={true} 
        translations={translations}
        isExpandable={false}
      />
    </SearchProvider>
  );
}