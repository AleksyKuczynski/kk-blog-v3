// src/main/components/Article/Carousel/carouselReducer.ts
import { CarouselItemWithBehavior, CaptionMode, CaptionState, getInitialStateForMode } from '../Captions';

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
  | { type: 'PREVIOUS_SLIDE' } // Fixed: was PREV_SLIDE
  | { type: 'SET_SLIDE'; index: number }
  | { type: 'TOUCH_START'; x: number }
  | { type: 'TOUCH_END' } // Simplified - no endX needed
  | { type: 'TOGGLE_CAPTION_DIRECT'; index: number } // Click on expandable caption
  | { type: 'TOGGLE_CAPTION_FRAME'; index: number }  // Click on frame
  | { type: 'UPDATE_CAPTION_MODE'; index: number; mode: CaptionMode } // Mode detection
  | { type: 'TOGGLE_CAPTIONS_VISIBILITY' }
  | { type: 'SET_TRANSITIONING'; isTransitioning: boolean }; // CRITICAL: Missing action!

export function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  const totalSlides = state.images.length;

  switch (action.type) {
    case 'NEXT_SLIDE':
      if (state.isTransitioning) return state;
      
      const nextIndex = (state.currentIndex + 1) % totalSlides;
      
      return {
        ...state,
        currentIndex: nextIndex,
        direction: 'next',
        isTransitioning: true,
        captionsVisible: true
      };

    case 'PREVIOUS_SLIDE': // Fixed action name
      if (state.isTransitioning) return state;
      
      const prevIndex = (state.currentIndex - 1 + totalSlides) % totalSlides;
      
      return {
        ...state,
        currentIndex: prevIndex,
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
        currentIndex: action.index,
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
      return {
        ...state,
        touchStart: undefined
      };
    }

    case 'SET_TRANSITIONING': {
      return {
        ...state,
        isTransitioning: action.isTransitioning,
        direction: action.isTransitioning ? state.direction : null
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
          ? // Showing captions - restore to initial states
            state.images.map(img => ({
              ...img,
              captionBehavior: {
                ...img.captionBehavior,
                state: getInitialStateForMode(img.captionBehavior.mode, img.captionBehavior.hasContent)
              }
            }))
          : state.images // Hiding captions - keep current states
      };
    }

    default:
      return state;
  }
}