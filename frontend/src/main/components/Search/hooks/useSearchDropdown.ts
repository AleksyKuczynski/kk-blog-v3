// src/main/components/Search/hooks/useSearchDropdown.ts
import { useState, useCallback } from 'react';
import { ANIMATION_DURATION } from '../../Interface/constants';

export function useSearchDropdown(isExpanded: boolean): {
  showDropdown: boolean;
  focusedIndex: number;
  isDropdownVisible: boolean;
  setShowDropdown: (show: boolean) => void;
  setFocusedIndex: (index: number) => void;
} {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleDropdownVisibility = useCallback((show: boolean) => {
    if (show && isExpanded) {
      setShowDropdown(true);
      // Delay visibility for animation
      requestAnimationFrame(() => {
        setIsDropdownVisible(true);
      });
    } else {
      setIsDropdownVisible(false);
      // Remove from DOM after animation
      setTimeout(() => {
        setShowDropdown(false);
      }, ANIMATION_DURATION);
    }
  }, [isExpanded]);

  return {
    showDropdown,
    focusedIndex,
    isDropdownVisible,
    setShowDropdown: handleDropdownVisibility,
    setFocusedIndex
  };
}