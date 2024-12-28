// src/main/components/Article/Carousel/utils/carouselTypes.ts

export interface BreakpointDimensions {
    ratio: number;
    maxHeight: number;
    imageDisplayMode: 'center-horizontal' | 'center-vertical' | 'square';
  }
  
  export interface CarouselDimensions extends BreakpointDimensions {
    breakpointDimensions: BreakpointDimensions[];
  }

  export type NavigationLayout = 'horizontal' | 'vertical';

  export type AspectRatioOrientation = 'landscape' | 'portrait' | 'square';
  export type DominanceLevel = 'strong' | 'moderate' | 'mixed';
  
  export interface AspectRatioStats {
    min: number;
    max: number;
    mean: number;
    median: number;
    variance: number;
  }
  
  export interface ImageSetAnalysis {
    medianRatio: number;
    averageRatio: number;
    ratioDistribution: {
      landscape: number;
      portrait: number;
      square: number;
    };
    recommendedDisplayMode: 'landscape' | 'portrait' | 'square';
    statistics?: AspectRatioStats;
    dominance: {
      level: DominanceLevel;
      orientation: AspectRatioOrientation;
    };
    consistency: 'high' | 'medium' | 'low';
  }
  
  export interface BreakpointConstraints {
    maxRatio: number;
    minRatio: number;
    maxHeight: number;
    preferredRatio: number;
    maxWidth: number;
  }

  export type ViewportBreakpoint = 
  | 'mobile-portrait' 
  | 'mobile-landscape'
  | 'tablet-portrait'
  | 'tablet-landscape'
  | 'desktop-portrait'
  | 'desktop-landscape';
