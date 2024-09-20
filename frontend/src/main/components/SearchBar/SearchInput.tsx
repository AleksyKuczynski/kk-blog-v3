// src/main/components/SearchBar/SearchInput.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { getSearchSuggestions } from '@/main/lib/actions';
import { SearchProposition } from '@/main/lib/directus/interfaces';
import { SearchIcon } from '@/main/components/Icons';
import { useSearch } from './SearchContext';
import { CustomButton } from '../CustomButton';
import { Lang } from '@/main/lib/dictionaries/types';
import { useTheme } from '@/main/components/ThemeContext';

const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, translations } = useSearch();
  const [suggestions, setSuggestions] = useState<SearchProposition[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { currentTheme } = useTheme();

  const themeStyles = {
    container: {
      default: 'rounded-md border border-neutral-300 bg-white',
      rounded: 'rounded-full border border-neutral-300 bg-white',
      sharp: 'border border-neutral-300 bg-white',
    },
    input: {
      default: 'rounded-l-md',
      rounded: 'rounded-l-full',
      sharp: '',
    },
    button: {
      default: 'rounded-r-md',
      rounded: 'rounded-r-full',
      sharp: '',
    },
    dropdown: {
      default: 'rounded-md',
      rounded: 'rounded-xl',
      sharp: '',
    },
    suggestion: {
      default: 'hover:bg-secondary hover:text-text-inverted transition duration-300',
      rounded: 'hover:bg-secondary hover:text-text-inverted transition duration-300 first:rounded-t-xl last:rounded-b-xl',
      sharp: 'hover:bg-secondary hover:text-text-inverted transition duration-300',
    },
  };


  const debouncedFetch = useDebouncedCallback(async (term: string) => {
    if (term.length >= 3) {
      const lang = pathname.split('/')[1] as Lang;
      const results = await getSearchSuggestions(term, lang);
      setSuggestions(results);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(term.length > 0);
    }
  }, 300);

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    setHasInteracted(true);
    debouncedFetch(term);
  };

  const handleSelect = (slug: string, rubricSlug: string) => {
    const lang = pathname.split('/')[1]; // Extract language from the current path
    router.push(`/${lang}/${rubricSlug}/${slug}`);
    clearSearchBar();
  };

  const clearSearchBar = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    setHasInteracted(false);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const lang = pathname.split('/')[1]; // Extract language from the current path
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      router.push(`/${lang}/search?search=${encodedQuery}`);
      setShowDropdown(false);
      setHasInteracted(false);
    }
  };

  const handleSearchButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleSearchSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <div data-search-component className="relative w-full">
      <div className={`relative w-full flex ${themeStyles.container[currentTheme]} overflow-hidden`}>
        <input
          ref={searchInputRef}
          type="text"
          className={`w-full border-0 bg-transparent py-2 pl-3 pr-12 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-0 transition duration-300 ${themeStyles.input[currentTheme]}`}
          placeholder={translations.placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowDropdown(searchQuery.length > 0)}
          onKeyDown={handleKeyDown}
        />
        <CustomButton
          type="button"
          variant="accent"
          className={`absolute right-0 top-0 h-full ${themeStyles.button[currentTheme]}`}
          icon={<SearchIcon className="h-5 w-5" />}
          onClick={handleSearchButtonClick}
        />
      </div>
      {showDropdown && hasInteracted && (
        <div className={`absolute z-10 mt-1 w-full bg-background-light shadow-lg border-2 border-accent ${themeStyles.dropdown[currentTheme]}`}>
          {searchQuery.length < 3 ? (
            <p className="px-4 py-2 text-sm text-center text-text-secondary">{translations.minCharacters}</p>
          ) : suggestions.length === 0 ? (
            <p className="px-4 py-2 text-sm text-center text-text-secondary">{translations.noResults}</p>
          ) : (
            <ul className="max-h-60 overflow-auto py-1 text-base focus:outline-none sm:text-sm">
              {suggestions.map((suggestion) => (
                <li key={suggestion.slug}>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm text-text-primary ${themeStyles.suggestion[currentTheme]}`}
                    onClick={() => handleSelect(suggestion.slug, suggestion.rubric_slug)}
                  >
                    {truncateText(suggestion.title, 64)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}