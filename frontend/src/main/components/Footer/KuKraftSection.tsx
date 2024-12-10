// src/main/components/Footer/KuKraftSection.tsx
import React from 'react';

interface KuKraftSectionProps {
  translations: {
    designedWithLove: string;
    visitKuKraft: string;
  };
}

export default function KuKraftSection({ translations }: KuKraftSectionProps) {
  return (
    <div className='flex justify-end items-end space-x-2 mt-16'>
      <h3 className="">{translations.designedWithLove}</h3>
      <a 
        href="https://kukraft.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block bg-accent text-text-primary rounded-full text-lg font-semibold hover:bg-accent-dark transition duration-300 transform hover:scale-105"
      >
        {translations.visitKuKraft}
      </a>
    </div>
  );
}