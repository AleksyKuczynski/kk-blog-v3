// src/main/components/Search/types.ts

import { KeyboardEvent, ChangeEvent } from 'react';
import { SearchProposition } from '@/main/lib/directus';
import { SearchTranslations } from '@/main/lib/dictionaries/types';

// Base search state
export interface SearchState {
  searchQuery: string;
  suggestions: SearchProposition[];
  hasInteracted: boolean;
  focusedIndex: number;
  isSearching: boolean;
}

// Search validation state
export interface SearchValidation {
  isInputValid: boolean;
  showMinCharMessage: boolean;
  showSearchingMessage: boolean;
  showNoResultsMessage: boolean;
}

// Search event handlers
export interface SearchHandlers {
  handleSearch: (query: string) => void;
  handleSelect: (slug: string, rubricSlug: string) => void;
  handleSearchSubmit: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// Combined search input state and handlers
export interface UseSearchInputReturn extends SearchState, SearchValidation, SearchHandlers {}

// Search input component props
export interface SearchInputProps {
  className?: string;
  onSubmit?: () => void;
  showButton?: boolean;
  translations: SearchTranslations;
  autoFocus?: boolean;
  isExpandable?: boolean;
  initiallyExpanded?: boolean;
  onClose?: () => void;
}

// Search input ref handle
export interface SearchInputHandle {
  getInputValue: () => string;
  focus: () => void;
  close: () => void;
}

// Search input state (for more precise state management)
export type SearchInputState = 
  | { status: 'idle' }
  | { status: 'minChars' }
  | { status: 'searching' }
  | { status: 'noResults' }
  | { status: 'hasResults', suggestions: SearchProposition[] };

// Props for search-related components
export interface SearchBarWrapperProps {
  initialSearch?: string;
  translations: SearchTranslations;
  showButton?: boolean;
}

export interface SearchPageWrapperProps {
  initialSearch: string;
  translations: SearchTranslations;
}

export interface SearchButtonProps {
  onClick: () => void;
  className?: string;
  context: 'desktop' | 'mobile';
}

// Context type for SearchContext
export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isExpandable: boolean;
  translations: SearchTranslations;
}