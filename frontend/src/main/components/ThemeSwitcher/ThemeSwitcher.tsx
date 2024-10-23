// src/main/components/ThemeSwitcher/ThemeSwitcher.tsx
'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { useColor } from './ColorContext';
import { Theme, ColorScheme } from './themeTypes';
import { ThemesTranslations, ColorsTranslations } from '@/main/lib/dictionaries/types';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownContent,
  NavButton, 
  CheckIcon, 
  PaletteIcon 
} from '../Interface';

interface ThemeSwitcherProps {
  themeTranslations: ThemesTranslations;
  colorTranslations: ColorsTranslations;
  context?: 'mobile' | 'desktop';
}

const themes: Theme[] = ['default', 'rounded', 'sharp'];
const colorSchemes: ColorScheme[] = ['default', 'scheme1', 'scheme2'];

export function ThemeSwitcher({ 
  themeTranslations, 
  colorTranslations, 
  context = 'desktop' 
}: ThemeSwitcherProps) {
  const { currentTheme, handleThemeChange } = useTheme();
  const { colorScheme, setColorScheme } = useColor();

  return (
    <Dropdown>
      <DropdownTrigger>
        <NavButton
          context={context}
          icon={<PaletteIcon className="h-6 w-6" aria-hidden="true" />}
          aria-label="Customize appearance"
        />
      </DropdownTrigger>

      <DropdownContent 
        width={context === 'mobile' ? 'wide' : 'icon'} 
        align={context === 'mobile' ? 'left' : 'right'}
        className={context === 'mobile' ? 'grid grid-cols-2 gap-4' : ''}
      >
        <div className="py-1">
          <div className="px-4 py-2 text-sm font-medium text-txcolor-secondary">
            {themeTranslations.name}
          </div>
          <ul className="mt-2" role="listbox" aria-label="Select theme">
            {themes.map((theme) => (
              <li 
                key={theme}
                role="option"
                aria-selected={theme === currentTheme}
                className={`
                  flex items-center justify-between px-4 py-2 cursor-pointer
                  ${theme === currentTheme 
                    ? 'bg-prcolor text-txcolor-inverted' 
                    : 'text-txcolor hover:bg-bgcolor-accent'}
                `}
                onClick={() => handleThemeChange(theme)}
              >
                <span>{themeTranslations[theme]}</span>
                {theme === currentTheme && (
                  <CheckIcon className="h-4 w-4 ml-2" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-bgcolor-alt py-1">
          <div className="px-4 py-2 text-sm font-medium text-txcolor-secondary">
            {colorTranslations.name}
          </div>
          <ul className="mt-2" role="listbox" aria-label="Select color scheme">
            {colorSchemes.map((scheme) => (
              <li
                key={scheme}
                role="option"
                aria-selected={scheme === colorScheme}
                className={`
                  flex items-center justify-between px-4 py-2 cursor-pointer
                  ${scheme === colorScheme 
                    ? 'bg-prcolor text-txcolor-inverted' 
                    : 'text-txcolor hover:bg-bgcolor-accent'}
                `}
                onClick={() => setColorScheme(scheme)}
              >
                <span>{colorTranslations[scheme]}</span>
                {scheme === colorScheme && (
                  <CheckIcon className="h-4 w-4 ml-2" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}