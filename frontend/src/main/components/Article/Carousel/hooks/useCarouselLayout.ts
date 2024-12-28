// src/main/components/Article/Carousel/hooks/useCarouselLayout.ts
'use client'

import { useCallback, useRef, useState } from 'react';
import { ImageSetAnalysis, NavigationLayout } from "../carouselTypes";
import { determineNavigationLayout } from "../utils/carouselUtils";

export function useCarouselLayout(initialAnalysis: ImageSetAnalysis) {
  const [navigationLayout, setNavigationLayout] = useState<NavigationLayout>('horizontal');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateLayout = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const layout = determineNavigationLayout(
        rect.width,
        rect.height,
        initialAnalysis
      );
      setNavigationLayout(layout);
    }
  }, [initialAnalysis]);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== containerRef.current) {
      if (containerRef.current) {
        // Cleanup old observer
        containerRef.current = null;
      }
      
      if (node) {
        containerRef.current = node;
        updateLayout();
        
        const observer = new ResizeObserver(() => {
          requestAnimationFrame(updateLayout);
        });
        
        observer.observe(node);
        node.dataset.hasObserver = 'true';
      }
    }
  }, [updateLayout]);

  return {
    navigationLayout,
    setContainerRef
  };
}