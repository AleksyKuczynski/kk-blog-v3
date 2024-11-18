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
    max-h-[80vh]
    transform origin-top
  `,
  theme: {
    default: 'rounded-lg',
    rounded: 'rounded-xl',
    sharp: 'border-2 border-prcolor'
  },
  state: {
    entered: 'scale-y-100 opacity-100 translate-y-0 transition-transform duration-300 ease-out',
    entering: 'scale-y-100 opacity-100 translate-y-0 transition-transform duration-300 ease-out',
    exiting: 'scale-y-0 opacity-0 -translate-y-4 transition-all duration-200 ease-in',
    initial: 'scale-y-0 opacity-0 -translate-y-4 pointer-events-none'
  },
  content: {
    stable: 'opacity-100 visible transition-none',
    'transitioning-out': 'opacity-0 transition-opacity duration-150 ease-out',
    'transitioning-in': 'opacity-100 transition-opacity duration-150 ease-in'
  },
  overflow: {
    auto: 'overflow-y-auto',
    hidden: 'overflow-hidden'
  }
 };
 
 export const SearchDropdownContent = ({
  children,
  className = '',
  animationState,
  contentTransitionState,
  onTransitionEnd
 }: SearchDropdownContentProps) => {
  const { currentTheme } = useTheme();
  const hasScrollableContent = React.Children.count(children) > 1;
 
  return (
    <div 
      className={cn(
        dropdownStyles.base,
        dropdownStyles.theme[currentTheme],
        dropdownStyles.state[animationState],
        hasScrollableContent ? dropdownStyles.overflow.auto : dropdownStyles.overflow.hidden,
        className
      )}
      role="listbox"
      onTransitionEnd={(e) => {
        if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
          onTransitionEnd();
        }
      }}
    >
      <div 
        className={cn(dropdownStyles.content[contentTransitionState])}
        style={{ display: animationState === 'initial' ? 'none' : 'block' }}
      >
        {children}
      </div>
    </div>
  );
 };