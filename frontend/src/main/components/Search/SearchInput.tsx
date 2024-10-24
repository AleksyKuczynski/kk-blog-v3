// src/main/components/Search/SearchInput.tsx
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownContent,
  NavButton, 
  SearchIcon 
} from '../Interface'
import { useSearchInput } from './useSearchInput'
import { 
  SearchInputProps,
  SearchInputHandle,
  SearchInputState
} from './types'

const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(({
  className = '',
  translations,
  showButton = true,
  autoFocus = false,
  isExpandable = false,
  onSubmit,
  onClose,
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  
  const {
    searchQuery,
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
    handleSearchSubmit
  } = useSearchInput(    
    autoFocus,
    () => {
    onSubmit?.()
    if (isExpandable && !isInputValid) {
      onClose?.()
    }}
  )

  useImperativeHandle(ref, () => ({
    getInputValue: () => searchQuery,
    focus: () => inputRef.current?.focus(),
    close: () => onClose?.(),
  }))

  const handleSubmitClick = () => {
    handleSearchSubmit()
    if (isExpandable && !isInputValid) {
      onClose?.()
    }
  }


  
  // Determine current search state
  const searchState: SearchInputState = hasInteracted 
    ? showMinCharMessage ? { status: 'minChars' }
    : showSearchingMessage ? { status: 'searching' }
    : showNoResultsMessage ? { status: 'noResults' }
    : suggestions.length > 0 ? { status: 'hasResults', suggestions }
    : { status: 'idle' }
    : { status: 'idle' }


  const containerStyles = {
    wrapper: `relative w-full`,
    inputGroup: `
      group flex items-center
      bg-bgcolor-accent shadow-md
      focus-within:ring-2 focus-within:ring-prcolor-dark
      transition-colors duration-300
      theme-default:rounded-lg
      theme-rounded:rounded-3xl
      theme-sharp:rounded-none
      ${className}
    `,
    input: `
      w-full py-2 pl-3 pr-2
      bg-transparent
      text-txcolor placeholder-txcolor-muted
      focus:outline-none
    `,
    button: `h-full px-2 flex items-center justify-center`,
    dropdownContent: `w-full mt-1`,
    message: `px-4 py-2 text-txcolor-secondary`,
    suggestion: (isActive: boolean) => `
      px-4 py-2 cursor-pointer
      ${isActive 
        ? 'bg-prcolor text-txcolor-inverted' 
        : 'text-txcolor hover:bg-bgcolor-accent'}
    `
  }

  const shouldShowDropdown = hasInteracted || (autoFocus && searchQuery.length > 0);

  return (
    <Dropdown forceOpen={shouldShowDropdown}>
      <div className={containerStyles.wrapper}>
        <div className={containerStyles.inputGroup}>
          <DropdownTrigger>
            <input
              ref={inputRef}
              type="text"
              className={containerStyles.input}
              placeholder={translations.placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus={autoFocus}
              role="combobox"
              aria-expanded={shouldShowDropdown}
              aria-controls="search-suggestions"
              aria-autocomplete="list"
            />
          </DropdownTrigger>

          {showButton && (
            <NavButton
              context="desktop"
              onClick={handleSubmitClick}
              noHover={true}
              aria-label={translations.submit}
              icon={<SearchIcon className="h-5 w-5" />}
              className={containerStyles.button}
            />
          )}
        </div>

        {hasInteracted && (
          <DropdownContent className={containerStyles.dropdownContent}>
            {(() => {
              switch (searchState.status) {
                case 'minChars':
                  return <div className={containerStyles.message}>{translations.minCharacters}</div>
                case 'searching':
                  return <div className={containerStyles.message}>{translations.searching}</div>
                case 'noResults':
                  return <div className={containerStyles.message}>{translations.noResults}</div>
                case 'hasResults':
                  return (
                    <ul role="listbox" id="search-suggestions">
                      {searchState.suggestions.map((suggestion, index) => (
                        <li 
                          key={suggestion.slug}
                          role="option"
                          aria-selected={index === focusedIndex}
                          onClick={() => handleSelect(suggestion.slug, suggestion.rubric_slug)}
                          className={containerStyles.suggestion(index === focusedIndex)}
                        >
                          <div className="font-medium">{suggestion.title}</div>
                          {suggestion.description && (
                            <div className="text-sm truncate">{suggestion.description}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )
                default:
                  return null
              }
            })()}
          </DropdownContent>
        )}
      </div>
    </Dropdown>
  )
})

SearchInput.displayName = 'SearchInput'

export default SearchInput