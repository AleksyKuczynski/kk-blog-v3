// src/main/components/Article/Carousel/carouselReducer.ts
import { CarouselState, CarouselAction } from './types';

export const initialCarouselState: CarouselState = {
  currentIndex: 0,
  isTransitioning: false,
  caption: {
    isExpanded: false,
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
        currentIndex: state.currentIndex + 1
      };

    case 'PREV_SLIDE':
      return {
        ...state,
        currentIndex: state.currentIndex - 1
      };

    case 'GOTO_SLIDE':
      return {
        ...state,
        currentIndex: action.payload
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

    case 'EXPAND_CAPTION':
      return {
        ...state,
        caption: {
          ...state.caption,
          isExpanded: true
        }
      };

    case 'COLLAPSE_CAPTION':
      return {
        ...state,
        caption: {
          ...state.caption,
          isExpanded: false
        }
      };

    case 'START_CAPTION_TRANSITION':
      return {
        ...state,
        caption: {
          ...state.caption,
          isTransitioning: true
        }
      };

    case 'END_CAPTION_TRANSITION':
      return {
        ...state,
        caption: {
          ...state.caption,
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