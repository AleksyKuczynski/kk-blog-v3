// src/main/components/Navigation/MobileNavOverlay.tsx
'use client'

import { useCallback } from 'react'

interface MobileNavOverlayProps {
  onClose: () => void;
}

export function MobileNavOverlay({ onClose }: MobileNavOverlayProps) {
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Zatrzymaj propagację tylko dla overlay'a, nie dla jego dzieci
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 bg-black/10 z-50"
      aria-hidden="true"
    />
  )
}