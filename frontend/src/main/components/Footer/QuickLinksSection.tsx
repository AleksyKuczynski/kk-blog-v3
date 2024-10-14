// src/main/components/Footer/QuickLinksSection.tsx
import React from 'react';
import NavLinks from '../Navigation/NavLinks';
import { Lang, NavigationTranslations } from '@/main/lib/dictionaries/types';

interface QuickLinksSectionProps {
  lang: Lang;
  quickLinks: {
    title: string;
  };
  navigationTranslations: NavigationTranslations;
}

const QuickLinksSection: React.FC<QuickLinksSectionProps> = ({ lang, quickLinks, navigationTranslations }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{quickLinks.title}</h2>
      <NavLinks lang={lang} translations={navigationTranslations} />
    </div>
  );
};

export default QuickLinksSection;