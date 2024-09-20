// src/main/components/Article/elements/Link.tsx
import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, children }) => (
  <a href={href} className="text-blue-600 hover:underline">{children}</a>
);
