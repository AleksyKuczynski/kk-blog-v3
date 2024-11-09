// src/main/components/Interface/Dropdown/useDropdown.ts
'use client';

import { useCallback, useState, useRef } from 'react';
import type { DropdownItemType, DropdownContextType } from './types';

interface UseDropdownProps {
  items: DropdownItemType[];
  onSelect: (item: DropdownItemType) => void;
}

export function useDropdown({ items, onSelect }: UseDropdownProps): DropdownContextType {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
    setSelectedIndex(-1);
  }, []);

  const focusTrigger = useCallback(() => {
    triggerRef.current?.focus();
  }, []);

  const focusItem = useCallback((index: number) => {
    itemRefs.current[index]?.focus();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggle();
  }, [toggle]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        close();
        focusTrigger();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setSelectedIndex(0);
          focusItem(0);
        } else if (selectedIndex < items.length - 1) {
          setSelectedIndex(prev => prev + 1);
          focusItem(selectedIndex + 1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (selectedIndex > 0) {
          setSelectedIndex(prev => prev - 1);
          focusItem(selectedIndex - 1);
        } else {
          setSelectedIndex(-1);
          focusTrigger();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onSelect(items[selectedIndex]);
          close();
          focusTrigger();
        }
        break;
    }
  }, [items, selectedIndex, isOpen, onSelect, close, focusItem, focusTrigger]);

  return {
    isOpen,
    selectedIndex,
    setSelectedIndex,
    toggle,
    close,
    triggerRef,
    dropdownRef,
    itemRefs,
    items,
    onSelect,
    handleKeyDown,
    handleClick,
    focusTrigger,
    focusItem
  };
}