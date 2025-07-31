// src/main/components/Article/Carousel/hooks/useCarousel.ts
import { useReducer, useCallback, useEffect, useState, useRef } from 'react';
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";
import { CarouselDimensions, ImageSetAnalysis } from '../carouselTypes';
import { CaptionMode } from '../../Captions/types';
import { carouselReducer, CarouselState } from '../carouselReducer';
import { adaptCarouselItemsWithBehavior } from '../utils/captionBehaviorAdapter';
import { useViewportChange } from './useViewportChange';

interface UseCarouselProps {
  images: CarouselItem[];
  dimensions: CarouselDimensions;
  initialAnalysis: ImageSetAnalysis;
}

const initialState: CarouselState = {
  currentIndex: 0,
  direction: null,
  touchStart: undefined,
  isTransitioning: false,
  captionsVisible: true,
  images: []
};

export function useCarousel({ 
  images, 
  dimensions: initialDimensions,
  initialAnalysis
}: UseCarouselProps) {
  
  // Dynamic dimensions that can be updated by viewport changes
  const [currentDimensions, setCurrentDimensions] = useState(initialDimensions);
  
  // Convert simplified markdown items to client-side behavior items
  const [state, dispatch] = useReducer(carouselReducer, {
    ...initialState,
    images: adaptCarouselItemsWithBehavior(images)
  });

  // Force caption re-evaluation counter
  const [captionEvaluationTrigger, setCaptionEvaluationTrigger] = useState(0);
  
  // Track if we've done initial dimension calculation
  const hasInitializedDimensions = useRef(false);
  const lastDimensionsSignature = useRef<string>('');

  // Stable dimension update handler with proper change detection
  const handleDimensionsChange = useCallback((newDimensions: CarouselDimensions) => {
    // Create signature to detect actual changes
    const newSignature = `${newDimensions.ratio?.toFixed(2)}-${newDimensions.height}-${newDimensions.maxHeight}`;
    
    // Only update if dimensions actually changed or first time
    if (newSignature !== lastDimensionsSignature.current || !hasInitializedDimensions.current) {
      console.log('Updating carousel dimensions:', newDimensions);
      setCurrentDimensions(newDimensions);
      lastDimensionsSignature.current = newSignature;
      hasInitializedDimensions.current = true;
    }
  }, []);

  // Stable viewport change handler
  const handleViewportChange = useCallback(() => {
    console.log('Viewport changed - triggering caption re-evaluation');
    setCaptionEvaluationTrigger(Date.now()); // Use timestamp to ensure uniqueness
  }, []);

  // Handle viewport changes for responsive behavior
  const { viewportState } = useViewportChange({
    images,
    initialAnalysis,
    onDimensionsChange: handleDimensionsChange,
    onViewportChange: handleViewportChange
  });

  // Auto-hide captions during transitions
  useEffect(() => {
    if (state.isTransitioning) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_TRANSITIONING', isTransitioning: false }); // Fixed action
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.isTransitioning]);

  // Stable event handlers
  const handlers = {
    // Navigation with proper state management
    handlePrevious: useCallback(() => {
      if (state.isTransitioning) return;
      console.log('Previous slide triggered, current index:', state.currentIndex);
      dispatch({ type: 'PREVIOUS_SLIDE' }); // Fixed action name
    }, [state.isTransitioning, state.currentIndex]),

    handleNext: useCallback(() => {
      if (state.isTransitioning) return;
      console.log('Next slide triggered, current index:', state.currentIndex);
      dispatch({ type: 'NEXT_SLIDE' });
    }, [state.isTransitioning, state.currentIndex]),

    // Keyboard navigation
    handleKeyDown: useCallback((e: React.KeyboardEvent) => {
      if (state.isTransitioning) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          console.log('Keyboard: Previous slide');
          dispatch({ type: 'PREVIOUS_SLIDE' }); // Fixed action name
          break;
        case 'ArrowRight':
          e.preventDefault();
          console.log('Keyboard: Next slide');
          dispatch({ type: 'NEXT_SLIDE' });
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          console.log('Keyboard: Toggle captions');
          dispatch({ type: 'TOGGLE_CAPTIONS_VISIBILITY' });
          break;
      }
    }, [state.isTransitioning]),

    // Touch events with better logging
    handleTouchStart: useCallback((e: React.TouchEvent) => {
      if (state.isTransitioning) return;
      const touchX = e.touches[0].clientX;
      console.log('Touch start at:', touchX);
      dispatch({ type: 'TOUCH_START', x: touchX });
    }, [state.isTransitioning]),

    handleTouchEnd: useCallback((e: React.TouchEvent) => {
      if (state.isTransitioning || !state.touchStart) return;
      
      const touchEnd = e.changedTouches[0].clientX;
      const diff = state.touchStart - touchEnd;
      const minSwipeDistance = 50;

      console.log('Touch end:', { touchEnd, diff, minSwipeDistance });

      if (Math.abs(diff) > minSwipeDistance) {
        if (diff > 0) {
          console.log('Touch: Next slide');
          dispatch({ type: 'NEXT_SLIDE' });
        } else {
          console.log('Touch: Previous slide');
          dispatch({ type: 'PREVIOUS_SLIDE' }); // Fixed action name
        }
      }
      
      dispatch({ type: 'TOUCH_END' }); // Simplified action
    }, [state.isTransitioning, state.touchStart]),

    // Direct slide selection
    handleSlideSelect: useCallback((index: number) => {
      console.log('Direct slide select:', index);
      dispatch({ type: 'SET_SLIDE', index });
    }, []),

    // Direct caption click (for expandable captions)
    handleCaptionClick: useCallback((index: number) => {
      console.log('Caption click for slide:', index);
      dispatch({ type: 'TOGGLE_CAPTION_DIRECT', index });
    }, []),

    // Caption mode change (called when caption detects its mode)
    handleCaptionModeChange: useCallback((index: number, mode: CaptionMode) => {
      console.log(`Caption ${index} mode changed to:`, mode);
      dispatch({ type: 'UPDATE_CAPTION_MODE', index, mode });
    }, []),

    // Image frame click with better targeting
    handleCarouselClick: useCallback((e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Ignore interactive elements
      if (
        target.closest('button') ||
        target.closest('[data-caption]') ||
        target.tagName.toLowerCase() === 'svg' ||
        target.closest('svg') ||
        target.closest('[role="button"]')
      ) {
        return;
      }

      console.log('Carousel frame click, captions visible:', state.captionsVisible);

      // Frame click behavior
      if (state.captionsVisible) {
        dispatch({ type: 'TOGGLE_CAPTION_FRAME', index: state.currentIndex });
      } else {
        dispatch({ type: 'TOGGLE_CAPTIONS_VISIBILITY' });
      }
    }, [state.captionsVisible, state.currentIndex])
  };

  // Debug logging for state changes
  useEffect(() => {
    console.log('Carousel state changed:', {
      currentIndex: state.currentIndex,
      direction: state.direction,
      isTransitioning: state.isTransitioning,
      captionsVisible: state.captionsVisible,
      totalImages: state.images.length
    });
  }, [state.currentIndex, state.direction, state.isTransitioning, state.captionsVisible, state.images.length]);

  return {
    currentIndex: state.currentIndex,
    direction: state.direction,
    isTransitioning: state.isTransitioning,
    captionsVisible: state.captionsVisible,
    images: state.images, // Now includes caption behavior
    dimensions: currentDimensions, // Dynamic dimensions
    viewportState,
    captionEvaluationTrigger, // Forces caption re-evaluation
    handlers
  };
}