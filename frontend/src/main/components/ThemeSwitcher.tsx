'use client'

import { setTheme, Theme } from '../lib/actions'
import { useRouter } from 'next/navigation'
import { useTheme } from './ThemeContext'

export function ThemeSwitcher() {
  const { currentTheme, setCurrentTheme } = useTheme()
  const router = useRouter()

  const handleThemeChange = async (newTheme: Theme) => {
    await setTheme(newTheme)
    setCurrentTheme(newTheme)
    document.body.setAttribute('data-theme', newTheme)
    router.refresh()
  }

  return (
    <div className="flex items-center space-x-2">
      {['default', 'rounded', 'sharp'].map((theme) => (
        <button
          key={theme}
          className={`px-3 py-1 rounded ${currentTheme === theme ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => handleThemeChange(theme as Theme)}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  )
}