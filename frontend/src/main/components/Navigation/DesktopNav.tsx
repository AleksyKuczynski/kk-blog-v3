// src/main/components/Navigation/DesktopNav.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Lang, NavigationTranslations, SearchTranslations } from '@/main/lib/dictionaries/types';
import ExpandableSearchButton from '../Search/ExpandableSearchButton';
import { ThemeDesktop } from '../ThemeSwitcher';
import { ColorThemeSwitcher } from '../ThemeSwitcher/ColorThemeSwitcher';
import { ColorMode } from '@/main/lib/actions';

interface DesktopNavigationProps {
  lang: Lang;
  translations: NavigationTranslations;
  searchTranslations: SearchTranslations;
  isSearchPage: boolean;
  initialColorMode: ColorMode;
}

export default function DesktopNavigation({
  lang,
  translations,
  searchTranslations,
  isSearchPage,
}: DesktopNavigationProps) {

  const NAVIGATION_LINKS = [
    { href: '/articles', name: translations.articles },
    { href: '/rubrics', name: translations.rubrics },
    { href: '/authors', name: translations.authors },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bgcolor-alt/20 transition-all duration-300">
      <div className="grid grid-cols-3 items-center h-24">
        <div className="flex items-center justify-start pl-8">
          {NAVIGATION_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={`/${lang}${link.href}`} 
              className="text-txcolor-secondary hover:text-txcolor hover:bg-prcolor px-3 py-2 text-sm font-medium uppercase tracking-wider transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <Link href={`/${lang}`} aria-label="Home">
            <Image 
              src="/e4m.svg" 
              alt="Event4me Logo" 
              width={16}
              height={16}
              className="w-40 h-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-4 pr-8">
          {!isSearchPage && <ExpandableSearchButton searchTranslations={searchTranslations} />}
          <LanguageSwitcher currentLang={lang} />
          <ThemeDesktop />
          <ColorThemeSwitcher />
        </div>
      </div>
    </div>
  );
}