// src/main/components/Interface/FloatingButton.tsx
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position?: 'top-right' | 'bottom-right';
  zIndex?: 'default' | 'menu';
}

const zIndexValues = {
  default: 'z-50',
  menu: 'z-[70]'
} as const;

const positionValues = {
  'top-right': 'top-4 right-4',
  'bottom-right': 'bottom-4 right-4'
} as const;

export const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  ({ 
    position = 'bottom-right', 
    zIndex = 'default',
    className,
    children,
    ...props 
  }, ref) => {
    const baseStyles = twMerge(
      // Base styles
      'fixed p-2 transition-all duration-200',
      'text-on-pr bg-pr-cont hover:bg-pr-fix',
      positionValues[position],
      zIndexValues[zIndex],
      // Theme variants
      'theme-default:rounded-full theme-default:shadow-lg',
      'theme-rounded:rounded-lg theme-rounded:shadow-xl',
      'theme-sharp:text-pr-cont theme-sharp:bg-sf-cont theme-sharp:border theme-sharp:border-ol',
      className
    );

    return (
      <button
        ref={ref}
        type="button"
        className={baseStyles}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FloatingButton.displayName = 'FloatingButton';