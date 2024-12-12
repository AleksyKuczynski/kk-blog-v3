// src/main/components/Article/ImageCarousel.tsx
import { CarouselItem } from "@/main/lib/markdown/types";
import { CarouselContent } from "./CarouselContent";
import Image from 'next/image';

interface ImageCarouselProps {
  images: CarouselItem[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const carouselStyles = {
    container: [
      'relative w-full mb-8',
      'aspect-[16/9]',
      'theme-default:shadow-lg',
      'theme-rounded:shadow-xl theme-rounded:rounded-2xl theme-rounded:overflow-hidden',
      'theme-sharp:border-2 theme-sharp:border-prcolor'
    ].join(' '),
  };

  return (
    <div className={carouselStyles.container}>
      <CarouselContent images={images} />
    </div>
  );
}