// src/main/components/Article/elements/List.tsx
import React from 'react';

interface ListProps {
  ordered: boolean;
  children: React.ReactNode;
}

export const List: React.FC<ListProps> = ({ ordered, children }) => {
  const Tag = ordered ? 'ol' : 'ul';
  const className = `${ordered ? 'list-decimal' : 'list-disc'} list-inside mb-4`;
  return <Tag className={className}>{children}</Tag>;
};