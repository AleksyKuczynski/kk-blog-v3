// src/main/components/Article/elements/List.tsx
import React from 'react';
import { createThemeStyles } from '@/main/lib/utils';

interface ListProps {
  ordered: boolean;
  children: React.ReactNode;
}

export const List: React.FC<ListProps> = ({ ordered, children }) => {
  const Tag = ordered ? 'ol' : 'ul';
  
  const listStyles = createThemeStyles({
    base: `${ordered ? 'list-decimal' : 'list-disc'} mb-8 text-on-sf space-y-4`,
    default: 'pl-6 ml-3',
    rounded: 'px-8 p-4 marker:text-pr-fix',
    sharp: 'pl-6 marker:square'
  });

  return <Tag className={listStyles}>{children}</Tag>;
};