// src/main/components/Navigation/Navigation.tsx
'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Lang, NavigationTranslations, SearchTranslations } from '@/main/lib/dictionaries/types'
import { useWindowSize } from '@/main/lib/hooks'

const DesktopNavigation = dynamic(() => import('./DesktopNav'))
const MobileNavigation = dynamic(() => import('./MobileNav'))

interface NavigationProps {
  lang: Lang
  translations: NavigationTranslations
  searchTranslations: SearchTranslations
}

export default function Navigation({ lang, translations, searchTranslations }: NavigationProps) {
  const pathname = usePathname()
  const isSearchPage = pathname === `/${lang}/search`
  const { width } = useWindowSize()

  const isMobile = width ? width < 1280 : false // 1280px is the 'xl' breakpoint in Tailwind

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" aria-label="Main Navigation">
      {isMobile ? (
        <MobileNavigation
          lang={lang}
          translations={translations}
          searchTranslations={searchTranslations}
          isSearchPage={isSearchPage}
        />
      ) : (
        <DesktopNavigation
          lang={lang}
          translations={translations}
          searchTranslations={searchTranslations}
          isSearchPage={isSearchPage}
        />
      )}
    </nav>
  )
}