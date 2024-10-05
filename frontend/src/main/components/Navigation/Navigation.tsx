// src/main/components/Navigation/Navigation.tsx
'use client'

import { usePathname } from 'next/navigation'
import DesktopNavigation from './DesktopNav'
import MobileNavigation from './MobileNav'
import { ColorsTranslations, Lang, NavigationTranslations, SearchTranslations, ThemesTranslations } from "@/main/lib/dictionaries/types";

interface NavigationProps {
    lang: Lang
    translations: {
      navigation: NavigationTranslations
      search: SearchTranslations
      themes: ThemesTranslations
      colors: ColorsTranslations
    }
  }
export interface NavProps extends NavigationProps {
    isSearchPage: boolean;
  }

export default function Navigation({ lang, translations }: NavigationProps) {
  const pathname = usePathname()
  const isSearchPage = pathname === `/${lang}/search`

  return (
    <nav className="w-full" aria-label="Main Navigation">
      <div className="hidden xl:block">
        <DesktopNavigation
          lang={lang}
          translations={translations}
          isSearchPage={isSearchPage}
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