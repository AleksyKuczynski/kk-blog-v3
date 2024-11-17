// src/main/components/Search/SearchInput.tsx
import React, { forwardRef } from 'react';
import { NavButton, SearchIcon } from '../Interface';
import { useSearchContext } from './SearchContext';
import { useTheme } from '../ThemeSwitcher';
import SearchSuggestionItem from './SearchSuggestionItem';
import { SearchDropdownContent } from './SearchDropdownContent';
import { SearchInputHandle, SearchInputProps } from './types';
import { cn } from '@/main/lib/utils';
import { ANIMATION_DURATION } from '../Interface/constants';

const containerStyles = {
  base: 'relative flex-grow bg-bgcolor-accent shadow-md focus-within:ring-2 focus-within:ring-prcolor-dark',
  theme: {
    default: 'rounded-lg',
    rounded: 'rounded-lg',
    sharp: 'border-2 border-prcolor',
  },
  motion: {
    expanded: `transition-all duration-${ANIMATION_DURATION} w-full transform-none`,
    expanding: `transition-all duration-${ANIMATION_DURATION} w-full scale-x-100 origin-right`,
    collapsing: `transition-all duration-${ANIMATION_DURATION} w-0 scale-x-0 origin-right`,
    collapsed: 'w-0 scale-x-0'
  }
};

const inputStyles = {
  base: 'w-full py-2 bg-transparent text-txcolor placeholder-txcolor-muted focus:outline-none',
  theme: {
    default: 'px-3',
    rounded: 'px-4',
    sharp: 'px-3 border-none',
  },
};

const statusMessageStyles = {
  base: 'px-4 py-2 text-txcolor-secondary',
  theme: {
    default: '',
    rounded: 'rounded-lg mx-2',
    sharp: 'border-l-2 border-prcolor',
  },
};

const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(({
  className = '',
  autoFocus = false,
  translations,
  isExpandable = false
}, ref) => {
  const { currentTheme } = useTheme();
  
  const { 
    inputManagement: {
      containerRef,
      inputRef,
      buttonRef,
      query,
      suggestions,
      focusedIndex,
      showDropdown,
      isExpanded,
      isExpanding,
      expansionState,
      searchStatus,
      instanceId,
      handlers: {
        handleInputChange,
        handleKeyDown,
        handleSearchClick,
        handleSelect,
        handleFocus,
        handleBlur,
        handleTransitionEnd
      }
    },
  } = useSearchContext();

  // Determine if input should be visible
  const shouldShowInput = isExpandable ? 
  (isExpanding || expansionState !== 'collapsed') : 
  true;

const containerClassName = cn(
  containerStyles.base,
  containerStyles.theme[currentTheme],
  isExpandable && {
    [containerStyles.motion.expanding]: isExpanding,
    [containerStyles.motion.expanded]: expansionState === 'expanded',
    [containerStyles.motion.collapsing]: expansionState === 'collapsing',
    [containerStyles.motion.collapsed]: expansionState === 'collapsed'
  },
  isExpandable && 'transform origin-right',
  className
);

  // Only show dropdown when expanded and not animating
  const shouldShowDropdown = showDropdown && expansionState !== 'collapsing';

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex gap-2 items-center">
        {shouldShowInput && (
          <div 
          className={cn(
            containerClassName,
            'overflow-hidden', // Add this to prevent content flash
            !shouldShowInput && 'invisible' // Use invisible instead of conditional rendering
          )}
            onTransitionEnd={handleTransitionEnd}
          >
            <input
              ref={inputRef}
              type="text"
              className={cn(
                inputStyles.base,
                inputStyles.theme[currentTheme],
                !isExpandable && 'w-full'
              )}
              placeholder={translations.placeholder}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoFocus={autoFocus}
              role="combobox"
              aria-expanded={showDropdown}
              aria-controls={`search-suggestions-${instanceId}`}
              aria-autocomplete="list"
              aria-label={translations.placeholder}
            />
          </div>
        )}

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

        <SearchDropdownContent 
          isOpen={showDropdown}
          isVisible={isExpanded}
          expansionState={expansionState}
          className="max-h-[80vh] overflow-y-auto"
        >
          {searchStatus.type !== 'success' ? (
            <div className={cn(
              statusMessageStyles.base,
              statusMessageStyles.theme[currentTheme]
            )}>
              {searchStatus.type === 'minChars' && translations.minCharacters}
              {searchStatus.type === 'searching' && translations.searching}
              {searchStatus.type === 'noResults' && translations.noResults}
            </div>
          ) : (
            <ul 
              id={`search-suggestions-${instanceId}`}
              role="listbox"
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
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;