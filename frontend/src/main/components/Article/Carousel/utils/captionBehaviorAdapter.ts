// src/main/components/Article/Carousel/utils/captionBehaviorAdapter.ts

import { CarouselItem } from '@/main/lib/markdown/markdownTypes';
import { CarouselItemWithBehavior, createInitialCaptionBehavior } from '../../Captions';

/**
 * Converts simplified markdown CarouselItem to client-side CarouselItemWithBehavior
 * This adapter bridges markdown-time parsing and client-side behavior detection
 */
export function adaptCarouselItemsWithBehavior(items: CarouselItem[]): CarouselItemWithBehavior[] {
  return items.map((item, index) => {
    const hasContent = Boolean(item.processedCaption && item.processedCaption.trim() !== '');
    const behavior = createInitialCaptionBehavior(hasContent);
    
    const result: CarouselItemWithBehavior = {
      type: item.type,
      imageAttributes: item.imageAttributes,
      caption: item.caption,
      processedCaption: item.processedCaption || '', // Ensure it's always a string
      captionBehavior: behavior
    };
    
    return result;
  });
}

/**
 * Helper to determine if any items have captions
 */
export function hasAnyCaptions(items: CarouselItem[]): boolean {
  return items.some(item => item.processedCaption && item.processedCaption.trim() !== '');
}

/**
 * Helper to count items with captions
 */
export function getCaptionCount(items: CarouselItem[]): number {
  return items.filter(item => item.processedCaption && item.processedCaption.trim() !== '').length;
}