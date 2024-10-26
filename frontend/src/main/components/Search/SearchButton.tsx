// src/main/components/Search/SearchButton.tsx
'use client'

import { forwardRef } from 'react'
import { NavButton } from '../Interface'
import { SearchIcon } from '../Interface/Icons'
import { useSearchContext } from './SearchContext'

interface SearchButtonProps {
  className?: string;
  context?: 'desktop' | 'mobile';
}

export const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(({ 
  className = '', 
  context = 'desktop' 
}, ref) => {
  const { isExpanded, handleExpandableToggle } = useSearchContext()
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    handleExpandableToggle()
  }

  return (
    <NavButton
      ref={ref}
      context={context}
      onClick={handleClick}
      className={className}
      aria-label="Search"
      aria-expanded={isExpanded}
      icon={<SearchIcon className="h-5 w-5" />}
    />
  )
})

SearchButton.displayName = 'SearchButton'