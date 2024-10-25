// src/main/components/Search/SearchInput.tsx
import React, { forwardRef, useImperativeHandle } from 'react'
import { 
  SearchInputProps, 
  SearchInputHandle,
  SearchInputConfig
} from './types'
import { 
  Dropdown, 
  DropdownContent,
  NavButton, 
  SearchIcon 
} from '../Interface'
import { useSearchInput } from './useSearchInput'

const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(({
  className = '',
  showButton = true,
  autoFocus = false,
  isExpandable = false,
  onSubmit,
  onClose,
  translations,
}, ref) => {
  const config: SearchInputConfig = {
    isExpandable,
    onSubmit,
    onClose
  };

  const {
    inputRef,
    query,
    suggestions,
    focusedIndex,
    showDropdown,
    searchStatus,
    handlers,
    controls
  } = useSearchInput(translations, config);

  // Expose the controls via ref
  useImperativeHandle(ref, () => controls, [controls])

  const renderSuggestionContent = () => {
    console.log('Rendering suggestions:', { 
      status: searchStatus, 
      suggestions,
      showDropdown 
    }) // Debug log
  
    if (searchStatus.type !== 'success') {
      return (
        <div className="px-4 py-2 text-txcolor-secondary">
          {searchStatus.type === 'minChars' && translations.minCharacters}
          {searchStatus.type === 'searching' && translations.searching}
          {searchStatus.type === 'noResults' && translations.noResults}
        </div>
      );
    }
  
    return (
      <ul role="listbox" id="search-suggestions">
        {suggestions.map((suggestion, index) => (
          <li 
            key={suggestion.slug}
            role="option"
            aria-selected={index === focusedIndex}
            onClick={() => handlers.handleSelect(suggestion.slug, suggestion.rubric_slug)}
            className={`
              px-4 py-2 cursor-pointer
              ${index === focusedIndex 
                ? 'bg-prcolor text-txcolor-inverted' 
                : 'text-txcolor hover:bg-bgcolor-accent'}
            `}
          >
            <div className="font-medium">{suggestion.title}</div>
            {suggestion.description && (
              <div className="text-sm truncate">{suggestion.description}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="relative w-full">
      <div className={`
        group flex items-center
        bg-bgcolor-accent shadow-md
        focus-within:ring-2 focus-within:ring-prcolor-dark
        transition-colors duration-300
        theme-default:rounded-lg
        theme-rounded:rounded-3xl
        theme-sharp:rounded-none
        ${className}
      `}>
        <input
          ref={inputRef}
          type="text"
          className={`
            w-full py-2 pl-3 pr-2
            bg-transparent
            text-txcolor placeholder-txcolor-muted
            focus:outline-none
          `}
          placeholder={translations.placeholder}
          value={query}
          onChange={handlers.handleInputChange}
          onKeyDown={handlers.handleKeyDown}
          onFocus={handlers.handleFocus}
          onBlur={handlers.handleBlur}
          autoFocus={autoFocus}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
        />

        {showButton && (
          <NavButton
            context="desktop"
            onClick={handlers.handleSearchClick}
            noHover={true}
            aria-label={translations.submit}
            icon={<SearchIcon className="h-5 w-5" />}
            className="h-full px-2 flex items-center justify-center"
          />
        )}
      </div>

      {showDropdown && (
        <Dropdown forceOpen={true} onOutsideClick={handlers.handleOutsideClick}>
          <DropdownContent width="search" align="left">
            {renderSuggestionContent()}
          </DropdownContent>
        </Dropdown>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput'

export default SearchInput