// src/main/components/Main/CardGrid.tsx
import React from 'react';

interface CardGridProps {
  children: React.ReactNode;
}

const cardGridStyles = {
  container: `
    grid 
    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
    gap-6 sm:gap-8 
    py-8
  `,
};

export default function CardGrid({ children }: CardGridProps) {
  return (
    <div className={cardGridStyles.container}>
      {children}
    </div>
  );
}