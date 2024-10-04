// /frontend/src/main/components/ThemeSwitcher/ColorThemeContext.tsx
'use client';

import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { setColorScheme as setColorSchemeAction } from './themeActions';
import { ColorScheme } from './themeTypes';

interface ColorThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => Promise<void>;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export function ColorThemeProvider({ children, initialColorScheme }: { children: React.ReactNode; initialColorScheme: ColorScheme }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(initialColorScheme);
  const router = useRouter();

  const setColorScheme = async (newScheme: ColorScheme) => {
    if (newScheme !== colorScheme) {
      await setColorSchemeAction(newScheme);
      setColorSchemeState(newScheme);
      document.body.setAttribute('data-color-scheme', newScheme);
      router.refresh();
    }
  };

  return (
    <ColorThemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
}