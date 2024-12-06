// src/main/components/Search/ExpandableSearch.tsx
import React from 'react';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { Lang } from '@/main/lib/dictionaries/types';
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
      relative flex gap-2 items-center
      bg-bgcolor-accent
      transition-all duration-200
      group
    `,
    theme: {
      default: `
        rounded-lg shadow-md
        focus-within:ring-2 focus-within:ring-prcolor/50
        hover:shadow-lg
      `,
      rounded: `
        rounded-lg shadow-lg
        focus-within:ring-2 focus-within:ring-prcolor/50
        hover:shadow-xl
      `,
      sharp: `
        border-2 border-bgcolor-accent/20
        focus-within:border-prcolor
        hover:bg-bgcolor-accent/80
      `
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

  const shouldShowInput = state.input.visibility !== 'hidden';

  return (
    <div 
      ref={refs.containerRef}
      className={`relative ${className}`}
    >
      <div className="flex gap-2 items-center">
        {shouldShowInput && (
          <div className={cn(
            containerStyles.wrapper.base,
            containerStyles.wrapper.theme[currentTheme]
          )}>
            <SearchInput
              state={state}
              placeholder={searchTranslations.placeholder}
              onChange={handlers.handleInputChange}
              onKeyDown={handlers.handleKeyDown}
              onFocus={handlers.handleFocus}
              inputRef={refs.inputRef}
            />
          </div>
        )}
        <NavButton
          context="desktop"
          onClick={handlers.handleSearchButton}
          icon={shouldShowInput && utils.hasNavigableContent ? <CloseIcon /> : <SearchIcon />}
          aria-label={searchTranslations.submit}
          aria-expanded={shouldShowInput}
        />
      </div>

      {shouldShowInput && (
        <SearchDropdown
          state={state}
          translations={searchTranslations}
          onItemSelect={handlers.handleSelect}
        />
      )}
    </div>
  );
}