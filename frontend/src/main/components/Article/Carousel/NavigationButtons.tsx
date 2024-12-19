// src/main/components/Article/Carousel/NavigationButtons.tsx
import { ChevronUpIcon } from '@/main/components/Interface/Icons';
import { twMerge } from 'tailwind-merge';

interface NavigationButtonsProps {
  totalSlides: number;
  currentSlide: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideSelect: (index: number) => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export function NavigationButtons({
  totalSlides,
  currentSlide,
  onPrevious,
  onNext,
  onSlideSelect,
  canGoPrev,
  canGoNext
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between gap-2 py-4">
      <button
        onClick={onPrevious}
        disabled={!canGoPrev}
        className={twMerge(
          "flex items-center justify-center transition-colors duration-200",
          "theme-default:w-8 theme-default:h-8 theme-default:rounded-full",
          "theme-default:bg-bgcolor theme-default:hover:bg-bgcolor-alt"
        )}
        aria-label="Previous slide"
      >
        <ChevronUpIcon className={twMerge(
          "h-4 w-4 -rotate-90",
          !canGoPrev && "opacity-50"
        )} />
      </button>

      <div className="flex gap-1.5">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSlideSelect(idx)}
            className={twMerge(
              "w-1.5 h-1.5 rounded-full transition-all",
              "theme-default:bg-bgcolor hover:bg-bgcolor-alt",
              idx === currentSlide && "w-2 theme-default:bg-prcolor"
            )}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentSlide}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={twMerge(
          "flex items-center justify-center transition-colors duration-200",
          "theme-default:w-8 theme-default:h-8 theme-default:rounded-full",
          "theme-default:bg-bgcolor theme-default:hover:bg-bgcolor-alt"
        )}
        aria-label="Next slide"
      >
        <ChevronUpIcon className={twMerge(
          "h-4 w-4 rotate-90",
          !canGoNext && "opacity-50"
        )} />
      </button>
    </div>
  );
}