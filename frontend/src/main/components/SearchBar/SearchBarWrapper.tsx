// src/main/components/SearchBar/SearchBarWrapper.tsx
'use client';

import { SearchProvider } from './SearchContext';
import SearchInput from './SearchInput';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { useTheme } from '@/main/components/ThemeContext';

interface SearchBarWrapperProps {
  initialSearch?: string;
  translations: SearchTranslations;
}

export default function SearchBarWrapper({ initialSearch = '', translations }: SearchBarWrapperProps) {
  const { currentTheme } = useTheme();

  return (
    <SearchProvider initialSearch={initialSearch} translations={translations}>
      <SearchInput />
    </SearchProvider>
  );
}