// src/main/components/Interface/Modal/types.ts

export type ModalVisibility = 'hidden' | 'animating-in' | 'visible' | 'animating-out';

export interface ModalState {
  visibility: ModalVisibility;
  type: string | null;
  title?: string;
  description?: string;
}

export type ModalAction =
  | { type: 'OPEN_MODAL'; payload: { type: string; title?: string; description?: string } }
  | { type: 'START_CLOSING' }
  | { type: 'FINISH_CLOSING' }
  | { type: 'FINISH_OPENING' };