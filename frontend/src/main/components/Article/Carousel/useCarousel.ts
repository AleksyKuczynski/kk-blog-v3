// src/main/components/Article/Carousel/useCarousel.ts
import { useReducer, useCallback } from 'react';
import { carouselReducer, initialCarouselState } from './carouselReducer';
import { handleCarouselScenario } from './carouselScenarios';
import { CarouselDimensions } from '@/main/lib/utils/calculateCarouselDimensions';
import { CarouselItem } from '@/main/lib/markdown/types';

interface UseCarouselProps {
  images: CarouselItem[];
  dimensions: CarouselDimensions;
  autoAdvance?: boolean;
}

export function useCarousel({ 
  images, 
  dimensions,
  autoAdvance = false 
}: UseCarouselProps) {
  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);

  const canGoNext = state.currentIndex < images.length - 1;
  const canGoPrev = state.currentIndex > 0;

  const handleCaptionToggle = useCallback((index: number) => {
    handleCarouselScenario({
      type: 'SCENARIO_TOGGLE_CAPTION',
      dispatch,
      index
    });
  }, [dispatch]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dispatch({ 
      type: 'START_TOUCH', 
      payload: e.touches[0].clientX 
    });
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    handleCarouselScenario({
      type: 'SCENARIO_HANDLE_SWIPE',
      endX: e.changedTouches[0].clientX,
      dispatch,
      totalSlides: images.length,
      currentIndex: state.currentIndex,
      lastTouchX: state.input.lastTouchX
    });
  }, [images.length, state.currentIndex, state.input.lastTouchX]);

  // Navigation handlers  
  const handleSlideChange = useCallback((direction: 'next' | 'prev' | number) => {
    if (images.length <= 1) return;

    // Specjalna logika dla dwóch slajdów
    if (images.length === 2) {
      const nextIndex = state.currentIndex === 0 ? 1 : 0;
      
      handleCarouselScenario({
        type: 'SCENARIO_CHANGE_SLIDE',
        direction: nextIndex > state.currentIndex ? 'next' : 'prev',
        dispatch,
        targetIndex: nextIndex
      });
      return;
    }

    // Standardowa logika dla więcej niż 2 slajdów
    if (direction === 'next' && !canGoNext) return;
    if (direction === 'prev' && !canGoPrev) return;
    if (typeof direction === 'number' && (direction < 0 || direction >= images.length)) return;

    handleCarouselScenario({
      type: 'SCENARIO_CHANGE_SLIDE',
      direction,
      dispatch
    });
  }, [canGoNext, canGoPrev, images.length, state.currentIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!state.input.isEnabled) return;

    switch(e.key) {
      case 'ArrowLeft':
        if (canGoPrev) {
          handleSlideChange('prev');
        }
        break;
      case 'ArrowRight':
        if (canGoNext) {
          handleSlideChange('next');
        }
        break;
      case 'Enter':
      case ' ':
        if (images[state.currentIndex]?.processedCaption) {
          handleCaptionToggle(state.currentIndex);
        }
        break;
    }
  }, [
    state.input.isEnabled, 
    canGoPrev, 
    canGoNext, 
    handleSlideChange, 
    handleCaptionToggle, 
    images, 
    state.currentIndex
  ]);

  return {
    state,
    handlers: {
      handleTouchStart,
      handleTouchEnd,
      handleSlideChange,
      handleCaptionToggle,
      handleKeyDown
    },
    utils: {
      canGoNext,
      canGoPrev
    }
  };
}