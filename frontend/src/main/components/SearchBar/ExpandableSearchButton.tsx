// src/main/components/SearchBar/ExpandableSearchButton.tsx
'use client';

import React, { useRef, useState } from 'react';
import SearchInput, { SearchInputHandle } from './SearchInput';
import { SearchIcon } from '../Icons';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { SearchProvider } from './SearchContext';
import { NavButton } from '../Navigation/NavButton';

interface ExpandableSearchButtonProps {
  searchTranslations: SearchTranslations;
}

export default function ExpandableSearchButton({ searchTranslations }: ExpandableSearchButtonProps) {
  const searchInputRef = useRef<SearchInputHandle>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchSubmit = () => {
    // Handle search submission logic here
    setIsExpanded(false);
  };

  return (
    <div className="relative">
      {isExpanded ? (
        <SearchProvider initialSearch="" translations={searchTranslations}>
          <SearchInput 
            ref={searchInputRef}
            isVisible={isExpanded}
            onSubmit={handleSearchSubmit}
            showButton={true}
            translations={searchTranslations}
            autoFocus={true}
          />
        </SearchProvider>
      ) : (
        <NavButton
          context={'desktop'}
          onClick={toggleSearch}
          icon={<SearchIcon className="h-6 w-6" />}
          aria-label="Open search"
        />
      )}
    </div>
  );
}