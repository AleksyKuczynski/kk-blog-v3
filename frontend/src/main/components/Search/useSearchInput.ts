// src/main/components/Search/useSearchInput.ts
'use client';

import { useState, useCallback, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useSearch } from './useSearch';
import { UseSearchInputReturn, SearchUIState, ValidationState } from './types';
import { useDebounce } from '@/main/lib/hooks';

export function useSearchInput(onSubmit?: () => void): UseSearchInputReturn {
  // Core search functionality from useSearch
  const {
    searchQuery,
    suggestions,
    hasInteracted,
    isSearching,
    handleSearch,
    handleSelect,
    handleSearchSubmit
  } = useSearch(onSubmit);

  // UI State
  const [uiState, setUIState] = useState<SearchUIState>({
    isOpen: false,
    focusedIndex: -1,
    inputRef: useRef<HTMLInputElement>(null)
  });

  // Validation
  const isInputValid = searchQuery.length >= 3;
  const validationState: ValidationState = {
    isInputValid,
    showMinCharMessage: hasInteracted && !isInputValid,
    showSearchingMessage: isInputValid && isSearching,
    showNoResultsMessage: isInputValid && hasInteracted && !isSearching && suggestions.length === 0
  };

  // Debounced search
  const debouncedHandleSearch = useDebounce(handleSearch, 300);

  // Event handlers
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0 && isInputValid) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setUIState(prev => ({
            ...prev,
            focusedIndex: prev.focusedIndex < suggestions.length - 1 ? prev.focusedIndex + 1 : prev.focusedIndex
          }));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setUIState(prev => ({
            ...prev,
            focusedIndex: prev.focusedIndex > 0 ? prev.focusedIndex - 1 : -1
          }));
          break;
        case 'Enter':
          e.preventDefault();
          if (uiState.focusedIndex >= 0) {
            const selectedSuggestion = suggestions[uiState.focusedIndex];
            handleSelect(selectedSuggestion.slug, selectedSuggestion.rubric_slug);
          } else {
            handleSearchSubmit();
          }
          break;
        case 'Escape':
          e.preventDefault();
          setUIState(prev => ({ ...prev, isOpen: false }));
          break;
      }
    } else if (e.key === 'Enter' && isInputValid) {
      e.preventDefault();
      handleSearchSubmit();
    }
  }, [suggestions, uiState.focusedIndex, handleSelect, handleSearchSubmit, isInputValid]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    debouncedHandleSearch(e.target.value);
    setUIState(prev => ({ ...prev, isOpen: true, focusedIndex: -1 }));
  }, [debouncedHandleSearch]);

  return {
    // Core search state
    searchQuery,
    suggestions,
    hasInteracted,
    isSearching,
    // UI state
    ...uiState,
    // Validation state
    ...validationState,
    // Handlers
    handleSearch,
    handleSelect,
    handleSearchSubmit,
    handleKeyDown,
    handleInputChange
  };
}