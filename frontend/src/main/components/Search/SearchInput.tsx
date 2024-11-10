// src/main/components/Search/SearchInput.tsx
import React, { forwardRef, useImperativeHandle } from 'react'
import { 
  SearchInputProps,
  SearchInputHandle,
} from './types'
import { 
  NavButton, 
  SearchIcon,
} from '../Interface'
import { useSearchContext } from './SearchContext'
import SearchSuggestionItem from './SearchSuggestionItem';
import SearchDropdownContent from './SearchDropdownContent';

const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(({
  className = '',
  autoFocus = false,
  translations,
}, ref) => {
  const { 
    inputManagement,
    isExpanded,
  } = useSearchContext();

  useImperativeHandle(ref, () => inputManagement.controls, [inputManagement.controls]);

  const { 
    containerRef,
    inputRef,
    buttonRef,
    query,
    suggestions,
    focusedIndex,
    showDropdown,
    searchStatus,
    handlers: {
      handleInputChange,
      handleKeyDown,
      handleSearchClick,
      handleSelect,
      handleFocus,
      handleBlur
    }
  } = inputManagement;

  const containerClasses = `
    relative flex-grow
    bg-bgcolor-accent shadow-md
    focus-within:ring-2 focus-within:ring-prcolor-dark
    transition-all duration-300
    theme-default:rounded-lg
    theme-rounded:rounded-3xl
    theme-sharp:rounded-none
    ${isExpanded === false ? 'w-0 opacity-0' : 'w-full opacity-100'}
    ${className}
  `;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex gap-2 items-center">
        <div className={containerClasses}>
          <input
            ref={inputRef}
            type="text"
            className={`
              w-full py-2 px-3
              bg-transparent
              text-txcolor placeholder-txcolor-muted
              focus:outline-none
              ${isExpanded === false ? 'hidden' : ''}
            `}
            placeholder={translations.placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus={autoFocus}
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
            aria-label={translations.placeholder}
          />
        </div>

        <NavButton
          ref={buttonRef}
          context="desktop"
          onClick={handleSearchClick}
          noHover={false}
          aria-label={translations.submit}
          aria-expanded={isExpanded}
          icon={<SearchIcon className="h-5 w-5" />}
        />
      </div>

      {showDropdown && (
        <SearchDropdownContent 
          position="left"
          className="max-h-[80vh] overflow-y-auto"
        >
          {searchStatus.type !== 'success' ? (
            <div className="px-4 py-2 text-txcolor-secondary">
              {searchStatus.type === 'minChars' && translations.minCharacters}
              {searchStatus.type === 'searching' && translations.searching}
              {searchStatus.type === 'noResults' && translations.noResults}
            </div>
          ) : (
            <ul 
              id="search-suggestions"
              aria-label={translations.results}
            >
              {suggestions.map((suggestion, index) => (
                <SearchSuggestionItem
                  key={suggestion.slug}
                  title={suggestion.title}
                  description={suggestion.description}
                  isHighlighted={index === focusedIndex}
                  onSelect={() => handleSelect(suggestion.slug, suggestion.rubric_slug)}
                />
              ))}
            </ul>
          )}
        </SearchDropdownContent>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;