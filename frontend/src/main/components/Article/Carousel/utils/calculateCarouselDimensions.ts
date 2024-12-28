// src/main/components/Article/Carousel/utils/calculateCarouselDimensions.ts
import { 
  BreakpointDimensions, 
  ImageSetAnalysis,
  ViewportBreakpoint
} from "../carouselTypes";
import { getViewportBreakpoint } from "./viewportUtils";
import { BREAKPOINT_CONSTRAINTS } from "./breakpointConstraints";
import { calculateOptimalRatio } from "./calculateOptimalRatio";

interface CarouselDimensionsInput {
  analysis: ImageSetAnalysis;
  viewportWidth: number;
  viewportHeight: number;
  mediaRatios: number[];
}

export function calculateCarouselDimensions({
  analysis,
  viewportWidth,
  viewportHeight,
  mediaRatios
}: CarouselDimensionsInput): BreakpointDimensions {
  const breakpoint = getViewportBreakpoint(viewportWidth, viewportHeight);
  const constraints = BREAKPOINT_CONSTRAINTS[breakpoint];
  
  // Oblicz optymalną proporcję bazując na analizie
  const ratio = calculateOptimalRatio({
    breakpoint,
    mediaRatios,
    stats: analysis.statistics || {
      mean: analysis.averageRatio,
      median: analysis.medianRatio,
      variance: 0,
      min: Math.min(...mediaRatios),
      max: Math.max(...mediaRatios)
    },
    dominantOrientation: analysis.dominance.orientation
  });
  
  // Określ tryb wyświetlania
  const imageDisplayMode = 
    analysis.consistency === 'high' && analysis.dominance.level === 'strong'
      ? analysis.dominance.orientation === 'landscape' 
        ? 'center-horizontal'
        : analysis.dominance.orientation === 'portrait'
          ? 'center-vertical'
          : 'square'
      : ratio > 1.2 
        ? 'center-horizontal'
        : ratio < 0.8 
          ? 'center-vertical'
          : 'square';

  return {
    ratio,
    maxHeight: constraints.maxHeight,
    imageDisplayMode
  };
}