// src/main/components/Interface/CustomButton.tsx
'use client';

import React from 'react';
import { useTheme } from '../ThemeSwitcher/ThemeContext';
import { Theme } from '../ThemeSwitcher/themeTypes';
import { cn } from '@/main/lib/utils';

type ButtonColor = 'accent' | 'primary';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color?: ButtonColor;
  filled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const commonClasses: Record<Theme, string> = {
  default: 'px-4 py-2 rounded transition-all duration-200 border-2',
  rounded: 'px-5 py-3 rounded-xl transition-all duration-200 border-2',
  sharp: 'px-6 py-4 transition-all duration-200 border-2 uppercase',
};

const buttonClasses: Record<ButtonColor, {
  filled: string;
  outlined: string;
}> = {
  accent: {
    filled: 'bg-tr-cont hover:bg-tr-fix focus:bg-tr-dim text-on-tr border-transparent',
    outlined: 'bg-transparent hover:bg-tr-cont/10 border-tr-cont text-tr-cont'
  },
  primary: {
    filled: 'bg-pr-cont hover:bg-pr-fix focus:bg-pr-dim text-on-pr border-transparent',
    outlined: 'bg-transparent hover:bg-pr-cont/10 border-pr-cont text-pr-cont'
  }
};

const defaultClasses = {
  filled: 'bg-on-sf-var border-transparent text-on-pr',
  outlined: 'bg-transparent border-ol text-current hover:bg-ol/10'
};

export function CustomButton({ 
  color, 
  filled = true, 
  children, 
  onClick, 
  type = 'button',
}: CustomButtonProps) {
  const { currentTheme } = useTheme();

  const classes = cn(
    commonClasses[currentTheme],
    color 
      ? buttonClasses[color][filled ? 'filled' : 'outlined']
      : defaultClasses[filled ? 'filled' : 'outlined'],
    'text-lg',
  );

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}