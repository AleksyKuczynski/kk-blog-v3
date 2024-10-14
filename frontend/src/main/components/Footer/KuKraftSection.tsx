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
    <div>
      <h3 className="text-2xl font-bold mb-4">{translations.designedWithLove}</h3>
      <a 
        href="https://kukraft.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block bg-accent text-text-primary px-6 py-3 rounded-full text-lg font-semibold hover:bg-accent-dark transition duration-300 transform hover:scale-105"
      >
        {translations.visitKuKraft}
      </a>
    </div>
  );
}