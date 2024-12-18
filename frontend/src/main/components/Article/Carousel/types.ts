// src/main/components/Article/Carousel/types.ts
export interface CarouselState {
  currentIndex: number;
  isTransitioning: boolean;
  caption: {
    isExpanded: boolean;
    isTransitioning: boolean;
  };
  input: {
    isEnabled: boolean;
    lastTouchX?: number;
  };
}

export type CarouselAction =
  // Navigation actions
  | { type: 'NEXT_SLIDE' }
  | { type: 'PREV_SLIDE' }
  | { type: 'GOTO_SLIDE'; payload: number }
  | { type: 'START_TRANSITION' }
  | { type: 'END_TRANSITION' }
  // Caption actions
  | { type: 'EXPAND_CAPTION' }
  | { type: 'COLLAPSE_CAPTION' }
  | { type: 'START_CAPTION_TRANSITION' }
  | { type: 'END_CAPTION_TRANSITION' }
  // Touch input actions
  | { type: 'START_TOUCH'; payload: number }
  | { type: 'END_TOUCH' }
  | { type: 'DISABLE_INPUT' }
  | { type: 'ENABLE_INPUT' };

  export type CarouselScenario = 
  | { 
      type: 'SCENARIO_CHANGE_SLIDE'; 
      direction: 'next' | 'prev' | number;
      dispatch: (action: CarouselAction) => void;
    }
  | {
      type: 'SCENARIO_TOGGLE_CAPTION';
      dispatch: (action: CarouselAction) => void;
    }
  | {
      type: 'SCENARIO_HANDLE_SWIPE';
      endX: number;
      dispatch: (action: CarouselAction) => void;
      totalSlides: number;
      currentIndex: number;
      lastTouchX: number | undefined;
    };