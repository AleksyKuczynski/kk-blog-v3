// src/main/components/Article/Carousel/CarouselCaption.tsx
import { memo, useRef, useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { CaptionBehavior, CaptionMode, CaptionState } from './captionTypes';
import { useResizeObserver } from './hooks/useResizeObserver';

interface CarouselCaptionProps {
  content: string;
  behavior: CaptionBehavior;
  visible: boolean;
  onCaptionClick: () => void; // Direct caption click (expandable only)
  onModeChange: (mode: CaptionMode) => void; // Callback when mode changes
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

  // Detect caption mode using @tailwindcss/line-clamp
  const detectCaptionMode = useCallback((element: HTMLElement): CaptionMode => {
    // Create a test element with line-clamp-3 to measure 3-line height
    const testElement = element.cloneNode(true) as HTMLElement;
    testElement.classList.add('line-clamp-3');
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.style.width = element.offsetWidth + 'px';
    
    element.parentElement?.appendChild(testElement);
    const threeLineHeight = testElement.offsetHeight;
    element.parentElement?.removeChild(testElement);
    
    // Remove line-clamp to measure natural height
    element.classList.remove('line-clamp-3');
    const naturalHeight = element.scrollHeight;
    
    // If natural height significantly exceeds 3-line height, it's expandable
    const threshold = threeLineHeight * 1.1; // 10% buffer
    return naturalHeight > threshold ? 'expandable' : 'static';
  }, []);

  // Handle caption measurement and mode detection
  const handleMeasurement = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    if (!entry || !measureRef.current) return;

    const element = measureRef.current;
    const newMode = detectCaptionMode(element);
    const newHeight = element.scrollHeight;
    
    setMeasuredHeight(newHeight);
    
    // Notify parent if mode changed
    if (newMode !== behavior.mode) {
      onModeChange(newMode);
    }
    
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [behavior.mode, onModeChange, detectCaptionMode, isInitialized]);

  // Set up ResizeObserver for frame size changes
  useResizeObserver(measureRef, handleMeasurement);

  // Don't render if no content or globally hidden or collapsed
  if (!behavior.hasContent || !visible || behavior.state === 'collapsed') {
    return null;
  }

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
      // Static captions: always show at natural height (when expanded)
      return `${Math.min(measuredHeight, imageHeight * 0.4)}px`;
    } else {
      // Expandable captions: minimized (3 lines) vs expanded (up to 80%)
      if (isMinimized) {
        return 'var(--caption-three-line-height)';
      } else {
        return `${Math.min(imageHeight * 0.8, measuredHeight)}px`;
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
          {/* Caption content */}
          <div
            onClick={handleCaptionClick}
            className={twMerge(
              'w-full h-full text-left',
              // Styling based on mode
              mode === 'expandable' ? 'cursor-pointer' : 'cursor-default',
              mode === 'expandable' && 'hover:bg-sf-cont/5',
              // Focus states only for expandable captions
              mode === 'expandable' && 'focus:outline-none focus:ring-2 focus:ring-pr-fix/50'
            )}
            tabIndex={mode === 'expandable' ? 0 : -1}
            role={mode === 'expandable' ? 'button' : undefined}
            aria-label={
              mode === 'expandable' 
                ? (isExpanded ? 'Minimize caption' : 'Expand caption') 
                : undefined
            }
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