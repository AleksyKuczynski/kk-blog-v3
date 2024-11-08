// src/main/components/Interface/Dropdown.tsx
import React, { ReactNode, createContext, useContext, useCallback, useState, useRef } from 'react';
import { useTheme } from '../ThemeSwitcher';
import { useDropdown } from './useDropdown';

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

interface DropdownTriggerProps {
  children: ReactNode;
}

interface DropdownContentProps {
  children: ReactNode;
  width?: 'icon' | 'narrow' | 'wide' | 'search';
  align?: 'left' | 'right';
  className?: string;
}

interface DropdownProps {
  children: ReactNode
  closeOnSelect?: boolean
  forceOpen?: boolean
  onOutsideClick?: () => void
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function DropdownTrigger({ children }: DropdownTriggerProps) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownTrigger must be used within Dropdown');

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    context.toggle();
  };

  return React.cloneElement(children as React.ReactElement, {
    onClick: handleClick,
  });
}

export function DropdownContent({ 
  children,
  width = 'narrow',
  align = 'left',
  className = ''
}: DropdownContentProps) {
  const context = useContext(DropdownContext);
  const { currentTheme } = useTheme();
  if (!context) throw new Error('DropdownContent must be used within Dropdown');
  if (!context.isOpen) return null;

  const baseStyle = `
    absolute z-60 bg-bgcolor-alt shadow-lg border border-txcolor-muted
    rounded-md
    transition-all duration-200 ease-in-out
  `;

  const widthStyle = {
    icon: 'w-40',
    narrow: 'w-48',
    wide: 'w-64',
    search: 'w-full',
  };

  const alignStyle = {
    left: 'left-0',
    right: 'right-0',
  };

  return (
    <div className={`
      ${baseStyle}
      ${widthStyle[width]}
      ${alignStyle[align]}
      ${className}
    `}>
      {children}
    </div>
  );
}

export default function Dropdown({ 
  children, 
  closeOnSelect = true, 
  forceOpen, 
  onOutsideClick 
}: DropdownProps) {
  const {
    isOpen,
    toggle,
    close,
    dropdownRef,
    toggleRef
  } = useDropdown({
    closeOnSelect,
    forceOpen,
    onOutsideClick
  });

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}