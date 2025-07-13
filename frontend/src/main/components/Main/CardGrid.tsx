// src/main/components/Main/CardGrid.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
}

export default function CardGrid({ 
  children, 
  className,
  cols = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    large: 3
  }
}: CardGridProps) {
  
  const gridStyles = twMerge(
    // Base grid styles
    'w-full grid',
    
    // Responsive grid columns
    `grid-cols-${cols.mobile}`,
    `md:grid-cols-${cols.tablet}`,
    `lg:grid-cols-${cols.desktop}`,
    `xl:grid-cols-${cols.large}`,
    
    // Theme-sensitive gaps and styling
    'theme-default:gap-6 theme-default:lg:gap-8',
    'theme-rounded:gap-6 theme-rounded:lg:gap-8',
    'theme-sharp:gap-4',
    
    // Custom className override
    className
  );

  return (
    <div className={gridStyles}>
      {children}
    </div>
  );
}