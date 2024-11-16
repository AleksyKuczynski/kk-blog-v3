// src/main/components/Search/hooks/useSearchAnimation.ts

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  ExpansionState, 
  SearchAnimationState,
  SearchAnimationConfig 
} from '../types';
import { ANIMATION_DURATION } from '../../Interface/constants';

export function useSearchAnimation({
  mode = 'standard',
  onExpandComplete,
  onCollapse,
  isValidSearch = false,
  onSearchSubmit,
  shouldExpand = true
}: SearchAnimationConfig = {}): SearchAnimationState {
  const [expansionState, setExpansionState] = useState<ExpansionState>('collapsed');
  const [isExpanding, setIsExpanding] = useState(false);
  const [isExpanded, setIsExpanded] = useState(mode === 'standard');
  const [isVisible, setIsVisible] = useState(false);
  const isSearchingRef = useRef(false);

  const expand = useCallback(() => {
    if (!isSearchingRef.current && expansionState === 'collapsed') {
      setIsExpanding(true);
      setIsExpanded(true);
      setIsVisible(true);
      setExpansionState('expanding');
    }
  }, [expansionState]);

  const collapse = useCallback((clearQuery: boolean = false) => {
    if (expansionState !== 'collapsed') {
      setExpansionState('collapsing');
      // Will hide after animation completes
      const timeoutId = setTimeout(() => {
        setExpansionState('collapsed');
        setIsExpanded(false);
        setIsVisible(false);
        if (clearQuery) {
          onCollapse?.(true);
        }
      }, ANIMATION_DURATION);
    }
  }, [expansionState, onCollapse]);

  const handleTransitionEnd = useCallback(() => {
    if (expansionState === 'expanding') {
      setExpansionState('expanded');
      setIsExpanding(false);
      if (!isSearchingRef.current) {
        onExpandComplete?.();
      }
    }
    isSearchingRef.current = false;
  }, [expansionState, onExpandComplete]);

  return {
    expansionState,
    isExpanding,
    isExpanded,
    isVisible,
    handleExpansion: expand,
    handleTransitionEnd,
    collapse,
    expand
  };
}