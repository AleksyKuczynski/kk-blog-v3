// src/main/components/Article/Carousel/CarouselCaption.tsx
import { memo, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { CaptionBehavior, CaptionMode } from './captionTypes';

interface CarouselCaptionProps {
  content: string;
  behavior: CaptionBehavior;
  visible: boolean;
  onCaptionClick: () => void;
  onModeChange: (mode: CaptionMode) => void;
  navigationLayout: 'horizontal' | 'vertical';
  isActive: boolean;
  imageHeight?: number;
}

export const CarouselCaption = memo(function CarouselCaption({
  content,
  behavior,
  visible,
  onCaptionClick,
  onModeChange,
  navigationLayout,
  isActive,
  imageHeight = 400
}: CarouselCaptionProps) {
  
  const captionRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastViewportWidth, setLastViewportWidth] = useState(0);

  // Stable mode detection function
  const detectCaptionMode = useCallback((element: HTMLElement): CaptionMode => {
    // Use both content length and actual height for robust detection
    const textContent = content.replace(/<[^>]*>/g, '').trim();
    const contentLength = textContent.length;
    
    // Content-based heuristic (primary)
    if (contentLength > 250) return 'expandable';
    if (contentLength < 120) return 'static';
    
    // Height-based measurement (secondary, for edge cases)
    const actualHeight = element.scrollHeight;
    const lineHeight = parseFloat(getComputedStyle(element).lineHeight) || 24;
    const estimatedLines = actualHeight / lineHeight;
    
    return estimatedLines > 3.2 ? 'expandable' : 'static';
  }, [content]);

  // Throttled measurement to prevent infinite loops
  const measureContent = useCallback(() => {
    if (!measureRef.current || !visible || !behavior?.hasContent) return;

    const currentViewportWidth = window.innerWidth;
    
    // Only re-measure if viewport changed significantly (>50px)
    if (isInitialized && Math.abs(currentViewportWidth - lastViewportWidth) < 50) {
      return;
    }

    const element = measureRef.current;
    const newMode = detectCaptionMode(element);
    const newHeight = element.scrollHeight;
    
    setMeasuredHeight(newHeight);
    setLastViewportWidth(currentViewportWidth);
    
    // Notify parent if mode changed
    if (newMode !== behavior.mode) {
      onModeChange(newMode);
    }
    
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [behavior?.hasContent, behavior?.mode, visible, detectCaptionMode, onModeChange, isInitialized, lastViewportWidth]);

  // Initial measurement
  useLayoutEffect(() => {
    measureContent();
  }, [measureContent]);

  // Viewport change detection with throttling
  useLayoutEffect(() => {
    if (!isInitialized) return;

    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(measureContent, 150); // 150ms throttle
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [measureContent, isInitialized]);

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
  const isMinimized = state === 'minimized';
  
  // Handle caption click - only expandable captions are clickable
  const handleCaptionClick = () => {
    if (mode === 'expandable' && onCaptionClick) {
      onCaptionClick();
    }
  };

  // Calculate height based on mode and state
  const getHeight = () => {
    if (mode === 'static') {
      // Static captions: show at natural height, limited to 40% of image
      const naturalHeight = measuredHeight || 100;
      return `${Math.min(naturalHeight, imageHeight * 0.4)}px`;
    } else {
      // Expandable captions: minimized vs expanded
      if (isMinimized) {
        return 'var(--caption-three-line-height)';
      } else {
        // Expanded: up to 80% of image height
        const naturalHeight = measuredHeight || 200;
        return `${Math.min(imageHeight * 0.8, naturalHeight)}px`;
      }
    }
  };

  return (
    <>
      {/* Always present measuring element */}
      <div className="absolute left-0 right-0 bottom-0 opacity-0 pointer-events-none z-[-1]">
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
      
      {/* Actual caption */}
      <div 
        ref={captionRef}
        data-caption="true"
        className={twMerge(
          'absolute left-0 right-0',
          'transition-all duration-300 ease-out',
          'z-20',
          isActive ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          bottom: '0px',
          height: getHeight(),
          transitionDelay: isActive ? '150ms' : '0ms'
        }}
      >
        <div
          className={twMerge(
            'relative w-full h-full overflow-hidden',
            'transition-all duration-300 ease-out',
            'theme-default:bg-sf-cont/90 theme-default:backdrop-blur-sm theme-default:rounded-lg theme-default:shadow-md',
            'theme-rounded:bg-sf-cont/95 theme-rounded:backdrop-blur-md theme-rounded:rounded-2xl theme-rounded:shadow-lg',
            'theme-sharp:bg-sf-cont theme-sharp:border-t theme-sharp:border-ol theme-sharp:shadow-sharp'
          )}
        >
          {/* Caption content - clickable only for expandable captions */}
          <div
            onClick={handleCaptionClick}
            className={twMerge(
              'w-full h-full text-left',
              // Styling based on caption type
              mode === 'expandable' ? 'cursor-pointer' : 'cursor-default',
              mode === 'expandable' && 'hover:bg-sf-cont/5',
              // Focus states only for expandable captions
              mode === 'expandable' && 'focus:outline-none focus:ring-2 focus:ring-pr-fix/50'
            )}
            tabIndex={mode === 'expandable' ? 0 : -1}
            role={mode === 'expandable' ? 'button' : undefined}
            aria-label={mode === 'expandable' ? (isExpanded ? 'Minimize caption' : 'Expand caption') : undefined}
          >
            <div 
              className={twMerge(
                'h-full prose-sm text-on-sf max-w-none transition-all duration-300',
                'theme-default:px-4 theme-default:py-3',
                'theme-rounded:px-6 theme-rounded:py-4',
                'theme-sharp:px-4 theme-sharp:py-2',
                // Scrolling for expandable expanded captions if needed
                mode === 'expandable' && isExpanded && measuredHeight > imageHeight * 0.8 
                  ? 'overflow-y-auto overflow-x-hidden scrollbar-hide' 
                  : 'overflow-hidden',
                // Line clamping for expandable minimized captions
                mode === 'expandable' && isMinimized && 'line-clamp-3'
              )}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          
          {/* Visual indicators only for expandable captions */}
          {mode === 'expandable' && (
            <>
              {/* Gradient overlay when minimized */}
              {isMinimized && (
                <div 
                  className={twMerge(
                    'absolute bottom-0 left-0 right-0 h-6 pointer-events-none',
                    'bg-gradient-to-t from-sf-cont to-transparent transition-opacity duration-300',
                    'theme-default:from-sf-cont/90',
                    'theme-rounded:from-sf-cont/95',
                    'theme-sharp:from-sf-cont'
                  )}
                />
              )}
              
              {/* Expansion indicator */}
              <div 
                className={twMerge(
                  'absolute bottom-2 right-3 text-xs text-on-sf/60 pointer-events-none',
                  'transition-all duration-300',
                  isExpanded ? 'opacity-0 scale-90' : 'opacity-100 scale-100',
                  'theme-rounded:bottom-3 theme-rounded:right-4',
                  'theme-sharp:bottom-1 theme-sharp:right-2'
                )}
              >
                {isExpanded ? '⌃' : '⋯'}
              </div>
            </>
          )}
        </div>

        {/* Interactive hints */}
        {visible && (
          <div 
            className={twMerge(
              'absolute -top-8 right-0 text-xs text-on-sf/40 pointer-events-none',
              'transition-opacity duration-500 opacity-0 hover:opacity-100',
              'bg-sf-cont/50 px-2 py-1 rounded-md',
              'theme-default:rounded-md theme-rounded:rounded-lg theme-sharp:rounded-none'
            )}
          >
            {mode === 'expandable' 
              ? (isExpanded ? 'Click to minimize • Click image to hide' : 'Click to expand • Click image to hide')
              : 'Click image to hide captions'
            }
          </div>
        )}
      </div>
    </>
  );
});