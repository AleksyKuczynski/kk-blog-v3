// src/main/components/ThemeSwitcher/ThemeMobile.tsx
'use client';

import React from 'react';
import { NavButton } from '../Navigation/NavButton';
import { PaletteIcon } from '../Icons';
import { useThemeLogic } from './useTheme';
import { useColorTheme } from './ColorThemeContext';
import { Theme, ColorScheme } from './themeTypes';
import { ThemesTranslations, ColorsTranslations } from '@/main/lib/dictionaries/types';

interface ThemeMobileProps {
  themeTranslations: ThemesTranslations;
  colorTranslations: ColorsTranslations;
}

export function ThemeMobile({ themeTranslations, colorTranslations }: ThemeMobileProps) {
  const { currentTheme, changeTheme } = useThemeLogic();
  const { colorScheme, setColorScheme } = useColorTheme();

  const themes: Theme[] = ['default', 'rounded', 'sharp'];
  const colorSchemes: ColorScheme[] = ['default', 'scheme1', 'scheme2'];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <NavButton
          context="mobile"
          noHover={true}
          className="pointer-events-none bg-transparent"
          aria-hidden="true"
        >
          <PaletteIcon className="h-6 w-6 text-text-primary dark:text-text-inverted" />
        </NavButton>
        <span className="text-lg font-medium">{themeTranslations.name}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <NavButton
            key={theme}
            context="mobile"
            onClick={() => changeTheme(theme)}
            className={`${
              currentTheme === theme
                ? 'bg-accent text-text-inverted'
                : 'bg-background-light text-text-primary'
            }`}
          >
            {themeTranslations[theme]}
          </NavButton>
        ))}
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <span className="text-lg font-medium">{colorTranslations.name}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {colorSchemes.map((scheme) => (
          <NavButton
            key={scheme}
            context="mobile"
            onClick={() => setColorScheme(scheme)}
            className={`${
              colorScheme === scheme
                ? 'bg-accent text-text-inverted'
                : 'bg-background-light text-text-primary'
            }`}
          >
            {colorTranslations[scheme]}
          </NavButton>
        ))}
      </div>
    </div>
  );
}