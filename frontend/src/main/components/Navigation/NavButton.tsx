// src/main/components/Navigation/NavButton.tsx
import React, { forwardRef } from 'react';
import { useTheme } from '../ThemeSwitcher';

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  context: 'desktop' | 'mobile';
  icon?: React.ReactNode;
  noHover?: boolean;
  isHamburger?: boolean;
}

const buttonStyles = {
  base: 'transition-all duration-200 rounded-[var(--border-radius)]',
  desktop: {
    default: 'p-2 text-text-primary dark:text-text-inverted',
    rounded: 'p-2 text-text-primary dark:text-text-inverted',
    sharp: 'p-2 text-text-primary dark:text-text-inverted',
  },
  mobile: {
    default: 'px-3 py-1 text-sm font-medium',
    rounded: 'px-3 py-1 text-sm font-medium',
    sharp: 'px-3 py-1 text-sm font-medium',
  },
  hamburger: {
    default: 'fixed top-4 right-4 w-12 h-12 bg-primary text-text-inverted flex items-center justify-center z-50',
    rounded: 'fixed top-4 right-4 w-12 h-12 bg-primary text-text-inverted flex items-center justify-center z-50',
    sharp: 'fixed top-4 right-4 w-12 h-12 bg-primary text-text-inverted flex items-center justify-center z-50',
  }
};

const hoverStyles = {
  desktop: {
    default: 'hover:bg-primary-dark/50',
    rounded: 'hover:bg-primary-dark/50',
    sharp: 'hover:bg-primary-dark/50',
  },
};

export const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ context, icon, className = '', noHover = false, isHamburger = false, children, ...props }, ref) => {
    const { currentTheme } = useTheme();

    const getButtonStyles = () => {
      const baseStyle = buttonStyles.base;
      const contextStyle = isHamburger ? buttonStyles.hamburger[currentTheme] : buttonStyles[context][currentTheme];
      const hoverStyle = !noHover && context === 'desktop' ? hoverStyles.desktop[currentTheme] : '';
      return `${baseStyle} ${contextStyle} ${hoverStyle} ${className}`;
    };

    const classes = getButtonStyles();

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {icon || children}
      </button>
    );
  }
);

NavButton.displayName = 'NavButton';