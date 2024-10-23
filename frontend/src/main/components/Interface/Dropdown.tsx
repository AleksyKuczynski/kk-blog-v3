// src/main/components/Interface/Dropdown.tsx
import React, { ReactNode, createContext, useContext, useCallback, useState, useRef } from 'react';
import { useTheme } from '../ThemeSwitcher';
import { useOutsideClick } from '@/main/lib/hooks';

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

interface DropdownTriggerProps {
  children: ReactNode;
}

export function DropdownTrigger({ children }: DropdownTriggerProps) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownTrigger must be used within Dropdown');

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    context.toggle();
  };

  // Clone child element to inject onClick handler
  return React.cloneElement(children as React.ReactElement, {
    onClick: handleClick,
  });
}

interface DropdownContentProps {
  children: ReactNode;
  width?: 'icon' | 'narrow' | 'wide' | 'search';
  align?: 'left' | 'right';
  className?: string;
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

interface DropdownProps {
  children: ReactNode;
  closeOnSelect?: boolean;
}

export default function Dropdown({ children, closeOnSelect = true }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, null, isOpen, () => setIsOpen(false));

  const toggle = useCallback(() => {
    setIsOpen(current => !current);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}