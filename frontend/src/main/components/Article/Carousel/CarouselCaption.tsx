// src/main/components/Article/Carousel/CarouselCaption.tsx
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface CarouselCaptionProps {
  content: string;
  expanded: boolean;
  onClick: () => void;
  navigationLayout: 'horizontal' | 'vertical';
  isActive: boolean;
}

export const CarouselCaption = memo(function CarouselCaption({
  content,
  expanded,
  onClick,
  navigationLayout,
  isActive
}: CarouselCaptionProps) {
  return (
    <div 
      className={twMerge(
        'absolute left-0 right-0 bottom-0',
        'mb-4 transition-all duration-300',
        expanded ? 'h-full' : 'h-10',
        'transition-opacity duration-300',
        isActive ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        transitionDelay: isActive ? '150ms' : '0ms'
      }}
    >
      <button
        onClick={onClick}
        className={twMerge(
          'absolute left-0 right-0 bottom-0 w-full',
          'text-left cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-pr-fix/50',
          'transition-transform duration-300 ease-in-out',
          'theme-default:bg-sf-cont/90',
          'theme-rounded:bg-sf-cont/95 theme-rounded:backdrop-blur-sm',
          'theme-sharp:bg-sf-cont theme-sharp:border-t theme-sharp:border-ol'
        )}
      >
        <div 
          className={twMerge(
            'px-4 py-2',
            'prose-sm text-on-sf max-w-none',
            'transition-all duration-300',
            expanded ? 'max-h-[60vh] overflow-y-auto' : 'max-h-8 overflow-hidden'
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </button>
    </div>
  );
});