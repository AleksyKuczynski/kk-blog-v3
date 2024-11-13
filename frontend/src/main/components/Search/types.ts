// src/main/components/Search/types.ts
import { SearchProposition } from '@/main/lib/directus'
import { SearchTranslations } from '@/main/lib/dictionaries/types'

// Search Mode Types
export type SearchMode = 'expandable' | 'standard'
export type SearchInputAction = 'clear' | 'preserve' | 'submit'

// Search State Types
export interface SearchState {
  query: string
  mode: SearchMode
  isActive: boolean
  isExpanded: boolean
  showDropdown: boolean
  hasInteracted: boolean
  isSearching: boolean
}

// Search Status Type
export type SearchStatus = 
  | { type: 'idle' }
  | { type: 'minChars'; current: number; required: number }
  | { type: 'pending' }
  | { type: 'searching' }
  | { type: 'noResults' }
  | { type: 'success'; count: number }

// Type for expansion state
export type ExpansionState = 'collapsed' | 'expanding' | 'expanded' | 'collapsing';

// Search UI Event Handlers
export interface SearchUIHandlers {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleSearchClick: (e: React.MouseEvent) => void
  handleOutsideClick: (e?: MouseEvent | TouchEvent) => void
  handleSelect: (slug: string, rubricSlug: string) => void
  handleFocus: () => void
  handleBlur: () => void
  handleExpansion: () => void
  handleTransitionEnd: () => void
}

// Component Handle Interface
export interface SearchInputHandle {
  getValue: () => string
  focus: () => void
  clear: () => void
  expand: () => void
  collapse: () => void
  submit: () => void
  close: (action?: SearchInputAction) => void
}

// Search Input Configuration
export interface SearchInputConfig {
  isExpandable?: boolean
  mode?: SearchMode
  autoFocus?: boolean
  onClose?: () => void
}

// Provider Props
export interface SearchProviderProps {
  children: React.ReactNode
  translations: SearchTranslations
  mode?: SearchMode
  isInitiallyOpen?: boolean
}

// Combined Input Management Interface
export interface SearchInputManagement {
  containerRef: React.RefObject<HTMLDivElement>
  inputRef: React.RefObject<HTMLInputElement>
  buttonRef: React.RefObject<HTMLButtonElement>
  dropdownRef: React.RefObject<HTMLDivElement>
  query: string
  suggestions: SearchProposition[]
  focusedIndex: number
  showDropdown: boolean
  isExpanded: boolean
  isExpanding: boolean
  expansionState: ExpansionState
  isCollapsing: boolean
  searchStatus: SearchStatus
  instanceId: string
  handlers: SearchUIHandlers
  controls: SearchInputHandle
}

// Combined Context State & Actions
export interface SearchContextType {
  // Search state
  query: string
  suggestions: SearchProposition[]
  isExpanded: boolean
  showDropdown: boolean
  hasInteracted: boolean
  isSearching: boolean

  // Input management
  inputManagement: SearchInputManagement

  // Actions
  setQuery: (query: string) => void
  handleSelect: (slug: string, rubricSlug: string) => void
  handleSubmit: () => boolean
}

// Component Props
export interface SearchInputProps {
  className?: string;
  translations: SearchTranslations;
  showButton?: boolean;
  autoFocus?: boolean;
  isExpandable?: boolean;
}

export interface SearchDropdownContentProps {
  children: React.ReactNode;
  position?: 'left' | 'center' | 'right';
  className?: string;
  isOpen: boolean;
}