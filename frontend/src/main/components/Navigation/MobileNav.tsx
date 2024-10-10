// src/main/components/Navigation/MobileNav.tsx
'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { MobileLanguageSwitcher } from './LanguageSwitcher'
import SearchBarWrapper from '../Search/SearchBarWrapper'
import { NavButton } from '../Interface/NavButton'
import { ThemeMobile } from '../ThemeSwitcher'
import { NavProps } from './Navigation'
import Logo from '../Logo'

export default function MobileNavigation({
  lang,
  translations,
  isSearchPage,
}: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const { navigation, search, themes, colors } = translations

  const NAVIGATION_LINKS = [
    { href: '/articles', name: navigation.articles },
    { href: '/rubrics', name: navigation.rubrics },
    { href: '/authors', name: navigation.authors },
  ]

  return (
    <div className="xl:hidden">
      <NavButton
        context="mobile"
        isHamburger={true}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="fixed top-4 right-4 z-[70] sm:top-2 sm:right-2"
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
        className={`fixed inset-0 z-60 bg-bgcolor-alt/95 backdrop-blur-xl transition-all duration-300 
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          md:w-[400px] md:right-0 md:left-auto
          sm:landscape:w-full md:landscape:w-full
        `}
      >
        <div className="h-full flex flex-col sm:landscape:grid sm:landscape:grid-cols-2 sm:landscape:grid-rows-[1fr_auto]">
          {/* Left column - Search (for landscape) */}
          <div className="sm:landscape:col-span-1 sm:landscape:row-span-2 p-4 flex items-center">
            {!isSearchPage && (
              <SearchBarWrapper 
                translations={search}
                showButton={true}
              />
            )}
          </div>

          {/* Right column - Logo, Navigation, Language, and Theme */}
          <div className="sm:landscape:col-start-2 sm:landscape:row-span-2 flex flex-col h-full">
            {/* Middle section - Logo and Navigation */}
            <div className="flex-grow flex flex-col items-center justify-center p-4 max-h-[800px] overflow-y-auto">
              <Logo lang={lang} variant="mobile" />
              <nav className="mt-8 space-y-4">
                {NAVIGATION_LINKS.map((link) => (
                  <Link 
                    key={link.href}
                    href={`/${lang}${link.href}`}
                    className="block text-2xl font-bold text-txcolor hover:text-prcolor transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom section - Language and Theme */}
            <div className="p-4 flex justify-around">
              <MobileLanguageSwitcher currentLang={lang} />
              <ThemeMobile themeTranslations={themes} colorTranslations={colors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}