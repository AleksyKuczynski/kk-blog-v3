// src/main/components/Navigation/Navigation.tsx
'use client'

import DesktopNavigation from './DesktopNav'
import MobileNavigation from './MobileNav'
import { Lang, NavigationTranslations, SearchTranslations } from '@/main/lib/dictionaries/types'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  lang: Lang
  translations: NavigationTranslations
  searchTranslations: SearchTranslations
}

export default function Navigation({ lang, translations, searchTranslations }: NavigationProps) {
  const pathname = usePathname()
  const isSearchPage = pathname === `/${lang}/search`

  return (
    <nav className="w-full" aria-label="Main Navigation">
      <div className="hidden xl:block">
        <DesktopNavigation
          lang={lang}
          translations={translations}
          searchTranslations={searchTranslations}
          isSearchPage={isSearchPage}
        />
      </div>
      <div className="xl:hidden">
        <MobileNavigation
          lang={lang}
          translations={translations}
          searchTranslations={searchTranslations}
          isSearchPage={isSearchPage}
        />
      </div>
    </nav>
  )
}