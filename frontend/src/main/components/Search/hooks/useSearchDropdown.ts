// src/main/components/Search/hooks/useSearchDropdown.ts

import { useState, useRef, useCallback, RefObject } from 'react';
import { Direction } from '../types';

interface SearchDropdownReturn {
  direction: Direction;
  showDropdown: boolean;
  focusedIndex: number;
  updateDirection: () => void;
  setShowDropdown: (show: boolean) => void;
  setFocusedIndex: (index: number) => void;
}

interface Dimensions {
  maxHeight: number;
  contentHeight: number;
  direction: 'top' | 'bottom'
}

export function useSearchDropdown(
  containerRef: RefObject<HTMLDivElement>,
  suggestionCount: number
): SearchDropdownReturn {
  const [direction, setDirection] = useState<Direction>('bottom');
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const calculateDimensions = useCallback((): Dimensions | null => {
    if (typeof window === 'undefined' || !containerRef.current?.parentNode) return null;
    
    try {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (!rect.height || !viewportHeight) {
        return { direction: 'bottom', maxHeight: 300, contentHeight: 0 };
      }
      
      // Fixed constants
      const ITEM_HEIGHT = 60;
      const PADDING = 16;
      const MAX_ITEMS = 5;
      const MIN_HEIGHT = 200;
      
      // Calculate content size
      const contentHeight = Math.min(
        suggestionCount * ITEM_HEIGHT + PADDING,
        MAX_ITEMS * ITEM_HEIGHT + PADDING
      );

      // Calculate available space
      const availableBelow = viewportHeight - rect.bottom - PADDING;
      const availableAbove = rect.top - PADDING;
      
      // Determine optimal direction
      if (availableBelow >= contentHeight || availableBelow >= MIN_HEIGHT) {
        return {
          direction: 'bottom',
          maxHeight: Math.min(contentHeight, availableBelow),
          contentHeight
        };
      }
      
      if (availableAbove > availableBelow && availableAbove >= MIN_HEIGHT) {
        return {
          direction: 'top',
          maxHeight: Math.min(contentHeight, availableAbove),
          contentHeight
        };
      }
      
      // Fallback to bottom with constrained height if neither direction is ideal
      return {
        direction: 'bottom',
        maxHeight: Math.max(MIN_HEIGHT, availableBelow),
        contentHeight
      };
    } catch (error) {
      console.error('Error calculating dimensions:', error);
      return { direction: 'bottom', maxHeight: 300, contentHeight: 0 };
    }
  }, [containerRef, suggestionCount]);

  const updateDirection = useCallback(() => {
    if (!showDropdown) return;
    
    const dimensions = calculateDimensions();
    if (dimensions) {
      setDirection(dimensions.direction);
    }
  }, [showDropdown, calculateDimensions]);

  return {
    direction,
    showDropdown,
    focusedIndex,
    updateDirection: useCallback(() => {
      requestAnimationFrame(() => {
        if (containerRef.current?.parentNode) {
          updateDirection();
        }
      });
    }, [containerRef, updateDirection]),
    setShowDropdown,
    setFocusedIndex,
  };
}