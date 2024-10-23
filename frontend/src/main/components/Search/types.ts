// src/main/components/Search/types.ts
import { KeyboardEvent, ChangeEvent, RefObject } from 'react';
import { SearchProposition } from '@/main/lib/directus';
import { Lang, SearchTranslations } from '@/main/lib/dictionaries/types';

// Core search state
export interface SearchState {
  searchQuery: string;
  suggestions: SearchProposition[];
  hasInteracted: boolean;
  isSearching: boolean;
}

// UI State
export interface SearchUIState {
  isOpen: boolean;
  focusedIndex: number;
  inputRef: RefObject<HTMLInputElement>;
}

// Validation State
export interface ValidationState {
  isInputValid: boolean;
  showMinCharMessage: boolean;
  showSearchingMessage: boolean;
  showNoResultsMessage: boolean;
}

// Event Handlers
export interface SearchHandlers {
  handleSearch: (query: string) => void;
  handleSelect: (slug: string, rubricSlug: string) => void;
  handleSearchSubmit: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// Combined state and handlers for hook
export interface UseSearchInputReturn extends SearchState, SearchUIState, ValidationState, SearchHandlers {}

// Component Props
export interface SearchInputProps {
  translations: SearchTranslations;
  initialValue?: string;
  showButton?: boolean;
  className?: string;
  isExpandable?: boolean;
  autoFocus?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

// Ref Handle type for SearchInput
export interface SearchInputHandle {
  getInputValue: () => string;
  focus: () => void;
  close: () => void;
}

export interface SearchFieldProps {
  inputRef: RefObject<HTMLInputElement>;
  query: string;
  isOpen: boolean;
  translations: SearchTranslations;
  showButton: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: (searchQuery?: string) => void;
}

export interface SuggestionsListProps {
  suggestions: SearchProposition[];
  focusedIndex: number;
  handleSuggestionClick: (suggestion: SearchProposition) => void;
}

// Context type
export interface SearchContextType extends SearchState {
  setQuery: (query: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  translations: SearchTranslations;
}

// Current SearchContextType:
export interface SearchContextType extends SearchState {
  setQuery: (query: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  translations: SearchTranslations;
}

// Current SearchState:
export interface SearchState {
  searchQuery: string;
  suggestions: SearchProposition[];
  hasInteracted: boolean;
  isSearching: boolean;
}