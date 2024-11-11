// src/main/components/Search/useSearchInput.ts
import { useRef, useCallback, useState, useMemo } from 'react';
import { 
  SearchInputConfig, 
  SearchInputHandle, 
  SearchInputManagement,
  SearchStatus
} from './types';
import { useSearch } from './useSearch';
import { useDebounce, useOutsideClick } from '@/main/lib/hooks';

export function useSearchInput(
  config: SearchInputConfig = {}
): SearchInputManagement {
  const {
    isExpandable = false,
    mode = 'standard',
    onClose,
  } = config;

  const {
    searchQuery: query,
    suggestions,
    isSearching,
    setSearchQuery,
    handleSearch,
    handleSelect: handleSelectFromHook,
    handleSearchSubmit: handleSubmitFromHook,
  } = useSearch();

  // State
  const [expansionState, setExpansionState] = useState<'collapsed' | 'expanding' | 'expanded'>('collapsed');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(mode === 'standard');
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchState, setSearchState] = useState<'idle' | 'pending' | 'searching' | 'complete'>('idle');
  
  // Refs
  const searchIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const instanceIdRef = useRef(`search-${Math.random()}`);

  // Helper to validate search query
  const isValidQuery = useCallback((q: string) => {
    return q.trim().length >= 3
  }, [])

  const triggerSearch = useCallback(async (value: string) => {
    const currentSearchId = ++searchIdRef.current
    
    if (value.length >= 3) {
      setSearchState('searching')
      await handleSearch(value)
      
      if (currentSearchId === searchIdRef.current) {
        setSearchState('complete')
      }
    }
  }, [handleSearch])

  const debouncedSearch = useDebounce((value: string) => {
    if (value.length >= 3) {
      setSearchState('pending')
      triggerSearch(value)
    } else {
      setSearchState('idle')
    }
  }, 300)

  // Handlers
  const handleExpansion = useCallback(() => {
    if (expansionState === 'collapsed') {
      setExpansionState('expanding');
      setIsExpanded(true);
      setIsAnimating(true);
    }
  }, [expansionState]);

  // Clean transition end handler
  const handleTransitionEnd = useCallback(() => {
    if (isExpanded && expansionState === 'expanding') {
      setIsAnimating(false);
      setExpansionState('expanded');
      // Focus only happens once transition is complete
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isExpanded, expansionState]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowDropdown(true)
    setFocusedIndex(-1)
    
    searchIdRef.current++
    if (value.length < 3) {
      setSearchState('idle')
    }
    debouncedSearch(value)
  }, [setSearchQuery, debouncedSearch])

  // Handle expansion state
  const expand = useCallback(() => {
    handleExpansion();
    setShowDropdown(true);
  }, [handleExpansion]);

  // Handle collapse with state preservation
  const collapse = useCallback((clearQuery: boolean = false) => {
    setExpansionState('collapsed');
    setIsExpanded(false);
    setShowDropdown(false);
    setFocusedIndex(-1);
    if (clearQuery) {
      setSearchQuery('');
      setSearchState('idle');
    }
  }, [setSearchQuery]);

  const handleFocus = useCallback(() => {
    if (isExpandable) {
      expand()
    } else {
      setShowDropdown(true)
    }
  }, [isExpandable, expand])

  const handleBlur = useCallback(() => {
    if (!isExpandable) {
      setTimeout(() => {
        setShowDropdown(false)
      }, 200)
    }
  }, [isExpandable])

// Helper to check if click is within search component
const isWithinSearchComponent = useCallback((target: Node | null) => {
  if (!target) return false
  return (
    containerRef.current?.contains(target) ||
    buttonRef.current?.contains(target) ||
    inputRef.current?.contains(target) ||
    dropdownRef.current?.contains(target)
  )
}, [])

