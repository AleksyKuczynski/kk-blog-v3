// /frontend/src/main/components/ThemeSwitcher/ThemeDesktop.tsx
'use client';

import React, { useRef } from 'react';
import { NavButton } from '../Navigation/NavButton';
import { Dropdown } from '../Dropdown';
import { PaletteIcon, CheckIcon } from '../Icons';
import { useThemeLogic } from './useTheme';
import { useColorTheme } from './ColorThemeContext';
import { useOutsideClick } from '@/main/lib/hooks';
import { Theme, ColorScheme } from './themeTypes';
import { useTheme } from './ThemeContext';
import { ThemesTranslations, ColorsTranslations } from '@/main/lib/dictionaries/types';

interface ThemeDesktopProps {
  themeTranslations: ThemesTranslations;
  colorTranslations: ColorsTranslations;
}

const themes: Theme[] = ['default', 'rounded', 'sharp'];
const colorSchemes: ColorScheme[] = ['default', 'scheme1', 'scheme2'];

export function ThemeDesktop({ themeTranslations, colorTranslations }: ThemeDesktopProps) {
  const { currentTheme, isOpen, toggleDropdown, changeTheme } = useThemeLogic();
  const { colorScheme, setColorScheme } = useColorTheme();
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
        width="wide" 
        align="right"
      >
        <div className="py-1">
          <div className="px-4 py-2 text-sm font-medium text-txcolor-secondary">
            {themeTranslations?.name || 'Theme'}
          </div>
          <ul className="mt-2 py-1">
            {themes.map((theme) => (
              <li key={theme}>
                <button
                  className={`flex items-center w-full px-4 py-2 text-sm text-txcolor hover:bg-bgcolor-alt transition-colors duration-200 ${
                    theme === currentTheme ? 'bg-bgcolor-accent text-txcolor' : ''
                  }`}
                  onClick={() => changeTheme(theme)}
                  role="option"
                  aria-selected={theme === currentTheme}
                >
                  <span className="flex items-center justify-center w-5 mr-3">
                    {theme === currentTheme && (
                      <CheckIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                  <span>{themeTranslations?.[theme] || theme}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-bgcolor-alt py-1">
          <div className="px-4 py-2 text-sm font-medium text-txcolor-secondary">
            {colorTranslations?.name || 'Color'}
          </div>
          <ul className="mt-2 py-1">
            {Object.entries(colorTranslations).filter(([key]) => key !== 'name').map(([scheme, translation]) => (
              <li key={scheme}>
                <button
                  className={`flex items-center w-full px-4 py-2 text-sm text-txcolor hover:bg-bgcolor-alt transition-colors duration-200 ${
                    scheme === colorScheme ? 'bg-bgcolor-accent text-txcolor' : ''
                  }`}
                  onClick={() => setColorScheme(scheme as ColorScheme)}
                  role="option"
                  aria-selected={scheme === colorScheme}
                >
                  <span className="flex items-center justify-center w-5 mr-3">
                    {scheme === colorScheme && (
                      <CheckIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                  <span>{translation}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Dropdown>
    </div>
  );
}