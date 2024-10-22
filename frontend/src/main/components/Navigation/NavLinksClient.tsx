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
    normal: 'text-txcolor-secondary hover:text-txcolor hover:bg-prcolor',
    active: 'text-prcolor bg-bgcolor'
  },
  rounded: {
    normal: 'text-txcolor-secondary hover:text-txcolor hover:bg-prcolor',
    active: 'text-prcolor bg-bgcolor'
  },
  sharp: {
    normal: 'text-txcolor-secondary hover:text-txcolor hover:bg-prcolor hover:border-accolor',
    active: 'text-prcolor bg-bgcolor border-accolor'
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
      const stateClass = isActive ? themeStyles[currentTheme].active : themeStyles[currentTheme].normal;
      
      // Update data attribute with current state class
      link.setAttribute('data-state-class', stateClass);
      
      // Combine theme styles, inherited styles, and state class
      link.className = `nav-link theme-styles ${link.getAttribute('data-inherited-class') || ''} ${stateClass}`;
    });
  }, [currentTheme, lang, pathname]);

  useEffect(() => {
    // Store inherited classes on first render
    document.querySelectorAll('.nav-link').forEach((link) => {
      const inheritedClasses = link.className.split(' ')
        .filter(cls => cls !== 'nav-link' && cls !== 'theme-styles')
        .join(' ');
      link.setAttribute('data-inherited-class', inheritedClasses);
    });

    updateLinkStyles();
  }, [updateLinkStyles]);

  return null;
}