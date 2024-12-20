// src/main/components/Article/Carousel/NavigationButtons.tsx
import { ChevronUpIcon } from '@/main/components/Interface/Icons';
import { twMerge } from 'tailwind-merge';

interface NavigationButtonsProps {
  totalSlides: number;
  currentSlide: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideSelect: (index: number) => void;
}

export function NavigationButtons({
  totalSlides,
  currentSlide,
  onPrevious,
  onNext,
  onSlideSelect,
}: NavigationButtonsProps) {
  const buttonStyles = twMerge(
    "flex items-center justify-center transition-colors duration-200",
    "theme-default:w-8 theme-default:h-8 theme-default:rounded-full",
    "theme-default:bg-sf-hi theme-default:hover:bg-sf-hst",
    "theme-rounded:w-8 theme-rounded:h-8 theme-rounded:rounded-md",
    "theme-rounded:bg-sf-hi theme-rounded:hover:bg-sf-hst",
    "theme-sharp:text-pr-cont"
  );

  const iconStyles = twMerge(
    "h-4 w-4",
    "theme-sharp:h-8 theme-sharp:w-8"
  );

  return (
    <div className="flex items-center justify-between gap-2 mx-auto p-4 md:w-5/6 z-50">
      <button
        onClick={onPrevious}
        className={buttonStyles}
        aria-label="Previous slide"
      >
        <ChevronUpIcon className={twMerge("-rotate-90", iconStyles)} />
      </button>

      <div className="flex gap-1.5">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSlideSelect(idx)}
            className={twMerge(
              "transition-all",
              "theme-default:w-3.5 theme-default:h-1.5 theme-default:rounded-full theme-default:bg-sf-hi hover:bg-pr-fix",
              "theme-rounded:w-4 theme-rounded:h-3 theme-rounded:rounded-sm theme-rounded:bg-sf-hi hover:bg-pr-fix",
              "theme-sharp:w-4 theme-sharp:h-2.5 theme-sharp:border-2 theme-sharp:border-ol-var",
              idx === currentSlide && "theme-default:w-1.5 theme-default:bg-tr-fix theme-rounded:w-2 theme-rounded:bg-tr-fix theme-sharp:border-pr-fix theme-sharp:w-2"
            )}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentSlide}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className={buttonStyles}
        aria-label="Next slide"
      >
        <ChevronUpIcon className={twMerge("rotate-90", iconStyles)} />
      </button>
    </div>
  );
}