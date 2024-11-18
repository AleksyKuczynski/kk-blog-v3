// src/main/components/Search/hooks/useSearchInput.ts

import { useEffect, useRef } from 'react';
import { 
  SearchInputConfig, 
  SearchInputHandle, 
  SearchInputManagement
} from '../types';
import { useSearchState } from './useSearchState';
import { useSearchAnimation } from './useSearchAnimation';
import { useSearchDropdown } from './useSearchDropdown';
import { useSearchInteractions } from './useSearchInteractions';
import { useOutsideClick } from '@/main/lib/hooks';

export function useSearchInput(
  config: SearchInputConfig = {}
): SearchInputManagement {
  const {
    isExpandable = false,
    mode = 'standard',
    onClose,
  } = config;

  // Initialize refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const instanceIdRef = useRef(`search-${Math.random()}`);

  // Initialize state management
  const {
    query,
    suggestions,
    searchStatus,
    setQuery,
    handleSelect: handleSelectFromState,
    handleSubmit: handleSubmitFromState,
    handleFocusStatus,
    resetStatus
  } = useSearchState();

  // Initialize animation management
  const {
    expansionState,
    isExpanding,
    isExpanded,
    handleTransitionEnd,
    collapse,
    expand,
    getAnimationState,
    handleSearchStatusChange,
    contentTransitionState
  } = useSearchAnimation({ mode, inputRef });

  const lastSearchStatus = useRef(searchStatus);
  useEffect(() => {
    if (searchStatus.type !== lastSearchStatus.current.type) {
      console.log('Search status changed:', { 
        from: lastSearchStatus.current.type, 
        to: searchStatus.type 
      });
      handleSearchStatusChange(searchStatus);
      lastSearchStatus.current = searchStatus;
    }
  }, [searchStatus, handleSearchStatusChange]);

  // Initialize dropdown management
  const {
    showDropdown,
    focusedIndex,
    setShowDropdown,
    setFocusedIndex
  } = useSearchDropdown(isExpanded);

  // Initialize interaction handlers
  const handlers = useSearchInteractions({
    isExpandable,
    suggestions,
    query,
    showDropdown,
    focusedIndex,
    isExpanded,
    expansionState,
    setShowDropdown,
    setFocusedIndex,
    setQuery,
    handleSelect: handleSelectFromState,
    handleSubmit: handleSubmitFromState,
    expand,
    collapse,
    onClose,
    handleFocusStatus,
    resetStatus 
  });

  // Setup outside click handling
  useOutsideClick(containerRef, buttonRef, isExpanded, handlers.handleOutsideClick);

  // Define control interface
  const controls: SearchInputHandle = {
    getValue: () => query,
    focus: () => inputRef.current?.focus(),
    clear: () => setQuery(''),
    expand,
    collapse: () => collapse(false),
    submit: handleSubmitFromState,
    close: (action = 'preserve') => {
      switch (action) {
        case 'clear':
          collapse(true);
          setQuery('');
          break;
        case 'submit':
          handleSubmitFromState();
          collapse(true);
          break;
        default:
          collapse(false);
      }
    }
  };

  return {
    // Refs
    containerRef,
    inputRef,
    buttonRef,
    dropdownRef,

    // State
    query,
    suggestions,
    focusedIndex,
    showDropdown,
    isExpanded,
    isExpanding,
    expansionState,
    searchStatus,

    // Identifiers and configuration
    instanceId: instanceIdRef.current,

    // Handlers and controls
    handlers: {
      ...handlers,
      handleTransitionEnd // Used by container transition
    },
    controls,
    getAnimationState,
    contentTransitionState
  };
}