// src/main/components/Article/elements/Paragraph.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p 
    className={twMerge(
      'mx-auto mb-4 md:px-8 lg:px-0 lg:w-5/6 xl:w-3/4 text-base lg:text-lg',
      'theme-default:font-serif theme-default:leading-relaxed',
      'theme-rounded:font-serif theme-rounded:leading-loose ',
      'theme-sharp:font-sans theme-sharp:leading-snug theme-sharp:indent-2'
    )}
  >
    {children}
  </p>
);