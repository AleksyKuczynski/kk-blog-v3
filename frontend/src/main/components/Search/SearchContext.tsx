// src/main/components/Search/SearchContext.tsx
'use client'

import React, { createContext, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { SearchContextType } from './types'
import { SearchTranslations } from '@/main/lib/dictionaries/types'
import { useSearch } from './useSearch'

interface SearchProviderProps {
  children: React.ReactNode
  initialSearch: string
  translations: SearchTranslations
  isExpandable?: boolean
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ 
  children, 
  initialSearch = '', 
  translations,
  isExpandable = false
}: SearchProviderProps) {
  const [isOpen, setIsOpen] = useState(!isExpandable)
  
  const {
    searchQuery,
    suggestions,
    hasInteracted,
    isSearching,
    handleSearch,
    handleSelect,
    handleSearchSubmit
  } = useSearch()

  const setSearchQuery = (query: string) => {
    handleSearch(query)
  }

  const value: SearchContextType = {
    // Search state
    searchQuery,
    suggestions,
    hasInteracted,
    isSearching,
    
    // UI state
    isOpen,
    isExpandable,
    
    // Actions
    setSearchQuery,
    setIsOpen,
    handleSelect,
    handleSearchSubmit,
    
    // Translations
    translations
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext(): SearchContextType {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}