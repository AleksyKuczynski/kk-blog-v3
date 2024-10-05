// src/main/components/Search/useSearchInput.ts

import { useState, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { useSearch } from './useSearch';
import { 
  UseSearchInputReturn, 
  SearchState, 
  SearchValidation, 
  SearchHandlers, 
} from './types';
import { useDebounce } from '@/main/lib/hooks';

export function useSearchInput(onSubmit?: () => void): UseSearchInputReturn {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const {
    searchQuery,
    suggestions,
    hasInteracted,
    isSearching,
    handleSearch,
    handleSelect,
    handleSearchSubmit
  } = useSearch(onSubmit);

  const searchState: SearchState = {
    searchQuery,
    suggestions,
    hasInteracted,
    focusedIndex,
    isSearching
  };

  const isInputValid = searchQuery.length >= 3;
  
  const searchValidation: SearchValidation = {
    isInputValid,
    showMinCharMessage: hasInteracted && !isInputValid,
    showSearchingMessage: isInputValid && isSearching,
    showNoResultsMessage: isInputValid && hasInteracted && !isSearching && suggestions.length === 0
  };

  const debouncedHandleSearch = useDebounce(handleSearch, 300);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0 && isInputValid) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0) {
            const selectedSuggestion = suggestions[focusedIndex];
            handleSelect(selectedSuggestion.slug, selectedSuggestion.rubric_slug);
          } else {
            handleSearchSubmit();
          }
          break;
        case 'Escape':
          e.preventDefault();
          // Close suggestions or clear input
          break;
      }
    } else if (e.key === 'Enter' && isInputValid) {
      e.preventDefault();
      handleSearchSubmit();
    }
  }, [suggestions, focusedIndex, handleSelect, handleSearchSubmit, isInputValid]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  }, [handleSearch]);

  const searchHandlers: SearchHandlers = {
    handleSearch,
    handleSelect,
    handleSearchSubmit,
    handleKeyDown,
    handleInputChange
  };

  return {
    ...searchState,
    ...searchValidation,
    ...searchHandlers
  };
}