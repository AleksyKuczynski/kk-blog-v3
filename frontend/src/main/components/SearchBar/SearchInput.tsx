// src/main/components/SearchBar/SearchInput.tsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTheme } from '@/main/components/ThemeContext';
import { Dropdown } from '../Dropdown';
import { NavButton } from '../Navigation/NavButton';
import { SearchIcon } from '../Icons';
import { useSearchInput } from '@/main/lib/useSearchInput';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { animationClasses } from '../animationClasses';

interface SearchInputProps {
  className?: string;
  onSubmit?: () => void;
  showButton?: boolean;
  translations: SearchTranslations;
  autoFocus?: boolean;
  isExpandable?: boolean;
  initiallyExpanded?: boolean;
  onClose?: () => void;
}

export interface SearchInputHandle {
  getInputValue: () => string;
  focus: () => void;
  close: () => void;
}

const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(({
  className = '',
  onSubmit,
  showButton = true,
  translations,
  autoFocus = false,
  isExpandable = false,
  onClose,
}, ref) => {
  const {
    searchQuery,
    suggestions,
    hasInteracted,
    focusedIndex,
    isInputValid,
    showMinCharMessage,
    showSearchingMessage,
    showNoResultsMessage,
    handleSearch,
    handleSelect,
    handleSearchSubmit,
    handleKeyDown,
  } = useSearchInput(() => {
    onSubmit?.();
    if (isExpandable && !isInputValid) {
      onClose?.();
    }
  });

  const { currentTheme } = useTheme();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getInputValue: () => searchQuery,
    focus: () => inputRef.current?.focus(),
    close: () => onClose?.(),
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleSubmitClick = () => {
    handleSearchSubmit();
    if (isExpandable && !isInputValid) {
      onClose?.();
    }
  };

  const getGroupStyles = () => {
    switch (currentTheme) {
      case 'rounded':
        return '';
      case 'sharp':
        return '';
      default:
        return '';
    }
  };

  const groupStyles = `
    group
    flex items-center
    bg-background-accent dark:bg-neutral-800 
    shadow-md
    rounded-[var(--border-radius)]
    focus-within:ring-2 focus-within:ring-secondary-dark
    transition-colors duration-300
    ${getGroupStyles()}
    ${animationClasses.transition}
    ${className}
  `;

  const inputStyles = `
    w-full py-2 pl-3 pr-2
    bg-transparent
    text-text-primary dark:text-text-inverted 
    placeholder-text-secondary dark:placeholder-neutral-400 
    focus:outline-none
    ${showButton ? 'rounded-r-none' : getGroupStyles()}
  `;

  const buttonStyles = `
    h-full
  `;

  return (
    <div className="relative" ref={inputWrapperRef}>
      <div className={groupStyles}>
        <input
          ref={inputRef}
          type="text"
          className={inputStyles}
          placeholder={translations.placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
      {hasInteracted && (
        <Dropdown 
          isOpen={true}
          onClose={() => {}}
          width="search"
          parentRef={inputWrapperRef}
        >
          {showMinCharMessage && (
            <p className="px-4 py-2 text-text-secondary dark:text-text-invsecondary">{translations.minCharacters}</p>
          )}
          {showSearchingMessage && (
            <p className="px-4 py-2 text-text-secondary dark:text-text-invsecondary">{translations.searching}</p>
          )}
          {showNoResultsMessage && (
            <p className="px-4 py-2 text-text-secondary dark:text-text-invsecondary">{translations.noResults}</p>
          )}
          {isInputValid && suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={suggestion.slug}>
                  <button
                    className={`w-full text-left px-4 py-2 ${index === focusedIndex ? 'bg-secondary text-text-inverted' : ''}`}
                    onClick={() => {
                      handleSelect(suggestion.slug, suggestion.rubric_slug);
                      if (isExpandable) onClose?.();
                    }}
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