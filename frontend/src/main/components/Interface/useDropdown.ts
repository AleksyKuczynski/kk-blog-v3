// src/main/components/Interface/useDropdown.ts
import { useCallback, useRef, useState } from 'react'
import { useOutsideClick } from '@/main/lib/hooks'

interface UseDropdownProps {
  closeOnSelect?: boolean
  forceOpen?: boolean
  onOutsideClick?: () => void
}

interface UseDropdownReturn {
  isOpen: boolean
  toggle: () => void
  close: () => void
  dropdownRef: React.RefObject<HTMLDivElement>
  toggleRef: React.RefObject<HTMLButtonElement>
  selectItem: () => void
}

export function useDropdown({
  closeOnSelect = true,
  forceOpen,
  onOutsideClick
}: UseDropdownProps = {}): UseDropdownReturn {
  const [internalOpen, setInternalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  
  const isOpen = forceOpen !== undefined ? forceOpen : internalOpen

  const toggle = useCallback(() => {
    if (forceOpen === undefined) {
      setInternalOpen(prev => !prev)
    }
  }, [forceOpen])

  const close = useCallback(() => {
    if (forceOpen === undefined) {
      setInternalOpen(false)
    }
    onOutsideClick?.()
  }, [forceOpen, onOutsideClick])

  useOutsideClick(dropdownRef, toggleRef, isOpen, close)

  const selectItem = useCallback(() => {
    closeOnSelect && close()
  }, [close, closeOnSelect])

  return {
    isOpen,
    toggle,
    close,
    dropdownRef,
    toggleRef,
    selectItem
  }
}