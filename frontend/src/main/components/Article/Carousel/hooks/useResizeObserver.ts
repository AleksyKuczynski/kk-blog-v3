// src/main/components/Article/Carousel/hooks/useResizeObserver.ts
import { useEffect } from 'react';

type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;

/**
 * Custom hook that sets up ResizeObserver
 * Simplified approach using useEffect
 */
export function useResizeObserver(
  targetRef: React.RefObject<Element>,
  callback: ResizeObserverCallback
) {
  
  useEffect(() => {
    const element = targetRef.current;
    if (!element || typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      callback(entries);
    });

    // Initial measurement - trigger callback immediately
    callback([{
      target: element,
      contentRect: element.getBoundingClientRect(),
      borderBoxSize: [],
      contentBoxSize: [],
      devicePixelContentBoxSize: []
    } as ResizeObserverEntry]);

    // Start observing
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [targetRef, callback]);
}