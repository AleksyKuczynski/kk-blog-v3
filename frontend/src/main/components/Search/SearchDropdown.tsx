// src/main/components/Search/SearchDropdown.tsx
import React from 'react';
import { useTheme } from '../ThemeSwitcher';
import { SearchUIState } from './types';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { cn } from '@/main/lib/utils';
import SearchDropdownItem from './SearchDropdownItem';

interface SearchDropdownProps {
  state: SearchUIState;
  translations: SearchTranslations;
  onItemSelect: (index: number) => void;
}

export default function SearchDropdown({
  state,
  translations,
  onItemSelect,
}: SearchDropdownProps) {
  const { currentTheme } = useTheme();

  const dropdownStyles = {
    container: {
      base: `
        absolute z-50 shadow-lg bg-sf-hi 
        w-full
        top-full mt-2
        max-h-[80vh]
        origin-top transition-none
      `,
      theme: {
        default: 'rounded-lg',
        rounded: 'rounded-xl',
        sharp: 'border border-ol-var'
      },
      visibility: {
        'hidden': 'scale-y-0 opacity-0 -translate-y-4 pointer-events-none invisible',
        'animating-in': 'scale-y-100 opacity-100 translate-y-0 transition-all duration-300 ease-out delay-150 visible',
        'visible': 'scale-y-100 opacity-100 translate-y-0 transition-none visible',
        'animating-out': 'scale-y-0 opacity-0 -translate-y-4 transition-all duration-300 ease-in pointer-events-none'
      }
    },
    content: {
      base: 'transition-opacity duration-150',
      state: {
        stable: 'opacity-100',
        entering: 'opacity-0',
        exiting: 'opacity-0 pointer-events-none'
      }
    }
  };

  function renderContent() {
    if (state.dropdown.content === 'message') {
      return (
        <div className={cn(
          'px-4 py-2 text-on-sf-var',
          currentTheme === 'rounded' && 'rounded-lg mx-2',
          currentTheme === 'sharp' && 'border border-prcolor'
        )}>
          {renderStatusMessage()}
        </div>
      );
    }

    if (state.dropdown.content === 'suggestions') {
      return (
        <ul>
          {state.suggestions.map((suggestion, index) => (
            <SearchDropdownItem
              key={suggestion.slug}
              suggestion={suggestion}
              isHighlighted={index === state.selectedIndex}
              onSelect={() => onItemSelect(index)}
            />
          ))}
        </ul>
      );
    }

    return null;
  }

  function renderStatusMessage() {
    switch (state.searchStatus.type) {
      case 'minChars':
        return translations.minCharacters;
      case 'searching':
        return translations.searching;
      case 'noResults':
        return translations.noResults;
      default:
        return null;
    }
  }

  if (state.dropdown.visibility === 'hidden') {
    return null;
  }

  return (
    <div 
      className={cn(
        dropdownStyles.container.base,
        dropdownStyles.container.theme[currentTheme],
        dropdownStyles.container.visibility[state.dropdown.visibility]
      )}
      role="listbox"
      aria-hidden={state.dropdown.visibility === 'animating-out'}
    >
      <div className={dropdownStyles.content.base}>
        {renderContent()}
      </div>
    </div>
  );
}