// src/main/components/Search/useSearchInput.ts
import { useRef, useCallback, useState, useMemo } from 'react'
import { 
  SearchInputConfig, 
  SearchInputHandle, 
  SearchInputManagement,
  SearchStatus
} from './types'
import { useSearch } from './useSearch'
import { SearchTranslations } from '@/main/lib/dictionaries/types'
import { useDebounce } from '@/main/lib/hooks'

export function useSearchInput(
  translations: SearchTranslations,
  config: SearchInputConfig
): SearchInputManagement {
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
  const [searchState, setSearchState] = useState<'idle' | 'pending' | 'searching' | 'complete'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  const searchIdRef = useRef(0)

  const handleFocus = useCallback(() => {
    setShowDropdown(true)
  }, [])

  const handleBlur = useCallback(() => {
    // Keep the timeout to allow click events to process
    setTimeout(() => {
      if (!config.isExpandable) {
        setShowDropdown(false)
      }
    }, 200)
  }, [config.isExpandable])

  const triggerSearch = useCallback(async (value: string) => {
    const currentSearchId = ++searchIdRef.current
    
    if (value.length >= 3) {
      setSearchState('searching')
      await handleSearch(value)
      
      // Only update if this is still the current search
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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowDropdown(true)
    setFocusedIndex(-1)
    
    // Reset search ID and trigger new search
    searchIdRef.current++
    if (value.length < 3) {
      setSearchState('idle')
    }
    debouncedSearch(value)
  }, [setSearchQuery, debouncedSearch])

  const handleSelect = useCallback((slug: string, rubricSlug: string) => {
    handleSelectFromHook(slug, rubricSlug)
    setShowDropdown(false)
    setFocusedIndex(-1)
  }, [handleSelectFromHook])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        if (showDropdown && focusedIndex >= 0 && suggestions[focusedIndex]) {
          // Handle suggestion selection
          const selected = suggestions[focusedIndex]
          handleSelect(selected.slug, selected.rubric_slug)
        } else {
          // Handle search submission
          const isValid = query.trim().length >= 3
          if (isValid) {
            handleSubmitFromHook()
            if (config.mode === 'expandable') {
              config.onClose?.()
            }
          } else if (config.mode === 'expandable') {
            config.onClose?.()
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
        setShowDropdown(false)
        setFocusedIndex(-1)
        if (config.mode === 'expandable') {
          config.onClose?.()
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
    config
  ])
    
  const handleSearchClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    
    const isValid = query.trim().length >= 3
    if (isValid) {
      handleSubmitFromHook()
      if (config.mode === 'expandable') {
        config.onClose?.()
      }
    } else if (config.mode === 'expandable') {
      config.onClose?.()
    }
  }, [query, handleSubmitFromHook, config])

  const handleOutsideClick = useCallback(() => {
    setShowDropdown(false)
    setFocusedIndex(-1)
  }, [])

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
          setSearchState('idle')
          searchIdRef.current++
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
  }
}