// src/main/components/ThemeSwitcher/ThemeMobile.tsx
'use client';

import React from 'react';
import { PaletteIcon } from '../Interface/Icons';
import { Dropdown, DropdownItem, NavButton } from '../Interface';
import { useThemeLogic } from './useTheme';
import { useColor } from './ColorContext';
import { Theme, ColorScheme } from './themeTypes';
import { ThemesTranslations, ColorsTranslations } from '@/main/lib/dictionaries/types';
import { useDropdown } from '@/main/lib/hooks';

interface ThemeMobileProps {
  themeTranslations: ThemesTranslations;
  colorTranslations: ColorsTranslations;
}

export function ThemeMobile({ themeTranslations, colorTranslations }: ThemeMobileProps) {
  const { currentTheme, changeTheme } = useThemeLogic();
  const { colorScheme, setColorScheme } = useColor();
  const {
    isOpen,
    toggle: toggleDropdown,
    close: closeDropdown,
    dropdownRef,
    toggleRef,
  } = useDropdown();

  const themes: Theme[] = ['default', 'rounded', 'sharp'];
  const colorSchemes: ColorScheme[] = ['default', 'scheme1', 'scheme2'];

  return (
    <div className="relative">
      <NavButton
        ref={toggleRef}
        context="mobile"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<PaletteIcon className="h-6 w-6" />}
      />
      <Dropdown 
        ref={dropdownRef}
        isOpen={isOpen} 
        onClose={closeDropdown} 
        width="wide" 
        align="right"
      >
        <div className="grid grid-cols-2 gap-4 p-4">
          <div>
            <h3 className="text-sm font-medium mb-2">{themeTranslations.name}</h3>
            {themes.map((theme) => (
              <DropdownItem
                key={theme}
                state={currentTheme === theme ? 'selected' : 'normal'}
                onClick={() => {
                  changeTheme(theme);
                  closeDropdown();
                }}
              >
                {themeTranslations[theme]}
              </DropdownItem>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">{colorTranslations.name}</h3>
            {colorSchemes.map((scheme) => (
              <DropdownItem
                key={scheme}
                state={colorScheme === scheme ? 'selected' : 'normal'}
                onClick={() => {
                  setColorScheme(scheme);
                  closeDropdown();
                }}
              >
                {colorTranslations[scheme]}
              </DropdownItem>
            ))}
          </div>
        </div>
      </Dropdown>
    </div>
  );
}