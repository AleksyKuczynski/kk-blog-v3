// src/main/components/Article/elements/List.tsx
import React from 'react';

interface ListProps {
  ordered: boolean;
  children: React.ReactNode;
}

const getListStyles = (ordered: boolean) => [
  // Base styles
  `${ordered ? 'list-decimal' : 'list-disc'} list-inside mb-4 text-txcolor`,
  // Theme variants
  'theme-default:pl-6',
  'theme-rounded:pl-8 theme-rounded:bg-bgcolor-alt theme-rounded:rounded-lg theme-rounded:p-4',
  'theme-sharp:pl-6 theme-sharp:border-l-2 theme-sharp:border-prcolor'
].join(' ');

export const List: React.FC<ListProps> = ({ ordered, children }) => {
  const Tag = ordered ? 'ol' : 'ul';
  return <Tag className={getListStyles(ordered)}>{children}</Tag>;
};