// src/main/components/Article/Carousel/carouselReducer.ts
import { CarouselItem } from "@/main/lib/markdown/types";
import { CarouselDimensions } from "./carouselTypes";

interface CarouselState {
  currentIndex: number;
  direction: 'next' | 'prev' | null;
  touchStart?: number;
  images: CarouselItem[];
}

type CarouselAction =
  | { type: 'NEXT_SLIDE' }
  | { type: 'PREV_SLIDE' }
  | { type: 'SET_SLIDE'; index: number }
  | { type: 'TOUCH_START'; x: number }
  | { type: 'TOUCH_END'; endX: number }
  | { type: 'TOGGLE_CAPTION'; index: number };

const SWIPE_THRESHOLD = 50;

export function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  const totalSlides = state.images.length;

  switch (action.type) {
    case 'NEXT_SLIDE':
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % totalSlides,
        direction: 'next'
      };

    case 'PREV_SLIDE':
      return {
        ...state,
        currentIndex: (state.currentIndex - 1 + totalSlides) % totalSlides,
        direction: 'prev'
      };

    case 'SET_SLIDE':
      return {
        ...state,
        currentIndex: action.index,
        direction: action.index > state.currentIndex ? 'next' : 'prev'
      };

    case 'TOUCH_START':
      return {
        ...state,
        touchStart: action.x,
        direction: null
      };

    case 'TOUCH_END': {
      if (typeof state.touchStart === 'undefined') {
        return state;
      }

      const diff = action.endX - state.touchStart;
      if (Math.abs(diff) < SWIPE_THRESHOLD) {
        return {
          ...state,
          touchStart: undefined
        };
      }

      const newIndex = diff > 0 
        ? (state.currentIndex - 1 + totalSlides) % totalSlides
        : (state.currentIndex + 1) % totalSlides;

      return {
        ...state,
        currentIndex: newIndex,
        direction: diff > 0 ? 'prev' : 'next',
        touchStart: undefined
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

    default:
      return state;
  }
}