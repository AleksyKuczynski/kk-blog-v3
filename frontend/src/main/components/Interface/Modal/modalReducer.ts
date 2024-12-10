// src/main/components/Interface/Modal/modalReducer.ts

import { ModalState, ModalAction } from './types';

export const initialState: ModalState = {
  visibility: 'hidden',
  type: null
};

export function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_MODAL':
      if (state.visibility !== 'hidden') {
        return state;
      }
      return {
        visibility: 'animating-in',
        type: action.payload.type,
        title: action.payload.title,
        description: action.payload.description
      };

    case 'FINISH_OPENING':
      if (state.visibility !== 'animating-in') {
        return state;
      }
      return {
        ...state,
        visibility: 'visible'
      };

    case 'START_CLOSING':
      if (state.visibility !== 'visible') {
        return state;
      }
      return {
        ...state,
        visibility: 'animating-out'
      };

    case 'FINISH_CLOSING':
      return initialState;

    default:
      return state;
  }
}