// src/main/components/Article/Carousel/CarouselCaption.tsx
import { memo, useRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CarouselCaptionProps {
  content: string;
  expanded: boolean;
  visible: boolean; // New prop for visibility
  onClick: () => void;
  navigationLayout: 'horizontal' | 'vertical';
  isActive: boolean;
  imageHeight?: number;
}

export const CarouselCaption = memo(function CarouselCaption({
  content,
  expanded,
  visible, // New visibility state
  onClick,
  navigationLayout,
  isActive,
  imageHeight = 400
}: CarouselCaptionProps) {
  
  const captionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  // Calculate line height based on theme and font size
  const getThreeLineHeight = () => {
    // Base calculation: font-size * line-height * 3 lines + padding
    return 'calc(var(--caption-line-height) * 3 + var(--caption-padding-y) * 2)';
  };

  const getMaxExpandedHeight = () => {
    // Maximum expansion is 80% of image height to maintain visual hierarchy
    return Math.min(imageHeight * 0.8, 300);
  };

  // Navigation height offset calculation
  const getNavigationOffset = () => {
    return navigationLayout === 'horizontal' ? '4rem' : '1rem'; // 64px for horizontal, 16px for vertical
  };

  // Check for text overflow and measure content
  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      
      setHasOverflow(scrollHeight > clientHeight);
      setContentHeight(scrollHeight);
    }
  }, [content, expanded]);

  // Don't render if not visible
  if (!visible) return null;

  return (
    <div 
      ref={captionRef}
      data-caption="true" // Mark for click detection
      className={twMerge(
        'absolute left-0 right-0',
        'transition-all duration-300 ease-out',
        'z-20', // Above navigation elements
        isActive ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        // FIXED: Position at actual bottom of carousel frame, accounting for navigation
        bottom: getNavigationOffset(),
        height: expanded 
          ? `${Math.min(getMaxExpandedHeight(), contentHeight + 24)}px`
          : getThreeLineHeight(),
        transitionDelay: isActive ? '150ms' : '0ms'
      }}
    >
      {/* Main caption container */}
      <div
        className={twMerge(
          'relative w-full h-full overflow-hidden',
          'transition-all duration-300 ease-out',
          // Theme-specific styling
          'theme-default:bg-sf-cont/90 theme-default:backdrop-blur-sm',
          'theme-default:rounded-lg theme-default:shadow-md',
          
          'theme-rounded:bg-sf-cont/95 theme-rounded:backdrop-blur-md',
          'theme-rounded:rounded-2xl theme-rounded:shadow-lg',
          
          'theme-sharp:bg-sf-cont theme-sharp:border-t theme-sharp:border-ol',
          'theme-sharp:shadow-sharp'
        )}
      >
        {/* Clickable content area */}
        <button
          onClick={onClick}
          className={twMerge(
            'w-full h-full text-left cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-pr-fix/50',
            'theme-default:focus:ring-offset-2 theme-default:focus:ring-offset-sf-cont',
            'theme-rounded:focus:ring-offset-4 theme-rounded:focus:ring-offset-sf-cont',
            'theme-sharp:focus:ring-offset-0'
          )}
        >
          <div 
            ref={contentRef}
            className={twMerge(
              'h-full prose-sm text-on-sf max-w-none',
              'transition-all duration-300',
              // Theme-dependent padding
              'theme-default:px-4 theme-default:py-3',
              'theme-rounded:px-6 theme-rounded:py-4',
              'theme-sharp:px-4 theme-sharp:py-2',
              // Scrolling behavior when expanded
              expanded && contentHeight > getMaxExpandedHeight() 
                ? 'overflow-y-auto overflow-x-hidden scrollbar-hide' 
                : 'overflow-hidden',
              // Line clamping when collapsed
              !expanded && 'line-clamp-3'
            )}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </button>
        
        {/* Gradient blur overlay for overflow indication */}
        {!expanded && hasOverflow && (
          <div 
            className={twMerge(
              'absolute bottom-0 left-0 right-0',
              'h-6 pointer-events-none',
              'bg-gradient-to-t from-sf-cont to-transparent',
              'transition-opacity duration-300',
              // Theme-specific gradient adjustments
              'theme-default:from-sf-cont/90',
              'theme-rounded:from-sf-cont/95',
              'theme-sharp:from-sf-cont'
            )}
          />
        )}
        
        {/* Expansion indicator */}
        {hasOverflow && (
          <div 
            className={twMerge(
              'absolute bottom-2 right-3',
              'text-xs text-on-sf/60',
              'pointer-events-none',
              'transition-all duration-300',
              expanded ? 'opacity-0 scale-90' : 'opacity-100 scale-100',
              // Theme-specific positioning
              'theme-rounded:bottom-3 theme-rounded:right-4',
              'theme-sharp:bottom-1 theme-sharp:right-2'
            )}
          >
            {expanded ? '⌃' : '⋯'}
          </div>
        )}
      </div>

      {/* Caption visibility hint (only shown when captions are visible) */}
      {visible && !expanded && (
        <div 
          className={twMerge(
            'absolute -top-8 right-0',
            'text-xs text-on-sf/40',
            'pointer-events-none',
            'transition-opacity duration-500',
            'opacity-0 hover:opacity-100',
            // Small visual hint for users
            'bg-sf-cont/50 px-2 py-1 rounded-md',
            'theme-default:rounded-md',
            'theme-rounded:rounded-lg',
            'theme-sharp:rounded-none'
          )}
        >
          Click area to hide captions
        </div>
      )}
    </div>
  );
});