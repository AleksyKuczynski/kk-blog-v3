// src/main/components/Search/SearchContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { SearchContextType, SearchState } from './types';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { SearchProposition } from '@/main/lib/directus/interfaces';

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: React.ReactNode;
  initialSearch: string;
  translations: SearchTranslations;
}

export function SearchProvider({ 
  children, 
  initialSearch = '', 
  translations,
}: SearchProviderProps) {
  // Match SearchState interface
  const [state, setState] = useState<SearchState>({
    searchQuery: initialSearch,
    suggestions: [],
    hasInteracted: false,
    isSearching: false
  });

  const value: SearchContextType = {
    ...state,
    setQuery: (query: string) => setState(prev => ({ 
      ...prev, 
      searchQuery: query,
      hasInteracted: true 
    })),
    setIsOpen: (isOpen: boolean) => setState(prev => ({ 
      ...prev, 
      suggestions: isOpen ? prev.suggestions : [] 
    })),
    translations
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}