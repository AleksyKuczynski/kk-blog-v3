// src/main/components/Navigation/MobileNav.tsx
'use client'

import { useState, useRef, useReducer, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from '../ThemeSwitcher/ThemeContext'
import { NavProps } from './Navigation'
import { useOutsideClick } from '@/main/lib/hooks'
import { NavButton } from '../Interface'
import Logo from '../Logo'
import NavLinks from './NavLinks'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from '../ThemeSwitcher'
import ExpandableSearchButton from '../Search/ExpandableSearchButton'
import { CONTROLS_ANIMATION_DURATION, MENU_ANIMATION_DURATION } from '../Interface/constants'
import { menuAnimationReducer } from './menuAnimationReducer'

const linkStylesValues = {
  default: 'px-3 py-2 text-sm font-medium uppercase tracking-wider',
  rounded: 'px-4 py-2 rounded-full text-sm font-medium',
  sharp: 'px-3 py-2 border-b-2 border-transparent text-sm font-semibold',
};

export default function MobileNavigation({
  lang,
  translations,
}: NavProps) {
  const [menuState, dispatch] = useReducer(menuAnimationReducer, 'CLOSED');
  const [isMenuOpen, setIsMenuOpen] =  useState(false)
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

  const handleNavClick = (e: React.MouseEvent) => {
    // Only process actual link clicks
    const link = (e.target as HTMLElement).closest('a')
    if (link?.classList.contains('nav-link')) {
      // Let the navigation complete first
      setTimeout(() => setIsMenuOpen(false), 0)
    }
  }

  const handleOpen = useCallback(() => {
    dispatch({ type: 'OPEN_MENU' });
    setTimeout(() => {
      dispatch({ type: 'SHOW_CONTROLS' });
    }, MENU_ANIMATION_DURATION);
  }, []);

  const handleClose = useCallback(() => {
    dispatch({ type: 'HIDE_CONTROLS' });
    setTimeout(() => {
      dispatch({ type: 'CLOSE_MENU' });
      setTimeout(() => {
        dispatch({ type: 'RESET' });  // Dodajemy reset stanu
        setIsMenuOpen(false);
      }, MENU_ANIMATION_DURATION);
    }, CONTROLS_ANIMATION_DURATION);
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      handleOpen();
    } else {
      handleClose();
      // Opóźniamy zmianę stanu isMenuOpen do zakończenia animacji
      setTimeout(() => {
        setIsMenuOpen(false);
      }, MENU_ANIMATION_DURATION + CONTROLS_ANIMATION_DURATION);
    }
  };

  const getMenuClassName = () => {
    const base = `
      fixed top-0 right-0 h-full 
      bg-bgcolor-alt/95 backdrop-blur-xl 
      max-w-[430px] w-full
      z-60
      transition-all duration-300
    `;
    // Dodajemy stan CLOSING do warunku translate-x-full
    const position = (menuState === 'CLOSED' || menuState === 'CLOSING') 
      ? 'translate-x-full' 
      : 'translate-x-0';
    return `${base} ${position}`;
  };

  const getControlsClassName = () => {
    const base = "fixed top-4 right-4 flex items-center space-x-4 transition-all duration-200";
    switch (menuState) {
      case 'FULLY_OPENED':
        return `${base} opacity-100`;
      case 'HIDING_CONTROLS':
      case 'CLOSING':
      case 'CLOSED':
        return `${base} opacity-0`;
      default:
        return `${base} opacity-0`;
    }
  };
  
  return (
    <nav className="xl:hidden">
      <div 
        ref={menuRef}
        className={getMenuClassName()}
      >
        <div className={getControlsClassName()}>
          <LanguageSwitcher currentLang={lang} />
          <ThemeSwitcher 
            themeTranslations={translations.themes} 
            colorTranslations={translations.colors} 
          />
          <NavButton
            ref={toggleRef}
            onClick={handleClose}
            context="mobile"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
        </div>

        {/* Główna zawartość menu */}
        <div 
          className="flex-grow flex flex-col items-center p-4 pt-24 overflow-y-auto"
          onClick={handleNavClick}
        >
          <Logo lang={lang} variant="mobile" />
          
          <div className="w-full max-w-sm mt-8 mb-8">
            <ExpandableSearchButton 
              searchTranslations={translations.search}
              lang={lang}
              mode="standard"
            />
          </div>

          <ul className="flex flex-col space-y-4 sm:landscape:flex-row sm:landscape:space-y-0 sm:landscape:space-x-4 items-center">
            <NavLinks 
              lang={lang} 
              translations={translations.navigation} 
              linkStyles={linkStylesValues[currentTheme]}
            />
          </ul>
        </div>
      </div>

      {/* Przycisk hamburger poza menu */}
      {!isMenuOpen && (
        <NavButton
          ref={toggleRef}
          context="mobile"
          isHamburger={true}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          className="fixed top-4 right-4 z-[70]"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </NavButton>
      )}
    </nav>
  );
}