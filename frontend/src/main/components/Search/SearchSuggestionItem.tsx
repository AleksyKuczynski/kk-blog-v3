// src/main/components/Search/SearchSuggestionItem.tsx
import React from 'react';
import { useTheme } from '../ThemeSwitcher';

interface SearchSuggestionItemProps {
  title: string;
  description?: string;
  isHighlighted: boolean;
  onSelect: () => void;
}

export default function SearchSuggestionItem({
  title,
  description,
  isHighlighted,
  onSelect
}: SearchSuggestionItemProps) {
  const { currentTheme } = useTheme();

  const themeStyles = {
    default: '',
    rounded: 'mx-2',
    sharp: 'hover:bg-gradient-to-r from-bgcolor-accent to-bgcolor'
  };

  return (
    <li
      role="option"
      className={`
        px-4 py-2 
        cursor-pointer
        transition-colors duration-200
        ${isHighlighted 
          ? 'bg-prcolor text-txcolor-inverted' 
          : 'text-txcolor hover:bg-bgcolor-accent'}
        ${themeStyles[currentTheme]}
      `}
      onClick={onSelect}
      aria-selected={isHighlighted}
    >
      <div className="font-medium">{title}</div>
      {description && (
        <div className="text-sm text-txcolor-secondary truncate">
          {description}
        </div>
      )}
    </li>
  );
}