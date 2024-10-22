// src/main/components/Navigation/MobileNav.tsx
'use client'

import { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from '../ThemeSwitcher/ThemeContext'
import { NavProps } from './Navigation'
import { useOutsideClick } from '@/main/lib/hooks'
import { NavButton } from '../Interface'
import Logo from '../Logo'
import NavLinks from './NavLinks'
import SearchBarWrapper from '../Search/SearchBarWrapper'
import { MobileLanguageSwitcher } from './LanguageSwitcher'
import { ThemeMobile } from '../ThemeSwitcher'

const linkStylesValues = {
  default: 'px-3 py-2 text-sm font-medium uppercase tracking-wider',
  rounded: 'px-4 py-2 rounded-full text-sm font-medium',
  sharp: 'px-3 py-2 border-b-2 border-transparent text-sm font-semibold',
};

export default function MobileNavigation({
  lang,
  translations,
  isSearchPage,
}: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { currentTheme } = useTheme()
  const pathname = usePathname()
  const lastPathRef = useRef(pathname)

  // Check if actual navigation occurred
  if (pathname !== lastPathRef.current) {
    lastPathRef.current = pathname
    isMenuOpen && setIsMenuOpen(false)
  }

  useOutsideClick(menuRef, toggleRef, isMenuOpen, () => setIsMenuOpen(false))

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleNavClick = (e: React.MouseEvent) => {
    // Only process actual link clicks
    const link = (e.target as HTMLElement).closest('a')
    if (link?.classList.contains('nav-link')) {
      // Let the navigation complete first
      setTimeout(() => setIsMenuOpen(false), 0)
    }
  }

  return (
    <nav className="xl:hidden" role="navigation">
      <NavButton
        ref={toggleRef}
        context="mobile"
        isHamburger={true}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="fixed top-1 right-2 z-[70] sm:top-4 sm:right-4"
      >
        <svg 
          className="h-6 w-6" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isMenuOpen 
              ? "M6 18L18 6M6 6l12 12" 
              : "M4 6h16M4 12h16M4 18h16"
            } 
          />
        </svg>
      </NavButton>

      <div 
        ref={menuRef}
        id="mobile-menu"
        className={`fixed inset-0 z-60 bg-bgcolor-alt/95 backdrop-blur-xl transition-all duration-300 
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          md:w-[400px] md:right-0 md:left-auto
          sm:landscape:w-full md:landscape:w-full
          flex flex-col h-full
        `}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <div className={`
            flex flex-col items-end space-y-3 
            sm:landscape:flex-row sm:landscape:justify-between sm:landscape:items-center sm:landscape:space-y-0 sm:landscape:space-x-4 sm:landscape:pt-5 sm:landscape:pr-3
            sm:pt-4 sm:pr-16 
          `}>
          {!isSearchPage && (
            <div className="w-full px-4 pt-8 sm:landscape:w-auto sm:landscape:pt-1 order-2 sm:landscape:order-1">
              <SearchBarWrapper 
                translations={translations.search}
                showButton={true}
              />
            </div>
          )}
          <div className="flex pr-16 space-x-2 order-1 sm:landscape:order-2">
            <MobileLanguageSwitcher currentLang={lang} />
            <ThemeMobile 
              themeTranslations={translations.themes} 
              colorTranslations={translations.colors} 
            />
          </div>
        </div>

        <div 
          className="flex-grow flex flex-col items-center p-4 pt-24 overflow-y-auto"
          onClick={handleNavClick}
        >
          <Logo lang={lang} variant="mobile" />
          <ul className="mt-8 flex flex-col space-y-4 sm:landscape:flex-row sm:landscape:space-y-0 sm:landscape:space-x-4 items-center">
            <NavLinks 
              lang={lang} 
              translations={translations.navigation} 
              linkStyles={linkStylesValues[currentTheme]}
            />
          </ul>
        </div>
      </div>
    </nav>
  )
}