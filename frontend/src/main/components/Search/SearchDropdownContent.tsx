// src/main/components/Search/SearchDropdownContent.tsx
import React from 'react';
import { useTheme } from '../ThemeSwitcher';
import { cn } from '@/main/lib/utils';
import type { SearchDropdownContentProps } from './types';

const dropdownStyles = {
  base: `
    absolute z-60 shadow-lg bg-bgcolor-alt 
    w-[calc(100%-44px)]
    top-full mt-2
    max-h-[80vh] overflow-y-auto 
    transition-all duration-300 ease-out
    transform origin-top
  `,
  theme: {
    default: 'rounded-lg',
    rounded: 'rounded-xl',
    sharp: 'border-2 border-prcolor'
  },
  state: {
    entered: 'scale-y-100 opacity-100 translate-y-0',
    entering: 'scale-y-100 opacity-100 translate-y-0',
    exiting: 'scale-y-0 opacity-0 -translate-y-4',
    initial: 'scale-y-0 opacity-0 -translate-y-4 pointer-events-none'
  }
};

export const SearchDropdownContent = ({
  children,
  className = '',
  animationState,
  onTransitionEnd
}: SearchDropdownContentProps) => {
  const { currentTheme } = useTheme();

  const dropdownClassName = cn(
    dropdownStyles.base,
    dropdownStyles.theme[currentTheme],
    dropdownStyles.state[animationState],
    className
  );

  return (
    <div 
      className={dropdownClassName}
      role="listbox"
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget) {
          onTransitionEnd();
        }
      }}
    >
      {/* Only hide content in 'initial' state */}
      {animationState !== 'initial' && children}
    </div>
  );
};