// src/main/components/Search/ExpandableSearchButton.tsx
'use client'

import React, { useRef } from 'react'
import { SearchProvider } from './SearchContext'
import SearchInput from './SearchInput'
import { SearchButton } from './SearchButton'
import { SearchTranslations } from '@/main/lib/dictionaries/types'
import { useOutsideClick } from '@/main/lib/hooks'
import { useSearchContext } from './SearchContext'

interface ExpandableSearchButtonProps {
  searchTranslations: SearchTranslations;
  className?: string;
}

function ExpandableSearchContent({ 
  searchTranslations, 
  className = '' 
}: ExpandableSearchButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { isExpanded, handleClose } = useSearchContext()

  // Update outside click to properly close and clear input
  useOutsideClick(containerRef, buttonRef, isExpanded, () => handleClose(true))

  const expandedClasses = `
    absolute 
    top-0 right-0 
    w-full md:w-96
    px-2 py-1
    bg-bgcolor-alt 
    shadow-md
    z-50
    transition-all duration-300 ease-in-out
    ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
    ${className}
  `

  return (
    <div ref={containerRef} className="relative">
      {!isExpanded ? (
        <SearchButton 
          ref={buttonRef} 
          context="desktop" 
          className="relative z-10" 
        />
      ) : (
        <div 
          id="expandable-search"
          className={expandedClasses}
          role="search"
        >
          <SearchInput
            translations={searchTranslations}
            isExpandable={true}
            showButton={true}
            autoFocus={true}
            className="w-full"
          />
        </div>
      )}
    </div>
  )
}

export default function ExpandableSearchButton(props: ExpandableSearchButtonProps) {
  return (
    <SearchProvider 
      initialSearch="" 
      translations={props.searchTranslations}
      mode="expandable"
      isInitiallyOpen={false}
    >
      <ExpandableSearchContent {...props} />
    </SearchProvider>
  )
}