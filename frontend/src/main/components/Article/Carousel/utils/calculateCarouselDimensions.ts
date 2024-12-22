// src/main/components/Article/Carousel/utils/calculateCarouselDimensions.ts
import { BreakpointDimensions, ImageSetAnalysis } from "@/main/lib/markdown/types";
import { getViewportBreakpoint } from "./viewportUtils";
import { BREAKPOINT_CONSTRAINTS } from "./breakpointConstraints";
import { calculateOptimalRatio } from "./calculateOptimalRatio";

export function calculateCarouselDimensions(
  analysis: ImageSetAnalysis,
  viewportWidth: number,
  viewportHeight: number,
  mediaRatios: number[]
): BreakpointDimensions {
  const breakpoint = getViewportBreakpoint(viewportWidth, viewportHeight);
  const constraints = BREAKPOINT_CONSTRAINTS[breakpoint];
  
  const ratio = calculateOptimalRatio(analysis.medianRatio, breakpoint, mediaRatios);
  
  return {
    ratio,
    maxHeight: constraints.maxHeight,
    imageDisplayMode: 
      ratio > 1.2 ? 'center-horizontal' :
      ratio < 0.8 ? 'center-vertical' :
      'square'
  };
}