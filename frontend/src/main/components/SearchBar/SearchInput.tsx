// src/main/components/SearchBar/SearchInput.tsx
'use client';

import React from 'react';
import { useTheme } from '@/main/components/ThemeContext';
import { Dropdown } from '../Dropdown';
import { CustomButton } from '../CustomButton';
import { SearchIcon } from '../Icons';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { useSearchInput } from '@/main/lib/useSearchInput';

interface SearchInputProps {
  className?: string;
  onSubmit?: () => void;
  isVisible?: boolean;
  showButton?: boolean;
  translations: SearchTranslations;
  autoFocus?: boolean;
}

export interface SearchInputHandle {
  focus: () => void;
}

const SearchInput = React.forwardRef<SearchInputHandle, SearchInputProps>(({
  className = '',
  onSubmit,
  isVisible = true,
  showButton = true,
  translations,
  autoFocus = false,
}, ref) => {
  const { currentTheme } = useTheme();
  const {
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
  } = useSearchInput(onSubmit);

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  const inputClasses = `w-full py-2 pl-3 pr-12 
    bg-background-light dark:bg-neutral-800 
    text-text-primary dark:text-text-inverted 
    placeholder-text-secondary dark:placeholder-neutral-400 
    border border-secondary 
    focus:outline-none focus:ring-2 focus:ring-secondary-dark
    transition-colors duration-300
    ${currentTheme === 'rounded' ? 'rounded-full' : currentTheme === 'sharp' ? 'rounded-none' : 'rounded-md'}
    ${className}`;

  return (
    <div className={`relative ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300`}>
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          className={`${inputClasses} ${showButton ? 'rounded-r-none' : ''}`}
          placeholder={translations.placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus={autoFocus}
        />
        {showButton && (
          <CustomButton
            type="button"
            color="secondary"
            content="icon"
            style="no-border"
            className="h-full"
            icon={<SearchIcon className="h-5 w-5" />}
            onClick={handleSearchSubmit}
          />
        )}
      </div>
      {shouldShowDropdown && (
        <Dropdown 
          isOpen={true}
          onClose={() => {}}
          width="search"
        >
          {searchQuery.length < 3 ? (
            <p className="px-4 py-2 text-sm text-center text-text-secondary dark:text-neutral-400">
              {translations.minCharacters}
            </p>
          ) : suggestions.length === 0 ? (
            <p className="px-4 py-2 text-sm text-center text-text-secondary dark:text-neutral-400">
              {translations.noResults}
            </p>
          ) : (
            <ul className="max-h-60 overflow-auto py-1 text-base focus:outline-none sm:text-sm">
              {suggestions.map((suggestion, index) => (
                <li key={suggestion.slug}>
                  <button
                    className={`suggestion-item w-full text-left px-4 py-2 text-sm text-text-primary dark:text-text-inverted hover:bg-secondary hover:text-text-inverted transition duration-300 focus:outline-none focus:bg-secondary focus:text-text-inverted ${
                      index === focusedIndex ? 'bg-secondary text-text-inverted' : ''
                    }`}
                    onClick={() => handleSelect(suggestion.slug, suggestion.rubric_slug)}
                    tabIndex={-1}
                  >
                    {suggestion.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Dropdown>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;