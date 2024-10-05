// /frontend/src/main/components/ThemeSwitcher/useTheme.ts
'use client';

import { useState, useCallback } from 'react';
import { useTheme } from './ThemeContext';
import { Theme } from './themeTypes';

export function useThemeLogic() {
  const { currentTheme, handleThemeChange } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const changeTheme = useCallback((newTheme: Theme) => {
    handleThemeChange(newTheme);
  }, [handleThemeChange]);

  return {
    currentTheme,
    isOpen,
    toggleDropdown,
    changeTheme,
    closeDropdown: useCallback(() => setIsOpen(false), []),
  };
}