// src/main/components/ListboxThemeSwitcher.tsx
'use client';

import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { setTheme, Theme } from '@/main/lib/actions';
import { useTheme } from './ThemeContext';
import { PaletteIcon, CheckIcon, LanguageIcon, ChevronDownIcon } from './Icons';
import { CustomButton } from './CustomButton';
import { useOutsideClick } from '../lib/useOutsideClick';
import { Dropdown } from './Dropdown';

const themes: { [key in Theme]: string } = {
  default: 'Default',
  rounded: 'Rounded',
  sharp: 'Sharp',
};

const themeSwitcherStyles = {
  dropdownItem: 'flex items-center w-full px-4 py-2 text-sm text-text-primary dark:text-text-inverted hover:bg-secondary hover:text-text-inverted transition-colors duration-200',
};

interface ThemeSwitcherContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleThemeChange: (newTheme: Theme) => Promise<void>;
}

const ThemeSwitcherContext = createContext<ThemeSwitcherContextType | undefined>(undefined);

function ThemeSwitcherProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { currentTheme, setCurrentTheme } = useTheme();

  const handleThemeChange = async (newTheme: Theme) => {
    if (newTheme !== currentTheme) {
      await setTheme(newTheme);
      setCurrentTheme(newTheme);
      document.body.setAttribute('data-theme', newTheme);
      router.refresh();
    }
    setIsOpen(false);
  };

  return (
    <ThemeSwitcherContext.Provider value={{ isOpen, setIsOpen, handleThemeChange }}>
      {children}
    </ThemeSwitcherContext.Provider>
  );
}

function useThemeSwitcher() {
  const context = useContext(ThemeSwitcherContext);
  if (context === undefined) {
    throw new Error('useThemeSwitcher must be used within a ThemeSwitcherProvider');
  }
  return context;
}

function ThemeSwitcherButton() {
    const { isOpen, setIsOpen } = useThemeSwitcher();
    const { currentTheme } = useTheme();
  
    return (
      <CustomButton
        variant="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<PaletteIcon className="h-6 w-6" aria-hidden="true" />}
      >
        <span className="sr-only">{themes[currentTheme]}</span>
      </CustomButton>
    );
  }

function ThemeSwitcherOptions() {
  const { handleThemeChange } = useThemeSwitcher();
  const { currentTheme } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      // Close the dropdown
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const options = Array.from(e.currentTarget.querySelectorAll('button'));
      const currentIndex = options.findIndex((option) => option === document.activeElement);
      const nextIndex = e.key === 'ArrowDown' 
        ? (currentIndex + 1) % options.length 
        : (currentIndex - 1 + options.length) % options.length;
      (options[nextIndex] as HTMLElement).focus();
    }
  };

  return (
    <ul
      className="py-1 text-base focus:outline-none sm:text-sm"
      role="listbox"
      onKeyDown={handleKeyDown}
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
  );
}

function ThemeSwitcherContent() {
  const { isOpen, setIsOpen } = useThemeSwitcher();
  const ref = useOutsideClick<HTMLDivElement>(isOpen, setIsOpen);

  return (
    <div className="relative" ref={ref}>
      <CustomButton
        variant="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<PaletteIcon className="h-6 w-6" aria-hidden="true" />}
      />
      <Dropdown isOpen={isOpen} width="icon" align="right">
        <ThemeSwitcherOptions />
      </Dropdown>
    </div>
  );
}

export function ListboxThemeSwitcher() {
  return (
    <ThemeSwitcherProvider>
      <ThemeSwitcherContent />
    </ThemeSwitcherProvider>
  );
}

export function MobileThemeSwitcher() {
  const { currentTheme, setCurrentTheme } = useTheme();
  const router = useRouter();

  const handleThemeChange = async (newTheme: Theme) => {
    if (newTheme !== currentTheme) {
      await setTheme(newTheme);
      setCurrentTheme(newTheme);
      document.body.setAttribute('data-theme', newTheme);
      router.refresh();
    }
  };

  return (
    <div className="flex space-x-2">
      {Object.entries(themes).map(([theme, name]) => (
        <button
          key={theme}
          className={`px-3 py-1 rounded ${
            currentTheme === theme ? 'bg-accent text-text-inverted' : 'bg-background-light text-text-primary'
          }`}
          onClick={() => handleThemeChange(theme as Theme)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}