// src/main/components/Search/useSearchInput.ts
import { useState, useCallback, KeyboardEvent, ChangeEvent } from 'react'
import { useSearch } from './useSearch'
import { UseSearchInputReturn } from './types'
import { useDebounce } from '@/main/lib/hooks'

export function useSearchInput(autoFocus: boolean = false, onSubmit?: () => void): UseSearchInputReturn {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [inputValue, setInputValue] = useState('')  // Local state for immediate input
  const [isInitialFocus, setIsInitialFocus] = useState(autoFocus)
  
  const {
    searchQuery,
    suggestions,
    hasInteracted,
    isSearching,
    handleSearch,
    handleSelect,
    handleSearchSubmit
  } = useSearch(onSubmit)

  // Debounce the API call, not the input update
  const debouncedSearch = useDebounce((value: string) => {
    handleSearch(value)
  }, 300)

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setIsInitialFocus(false)
    debouncedSearch(value)
  }, [debouncedSearch])

  const isInputValid = inputValue.length >= 3
  const effectiveHasInteracted = hasInteracted || (isInitialFocus && isInputValid)
  const showMinCharMessage = effectiveHasInteracted && !isInputValid
  const showSearchingMessage = isInputValid && isSearching
  const showNoResultsMessage = isInputValid && !isSearching && effectiveHasInteracted && suggestions.length === 0

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0 && isInputValid) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : prev
          )
          break
          
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
          
        case 'Enter':
          e.preventDefault()
          if (focusedIndex >= 0) {
            const selected = suggestions[focusedIndex]
            handleSelect(selected.slug, selected.rubric_slug)
          } else {
            handleSearchSubmit()
          }
          break
          
        case 'Escape':
          e.preventDefault()
          setFocusedIndex(-1)
          break
      }
    } else if (e.key === 'Enter' && isInputValid) {
      e.preventDefault()
      handleSearchSubmit()
    }
  }, [suggestions, focusedIndex, handleSelect, handleSearchSubmit, isInputValid])

  return {
    searchQuery: inputValue,  // Use local state for immediate feedback
    suggestions,
    hasInteracted,
    isSearching,
    focusedIndex,
    isInputValid,
    showMinCharMessage,
    showSearchingMessage,
    showNoResultsMessage,
    handleInputChange,
    handleKeyDown,
    handleSelect,
    handleSearchSubmit,
  }
}