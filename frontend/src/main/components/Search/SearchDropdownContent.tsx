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
  `,
  position: {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2', 
    right: 'right-0'
  },
  direction: {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
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
  isOpen
}: SearchDropdownContentProps) => {
  const { currentTheme } = useTheme();

  const dropdownClassName = cn(
    dropdownStyles.base,
    dropdownStyles.direction[direction],
    dropdownStyles.theme[currentTheme],
    {
      [dropdownStyles.state.open]: isOpen,
      [dropdownStyles.state.closed]: !isOpen,
    },
    className
  );

  return (
    <div 
      className={dropdownClassName}
      role="listbox"
      style={{
        transition: `transform ${ANIMATION_DURATION}ms ease-in-out, opacity ${ANIMATION_DURATION}ms ease-in-out`,
        maxHeight: 'calc(var(--vh, 1vh) * 80)',
        transformOrigin: direction === 'top' ? 'bottom' : 'top'
      }}
    >
      {children}
    </div>
  );
};