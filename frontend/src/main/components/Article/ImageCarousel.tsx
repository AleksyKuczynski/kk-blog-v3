// src/main/components/Article/ImageCarousel.tsx
import { CarouselItem } from "@/main/lib/markdown/types";
import { CarouselContent } from "./CarouselContent";
import { twMerge } from "tailwind-merge";

interface ImageCarouselProps {
  images: CarouselItem[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const carouselStyles = twMerge(
    'relative w-full mb-8',
    'aspect-[16/9]',
    'theme-default:shadow-lg',
    'theme-rounded:shadow-xl theme-rounded:rounded-2xl theme-rounded:overflow-hidden',
    'theme-sharp:border-2 theme-sharp:border-prcolor'
  );

  return (
    <div className={carouselStyles}>
      <CarouselContent images={images} />
    </div>
  );
}
