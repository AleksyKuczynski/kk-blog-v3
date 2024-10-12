// src/main/components/Navigation/NavLinks.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../ThemeSwitcher/ThemeContext';
import { NavigationTranslations, Lang } from '@/main/lib/dictionaries/types';

const defaultStyles = 'transition duration-300';

const themeStyles = {
  default: {
    normal: 'text-txcolor-secondary hover:text-txcolor hover:bg-prcolor px-3 py-2 text-sm font-medium uppercase tracking-wider',
    active: 'text-prcolor bg-bgcolor px-3 py-2 text-sm font-medium uppercase tracking-wider'
  },
  rounded: {
    normal: 'text-txcolor-secondary hover:text-txcolor hover:bg-prcolor rounded-full px-4 py-2 text-sm font-medium',
    active: 'text-prcolor bg-bgcolor rounded-full px-4 py-2 text-sm font-medium'
  },
  sharp: {
    normal: 'text-txcolor-secondary hover:text-txcolor hover:bg-prcolor border-b-2 border-transparent hover:border-accolor px-3 py-2 text-sm font-semibold',
    active: 'text-prcolor bg-bgcolor border-b-2 border-accolor px-3 py-2 text-sm font-semibold'
  },
};

interface NavLinksProps {
  lang: Lang;
  translations: NavigationTranslations;
}

export default function NavLinks({ lang, translations }: NavLinksProps) {
  const { currentTheme } = useTheme();
  const pathname = usePathname();

  const NAVIGATION_LINKS = [
    { href: '/articles', name: translations.articles },
    { href: '/rubrics', name: translations.rubrics },
    { href: '/authors', name: translations.authors },
  ];

  const isActiveLink = (href: string) => {
    const langPrefix = `/${lang}`;
    if (href === '/articles' && pathname === langPrefix) {
      return true; // Consider the articles link active on the home page
    }
    return pathname.startsWith(`${langPrefix}${href}`);
  };

  return (
    <>
      {NAVIGATION_LINKS.map((link) => {
        const isActive = isActiveLink(link.href);
        const linkStyle = `${defaultStyles} ${
          isActive 
            ? themeStyles[currentTheme].active 
            : themeStyles[currentTheme].normal
        }`;

        return (
          <Link 
            key={link.href} 
            href={`/${lang}${link.href}`} 
            className={linkStyle}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}