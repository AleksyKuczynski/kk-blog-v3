// src/main/components/Footer/QuickLinksSection.tsx
'use client';

import React from 'react';
import NavLinks from '../Navigation/NavLinks';
import { Lang, NavigationTranslations } from '@/main/lib/dictionaries/types';
import { useTheme } from '../ThemeSwitcher';

interface QuickLinksSectionProps {
  lang: Lang;
  quickLinks: {
    title: string;
  };
  navigationTranslations: NavigationTranslations;
}

const linkStylesValues = {
  default: 'px-3 py-2 font-medium tracking-wider',
  rounded: 'px-4 py-2 rounded-full font-medium',
  sharp: 'px-3 py-2 border-b-2 border-transparent uppercase font-medium text-sm',
};

const QuickLinksSection: React.FC<QuickLinksSectionProps> = ({ lang, quickLinks, navigationTranslations }) => {
  const { currentTheme } = useTheme();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{quickLinks.title}</h2>
      <NavLinks lang={lang} translations={navigationTranslations} linkStyles={linkStylesValues[currentTheme]} />
    </div>
  );
};

export default QuickLinksSection;