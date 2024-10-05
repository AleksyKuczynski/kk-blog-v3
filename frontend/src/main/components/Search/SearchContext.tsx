// src/main/components/Search/SearchContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SearchContextType } from './types';
import { SearchTranslations } from '@/main/lib/dictionaries/types';

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
  initialSearch: string;
  translations: SearchTranslations;
  isExpandable?: boolean;
}

export function SearchProvider({ 
  children, 
  initialSearch = '', 
  translations,
  isExpandable = false
}: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isOpen, setIsOpen] = useState(!isExpandable);

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery,
    isOpen,
    setIsOpen,
    isExpandable,
    translations
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}