// src/main/components/Article/Carousel/carouselReducer.ts
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";

interface CarouselState {
  currentIndex: number;
  direction: 'next' | 'prev' | null;
  touchStart?: number;
  images: CarouselItem[];
  isTransitioning: boolean;
}

type CarouselAction =
  | { type: 'NEXT_SLIDE' }
  | { type: 'PREV_SLIDE' }
  | { type: 'SET_SLIDE'; index: number }
  | { type: 'TOUCH_START'; x: number }
  | { type: 'TOUCH_END'; endX: number }
  | { type: 'TOGGLE_CAPTION'; index: number }
  | { type: 'TRANSITION_END' };

const SWIPE_THRESHOLD = 50;

export function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  const totalSlides = state.images.length;

  switch (action.type) {
    case 'NEXT_SLIDE':
      // Don't change currentIndex immediately - wait for animation
      if (state.isTransitioning) return state; // Prevent multiple transitions
      
      return {
        ...state,
        direction: 'next',
        isTransitioning: true
      };

    case 'PREV_SLIDE':
      // Don't change currentIndex immediately - wait for animation
      if (state.isTransitioning) return state; // Prevent multiple transitions
      
      return {
        ...state,
        direction: 'prev',
        isTransitioning: true
      };

    case 'SET_SLIDE':
      if (state.isTransitioning || action.index === state.currentIndex) return state;
      
      // Better direction detection for indicator clicks
      let direction: 'next' | 'prev';
      
      if (totalSlides === 2) {
        // For 2 slides, any change is just a toggle
        direction = 'next'; // Default to next for consistency
      } else {
        // For 3+ slides, calculate shortest path considering infinite scroll
        const currentIndex = state.currentIndex;
        const targetIndex = action.index;
        
        const forwardDistance = (targetIndex - currentIndex + totalSlides) % totalSlides;
        const backwardDistance = (currentIndex - targetIndex + totalSlides) % totalSlides;
        
        direction = forwardDistance <= backwardDistance ? 'next' : 'prev';
      }
      
      return {
        ...state,
        direction,
        isTransitioning: true
      };

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
        isTransitioning: true
      };
    }

    case 'TOGGLE_CAPTION': {
      return {
        ...state,
        images: state.images.map((img, idx) => 
          idx === action.index 
            ? { ...img, expandedCaption: !img.expandedCaption }
            : img
        )
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