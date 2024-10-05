// src/main/components/Search/SearchInput.tsx

import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react';
import { Dropdown, DropdownItem, NavButton, SearchIcon } from '../Interface';
import { useSearchInput } from './useSearchInput';
import {
  SearchInputProps,
  SearchInputHandle,
  UseSearchInputReturn,
  SearchInputState
} from './types';
import { animationClasses } from '../animationClasses';

const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(({
  className = '',
  onSubmit,
  showButton = true,
  translations,
  autoFocus = false,
  isExpandable = false,
  onClose,
}, ref) => {
  const searchInput: UseSearchInputReturn = useSearchInput(() => {
    onSubmit?.();
    if (isExpandable && !searchInput.isInputValid) {
      onClose?.();
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getInputValue: () => searchInput.searchQuery,
    focus: () => inputRef.current?.focus(),
    close: () => onClose?.(),
  }));

  const searchState: SearchInputState = useMemo(() => {
    if (!searchInput.hasInteracted) return { status: 'idle' };
    if (searchInput.showMinCharMessage) return { status: 'minChars' };
    if (searchInput.showSearchingMessage) return { status: 'searching' };
    if (searchInput.showNoResultsMessage) return { status: 'noResults' };
    return { status: 'hasResults', suggestions: searchInput.suggestions };
  }, [searchInput]);

  const groupStyles = `
    group
    flex items-center
    bg-bgcolor-accent 
    shadow-md
    focus-within:ring-2 focus-within:ring-prcolor-dark
    transition-colors duration-300
    rounded-[var(--border-radius)]
    ${animationClasses.transition}
    ${className}
  `;

  const inputStyles = `
    w-full py-2 pl-3 pr-2
    bg-transparent
    text-txcolor 
    placeholder-txcolor-muted 
    focus:outline-none
  `;

  const buttonStyles = `
    h-full
  `;

  const handleSubmitClick = () => {
    searchInput.handleSearchSubmit();
    if (isExpandable && !searchInput.isInputValid) {
      onClose?.();
    }
  };

  return (
    <div className="relative" ref={inputWrapperRef}>
      <div className={groupStyles}>
        <input
          ref={inputRef}
          type="text"
          className={inputStyles}
          placeholder={translations.placeholder}
          value={searchInput.searchQuery}
          onChange={searchInput.handleInputChange}
          onKeyDown={searchInput.handleKeyDown}
          autoFocus={autoFocus}
        />
        {showButton && (
          <NavButton
            context="desktop"
            onClick={handleSubmitClick}
            noHover={true}
            aria-label={translations.submit}
            icon={<SearchIcon className="h-6 w-6" />}
            className={buttonStyles}
          />
        )}
      </div>
      {searchInput.hasInteracted && (
        <Dropdown 
          isOpen={true}
          onClose={() => {}}
          width="search"
          parentRef={inputWrapperRef}
        >
          {searchState.status === 'minChars' && (
            <DropdownItem state="normal">
              {translations.minCharacters}
            </DropdownItem>
          )}
          {searchState.status === 'searching' && (
            <DropdownItem state="normal">
              {translations.searching}
            </DropdownItem>
          )}
          {searchState.status === 'noResults' && (
            <DropdownItem state="normal">
              {translations.noResults}
            </DropdownItem>
          )}
          {searchState.status === 'hasResults' && (
            <ul>
              {searchState.suggestions.map((suggestion, index) => (
                <li key={suggestion.slug}>
                  <DropdownItem
                    state={index === searchInput.focusedIndex ? 'active' : 'normal'}
                    onClick={() => searchInput.handleSelect(suggestion.slug, suggestion.rubric_slug)}
                  >
                    {suggestion.title}
                  </DropdownItem>
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