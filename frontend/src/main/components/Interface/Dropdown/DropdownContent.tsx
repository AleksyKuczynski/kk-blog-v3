// src/main/components/Interface/Dropdown/DropdownContent.tsx
'use client';

import React from 'react';
import { useTheme } from '@/main/components/ThemeSwitcher';
import { useDropdownContext } from './DropdownContext';
import type { DropdownContentProps } from './types';

export default function DropdownContent({
  children,
  width = 'narrow',
  position = 'left'
}: DropdownContentProps) {
  const { isOpen } = useDropdownContext();
  const { currentTheme } = useTheme();

  if (!isOpen) return null;

  const widthClasses = {
    icon: 'w-40',
    narrow: 'w-48',
    wide: 'w-64'
  };

  const positionClasses = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0'
  };

  const themeClasses = {
    default: 'rounded-lg',
    rounded: 'rounded-lg',
    sharp: 'border-2 border-prcolor'
  };

  return (
    <div 
      className={`
        absolute z-60 
        ${widthClasses[width]}
        ${positionClasses[position]}
        top-full mt-1
        bg-bgcolor-alt 
        shadow-lg 
        transition-all duration-200 ease-in-out
        ${themeClasses[currentTheme]}
      `}
      role="menu"
      aria-orientation="vertical"
    >
      <ul className="py-1">
        {children}
      </ul>
    </div>
  );
}