// src/main/components/Article/elements/List.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ListProps {
  ordered: boolean;
  children: React.ReactNode;
}

export const List: React.FC<ListProps> = ({ ordered, children }) => {
  const Tag = ordered ? 'ol' : 'ul';
  
  return <Tag 
    className={twMerge(
      // Base styles
      'mt-3 mb-6 pl-6 mx-auto md:px-8 md:pl-12 lg:w-5/6 xl:w-3/4',
      ordered ? 'list-decimal' : 'list-disc',
      // Theme variants
      'theme-default:font-serif theme-default:text-base theme-default:lg:text-lg theme-default:leading-relaxed',
      'theme-rounded:font-serif theme-rounded:marker:text-pr-cont',
      'theme-sharp:font-sans theme-sharp:leading-snug'
    )}
  >
    {children}
  </Tag>;
};