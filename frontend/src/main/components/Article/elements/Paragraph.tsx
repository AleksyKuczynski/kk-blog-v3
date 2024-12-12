// src/main/components/Article/elements/Paragraph.tsx
import React from 'react';

const paragraphStyles = [
  // Base styles
  'mb-4 font-sans text-txcolor',
  // Theme variants
  'theme-default:text-base theme-default:leading-relaxed',
  'theme-rounded:text-lg theme-rounded:leading-loose theme-rounded:pl-2 theme-rounded:bg-bgcolor-alt theme-rounded:rounded-lg theme-rounded:p-2',
  'theme-sharp:text-base theme-sharp:leading-snug theme-sharp:border-l-2 theme-sharp:border-prcolor theme-sharp:pl-4'
].join(' ');

export const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className={paragraphStyles}>{children}</p>
);