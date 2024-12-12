// src/main/components/Article/elements/ListItem.tsx
import React from 'react';

const listItemStyles = [
  // Base styles
  'mb-2',
  // Theme variants
  'theme-default:pl-2',
  'theme-rounded:pl-2 theme-rounded:marker:text-prcolor',
  'theme-sharp:pl-2 theme-sharp:marker:text-prcolor'
].join(' ');

export const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className={listItemStyles}>{children}</li>
);