// src/main/components/Article/Carousel/carouselReducer.ts
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";

interface CarouselState {
  currentIndex: number;
  direction: 'next' | 'prev' | null;
  touchStart?: number;
  images: CarouselItem[];
  // 🔄 ADD: Animation state management
  isTransitioning: boolean;
  previousIndex: number;
}

type CarouselAction =
  | { type: 'NEXT_SLIDE' }
  | { type: 'PREV_SLIDE' }
  | { type: 'SET_SLIDE'; index: number }
  | { type: 'TOUCH_START'; x: number }
  | { type: 'TOUCH_END'; endX: number }
  | { type: 'TOGGLE_CAPTION'; index: number }
  // 🔄 ADD: Animation control actions
  | { type: 'TRANSITION_START' }
  | { type: 'TRANSITION_END' };

const SWIPE_THRESHOLD = 50;

export function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  const totalSlides = state.images.length;

  switch (action.type) {
    case 'NEXT_SLIDE':
      return {
        ...state,
        previousIndex: state.currentIndex,
        currentIndex: (state.currentIndex + 1) % totalSlides,
        direction: 'next',
        isTransitioning: true // 🔄 ADD: Start transition
      };

    case 'PREV_SLIDE':
      return {
        ...state,
        previousIndex: state.currentIndex,
        currentIndex: (state.currentIndex - 1 + totalSlides) % totalSlides,
        direction: 'prev',
        isTransitioning: true // 🔄 ADD: Start transition
      };

    case 'SET_SLIDE':
      // 🔄 ENHANCED: Better direction detection for direct slide selection
      const newDirection = action.index === (state.currentIndex + 1) % totalSlides 
        ? 'next' 
        : action.index === (state.currentIndex - 1 + totalSlides) % totalSlides
          ? 'prev'
          : action.index > state.currentIndex 
            ? 'next' 
            : 'prev';
            
      return {
        ...state,
        previousIndex: state.currentIndex,
        currentIndex: action.index,
        direction: newDirection,
        isTransitioning: true // 🔄 ADD: Start transition
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

      const newDirection = diff > 0 ? 'prev' : 'next';
      const newIndex = diff > 0 
        ? (state.currentIndex - 1 + totalSlides) % totalSlides
        : (state.currentIndex + 1) % totalSlides;

      return {
        ...state,
        previousIndex: state.currentIndex,
        currentIndex: newIndex,
        direction: newDirection,
        touchStart: undefined,
        isTransitioning: true // 🔄 ADD: Start transition
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

    // 🔄 ADD: Animation state control
    case 'TRANSITION_START':
      return {
        ...state,
        isTransitioning: true
      };

    case 'TRANSITION_END':
      return {
        ...state,
        isTransitioning: false,
        direction: null // Clear direction after transition
      };

    default:
      return state;
  }
}