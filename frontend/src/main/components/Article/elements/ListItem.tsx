// src/main/components/Article/elements/ListItem.tsx
import React from 'react';
import { createThemeStyles } from '@/main/lib/utils';

export const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const itemStyles = createThemeStyles({
    base: 'pl-2 last:mb-0',
    default: '',
    rounded: '',
    sharp: ''
  });

  return <li className={itemStyles}>{children}</li>;
};