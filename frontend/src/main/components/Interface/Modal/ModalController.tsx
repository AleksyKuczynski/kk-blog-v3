// src/main/components/Interface/Modal/ModalController.tsx
'use client';

import { useRef, useReducer, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { modalReducer, initialState } from './modalReducer';
import { useOutsideClick } from '@/main/lib/hooks';
import { useTheme } from '../../ThemeSwitcher';
import { ANIMATION_DURATION } from '../constants';
import Modal from './Modal';

interface ModalControllerProps {
  children: React.ReactNode;
  modalType: string;
  title?: string;
  description?: string;
  onClose?: () => void;
}

export default function ModalController({
  children,
  modalType,
  title,
  description,
  onClose
}: ModalControllerProps) {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { currentTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (state.visibility === 'visible') {
      dispatch({ type: 'START_CLOSING' });
      setTimeout(() => {
        dispatch({ type: 'FINISH_CLOSING' });
        onClose?.();
      }, ANIMATION_DURATION);
    }
  }, [state.visibility, onClose]);

  // Obsługa klawisza Escape bez useEffect
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  }, [handleClose]);

  useOutsideClick(containerRef, null, state.visibility !== 'hidden', handleClose);

  // Otwarcie modala bez useEffect
  if (state.visibility === 'hidden' && modalType) {
    dispatch({ 
      type: 'OPEN_MODAL', 
      payload: { type: modalType, title, description } 
    });
    setTimeout(() => {
      dispatch({ type: 'FINISH_OPENING' });
    }, ANIMATION_DURATION);
  }

  if (state.visibility === 'hidden') return null;

  return createPortal(
    <Modal
      visibility={state.visibility}
      theme={currentTheme}
      title={title}
      description={description}
      onClose={handleClose}
      containerRef={containerRef}
    >
      {children}
    </Modal>,
    document.body
  );
}