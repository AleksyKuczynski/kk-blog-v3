// /frontend/src/main/components/ThemeSwitcher/ColorContext.tsx
'use client';

import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { setColorScheme as setColorSchemeAction } from './themeActions';
import { ColorScheme } from './themeTypes';

interface ColorContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => Promise<void>;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children, initialColorScheme }: { children: React.ReactNode; initialColorScheme: ColorScheme }) {
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
    <ColorContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
}