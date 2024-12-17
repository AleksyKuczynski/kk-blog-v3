// src/main/components/Article/elements/ListItem.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  return <li className='pl-2 last:mb-0'>{children}</li>;
};