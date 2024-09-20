// src/main/components/SearchBar/SearchContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SearchTranslations } from '@/main/lib/dictionaries/types';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  translations: SearchTranslations;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children, initialSearch = '', translations }: { 
  children: ReactNode; 
  initialSearch?: string;
  translations: SearchTranslations;
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, isOpen, setIsOpen, translations }}>
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