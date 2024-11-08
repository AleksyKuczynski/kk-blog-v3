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
  isExpandable: boolean = false,
  mode: 'expandable' | 'standard' = 'standard',
  onClose?: () => void
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
  const [isExpanded, setIsExpanded] = useState(false)  // New explicit expansion state
  const [searchState, setSearchState] = useState<'idle' | 'pending' | 'searching' | 'complete'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  const searchIdRef = useRef(0)

  const handleFocus = useCallback(() => {
    if (isExpandable) {
      setIsExpanded(true)
      setShowDropdown(true)
    } else {
      setShowDropdown(true)
    }
  }, [isExpandable])

  const handleBlur = useCallback(() => {
    if (!isExpandable) {
      setTimeout(() => {
        setShowDropdown(false)
      }, 200)
    }
  }, [isExpandable])

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

  const handleSearchClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    
    const isValid = query.trim().length >= 3
    
    if (isExpandable) {
      if (!isValid) {
        if (isExpanded) {
          setSearchQuery('')
          setIsExpanded(false)
          setShowDropdown(false)
          setFocusedIndex(-1)
          setSearchState('idle')
          onClose?.()
        } else {
          setIsExpanded(true)
          setShowDropdown(true)
          // Use requestAnimationFrame to ensure state updates before focusing
          requestAnimationFrame(() => {
            inputRef.current?.focus()
          })
        }
      } else {
        handleSubmitFromHook()
        setIsExpanded(false)
        onClose?.()
      }
    } else {
      if (isValid) {
        handleSubmitFromHook()
      }
    }
  }, [
    query, 
    isExpandable, 
    isExpanded,
    setSearchQuery, 
    handleSubmitFromHook,
    onClose
  ])

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

  const handleOutsideClick = useCallback(() => {
    if (isExpandable) {
      setIsExpanded(false)
      setShowDropdown(false)
      setFocusedIndex(-1)
      onClose?.()
    } else {
      setShowDropdown(false)
      setFocusedIndex(-1)
    }
  }, [isExpandable, onClose])

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
    isExpanded,
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