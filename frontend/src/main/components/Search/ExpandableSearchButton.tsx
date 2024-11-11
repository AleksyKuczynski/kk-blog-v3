// src/main/components/Search/ExpandableSearchButton.tsx
'use client'

import React from 'react'
import { SearchProvider } from './SearchContext'
import SearchInput from './SearchInput'
import { SearchTranslations } from '@/main/lib/dictionaries/types'

interface ExpandableSearchButtonProps {
  searchTranslations: SearchTranslations
  className?: string
}

export default function ExpandableSearchButton({
  searchTranslations,
  className = '',
}: ExpandableSearchButtonProps) {
  return (
    <SearchProvider 
      translations={searchTranslations}
      mode="expandable"
      isInitiallyOpen={false}
    >
      <div className={`flex justify-end items-center ${className}`}>
        <SearchInput
          translations={searchTranslations}
          isExpandable={true}
          className="pr-[42px]"
        />
      </div>
    </SearchProvider>
  );
}