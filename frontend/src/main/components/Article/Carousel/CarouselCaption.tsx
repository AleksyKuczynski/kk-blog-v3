// src/main/components/Article/Carousel/CarouselCaption.tsx
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface CarouselCaptionProps {
  content: string;
  expanded: boolean;
  onClick: () => void;
  navigationLayout: 'horizontal' | 'vertical';
  isActive: boolean;
  // 🔄 ADD: Maximum height constraint to prevent layout impact
  maxHeight?: number;
}

export const CarouselCaption = memo(function CarouselCaption({
  content,
  expanded,
  onClick,
  navigationLayout,
  isActive,
  maxHeight = 120 // Default to 120px max height
}: CarouselCaptionProps) {
  
  // 🔄 CONSTRAINED: Calculate safe heights that don't break carousel layout
  const collapsedHeight = 40; // Fixed collapsed height
  const expandedHeight = Math.min(maxHeight, 200); // Constrained expanded height
  
  return (
    <div 
      className={twMerge(
        'absolute left-0 right-0 bottom-0',
        navigationLayout === 'horizontal' ? 'mb-16' : 'mb-4', // Account for navigation space
        'transition-all duration-300',
        'transition-opacity duration-300',
        isActive ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        // 🔄 FIXED: Constrained height that doesn't affect carousel dimensions
        height: expanded ? `${expandedHeight}px` : `${collapsedHeight}px`,
        transitionDelay: isActive ? '150ms' : '0ms'
      }}
    >
      <button
        onClick={onClick}
        className={twMerge(
          'absolute left-0 right-0 bottom-0 w-full h-full',
          'text-left cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-pr-fix/50',
          'transition-all duration-300 ease-in-out',
          'theme-default:bg-sf-cont/90',
          'theme-rounded:bg-sf-cont/95 theme-rounded:backdrop-blur-sm',
          'theme-sharp:bg-sf-cont theme-sharp:border-t theme-sharp:border-ol'
        )}
      >
        <div 
          className={twMerge(
            'px-4 py-2 h-full',
            'prose-sm text-on-sf max-w-none',
            'transition-all duration-300',
            // 🔄 FIXED: Always maintain internal scrolling, never break container bounds
            'overflow-y-auto overflow-x-hidden',
            !expanded && 'line-clamp-2' // Show 2 lines when collapsed
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        {/* 🔄 ADD: Visual indicator for expandable captions */}
        {content.length > 100 && (
          <div className={twMerge(
            'absolute bottom-1 right-1',
            'text-xs text-on-sf/60',
            'pointer-events-none',
            'transition-opacity duration-200',
            expanded ? 'opacity-0' : 'opacity-100'
          )}>
            ⋯
          </div>
        )}
      </button>
    </div>
  );
});