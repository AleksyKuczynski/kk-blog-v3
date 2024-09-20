// src/main/components/Article/elements/Heading.tsx
import React from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level, id, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const className = {
    1: 'text-4xl font-bold mb-4',
    2: 'text-3xl font-bold mb-3',
    3: 'text-2xl font-bold mb-2',
    4: 'text-xl font-bold mb-2',
    5: 'text-lg font-bold mb-2',
    6: 'text-base font-bold mb-2',
  }[level];

  return <Tag id={id} className={className}>{children}</Tag>;
};