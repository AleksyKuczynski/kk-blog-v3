// src/main/lib/useSearchInput.ts
import { useState, useCallback, KeyboardEvent } from 'react';
import { useSearch } from './useSearch';

export function useSearchInput(onSubmit?: () => void) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const {
    searchQuery,
    suggestions,
    hasInteracted,
    handleSearch,
    handleSelect,
    handleSearchSubmit
  } = useSearch(onSubmit);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0) {
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
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  }, [suggestions, focusedIndex, handleSelect, handleSearchSubmit]);

  return {
    searchQuery,
    suggestions,
    hasInteracted,
    focusedIndex,
    handleSearch,
    handleSelect,
    handleSearchSubmit,
    handleKeyDown,
  };
}