// src/main/components/Navigation/MobileLanguageSwitcher.tsx
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { switchLanguage } from '@/main/lib/actions'
import { Lang } from '../../lib/dictionaries/types'

export function MobileLanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleLanguageChange = async (newLang: Lang) => {
    if (newLang !== currentLang) {
      const currentParams = new URLSearchParams(searchParams)
      const context = currentParams.get('context')
      const author = currentParams.get('author')

      let newPath = pathname.replace(`/${currentLang}`, `/${newLang}`)
      
      if (context) {
        newPath += `?context=${context}`
        if (author) {
          newPath += `&author=${author}`
        }
      }

      await switchLanguage(newLang, newPath)
      router.refresh()
    }
  }

  return (
    <div className="flex space-x-2">
      {['ru', 'en', 'fr', 'pl'].map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang as Lang)}
          className={`px-2 py-1 theme-sensitive ${
            currentLang === lang
              ? 'bg-accent text-primary font-bold'
              : 'bg-primary-dark text-text-inverted hover:bg-accent hover:text-primary'
          } transition-colors duration-200`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}