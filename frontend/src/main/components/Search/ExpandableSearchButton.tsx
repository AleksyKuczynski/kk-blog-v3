// src/main/components/Search/ExpandableSearchButton.tsx
'use client'

import React, { useRef, useState, useCallback } from 'react'
import { SearchProvider } from './SearchContext'
import SearchInput from './SearchInput'
import { NavButton } from '../Interface'
import { SearchIcon } from '../Interface/Icons'
import { SearchInputHandle } from './types'
import { SearchTranslations } from '@/main/lib/dictionaries/types'

interface ExpandableSearchButtonProps {
  searchTranslations: SearchTranslations;
  className?: string;
}

export default function ExpandableSearchButton({ 
  searchTranslations,
  className = ''
}: ExpandableSearchButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const searchInputRef = useRef<SearchInputHandle>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleExpand = useCallback(() => {
    setIsExpanded(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsExpanded(false)
    buttonRef.current?.focus()
  }, [])

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
        <NavButton
          ref={buttonRef}
          context="desktop"
          onClick={handleExpand}
          className="relative z-10"
          aria-label={searchTranslations.placeholder}
          aria-expanded={isExpanded}
          aria-controls="expandable-search"
          icon={<SearchIcon className="h-6 w-6" />}
        />
      ) : null}

      <div 
        id="expandable-search"
        className={expandedClasses}
        role="search"
      >
        {isExpanded && (
          <SearchProvider 
            initialSearch="" 
            translations={searchTranslations}
            mode="expandable"
            // Add this prop to indicate expanded state to Provider
            isInitiallyOpen={true}
          >
            <SearchInput
              ref={searchInputRef}
              translations={searchTranslations}
              isExpandable={true}
              showButton={true}
              autoFocus={true}
              onClose={handleClose}
              className="w-full"
            />
          </SearchProvider>
        )}
      </div>
    </div>
  )
}