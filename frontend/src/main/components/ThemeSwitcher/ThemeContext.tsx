// /frontend/src/main/components/Theme/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setTheme, Theme } from '@/main/lib/actions';

interface ThemeContextType {
  currentTheme: Theme;
  handleThemeChange: (newTheme: Theme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme }: { children: React.ReactNode; initialTheme: Theme }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);
  const router = useRouter();

  const handleThemeChange = async (newTheme: Theme) => {
    if (newTheme !== currentTheme) {
      await setTheme(newTheme);
      setCurrentTheme(newTheme);
      document.body.setAttribute('data-theme', newTheme);
      router.refresh();
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, handleThemeChange }}>
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