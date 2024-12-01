// src/main/components/Search/searchScenarios.ts

import { SearchScenario, SearchStepAction } from './types';

// Animation duration constant - could be moved to a shared constants file if needed
const ANIMATION_DURATION = 300;

export function executeExpandSearch(
  dispatch: (action: SearchStepAction) => void,
) {
  requestAnimationFrame(() => {
    dispatch({ type: 'START_SEARCH_EXPANSION' });
    
    setTimeout(() => {
      dispatch({ type: 'COMPLETE_SEARCH_EXPANSION' });
            
      requestAnimationFrame(() => {
        dispatch({ type: 'START_DROPDOWN_EXPANSION' });
        
        requestAnimationFrame(() => {
          dispatch({ type: 'SET_MESSAGE' });
        });
        
        setTimeout(() => {
          dispatch({ type: 'COMPLETE_DROPDOWN_EXPANSION' });
        }, ANIMATION_DURATION);
      });
    }, ANIMATION_DURATION);
  });
}

export function executeCollapseSearch(
  dispatch: (action: SearchStepAction) => void, 
  trigger: 'escape' | 'outside-click' | 'selection'
) {
  requestAnimationFrame(() => {
    // First collapse dropdown
    dispatch({ type: 'START_DROPDOWN_COLLAPSE' });
    
    setTimeout(() => {
      dispatch({ type: 'COMPLETE_DROPDOWN_COLLAPSE' });
      
      // Then collapse input
      requestAnimationFrame(() => {
        dispatch({ type: 'START_INPUT_COLLAPSE' });
        
        setTimeout(() => {
          dispatch({ type: 'COMPLETE_INPUT_COLLAPSE' });
          dispatch({ type: 'RESET_STATE' });
        }, ANIMATION_DURATION);
      });
    }, ANIMATION_DURATION);
  });
}

export function executeSearch(
  dispatch: (action: SearchStepAction) => void, 
  searchQuery: string
) {
  dispatch({ type: 'START_SEARCH' });
  dispatch({ type: 'SET_QUERY', payload: searchQuery });
  
  if (searchQuery.length >= 3) {
    dispatch({ type: 'SET_SEARCHING_STATE' });
  }
}

export function navigateResults(
  dispatch: (action: SearchStepAction) => void,
  direction: 'up' | 'down'
) {
  dispatch({ 
    type: direction === 'up' ? 'NAVIGATE_UP' : 'NAVIGATE_DOWN' 
  });
}

export function selectResult(
  dispatch: (action: SearchStepAction) => void,
  index: number
) {
  dispatch({ type: 'SELECT_ITEM', payload: index });
  executeCollapseSearch(dispatch, 'selection');
}

// Main scenario handler
export function handleSearchScenario(scenario: SearchScenario): void {
  switch (scenario.type) {
    case 'SCENARIO_EXPAND_SEARCH':
      executeExpandSearch(scenario.dispatch);
      break;
      
    case 'SCENARIO_COLLAPSE_SEARCH':
      executeCollapseSearch(scenario.dispatch, scenario.trigger);
      break;
      
    case 'SCENARIO_EXECUTE_SEARCH':
      executeSearch(scenario.dispatch, scenario.payload);
      break;
      
    case 'SCENARIO_NAVIGATE_RESULTS':
      navigateResults(scenario.dispatch, scenario.direction);
      break;
      
    case 'SCENARIO_SELECT_RESULT':
      selectResult(scenario.dispatch, scenario.index);
      break;
  }
}