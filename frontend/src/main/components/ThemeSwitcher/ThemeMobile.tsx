// /frontend/src/main/components/Theme/ThemeMobile.tsx
'use client';

import React from 'react';
import { NavButton } from '../Navigation/NavButton';
import { PaletteIcon } from '../Icons';
import { useThemeLogic } from './useTheme';
import { Theme } from './themeTypes';

const themes: { [key in Theme]: string } = {
  default: 'Default',
  rounded: 'Rounded',
  sharp: 'Sharp',
};

export function ThemeMobile() {
  const { currentTheme, changeTheme } = useThemeLogic();

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
            onClick={() => changeTheme(theme as Theme)}
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