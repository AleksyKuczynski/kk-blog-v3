// src/main/components/SearchBar/ExpandableSearchButton.tsx
'use client';

import React, { useState } from 'react';
import { SearchIcon } from '../Icons';
import { CustomButton } from '../CustomButton';
import { SearchInput } from './SearchInput';
import { SearchProvider } from './SearchContext';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { useTheme } from '../ThemeContext';

interface ExpandableSearchButtonProps {
  searchTranslations: SearchTranslations;
}

export default function ExpandableSearchButton({ searchTranslations }: ExpandableSearchButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { currentTheme } = useTheme();

  const handleButtonClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => setIsInputVisible(true), 300);
    } else {
      collapseSearch();
    }
  };

  const collapseSearch = () => {
    setIsInputVisible(false);
    setTimeout(() => setIsExpanded(false), 300);
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
    <SearchProvider initialSearch="" translations={searchTranslations}>
      <div className="relative">
        <CustomButton
          content="icon"
          onClick={handleButtonClick}
          className={`
            z-10 transition-all duration-300
            w-12 h-12 flex items-center justify-end
            ${getThemeClasses()}
            ${isExpanded ? 'w-64 bg-secondary text-text-inverted pr-3' : 'pr-0'}
          `}
          icon={<SearchIcon className="h-6 w-6" />}
        />
        <div
          className={`
            absolute top-0 right-0 w-64
            transition-opacity duration-300
            ${isInputVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
        >
          <SearchInput isVisible={isInputVisible} onCollapse={collapseSearch} />
        </div>
      </div>
    </SearchProvider>
  );
}