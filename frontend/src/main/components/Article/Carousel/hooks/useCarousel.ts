// src/main/components/Article/Carousel/hooks/useCarousel.ts
import { useReducer, useCallback, useEffect } from 'react';
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";
import { CarouselDimensions } from '../carouselTypes';
import { carouselReducer, CarouselState } from '../carouselReducer';

interface UseCarouselProps {
  images: CarouselItem[];
  dimensions: CarouselDimensions;
}

const initialState: CarouselState = {
  currentIndex: 0,
  direction: null,
  touchStart: undefined,
  isTransitioning: false,
  captionsVisible: true, // Start with captions visible
  images: []
};

export function useCarousel({ 
  images, 
  dimensions 
}: UseCarouselProps) {
  const [state, dispatch] = useReducer(carouselReducer, {
    ...initialState,
    images
  });

  // Handle transition timing for strip animation
  useEffect(() => {
    if (state.isTransitioning && state.direction) {
      // Start CSS animation immediately, then end transition after animation duration
      const timer = setTimeout(() => {
        dispatch({ type: 'TRANSITION_END' });
      }, 300); // Match CSS transition duration exactly

      return () => clearTimeout(timer);
    }
  }, [state.isTransitioning, state.direction]);

  const handlers = {
    handleNext: useCallback(() => {
      dispatch({ type: 'NEXT_SLIDE' });
    }, []),

    handlePrevious: useCallback(() => {
      dispatch({ type: 'PREV_SLIDE' });
    }, []),

    handleKeyDown: useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        dispatch({ type: 'PREV_SLIDE' });
      } else if (e.key === 'ArrowRight') {
        dispatch({ type: 'NEXT_SLIDE' });
      } else if (e.key === 'c' || e.key === 'C') {
        // 'C' key to toggle captions visibility
        dispatch({ type: 'TOGGLE_CAPTIONS_VISIBILITY' });
      }
    }, []),

    handleTouchStart: useCallback((e: React.TouchEvent) => {
      dispatch({ 
        type: 'TOUCH_START', 
        x: e.touches[0].clientX 
      });
    }, []),

    handleTouchEnd: useCallback((e: React.TouchEvent) => {
      dispatch({ 
        type: 'TOUCH_END', 
        endX: e.changedTouches[0].clientX 
      });
    }, []),

    handleCaptionClick: useCallback((index: number) => {
      dispatch({ type: 'TOGGLE_CAPTION', index });
    }, []),

    handleSlideSelect: useCallback((index: number) => {
      dispatch({ type: 'SET_SLIDE', index });
    }, []),

    // New handler for toggling caption visibility
    handleCarouselClick: useCallback((e: React.MouseEvent) => {
      // Only toggle if clicking on the carousel background, not on navigation or captions
      const target = e.target as HTMLElement;
      
      // Check if click is on carousel background (not on buttons, images, or captions)
      if (target.closest('button') || 
          target.closest('[role="button"]') || 
          target.closest('[data-caption]') ||
          target.tagName.toLowerCase() === 'img') {
        return;
      }

      dispatch({ type: 'TOGGLE_CAPTIONS_VISIBILITY' });
    }, [])
  };

  return {
    currentIndex: state.currentIndex,
    direction: state.direction,
    isTransitioning: state.isTransitioning,
    captionsVisible: state.captionsVisible, // New state
    images: state.images,
    handlers
  };
}