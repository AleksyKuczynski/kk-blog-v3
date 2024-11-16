// src/main/components/Search/hooks/useSearchDropdown.ts
import { useState, useRef, useCallback, RefObject } from 'react';
import { Direction } from '../types';
import { SearchStatus } from '../types';

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
  direction: Direction;
}

const MIN_MESSAGE_HEIGHT = 40; // Height for single message
const SUGGESTION_ITEM_HEIGHT = 60; // Height per suggestion
const PADDING = 16;
const SAFETY_MARGIN = 8;

export function useSearchDropdown(
  containerRef: RefObject<HTMLDivElement>,
  suggestionCount: number,
  searchStatus: SearchStatus
): SearchDropdownReturn {
  const [direction, setDirection] = useState<Direction>('bottom');
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const calculateContentHeight = useCallback(() => {
    // Calculate height based on content type
    if (searchStatus.type === 'success') {
      return Math.max(
        suggestionCount * SUGGESTION_ITEM_HEIGHT + PADDING,
        MIN_MESSAGE_HEIGHT
      );
    }
    return MIN_MESSAGE_HEIGHT;
  }, [searchStatus, suggestionCount]);

  const calculateDimensions = useCallback((): Dimensions | null => {
    // Early return if we're in a non-browser environment
    if (typeof window === 'undefined') return null;
    
    // Check if we have a valid container reference
    if (!containerRef.current) {
      console.debug('Search container ref not yet available');
      return null;
    }

    try {
      // Get the container's bounding rect
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Validate we have all necessary measurements
      if (!rect || !viewportHeight) {
        console.debug('Unable to get container dimensions');
        return null;
      }

      // Calculate available spaces
      const availableBelow = viewportHeight - rect.bottom - PADDING - SAFETY_MARGIN;
      const availableAbove = rect.top - PADDING - SAFETY_MARGIN;
      
      // Get current content height
      const contentHeight = calculateContentHeight();
      
      // First check if current direction has enough space
      if (direction === 'bottom' && availableBelow >= contentHeight) {
        return {
          direction: 'bottom',
          maxHeight: availableBelow,
          contentHeight
        };
      }
      
      if (direction === 'top' && availableAbove >= contentHeight) {
        return {
          direction: 'top',
          maxHeight: availableAbove,
          contentHeight
        };
      }
      
      // If current direction doesn't have enough space, try the other direction
      if (availableBelow >= contentHeight) {
        return {
          direction: 'bottom',
          maxHeight: availableBelow,
          contentHeight
        };
      }
      
      if (availableAbove >= contentHeight) {
        return {
          direction: 'top',
          maxHeight: availableAbove,
          contentHeight
        };
      }
      
      // If neither space is ideal, use the larger space
      if (availableAbove > availableBelow) {
        return {
          direction: 'top',
          maxHeight: Math.max(availableAbove, MIN_MESSAGE_HEIGHT),
          contentHeight
        };
      }
      
      return {
        direction: 'bottom',
        maxHeight: Math.max(availableBelow, MIN_MESSAGE_HEIGHT),
        contentHeight
      };
    } catch (error) {
      console.error('Error calculating dimensions:', error);
      return {
        direction: 'bottom',
        maxHeight: 300,
        contentHeight: MIN_MESSAGE_HEIGHT
      };
    }
  }, [containerRef, direction, calculateContentHeight]);

  const updateDirection = useCallback(() => {
    // Don't update if dropdown isn't shown
    if (!showDropdown) return;
    
    const dimensions = calculateDimensions();
    // Only update if we have valid dimensions
    if (dimensions && containerRef.current) {
      setDirection(dimensions.direction);
      containerRef.current.style.setProperty(
        '--dropdown-max-height', 
        `${dimensions.maxHeight}px`
      );
    }
  }, [showDropdown, calculateDimensions, containerRef]);

  // Update direction when suggestions or status changes
  const lastContentHeight = useRef(MIN_MESSAGE_HEIGHT);
  const currentContentHeight = calculateContentHeight();

  if (currentContentHeight !== lastContentHeight.current) {
    lastContentHeight.current = currentContentHeight;
    // Only call updateDirection if we have a valid container
    if (containerRef.current) {
      updateDirection();
    }
  }

  return {
    direction,
    showDropdown,
    focusedIndex,
    updateDirection: useCallback(() => {
      if (!containerRef.current) return;
      
      requestAnimationFrame(() => {
        updateDirection();
      });
    }, [containerRef, updateDirection]),
    setShowDropdown,
    setFocusedIndex,
  };
}