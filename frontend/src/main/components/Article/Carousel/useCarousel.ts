// src/main/components/Article/Carousel/useCarousel.ts
import { useReducer, useCallback, RefObject } from 'react';
import { CarouselItem } from "@/main/lib/markdown/types";
import { calculateCaptionDimensions, calculateCarouselDimensions } from '@/main/lib/utils/calculateCarouselDimensions';
import { carouselReducer, initialCarouselState } from './carouselReducer';

interface UseCarouselProps {
  images: CarouselItem[];
  containerRef: RefObject<HTMLDivElement>;
}

const DEFAULT_DIMENSIONS = {
  width: 1200,
  height: 800,
  imageHeight: 600,
  captionHeight: 100,
  maxCaptionHeight: 200,
  imageDisplayMode: 'center-vertical' as const
};

export function useCarousel({ images, containerRef }: UseCarouselProps) {
  const [state, dispatch] = useReducer(carouselReducer, {
    ...initialCarouselState,
    dimensions: DEFAULT_DIMENSIONS
  });

  const getVisibleIndexes = useCallback((): number[] => {
    const totalSlides = images.length;
    if (totalSlides === 0) return [];
    
    // Bezpieczny currentIndex
    const safeCurrentIndex = state.currentIndex % totalSlides;
    
    // Dla 2 slajdów
    if (totalSlides === 2) {
      const baseIndex = safeCurrentIndex % 2;
      return [
        (baseIndex + 1) % 2,
        baseIndex,
        (baseIndex + 1) % 2
      ];
    }

    // Dla 3+ slajdów
    return [
      (safeCurrentIndex - 1 + totalSlides) % totalSlides,
      safeCurrentIndex,
      (safeCurrentIndex + 1) % totalSlides
    ];
  }, [images.length, state.currentIndex]);

  const activeIndexes = getVisibleIndexes();
  const activeItems = activeIndexes.map(idx => images[idx]);
  
  const calculateDimensions = useCallback(() => {
    if (typeof window === 'undefined' || !containerRef.current) {
      return DEFAULT_DIMENSIONS;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const calculated = calculateCarouselDimensions(
      images,
      images.map(img => ({
        lines: img.processedCaption?.split('\n').length || 0,
        isExpandable: (img.processedCaption?.split('\n').length || 0) > 4
      })),
      containerWidth,
      window.innerHeight
    );

    // Dodajemy obliczenia podpisów
    const captionDimensions = calculateCaptionDimensions(
      activeItems,
      containerWidth,
      window.innerHeight
    );

    return {
      ...calculated,
      ...captionDimensions
    };
  }, [images, activeItems, containerRef]);

  const handlePrevious = useCallback(() => {
    dispatch({ type: 'PREV_SLIDE', payload: { totalSlides: images.length } });
  }, [images.length]);

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT_SLIDE', payload: { totalSlides: images.length } });
  }, [images.length]);

  const handleSlideSelect = useCallback((index: number) => {
    dispatch({ type: 'SET_SLIDE', payload: { index } });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
    }
  }, [handlePrevious, handleNext]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dispatch({ 
      type: 'TOUCH_START', 
      payload: { x: e.touches[0].clientX } 
    });
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    dispatch({ 
      type: 'TOUCH_END', 
      payload: { 
        endX: touchEndX,
        totalSlides: images.length 
      } 
    });
  }, [images.length]);

  return {
    currentIndex: state.currentIndex,
    activeIndexes,
    dimensions: state.dimensions || calculateDimensions(),
    handlers: {
      handlePrevious,
      handleNext,
      handleSlideSelect,
      handleKeyDown,
      handleTouchStart,
      handleTouchEnd
    }
  };
}