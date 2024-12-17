// src/main/components/Article/elements/Link.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Link: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    className={twMerge(
      // Base styles
      'text-pr-fix hover:text-pr-fix-dim transition-colors duration-200',
      // Theme variants
      'theme-default:underline theme-default:underline-offset-4',
      'theme-rounded:bg-sf-hi theme-rounded:px-2 theme-rounded:py-1 theme-rounded:rounded-lg theme-rounded:no-underline theme-rounded:hover:bg-sf-cont',
      'theme-sharp:no-underline theme-sharp:border-b theme-sharp:border-pr-fix theme-sharp:hover:border-pr-fix-dim'
    )}
  >
    {children}
  </a>
);