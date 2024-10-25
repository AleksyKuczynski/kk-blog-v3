// src/main/components/Search/types.ts

import { SearchProposition } from '@/main/lib/directus'
import { SearchTranslations } from '@/main/lib/dictionaries/types'

// Base Types
export type SearchMode = 'expandable' | 'standard'
export type SearchInputAction = 'clear' | 'preserve' | 'submit'

// Input Validation Types
export interface SearchValidation {
  minLength: number;
  maxLength: number;
  allowedChars: RegExp;
}

// Search State Types
export interface SearchState {
  query: string;
  mode: SearchMode;
  isActive: boolean;
  isExpanded: boolean;
  showDropdown: boolean;
  hasInteracted: boolean;
  isSearching: boolean;
}

// Search Results Types
export interface SearchResults {
  suggestions: SearchProposition[];
  focusedIndex: number;
  totalResults: number;
}

// Context State
export interface SearchContextState extends SearchState, SearchResults {
  translations: SearchTranslations;
}

// Context Actions
export interface SearchContextActions {
  setQuery: (query: string) => void;
  setShowDropdown: (show: boolean) => void;
  setHasInteracted: (hasInteracted: boolean) => void;
  handleSelect: (slug: string, rubricSlug: string) => void;
  handleSubmit: () => void;
  handleClose: (action?: SearchInputAction) => void;
  handleExpand?: () => void;
  handleCollapse?: () => void;
}

// Combined Context Type
export interface SearchContextType extends SearchContextState, SearchContextActions {}

// Provider Props
export interface SearchProviderProps {
  children: React.ReactNode;
  initialSearch: string;
  translations: SearchTranslations;
  mode?: SearchMode;
  isInitiallyOpen?: boolean;
}

// Component Props
export interface SearchInputProps {
  className?: string;
  translations: SearchTranslations;
  showButton?: boolean;
  autoFocus?: boolean;
  isExpandable?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

// Update SearchInput props to use correct type
export interface SearchInputConfig {
  isExpandable?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

// Component Handle Interface
export interface SearchInputHandle {
  getValue: () => string;
  focus: () => void;
  clear: () => void;
  expand: () => void;
  collapse: () => void;
  submit: () => void;
  close: (action?: SearchInputAction) => void;
}

// Search Response Types for Server Actions
export interface SearchResponse {
  success: boolean;
  results: SearchProposition[];
  error?: string;
  timing?: number;
}

// URL Safe Search Params
export interface SearchURLParams {
  q: string;
  page?: string;
  sort?: 'relevance' | 'date';
  category?: string;
}

// Search Status Type for UI States
export type SearchStatus = 
  | { type: 'idle' }
  | { type: 'minChars'; current: number; required: number }
  | { type: 'searching' }
  | { type: 'noResults' }
  | { type: 'error'; message: string }
  | { type: 'success'; count: number }

// Search UI Event Handlers
export interface SearchUIHandlers {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearchClick: (e: React.MouseEvent) => void;
  handleOutsideClick: () => void;
  handleSelect: (slug: string, rubricSlug: string) => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

// Search Presentation Props
export interface SearchPresentationProps extends SearchUIHandlers {
  inputRef: React.RefObject<HTMLInputElement>;
  query: string;
  showDropdown: boolean;
  focusedIndex: number;
  suggestions: SearchProposition[];
  searchStatus: SearchStatus;
  translations: SearchTranslations;
  showButton?: boolean;
  autoFocus?: boolean;
  className?: string;
}

// Search State Management
export interface SearchStateManagement {
  inputRef: React.RefObject<HTMLInputElement>;
  query: string;
  suggestions: SearchProposition[];
  focusedIndex: number;
  showDropdown: boolean;
  searchStatus: SearchStatus;
  handlers: SearchUIHandlers;
  controls: SearchInputHandle;
  translations: SearchTranslations;
}