// src/main/components/Search/SearchDropdownContent.tsx
import React from 'react';
import { useTheme } from '../ThemeSwitcher';
import { cn } from '@/main/lib/utils';
import { ExpansionState } from './types';

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
    entering: 'translate-y-2 opacity-0',
    entered: 'translate-y-0 opacity-100',
    exiting: 'translate-y-2 opacity-0 pointer-events-none'
  }
};

interface SearchDropdownContentProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  isVisible: boolean;
  expansionState: ExpansionState;
}

export const SearchDropdownContent = ({
  children,
  className = '',
  isOpen,
  isVisible,
  expansionState
}: SearchDropdownContentProps) => {
  const { currentTheme } = useTheme();

  if (!isVisible && !isOpen || expansionState !== 'expanded') return null;

  const dropdownClassName = cn(
    dropdownStyles.base,
    dropdownStyles.theme[currentTheme],
    isOpen && isVisible ? dropdownStyles.state.entered : dropdownStyles.state.exiting,
    className
  );

  return (
    <div 
      className={dropdownClassName}
      role="listbox"
    >
      {children}
    </div>
  );
};