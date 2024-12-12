// src/main/components/Article/elements/Link.tsx
import React from 'react';

const linkStyles = [
  // Base styles
  'transition-colors duration-200',
  // Theme variants
  'theme-default:text-prcolor theme-default:hover:text-prcolor-dark theme-default:underline',
  'theme-rounded:text-prcolor theme-rounded:hover:text-prcolor-dark theme-rounded:no-underline theme-rounded:rounded theme-rounded:px-1 theme-rounded:hover:bg-bgcolor-alt',
  'theme-sharp:text-prcolor theme-sharp:hover:text-prcolor-dark theme-sharp:no-underline theme-sharp:border-b theme-sharp:border-prcolor'
].join(' ');

export const Link: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className={linkStyles}>
    {children}
  </a>
);