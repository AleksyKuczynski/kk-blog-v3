// SearchDropdownItem.tsx
import React from 'react';
import { useTheme } from '../ThemeSwitcher';
import { SearchProposition } from '@/main/lib/directus/interfaces';
import { cn } from '@/main/lib/utils/utils';

interface SearchDropdownItemProps {
  suggestion: SearchProposition;
  isHighlighted: boolean;
  onSelect: () => void;
}

// We manage different visual states for the item through carefully structured styles
const suggestionStyles = {
  // Base styles remain constant regardless of state
  base: `
    cursor-pointer 
    transition-colors duration-300
  `,
  // Container styles vary by geometric theme
  container: {
    default: 'px-4 py-2',
    rounded: 'px-4 py-2 mx-2 first:mt-2 last:mb-2',
    sharp: 'px-4 py-2 border-2 border-transparent'
  },
  // State-based styles handle highlighting and selection
  states: {
    default: {
      normal: 'text-on-sf hover:bg-sf-cont hover:text-pr-fix rounded-lg',
      highlighted: 'bg-pr-fix text-on-pr rounded-lg',
      selected: 'bg-pr-cont text-on-pr rounded-lg'
    },
    rounded: {
      normal: 'text-on-sf hover:bg-sf-cont hover:text-pr-fix rounded-lg',
      highlighted: 'bg-pr-fix text-on-pr rounded-lg',
      selected: 'bg-pr-cont text-on-pr rounded-lg'
    },
    sharp: {
      normal: 'text-txcolor hover:border-ol hover:text-on-sf-var',
      highlighted: 'bg-sf-cont border-pr-fix',
      selected: 'bg-sf-cont border-pr-fix font-medium'
    }
  }
};

export default function SearchDropdownItem({
  suggestion,
  isHighlighted,
  onSelect
}: SearchDropdownItemProps) {
  // Get current theme for geometric styling
  const { currentTheme } = useTheme();

  // Determine the current visual state
  const getVisualState = () => {
    if (isHighlighted) return 'highlighted';
    return 'normal';
  };

  return (
    <li
      role="option" // Proper ARIA role for accessibility
      className={cn(
        suggestionStyles.base,
        suggestionStyles.container[currentTheme],
        suggestionStyles.states[currentTheme][getVisualState()]
      )}
      onClick={onSelect}
      onMouseDown={(e) => {
        // Prevent blur event on the input when clicking an item
        e.preventDefault();
      }}
      aria-selected={isHighlighted}
    >
      {/* Title section with consistent styling */}
      <div className="font-medium">
        {suggestion.title}
      </div>

      {/* Description section with conditional opacity based on state */}
      {suggestion.description && (
        <div 
          className={cn(
            'text-sm truncate mt-0.5',
            (isHighlighted) 
              ? 'text-txcolor-inverted/80' 
              : 'text-txcolor-secondary'
          )}
        >
          {suggestion.description}
        </div>
      )}
    </li>
  );
}