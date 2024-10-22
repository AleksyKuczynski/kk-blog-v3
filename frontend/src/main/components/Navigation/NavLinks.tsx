// src/main/components/Navigation/NavLinks.tsx
import Link from 'next/link';
import { Lang, NavigationTranslations } from '@/main/lib/dictionaries/types';
import NavLinksClient from './NavLinksClient';

interface NavLinksProps {
  lang: Lang;
  translations: NavigationTranslations;
  className?: string;
  linkStyles: string;
}

type NavigationLink = {
  href: string;
  translationKey: keyof NavigationTranslations;
};

const NAVIGATION_LINKS: NavigationLink[] = [
  { href: '/articles', translationKey: 'articles' },
  { href: '/rubrics', translationKey: 'rubrics' },
  { href: '/authors', translationKey: 'authors' },
];

export default function NavLinks({ lang, translations, className = '', linkStyles }: NavLinksProps) {
  return (
    <>
      {NAVIGATION_LINKS.map((link) => (
        <li key={link.href}>
          <Link 
            href={`/${lang}${link.href}`} 
            className={`nav-link theme-styles ${linkStyles}`} 
            data-href={link.href}
          >
            {translations[link.translationKey]}
          </Link>
        </li>
      ))}
      <NavLinksClient lang={lang} translations={translations} />
    </>
  );
}