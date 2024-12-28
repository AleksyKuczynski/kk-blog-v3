// src/main/components/Article/Carousel/NavigationButtons.tsx
import { ChevronUpIcon } from '@/main/components/Interface/Icons';
import { twMerge } from 'tailwind-merge';

interface NavigationButtonsProps {
  layout: 'horizontal' | 'vertical';
  totalSlides: number;
  currentSlide: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideSelect: (index: number) => void;
}

export function NavigationButtons({
  layout,
  totalSlides,
  currentSlide,
  onPrevious,
  onNext,
  onSlideSelect,
}: NavigationButtonsProps) {
  // Base button styles
  const navigationButtonStyles = twMerge(
    "flex items-center justify-center transition-colors duration-200",
    layout === 'horizontal' ? [
      "w-8 h-8",
      "theme-default:rounded-full theme-default:bg-sf-hi theme-default:hover:bg-sf-hst",
      "theme-rounded:rounded-md theme-rounded:bg-sf-hi theme-rounded:hover:bg-sf-hst",
      "theme-sharp:text-pr-cont"
    ].join(' ') : [
      "w-10 h-16",
      "theme-default:rounded-lg theme-default:bg-sf-hi/80 theme-default:hover:bg-sf-hst",  
      "theme-rounded:rounded-xl theme-rounded:bg-sf-hi/80 theme-rounded:hover:bg-sf-hst",
      "theme-sharp:border theme-sharp:border-pr-cont"
    ].join(' ')
  );

  // Container styles
  const containerStyles = twMerge(
    layout === 'horizontal' ? [
      "flex items-center justify-between gap-2 mx-auto p-3 md:w-5/6",
      "absolute bottom-0 left-0 right-0 z-10"
    ].join(' ') : [
      "absolute inset-y-0 w-full",
      "flex items-center justify-between",
      "px-2 md:px-4",
      "pointer-events-none z-10"
    ].join(' ')
  );

  // Indicators styles
  const indicatorsContainerStyles = twMerge(
    "flex gap-1.5",
    layout === 'vertical' && "absolute bottom-4 left-1/2 -translate-x-1/2"
  );

  return (
    <div className={containerStyles}>
      <button
        onClick={onPrevious}
        className={twMerge(
          navigationButtonStyles,
          layout === 'vertical' && "pointer-events-auto"
        )}
        aria-label="Previous slide"
      >
        <ChevronUpIcon className={twMerge(
          "h-4 w-4 theme-sharp:h-8 theme-sharp:w-8",
          layout === 'horizontal' ? "-rotate-90" : "-rotate-0"
        )} />
      </button>

      <div className={indicatorsContainerStyles}>
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSlideSelect(idx)}
            className={twMerge(
              "transition-all pointer-events-auto",
              idx === currentSlide ? [
                "theme-default:w-1.5 theme-default:bg-tr-fix",
                "theme-rounded:w-2 theme-rounded:bg-tr-fix",
                "theme-sharp:border-pr-fix theme-sharp:w-2"
              ].join(' ') : [
                "theme-default:w-3.5 theme-default:bg-sf-hi",
                "theme-rounded:w-4 theme-rounded:bg-sf-hi",
                "theme-sharp:border-ol-var"
              ].join(' '),
              // Common height styles
              "theme-default:h-1.5 theme-default:rounded-full",
              "theme-rounded:h-3 theme-rounded:rounded-sm",
              "theme-sharp:h-2.5 theme-sharp:border-2",
              "hover:bg-pr-fix"
            )}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentSlide}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className={twMerge(
          navigationButtonStyles,
          layout === 'vertical' && "pointer-events-auto"
        )}
        aria-label="Next slide"
      >
        <ChevronUpIcon className={twMerge(
          "h-4 w-4 theme-sharp:h-8 theme-sharp:w-8",
          layout === 'horizontal' ? "rotate-90" : "rotate-180"
        )} />
      </button>
    </div>
  );
}