// src/main/components/Navigation/NavButton.tsx
import React, { forwardRef } from 'react';
import { useTheme } from '@/main/components/ThemeContext';

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  context: 'desktop' | 'mobile';
  icon?: React.ReactNode;
}

const buttonStyles = {
  base: 'focus:outline-none transition-all duration-200',
  desktop: {
    default: 'rounded-md p-2 text-text-primary dark:text-text-inverted hover:bg-secondary/50',
    rounded: 'rounded-full p-2 text-text-primary dark:text-text-inverted hover:bg-secondary/50',
    sharp: 'p-2 text-text-primary dark:text-text-inverted hover:bg-secondary/50',
  },
  mobile: {
    default: 'fixed top-4 right-4 w-12 h-12 bg-primary text-text-inverted flex items-center justify-center z-50 rounded-[var(--border-radius)]',
    rounded: 'fixed top-4 right-4 w-12 h-12 bg-primary text-text-inverted flex items-center justify-center z-50 rounded-[var(--border-radius)]',
    sharp: 'fixed top-4 right-4 w-12 h-12 bg-primary text-text-inverted flex items-center justify-center z-50 border-2 border-accent rounded-[var(--border-radius)]',
  },
};

export const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ context, icon, className = '', children, ...props }, ref) => {
    const { currentTheme } = useTheme();

    const themeClasses = buttonStyles[context][currentTheme];
    const classes = `${buttonStyles.base} ${themeClasses} ${className}`;

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