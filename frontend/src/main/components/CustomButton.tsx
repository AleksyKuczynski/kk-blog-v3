// src/main/components/CustomButton.tsx
'use client';

import React from 'react';
import { Button } from '@headlessui/react';
import { useTheme } from '@/main/components/ThemeContext';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export function CustomButton({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  children,
  type = 'button',
  onClick,
  ...props
}: CustomButtonProps) {
  const { currentTheme } = useTheme();

  const themeStyles = {
    base: {
      default: 'font-medium rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 transition-colors duration-200',
      rounded: 'font-medium rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 transition-colors duration-200',
      sharp: 'font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 transition-colors duration-200',
    },
    size: {
      sm: {
        default: 'text-sm px-3 py-1',
        rounded: 'text-sm px-4 py-2',
        sharp: 'text-xs px-2 py-1',
      },
      md: {
        default: 'text-base px-4 py-2',
        rounded: 'text-base px-6 py-3',
        sharp: 'text-sm px-3 py-2',
      },
      lg: {
        default: 'text-lg px-6 py-3',
        rounded: 'text-lg px-8 py-4',
        sharp: 'text-base px-4 py-3',
      },
    },
    variant: {
      primary: {
        default: 'bg-primary text-text-inverted hover:bg-primary-dark',
        rounded: 'bg-primary text-text-inverted hover:bg-primary-dark',
        sharp: 'bg-primary text-text-inverted hover:bg-primary-dark',
      },
      secondary: {
        default: 'bg-secondary text-text-inverted hover:bg-secondary-dark',
        rounded: 'bg-secondary text-text-inverted hover:bg-secondary-dark',
        sharp: 'bg-secondary text-text-inverted hover:bg-secondary-dark',
      },
      accent: {
        default: 'bg-accent text-text-inverted hover:bg-accent-dark',
        rounded: 'bg-accent text-text-inverted hover:bg-accent-dark',
        sharp: 'bg-accent text-text-inverted hover:bg-accent-dark',
      },
    },
    iconOnly: {
      sm: 'p-1',
      md: 'p-2',
      lg: 'p-3',
    },
  };

  const baseStyle = themeStyles.base[currentTheme];
  const sizeStyle = icon && !children ? themeStyles.iconOnly[size] : themeStyles.size[size][currentTheme];
  const variantStyle = themeStyles.variant[variant][currentTheme];

  const buttonStyle = `${baseStyle} ${sizeStyle} ${variantStyle} ${className}`;

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const iconOnlyStyle = icon && !children ? 'aspect-square' : '';

  return (
    <Button
      type={type}
      className={`${buttonStyle} ${disabledStyle} ${iconOnlyStyle}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && (iconPosition === 'left' || !children) && (
        <span className={children ? 'mr-2' : ''}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && children && <span className="ml-2">{icon}</span>}
    </Button>
  );
}