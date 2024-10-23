// src/main/components/Search/SearchInput.tsx
'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { Dropdown, DropdownContent, DropdownTrigger, NavButton, SearchIcon } from '../Interface';
import { useSearchInput } from './useSearchInput';
import { SearchInputProps, SearchInputHandle } from './types';

const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(({
  className = '',
  showButton = true,
  translations,
  isExpandable = false,
  autoFocus = false,
  onSubmit,
  onClose,
}, ref) => {
  const {
    searchQuery,
    suggestions,
    hasInteracted,
    isSearching,
    isInputValid,
    showMinCharMessage,
    showSearchingMessage,
    showNoResultsMessage,
    focusedIndex,
    inputRef,
    handleInputChange,
    handleKeyDown,
    handleSelect,
    handleSearchSubmit
  } = useSearchInput(onSubmit);

  useImperativeHandle(ref, () => ({
    getInputValue: () => searchQuery,
    focus: () => inputRef.current?.focus(),
    close: () => onClose?.(),
  }));

  const handleSubmitClick = () => {
    handleSearchSubmit();
    if (isExpandable && !isInputValid) {
      onClose?.();
    }
  };

  const containerStyles = {
    wrapper: `
      relative 
      w-full
    `,
    inputGroup: `
      group
      flex items-center
      bg-bgcolor-accent 
      shadow-md
      focus-within:ring-2 focus-within:ring-prcolor-dark
      transition-colors duration-300
      theme-default:rounded-lg
      theme-rounded:rounded-full
      theme-sharp:rounded-none
      ${className}
    `,
    input: `
      w-full py-2 pl-3 pr-2
      bg-transparent
      text-txcolor 
      placeholder-txcolor-muted 
      focus:outline-none
    `,
    button: `
      h-full px-2
      flex items-center justify-center
      transition-colors duration-200
    `,
    dropdownContent: `
      w-full mt-1
      bg-bgcolor-alt
      border border-txcolor-muted
      shadow-lg
      theme-default:rounded-lg
      theme-rounded:rounded-2xl
      theme-sharp:rounded-none
    `,
    dropdownItem: `
      w-full px-4 py-2
      text-txcolor
      hover:bg-bgcolor-accent
      cursor-pointer
      transition-colors duration-200
    `,
    activeDropdownItem: `
      bg-prcolor 
      text-txcolor-inverted
      hover:bg-prcolor-dark
    `
  };

  return (
    <Dropdown>
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
              aria-expanded={hasInteracted}
              aria-controls="search-suggestions"
              aria-haspopup="listbox"
            />
          </DropdownTrigger>

          {showButton && (
            <NavButton
              context="desktop"
              onClick={handleSubmitClick}
              noHover={true}
              aria-label={translations.submit}
              className={containerStyles.button}
              icon={<SearchIcon className="h-5 w-5" />}
            />
          )}
        </div>

        {hasInteracted && (
          <DropdownContent className={containerStyles.dropdownContent}>
            {showMinCharMessage && (
              <div className={containerStyles.dropdownItem}>
                {translations.minCharacters}
              </div>
            )}
            
            {showSearchingMessage && (
              <div className={containerStyles.dropdownItem}>
                {translations.searching}
              </div>
            )}
            
            {showNoResultsMessage && (
              <div className={containerStyles.dropdownItem}>
                {translations.noResults}
              </div>
            )}

            {isInputValid && !isSearching && suggestions.length > 0 && (
              <ul role="listbox" id="search-suggestions">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={suggestion.slug}
                    role="option"
                    aria-selected={index === focusedIndex}
                    onClick={() => handleSelect(suggestion.slug, suggestion.rubric_slug)}
                    className={`
                      ${containerStyles.dropdownItem}
                      ${index === focusedIndex ? containerStyles.activeDropdownItem : ''}
                    `}
                  >
                    <div className="font-medium">{suggestion.title}</div>
                    {suggestion.description && (
                      <div className="text-sm text-txcolor-secondary truncate">
                        {suggestion.description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </DropdownContent>
        )}
      </div>
    </Dropdown>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;