// Handle search button click
const handleSearchClick = useCallback((e: React.MouseEvent) => {
  e.preventDefault();
  
  if (!isExpandable) {
    if (isValidQuery(query)) {
      handleSubmitFromHook();
    }
    return;
  }

  if (expansionState === 'collapsed') {
    handleExpansion();
  } else if (isValidQuery(query)) {
    handleSubmitFromHook();
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
  isValidQuery,
  handleSubmitFromHook,
  handleExpansion,
  collapse,
  onClose
]);

// True outside click handler
const handleOutsideClick = useCallback((event?: MouseEvent | TouchEvent) => {
  if (!event?.target || !isExpandable) return

  // If click is within search component, don't treat as outside click
  if (isWithinSearchComponent(event.target as Node)) {
    return
  }

  // True outside click - collapse but preserve query
  collapse(false)
  onClose?.()
}, [isExpandable, isWithinSearchComponent, collapse, onClose])

  const handleSelect = useCallback((slug: string, rubricSlug: string) => {
    handleSelectFromHook(slug, rubricSlug)
    setShowDropdown(false)
    setFocusedIndex(-1)
    if (isExpandable) {
      onClose?.()
    }
  }, [handleSelectFromHook, isExpandable, onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        if (showDropdown && focusedIndex >= 0 && suggestions[focusedIndex]) {
          const selected = suggestions[focusedIndex]
          handleSelect(selected.slug, selected.rubric_slug)
        } else {
          const isValid = query.trim().length >= 3
          if (isValid) {
            handleSubmitFromHook()
            if (isExpandable) {
              setIsExpanded(false)
              onClose?.()
            }
          } else if (isExpandable) {
            setIsExpanded(false)
            onClose?.()
          }
        }
        break
        
      case 'ArrowDown':
        if (!showDropdown) return
        e.preventDefault()
        setFocusedIndex(prev => (
          prev < suggestions.length - 1 ? prev + 1 : prev
        ))
        break
        
      case 'ArrowUp':
        if (!showDropdown) return
        e.preventDefault()
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
        
        case 'Escape':
          if (isExpandable) {
            setIsExpanded(false)
            setShowDropdown(false)
            setFocusedIndex(-1)
            onClose?.()
          } else {
            setShowDropdown(false)
            setFocusedIndex(-1)
          }
          break
    }
  }, [
    showDropdown,
    suggestions,
    focusedIndex,
    query,
    handleSelect,
    handleSubmitFromHook,
    isExpandable,
    onClose
  ])

  // Use our optimized outside click hook
  useOutsideClick(containerRef, buttonRef, isExpanded, handleOutsideClick)


  const searchStatus = useMemo((): SearchStatus => {
    if (!query || query.length < 3) {
      return { 
        type: 'minChars',
        current: query?.length || 0,
        required: 3
      }
    }

    switch (searchState) {
      case 'pending':
        return { type: 'pending' }
      case 'searching':
        return { type: 'searching' }
      case 'complete':
        return suggestions.length > 0 
          ? { type: 'success', count: suggestions.length }
          : { type: 'noResults' }
      default:
        return { type: 'idle' }
    }
  }, [query, searchState, suggestions])

  const controls: SearchInputHandle = {
    getValue: () => query,
    focus: () => inputRef.current?.focus(),
    clear: () => {
      setSearchQuery('')
      setShowDropdown(false)
      setFocusedIndex(-1)
      setSearchState('idle')
      searchIdRef.current++
    },
    expand,
    collapse: () => collapse(false),
    submit: () => handleSubmitFromHook(),
    close: (action = 'preserve') => {
      switch (action) {
        case 'clear':
          collapse(true)
          break
        case 'submit':
          handleSubmitFromHook()
          collapse(true)
          break
        default:
          collapse(false)
          break
      }
    }
  }

  return {
    containerRef,  
    inputRef,
    buttonRef,
    dropdownRef,
    query,
    suggestions: suggestions || [],
    focusedIndex,
    showDropdown,
    isExpanded,
    expansionState,
    isAnimating,
    searchStatus,
    instanceId: instanceIdRef.current,
    handlers: {
      handleInputChange,
      handleKeyDown,
      handleSearchClick,
      handleOutsideClick,
      handleSelect,
      handleFocus,
      handleBlur,
      handleTransitionEnd
    },
    controls,
  };
}