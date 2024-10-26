// src/main/components/Search/SearchContext.tsx
'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'
import { SearchContextType, SearchProviderProps } from './types'
import { useSearchInput } from './useSearchInput'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
  const [isExpanded, setIsExpanded] = useState(isInitiallyOpen)

  // Get base search functionality
  const searchFunctionality = useSearch()
  
  // Get input management
  const inputManagement = useSearchInput(translations, {
    isExpandable: mode === 'expandable',
    mode,
    onSubmit: () => {
      const success = searchFunctionality.handleSearchSubmit()
      if (success && mode === 'expandable') {
        handleClose(false)
      }
      return success
    },
    onClose: () => {
      if (mode === 'expandable') {
        setIsExpanded(false)
      }
      return true
    }
  })

  const handleClose = useCallback((clearInput: boolean = false): boolean => {
    if (mode === 'expandable') {
      setIsExpanded(false)
      if (clearInput) {
        inputManagement.controls.clear()
      }
      return true
    }
    return false
  }, [mode, inputManagement.controls])

  const contextValue: SearchContextType = {
    // Search state
    query: searchFunctionality.searchQuery,
    suggestions: searchFunctionality.suggestions,
    isExpanded,
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
        handleClose(false)
      }
      return Boolean(success)
    },
    handleClose,
    handleExpandableToggle: () => {
      if (mode === 'expandable') {
        if (isExpanded) {
          const isValid = searchFunctionality.searchQuery.trim().length >= 3
          return isValid ? contextValue.handleSubmit() : handleClose(true)
        } else {
          setIsExpanded(true)
          return true
        }
      }
      return false
    },
  }

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}