// src/main/components/ThemeContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react'
import { Theme } from '../lib/actions'

interface ThemeContextType {
  currentTheme: Theme
  setCurrentTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children, initialTheme }: { children: React.ReactNode, initialTheme: Theme }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme)

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}