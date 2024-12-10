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
    filled: 'bg-accolor hover:bg-accolor-light focus:bg-accolor-dark text-bgcolor border-transparent',
    outlined: 'bg-transparent hover:bg-accolor/10 border-accolor text-accolor'
  },
  primary: {
    filled: 'bg-prcolor hover:bg-prcolor-light focus:bg-prcolor-dark text-bgcolor border-transparent',
    outlined: 'bg-transparent hover:bg-prcolor/10 border-prcolor text-prcolor'
  }
};

const defaultClasses = {
  filled: 'bg-txcolor-muted border-transparent text-bgcolor',
  outlined: 'bg-transparent border-current text-current hover:bg-current/10'
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