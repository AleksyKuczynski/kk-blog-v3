// src/main/components/Article/elements/ListItem.tsx
import React from 'react';

export const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="mb-1">{children}</li>
);