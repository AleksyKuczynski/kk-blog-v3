// src/main/components/Interface/CustomButton.tsx
'use client';

import React from 'react';
import { useTheme } from '../ThemeSwitcher/ThemeContext';
import { Theme } from '../ThemeSwitcher/themeTypes';

type ButtonColor = 'accent' | 'primary';

interface CustomButtonProps {
  color: ButtonColor;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const commonClasses: Record<Theme, string> = {
  default: 'px-4 py-2 rounded transition-colors duration-200',
  rounded: 'px-5 py-3 rounded-xl transition-colors duration-200',
  sharp: 'px-6 py-4 transition-colors duration-200 uppercase',
};

const buttonClasses: Record<ButtonColor, string> = {
  accent: 'text-xl bg-accolor hover:bg-accolor-light focus:bg-accolor-dark text-txcolor-inverted',
  primary:'text-lg bg-prcolor hover:bg-prcolor-light focus:bg-prcolor-dark text-txcolor-inverted',
};

export function CustomButton({ color, children, onClick, type = 'button' }: CustomButtonProps) {
  const { currentTheme } = useTheme();

  const classes = `${commonClasses[currentTheme]} ${buttonClasses[color]}`;

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