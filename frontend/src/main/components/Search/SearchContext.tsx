// src/main/components/Search/SearchContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SearchTranslations } from '@/main/lib/dictionaries/types';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isExpandable: boolean;
  translations: SearchTranslations;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ 
  children, 
  initialSearch = '', 
  translations,
  isExpandable = false
}: { 
  children: ReactNode; 
  initialSearch?: string;
  translations: SearchTranslations;
  isExpandable?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isOpen, setIsOpen] = useState(!isExpandable);

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      isOpen, 
      setIsOpen, 
      isExpandable,
      translations 
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}