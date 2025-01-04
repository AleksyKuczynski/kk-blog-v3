// src/main/components/Article/Carousel/utils/analyzeImageSet.ts

import { ImageAttributes } from "@/main/lib/markdown/markdownTypes";
import { AspectRatioOrientation, AspectRatioStats, DominanceLevel, ImageSetAnalysis } from "../carouselTypes";

const RATIO_THRESHOLDS = {
  LANDSCAPE: 1.2,    // Above this is landscape
  PORTRAIT: 0.8,     // Below this is portrait
  VARIANCE: {
    LOW: 0.05,       // Very consistent ratios
    MEDIUM: 0.15     // Moderately consistent ratios
  },
  DOMINANCE: {
    STRONG: 0.75,    // 75% or more of one orientation
    MODERATE: 0.6    // 60% or more of one orientation
  }
} as const;

function calculateImageStats(ratios: number[]): AspectRatioStats {
  const sorted = [...ratios].sort((a, b) => a - b);
  const length = sorted.length;
  const mean = ratios.reduce((sum, ratio) => sum + ratio, 0) / length;
  
  // Calculate median without creating additional arrays
  const median = length % 2 === 0
    ? (sorted[length / 2 - 1] + sorted[length / 2]) / 2
    : sorted[Math.floor(length / 2)];
  
  // Calculate variance in a single pass
  const variance = ratios.reduce((sum, ratio) => {
    const diff = ratio - mean;
    return sum + (diff * diff);
  }, 0) / length;

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean,
    median,
    variance
  };
}

function getOrientation(ratio: number): AspectRatioOrientation {
  if (ratio > RATIO_THRESHOLDS.LANDSCAPE) return 'landscape';
  if (ratio < RATIO_THRESHOLDS.PORTRAIT) return 'portrait';
  return 'square';
}

function calculateDistribution(ratios: number[]): Record<AspectRatioOrientation, number> {
  const counts = { landscape: 0, portrait: 0, square: 0 };
  const total = ratios.length;

  ratios.forEach(ratio => {
    counts[getOrientation(ratio)]++;
  });

  return {
    landscape: counts.landscape / total,
    portrait: counts.portrait / total,
    square: counts.square / total
  };
}

function analyzeDominance(distribution: Record<AspectRatioOrientation, number>): {
  level: DominanceLevel;
  orientation: AspectRatioOrientation;
} {
  const orientations: AspectRatioOrientation[] = ['landscape', 'portrait', 'square'];
  const maxCount = Math.max(...Object.values(distribution));
  const dominant = orientations.find(o => distribution[o] === maxCount) || 'square';

  let level: DominanceLevel;
  if (maxCount >= RATIO_THRESHOLDS.DOMINANCE.STRONG) {
    level = 'strong';
  } else if (maxCount >= RATIO_THRESHOLDS.DOMINANCE.MODERATE) {
    level = 'moderate';
  } else {
    level = 'mixed';
  }

  return { level, orientation: dominant };
}

function determineRecommendedMode(
  stats: AspectRatioStats, 
  dominance: { level: DominanceLevel; orientation: AspectRatioOrientation }
): AspectRatioOrientation {
  // For very consistent sets, trust the dominance
  if (stats.variance < RATIO_THRESHOLDS.VARIANCE.LOW && dominance.level !== 'mixed') {
    return dominance.orientation;
  }

  // For moderately consistent sets with strong dominance
  if (stats.variance < RATIO_THRESHOLDS.VARIANCE.MEDIUM && dominance.level === 'strong') {
    return dominance.orientation;
  }

  // For mixed or inconsistent sets, prefer square
  return 'square';
}

export function analyzeImageSet(images: Array<{ imageAttributes: ImageAttributes }>): ImageSetAnalysis {
  // Calculate ratios in a single pass
  const ratios = images.map(img => {
    const width = img.imageAttributes.width || 1200;
    const height = img.imageAttributes.height || 800;
    return width / height;
  });

  const stats = calculateImageStats(ratios);
  const distribution = calculateDistribution(ratios);
  const dominance = analyzeDominance(distribution);

  return {
    medianRatio: stats.median,
    averageRatio: stats.mean,
    ratioDistribution: distribution,
    recommendedDisplayMode: determineRecommendedMode(stats, dominance),
    statistics: stats,
    dominance,
    consistency: stats.variance < RATIO_THRESHOLDS.VARIANCE.LOW ? 'high' 
               : stats.variance < RATIO_THRESHOLDS.VARIANCE.MEDIUM ? 'medium' 
               : 'low'
  };
}