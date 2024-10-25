// src/main/components/Search/useSearchInput.ts
import { useRef, useCallback, useState, useMemo } from 'react'
import { 
  SearchInputConfig, 
  SearchStateManagement,
  SearchUIHandlers,
  SearchInputHandle,
  SearchStatus
} from './types'
import { useSearch } from './useSearch'
import { SearchTranslations } from '@/main/lib/dictionaries/types'
import { useDebounce } from '@/main/lib/hooks'

export function useSearchInput(
  translations: SearchTranslations,
  config: SearchInputConfig
): SearchStateManagement {
  const {
    searchQuery: query,
    suggestions,
    isSearching,
    setSearchQuery,
    handleSearch,
    handleSelect: handleSelectFromHook,
    handleSearchSubmit: handleSubmitFromHook,
  } = useSearch()

  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // First, create the search callback
  const triggerSearch = useCallback((value: string) => {
    if (value.length >= 3) {
      handleSearch(value)
    }
  }, [handleSearch])

  // Then debounce it
  const debouncedSearch = useDebounce(triggerSearch, 300)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowDropdown(true)
    setFocusedIndex(-1)
    debouncedSearch(value)
  }, [setSearchQuery, debouncedSearch])

  const handleFocus = useCallback(() => {
    setShowDropdown(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      if (!config.isExpandable) {
        setShowDropdown(false);
      }
    }, 200);
  }, [config.isExpandable]);

  const handleSelect = useCallback((slug: string, rubricSlug: string) => {
    handleSelectFromHook(slug, rubricSlug)
    setShowDropdown(false)
    setFocusedIndex(-1)
  }, [handleSelectFromHook])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (
          prev < suggestions.length - 1 ? prev + 1 : prev
        ));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && suggestions[focusedIndex]) {
          const selected = suggestions[focusedIndex];
          handleSelect(selected.slug, selected.rubric_slug);
        } else {
          handleSubmitFromHook();
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setFocusedIndex(-1);
        break;
    }
  }, [suggestions, focusedIndex, handleSelect, handleSubmitFromHook, showDropdown]);

  const handleSearchClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    handleSubmitFromHook()
  }, [handleSubmitFromHook])

  const handleOutsideClick = useCallback(() => {
    setShowDropdown(false)
    setFocusedIndex(-1)
  }, [])

  const searchStatus = useMemo((): SearchStatus => {
    if (!query || query.length < 3) {
      return { 
        type: 'minChars',
        current: query.length,
        required: 3
      } as const;
    }
    // Check isSearching first before no results
    if (isSearching) {
      return { type: 'searching' } as const;
    }
    // Only show noResults when we're not searching and have no suggestions
    if (!isSearching && query.length >= 3 && (!suggestions || suggestions.length === 0)) {
      return { type: 'noResults' } as const;
    }
    if (!isSearching && suggestions && suggestions.length > 0) {
      return { 
        type: 'success',
        count: suggestions.length
      } as const;
    }
    // Fallback to searching while waiting for results
    return { type: 'searching' } as const;
  }, [query, isSearching, suggestions]);

  const controls: SearchInputHandle = {
    getValue: () => query,
    focus: () => inputRef.current?.focus(),
    clear: () => {
      setSearchQuery('')
      setShowDropdown(false)
      setFocusedIndex(-1)
    },
    expand: () => {
      setShowDropdown(true)
      inputRef.current?.focus()
    },
    collapse: () => {
      setShowDropdown(false)
      setFocusedIndex(-1)
    },
    submit: () => handleSubmitFromHook(),
    close: (action = 'preserve') => {
      switch (action) {
        case 'clear':
          setSearchQuery('')
          setShowDropdown(false)
          setFocusedIndex(-1)
          break
        case 'submit':
          handleSubmitFromHook()
          setShowDropdown(false)
          setFocusedIndex(-1)
          break
        default:
          setShowDropdown(false)
          setFocusedIndex(-1)
          break
      }
    }
  }

  return {
    inputRef,
    query,
    suggestions: suggestions || [],
    focusedIndex,
    showDropdown,
    searchStatus,
    handlers: {
      handleInputChange,
      handleKeyDown,
      handleSearchClick,
      handleOutsideClick,
      handleSelect,
      handleFocus,
      handleBlur
    },
    controls,
    translations
  }
}