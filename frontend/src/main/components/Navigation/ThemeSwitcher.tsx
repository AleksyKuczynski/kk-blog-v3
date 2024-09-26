// src/main/components/Navigation/ThemeSwitcher.tsx
'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { setTheme, Theme } from '@/main/lib/actions';
import { PaletteIcon, CheckIcon } from '../Icons';
import { CustomButton } from '../CustomButton';
import { Dropdown } from '../Dropdown';
import { useKeyboardNavigation } from '@/main/lib/hooks';
import { useTheme } from '../ThemeContext';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useKeyboardNavigation(dropdownRef, isOpen, () => setIsOpen(false));

  const handleThemeChange = async (newTheme: Theme) => {
    if (newTheme !== currentTheme) {
      await setTheme(newTheme);
      setCurrentTheme(newTheme);
      document.body.setAttribute('data-theme', newTheme);
      router.refresh();
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, theme: Theme) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleThemeChange(theme);
    }
  };

  return (
    <div className="relative">
       <CustomButton
        content="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<PaletteIcon className="h-6 w-6" aria-hidden="true" />}
      />
      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} width="icon" align="right">
        <div ref={dropdownRef}>
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
                  onKeyDown={(e) => handleKeyDown(e, theme as Theme)}
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
        </div>
      </Dropdown>
    </div>
  );
}