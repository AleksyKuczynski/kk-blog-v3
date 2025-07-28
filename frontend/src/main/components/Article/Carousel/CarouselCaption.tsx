// src/main/components/Article/Carousel/CarouselCaption.tsx
import { CaptionState } from '@/main/lib/markdown/markdownTypes';
import { memo, useRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CarouselCaptionProps {
  content: string;
  captionState: CaptionState; // CHANGED from expanded: boolean
  visible: boolean;
  onCaptionClick: () => void; // Direct caption click
  navigationLayout: 'horizontal' | 'vertical';
  isActive: boolean;
  imageHeight?: number;
}

export const CarouselCaption = memo(function CarouselCaption({
  content,
  captionState, // CHANGED
  visible,
  onCaptionClick,
  navigationLayout,
  isActive,
  imageHeight = 400
}: CarouselCaptionProps) {
  
  const captionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Measure content to determine if it's small or big caption
  useEffect(() => {
    if (contentRef.current && visible && captionState !== 'collapsed') {
      const element = contentRef.current;
      
      // Temporarily show at minimized size to measure
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      element.classList.remove('line-clamp-3');
      
      const scrollHeight = element.scrollHeight;
      const threeLineHeight = 72; // Approximate 3-line height
      
      const hasOverflowValue = scrollHeight > threeLineHeight * 1.2; // 20% buffer
      setHasOverflow(hasOverflowValue);
      setContentHeight(scrollHeight);
      setIsInitialized(true);
      
      // Restore classes
      if (captionState === 'minimized') {
        element.classList.add('line-clamp-3');
      }
    }
  }, [content, visible, captionState]);

  // Don't render if globally not visible or in collapsed state
  if (!visible || captionState === 'collapsed') return null;

  // Don't render until we've measured the content
  if (!isInitialized) return null;

  // Determine caption type and effective state
  const isSmallCaption = !hasOverflow;
  const isBigCaption = hasOverflow;
  
  // Small captions: only 'expanded' is meaningful (they show at natural size)
  // Big captions: 'minimized' (3 lines) or 'expanded' (up to 80% height)
  const effectiveState = isSmallCaption ? 'expanded' : captionState;
  const isExpanded = effectiveState === 'expanded';

  // Handle caption click - only big captions are clickable
  const handleCaptionClick = () => {
    if (isBigCaption && onCaptionClick) {
      onCaptionClick();
    }
  };

  // Calculate height based on state
  const getHeight = () => {
    if (isSmallCaption) {
      // Small captions: show at natural height
      return `${Math.min(contentHeight + 32, imageHeight * 0.4)}px`;
    } else {
      // Big captions: minimized vs expanded
      return isExpanded 
        ? `${Math.min(imageHeight * 0.8, contentHeight + 32)}px`
        : 'calc(var(--caption-line-height) * 3 + var(--caption-padding-y) * 2)';
    }
  };

  return (
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
  );
});