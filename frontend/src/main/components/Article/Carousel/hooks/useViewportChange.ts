// src/main/components/Article/Carousel/hooks/useViewportChange.ts
import { useState, useEffect, useCallback, useRef } from 'react';
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

  // Track if we're currently processing to prevent overlaps
  const isProcessingRef = useRef(false);
  const lastCalculatedRef = useRef<string>('');

  // Calculate dimensions with throttling and deduplication
  const recalculateDimensions = useCallback((viewport: ViewportState) => {
    if (!images.length || isProcessingRef.current) return;

    // Create a signature to avoid duplicate calculations
    const signature = `${viewport.width}-${viewport.height}-${images.length}`;
    if (signature === lastCalculatedRef.current) {
      return;
    }

    isProcessingRef.current = true;
    lastCalculatedRef.current = signature;

    console.log('Recalculating carousel dimensions for viewport:', viewport);

    try {
      const mediaRatios = images.map(item => 
        (item.imageAttributes.width || 1200) / (item.imageAttributes.height || 800)
      );
      
      const newDimensions = calculateCarouselDimensions({
        analysis: initialAnalysis,
        viewportWidth: viewport.width,
        viewportHeight: viewport.height,
        mediaRatios
      });

      console.log('New carousel dimensions:', newDimensions);
      onDimensionsChange(newDimensions);
    } catch (error) {
      console.error('Error calculating carousel dimensions:', error);
    } finally {
      isProcessingRef.current = false;
    }
  }, [images, initialAnalysis, onDimensionsChange]);

  // Throttled resize handler with better threshold
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      if (isProcessingRef.current) return;
      
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

        // More restrictive change detection - only update on significant changes
        const significantChange = 
          Math.abs(newWidth - oldState.width) > 100 || // Increased from 50 to 100
          newIsLandscape !== oldState.isLandscape ||
          newBreakpoint !== oldState.breakpoint;

        if (significantChange) {
          console.log('Significant viewport change detected:', {
            old: oldState,
            new: newState
          });
          
          setViewportState(newState);
          recalculateDimensions(newState);
          onViewportChange();
        }
      }, 300); // Increased throttle to 300ms
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [viewportState, recalculateDimensions, onViewportChange]);

  // Initial calculation on mount only
  useEffect(() => {
    if (images.length > 0) {
      recalculateDimensions(viewportState);
    }
  }, [images.length,recalculateDimensions,viewportState]); // Empty dependency array - only run once on mount

  return {
    viewportState,
    recalculateDimensions: useCallback(() => {
      if (!isProcessingRef.current) {
        recalculateDimensions(viewportState);
      }
    }, [recalculateDimensions, viewportState])
  };
}