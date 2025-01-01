// src/main/components/Article/Carousel/useCarousel.ts
import { useReducer, useCallback } from 'react';
import { CarouselItem } from "@/main/lib/markdown/types";
import { CarouselDimensions } from '../carouselTypes';
import { carouselReducer } from '../carouselReducer';

interface UseCarouselProps {
  images: CarouselItem[];
  dimensions: CarouselDimensions;
}

const initialState = {
  currentIndex: 0,
  direction: null,
  touchStart: undefined
};

export function useCarousel({ 
  images, 
  dimensions 
}: UseCarouselProps) {
  const [state, dispatch] = useReducer(carouselReducer, {
    ...initialState,
    images
  });

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
    }, [])
  };

  return {
    currentIndex: state.currentIndex,
    images: state.images,
    handlers
  };
}