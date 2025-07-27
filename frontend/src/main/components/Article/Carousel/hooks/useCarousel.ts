// src/main/components/Article/Carousel/hooks/useCarousel.ts
import { useReducer, useCallback, useEffect } from 'react';
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";
import { CarouselDimensions } from '../carouselTypes';
import { carouselReducer } from '../carouselReducer';

interface UseCarouselProps {
  images: CarouselItem[];
  dimensions: CarouselDimensions;
}

const initialState = {
  currentIndex: 0,
  direction: null,
  touchStart: undefined,
  // 🔄 ADD: Animation state initialization
  isTransitioning: false,
  previousIndex: 0
};

export function useCarousel({ 
  images, 
  dimensions 
}: UseCarouselProps) {
  const [state, dispatch] = useReducer(carouselReducer, {
    ...initialState,
    images
  });

  // 🔄 ADD: Auto-end transitions after animation duration
  useEffect(() => {
    if (state.isTransitioning) {
      const timer = setTimeout(() => {
        dispatch({ type: 'TRANSITION_END' });
      }, 300); // Match CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [state.isTransitioning]);

  const handlers = {
    handleNext: useCallback(() => {
      if (!state.isTransitioning) { // Prevent rapid clicks during animation
        dispatch({ type: 'NEXT_SLIDE' });
      }
    }, [state.isTransitioning]),

    handlePrevious: useCallback(() => {
      if (!state.isTransitioning) { // Prevent rapid clicks during animation
        dispatch({ type: 'PREV_SLIDE' });
      }
    }, [state.isTransitioning]),

    handleKeyDown: useCallback((e: React.KeyboardEvent) => {
      if (state.isTransitioning) return; // Ignore during transitions
      
      if (e.key === 'ArrowLeft') {
        dispatch({ type: 'PREV_SLIDE' });
      } else if (e.key === 'ArrowRight') {
        dispatch({ type: 'NEXT_SLIDE' });
      }
    }, [state.isTransitioning]),

    handleTouchStart: useCallback((e: React.TouchEvent) => {
      if (!state.isTransitioning) { // Only start touch if not transitioning
        dispatch({ 
          type: 'TOUCH_START', 
          x: e.touches[0].clientX 
        });
      }
    }, [state.isTransitioning]),

    handleTouchEnd: useCallback((e: React.TouchEvent) => {
      if (!state.isTransitioning && state.touchStart !== undefined) {
        dispatch({ 
          type: 'TOUCH_END', 
          endX: e.changedTouches[0].clientX 
        });
      }
    }, [state.isTransitioning, state.touchStart]),

    handleCaptionClick: useCallback((index: number) => {
      dispatch({ type: 'TOGGLE_CAPTION', index });
    }, []),

    handleSlideSelect: useCallback((index: number) => {
      if (!state.isTransitioning && index !== state.currentIndex) {
        dispatch({ type: 'SET_SLIDE', index });
      }
    }, [state.isTransitioning, state.currentIndex]),

    // 🔄 ADD: Manual transition control
    handleTransitionEnd: useCallback(() => {
      dispatch({ type: 'TRANSITION_END' });
    }, [])
  };

  return {
    currentIndex: state.currentIndex,
    previousIndex: state.previousIndex,
    direction: state.direction,
    isTransitioning: state.isTransitioning,
    images: state.images,
    handlers
  };
}