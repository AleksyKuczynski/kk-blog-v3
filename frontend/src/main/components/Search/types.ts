// src/main/components/Search/types.ts
import { KeyboardEvent, ChangeEvent, RefObject } from 'react'
import { SearchProposition } from '@/main/lib/directus'
import { SearchTranslations } from '@/main/lib/dictionaries/types'

/** Core search functionality state and handlers */
export interface UseSearchInputReturn {
  // State
  searchQuery: string
  suggestions: SearchProposition[]
  hasInteracted: boolean
  isSearching: boolean
  focusedIndex: number
  isInputValid: boolean
  
  // UI State flags
  showMinCharMessage: boolean
  showSearchingMessage: boolean
  showNoResultsMessage: boolean
  
  // Handlers
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  handleSelect: (slug: string, rubricSlug: string) => void
  handleSearchSubmit: () => void
}

/** SearchInput component props */
export interface SearchInputProps {
  className?: string
  translations: SearchTranslations
  showButton?: boolean
  autoFocus?: boolean
  isExpandable?: boolean
  onSubmit?: () => void
  onClose?: () => void
  initialFocus?: boolean
}

/** SearchInput ref interface */
export interface SearchInputHandle {
  getInputValue: () => string
  focus: () => void
  close: () => void
}

/** Search status for UI management */
export type SearchInputState = 
  | { status: 'idle' }
  | { status: 'minChars' }
  | { status: 'searching' }
  | { status: 'noResults' }
  | { status: 'hasResults', suggestions: SearchProposition[] }

/** Search Context type */
export interface SearchContextType {
  // Search state
  searchQuery: string
  suggestions: SearchProposition[]
  hasInteracted: boolean
  isSearching: boolean
  
  // UI state
  isOpen: boolean
  isExpandable: boolean
  
  // Actions
  setSearchQuery: (query: string) => void
  setIsOpen: (isOpen: boolean) => void
  handleSelect: (slug: string, rubricSlug: string) => void
  handleSearchSubmit: () => void
  
  // Translations
  translations: SearchTranslations
}