// src/main/components/Article/Carousel/utils/carouselUtils.ts

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

export function getOptimalDisplayMode(
  recommendedMode: 'landscape' | 'portrait' | 'square',
  viewportWidth: number,
  viewportHeight: number
) {
  const { orientation, isMobile } = getViewportInfo(viewportWidth, viewportHeight);
  
  if (!isMobile) {
    // For larger screens, we can use any mode
    return recommendedMode;
  }

  // For mobile, enforce orientation constraints
  if (orientation === 'portrait') {
    // Portrait screen can't have landscape display
    return recommendedMode === 'landscape' ? 'square' : recommendedMode;
  } else {
    // Landscape screen can't have portrait display
    return recommendedMode === 'portrait' ? 'square' : recommendedMode;
  }
}

function getViewportInfo(viewportWidth: number, viewportHeight: number) {
  const orientation = viewportWidth > viewportHeight ? 'landscape' : 'portrait';
  const isMobile = viewportWidth <= 768;
  return { orientation, isMobile };
}