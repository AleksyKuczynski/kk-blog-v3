// src/main/components/Search/types.ts

import { SearchProposition } from '@/main/lib/directus'
import { SearchTranslations } from '@/main/lib/dictionaries/types'

// Core Types
export type SearchMode = 'expandable' | 'standard'
export type SearchInputAction = 'clear' | 'preserve' | 'submit'
export type Direction = 'top' | 'bottom'
export type ExpansionState = 'collapsed' | 'expanding' | 'expanded' | 'collapsing'
export type DropdownAnimationState = 'initial' | 'entering' | 'entered' | 'exiting'
export type ContentTransitionState = 'stable' | 'transitioning-out' | 'transitioning-in'

// Search Status Type
export type SearchStatus = 
  | { type: 'idle' }
  | { type: 'minChars'; current: number; required: number }
  | { type: 'searching' }
  | { type: 'noResults' }
  | { type: 'success'; count: number }

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

// Handler Interfaces
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

// Configuration Interface
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

// Input Management Interface
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
  searchStatus: SearchStatus
  instanceId: string
  handlers: SearchUIHandlers
  controls: SearchInputHandle
  getAnimationState: () => DropdownAnimationState
  contentTransitionState: ContentTransitionState
}

// Context Type
export interface SearchContextType {
  query: string
  suggestions: SearchProposition[]
  isExpanded: boolean
  showDropdown: boolean
  hasInteracted: boolean
  isSearching: boolean
  inputManagement: SearchInputManagement
  setQuery: (query: string) => void
  handleSelect: (slug: string, rubricSlug: string) => void
  handleSubmit: () => boolean
}

// Component Props
export interface SearchInputProps {
  className?: string
  translations: SearchTranslations
  showButton?: boolean
  autoFocus?: boolean
  isExpandable?: boolean
}

export interface SearchDropdownContentProps {
  isOpen: boolean
  children: React.ReactNode
  className?: string
  animationState: DropdownAnimationState
  contentTransitionState: ContentTransitionState
  onTransitionEnd: () => void
}

// Animation-related types
export interface SearchAnimationState {
  expansionState: ExpansionState;
  isExpanding: boolean;
  isExpanded: boolean;
  handleTransitionEnd: () => void;
  collapse: (clearQuery?: boolean) => void;
  expand: () => void;
  getAnimationState: () => DropdownAnimationState;
  handleSearchStatusChange: (newStatus: SearchStatus) => void;
  contentTransitionState: ContentTransitionState;
}

export interface SearchAnimationConfig {
  mode?: SearchMode;
  onExpandComplete?: () => void;
  onCollapse?: (clearQuery: boolean) => void;
  isValidSearch?: boolean;
  onSearchSubmit?: () => boolean;
  shouldExpand?: boolean;
}