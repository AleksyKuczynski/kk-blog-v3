// src/main/components/Search/SearchDropdownContent.tsx
import React from 'react';
import { useTheme } from '../ThemeSwitcher';
import { cn } from '@/main/lib/utils';
import { SearchDropdownContentProps } from './types';
import { ANIMATION_DURATION } from '../Interface/constants';

const dropdownStyles = {
  base: `
    absolute z-60 shadow-lg bg-bgcolor-alt 
    w-[calc(100%-44px)] 
    overflow-y-auto
  `,
  position: {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2'
  },
  theme: {
    default: 'rounded-lg',
    rounded: 'rounded-xl', 
    sharp: 'border-2 border-prcolor'
  },
  state: {
    open: 'opacity-100 scale-y-100',
    closed: 'opacity-0 scale-y-0 pointer-events-none'
  }
};

export const SearchDropdownContent = ({
  children,
  direction = 'bottom',
  className = '',
  isOpen,
  isVisible
}: SearchDropdownContentProps) => {
  const { currentTheme } = useTheme();

  const dropdownClassName = cn(
    dropdownStyles.base,
    dropdownStyles.position[direction],
    dropdownStyles.theme[currentTheme],
    {
      [dropdownStyles.state.open]: isOpen,
      [dropdownStyles.state.closed]: !isOpen,
    },
    className
  );

  if (!isVisible && !isOpen) return null;

  return (
    <div 
      className={dropdownClassName}
      role="listbox"
      style={{
        transformOrigin: direction === 'top' ? 'bottom' : 'top',
        maxHeight: 'var(--dropdown-max-height, 80vh)',
      }}
    >
      {children}
    </div>
  );
};