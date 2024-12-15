// src/main/components/Article/elements/Paragraph.tsx
import { createThemeStyles } from '@/main/lib/utils';
import React from 'react';

const paragraphStyles = createThemeStyles({
    base: 'mb-4 text-base lg:text-lg',
    default: 'px-3 font-serif leading-relaxed',
    rounded: 'px-4 font-serif leading-loose ',
    sharp: 'px-2 font-sans leading-snug'
  });

export const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className={paragraphStyles}>{children}</p>
);