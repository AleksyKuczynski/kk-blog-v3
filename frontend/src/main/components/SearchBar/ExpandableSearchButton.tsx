// src/main/components/SearchBar/ExpandableSearchButton.tsx
import React, { useRef, useState } from 'react';
import SearchInput, { SearchInputHandle } from './SearchInput';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { NavButton } from '../Navigation/NavButton';
import { SearchIcon } from '../Icons';
import { animationClasses } from '../animationClasses';

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

  const expandContainerClass = `
    ${animationClasses.transition}
    ${isExpanded ? 'w-64' : 'w-12'}
    overflow-hidden
  `;


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