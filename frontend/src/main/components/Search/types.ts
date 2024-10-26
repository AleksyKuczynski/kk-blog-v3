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

// Search Status Type for UI States
export type SearchStatus = 
  | { type: 'idle' }
  | { type: 'minChars'; current: number; required: number }
  | { type: 'pending' }
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

// Base search functionality from useSearch
export interface SearchFunctionality {
  searchQuery: string;
  suggestions: SearchProposition[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  handleSearch: (term: string) => Promise<void>;
  handleSelect: (slug: string, rubricSlug: string) => void;
  handleSearchSubmit: () => boolean;
}

// Input management from useSearchInput
export interface SearchInputManagement {
  inputRef: React.RefObject<HTMLInputElement>;
  query: string;
  suggestions: SearchProposition[];
  focusedIndex: number;
  showDropdown: boolean;
  searchStatus: SearchStatus;
  handlers: SearchUIHandlers;
  controls: SearchInputHandle;
}

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
}

// Search Input Configuration
export interface SearchInputConfig {
  isExpandable?: boolean;
  mode?: SearchMode;
  onSubmit?: (query: string) => boolean;
  onClose?: () => boolean;
}

// Combined Context State & Actions
export interface SearchContextType {
  // Search state
  query: string;
  suggestions: SearchProposition[];
  isExpanded: boolean;
  showDropdown: boolean;
  hasInteracted: boolean;
  isSearching: boolean;

  // Input management
  inputManagement: SearchInputManagement;

  // Actions
  setQuery: (query: string) => void;
  handleSelect: (slug: string, rubricSlug: string) => void;
  handleSubmit: () => boolean;
  handleClose: (clearInput?: boolean) => boolean;
  handleExpandableToggle: () => boolean;
}