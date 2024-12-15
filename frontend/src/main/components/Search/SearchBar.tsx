// src/main/components/Search/SearchBar.tsx
import React from 'react';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { Lang } from '@/main/lib/dictionaries/types';
import { SearchIcon, NavButton, CloseIcon } from '../Interface';
import { useTheme } from '../ThemeSwitcher';
import { cn } from '@/main/lib/utils';
import SearchInput from './SearchInput';
import SearchDropdown from './SearchDropdown';
import { useSearchLogic } from './useSearchLogic';

interface SearchBarProps {
  searchTranslations: SearchTranslations;
  lang: Lang;
  className?: string;
  onSearchComplete?: () => void;
}

const containerStyles = {
  wrapper: {
    base: `
      relative flex gap-2 items-center
      bg-sf-hi
      group
    `,
    theme: {
      default: `
        rounded-lg shadow-md
        hover:shadow-lg
        focus-within:outline-none
        focus-within:ring-2
        focus-within:ring-pr-fix
        focus-within:ring-offset-0
      `,
      rounded: `
        rounded-lg shadow-md
        hover:shadow-lg
        focus-within:outline-none
        focus-within:ring-2
        focus-within:ring-pr-fix
        focus-within:ring-offset-0
      `,
      sharp: `
        border-2 border-pr-fix
        hover:bg-bg-hst
      `
    },
    transition: `transition-[background-color,box-shadow] duration-200`
  }
};

export default function SearchBar({
  searchTranslations,
  lang,
  className = '',
  onSearchComplete
}: SearchBarProps) {
  const { currentTheme } = useTheme();
  const {
    state,
    handlers,
    refs,
    utils
  } = useSearchLogic({
    mode: 'standard',
    lang,
    onSearchComplete
  });

  return (
    <div 
      ref={refs.containerRef}
      className={`relative ${className}`}
    >
      <div className={cn(
        containerStyles.wrapper.base,
        containerStyles.wrapper.theme[currentTheme],
        containerStyles.wrapper.transition
      )}>
        <NavButton
          context="desktop"
          onClick={handlers.handleSearchButton}
          icon={utils.iconType === 'search' ? <SearchIcon /> : <CloseIcon />}
          aria-label={searchTranslations.submit}
        />
        <SearchInput
          state={state}
          placeholder={searchTranslations.placeholder}
          onChange={handlers.handleInputChange}
          onKeyDown={handlers.handleKeyDown}
          onFocus={handlers.handleFocus}
          inputRef={refs.inputRef}
        />
      </div>

      <SearchDropdown
        state={state}
        translations={searchTranslations}
        onItemSelect={handlers.handleSelect}
      />
    </div>
  );
}