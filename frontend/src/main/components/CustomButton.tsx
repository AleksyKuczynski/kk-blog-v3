// src/main/components/CustomButton.tsx
'use client';

import React from 'react';
import { useTheme } from '@/main/components/ThemeContext';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const buttonStyles = {
  base: {
    default: 'font-medium rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 transition-colors duration-200',
    rounded: 'font-medium rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 transition-colors duration-200',
    sharp: 'font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 transition-colors duration-200',
  },
  size: {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  },
  variant: {
    primary: 'bg-primary text-text-inverted hover:bg-primary-dark',
    secondary: 'bg-secondary text-text-inverted hover:bg-secondary-dark',
    accent: 'bg-accent text-text-inverted hover:bg-accent-dark',
    icon: 'bg-primary text-text-inverted hover:bg-primary-dark w-10 h-10 p-0 flex items-center justify-center',
  },
};

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

  const baseStyle = buttonStyles.base[currentTheme];
  const sizeStyle = variant === 'icon' ? '' : buttonStyles.size[size];
  const variantStyle = buttonStyles.variant[variant];

  const buttonStyle = `${baseStyle} ${sizeStyle} ${variantStyle} ${className}`;
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Apply current text color to the icon
  const iconWithColor = icon
    ? React.cloneElement(icon as React.ReactElement, {
        className: `${(icon as React.ReactElement).props.className || ''} text-current`,
      })
    : null;

  return (
    <button
      type={type}
      className={`${buttonStyle} ${disabledStyle}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {iconWithColor && (iconPosition === 'left' || variant === 'icon') && (
        <span className={children && variant !== 'icon' ? 'mr-2' : ''}>{iconWithColor}</span>
      )}
      {variant !== 'icon' && children}
      {iconWithColor && iconPosition === 'right' && variant !== 'icon' && <span className="ml-2">{iconWithColor}</span>}
    </button>
  );
}