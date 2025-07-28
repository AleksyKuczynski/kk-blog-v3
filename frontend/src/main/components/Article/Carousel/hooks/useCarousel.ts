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

    // FIXED: Updated handler for carousel click - toggles current slide caption expansion
    handleCarouselClick: useCallback((e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Debug logging
      if (process.env.NODE_ENV === 'development') {
        console.log('Carousel click detected:', {
          target: target.tagName,
          className: target.className,
          closestButton: !!target.closest('button'),
          closestCaption: !!target.closest('[data-caption]'),
          isImage: target.tagName.toLowerCase() === 'img',
          captionsVisible: state.captionsVisible,
          currentIndex: state.currentIndex
        });
      }
      
      // Check if click is on carousel background (not on buttons, images, or captions)
      if (target.closest('button') || 
          target.closest('[role="button"]') || 
          target.closest('[data-caption]') ||
          target.tagName.toLowerCase() === 'img') {
        console.log('Click ignored - hit interactive element');
        return;
      }

      // FIXED: If captions are visible, toggle the current slide's caption expansion
      if (state.captionsVisible) {
        console.log('Toggling caption for slide:', state.currentIndex);
        dispatch({ type: 'TOGGLE_CAPTION', index: state.currentIndex });
      } else {
        console.log('Showing captions');
        dispatch({ type: 'TOGGLE_CAPTIONS_VISIBILITY' });
      }
    }, [state.captionsVisible, state.currentIndex])
  };

  return {
    currentIndex: state.currentIndex,
    direction: state.direction,
    isTransitioning: state.isTransitioning,
    captionsVisible: state.captionsVisible,
    images: state.images,
    handlers
  };
}