// src/main/components/Article/Carousel/useCarousel.ts
import { useReducer, useCallback } from 'react';
import { CarouselItem } from "@/main/lib/markdown/types";
import { carouselReducer, initialCarouselState } from '../carouselReducer';
import { CarouselDimensions, ImageSetAnalysis } from '../carouselTypes';
import { getVisibleIndexes } from '../utils/getVisibleIndexes';

interface UseCarouselProps {
  images: CarouselItem[];
  initialAnalysis: ImageSetAnalysis;
  dimensions: CarouselDimensions;
}

export function useCarousel({ 
  images, 
  initialAnalysis,
  dimensions
}: UseCarouselProps) {
  const [state, dispatch] = useReducer(carouselReducer, {
    ...initialCarouselState,
    currentIndex: 0,
    images: images.map(img => ({
      ...img, 
      expandedCaption: false
    })),
    dimensions
  });

  const handlers = {
    handlePrevious: useCallback(() => {
      dispatch({ 
        type: 'PREV_SLIDE', 
        payload: { totalSlides: images.length }
      });
    }, [images.length]),

    handleNext: useCallback(() => {
      dispatch({ 
        type: 'NEXT_SLIDE', 
        payload: { totalSlides: images.length }
      });
    }, [images.length]),

    handleKeyDown: useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        dispatch({ 
          type: 'PREV_SLIDE', 
          payload: { totalSlides: images.length }
        });
      } else if (e.key === 'ArrowRight') {
        dispatch({ 
          type: 'NEXT_SLIDE', 
          payload: { totalSlides: images.length }
        });
      }
    }, [images.length]),

    handleSlideSelect: useCallback((index: number) => {
      dispatch({ 
        type: 'SET_SLIDE', 
        payload: { index } 
      });
    }, []),

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
      dispatch({ 
        type: 'TOGGLE_CAPTION', 
        payload: { index } 
      });
    }, []),
  };

  return {
    currentIndex: state.currentIndex,
    activeIndexes: getVisibleIndexes(state.currentIndex, images.length),
    images: state.images,
    handlers
  };
}
