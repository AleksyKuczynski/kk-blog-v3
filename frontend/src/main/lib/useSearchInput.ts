// src/main/lib/useSearchInput.ts
import { useState, useRef, useCallback } from 'react';
import { useSearch } from './useSearch';

export function useSearchInput(onSubmit?: () => void) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    searchQuery,
    suggestions,
    hasInteracted,
    handleSearch,
    handleSelect,
    handleSearchSubmit,
  } = useSearch(onSubmit);

  const shouldShowDropdown = searchQuery.length > 0 && hasInteracted;

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (shouldShowDropdown && suggestions.length > 0) {
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
          inputRef.current?.blur();
          break;
      }
    }
  }, [shouldShowDropdown, suggestions, focusedIndex, handleSelect, handleSearchSubmit]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setFocusedIndex(-1), 200);
  }, []);

  return {
    inputRef,
    searchQuery,
    suggestions,
    hasInteracted,
    focusedIndex,
    shouldShowDropdown,
    handleSearch,
    handleSelect,
    handleSearchSubmit,
    handleKeyDown,
    handleBlur,
  };
}