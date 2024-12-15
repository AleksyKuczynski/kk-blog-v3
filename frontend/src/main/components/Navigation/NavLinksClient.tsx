// src/main/components/Navigation/NavLinksClient.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/main/components/ThemeSwitcher/ThemeContext';
import { Lang, NavigationTranslations } from '@/main/lib/dictionaries/types';

interface NavLinksClientProps {
  lang: Lang;
  translations: NavigationTranslations;
}

// Define classes that indicate state
const stateClasses = {
  text: ['text-on-sf-var', 'text-pr-cont'],
  background: ['bg-sf'],
  font: ['font-bold'],
  border: ['border-transparent', 'border-pr-cont', 'border-b-2'],
  hover: ['hover:text-on-sf'],
  transition: ['transition-colors', 'duration-200'],
  rounded: ['rounded-full']
};

// All classes that should be removed when changing state
const cleanupClasses = Object.values(stateClasses).flat();

const themeStyles = {
  default: {
    normal: 'text-on-sf-var hover:text-on-sf transition-colors duration-200',
    active: 'text-pr-cont bg-sf font-bold'
  },
  rounded: {
    normal: 'text-on-sf-var hover:text-on-sf transition-colors duration-200',
    active: 'text-pr-cont bg-sf font-bold rounded-full'
  },
  sharp: {
    normal: 'text-on-sf-var hover:text-on-sf border-b-2 border-transparent transition-colors duration-200',
    active: 'text-pr-cont bg-sf font-bold border-b-2 border-pr-cont'
  },
} as const;

export default function NavLinksClient({ lang }: NavLinksClientProps) {
  const { currentTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const cleanClasses = (className: string) => {
      return className
        .split(' ')
        .filter(cls => !cleanupClasses.includes(cls))
        .join(' ');
    };

    const getLinkStyle = (href: string) => {
      const isActive = pathname.startsWith(`/${lang}${href}`);
      return isActive ? themeStyles[currentTheme].active : themeStyles[currentTheme].normal;
    };

    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      const href = link.getAttribute('data-href');
      if (!href) return;

      // Clean existing theme classes
      const baseClasses = cleanClasses(link.className);
      
      // Add new theme classes
      const newThemeClasses = getLinkStyle(href);
      
      // Combine and set
      link.className = `${baseClasses} ${newThemeClasses}`.trim();
    });
  }, [pathname, currentTheme, lang]);

  return null;
}