// src/main/components/Search/ExpandableSearchButton.tsx
import React, { useRef, useState } from 'react';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import SearchInput, { SearchInputHandle } from './SearchInput';
import { NavButton } from '../Interface/NavButton';
import { SearchIcon } from '../Interface/Icons';

interface ExpandableSearchButtonProps {
  searchTranslations: SearchTranslations;
}

export default function ExpandableSearchButton({ searchTranslations }: ExpandableSearchButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchInputRef = useRef<SearchInputHandle>(null);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <NavButton
        context="desktop"
        onClick={toggleExpand}
        aria-label="Open search"
        icon={<SearchIcon className="h-6 w-6" />}
      />
    );
  }

  return (
    <SearchInput
      ref={searchInputRef}
      translations={searchTranslations}
      isExpandable={true}
      showButton={true}
      autoFocus={true}
      onClose={handleClose}
    />
  );
}