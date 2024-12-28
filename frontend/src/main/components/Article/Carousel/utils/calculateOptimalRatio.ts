// src/main/components/Article/Carousel/utils/calculateOptimalRatio.ts

import { BREAKPOINT_CONSTRAINTS } from "./breakpointConstraints";
import { ViewportBreakpoint, AspectRatioStats } from "../carouselTypes";

interface RatioCalculationParams {
  breakpoint: ViewportBreakpoint;
  mediaRatios: number[];
  stats: AspectRatioStats;
  dominantOrientation: 'landscape' | 'portrait' | 'square';
}

function enforceBreakpointConstraints(
  ratio: number, 
  breakpoint: ViewportBreakpoint
): number {
  const { maxRatio, minRatio, maxWidth, maxHeight } = BREAKPOINT_CONSTRAINTS[breakpoint];
  
  // Calculate maximum possible ratio based on container constraints
  const containerRatio = maxWidth / maxHeight;
  const effectiveMaxRatio = Math.min(maxRatio, containerRatio);
  
  // Enforce breakpoint-specific constraints
  if (breakpoint === 'mobile-portrait' && ratio > 1) {
    return 1; // Force square if trying to go landscape
  }
  if (breakpoint === 'mobile-landscape' && ratio < 1) {
    return 1; // Force square if trying to go portrait
  }
  
  return Math.min(Math.max(ratio, minRatio), effectiveMaxRatio);
}

function calculateAverageRatio(
  mediaRatios: number[], 
  breakpoint: ViewportBreakpoint
): number {
  // Filter ratios based on breakpoint constraints
  const validRatios = mediaRatios.map(ratio => 
    enforceBreakpointConstraints(ratio, breakpoint)
  );
  
  return validRatios.reduce((sum, ratio) => sum + ratio, 0) / validRatios.length;
}

export function calculateOptimalRatio({
  breakpoint,
  mediaRatios,
  stats,
  dominantOrientation
}: RatioCalculationParams): number {
  const constraints = BREAKPOINT_CONSTRAINTS[breakpoint];
  
  // For single image, just enforce constraints
  if (mediaRatios.length === 1) {
    return enforceBreakpointConstraints(mediaRatios[0], breakpoint);
  }
  
  // Start with preferred ratio based on orientation
  let optimalRatio = constraints.preferredRatio;
  
  // Adjust based on dominant orientation if variance is low
  if (stats.variance < 0.1) {
    switch (dominantOrientation) {
      case 'landscape':
        optimalRatio = Math.min(stats.median, constraints.maxRatio);
        break;
      case 'portrait':
        optimalRatio = Math.max(stats.median, constraints.minRatio);
        break;
      case 'square':
        optimalRatio = 1;
        break;
    }
  } else {
    // For mixed sets, use average while respecting constraints
    optimalRatio = calculateAverageRatio(mediaRatios, breakpoint);
  }
  
  // Final enforcement of constraints
  return enforceBreakpointConstraints(optimalRatio, breakpoint);
}