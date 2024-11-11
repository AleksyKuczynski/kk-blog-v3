// src/main/components/Search/SearchDropdownContent.tsx
import React from 'react';
import { useTheme } from '../ThemeSwitcher';
import { cn } from '@/main/lib/utils';

interface SearchDropdownContentProps {
  children: React.ReactNode;
  position?: 'left' | 'center' | 'right';
  className?: string;
}

const dropdownStyles = {
  base: 'absolute z-60 w-full min-w-[200px] shadow-lg transition-all duration-200 ease-in-out',
  position: {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0'
  },
  theme: {
    default: 'mt-1 rounded-lg border border-bgcolor-accent/20',
    rounded: 'mt-2 rounded-xl border border-bgcolor-accent/20',
    sharp: 'mt-1 border-2 border-prcolor'
  },
  animation: {
    default: 'animate-in fade-in-0 zoom-in-95',
    rounded: 'animate-in fade-in-0 zoom-in-95',
    sharp: 'animate-in fade-in-0 slide-in-from-top-2'
  },
  backdrop: {
    default: 'bg-bgcolor-alt',  // Removed transparency
    rounded: 'bg-bgcolor-alt',  // Removed transparency
    sharp: 'bg-bgcolor-alt'
  }
};

export default function SearchDropdownContent({
  children,
  position = 'left',
  className = ''
}: SearchDropdownContentProps) {
  const { currentTheme } = useTheme();

  const dropdownClassName = cn(
    dropdownStyles.base,
    dropdownStyles.position[position],
    dropdownStyles.theme[currentTheme],
    dropdownStyles.animation[currentTheme],
    dropdownStyles.backdrop[currentTheme],
    // For mobile devices, ensure full width
    'sm:max-w-[var(--radix-popper-available-width)]',
    className
  );

  return (
    <div 
      className={dropdownClassName}
      role="listbox"
      style={{
        // Prevent content overflow on mobile
        maxHeight: 'calc(var(--vh, 1vh) * 80)'
      }}
    >
      {/* Wrapper for custom scrollbar styling */}
      <div className={cn(
        'overflow-y-auto overscroll-contain',
        // Theme-specific scrollbar styling
        currentTheme === 'rounded' && 'rounded-xl',
        'scrollbar-thin scrollbar-track-bgcolor-accent/10 scrollbar-thumb-prcolor/20 hover:scrollbar-thumb-prcolor/30',
        // Prevent iOS bouncing effect
        'touch-pan-y'
      )}>
        {children}
      </div>
    </div>
  );
}