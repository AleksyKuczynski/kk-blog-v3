// src/main/components/Article/Carousel/utils/analyzeImageSet.ts

import { ImageAttributes, ImageSetAnalysis } from "@/main/lib/markdown/types";
import { calculateMedian, calculateVariance } from "./carouselUtils";

export function analyzeImageSet(
  images: Array<{ imageAttributes: ImageAttributes }>
): ImageSetAnalysis {
  // Calculate aspect ratios for all images
  const ratios = images.map(img => {
    const width = img.imageAttributes.width || 1200;
    const height = img.imageAttributes.height || 800;
    return width / height;
  });

  const medianRatio = calculateMedian(ratios);
  const averageRatio = ratios.reduce((a, b) => a + b) / ratios.length;
  
  // Initialize distribution
  const distribution = {
    landscape: 0,
    portrait: 0,
    square: 0
  };

  // Calculate distribution
  ratios.forEach(ratio => {
    if (ratio > 1.2) distribution.landscape++;
    else if (ratio < 0.8) distribution.portrait++;
    else distribution.square++;
  });

  // Convert to percentages
  const total = images.length;
  Object.keys(distribution).forEach(key => {
    distribution[key as keyof typeof distribution] = 
      (distribution[key as keyof typeof distribution] / total) * 100;
  });

  // Determine recommended mode based on distribution and variance
  const variance = calculateVariance(ratios);

  // If variance is high, prefer square mode for consistency
  if (variance > 0.3) {
    return {
      medianRatio,
      averageRatio,
      ratioDistribution: distribution,
      recommendedDisplayMode: 'square'
    };
  }

  // If there's a clear dominant orientation (>60%), use it
  if (distribution.landscape > 60) {
    return {
      medianRatio,
      averageRatio,
      ratioDistribution: distribution,
      recommendedDisplayMode: 'landscape'
    };
  }

  if (distribution.portrait > 60) {
    return {
      medianRatio,
      averageRatio,
      ratioDistribution: distribution,
      recommendedDisplayMode: 'portrait'
    };
  }

  // Otherwise use median ratio to decide
  return {
    medianRatio,
    averageRatio,
    ratioDistribution: distribution,
    recommendedDisplayMode: 
      medianRatio > 1.2 ? 'landscape' :
      medianRatio < 0.8 ? 'portrait' : 
      'square'
  };
}