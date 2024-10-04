// src/main/components/ThemeSwitcher/ColorThemeSwitcher.tsx

'use client';

import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { setColorScheme, ColorScheme } from '@/main/lib/actions';
import { NavButton } from '../Navigation/NavButton';

interface ColorThemeContextType {
  colorScheme: ColorScheme;
  cycleColorScheme: () => Promise<void>;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export function ColorThemeProvider({ children, initialColorScheme }: { children: React.ReactNode; initialColorScheme: ColorScheme }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(initialColorScheme);
  const router = useRouter();

  const cycleColorScheme = async () => {
    const schemes: ColorScheme[] = ['default', 'scheme1', 'scheme2'];
    const currentIndex = schemes.indexOf(colorScheme);
    const nextScheme = schemes[(currentIndex + 1) % schemes.length];
    await setColorScheme(nextScheme);
    setColorSchemeState(nextScheme);
    document.body.setAttribute('data-color-scheme', nextScheme);
    router.refresh();
  };

  return (
    <ColorThemeContext.Provider value={{ colorScheme, cycleColorScheme }}>
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

export function ColorThemeSwitcher() {
  const { colorScheme, cycleColorScheme } = useColorTheme();

  const getColorSchemeIcon = (scheme: ColorScheme) => {
    switch (scheme) {
      case 'default': return '🎨';
      case 'scheme1': return '🌈';
      case 'scheme2': return '🔮';
      default: return '🎨';
    }
  };

  return (
    <NavButton
      context="desktop"
      onClick={cycleColorScheme}
      aria-label={`Switch to next color scheme (current: ${colorScheme})`}
    >
      {getColorSchemeIcon(colorScheme)}
    </NavButton>
  );
}