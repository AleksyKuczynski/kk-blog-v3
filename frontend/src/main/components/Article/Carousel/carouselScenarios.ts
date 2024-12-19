// src/main/components/Article/Carousel/carouselScenarios.ts
import { CarouselScenario, CarouselAction } from './types';

const ANIMATION_DURATION = 300; // ms
const SWIPE_THRESHOLD = 50; // px

export function handleCarouselScenario(scenario: CarouselScenario): void {
  switch (scenario.type) {
    case 'SCENARIO_CHANGE_SLIDE':
      executeSlideChange(
        scenario.direction, 
        scenario.dispatch, 
        scenario.targetIndex
      );
      break;
      
    case 'SCENARIO_HANDLE_SWIPE':
      executeSwipe(
        scenario.endX, 
        scenario.dispatch, 
        scenario.totalSlides,
        scenario.currentIndex,
        scenario.lastTouchX
      );
      break;

    case 'SCENARIO_TOGGLE_CAPTION':
      executeCaptionToggle(
        scenario.index,
        scenario.dispatch
      );
      break;
  }
}

function executeSlideChange(
  direction: 'next' | 'prev' | number,
  dispatch: (action: CarouselAction) => void,
  targetIndex?: number
) {
  dispatch({ type: 'START_TRANSITION' });
  
  requestAnimationFrame(() => {
    if (targetIndex !== undefined) {
      dispatch({ type: 'GOTO_SLIDE', payload: targetIndex });
    } else if (typeof direction === 'number') {
      dispatch({ type: 'GOTO_SLIDE', payload: direction });
    } else {
      dispatch({ type: direction === 'next' ? 'NEXT_SLIDE' : 'PREV_SLIDE' });
    }

    const animationDirection = typeof direction === 'number' 
      ? null 
      : direction === 'next' ? 'right' : 'left';

    dispatch({ 
      type: 'SET_ANIMATION_DIRECTION', 
      payload: animationDirection
    });

    setTimeout(() => {
      dispatch({ type: 'END_TRANSITION' });
    }, ANIMATION_DURATION);
  });
}

function executeSwipe(
  endX: number,
  dispatch: (action: CarouselAction) => void,
  totalSlides: number,
  currentIndex: number,
  lastTouchX: number | undefined
) {
  if (lastTouchX === undefined) return;

  dispatch({ type: 'START_TRANSITION' });
  
  requestAnimationFrame(() => {
    const diff = endX - lastTouchX;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0 && currentIndex > 0) {
        dispatch({ type: 'PREV_SLIDE' });
      } else if (diff < 0 && currentIndex < totalSlides - 1) {
        dispatch({ type: 'NEXT_SLIDE' });
      }
    }

    dispatch({ type: 'END_TOUCH' });
    
    setTimeout(() => {
      dispatch({ type: 'END_TRANSITION' });
    }, ANIMATION_DURATION);
  });
}

function executeCaptionToggle(
  index: number,
  dispatch: (action: CarouselAction) => void
) {
  dispatch({ type: 'START_CAPTION_TRANSITION' });

  requestAnimationFrame(() => {
    dispatch({ type: 'TOGGLE_CAPTION', payload: index });
    
    setTimeout(() => {
      dispatch({ type: 'END_CAPTION_TRANSITION' });
    }, ANIMATION_DURATION);
  });
}