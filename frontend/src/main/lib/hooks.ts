// src/main/lib/hooks.ts
import React, { useCallback, useState, useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent | KeyboardEvent) => void;

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  isOpen: boolean,
  onClose: () => void
): void {
  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node) && isOpen) {
      onClose();
    }
  }, [ref, isOpen, onClose]);

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

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Use ResizeObserver if available, fallback to window resize event
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(document.body);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      window.addEventListener('resize', handleResize);
      handleResize(); // Call once to set initial size

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}