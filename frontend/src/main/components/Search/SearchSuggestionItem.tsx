// src/main/components/Search/SearchSuggestionItem.tsx
import React from 'react';
import { useTheme } from '../ThemeSwitcher';
import { cn } from '@/main/lib/utils';

interface SearchSuggestionItemProps {
  title: string;
  description?: string;
  isHighlighted: boolean;
  onSelect: () => void;
}

const suggestionStyles = {
  base: 'cursor-pointer transition-colors duration-200', // Removed general transition
  container: {
    default: 'px-4 py-2',
    rounded: 'px-4 py-2 mx-2 first:mt-2 last:mb-2',
    sharp: 'px-4 py-2 border-l-2 border-transparent',
  },
  highlighted: {
    default: 'bg-prcolor text-txcolor-inverted',
    rounded: 'bg-prcolor text-txcolor-inverted rounded-lg',
    sharp: 'bg-gradient-to-r from-bgcolor-accent to-bgcolor border-l-2 border-prcolor',
  },
  normal: {
    default: 'text-txcolor hover:bg-bgcolor-accent',
    rounded: 'text-txcolor hover:bg-bgcolor-accent rounded-lg', // Applied border-radius without transition
    sharp: 'text-txcolor hover:bg-gradient-to-r hover:from-bgcolor-accent hover:to-bgcolor hover:border-l-2 hover:border-prcolor',
  },
  title: 'font-medium',
  description: 'text-sm text-txcolor-secondary truncate mt-0.5',
};

export default function SearchSuggestionItem({
  title,
  description,
  isHighlighted,
  onSelect
}: SearchSuggestionItemProps) {
  const { currentTheme } = useTheme();

  const itemClassName = cn(
    suggestionStyles.base,
    suggestionStyles.container[currentTheme],
    isHighlighted 
      ? suggestionStyles.highlighted[currentTheme]
      : suggestionStyles.normal[currentTheme]
  );

  return (
    <li
      role="option"
      className={itemClassName}
      onClick={onSelect}
      aria-selected={isHighlighted}
    >
      <div className={suggestionStyles.title}>{title}</div>
      {description && (
        <div className={cn(
          suggestionStyles.description,
          isHighlighted && 'text-txcolor-inverted/80'
        )}>
          {description}
        </div>
      )}
    </li>
  );
}