// src/main/components/Article/Carousel/utils/getVisibleIndexes.ts

export function getVisibleIndexes(currentIndex: number, totalSlides: number): number[] {
    if (totalSlides === 0) return [];
    
    const safeCurrentIndex = currentIndex % totalSlides;
    
    if (totalSlides === 2) {
      const baseIndex = safeCurrentIndex % 2;
      return [
        (baseIndex + 1) % 2,
        baseIndex,
        (baseIndex + 1) % 2
      ];
    }
  
    return [
      (safeCurrentIndex - 1 + totalSlides) % totalSlides,
      safeCurrentIndex,
      (safeCurrentIndex + 1) % totalSlides
    ];
  }