// src/main/components/Navigation/ThemeSwitcher.tsx
'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setTheme, Theme } from '@/main/lib/actions';
import { PaletteIcon, CheckIcon } from '../Icons';
import { Dropdown } from '../Dropdown';
import { useTheme } from '../ThemeContext';
import { NavButton } from './NavButton';
import { useOutsideClick } from '@/main/lib/hooks';

const themes: { [key in Theme]: string } = {
  default: 'Default',
  rounded: 'Rounded',
  sharp: 'Sharp',
};

const themeSwitcherStyles = {
  dropdownItem: 'flex items-center w-full px-4 py-2 text-sm text-text-primary dark:text-text-inverted hover:bg-secondary hover:text-text-inverted transition-colors duration-200',
};

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { currentTheme, setCurrentTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(menuRef, toggleRef, isOpen, () => setIsOpen(false));

  const handleThemeChange = async (newTheme: Theme) => {
    if (newTheme !== currentTheme) {
      await setTheme(newTheme);
      setCurrentTheme(newTheme);
      document.body.setAttribute('data-theme', newTheme);
      router.refresh();
    }
    setIsOpen(false);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <NavButton
        context="desktop"
        ref={toggleRef}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<PaletteIcon className="h-6 w-6" aria-hidden="true" />}
      />
      <Dropdown 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        ref={menuRef} 
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
                className={`${themeSwitcherStyles.dropdownItem} ${
                  theme === currentTheme ? 'bg-accent text-text-inverted' : ''
                }`}
                onClick={() => handleThemeChange(theme as Theme)}
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