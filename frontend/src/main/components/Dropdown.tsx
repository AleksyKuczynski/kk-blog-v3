// src/main/components/Dropdown.tsx
'use client';

import React, { useRef } from 'react';
import { useTheme } from '@/main/components/ThemeContext';
import { useOutsideClick } from '@/main/lib/hooks';

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
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

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({
  children,
  isOpen,
  onClose,
  width = 'narrow',
  align = 'left',
  className = '',
}, ref) => {
  const { currentTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, isOpen, onClose);

  if (!isOpen) return null;

  const baseStyle = dropdownStyles.base[currentTheme];
  const widthStyle = dropdownStyles.width[width];
  const alignStyle = dropdownStyles.align[align];

  return (
    <div 
      ref={ref || dropdownRef}
      className={`${baseStyle} ${widthStyle} ${alignStyle} ${className}`}
    >
      {children}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';