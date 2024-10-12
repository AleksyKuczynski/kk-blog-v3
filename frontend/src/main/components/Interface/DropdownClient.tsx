// src/main/components/Interface/DropdownClient.tsx

'use client';

import React, { forwardRef, useRef } from 'react';
import { useTheme } from '../ThemeSwitcher';
import { useOutsideClick } from '@/main/lib/hooks';

interface ClientDropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: 'icon' | 'narrow' | 'wide' | 'search';
  align?: 'left' | 'right';
  className?: string;
}

const ClientDropdown = forwardRef<HTMLDivElement, ClientDropdownProps>(
  ({ children, isOpen, onClose, width = 'narrow', align = 'left', className = '' }, ref) => {
    const { currentTheme } = useTheme();
    const internalRef = useRef<HTMLDivElement>(null);
    const dropdownRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    useOutsideClick(dropdownRef, null, isOpen, onClose);

    if (!isOpen) return null;

    const baseStyle = `
      absolute z-60 bg-bgcolor-alt shadow-lg border border-tx-color-muted
      rounded-[var(--border-radius)]
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

    const themeStyles = {
      default: 'theme-default:bg-white theme-default:text-gray-900',
      rounded: 'theme-rounded:rounded-xl',
      sharp: 'theme-sharp:rounded-none',
    };

    return (
      <div
        ref={dropdownRef}
        className={`
          ${baseStyle}
          ${widthStyle[width]}
          ${alignStyle[align]}
          ${themeStyles[currentTheme]}
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
);

ClientDropdown.displayName = 'ClientDropdown';

export default ClientDropdown;