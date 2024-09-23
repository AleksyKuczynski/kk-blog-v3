// src/main/components/SearchBar/SearchInput.tsx
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
import { useOutsideClick } from '@/main/lib/useOutsideClick';
import { Dropdown } from '../Dropdown';

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

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, translations } = useSearch();
  const [suggestions, setSuggestions] = useState<SearchProposition[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { currentTheme } = useTheme();

  const ref = useOutsideClick<HTMLDivElement>(showDropdown, setShowDropdown);

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
    const lang = pathname.split('/')[1];
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
      const lang = pathname.split('/')[1];
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
    <div data-search-component className="relative w-full" ref={ref}>
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
          variant="accent"
          className={`absolute right-0 top-0 h-full ${currentTheme === 'rounded' ? 'rounded-r-full' : ''}`}
          icon={<SearchIcon className="h-5 w-5" />}
          onClick={handleSearchButtonClick}
        >
          {translations.submit}
        </CustomButton>
      </div>
      <Dropdown isOpen={showDropdown && hasInteracted} width="search">
        {searchQuery.length < 3 ? (
          <p className="px-4 py-2 text-sm text-center text-text-secondary dark:text-neutral-400">{translations.minCharacters}</p>
        ) : suggestions.length === 0 ? (
          <p className="px-4 py-2 text-sm text-center text-text-secondary dark:text-neutral-400">{translations.noResults}</p>
        ) : (
          <ul className="max-h-60 overflow-auto py-1 text-base focus:outline-none sm:text-sm">
            {suggestions.map((suggestion) => (
              <li key={suggestion.slug}>
                <button
                  className={searchInputStyles.dropdownItem}
                  onClick={() => handleSelect(suggestion.slug, suggestion.rubric_slug)}
                >
                  {truncateText(suggestion.title, 64)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Dropdown>
    </div>
  );
}