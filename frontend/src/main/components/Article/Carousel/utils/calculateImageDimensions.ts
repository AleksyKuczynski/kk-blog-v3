// src/main/components/Article/Carousel/utils/calculateImageDimensions.ts

import { ImageSetAnalysis } from "@/main/lib/markdown/types";
import { getOptimalDisplayMode } from "./carouselUtils";


interface DisplayConstraints {
  maxWidth: number;
  maxHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  isMobile: boolean;
}

interface ImageDimensions {
  width: number;
  height: number;
  displayMode: 'center-horizontal' | 'center-vertical' | 'square';
}

export function calculateImageDimensions(
  analysis: ImageSetAnalysis,
  constraints: DisplayConstraints
): ImageDimensions {
  const { maxWidth, maxHeight, viewportWidth, viewportHeight } = constraints;

  // Get optimal display mode based on viewport and analysis
  const displayMode = getOptimalDisplayMode(
    analysis.recommendedDisplayMode,
    viewportWidth,
    viewportHeight
  );

  // Calculate dimensions based on display mode
  let width = maxWidth;
  let height: number;

  switch(displayMode) {
    case 'landscape':
      // Use 16:9 ratio for landscape
      height = Math.min(width * 0.5625, maxHeight);
      // If height is constrained, adjust width to maintain ratio
      if (height === maxHeight) {
        width = height / 0.5625;
      }
      break;

    case 'portrait':
      // Use 4:5 ratio for portrait
      height = Math.min(width * 1.25, maxHeight);
      if (height === maxHeight) {
        width = height / 1.25;
      }
      break;

    case 'square':
    default:
      // For square, use equal dimensions
      height = Math.min(width, maxHeight);
      if (height === maxHeight) {
        width = height;
      }
      break;
  }

  return {
    width,
    height,
    displayMode: displayMode === 'landscape' ? 'center-horizontal' :
                 displayMode === 'portrait' ? 'center-vertical' : 'square'
  };
}