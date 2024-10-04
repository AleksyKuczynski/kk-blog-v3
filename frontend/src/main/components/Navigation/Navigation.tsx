// src/main/components/Navigation/Navigation.tsx
'use client'

import { ColorMode } from '../ThemeSwitcher/themeTypes'
import DesktopNavigation from './DesktopNav'
import MobileNavigation from './MobileNav'
import { ColorsTranslations, Lang, NavigationTranslations, SearchTranslations, ThemesTranslations } from '@/main/lib/dictionaries/types'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  lang: Lang
  translations: {
    navigation: NavigationTranslations
    search: SearchTranslations
    themes: ThemesTranslations
    colors: ColorsTranslations
  }
  initialColorMode: ColorMode
}

export default function Navigation({ lang, translations, initialColorMode }: NavigationProps) {
  const pathname = usePathname()
  const isSearchPage = pathname === `/${lang}/search`

  return (
    <nav className="w-full" aria-label="Main Navigation">
      <div className="hidden xl:block">
        <DesktopNavigation
          lang={lang}
          translations={translations}
          isSearchPage={isSearchPage}
          initialColorMode={initialColorMode}
        />
      </div>
      <div className="xl:hidden">
        <MobileNavigation
          lang={lang}
          translations={translations}
          isSearchPage={isSearchPage}
        />
      </div>
    </nav>
  )
}