// src/main/components/Article/elements/Paragraph.tsx
import React from 'react';

export const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mb-4">{children}</p>
);
