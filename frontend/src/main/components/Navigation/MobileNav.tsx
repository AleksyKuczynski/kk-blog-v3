// src/main/components/Navigation/MobileNav.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MobileLanguageSwitcher } from './MobileLanguageSwitcher'
import { MobileThemeSwitcher } from './MobileThemeSwitcher'
import { useOutsideClick } from '@/main/lib/hooks'
import { Lang, NavigationTranslations, SearchTranslations } from '@/main/lib/dictionaries/types'
import { useTheme } from '../ThemeContext'
import { CustomButton } from '../CustomButton'
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
  const searchInputRef = useRef<HTMLInputElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const { currentTheme } = useTheme()

  useOutsideClick(menuRef, isMenuOpen, () => setIsMenuOpen(false))

  const NAVIGATION_LINKS = [
    { href: '/articles', name: translations.articles },
    { href: '/rubrics', name: translations.rubrics },
    { href: '/authors', name: translations.authors },
  ]

  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'rounded':
        return 'rounded-2xl'
      case 'sharp':
        return 'border-2 border-accent'
      default:
        return ''
    }
  }

  useEffect(() => {
    if (isMenuOpen) {
      const firstFocusableElement = menuRef.current?.querySelector('a, button, input') as HTMLElement
      firstFocusableElement?.focus()
    } else {
      menuToggleRef.current?.focus()
    }
  }, [isMenuOpen])

  return (
    <div>
      <NavButton
        ref={menuToggleRef}
        context="mobile"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
        className={`fixed inset-0 bg-primary text-text-inverted transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } ${getThemeClasses()}`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <MobileLanguageSwitcher currentLang={lang} />
            <Link href={`/${lang}`} onClick={() => setIsMenuOpen(false)} tabIndex={0}>
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
              <Link 
                key={link.href}
                href={`/${lang}${link.href}`}
                className={`text-2xl font-bold text-text-inverted hover:text-accent transition-colors duration-200 ${
                  currentTheme === 'default' ? 'hover:underline' :
                  currentTheme === 'rounded' ? 'hover:bg-primary-dark hover:px-4 hover:py-2 hover:rounded-full' :
                  'hover:border-b-2 hover:border-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
                tabIndex={0}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            {!isSearchPage && (
              <div className="py-2">
                <SearchBarWrapper 
                  translations={searchTranslations}
                  showButton={true}
                  inputRef={searchInputRef}
                />
              </div>
            )}
            <div className="py-2">
              <MobileThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}