// src/main/components/SearchBar/SearchBarWrapper.tsx
'use client';

import { SearchProvider } from './SearchContext';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import SearchInput from './SearchInput';
import { useTheme } from '@/main/components/ThemeContext';

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
  const { currentTheme } = useTheme();

  const wrapperClasses = `
    w-full
    ${currentTheme === 'rounded' ? 'rounded-full' : currentTheme === 'sharp' ? 'rounded-none' : 'rounded-md'}
  `;

  return (
    <SearchProvider initialSearch={initialSearch} translations={translations}>
      <SearchInput 
        className={wrapperClasses} 
        showButton={showButton} 
        translations={translations}
      />
    </SearchProvider>
  );
}