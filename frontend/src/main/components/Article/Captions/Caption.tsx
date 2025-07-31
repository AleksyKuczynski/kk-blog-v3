// src/main/components/Article/Caption/Caption.tsx
import { useRef, useCallback, useLayoutEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { CaptionBehavior, CaptionMode } from './types';

interface CarouselCaptionProps {
  content: string;
  behavior: CaptionBehavior;
  visible: boolean;
  onCaptionClick?: () => void;
  onModeChange: (mode: CaptionMode) => void;
  navigationLayout: 'horizontal' | 'vertical';
  isActive: boolean;
  imageHeight: number;
  captionEvaluationTrigger?: number; // External trigger for re-evaluation
}

export function Caption({
  content,
  behavior,
  visible,
  onCaptionClick,
  onModeChange,
  navigationLayout,
  isActive,
  imageHeight,
  captionEvaluationTrigger
}: CarouselCaptionProps) {
  
  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastMeasurementRef = useRef<string>('');

  // Stable caption mode detection
  const detectCaptionMode = useCallback((element: HTMLDivElement): CaptionMode => {
    // Create a temporary clone to measure without affecting layout
    const clone = element.cloneNode(true) as HTMLDivElement;
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.height = 'auto';
    clone.style.maxHeight = 'none';
    clone.style.overflow = 'visible';
    clone.style.pointerEvents = 'none';
    clone.style.zIndex = '-1000';
    
    // Add to DOM temporarily
    document.body.appendChild(clone);
    
    try {
      const naturalHeight = clone.scrollHeight;
      const lineHeight = parseFloat(getComputedStyle(clone).lineHeight) || 20;
      const estimatedLines = Math.round(naturalHeight / lineHeight);
      
      console.log(`Caption mode detection: ${estimatedLines} lines (${naturalHeight}px height)`);
      
      return estimatedLines <= 3 ? 'static' : 'expandable';
    } finally {
      // Always clean up
      document.body.removeChild(clone);
    }
  }, []);

  // Throttled measurement to prevent infinite loops
  const measureContent = useCallback(() => {
    if (!measureRef.current || !visible || !behavior?.hasContent) return;

    // Create measurement signature to avoid duplicate measurements
    const currentViewportWidth = window.innerWidth;
    const measurementSignature = `${content.length}-${currentViewportWidth}-${behavior.state}`;
    
    // Skip if we've already measured this exact scenario
    if (measurementSignature === lastMeasurementRef.current) {
      return;
    }

    try {
      const element = measureRef.current;
      const newMode = detectCaptionMode(element);
      const newHeight = element.scrollHeight;
      
      console.log(`Measuring caption: mode=${newMode}, height=${newHeight}px`);
      
      setMeasuredHeight(newHeight);
      lastMeasurementRef.current = measurementSignature;
      
      // Notify parent if mode changed
      if (newMode !== behavior.mode) {
        console.log(`Caption mode changed from ${behavior.mode} to ${newMode}`);
        onModeChange(newMode);
      }
      
      if (!isInitialized) {
        setIsInitialized(true);
      }
    } catch (error) {
      console.warn('Error measuring caption:', error);
    }
  }, [behavior?.hasContent, behavior?.mode, behavior?.state, visible, detectCaptionMode, onModeChange, isInitialized, content.length]);

  // Initial measurement
  useLayoutEffect(() => {
    if (!isInitialized) {
      // Use double RAF to ensure DOM is fully ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          measureContent();
        });
      });
    }
  }, [measureContent, isInitialized]);

  // Re-measure on external trigger (viewport changes) with debouncing
  useLayoutEffect(() => {
    if (!isInitialized || !captionEvaluationTrigger) return;

    console.log('Caption re-evaluation triggered:', captionEvaluationTrigger);
    
    // Debounce multiple rapid triggers
    const timeoutId = setTimeout(() => {
      measureContent();
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [captionEvaluationTrigger, isInitialized, measureContent]); // Removed unnecessary dependencies

  // Don't render if no behavior or no content
  if (!behavior?.hasContent || !visible) return null;
  if (behavior.state === 'collapsed') return null;

  // Show measuring element until initialized
  if (!isInitialized) {
    return (
      <div className="absolute left-0 right-0 bottom-0 opacity-0 pointer-events-none">
        <div 
          ref={measureRef}
          className={twMerge(
            'prose-sm text-on-sf max-w-none',
            'theme-default:px-4 theme-default:py-3',
            'theme-rounded:px-6 theme-rounded:py-4',
            'theme-sharp:px-4 theme-sharp:py-2'
          )}
          style={{
            lineHeight: 'var(--caption-line-height)',
            paddingTop: 'var(--caption-padding-y)',
            paddingBottom: 'var(--caption-padding-y)'
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }

  const { mode, state } = behavior;
  const isExpanded = state === 'expanded';
  
  // Handle caption click - only expandable captions are clickable
  const handleCaptionClick = () => {
    if (mode === 'expandable' && onCaptionClick) {
      onCaptionClick();
    }
  };

  // Calculate height based on mode and state
  const getHeight = () => {
    if (mode === 'static') {
      // Static captions: show at natural height
      return `${measuredHeight}px`;
    } else {
      // Expandable captions
      if (isExpanded) {
        // Expanded: up to 80% of image frame
        const maxExpandedHeight = Math.min(measuredHeight, imageHeight * 0.8);
        return `${maxExpandedHeight}px`;
      } else {
        // Minimized: 3-line height (same as static expanded)
        const lineHeight = 20; // Approximate line height
        const minimizedHeight = lineHeight * 3 + 32; // 3 lines + padding
        return `${Math.min(minimizedHeight, measuredHeight)}px`;
      }
    }
  };

  // Calculate z-index for proper layering
  const getZIndex = () => {
    if (navigationLayout === 'vertical') return 30;
    return isExpanded ? 25 : 20;
  };

  return (
    <div
      className={twMerge(
        'absolute left-0 right-0 bottom-0',
        'transition-all duration-300 ease-out',
        'theme-default:bg-sf/90 theme-default:backdrop-blur-sm',
        'theme-rounded:bg-sf/95 theme-rounded:backdrop-blur-md theme-rounded:rounded-t-2xl',
        'theme-sharp:bg-sf theme-sharp:border-t theme-sharp:border-ol',
        // Interaction states
        mode === 'expandable' && 'cursor-pointer hover:bg-sf/95',
        // Overflow handling
        isExpanded && 'overflow-y-auto'
      )}
      style={{ 
        height: getHeight(),
        zIndex: getZIndex(),
        maxHeight: mode === 'expandable' && isExpanded ? `${imageHeight * 0.8}px` : undefined
      }}
      onClick={handleCaptionClick}
      data-caption="true"
      role={mode === 'expandable' ? 'button' : undefined}
      aria-label={mode === 'expandable' ? `${isExpanded ? 'Minimize' : 'Expand'} caption` : undefined}
    >
      <div 
        className={twMerge(
          'prose-sm text-on-sf max-w-none h-full',
          'theme-default:px-4 theme-default:py-3',
          'theme-rounded:px-6 theme-rounded:py-4',
          'theme-sharp:px-4 theme-sharp:py-2'
        )}
        style={{
          lineHeight: 'var(--caption-line-height)',
          paddingTop: 'var(--caption-padding-y)',
          paddingBottom: 'var(--caption-padding-y)'
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {/* Expansion indicator for expandable captions */}
      {mode === 'expandable' && (
        <div 
          className={twMerge(
            'absolute top-2 right-2',
            'w-6 h-6 rounded-full',
            'bg-on-sf/20 backdrop-blur-sm',
            'flex items-center justify-center',
            'transition-all duration-200',
            'text-on-sf text-xs',
            'hover:bg-on-sf/30'
          )}
          aria-hidden="true"
        >
          {isExpanded ? '−' : '+'}
        </div>
      )}
    </div>
  );
}