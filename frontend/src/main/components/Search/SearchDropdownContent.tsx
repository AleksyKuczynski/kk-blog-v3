// src/main/components/Search/SearchDropdownContent.tsx
import React from 'react';
import { useTheme } from '../ThemeSwitcher';

interface SearchDropdownContentProps {
  children: React.ReactNode;
  position?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SearchDropdownContent({
  children,
  position = 'left',
  className = ''
}: SearchDropdownContentProps) {
  const { currentTheme } = useTheme();

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
        w-full min-w-[200px]
        ${positionClasses[position]}
        top-full mt-1
        bg-bgcolor-alt 
        shadow-lg 
        transition-all duration-200 ease-in-out
        ${themeClasses[currentTheme]}
        ${className}
      `}
      role="listbox"
    >
      {children}
    </div>
  );
}