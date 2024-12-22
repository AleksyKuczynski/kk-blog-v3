// src/main/components/Article/Carousel/utils/calculateCaptionDimensions.ts

import { CaptionDimensions, CarouselItem } from "@/main/lib/markdown/types";

interface CaptionCalculation {
  captionStates: { 
    [index: number]: CaptionDimensions 
  };
  shouldCollapseAll: boolean;
}

export function calculateCaptionDimensions(
  activeItems: CarouselItem[],
  containerWidth: number,
  maxHeight: number
): CaptionCalculation {
  // Constants for caption sizing
  const LINE_HEIGHT = 24; // Line height in pixels
  const MAX_COLLAPSED_LINES = 4;
  const PADDING = 32; // Total padding (top + bottom)
  
  // Track maximum actual height for collapse decision
  let maxActualHeight = 0;
  
  // Calculate dimensions for each caption
  const dimensions: { [index: number]: CaptionDimensions } = {};
  
  activeItems.forEach((item, idx) => {
    if (!item.processedCaption) {
      dimensions[idx] = {
        actualHeight: 0,
        collapsedHeight: 0,
        isExpandable: false
      };
      return;
    }

    // Estimate number of lines based on content
    // Using rough estimate of characters per line
    const estimatedLines = Math.ceil(
      (item.processedCaption.length * 0.5 * LINE_HEIGHT) / containerWidth
    );
    
    // Calculate heights
    const actualHeight = estimatedLines * LINE_HEIGHT + PADDING;
    const collapsedHeight = Math.min(
      MAX_COLLAPSED_LINES * LINE_HEIGHT + PADDING,
      actualHeight
    );
    
    // Track maximum height for collapse decision
    maxActualHeight = Math.max(maxActualHeight, actualHeight);
    
    dimensions[idx] = {
      actualHeight,
      collapsedHeight,
      isExpandable: estimatedLines > MAX_COLLAPSED_LINES
    };
  });

  // Decide if all captions should start collapsed
  // If any caption would take more than 40% of available height
  const shouldCollapseAll = maxActualHeight > maxHeight * 0.4;

  return {
    captionStates: dimensions,
    shouldCollapseAll
  };
}