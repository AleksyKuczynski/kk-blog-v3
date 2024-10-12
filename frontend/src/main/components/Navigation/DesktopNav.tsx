// src/main/components/Navigation/DesktopNav.tsx
'use client';

import React from 'react';
import ExpandableSearchButton from '../Search/ExpandableSearchButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeDesktop } from '../ThemeSwitcher';
import { NavProps } from './Navigation';
import Logo from '../Logo';
import NavLinks from './NavLinks';

export default function DesktopNavigation({
  lang,
  translations,
  isSearchPage,
}: NavProps) {

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bgcolor-alt/20 transition-all duration-300">
      <div className="grid grid-cols-3 items-center h-24">
        <div className="flex items-center justify-start pl-8">
          <NavLinks lang={lang} translations={translations.navigation} />
        </div>

        <div className="flex items-center justify-center">
          <Logo lang={lang} variant="desktop" />
        </div>
        <div className="flex items-center justify-end space-x-4 pr-8">
          {!isSearchPage && <ExpandableSearchButton searchTranslations={translations.search} />}
          <LanguageSwitcher currentLang={lang} />
          <ThemeDesktop 
            themeTranslations={translations.themes} 
            colorTranslations={translations.colors} 
          />
        </div>
      </div>
    </div>
  );
}