// src/main/components/Interface/Dropdown/DropdownContent.tsx
'use client';

import React from 'react';
import { useTheme } from '@/main/components/ThemeSwitcher';
import { useDropdownContext } from './DropdownContext';
import { cn } from '@/main/lib/utils';
import type { DropdownContentProps } from './types';

const dropdownStyles = {
  base: 'absolute z-70 shadow-lg bg-sf-hi transition-all duration-200 ease-in-out origin-top',
  width: {
    icon: 'w-40',
    narrow: 'w-48',
    wide: 'w-64',
    auto: 'w-auto'
  },
  position: {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0'
  },
  theme: {
    default: 'rounded-lg',
    rounded: 'rounded-lg',
    sharp: 'border border-ol-var'
  },
  state: {
    open: 'opacity-100 scale-y-100 transform',
    closed: 'opacity-0 scale-y-0 pointer-events-none'
  }
};

export default function DropdownContent({
  children,
  width = 'auto',
  position = 'left'
}: DropdownContentProps) {
  const { currentTheme } = useTheme();
  const { isOpen } = useDropdownContext();

  return (
    <div 
      className={cn(
        dropdownStyles.base,
        dropdownStyles.width[width],
        dropdownStyles.position[position],
        dropdownStyles.theme[currentTheme],
        isOpen ? dropdownStyles.state.open : dropdownStyles.state.closed
      )}
      role="menu"
      aria-orientation="vertical"
      style={{ 
        maxHeight: 'calc(var(--vh, 1vh) * 80)',
        top: 'calc(100% + 0.5rem)'
      }}
    >
      {children}
    </div>
  );
}