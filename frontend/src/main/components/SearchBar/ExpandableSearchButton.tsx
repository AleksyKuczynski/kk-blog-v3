// src/main/components/SearchBar/ExpandableSearchButton.tsx
'use client';

import React, { useState } from 'react';
import { SearchIcon } from '../Icons';
import { CustomButton } from '../CustomButton';
import { SearchInput } from './SearchInput';
import { SearchProvider } from './SearchContext';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { useTheme } from '@/main/components/ThemeContext';

interface ExpandableSearchButtonProps {
  searchTranslations: SearchTranslations;
}

export default function ExpandableSearchButton({ searchTranslations }: ExpandableSearchButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentTheme } = useTheme();

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchSubmit = () => {
    // Handle search submit logic
    setIsExpanded(false);
  };

  const buttonClasses = `
    absolute right-0 top-0 h-full px-3 
    flex items-center justify-center 
    text-secondary hover:text-secondary-dark 
    transition-colors duration-300
    ${currentTheme === 'rounded' ? 'rounded-r-full' : currentTheme === 'sharp' ? 'rounded-none' : 'rounded-r-md'}
  `;

  return (
    <SearchProvider initialSearch="" translations={searchTranslations}>
      <div className="relative">
        <div className={`flex items-center transition-all duration-300 ${isExpanded ? 'w-64' : 'w-12'}`}>
          <SearchInput 
            className={`transition-all duration-300 ${isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
            onSubmit={handleSearchSubmit}
            isVisible={isExpanded}
          />
          <CustomButton
            content="icon"
            onClick={handleButtonClick}
            className={buttonClasses}
            icon={<SearchIcon className="h-6 w-6" />}
          />
        </div>
      </div>
    </SearchProvider>
  );
}