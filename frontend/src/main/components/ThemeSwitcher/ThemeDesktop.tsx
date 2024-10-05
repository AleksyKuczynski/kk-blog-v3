// src/main/components/ThemeSwitcher/ThemeDesktop.tsx
'use client';

import React, { useRef } from 'react';
import { useThemeLogic } from './useTheme';
import { useColor } from './ColorContext';
import { useOutsideClick } from '@/main/lib/hooks';
import { Theme, ColorScheme } from './themeTypes';
import { ThemesTranslations, ColorsTranslations } from '@/main/lib/dictionaries/types';
import { CheckIcon, Dropdown, DropdownItem, NavButton, PaletteIcon } from '../Interface';

interface ThemeDesktopProps {
  themeTranslations: ThemesTranslations;
  colorTranslations: ColorsTranslations;
}

const themes: Theme[] = ['default', 'rounded', 'sharp'];

export function ThemeDesktop({ themeTranslations, colorTranslations }: ThemeDesktopProps) {
  const { currentTheme, isOpen, toggleDropdown, changeTheme, closeDropdown } = useThemeLogic();
  const { colorScheme, setColorScheme } = useColor();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(dropdownRef, toggleRef, isOpen, closeDropdown);

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
          <DropdownItem state="sectionName">
            {themeTranslations?.name || 'Theme'}
          </DropdownItem>
          <ul className="mt-2 py-1">
            {themes.map((theme) => (
              <li key={theme}>
                <DropdownItem
                  state={theme === currentTheme ? 'selected' : 'normal'}
                  onClick={() => changeTheme(theme)}
                  withCheckmark
                >
                  <span>{themeTranslations?.[theme] || theme}</span>
                  {theme === currentTheme && (
                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </DropdownItem>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-bgcolor-alt py-1">
          <DropdownItem state="sectionName">
            {colorTranslations?.name || 'Color'}
          </DropdownItem>
          <ul className="mt-2 py-1">
            {Object.entries(colorTranslations).filter(([key]) => key !== 'name').map(([scheme, translation]) => (
              <li key={scheme}>
                <DropdownItem
                  state={scheme === colorScheme ? 'selected' : 'normal'}
                  onClick={() => setColorScheme(scheme as ColorScheme)}
                  withCheckmark
                >
                  <span>{translation}</span>
                  {scheme === colorScheme && (
                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </DropdownItem>
              </li>
            ))}
          </ul>
        </div>
      </Dropdown>
    </div>
  );
}