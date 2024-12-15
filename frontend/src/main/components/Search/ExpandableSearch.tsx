// src/main/components/Search/ExpandableSearch.tsx
import React from 'react';
import { SearchTranslations, Lang } from '@/main/lib/dictionaries/types';
import { SearchIcon, NavButton, CloseIcon } from '../Interface';
import { useTheme } from '../ThemeSwitcher';
import { cn } from '@/main/lib/utils';
import SearchInput from './SearchInput';
import SearchDropdown from './SearchDropdown';
import { useSearchLogic } from './useSearchLogic';

interface ExpandableSearchProps {
  searchTranslations: SearchTranslations;
  lang: Lang;
  className?: string;
}

const containerStyles = {
  wrapper: {
    base: `
      relative flex items-center gap-2
      transition-all duration-200 ease-in-out
    `,
    expanded: {
      default: `
        bg-sf-hi border border-ol rounded-lg shadow-md 
        hover:shadow-lg 
        focus-within:outline-none
        focus-within:ring-1
        focus-within:ring-pr-fix
        focus-within:ring-offset-0
      `,
      rounded: `
        bg-sf-hi border border-ol rounded-lg shadow-lg 
        hover:shadow-xl 
        focus-within:outline-none
        focus-within:ring-1
        focus-within:ring-pr-fix
        focus-within:ring-offset-0
      `,
      sharp: `
        bg-sf-hi border border-ol  
        hover:bg-sf-hst
        focus-within:outline-none
        focus-within:ring-1
        focus-within:ring-pr-fix
        focus-within:ring-offset-0
      `
    }
  },
  button: {
    default: {
      collapsed: 'hover:bg-bgcolor-accent/10',
      expanded: 'hover:bg-bgcolor-accent-dark/50'
    },
    rounded: {
      collapsed: 'hover:bg-bgcolor-accent/10',
      expanded: 'hover:bg-bgcolor-accent-dark/50'
    },
    sharp: {
      collapsed: 'hover:bg-bgcolor-accent/10',
      expanded: 'hover:bg-bgcolor-accent-dark/50'
    }
  }
};

export default function ExpandableSearch({
  searchTranslations,
  lang,
  className = ''
}: ExpandableSearchProps) {
  const { currentTheme } = useTheme();
  const {
    state,
    handlers,
    refs,
    utils
  } = useSearchLogic({
    mode: 'expandable',
    lang,
  });

  const isExpanded = state.input.visibility !== 'hidden';

  return (
    <div 
      ref={refs.containerRef}
      className={`relative ${className}`}
    >
      <div className={cn(
        containerStyles.wrapper.base,
        isExpanded && containerStyles.wrapper.expanded[currentTheme]
      )}>
        <SearchInput
          state={state}
          placeholder={searchTranslations.placeholder}
          onChange={handlers.handleInputChange}
          onKeyDown={handlers.handleKeyDown}
          onFocus={handlers.handleFocus}
          inputRef={refs.inputRef}
        />
        <NavButton
          context="desktop"
          onClick={handlers.handleSearchButton}
          icon={utils.iconType === 'search' ? <SearchIcon /> : <CloseIcon />}
          aria-label={searchTranslations.submit}
          aria-expanded={isExpanded}
          className={cn(
            containerStyles.button[currentTheme][isExpanded ? 'expanded' : 'collapsed']
          )}
        />
      </div>

      {isExpanded && (
        <SearchDropdown
          state={state}
          translations={searchTranslations}
          onItemSelect={handlers.handleSelect}
        />
      )}
    </div>
  );
}