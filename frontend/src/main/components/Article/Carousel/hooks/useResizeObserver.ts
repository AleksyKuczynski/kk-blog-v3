// src/main/components/Article/Carousel/hooks/useResizeObserver.ts
import { useCallback, useRef } from 'react';

type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;

/**
 * Custom hook that sets up ResizeObserver without useEffect
 * Uses ref callback pattern for immediate setup/cleanup
 */
export function useResizeObserver(
  targetRef: React.RefObject<Element>,
  callback: ResizeObserverCallback
) {
  const observerRef = useRef<ResizeObserver | null>(null);
  const callbackRef = useRef(callback);
  
  // Update callback ref when callback changes
  callbackRef.current = callback;

  // Ref callback that sets up the observer immediately when element mounts
  const setupObserver = useCallback((element: Element | null) => {
    // Cleanup existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Set up new observer if element exists
    if (element && 'ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver((entries) => {
        // Use the latest callback
        callbackRef.current(entries);
      });

      resizeObserver.observe(element);
      observerRef.current = resizeObserver;
    }
  }, []);

  // Set up observer when target element changes
  const previousElement = useRef<Element | null>(null);
  if (targetRef.current !== previousElement.current) {
    setupObserver(targetRef.current);
    previousElement.current = targetRef.current;
  }

  // Cleanup function
  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  return cleanup;
}