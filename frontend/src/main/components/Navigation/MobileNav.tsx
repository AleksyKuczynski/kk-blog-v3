// src/main/components/Navigation/MobileNav.tsx
'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MobileLanguageSwitcher } from './LanguageSwitcher'
import { MobileThemeSwitcher } from './ThemeSwitcher'
import { Lang, NavigationTranslations, SearchTranslations } from '@/main/lib/dictionaries/types'
import { useTheme } from '../ThemeContext'
import SearchBarWrapper from '../SearchBar/SearchBarWrapper'
import { NavButton } from './NavButton'

interface MobileNavigationProps {
  lang: Lang
  translations: NavigationTranslations
  searchTranslations: SearchTranslations
  isSearchPage: boolean
}

export default function MobileNavigation({
  lang,
  translations,
  searchTranslations,
  isSearchPage,
}: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { currentTheme } = useTheme()

  const NAVIGATION_LINKS = [
    { href: '/articles', name: translations.articles },
    { href: '/rubrics', name: translations.rubrics },
    { href: '/authors', name: translations.authors },
  ]

  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'rounded':
        return 'rounded-l-2xl'
      case 'sharp':
        return 'border-l-2 border-y-2 border-accent'
      default:
        return ''
    }
  }

  return (
    <div className="xl:hidden">
      <NavButton
        context="mobile"
        isHamburger={true}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="fixed top-4 right-4 z-50 sm:landscape:top-2 sm:landscape:right-2"
      >
        {isMenuOpen ? (
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </NavButton>
      
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 bottom-0 w-[90vw] max-w-md 
          sm:landscape:w-full sm:landscape:max-w-none
          backdrop-blur-xl bg-background/20 transition-all duration-300 overflow-y-auto 
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          ${getThemeClasses()}`}
      >
        <div className="flex flex-col sm:landscape:flex-row h-full p-6 sm:landscape:p-4">
          {/* First column / top section */}
          <div className="sm:landscape:w-1/2 sm:landscape:pr-4 space-y-6 sm:landscape:space-y-4">
            <div className="sm:landscape:hidden">
              <MobileLanguageSwitcher currentLang={lang} />
            </div>

            <Link href={`/${lang}`} className="z-50 flex justify-center sm:landscape:justify-start">
              <Image 
                src="/e4m.svg" 
                alt="Event4me Logo" 
                width={240}
                height={60}
                className="w-60 h-auto sm:landscape:w-40"
                priority
              />
            </Link>

            {!isSearchPage && (
              <div className="py-2 sm:landscape:py-1">
                <SearchBarWrapper 
                  translations={searchTranslations}
                  showButton={true}
                />
              </div>
            )}
          </div>

          {/* Second column / bottom section */}
          <div className="sm:landscape:w-1/2 sm:landscape:pl-4 flex flex-col justify-between">
            <div className="space-y-6 sm:landscape:space-y-4">
              <div className="hidden sm:landscape:block">
                <MobileLanguageSwitcher currentLang={lang} />
              </div>

              <nav className="space-y-4">
                {NAVIGATION_LINKS.map((link) => (
                  <Link 
                    key={link.href}
                    href={`/${lang}${link.href}`}
                    className="block text-2xl sm:landscape:text-xl font-bold text-text-primary dark:text-text-inverted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-6 sm:landscape:mt-4">
              <MobileThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}