// src/main/components/Article/Carousel/useCarousel.ts
import { useReducer, useCallback } from 'react';
import { CarouselItem, ImageSetAnalysis } from "@/main/lib/markdown/types";
import { carouselReducer, initialCarouselState } from './carouselReducer';

interface UseCarouselProps {
  images: CarouselItem[];
  initialAnalysis?: ImageSetAnalysis;
}

export function useCarousel({ 
  images, 
  initialAnalysis
}: UseCarouselProps) {
  const [state, dispatch] = useReducer(carouselReducer, {
    ...initialCarouselState,
    images: images.map(img => ({...img, expanded: false}))
  });

  const getVisibleIndexes = useCallback((): number[] => {
    const totalSlides = images.length;
    if (totalSlides === 0) return [];
    
    const safeCurrentIndex = state.currentIndex % totalSlides;
    
    // Logic for 2 slides
    if (totalSlides === 2) {
      const baseIndex = safeCurrentIndex % 2;
      return [
        (baseIndex + 1) % 2,
        baseIndex,
        (baseIndex + 1) % 2
      ];
    }

    // Logic for 3+ slides
    return [
      (safeCurrentIndex - 1 + totalSlides) % totalSlides,
      safeCurrentIndex,
      (safeCurrentIndex + 1) % totalSlides
    ];
  }, [images.length, state.currentIndex]);

  // Podstawowe handlery
  const handlers = {
    handlePrevious: useCallback(() => {
      dispatch({ type: 'PREV_SLIDE', payload: { totalSlides: images.length } });
    }, [images.length]),

    handleNext: useCallback(() => {
      dispatch({ type: 'NEXT_SLIDE', payload: { totalSlides: images.length } });
    }, [images.length]),

    handleSlideSelect: useCallback((index: number) => {
      dispatch({ type: 'SET_SLIDE', payload: { index } });
    }, []),

    handleKeyDown: useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        dispatch({ type: 'PREV_SLIDE', payload: { totalSlides: images.length } });
      } else if (e.key === 'ArrowRight') {
        dispatch({ type: 'NEXT_SLIDE', payload: { totalSlides: images.length } });
      }
    }, [images.length]),

    handleTouchStart: useCallback((e: React.TouchEvent) => {
      dispatch({ 
        type: 'TOUCH_START', 
        payload: { x: e.touches[0].clientX } 
      });
    }, []),

    handleTouchEnd: useCallback((e: React.TouchEvent) => {
      dispatch({ 
        type: 'TOUCH_END', 
        payload: { 
          endX: e.changedTouches[0].clientX,
          totalSlides: images.length 
        } 
      });
    }, [images.length]),

    handleCaptionClick: useCallback((index: number) => {
      dispatch({ type: 'TOGGLE_CAPTION', payload: { index } });
    }, []),
  };

  return {
    currentIndex: state.currentIndex,
    activeIndexes: getVisibleIndexes(),
    images,
    handlers
  };
}