// src/main/components/Article/Carousel/carouselReducer.ts
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";

export interface CarouselState {
  currentIndex: number;
  images: CarouselItem[];
  direction: 'next' | 'prev' | null;
  touchStart?: number;
  isTransitioning: boolean;
  captionsVisible: boolean; // New state for caption visibility
}

type CarouselAction = 
  | { type: 'NEXT_SLIDE' }
  | { type: 'PREV_SLIDE' }
  | { type: 'SET_SLIDE'; index: number }
  | { type: 'TOUCH_START'; x: number }
  | { type: 'TOUCH_END'; endX: number }
  | { type: 'TOGGLE_CAPTION_DIRECT'; index: number } // NEW: Click on caption
  | { type: 'TOGGLE_CAPTION_FRAME'; index: number }  // NEW: Click on frame  
  | { type: 'TOGGLE_CAPTIONS_VISIBILITY' }
  | { type: 'TRANSITION_END' };

const SWIPE_THRESHOLD = 50;

export function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  const totalSlides = state.images.length;

  switch (action.type) {
    case 'NEXT_SLIDE':
      if (state.isTransitioning) return state;
      
      return {
        ...state,
        direction: 'next',
        isTransitioning: true,
        captionsVisible: true // Show captions when changing slides
      };

    case 'PREV_SLIDE':
      if (state.isTransitioning) return state;
      
      return {
        ...state,
        direction: 'prev',
        isTransitioning: true,
        captionsVisible: true // Show captions when changing slides
      };

    case 'SET_SLIDE': {
      if (action.index === state.currentIndex || state.isTransitioning) {
        return state;
      }

      const direction: 'next' | 'prev' = action.index > state.currentIndex 
        ? 'next' : 'prev';
      
      return {
        ...state,
        direction,
        isTransitioning: true,
        captionsVisible: true // Show captions when changing slides
      };
    }

    case 'TOUCH_START':
      return {
        ...state,
        touchStart: action.x,
        direction: null
      };

    case 'TOUCH_END': {
      if (typeof state.touchStart === 'undefined' || state.isTransitioning) {
        return state;
      }

      const diff = action.endX - state.touchStart;
      if (Math.abs(diff) < SWIPE_THRESHOLD) {
        return {
          ...state,
          touchStart: undefined
        };
      }

      const direction = diff > 0 ? 'prev' : 'next';

      return {
        ...state,
        direction,
        touchStart: undefined,
        isTransitioning: true,
        captionsVisible: true // Show captions when changing slides
      };
    }

    case 'TOGGLE_CAPTION_DIRECT': {
      if (!state.captionsVisible) return state;
      
      return {
        ...state,
        images: state.images.map((img, idx) => {
          if (idx !== action.index) return img;
          
          // Big captions: minimized ↔ expanded (component determines if it's big)
          if (img.captionState === 'minimized') {
            return { ...img, captionState: 'expanded' };
          } else if (img.captionState === 'expanded') {
            return { ...img, captionState: 'minimized' };
          }
          return img;
        })
      };
    }

    case 'TOGGLE_CAPTION_FRAME': {
      if (!state.captionsVisible) return state;
      
      return {
        ...state,
        images: state.images.map((img, idx) => {
          if (idx !== action.index) return img;
          
          // Frame click: visible state ↔ collapsed
          if (img.captionState === 'collapsed') {
            return { ...img, captionState: 'minimized' }; // Restore to initial
          } else {
            return { ...img, captionState: 'collapsed' }; // Hide
          }
        })
      };
    }

    case 'TOGGLE_CAPTIONS_VISIBILITY': {
      return {
        ...state,
        captionsVisible: !state.captionsVisible,
        images: !state.captionsVisible 
          ? state.images.map(img => ({ ...img, captionState: 'minimized' })) // Reset to initial
          : state.images
      };
    }

    case 'TRANSITION_END':
      // Update currentIndex AFTER animation completes
      if (!state.isTransitioning || !state.direction) return state;
      
      const newCurrentIndex = state.direction === 'next'
        ? (state.currentIndex + 1) % totalSlides
        : (state.currentIndex - 1 + totalSlides) % totalSlides;
      
      return {
        ...state,
        currentIndex: newCurrentIndex,
        direction: null,
        isTransitioning: false
      };

    default:
      return state;
  }
}