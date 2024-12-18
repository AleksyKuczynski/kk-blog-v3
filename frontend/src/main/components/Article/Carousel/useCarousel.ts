// src/main/components/Article/Carousel/useCarousel.ts
import { useReducer, useEffect, useCallback } from 'react';
import { carouselReducer, initialCarouselState } from './carouselReducer';
import { handleCarouselScenario } from './carouselScenarios';
import { CarouselDimensions } from '@/main/lib/utils/calculateCarouselDimensions';
import { CarouselItem } from '@/main/lib/markdown/types';

const AUTO_ADVANCE_INTERVAL = 5000; // ms

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

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!state.input.isEnabled) return;

      switch(e.key) {
        case 'ArrowLeft':
          handleCarouselScenario({
            type: 'SCENARIO_CHANGE_SLIDE',
            direction: 'prev',
            dispatch
          });
          break;
        case 'ArrowRight':
          handleCarouselScenario({
            type: 'SCENARIO_CHANGE_SLIDE',
            direction: 'next',
            dispatch
          });
          break;
        case 'Enter':
        case ' ':
          if (images[state.currentIndex].processedCaption) {
            handleCarouselScenario({
              type: 'SCENARIO_TOGGLE_CAPTION',
              dispatch
            });
          }
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.input.isEnabled, state.currentIndex, images]);

  // Auto-advance
  useEffect(() => {
    if (!autoAdvance || state.caption.isExpanded) return;

    const timer = setInterval(() => {
      if (state.currentIndex < images.length - 1) {
        handleCarouselScenario({
          type: 'SCENARIO_CHANGE_SLIDE',
          direction: 'next',
          dispatch
        });
      }
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(timer);
  }, [autoAdvance, state.currentIndex, state.caption.isExpanded, images.length]);

  // Preload next image
  useEffect(() => {
    const nextIndex = (state.currentIndex + 1) % images.length;
    const image = new Image();
    image.src = images[nextIndex].imageAttributes.src;
  }, [state.currentIndex, images]);

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

  return {
    state,
    handlers: {
      handleTouchStart,
      handleTouchEnd,
      handleSlideChange: (direction: 'next' | 'prev' | number) => {
        handleCarouselScenario({
          type: 'SCENARIO_CHANGE_SLIDE',
          direction,
          dispatch
        });
      },
      handleCaptionToggle: () => {
        handleCarouselScenario({
          type: 'SCENARIO_TOGGLE_CAPTION',
          dispatch
        });
      }
    }
  };
}