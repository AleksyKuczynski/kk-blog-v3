// src/main/components/Search/hooks/useSearchState.ts

import { useState, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SearchStatus } from '../types';
import { SearchProposition } from '@/main/lib/directus';
import { useDebounce } from '@/main/lib/hooks';
import { getSearchSuggestions } from '@/main/lib/actions';
import { Lang } from '@/main/lib/dictionaries/types';
import { createSearchUrl } from '@/main/lib/utils';

interface SearchStateReturn {
  query: string;
  suggestions: SearchProposition[];
  searchStatus: SearchStatus;
  setQuery: (query: string) => void;
  handleSearch: (value: string) => Promise<void>;
  handleSelect: (slug: string, rubricSlug: string) => void;
  handleSubmit: () => boolean;
  handleFocusStatus: () => void;
  resetStatus: () => void;
}

export function useSearchState(): SearchStateReturn {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchProposition[]>([]);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>({ type: 'idle' });
  const searchIdRef = useRef(0);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = pathname.split('/')[1] as Lang;

  const updateSearchStatus = useCallback((value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue || trimmedValue.length < 3) {
      setSearchStatus({ 
        type: 'minChars', 
        current: trimmedValue.length || 0, 
        required: 3 
      });
      return false;
    }
    return true;
  }, []);

  const handleFocusStatus = useCallback(() => {
    // If query is empty, show minimum chars message
    if (!query.trim()) {
      setSearchStatus({ 
        type: 'minChars', 
        current: 0, 
        required: 3 
      });
    }
  }, [query]);

  const resetStatus = useCallback(() => {
    setSearchStatus({ type: 'idle' });
  }, []);

  const handleSearch = useCallback(async (value: string) => {
    const trimmedValue = value.trim();
    if (!updateSearchStatus(trimmedValue)) {
      setSuggestions([]);
      return;
    }

    const currentSearchId = ++searchIdRef.current;
    setSearchStatus({ type: 'searching' });

    try {
      const results = await getSearchSuggestions(trimmedValue, lang);
      
      // Only update if this is still the current search
      if (currentSearchId === searchIdRef.current) {
        setSuggestions(results);
        setSearchStatus(results.length > 0 
          ? { type: 'success', count: results.length }
          : { type: 'noResults' }
        );
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchStatus({ type: 'noResults' });
      setSuggestions([]);
    }
  }, [lang, updateSearchStatus]);

  const debouncedSearch = useDebounce(handleSearch, 300);

  const setSearchQuery = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length >= 3) {
      debouncedSearch(value);
    } else {
      setSuggestions([]);
      updateSearchStatus(value);
    }
  }, [debouncedSearch, updateSearchStatus]);

  const handleSelect = useCallback((slug: string, rubricSlug: string) => {
    router.push(`/${lang}/${rubricSlug}/${slug}`);
    setQuery('');
    setSuggestions([]);
    setSearchStatus({ type: 'idle' });
  }, [router, lang]);

  const handleSubmit = useCallback(() => {
    const trimmedQuery = query.trim();
    const isValid = trimmedQuery.length >= 3;
    
    if (isValid) {
      const searchUrl = createSearchUrl(trimmedQuery, searchParams);
      router.push(`/${lang}${searchUrl}`);
      setQuery('');
      setSuggestions([]);
      setSearchStatus({ type: 'idle' });
    }
    
    return isValid;
  }, [query, router, lang, searchParams]);

  return {
    query,
    suggestions,
    searchStatus,
    setQuery: setSearchQuery,
    handleSearch,
    handleSelect,
    handleSubmit,
    handleFocusStatus,
    resetStatus
  };
}