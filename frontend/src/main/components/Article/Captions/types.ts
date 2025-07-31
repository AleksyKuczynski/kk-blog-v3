// src/main/components/Article/Captions/Caption/types.ts

// Client-side caption behavior (determined by actual rendered height)
export type CaptionMode = 'static' | 'expandable';

// Caption states - different meanings based on mode
export type CaptionState = 'expanded' | 'minimized' | 'collapsed';

// Static captions: expanded (visible, natural height) | collapsed (hidden)
// Expandable captions: minimized (3 lines) | expanded (up to 80%) | collapsed (hidden)

export interface CaptionBehavior {
  mode: CaptionMode;
  state: CaptionState;
  hasContent: boolean; // True if caption exists and is not empty
}

// Combined carousel item with client-side caption behavior
export interface CarouselItemWithBehavior {
  type: 'image' | 'figure';
  imageAttributes: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    title?: string;
    filename?: string;
  };
  caption?: string;
  processedCaption: string;
  captionBehavior: CaptionBehavior;
}

// Utility functions for caption behavior
export const createInitialCaptionBehavior = (hasContent: boolean): CaptionBehavior => ({
  mode: 'static', // Will be detected client-side
  state: hasContent ? 'expanded' : 'collapsed', // Static: start expanded, Expandable: start minimized
  hasContent
});

export const getInitialStateForMode = (mode: CaptionMode, hasContent: boolean): CaptionState => {
  if (!hasContent) return 'collapsed';
  return mode === 'static' ? 'expanded' : 'minimized';
};

export const isInteractable = (behavior: CaptionBehavior): boolean => {
  return behavior.hasContent; // Any caption with content is interactable
};

export const isClickableCaption = (behavior: CaptionBehavior): boolean => {
  return behavior.mode === 'expandable' && behavior.hasContent;
};