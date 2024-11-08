// src/main/components/Search/SearchInput.tsx
import React, { forwardRef, useImperativeHandle } from 'react'
import { 
  SearchInputProps,
  SearchInputHandle,
} from './types'
import { 
  Dropdown, 
  DropdownContent,
  NavButton, 
  SearchIcon 
} from '../Interface'
import { useSearchContext } from './SearchContext';

const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(({
  className = '',
  autoFocus = false,
  translations,
}, ref) => {
  const { 
    inputManagement,
    isExpanded,
  } = useSearchContext();

  // Use the forwarded ref to expose the input controls
  useImperativeHandle(ref, () => inputManagement.controls, [inputManagement.controls]);

  const { 
    inputRef,
    query,
    suggestions,
    focusedIndex,
    showDropdown,
    searchStatus,
    handlers: {
      handleInputChange,
      handleKeyDown,
      handleSearchClick,
      handleOutsideClick,
      handleSelect,
      handleFocus,
      handleBlur
    }
  } = inputManagement;

  const renderSuggestionContent = () => {
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
            onClick={() => handleSelect(suggestion.slug, suggestion.rubric_slug)}
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
    <div className="relative w-full">
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
          />
        </div>

        <NavButton
          context="desktop"
          onClick={handleSearchClick}
          noHover={false}
          aria-label={translations.submit}
          aria-expanded={isExpanded}
          icon={<SearchIcon className="h-5 w-5" />}
        />
      </div>

      {showDropdown && (
        <Dropdown forceOpen={true} onOutsideClick={handleOutsideClick}>
          <DropdownContent width="search" align="left">
            {renderSuggestionContent()}
          </DropdownContent>
        </Dropdown>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;