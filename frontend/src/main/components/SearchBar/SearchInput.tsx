// src/main/components/SearchBar/SearchInput.tsx
'use client';

import React from 'react';
import { useTheme } from '@/main/components/ThemeContext';
import { Dropdown } from '../Dropdown';
import { useSearch } from '@/main/lib/useSearch';
import { Theme } from '@/main/lib/actions';

interface SearchInputProps {
  className?: string;
  onSubmit?: () => void;
  isVisible?: boolean;
}

const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const getBaseInputClasses = (theme: Theme) => `
  w-full py-2 pl-3 pr-12 
  bg-background-light dark:bg-neutral-800 
  text-text-primary dark:text-text-inverted 
  placeholder-text-secondary dark:placeholder-neutral-400 
  border border-secondary 
  focus:outline-none focus:ring-2 focus:ring-secondary-dark
  transition-colors duration-300
  ${theme === 'rounded' ? 'rounded-full' : theme === 'sharp' ? 'rounded-none' : 'rounded-md'}
`;

const getDropdownClasses = (theme: Theme) => `
  absolute z-10 w-full mt-1 
  bg-background-light dark:bg-neutral-800 
  shadow-lg border-2 border-accent overflow-hidden
  ${theme === 'rounded' ? 'rounded-2xl' : theme === 'sharp' ? 'rounded-none' : 'rounded-md'}
`;

export function SearchInput({ className = '', onSubmit, isVisible = true }: SearchInputProps) {
  const { currentTheme } = useTheme();
  const {
    searchQuery,
    suggestions,
    showDropdown,
    hasInteracted,
    searchInputRef,
    dropdownRef,
    translations,
    handleSearch,
    handleSelect,
    handleSearchSubmit,
    handleKeyDown,
    handleSuggestionKeyDown,
    setShowDropdown,
  } = useSearch(onSubmit || (() => {}));

  const inputClasses = `${getBaseInputClasses(currentTheme)} ${className}`;
  const dropdownClasses = getDropdownClasses(currentTheme);

  return (
    <div className={`relative ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300`}>
      <input
        ref={searchInputRef}
        type="text"
        className={inputClasses}
        placeholder={translations.placeholder}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShowDropdown(searchQuery.length > 0)}
        onKeyDown={handleKeyDown}
      />
      <Dropdown 
        isOpen={showDropdown && hasInteracted} 
        onClose={() => setShowDropdown(false)}
        width="search"
        className={dropdownClasses}
      >
        <div ref={dropdownRef}>
          {searchQuery.length < 3 ? (
            <p className="px-4 py-2 text-sm text-center text-text-secondary dark:text-neutral-400">{translations.minCharacters}</p>
          ) : suggestions.length === 0 ? (
            <p className="px-4 py-2 text-sm text-center text-text-secondary dark:text-neutral-400">{translations.noResults}</p>
          ) : (
            <ul className="max-h-60 overflow-auto py-1 text-base focus:outline-none sm:text-sm">
              {suggestions.map((suggestion, index) => (
                <li key={suggestion.slug}>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-text-primary dark:text-text-inverted hover:bg-secondary hover:text-text-inverted transition duration-300"
                    onClick={() => handleSelect(suggestion.slug, suggestion.rubric_slug)}
                    onKeyDown={(e) => handleSuggestionKeyDown(e, index)}
                  >
                    {truncateText(suggestion.title, 64)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Dropdown>
    </div>
  );
}