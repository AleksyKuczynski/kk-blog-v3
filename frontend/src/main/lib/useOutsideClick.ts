// src/main/hooks/useOutsideClick.ts
import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return ref;
}