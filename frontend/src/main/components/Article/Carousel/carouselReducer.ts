// src/main/components/Article/Carousel/carouselReducer.ts
import { CarouselState, CarouselAction } from './types';

export const initialCarouselState: CarouselState = {
  currentIndex: 0,
  isTransitioning: false,
  animation: {
    direction: null,
    progress: 0
  },
  preloadIndexes: [0, 1], // Start with first two slides
  captions: {
    expandedIndexes: new Set(),
    isTransitioning: false
  },
  input: {
    isEnabled: true
  }
};

export function carouselReducer(
  state: CarouselState,
  action: CarouselAction
): CarouselState {
  switch (action.type) {
    case 'NEXT_SLIDE':
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        animation: {
          ...state.animation,
          direction: 'right'
        },
        preloadIndexes: [
          state.currentIndex + 1,
          state.currentIndex + 2
        ]
      };

    case 'PREV_SLIDE':
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        animation: {
          ...state.animation,
          direction: 'left'
        },
        preloadIndexes: [
          state.currentIndex - 1,
          state.currentIndex - 2
        ]
      };

    case 'GOTO_SLIDE':
      return {
        ...state,
        currentIndex: action.payload,
        animation: {
          ...state.animation,
          direction: action.payload > state.currentIndex ? 'right' : 'left'
        },
        preloadIndexes: [
          action.payload,
          action.payload + 1
        ]
      };

    case 'SET_ANIMATION_DIRECTION':
      return {
        ...state,
        animation: {
          ...state.animation,
          direction: action.payload
        }
      };

    case 'SET_ANIMATION_PROGRESS':
      return {
        ...state,
        animation: {
          ...state.animation,
          progress: action.payload
        }
      };


    case 'START_TRANSITION':
      return {
        ...state,
        isTransitioning: true,
        input: { ...state.input, isEnabled: false }
      };

    case 'END_TRANSITION':
      return {
        ...state,
        isTransitioning: false,
        input: { ...state.input, isEnabled: true }
      };

      case 'TOGGLE_CAPTION':
        return {
          ...state,
          captions: {
            ...state.captions,
            expandedIndexes: new Set(
              state.captions.expandedIndexes.has(action.payload)
                ? Array.from(state.captions.expandedIndexes).filter(i => i !== action.payload)
                : [...state.captions.expandedIndexes, action.payload]
            )
          }
        };
      
      case 'START_CAPTION_TRANSITION':
        return {
          ...state,
          captions: {
            ...state.captions,
            isTransitioning: true
          }
        };
      
      case 'END_CAPTION_TRANSITION':
        return {
          ...state,
          captions: {
            ...state.captions,
            isTransitioning: false
          }
        };

    case 'START_TOUCH':
      return {
        ...state,
        input: {
          ...state.input,
          lastTouchX: action.payload
        }
      };

    case 'END_TOUCH':
      return {
        ...state,
        input: {
          ...state.input,
          lastTouchX: undefined
        }
      };

    default:
      return state;
  }
}