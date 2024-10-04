// /frontend/src/main/components/Theme/ThemeDesktop.tsx
'use client';

import React, { useRef } from 'react';
import { NavButton } from '../Navigation/NavButton';
import { Dropdown } from '../Dropdown';
import { PaletteIcon, CheckIcon } from '../Icons';
import { useThemeLogic } from './useTheme';
import { useOutsideClick } from '@/main/lib/hooks';
import { Theme } from './themeTypes';

const themes: { [key in Theme]: string } = {
  default: 'Default',
  rounded: 'Rounded',
  sharp: 'Sharp',
};

export function ThemeDesktop() {
  const { currentTheme, isOpen, toggleDropdown, changeTheme } = useThemeLogic();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(dropdownRef, toggleRef, isOpen, () => toggleDropdown());

  return (
    <div className="relative">
      <NavButton
        ref={toggleRef}
        context="desktop"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<PaletteIcon className="h-6 w-6" aria-hidden="true" />}
      />
      <Dropdown 
        ref={dropdownRef}
        isOpen={isOpen} 
        onClose={toggleDropdown} 
        width="icon" 
        align="right"
      >
        <ul
          className="py-1 text-base focus:outline-none sm:text-sm"
          role="listbox"
        >
          {Object.entries(themes).map(([theme, name]) => (
            <li key={theme}>
              <button
                className={`flex items-center w-full px-4 py-2 text-sm text-text-primary dark:text-text-inverted hover:bg-secondary hover:text-text-inverted transition-colors duration-200 ${
                  theme === currentTheme ? 'bg-accent text-text-inverted' : ''
                }`}
                onClick={() => changeTheme(theme as Theme)}
                role="option"
                aria-selected={theme === currentTheme}
              >
                <span className="flex items-center justify-center w-5 mr-3">
                  {theme === currentTheme && (
                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}