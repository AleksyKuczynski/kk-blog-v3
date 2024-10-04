// src/main/components/Navigation/ColorModeSwitcher.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { setColorMode } from '@/main/lib/actions';
import { NavButton } from './NavButton';
import { ColorMode } from '@/main/lib/actions';

interface ColorModeSwitcherProps {
  initialColorMode: ColorMode;
}

export function ColorModeSwitcher({ initialColorMode }: ColorModeSwitcherProps) {
  const [colorMode, setColorModeState] = React.useState<ColorMode>(initialColorMode);
  const router = useRouter();

  const toggleColorMode = async () => {
    const newMode = colorMode === 'light' ? 'dark' : 'light';
    await setColorMode(newMode);
    setColorModeState(newMode);
    document.documentElement.setAttribute('data-color-mode', newMode);
    router.refresh();
  };

  return (
    <NavButton
      context="desktop"
      onClick={toggleColorMode}
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
    >
      {colorMode === 'light' ? '🌙' : '☀️'}
    </NavButton>
  );
}