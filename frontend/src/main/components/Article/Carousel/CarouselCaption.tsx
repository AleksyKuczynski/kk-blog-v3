// src/main/components/Article/Carousel/CarouselCaption.tsx
import { CaptionState } from '@/main/lib/markdown/markdownTypes';
import { memo, useRef, useLayoutEffect, useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

interface CarouselCaptionProps {
  content: string;
  captionState: CaptionState;
  visible: boolean;
  onCaptionClick: () => void;
  navigationLayout: 'horizontal' | 'vertical';
  isActive: boolean;
  imageHeight?: number;
}

export const CarouselCaption = memo(function CarouselCaption({
  content,
  captionState,
  visible,
  onCaptionClick,
  navigationLayout,
  isActive,
  imageHeight = 400
}: CarouselCaptionProps) {
  
  const captionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Type guards for caption states
  const isCollapsedState = (state: CaptionState): state is 'collapsed' => state === 'collapsed';
  const isExpandedState = (state: CaptionState): state is 'expanded' => state === 'expanded';

  // Measure content to determine if it's small or big caption
  const measureContent = useCallback(() => {
    if (!measureRef.current || !visible || isCollapsedState(captionState)) return;

    const measureElement = measureRef.current;
    
    // Get the actual computed line height from CSS variables
    const computedStyle = getComputedStyle(measureElement);
    const lineHeight = parseFloat(computedStyle.getPropertyValue('--caption-line-height')) || 22; // fallback to 22px
    const paddingY = parseFloat(computedStyle.getPropertyValue('--caption-padding-y')) || 12; // fallback to 12px
    
    // Calculate 3-line height using actual CSS values
    const threeLineHeight = (lineHeight * 3) + (paddingY * 2);
    
    // Measure actual content height
    const actualHeight = measureElement.scrollHeight;
    
    // Content-based fallback: if content is very long, assume it's big
    const contentLength = content.replace(/<[^>]*>/g, '').trim().length;
    const isLongContent = contentLength > 200; // characters
    
    // Determine if caption has overflow (is "big")
    const hasOverflowValue = actualHeight > threeLineHeight * 1.1 || isLongContent;
    
    setHasOverflow(hasOverflowValue);
    setContentHeight(actualHeight);
    setIsInitialized(true);

  }, [content, visible, captionState]);

  // Measure on mount and when dependencies change
  useLayoutEffect(() => {
    measureContent();
  }, [measureContent]);

  // Re-measure on window resize to handle responsive changes
  useLayoutEffect(() => {
    if (!isInitialized) return;

    const handleResize = () => {
      // Debounce resize measurements
      const timer = setTimeout(measureContent, 100);
      return () => clearTimeout(timer);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [measureContent, isInitialized]);

  // Don't render if globally not visible or in collapsed state
  if (!visible) return null;
  if (isCollapsedState(captionState)) return null;

  // Always render the measuring element (hidden) for accurate measurements
  const measureElement = (
    <div 
      ref={measureRef}
      className={twMerge(
        'absolute opacity-0 pointer-events-none z-[-1]',
        'prose-sm text-on-sf max-w-none',
        'theme-default:px-4 theme-default:py-3',
        'theme-rounded:px-6 theme-rounded:py-4', 
        'theme-sharp:px-4 theme-sharp:py-2',
        // Use same container width as real caption
        'left-0 right-0'
      )}
      style={{
        height: 'auto',
        maxHeight: 'none',
        lineHeight: 'var(--caption-line-height)',
        paddingTop: 'var(--caption-padding-y)',
        paddingBottom: 'var(--caption-padding-y)'
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  // If not initialized, show measuring element only
  if (!isInitialized) {
    return (
      <div className="absolute left-0 right-0 bottom-0">
        {measureElement}
      </div>
    );
  }

  // Now we have measurements, proceed with normal rendering
  const isSmallCaption = !hasOverflow;
  const isBigCaption = hasOverflow;
  
  // Small captions: only 'expanded' is meaningful (they show at natural size)
  // Big captions: 'minimized' (3 lines) or 'expanded' (up to 80% height)
  const effectiveState = isSmallCaption ? 'expanded' : captionState;
  const isExpanded = isExpandedState(effectiveState);

  // Handle caption click - only big captions are clickable
  const handleCaptionClick = () => {
    if (isBigCaption && onCaptionClick) {
      onCaptionClick();
    }
  };

  // Calculate height based on state
  const getHeight = () => {
    if (isSmallCaption) {
      // Small captions: show at natural height, limited to 40% of image
      return `${Math.min(contentHeight + 20, imageHeight * 0.4)}px`;
    } else {
      // Big captions: minimized vs expanded
      return isExpanded 
        ? `${Math.min(imageHeight * 0.8, contentHeight + 20)}px`
        : 'var(--caption-three-line-height)';
    }
  };

  return (
    <>
      {/* Always present measuring element */}
      {measureElement}
      
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
          {/* Caption content - clickable only for big captions */}
          <div
            onClick={handleCaptionClick}
            className={twMerge(
              'w-full h-full text-left',
              // Styling based on caption type
              isBigCaption ? 'cursor-pointer' : 'cursor-default',
              isBigCaption && 'hover:bg-sf-cont/5',
              // Focus states only for big captions
              isBigCaption && 'focus:outline-none focus:ring-2 focus:ring-pr-fix/50'
            )}
            tabIndex={isBigCaption ? 0 : -1}
            role={isBigCaption ? 'button' : undefined}
            aria-label={isBigCaption ? (isExpanded ? 'Minimize caption' : 'Expand caption') : undefined}
          >
            <div 
              ref={contentRef}
              className={twMerge(
                'h-full prose-sm text-on-sf max-w-none transition-all duration-300',
                'theme-default:px-4 theme-default:py-3',
                'theme-rounded:px-6 theme-rounded:py-4',
                'theme-sharp:px-4 theme-sharp:py-2',
                // Scrolling for big expanded captions if needed
                isBigCaption && isExpanded && contentHeight > imageHeight * 0.8 
                  ? 'overflow-y-auto overflow-x-hidden scrollbar-hide' 
                  : 'overflow-hidden',
                // Line clamping for big minimized captions
                isBigCaption && !isExpanded && 'line-clamp-3'
              )}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          
          {/* Visual indicators only for big captions */}
          {isBigCaption && (
            <>
              {/* Gradient overlay when minimized */}
              {!isExpanded && (
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
            {isBigCaption 
              ? (isExpanded ? 'Click to minimize • Click image to hide' : 'Click to expand • Click image to hide')
              : 'Click image to hide captions'
            }
          </div>
        )}
      </div>
    </>
  );
});