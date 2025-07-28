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
  | { type: 'TOGGLE_CAPTION'; index: number }
  | { type: 'TOGGLE_CAPTIONS_VISIBILITY' } // New action
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

    case 'TOGGLE_CAPTION': {
      // Only toggle expansion if captions are visible
      if (!state.captionsVisible) return state;
      
      return {
        ...state,
        images: state.images.map((img, idx) => 
          idx === action.index 
            ? { ...img, expandedCaption: !img.expandedCaption }
            : img
        )
      };
    }

    case 'TOGGLE_CAPTIONS_VISIBILITY': {
      return {
        ...state,
        captionsVisible: !state.captionsVisible,
        // Collapse all captions when hiding
        images: !state.captionsVisible 
          ? state.images 
          : state.images.map(img => ({ ...img, expandedCaption: false }))
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