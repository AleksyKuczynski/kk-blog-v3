// src/main/components/Article/Carousel/types.ts
export interface CarouselAnimation {
  direction: 'left' | 'right' | null;
  progress: number;
}

export interface CarouselState {
  currentIndex: number;
  isTransitioning: boolean;
  animation: CarouselAnimation;
  preloadIndexes: number[];
  captions: {
    expandedIndexes: Set<number>;
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
  | { type: 'SET_ANIMATION_DIRECTION'; payload: 'left' | 'right' | null }
  | { type: 'SET_ANIMATION_PROGRESS'; payload: number }
  | { type: 'UPDATE_PRELOAD_INDEXES' }
  | { type: 'START_TRANSITION' }
  | { type: 'END_TRANSITION' }
  // Caption actions
  | { type: 'TOGGLE_CAPTION'; payload: number }
  | { type: 'START_CAPTION_TRANSITION' }
  | { type: 'END_CAPTION_TRANSITION' }
  // Touch input actions
  | { type: 'START_TOUCH'; payload: number }
  | { type: 'END_TOUCH' }
  | { type: 'DISABLE_INPUT' }
  | { type: 'ENABLE_INPUT' };

type ScenarioType = 
  | 'SCENARIO_CHANGE_SLIDE'
  | 'SCENARIO_HANDLE_SWIPE'
  | 'SCENARIO_TOGGLE_CAPTION';

export interface BaseScenario {
  type: ScenarioType;
  dispatch: (action: CarouselAction) => void;
}

export interface ChangeSlideScenario extends BaseScenario {
  type: 'SCENARIO_CHANGE_SLIDE';
  direction: 'next' | 'prev' | number;
  targetIndex?: number;
}

export interface HandleSwipeScenario extends BaseScenario {
  type: 'SCENARIO_HANDLE_SWIPE';
  endX: number;
  totalSlides: number;
  currentIndex: number;
  lastTouchX: number | undefined;
}

export interface ToggleCaptionScenario extends BaseScenario {
  type: 'SCENARIO_TOGGLE_CAPTION';
  index: number;
}

export type CarouselScenario = 
  | ChangeSlideScenario 
  | HandleSwipeScenario 
  | ToggleCaptionScenario;