// src/main/components/Search/useSearchInput.ts
import { useState, useCallback, KeyboardEvent } from 'react';
import { useSearch } from './useSearch';

export function useSearchInput(onSubmit?: () => void) {
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

  const isInputValid = searchQuery.length >= 3;
  const showMinCharMessage = hasInteracted && !isInputValid;
  const showSearchingMessage = isInputValid && isSearching;
  const showNoResultsMessage = isInputValid && hasInteracted && !isSearching && suggestions.length === 0;

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

  return {
    searchQuery,
    suggestions,
    hasInteracted,
    focusedIndex,
    isInputValid,
    showMinCharMessage,
    showSearchingMessage,
    showNoResultsMessage,
    handleSearch,
    handleSelect,
    handleSearchSubmit,
    handleKeyDown,
  };
}