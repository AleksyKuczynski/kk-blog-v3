// src/main/components/Search/hooks/useSearchAnimation.ts

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  ExpansionState, 
  SearchMode, 
  SearchAnimationState,
  SearchAnimationConfig 
} from '../types';

export function useSearchAnimation({
  mode = 'standard',
  onExpandComplete,
  onCollapse,
  isValidSearch = false,
  onSearchSubmit,
  shouldExpand = true
}: SearchAnimationConfig = {}): SearchAnimationState {
  const [expansionState, setExpansionState] = useState<ExpansionState>(
    mode === 'standard' ? 'expanded' : 'collapsed'
  );
  const [isExpanding, setIsExpanding] = useState(false);
  const [isExpanded, setIsExpanded] = useState(mode === 'standard');
  
  // Track whether we're in the middle of a search action
  const isSearchingRef = useRef(false);

  const handleExpansion = useCallback(() => {
    // If we have a valid search, perform search instead of expanding
    if (isValidSearch && onSearchSubmit) {
      isSearchingRef.current = true;
      const success = onSearchSubmit();
      if (success) {
        // Collapse after successful search
        setExpansionState('collapsing');
        return;
      }
      isSearchingRef.current = false;
    }

    // Only expand if we're collapsed and should expand
    if (expansionState === 'collapsed' && shouldExpand) {
      setIsExpanding(true);
      requestAnimationFrame(() => {
        setExpansionState('expanding');
        requestAnimationFrame(() => setIsExpanded(true));
      });
    }
  }, [expansionState, isValidSearch, onSearchSubmit, shouldExpand]);

  const handleTransitionEnd = useCallback(() => {
    if (isExpanding) {
      setExpansionState('expanded');
      setIsExpanding(false);
      // Only call onExpandComplete if we're not in the middle of a search
      if (!isSearchingRef.current) {
        onExpandComplete?.();
      }
    } else if (expansionState === 'collapsing') {
      setExpansionState('collapsed');
      setIsExpanded(false);
    }
    isSearchingRef.current = false;
  }, [isExpanding, expansionState, onExpandComplete]);

  const collapse = useCallback((clearQuery: boolean = false) => {
    if (expansionState !== 'collapsed') {
      setExpansionState('collapsing');
      onCollapse?.(clearQuery);
    }
  }, [expansionState, onCollapse]);

  const expand = useCallback(() => {
    if (!isSearchingRef.current) {
      handleExpansion();
    }
  }, [handleExpansion]);

  return {
    expansionState,
    isExpanding,
    isExpanded,
    isCollapsing: expansionState === 'collapsing',
    handleExpansion,
    handleTransitionEnd,
    collapse,
    expand
  };
}