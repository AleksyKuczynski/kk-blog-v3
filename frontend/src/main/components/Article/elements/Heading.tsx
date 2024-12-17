// src/main/components/Article/elements/Heading.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface HeadingProps {
  level: 2 | 3 | 4 | 5 | 6;
  id?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level, id, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  // Base styles for all heading levels
  const baseStyles = 'font-bold text-on-sf';
  
  // Different styles based on heading level
  const levelStyles = {
    2: 'text-2xl md:text-4xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg',
  }[level];

  // Theme specific styles with font differentiation for h2
  const themeStyles = level === 2 
    ? twMerge(
        'text-center',
        'theme-default:font-custom',
        'theme-rounded:font-display theme-rounded:px-4',
        'theme-sharp:font-sans theme-sharp:tracking-tight theme-sharp:px-2'
      )
    : twMerge(
        'font-sans',
        'theme-default:text-center',
        'theme-rounded:px-4',
        'theme-sharp:px-2 theme-sharp:tracking-tight'
      );

  return (
    <Tag 
      id={id} 
      className={`${baseStyles} ${levelStyles} ${themeStyles}`}
    >
      {children}
    </Tag>
  );
};