// src/main/components/Search/ExpandableSearchButton.tsx
import React, { useReducer, useRef } from 'react';
import SearchInput from './SearchInput';
import SearchDropdown from './SearchDropdown';
import { searchReducer, initialState } from './searchReducer';
import { SearchTranslations } from '@/main/lib/dictionaries/types';
import { Lang } from '@/main/lib/dictionaries/types';
import { useOutsideClick } from '@/main/lib/hooks';
import { CloseIcon, NavButton, SearchIcon } from '../Interface';
import { handleSearchScenario } from './searchScenarios';
import { useSearch } from './useSearch';
import { createSearchUrl, generateArticleLink } from '@/main/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface ExpandableSearchButtonProps {
  searchTranslations: SearchTranslations;
  lang: Lang;
  className?: string;
}

export default function ExpandableSearchButton({
  searchTranslations,
  lang,
  className = ''
}: ExpandableSearchButtonProps) {
  const [state, dispatch] = useReducer(searchReducer, {
    ...initialState,
    mode: 'expandable'
  });
  const { handleSearch } = useSearch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasNavigableContent = state.dropdown.content === 'suggestions' && 
                            state.suggestions.length > 0;

  // Handle click on search button
  const handleSearchButton = () => {
    if (state.input.visibility === 'hidden') {
      // Expand search input
      handleSearchScenario({
        type: 'SCENARIO_EXPAND_SEARCH',
        dispatch,
      });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else if (hasNavigableContent) {
      // First collapse
      handleSearchScenario({
        type: 'SCENARIO_COLLAPSE_SEARCH',
        trigger: 'selection',
        dispatch
      });
      // Then navigate after a small delay to allow collapse animation
      setTimeout(() => {
        const searchUrl = createSearchUrl(state.query, searchParams);
        router.push(`/${lang}/${searchUrl}`);
      }, 100);
    } else {
      // Just collapse
      handleSearchScenario({
        type: 'SCENARIO_COLLAPSE_SEARCH',
        trigger: 'outside-click',
        dispatch
      });
    }
  };

  // Handle input change
  const handleInputChange = async (value: string) => {
    handleSearchScenario({
      type: 'SCENARIO_EXECUTE_SEARCH',
      payload: value,
      dispatch
    });
  
    if (value.length >= 3) {
      try {
        const searchResults = await handleSearch(value);
        dispatch({ 
          type: 'SET_SUGGESTIONS',
          payload: searchResults 
        });
      } catch (error) {
        dispatch({ type: 'SET_SEARCH_ERROR' });
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        handleSearchScenario({
          type: 'SCENARIO_NAVIGATE_RESULTS',
          direction: 'down',
          dispatch
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        handleSearchScenario({
          type: 'SCENARIO_NAVIGATE_RESULTS',
          direction: 'up',
          dispatch
        });
        break;
        case 'Enter':
          e.preventDefault();
          if (state.selectedIndex >= 0) {
            // Scenario 1: Suggestion is selected - navigate to article
            handleSelect(state.selectedIndex);
          } else if (state.query.length >= 3) {
            // Scenario 2: Input is focused with valid query - navigate to search page
            const searchUrl = createSearchUrl(state.query, searchParams);
            router.push(`/${lang}/${searchUrl}`);
            
            // Close search after navigation
            handleSearchScenario({
              type: 'SCENARIO_COLLAPSE_SEARCH',
              trigger: 'selection',
              dispatch
            });
          }
          break;
      case 'Escape':
        e.preventDefault();
        handleSearchScenario({
          type: 'SCENARIO_COLLAPSE_SEARCH',
          trigger: 'escape',
          dispatch
        });
        break;
    }
  };

  // Handle item selection
  const handleSelect = (index: number) => {
    // Get selected suggestion
    const selectedSuggestion = state.suggestions[index];
    
    if (selectedSuggestion) {
      // First trigger the selection scenario for animation
      handleSearchScenario({
        type: 'SCENARIO_SELECT_RESULT',
        index,
        dispatch
      });
      
      // Generate link and navigate
      const link = generateArticleLink(
        selectedSuggestion.rubric_slug,
        selectedSuggestion.slug,
        lang
      );
      
      router.push(link);
    }
  };

  // Handle focus
  const handleFocus = () => {
    dispatch({ type: 'SET_FOCUS' });
  };

  // Handle outside click
  useOutsideClick(
    containerRef,
    null,
    state.input.visibility !== 'hidden',
    () => {
      handleSearchScenario({
        type: 'SCENARIO_COLLAPSE_SEARCH',
        trigger: 'outside-click',
        dispatch
      });
    }
  );

  const shouldShowInput = state.input.visibility !== 'hidden';

  const getButtonIcon = () => {
    if (state.input.visibility === 'hidden' || hasNavigableContent) {
      return <SearchIcon />;
    }
    return <CloseIcon />;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
    >
      <div className="flex gap-2 items-center">
        {shouldShowInput && (
          <SearchInput
            state={state}
            placeholder={searchTranslations.placeholder}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            inputRef={inputRef}
          />
        )}

        <NavButton
          context="desktop"
          onClick={handleSearchButton}
          icon={getButtonIcon()}
          aria-label={searchTranslations.submit}
          aria-expanded={state.input.visibility !== 'hidden'}
        />
      </div>

      {shouldShowInput && (
        <SearchDropdown
          state={state}
          translations={searchTranslations}
          onItemSelect={handleSelect}
        />
      )}
    </div>
  );
}