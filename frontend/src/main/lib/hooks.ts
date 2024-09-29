// src/main/lib/hooks.ts
import React, { useCallback, useEffect, RefObject } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  toggleRef: RefObject<HTMLElement>,
  isOpen: boolean,
  onClose: () => void
): void {
  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target as Node) &&
      isOpen
    ) {
      onClose();
    }
  }, [ref, toggleRef, isOpen, onClose]);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, handleClickOutside, handleEscapeKey]);
}

export function useFocusInput(inputRef: RefObject<HTMLInputElement>, shouldFocus: boolean, delay: number = 0): void {
  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [shouldFocus, delay, inputRef]);
}