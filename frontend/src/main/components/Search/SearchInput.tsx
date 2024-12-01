// src/main/components/Search/SearchInput.tsx
import React from 'react';
import { SearchUIState } from './types';
import { cn } from '@/main/lib/utils';
import { ANIMATION_DURATION } from '../Interface/constants';
import { useTheme } from '../ThemeSwitcher';

interface SearchInputProps {
  state: SearchUIState;
  placeholder: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchInput({ 
  state, 
  placeholder,
  onChange,
  onKeyDown,
  onFocus,
  inputRef,
}: SearchInputProps) {
  const { currentTheme } = useTheme();
  console.log('🎨 SearchInput render, visibility:', state.input.visibility);

  const containerStyles = {
    base: `
      relative flex-grow bg-bgcolor-accent shadow-md 
      focus-within:ring-2 focus-within:ring-prcolor-dark
      transition-all duration-[${ANIMATION_DURATION}ms] ease-out
      transform origin-right
    `,
    visibility: {
      'hidden': 'w-0 scale-x-0 opacity-0',
      'animating-in': 'w-full scale-x-100 opacity-100',
      'visible': 'w-full scale-x-100 opacity-100',
      'animating-out': 'w-0 scale-x-0 opacity-0'
    }
  };

  return (
    <div 
      className={cn(
        containerStyles.base,
        containerStyles.visibility[state.input.visibility]
      )}
    >
      <input
        ref={inputRef}
        type="text"
        className="w-full py-2 px-3 bg-transparent text-txcolor placeholder-txcolor-muted focus:outline-none"
        placeholder={placeholder}
        value={state.query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => {
          console.log('👆 Input focus event');
          onFocus();
        }}
        role="combobox"
        aria-expanded={state.dropdown.visibility !== 'hidden'}
        aria-controls="search-suggestions"
        aria-autocomplete="list"
      />
    </div>
  );
}