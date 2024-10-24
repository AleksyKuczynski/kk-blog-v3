// src/main/components/Search/ExpandableSearchButton.tsx
import React, { useRef } from 'react'
import { SearchTranslations } from '@/main/lib/dictionaries/types'
import SearchInput from './SearchInput'
import { NavButton } from '../Interface/NavButton'
import { SearchIcon } from '../Interface/Icons'
import { SearchInputHandle } from './types'

interface ExpandableSearchButtonProps {
  searchTranslations: SearchTranslations
}

export default function ExpandableSearchButton({ searchTranslations }: ExpandableSearchButtonProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const searchInputRef = useRef<SearchInputHandle>(null)

  const handleExpand = () => {
    setIsExpanded(true)
    // We'll handle focus directly in SearchInput
  }

  const handleClose = () => {
    setIsExpanded(false)
  }

  if (!isExpanded) {
    return (
      <NavButton
        context="desktop"
        onClick={handleExpand}
        aria-label="Open search"
        icon={<SearchIcon className="h-6 w-6" />}
      />
    )
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
  )
}