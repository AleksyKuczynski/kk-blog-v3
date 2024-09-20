// src/main/components/Navigation.tsx
'use client';

import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBarWrapper from '@/main/components/SearchBar/SearchBarWrapper';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Lang, NavigationTranslations, SearchTranslations } from '@/main/lib/dictionaries/types';

interface NavigationProps {
  lang: Lang;
  translations: NavigationTranslations;
  searchTranslations: SearchTranslations;
  initialTheme: string;
}

export default function Navigation({ lang, translations, searchTranslations, initialTheme }: NavigationProps) {
  const pathname = usePathname();
  const isSearchPage = pathname === `/${lang}/search`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NAVIGATION_LINKS = [
    { href: '/articles', name: translations.articles },
    { href: '/rubrics', name: translations.rubrics },
    { href: '/authors', name: translations.authors },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" aria-label="Main Navigation">
      {/* Desktop Navigation */}
      <div className="hidden xl:flex items-center justify-between bg-primary text-text-inverted px-4 sm:px-6 lg:px-8 h-24 xl:h-28 theme-default:rounded-b theme-rounded:rounded-2xl theme-sharp:border-b-2 border-accent">
        <div className="flex items-center space-x-4">
          {NAVIGATION_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={`/${lang}${link.href}`} 
              className="text-text-inverted hover:bg-primary-dark text-xs xl:text-base font-semibold uppercase tracking-wider px-3 py-2 theme-default:rounded-md theme-rounded:rounded-full theme-sharp:border-b-2 border-transparent hover:border-accent transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link href={`/${lang}`} className="text-text-inverted hover:opacity-80 transition duration-300" aria-label="Home">
          <Image 
            src="/e4m.svg" 
            alt="Event4me Logo" 
            width={320}
            height={107}
            className="w-60 xl:w-80 h-auto"
            priority
          />
        </Link>

        <div className="flex items-center space-x-4">
          {!isSearchPage && <SearchBarWrapper translations={searchTranslations} />}
          <LanguageSwitcher currentLang={lang} />
          <ThemeSwitcher initialTheme={initialTheme} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="xl:hidden">
        <Menu>
          {({ open }) => (
            <>
              <MenuButton
                className="fixed top-4 right-4 w-12 h-12 theme-default:rounded-full theme-rounded:rounded-2xl theme-sharp:border-2 border-accent bg-primary text-text-inverted flex items-center justify-center focus:outline-none z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {open ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </MenuButton>

              {open && (
                <MenuItems
                  className="fixed inset-0 bg-primary text-text-inverted p-4 flex flex-col transition-transform duration-300 ease-in-out transform translate-x-0 theme-default:rounded-none theme-rounded:rounded-2xl theme-sharp:border-2 border-accent"
                >
                  <div className="flex justify-between items-center mb-8">
                    <LanguageSwitcher currentLang={lang} />
                    <Link href={`/${lang}`} onClick={() => setIsMenuOpen(false)}>
                      <Image 
                        src="/e4m.svg" 
                        alt="Event4me Logo" 
                        width={240}
                        height={80}
                        className="w-40 h-auto"
                        priority
                      />
                    </Link>
                  </div>

                  <div className="flex-grow overflow-y-auto flex flex-col justify-center items-center space-y-6">
                    {NAVIGATION_LINKS.map((link) => (
                      <MenuItem key={link.href}>
                        {({ focus }) => (
                          <Link 
                            href={`/${lang}${link.href}`}
                            className={`text-2xl font-bold ${focus ? 'text-accent' : 'text-text-inverted'} hover:text-accent transition-colors duration-200 theme-default:hover:underline theme-rounded:hover:bg-primary-dark theme-rounded:hover:px-4 theme-rounded:hover:py-2 theme-rounded:hover:rounded-full theme-sharp:hover:border-b-2 theme-sharp:hover:border-accent`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                  </div>

                  <div className="mt-auto space-y-4">
                    {!isSearchPage && (
                      <div className="py-2">
                        <SearchBarWrapper translations={searchTranslations} />
                      </div>
                    )}
                    <div className="py-2">
                      <ThemeSwitcher initialTheme={initialTheme} />
                    </div>
                  </div>
                </MenuItems>
              )}
            </>
          )}
        </Menu>
      </div>
    </nav>
  );
}