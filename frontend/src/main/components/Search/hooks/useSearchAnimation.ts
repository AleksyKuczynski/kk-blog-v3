// src/main/components/Search/hooks/useSearchAnimation.ts
import { useState, useCallback } from 'react';
import { ExpansionState, DropdownAnimationState, SearchAnimationState } from '../types';

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
  const [internalDropdownState, setInternalDropdownState] = 
    useState<DropdownAnimationState>('initial');

  const getAnimationState = useCallback((): DropdownAnimationState => {
    if (mode === 'expandable') {
      return expansionState === 'expanded' ? 'entered' :
             expansionState === 'expanding' ? 'entering' :
             expansionState === 'collapsing' ? 'exiting' :
             'initial';
    }
    // For standard mode, directly reflect showDropdown state
    return internalDropdownState;
  }, [mode, expansionState, internalDropdownState]);

  const handleTransitionEnd = useCallback(() => {
    if (expansionState === 'expanding') {
      setExpansionState('expanded');
      setIsExpanding(false);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        setInternalDropdownState('entering');
      });
    } else if (expansionState === 'collapsing') {
      setExpansionState('collapsed');
      setIsExpanded(false);
      requestAnimationFrame(() => {
        setInternalDropdownState('initial');
      });
    } 
    else if (internalDropdownState === 'entering') {
      setInternalDropdownState('entered');
    } else if (internalDropdownState === 'exiting') {
      requestAnimationFrame(() => {
        setInternalDropdownState('initial');
      });
    }
  }, [expansionState, inputRef, internalDropdownState]);

  const collapse = useCallback((clearQuery = false) => {
    if (mode === 'expandable') {
      if (expansionState !== 'collapsed') {
        setInternalDropdownState('exiting');
        setExpansionState('collapsing');
      }
    } else {
      setInternalDropdownState('exiting');
    }
  }, [mode, expansionState]);

  const expand = useCallback(() => {
    if (mode === 'expandable') {
      if (expansionState === 'collapsed') {
        setIsExpanding(true);
        setIsExpanded(true);
        setExpansionState('expanding');
        setInternalDropdownState('initial');
      }
    } else {
      // For standard mode, directly enter
      setInternalDropdownState('entering');
    }
  }, [mode, expansionState]);

  return {
    expansionState,
    isExpanding,
    isExpanded,
    handleTransitionEnd,
    collapse,
    expand,
    getAnimationState
  };
}