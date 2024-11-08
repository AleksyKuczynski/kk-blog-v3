// src/main/components/Search/SearchContext.tsx
'use client'

import React, { createContext, useContext } from 'react'
import { SearchContextType, SearchProviderProps } from './types'
import { useSearchInput } from './useSearchInput'
import { useSearch } from './useSearch'

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}

export function SearchProvider({ 
  children, 
  translations,
  mode = 'standard',
  isInitiallyOpen = false,
}: SearchProviderProps) {
  const searchFunctionality = useSearch()
  
  const inputManagement = useSearchInput(
    translations,
    mode === 'expandable',
    mode,
    () => inputManagement.controls.close('clear')
  )

  const contextValue: SearchContextType = {
    // Search state
    query: searchFunctionality.searchQuery,
    suggestions: searchFunctionality.suggestions,
    isExpanded: mode === 'expandable' ? inputManagement.isExpanded : true,
    showDropdown: inputManagement.showDropdown,
    hasInteracted: searchFunctionality.searchQuery.length > 0,
    isSearching: searchFunctionality.isSearching,

    // Input management
    inputManagement,

    // Actions
    setQuery: searchFunctionality.setSearchQuery,
    handleSelect: searchFunctionality.handleSelect,
    handleSubmit: () => {
      const success = searchFunctionality.handleSearchSubmit()
      if (success && mode === 'expandable') {
        inputManagement.controls.close('clear')
      }
      return Boolean(success)
    }
  }

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}