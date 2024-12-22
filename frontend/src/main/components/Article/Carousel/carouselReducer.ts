// src/main/components/Article/Carousel/carouselReducer.ts

import { CarouselDimensions, CarouselItem } from "@/main/lib/markdown/types";

interface CarouselState {
  currentIndex: number;
  direction: 'next' | 'prev' | null;
  touchStart?: number;
  dimensions: CarouselDimensions | null;
  images: CarouselItem[];
}

type CarouselAction =
  | { type: 'NEXT_SLIDE'; payload: { totalSlides: number } }
  | { type: 'PREV_SLIDE'; payload: { totalSlides: number } }
  | { type: 'SET_SLIDE'; payload: { index: number } }
  | { type: 'TOUCH_START'; payload: { x: number } }
  | { type: 'TOUCH_END'; payload: { endX: number; totalSlides: number } }
  | { type: 'UPDATE_DIMENSIONS'; payload: CarouselDimensions }
  | { type: 'TOGGLE_CAPTION'; payload: { index: number } };

const SWIPE_THRESHOLD = 50;

export const initialCarouselState: CarouselState = {
  currentIndex: 0,
  direction: null,
  touchStart: undefined,
  dimensions: null,
  images: []
};

function getNextIndex(current: number, direction: 'next' | 'prev', total: number): number {
  if (total === 2) {
    // Dla 2 slajdów zawsze przełączamy między 0 i 1
    return current === 0 ? 1 : 0;
  }

  // Standardowa logika dla 3+ slajdów
  return direction === 'next'
    ? (current + 1) % total
    : (current - 1 + total) % total;
}

export function carouselReducer(
  state: CarouselState,
  action: CarouselAction
): CarouselState {
  switch (action.type) {
    case 'NEXT_SLIDE':
      return {
        ...state,
        currentIndex: getNextIndex(state.currentIndex, 'next', action.payload.totalSlides),
        direction: 'next'
      };

    case 'PREV_SLIDE':
      return {
        ...state,
        currentIndex: getNextIndex(state.currentIndex, 'prev', action.payload.totalSlides),
        direction: 'prev'
      };

    case 'SET_SLIDE':
      return {
        ...state,
        currentIndex: action.payload.index,
        direction: action.payload.index > state.currentIndex ? 'next' : 'prev'
      };

    case 'TOUCH_START':
      return {
        ...state,
        touchStart: action.payload.x
      };

    case 'TOUCH_END': {
      if (typeof state.touchStart === 'undefined') {
        return state;
      }

      const diff = action.payload.endX - state.touchStart;
      if (Math.abs(diff) < SWIPE_THRESHOLD) {
        return {
          ...state,
          touchStart: undefined
        };
      }

      const direction = diff > 0 ? 'prev' : 'next';
      return {
        ...state,
        currentIndex: getNextIndex(
          state.currentIndex, 
          direction, 
          action.payload.totalSlides
        ),
        direction,
        touchStart: undefined
      };
    }

    case 'UPDATE_DIMENSIONS':
      return {
        ...state,
        dimensions: action.payload
      };

    case 'TOGGLE_CAPTION':
      return {
        ...state,
        images: state.images.map((image, i) => 
          i === action.payload.index 
            ? { ...image, expanded: !image.expandedCaption }
            : image
        )
      };

    default:
      return state;
  }
}