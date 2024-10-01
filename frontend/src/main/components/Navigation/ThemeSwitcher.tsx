// src/main/components/Navigation/ThemeSwitcher.tsx
'use client';

import React, { useRef, useState, createContext, useContext } from 'react';
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

interface ThemeSwitcherContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentTheme: Theme;
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
    <ThemeSwitcherContext.Provider value={{ isOpen, setIsOpen, currentTheme, handleThemeChange }}>
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

function ThemeSwitcherContent() {
  const { isOpen, setIsOpen, currentTheme, handleThemeChange } = useThemeSwitcher();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(menuRef, toggleRef, isOpen, () => setIsOpen(false));

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
                className={`flex items-center w-full px-4 py-2 text-sm text-text-primary dark:text-text-inverted hover:bg-secondary hover:text-text-inverted transition-colors duration-200 ${
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

export function ThemeSwitcher() {
  return (
    <ThemeSwitcherProvider>
      <ThemeSwitcherContent />
    </ThemeSwitcherProvider>
  );
}

function MobileThemeSwitcherContent() {
  const { currentTheme, handleThemeChange } = useThemeSwitcher();

  return (
    <div className="flex items-center space-x-4">
      <NavButton
        context="mobile"
        noHover={true}
        className="pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <PaletteIcon className="h-6 w-6 text-text-primary dark:text-text-inverted" />
      </NavButton>
      <div className="flex flex-wrap gap-2">
        {Object.entries(themes).map(([theme, name]) => (
          <NavButton
            key={theme}
            context="mobile"
            onClick={() => handleThemeChange(theme as Theme)}
            className={`${
              currentTheme === theme
                ? 'bg-accent text-text-inverted'
                : 'bg-background-light text-text-primary'
            }`}
          >
            {name}
          </NavButton>
        ))}
      </div>
    </div>
  );
}
export function MobileThemeSwitcher() {
  return (
    <ThemeSwitcherProvider>
      <MobileThemeSwitcherContent />
    </ThemeSwitcherProvider>
  );
}