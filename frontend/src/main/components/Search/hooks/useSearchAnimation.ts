// src/main/components/Search/hooks/useSearchAnimation.ts
import { useState, useCallback } from 'react';
import { ExpansionState, SearchAnimationState } from '../types';
import { ANIMATION_DURATION } from '../../Interface/constants';

export function useSearchAnimation({
  mode = 'standard',
  inputRef
}: {
  mode?: 'standard' | 'expandable';
  inputRef: React.RefObject<HTMLInputElement>;
}): SearchAnimationState {
  const [expansionState, setExpansionState] = useState<ExpansionState>('collapsed');
  const [isExpanding, setIsExpanding] = useState(false);
  const [isExpanded, setIsExpanded] = useState(mode === 'standard');
  const [isVisible, setIsVisible] = useState(false);

  const expand = useCallback(() => {
    if (expansionState === 'collapsed') {
      // Set all states synchronously before animation starts
      setIsVisible(true);
      setIsExpanding(true);
      setIsExpanded(true);
      
      // Use RAF to ensure DOM is ready for animation
      requestAnimationFrame(() => {
        setExpansionState('expanding');
      });
    }
  }, [expansionState]);

  const handleTransitionEnd = useCallback(() => {
    if (expansionState === 'expanding') {
      // Complete expansion first
      setExpansionState('expanded');
      setIsExpanding(false);
      
      // Focus in next frame after expansion is complete
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
  }, [expansionState, inputRef]);

  const collapse = useCallback((clearQuery: boolean = false) => {
    if (expansionState !== 'collapsed') {
      setExpansionState('collapsing');
      
      setTimeout(() => {
        setExpansionState('collapsed');
        setIsExpanded(false);
        setIsVisible(false);
        setIsExpanding(false);
      }, ANIMATION_DURATION);
    }
  }, [expansionState]);

  return {
    expansionState,
    isExpanding,
    isExpanded,
    isVisible,
    handleTransitionEnd,
    collapse,
    expand
  };
}