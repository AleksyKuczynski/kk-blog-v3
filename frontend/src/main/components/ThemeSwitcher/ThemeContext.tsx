// src/main/components/ThemeSwitcher/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ColorMode, Theme } from './themeTypes';
import { setColorMode, setTheme } from './themeActions';

interface ThemeContextType {
  currentTheme: Theme;
  colorMode: ColorMode;
  handleThemeChange: (newTheme: Theme) => Promise<void>;
  handleColorModeChange: (newColorMode: ColorMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme, initialColorMode }: { children: React.ReactNode; initialTheme: Theme; initialColorMode: ColorMode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);
  const [colorMode, setCurrentMode] = useState<ColorMode>(initialColorMode);
  const router = useRouter();

  const handleThemeChange = async (newTheme: Theme) => {
    if (newTheme !== currentTheme) {
      await setTheme(newTheme);
      setCurrentTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      router.refresh();
    }
  };

  const handleColorModeChange = async (newColorMode: ColorMode) => {
    if (newColorMode !== colorMode) {
      await setColorMode(newColorMode);
      setCurrentMode(newColorMode);
      document.documentElement.setAttribute('data-color-mode', newColorMode);
      router.refresh();
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, colorMode, handleThemeChange, handleColorModeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}