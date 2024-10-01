// /frontend/src/main/components/Section.tsx

import React from 'react';
import { useTheme } from '@/main/components/ThemeContext';

interface SectionProps {
  children: React.ReactNode;
  isOdd: boolean;
  title?: string;
  className?: string;
}

export default function Section({ children, isOdd, title, className = '' }: SectionProps) {
  const sectionBaseClasses = 'w-full py-12';
  const sectionOddClasses = 'bg-background-light dark:bg-background-dark';
  const sectionEvenClasses = 'bg-background-lightaccent dark:bg-background-darkaccent';

  const h2BaseClasses = 'text-3xl font-bold mb-6';
  const h2OddClasses = 'text-primary';
  const h2EvenClasses = 'text-secondary';

  return (
    <section className={`
      ${sectionBaseClasses}
      ${isOdd ? sectionOddClasses : sectionEvenClasses}
      ${className}
    `}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={`
            ${h2BaseClasses}
            ${isOdd ? h2OddClasses : h2EvenClasses}
          `}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}