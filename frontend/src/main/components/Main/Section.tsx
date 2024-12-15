// /frontend/src/main/components/Section.tsx

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  isOdd?: boolean | undefined;
  ariaLabel?: string;
  title?: string;
  className?: string;
}

export default function Section({ children, isOdd, title, className = '', ariaLabel }: SectionProps) {
  const sectionBaseClasses = 'w-full pb-6 lg:pb-8 xl:pb-12';
  const sectionOddClasses = 'bg-sf';
  const sectionEvenClasses = 'bg-sf-hst';

  const h2BaseClasses = 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 pl-1';
  const h2OddClasses = 'text-sf-hst';
  const h2EvenClasses = 'text-sf';

  const sectionAriaLabel = ariaLabel || title;

  return (
    <section 
      className={`
        ${sectionBaseClasses}
        ${isOdd ? sectionOddClasses : sectionEvenClasses}
        ${className}
      `}
      aria-label={sectionAriaLabel}
    >
      {title && (
        <h2 className={`
          ${h2BaseClasses}
          ${isOdd ? h2OddClasses : h2EvenClasses}
        `}>
          {title}
        </h2>
      )}
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
}