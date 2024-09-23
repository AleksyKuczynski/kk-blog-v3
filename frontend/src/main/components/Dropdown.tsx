// src/main/components/Dropdown.tsx
'use client';

import React from 'react';
import { useTheme } from '@/main/components/ThemeContext';

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  width?: 'icon' | 'narrow' | 'wide' | 'search';
  align?: 'left' | 'right';
  className?: string;
}

const dropdownStyles = {
  base: {
    default: 'absolute z-10 mt-1 bg-background-light dark:bg-neutral-800 shadow-lg border-2 border-accent overflow-hidden',
    rounded: 'absolute z-10 mt-1 bg-background-light dark:bg-neutral-800 shadow-lg border-2 border-accent overflow-hidden rounded-2xl',
    sharp: 'absolute z-10 mt-1 bg-background-light dark:bg-neutral-800 shadow-lg border-2 border-accent overflow-hidden',
  },
  width: {
    icon: 'w-40',
    narrow: 'w-48',
    wide: 'w-64',
    search: 'w-full',
  },
  align: {
    left: 'left-0',
    right: 'right-0',
  },
};

export function Dropdown({ children, isOpen, width = 'narrow', align = 'left', className = '' }: DropdownProps) {
  const { currentTheme } = useTheme();

  if (!isOpen) return null;

  const baseStyle = dropdownStyles.base[currentTheme];
  const widthStyle = dropdownStyles.width[width];
  const alignStyle = dropdownStyles.align[align];

  return (
    <div className={`${baseStyle} ${widthStyle} ${alignStyle} ${className}`}>
      {children}
    </div>
  );
}