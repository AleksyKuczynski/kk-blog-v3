// src/main/components/Article/Carousel/utils/getVisibleIndexes.ts

export function getVisibleIndexes(currentIndex: number, totalSlides: number): number[] {
    if (totalSlides === 0) return [];
    
    const safeCurrentIndex = currentIndex % totalSlides;
    
    if (totalSlides === 1) {
      // Single slide - show same slide in all positions
      return [0, 0, 0];
    }
    
    if (totalSlides === 2) {
      // 🔄 ENHANCED: Proper 2-slide infinite scroll
      // Current slide is always in center (position 0)
      // Other slide appears on both sides (positions -1 and +1)
      const currentSlide = safeCurrentIndex;
      const otherSlide = (safeCurrentIndex + 1) % 2;
      
      return [
        otherSlide,    // Left position (-1): the other slide
        currentSlide,  // Center position (0): current slide  
        otherSlide     // Right position (+1): the other slide (duplicate)
      ];
    }
  
    // 3+ slides - normal infinite scroll
    return [
      (safeCurrentIndex - 1 + totalSlides) % totalSlides,
      safeCurrentIndex,
      (safeCurrentIndex + 1) % totalSlides
    ];
  }