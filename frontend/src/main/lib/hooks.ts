// src/main/lib/hooks.ts
import { useCallback, useEffect, RefObject, useState, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  toggleRef: RefObject<HTMLElement> | null,
  isOpen: boolean,
  onClose: () => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (!toggleRef || !toggleRef.current || !toggleRef.current.contains(event.target as Node)) &&
        isOpen
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

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
  }, [isOpen, onClose, ref, toggleRef]);
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

export function useKeyboardNavigation<T>(
  items: T[],
  onSelect: (item: T) => void,
  onSubmit: () => void
) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < items.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          onSelect(items[focusedIndex]);
        } else {
          onSubmit();
        }
        break;
      // ... other cases
    }
  };

  return { focusedIndex, handleKeyDown };
}

export function useDebounce(func: Function, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => func(...args), delay);
  }, [func, delay]);
}

export function useDropdown(closeOnSelect: boolean = true) {
  // Debug mounted state
  const isMounted = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Track mounted state
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const toggle = () => {
    // Only update if component is mounted
    if (isMounted.current) {
      console.log('Pre-toggle state:', isOpen);
      // Use functional update to ensure we have latest state
      setIsOpen(prevState => {
        console.log('Toggling from', prevState, 'to', !prevState);
        return !prevState;
      });
    }
  };

  const close = () => {
    if (isMounted.current) {
      setIsOpen(false);
    }
  };

  // Use same pattern for outside click
  useOutsideClick(dropdownRef, toggleRef, isOpen, () => {
    if (isMounted.current) {
      setIsOpen(false);
    }
  });

  // Debug state changes
  useEffect(() => {
    console.log('Dropdown state changed to:', isOpen);
  }, [isOpen]);

  return {
    isOpen,
    toggle,
    close,
    selectItem: () => closeOnSelect && close(),
    dropdownRef,
    toggleRef,
  };
}