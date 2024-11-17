// src/main/components/Search/hooks/useSearchInteractions.ts
import { useCallback } from 'react';
import { SearchProposition } from '@/main/lib/directus';
import { ExpansionState, SearchUIHandlers } from '../types';

interface SearchInteractionsConfig {
  isExpandable: boolean;
  suggestions: SearchProposition[];
  query: string;
  showDropdown: boolean;
  focusedIndex: number;
  isExpanded: boolean;
  expansionState: ExpansionState;
  setShowDropdown: (show: boolean) => void;
  setFocusedIndex: (index: number) => void;
  setQuery: (value: string) => void;
  handleSelect: (slug: string, rubricSlug: string) => void;
  handleSubmit: () => boolean;
  expand: () => void;
  collapse: (clearQuery: boolean) => void;
  onClose?: () => void;
  handleFocusStatus: () => void;
  resetStatus: () => void;
}

export function useSearchInteractions({
  isExpandable,
  suggestions,
  query,
  showDropdown,
  focusedIndex,
  isExpanded,
  expansionState,
  setShowDropdown,
  setFocusedIndex,
  handleSelect,
  handleSubmit,
  expand,
  collapse,
  onClose,
  setQuery,
  handleFocusStatus,
  resetStatus
}: SearchInteractionsConfig): SearchUIHandlers {

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (showDropdown && focusedIndex >= 0 && suggestions[focusedIndex]) {
          const selected = suggestions[focusedIndex];
          handleSelect(selected.slug, selected.rubric_slug);
          if (isExpandable) {
            collapse(true);
            onClose?.();
          }
        } else if (query.trim().length >= 3) {
          if (handleSubmit() && isExpandable) {
            collapse(true);
            onClose?.();
          }
        }
        break;

      case 'ArrowDown':
        if (!showDropdown || !suggestions.length) return;
        e.preventDefault();
        setFocusedIndex(focusedIndex < suggestions.length - 1 ? focusedIndex + 1 : focusedIndex);
        break;

      case 'ArrowUp':
        if (!showDropdown) return;
        e.preventDefault();
        setFocusedIndex(focusedIndex > 0 ? focusedIndex - 1 : -1);
        break;

      case 'Escape':
        e.preventDefault();
        if (isExpandable) {
          collapse(true);
          onClose?.();
        } else {
          setShowDropdown(false);
          setFocusedIndex(-1);
        }
        break;
    }
  }, [
    showDropdown,
    focusedIndex,
    suggestions,
    query,
    isExpandable,
    handleSelect,
    handleSubmit,
    collapse,
    onClose,
    setShowDropdown,
    setFocusedIndex
  ]);

  const handleSearchClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isExpandable) {
      if (query.trim().length >= 3) {
        handleSubmit();
      }
      return;
    }

    if (expansionState === 'collapsed') {
      expand();
    } else if (query.trim().length >= 3) {
      handleSubmit();
      collapse(true);
      onClose?.();
    } else {
      collapse(false);
      onClose?.();
    }
  }, [
    query,
    isExpandable,
    expansionState,
    handleSubmit,
    expand,
    collapse,
    onClose
  ]);

  const handleFocus = useCallback(() => {
    if (isExpandable) {
      expand();
    }
    handleFocusStatus();
    setShowDropdown(true);
  }, [isExpandable, expand, handleFocusStatus, setShowDropdown]);

  const handleBlur = useCallback(() => {
    if (!isExpandable) {
      setTimeout(() => {
        setShowDropdown(false);
        resetStatus();
      }, 200);
    }
  }, [isExpandable, setShowDropdown, resetStatus]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleFocusStatus();
    setShowDropdown(true);
    setFocusedIndex(-1);
  }, [setQuery, handleFocusStatus, setShowDropdown, setFocusedIndex]);

  const handleOutsideClick = useCallback((event?: MouseEvent | TouchEvent) => {
    if (!event?.target || !isExpandable || !isExpanded) return;
    collapse(false);
    onClose?.();
  }, [isExpandable, isExpanded, collapse, onClose]);

  return {
    handleInputChange,
    handleKeyDown,
    handleSearchClick,
    handleOutsideClick,
    handleSelect,
    handleFocus,
    handleBlur,
    handleExpansion: expand,
    handleTransitionEnd: useCallback(() => {
      // Only handle transition states
      if (expansionState === 'expanding' || expansionState === 'collapsing') {
        // No direction update needed
      }
    }, [expansionState])
  };
}