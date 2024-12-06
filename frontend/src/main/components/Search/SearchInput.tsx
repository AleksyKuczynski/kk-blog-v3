// src/main/components/Search/SearchInput.tsx
import React from 'react';
import { SearchUIState } from './types';
import { cn } from '@/main/lib/utils';
import { ANIMATION_DURATION } from '../Interface/constants';

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
  const styles = {
    container: {
      base: `
        relative flex-grow z-40
        transition-all duration-[${ANIMATION_DURATION}ms] ease-out
        transform origin-right
      `,
      visibility: {
        'hidden': 'w-0 scale-x-0 opacity-0',
        'animating-in': 'w-full scale-x-100 opacity-100',
        'visible': 'w-full scale-x-100 opacity-100',
        'animating-out': 'w-0 scale-x-0 opacity-0'
      }
    },
    input: {
      base: `
        w-full py-2 px-3 
        bg-transparent 
        text-txcolor placeholder-txcolor-muted 
        focus:outline-none 
      `
    }
  };

  return (
    <div 
      className={cn(
        styles.container.base,
        styles.container.visibility[state.input.visibility]
      )}
    >
      <input
        ref={inputRef}
        type="text"
        className={styles.input.base}
        placeholder={placeholder}
        value={state.query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        role="combobox"
        aria-expanded={state.dropdown.visibility !== 'hidden'}
        aria-controls="search-suggestions"
        aria-autocomplete="list"
      />
    </div>
  );
}