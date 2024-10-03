// src/main/components/CustomButton.tsx
'use client';

import React from 'react';

interface CustomButtonProps {
  color?: 'primary' | 'accent';
  style?: 'filled' | 'outlined' | 'no-border';
  content?: 'icon' | 'text' | 'icon-text';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const buttonStyles = {
  base: 'font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 transition-all duration-200',
  size: {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  },
  content: {
    icon: 'p-2',
    text: 'px-4 py-2',
    'icon-text': 'px-4 py-2',
  },
  shadow: {
    none: '',
    sm: 'shadow-sm hover:shadow',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl',
  },
};

const buttonColors = {
  primary: {
    filled: 'bg-prcolor hover:bg-prcolor-dark focus:bg-prcolor-dark text-text-inverted',
    outlined: 'border-prcolor hover:border-prcolor-dark text-primary hover:text-prcolor-dark',
    'no-border': 'text-prcolor hover:text-prcolor-dark',
  },
  accent: {
    filled: 'bg-accolor hover:bg-accolor-dark focus:bg-accolor-dark',
    outlined: 'border-accolor hover:border-accolor-dark text-accolor hover:text-accolor-dark',
    'no-border': 'text-accolor hover:text-accolor-dark',
  },
  none: {
    filled: 'bg-transparent hover:bg-neutral-500 focus:bg-neutral-700 dark:hover:bg-neutral-500 dark:focus:bg-neutral-300 text-text-primary dark:text-text-inverted hover:text-text-inverted focus:text-text-inverted',
    outlined: 'border-txcolor text-txcolor',
    'no-border': 'bg-transparent hover:bg-neutral-500 focus:bg-neutral-700 dark:hover:bg-neutral-500 dark:focus:bg-neutral-300 text-text-primary dark:text-text-inverted focus:text-text-inverted dark:focus:text-text-primary',
  },
};

export function CustomButton({
  color,
  style = 'filled',
  content = 'text',
  size = 'md',
  icon,
  disabled = false,
  className = '',
  children,
  type = 'button',
  onClick,
  shadow = 'none',
  ...props
}: CustomButtonProps) {

  const getButtonStyles = () => {
    const colorStyle = buttonColors[color || 'none'][style];
    const sizeStyle = buttonStyles.size[size];
    const contentStyle = content === 'icon' ? buttonStyles.content.icon : buttonStyles.content[content];

    return `
      ${buttonStyles.base}
      ${sizeStyle}
      ${contentStyle}
      ${buttonStyles.shadow[shadow]}
      ${colorStyle}
      ${style === 'outlined' ? 'border-2' : ''}
      ${className}
      ${content !== 'icon' ? 'w-auto' : ''} // Allow text buttons to expand
      rounded-[var(--border-radius)]
      transition-colors duration-200
    `;
  };

  const renderContent = () => {
    switch (content) {
      case 'icon':
        return icon;
      case 'text':
        return children;
      case 'icon-text':
        return (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        );
      default:
        return children;
    }
  };

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      className={`${getButtonStyles()} ${disabledStyle}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
    </button>
  );
}