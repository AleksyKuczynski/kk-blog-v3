// src/main/lib/useSearch.ts
import { useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { getSearchSuggestions } from '@/main/lib/actions';
import { SearchProposition } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';
import { useSearch as useSearchContext } from '@/main/components/SearchBar/SearchContext';

export function useSearch(onCollapse: () => void) {
  const router = useRouter();
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, translations } = useSearchContext();
  const [suggestions, setSuggestions] = useState<SearchProposition[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (searchQuery.trim().length < 3) {
      onCollapse();
    } else if (searchQuery.trim()) {
      const lang = pathname.split('/')[1] as Lang;
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      router.push(`/${lang}/search?search=${encodedQuery}`);
      setShowDropdown(false);
      setHasInteracted(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    } else if (e.key === 'ArrowDown' && showDropdown) {
      e.preventDefault();
      const firstSuggestion = dropdownRef.current?.querySelector('.suggestion-item') as HTMLElement;
      firstSuggestion?.focus();
    }
  };

  const handleSuggestionKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const suggestions = dropdownRef.current?.querySelectorAll('.suggestion-item');
    if (!suggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % suggestions.length;
      (suggestions[nextIndex] as HTMLElement).focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + suggestions.length) % suggestions.length;
      if (prevIndex === suggestions.length - 1) {
        searchInputRef.current?.focus();
      } else {
        (suggestions[prevIndex] as HTMLElement).focus();
      }
    }
  };

  return {
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
  };
}