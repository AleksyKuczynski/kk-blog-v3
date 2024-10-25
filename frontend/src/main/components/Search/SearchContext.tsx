// src/main/components/Search/SearchContext.tsx
'use client'

import React, { createContext, useContext } from 'react'
import { SearchContextType, SearchProviderProps } from './types'
import { useSearchInput } from './useSearchInput'

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ 
  children, 
  initialSearch,
  translations,
}: SearchProviderProps) {
  const searchState = useSearchInput(translations, {
    isExpandable: false,
    onSubmit: undefined,
    onClose: undefined
  })

  // Combine local search state with context requirements
  const contextValue: SearchContextType = {
    // Core search state from useSearchInput
    ...searchState,
    
    // Context-specific state
    mode: 'standard',
    isActive: searchState.showDropdown,
    isExpanded: false,
    hasInteracted: searchState.query.length > 0,
    isSearching: searchState.searchStatus.type === 'searching',
    totalResults: searchState.suggestions.length,
    
    // Action handlers for consumers
    setQuery: (query: string) => {
      const event = {
        target: { value: query }
      } as React.ChangeEvent<HTMLInputElement>
      searchState.handlers.handleInputChange(event)
    },
    setShowDropdown: (show: boolean) => {
      if (!show) {
        searchState.handlers.handleOutsideClick()
      }
    },
    setHasInteracted: () => {/* no-op as it's derived from query */},
    
    // Search result handlers
    handleSelect: searchState.handlers.handleSelect,
    handleSubmit: () => searchState.controls.submit(),
    handleClose: searchState.controls.close,
  }

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}