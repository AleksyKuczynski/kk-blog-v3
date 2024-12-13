// src/main/components/Article/elements/Heading.tsx
import React from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level, id, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseStyles = 'font-bold mb-4';
  
  const levelStyles = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  }[level];

  const themeStyles = [
    // Base theme styles
    'transition-colors duration-200',
    // Default theme
    'theme-default:border-b theme-default:border-prcolor theme-default:pb-2',
    // Rounded theme
    'theme-rounded:bg-bgcolor-alt theme-rounded:p-2 theme-rounded:rounded-lg theme-rounded:shadow-md',
    // Sharp theme
    'theme-sharp:border-l-2 theme-sharp:border-prcolor theme-sharp:pl-4'
  ].join(' ');

  return (
    <Tag 
      id={id} 
      className={`${baseStyles} ${levelStyles} ${themeStyles}`}
    >
      {children}
    </Tag>
  );
};