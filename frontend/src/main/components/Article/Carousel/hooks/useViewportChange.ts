// src/main/components/Article/Carousel/hooks/useViewportChange.ts
import { useState, useEffect, useCallback } from 'react';
import { CarouselDimensions } from '../carouselTypes';
import { ImageSetAnalysis } from '../carouselTypes';
import { calculateCarouselDimensions } from '../utils/calculateCarouselDimensions';

interface ViewportChangeConfig {
  images: any[]; // CarouselItem array
  initialAnalysis: ImageSetAnalysis;
  onDimensionsChange: (dimensions: CarouselDimensions) => void;
  onViewportChange: () => void; // Callback to trigger caption re-evaluation
}

interface ViewportState {
  width: number;
  height: number;
  isLandscape: boolean;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
}

export function useViewportChange({ 
  images, 
  initialAnalysis, 
  onDimensionsChange,
  onViewportChange 
}: ViewportChangeConfig) {
  
  const [viewportState, setViewportState] = useState<ViewportState>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    return {
      width,
      height,
      isLandscape: width > height,
      breakpoint: width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
    };
  });

  // Calculate new dimensions when viewport changes significantly
  const recalculateDimensions = useCallback(() => {
    if (!images.length) return;

    console.log('Recalculating carousel dimensions for viewport:', viewportState);

    const mediaRatios = images.map(item => 
      (item.imageAttributes.width || 1200) / (item.imageAttributes.height || 800)
    );
    
    const newDimensions = calculateCarouselDimensions({
      analysis: initialAnalysis,
      viewportWidth: viewportState.width,
      viewportHeight: viewportState.height,
      mediaRatios
    });

    console.log('New carousel dimensions:', newDimensions);
    onDimensionsChange(newDimensions);
  }, [images, initialAnalysis, viewportState, onDimensionsChange]);

  // Throttled resize handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const newIsLandscape = newWidth > newHeight;
        const newBreakpoint = newWidth < 768 ? 'mobile' : newWidth < 1024 ? 'tablet' : 'desktop';
        
        const oldState = viewportState;
        const newState: ViewportState = {
          width: newWidth,
          height: newHeight,
          isLandscape: newIsLandscape,
          breakpoint: newBreakpoint
        };

        // Only update if significant change (>50px width or orientation change)
        const significantChange = 
          Math.abs(newWidth - oldState.width) > 50 ||
          newIsLandscape !== oldState.isLandscape ||
          newBreakpoint !== oldState.breakpoint;

        if (significantChange) {
          console.log('Significant viewport change detected:', {
            old: oldState,
            new: newState
          });
          
          setViewportState(newState);
          
          // Trigger caption mode re-evaluation
          onViewportChange();
        }
      }, 200); // 200ms throttle
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [viewportState, onViewportChange]);

  // Recalculate dimensions when viewport state changes
  useEffect(() => {
    recalculateDimensions();
  }, [recalculateDimensions]);

  return {
    viewportState,
    recalculateDimensions
  };
}