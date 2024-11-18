// src/main/components/Search/hooks/useSearchAnimation.ts

import { useState, useCallback } from 'react';
import { 
  ExpansionState, 
  DropdownAnimationState, 
  SearchAnimationState, 
  ContentTransitionState,
  SearchStatus
} from '../types';

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
  const [contentState, setContentState] = useState<{
    status: string;
    transition: ContentTransitionState;
    contentReady: boolean;
  }>({
    status: 'idle',
    transition: 'stable',
    contentReady: false
  });

  const handleSearchStatusChange = useCallback((newStatus: SearchStatus) => {
    if (contentState.status === newStatus.type) return;
    
    // Direct state change without transition if already transitioning
    if (contentState.transition !== 'stable') {
      setContentState({
        status: newStatus.type,
        transition: 'stable',
        contentReady: true
      });
      return;
    }
  
    // Start new transition sequence
    setContentState({
      status: newStatus.type,
      transition: 'stable', // Keep content visible during state changes
      contentReady: true
    });
  }, [contentState.status, contentState.transition]);

  // Existing expansion logic
  const expand = useCallback(() => {
    if (mode === 'expandable' && expansionState === 'collapsed') {
      setIsExpanding(true);
      setIsExpanded(true);
      setExpansionState('expanding');
    }
  }, [mode, expansionState]);

  const collapse = useCallback((clearQuery = false) => {
    if (mode === 'expandable' && expansionState !== 'collapsed') {
      setContentState({
        status: 'idle',
        transition: 'stable',
        contentReady: false
      });
      setExpansionState('collapsing');
    }
  }, [mode, expansionState]);

  const handleExpansionTransitionEnd = useCallback(() => {
    if (expansionState === 'expanding') {
      setExpansionState('expanded');
      setIsExpanding(false);
      inputRef.current?.focus();
    } else if (expansionState === 'collapsing') {
      setExpansionState('collapsed');
      setIsExpanded(false);
    }
  }, [expansionState, inputRef]);

  const getAnimationState = useCallback((): DropdownAnimationState => {
    if (mode === 'expandable') {
      return expansionState === 'expanded' ? 'entered' :
             expansionState === 'expanding' ? 'entering' :
             expansionState === 'collapsing' ? 'exiting' :
             'initial';
    }
    return contentState.transition === 'stable' ? 'entered' : 'entering';
  }, [mode, expansionState, contentState.transition]);

  return {
    expansionState,
    isExpanding,
    isExpanded,
    handleTransitionEnd: handleExpansionTransitionEnd,
    collapse,
    expand,
    getAnimationState,
    handleSearchStatusChange,
    contentTransitionState: contentState.transition
  };
}