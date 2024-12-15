// src/main/components/Article/elements/Heading.tsx
import { createThemeStyles } from '@/main/lib/utils';
import React from 'react';

interface HeadingProps {
  level: 2 | 3 | 4 | 5 | 6;
  id?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level, id, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  // Base styles common for all headings
  const baseStyles = 'mb-8 font-bold text-on-sf';
  
  // Different styles based on heading level
  const levelStyles = {
    2: 'text-3xl md:text-4xl mb-12',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg',
  }[level];

  // Theme specific styles with font differentiation for h2
  const themeStyles = level === 2 
    ? createThemeStyles({
        base: 'text-center',
        default: 'font-custom px-3',
        rounded: 'font-display px-4',
        sharp: 'font-sans tracking-tight px-2'
      })
    : createThemeStyles({
        base: 'font-sans',
        default: 'px-3',
        rounded: 'px-4',
        sharp: 'px-2 tracking-tight'
      });

  return (
    <Tag 
      id={id} 
      className={`${baseStyles} ${levelStyles} ${themeStyles}`}
    >
      {children}
    </Tag>
  );
};