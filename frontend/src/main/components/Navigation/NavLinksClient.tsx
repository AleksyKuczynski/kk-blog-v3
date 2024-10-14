// src/main/components/Navigation/NavLinksClient.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from '@/main/components/ThemeSwitcher/ThemeContext';
import { Lang, NavigationTranslations } from '@/main/lib/dictionaries/types';
import { useCallback, useEffect } from 'react';

interface NavLinksClientProps {
  lang: Lang;
  translations: NavigationTranslations;
}

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

export default function NavLinksClient({ lang }: NavLinksClientProps) {
  const { currentTheme } = useTheme();
  const pathname = usePathname();

  const updateLinkStyles = useCallback(() => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      const href = link.getAttribute('data-href');
      const isActive = pathname.startsWith(`/${lang}${href}`);
      const style = isActive ? themeStyles[currentTheme].active : themeStyles[currentTheme].normal;
      link.className = `nav-link ${style}`;
    });
  }, [currentTheme, lang, pathname]);

  useEffect(() => {
    updateLinkStyles();
  }, [updateLinkStyles]);

  return null; // This component doesn't render anything, it just applies styles
}