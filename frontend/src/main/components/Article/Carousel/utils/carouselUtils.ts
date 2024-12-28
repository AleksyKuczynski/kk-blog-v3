// src/main/components/Article/Carousel/utils/carouselUtils.ts

import { ImageSetAnalysis } from "../carouselTypes";

export function calculateMedian(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

export function calculateVariance(numbers: number[]): number {
  const mean = numbers.reduce((a, b) => a + b) / numbers.length;
  const squareDiffs = numbers.map(value => {
    const diff = value - mean;
    return diff * diff;
  });
  return Math.sqrt(squareDiffs.reduce((a, b) => a + b) / numbers.length);
}


function getViewportInfo(viewportWidth: number, viewportHeight: number) {
  const orientation = viewportWidth > viewportHeight ? 'landscape' : 'portrait';
  const isMobile = viewportWidth <= 768;
  return { orientation, isMobile };
}

export function determineNavigationLayout(
  viewportWidth: number, 
  viewportHeight: number,
  imageAnalysis: ImageSetAnalysis
): 'horizontal' | 'vertical' {
  console.log('Layout detection:', {
    viewportWidth,
    viewportHeight,
    isLandscape: viewportWidth > viewportHeight,
    imageMode: imageAnalysis.recommendedDisplayMode,
  });

  // Landscape mobile/tablet
  if (viewportWidth <= 1024 && viewportWidth > viewportHeight) {
    console.log('Returning vertical due to landscape mobile/tablet');
    return 'vertical';
  }

  // Desktop
  if (viewportWidth > 1024) {
    const layout = imageAnalysis.recommendedDisplayMode === 'portrait' 
      ? 'vertical' 
      : 'horizontal';
    console.log('Desktop layout:', layout);
    return layout;
  }

  console.log('Returning default horizontal');
  return 'horizontal';
}