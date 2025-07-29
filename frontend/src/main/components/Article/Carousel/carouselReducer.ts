// src/main/components/Article/Carousel/carouselReducer.ts
import { CarouselItemWithBehavior, CaptionMode, CaptionState, getInitialStateForMode } from './captionTypes';

export interface CarouselState {
  currentIndex: number;
  images: CarouselItemWithBehavior[];
  direction: 'next' | 'prev' | null;
  touchStart?: number;
  isTransitioning: boolean;
  captionsVisible: boolean;
}

type CarouselAction = 
  | { type: 'NEXT_SLIDE' }
  | { type: 'PREV_SLIDE' }
  | { type: 'SET_SLIDE'; index: number }
  | { type: 'TOUCH_START'; x: number }
  | { type: 'TOUCH_END'; endX: number }
  | { type: 'TOGGLE_CAPTION_DIRECT'; index: number } // Click on expandable caption
  | { type: 'TOGGLE_CAPTION_FRAME'; index: number }  // Click on frame
  | { type: 'UPDATE_CAPTION_MODE'; index: number; mode: CaptionMode } // Mode detection
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
        captionsVisible: true
      };

    case 'PREV_SLIDE':
      if (state.isTransitioning) return state;
      
      return {
        ...state,
        direction: 'prev',
        isTransitioning: true,
        captionsVisible: true
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
        captionsVisible: true
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
        captionsVisible: true
      };
    }

    case 'UPDATE_CAPTION_MODE': {
      return {
        ...state,
        images: state.images.map((img, idx) => {
          if (idx !== action.index) return img;
          
          const newMode = action.mode;
          const newState = getInitialStateForMode(newMode, img.captionBehavior.hasContent);
          
          return {
            ...img,
            captionBehavior: {
              ...img.captionBehavior,
              mode: newMode,
              state: newState
            }
          };
        })
      };
    }

    case 'TOGGLE_CAPTION_DIRECT': {
      if (!state.captionsVisible) return state;
      
      return {
        ...state,
        images: state.images.map((img, idx) => {
          if (idx !== action.index) return img;
          
          const { mode, state: currentState } = img.captionBehavior;
          
          // Only expandable captions respond to direct clicks
          if (mode !== 'expandable') return img;
          
          // Expandable captions: minimized ↔ expanded
          let newState: CaptionState;
          if (currentState === 'minimized') {
            newState = 'expanded';
          } else if (currentState === 'expanded') {
            newState = 'minimized';
          } else {
            newState = currentState; // No change for collapsed
          }
          
          return {
            ...img,
            captionBehavior: {
              ...img.captionBehavior,
              state: newState
            }
          };
        })
      };
    }

    case 'TOGGLE_CAPTION_FRAME': {
      if (!state.captionsVisible) return state;
      
      return {
        ...state,
        images: state.images.map((img, idx) => {
          if (idx !== action.index) return img;
          
          const { mode, state: currentState } = img.captionBehavior;
          
          // Frame click behavior depends on mode
          let newState: CaptionState;
          
          if (currentState === 'collapsed') {
            // Restore to initial state based on mode
            newState = getInitialStateForMode(mode, img.captionBehavior.hasContent);
          } else {
            // Collapse caption
            newState = 'collapsed';
          }
          
          return {
            ...img,
            captionBehavior: {
              ...img.captionBehavior,
              state: newState
            }
          };
        })
      };
    }

    case 'TOGGLE_CAPTIONS_VISIBILITY': {
      return {
        ...state,
        captionsVisible: !state.captionsVisible,
        images: !state.captionsVisible 
          ? state.images.map(img => ({
              ...img,
              captionBehavior: {
                ...img.captionBehavior,
                state: getInitialStateForMode(img.captionBehavior.mode, img.captionBehavior.hasContent)
              }
            }))
          : state.images
      };
    }

    case 'TRANSITION_END':
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