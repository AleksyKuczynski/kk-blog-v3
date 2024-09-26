// src/main/components/SearchBar/SearchInput.tsx
'use client';

import { SearchIcon } from '@/main/components/Icons';
import { CustomButton } from '../CustomButton';
import { useTheme } from '@/main/components/ThemeContext';
import { Dropdown } from '../Dropdown';
import { useSearch } from '@/main/lib/useSearch';

const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const searchInputStyles = {
  container: 'relative w-full',
  input: {
    default: 'w-full border-2 border-accent bg-background-light dark:bg-neutral-800 py-2 pl-3 pr-24 text-text-primary dark:text-text-inverted placeholder-text-secondary dark:placeholder-neutral-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-200 rounded-lg',
    rounded: 'w-full border-2 border-accent bg-background-light dark:bg-neutral-800 py-2 pl-3 pr-24 text-text-primary dark:text-text-inverted placeholder-text-secondary dark:placeholder-neutral-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-200 rounded-full',
    sharp: 'w-full border-2 border-accent bg-background-light dark:bg-neutral-800 py-2 pl-3 pr-24 text-text-primary dark:text-text-inverted placeholder-text-secondary dark:placeholder-neutral-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-200',
  },
  dropdownItem: 'w-full text-left px-4 py-2 text-sm text-text-primary dark:text-text-inverted hover:bg-secondary hover:text-text-inverted transition duration-300',
};

interface SearchInputProps {
  isVisible: boolean;
  onCollapse: () => void;
}

export function SearchInput({ isVisible, onCollapse }: SearchInputProps) {
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
  } = useSearch(onCollapse);

  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'rounded':
        return 'rounded-full';
      case 'sharp':
        return 'rounded-none';
      default:
        return 'rounded-lg';
    }
  };

  return (
    <div className={`relative w-full ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300`}>
      <div className={`relative w-full flex ${getThemeClasses()}`}>
        <input
          ref={searchInputRef}
          type="text"
          className={`w-full border-2 border-accent bg-background-light py-2 pl-3 pr-24 text-text-primary placeholder-text-secondary shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300 ${getThemeClasses()}`}
          placeholder={translations.placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowDropdown(searchQuery.length > 0)}
          onKeyDown={handleKeyDown}
        />
        <CustomButton
          type="button"
          color="secondary"
          content="icon"
          style="no-border"
          className={`absolute right-0 top-0 h-full ${currentTheme === 'rounded' ? 'rounded-r-full' : ''}`}
          icon={<SearchIcon className="h-5 w-5" />}
          onClick={handleSearchSubmit}
        />
      </div>
      <Dropdown 
        isOpen={showDropdown && hasInteracted} 
        onClose={() => setShowDropdown(false)}
        width="search"
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
                    className={`suggestion-item ${searchInputStyles.dropdownItem}`}
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