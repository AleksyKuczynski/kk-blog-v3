// src/main/components/SearchBar/SearchButton.tsx
'use client';

import React from 'react';
import { NavButton } from '../Navigation/NavButton';
import { SearchIcon } from '../Icons';

interface SearchButtonProps {
  onClick: () => void;
  className?: string;
  context: 'desktop' | 'mobile';
}

export function SearchButton({ onClick, className = '', context }: SearchButtonProps) {
  return (
    <NavButton
      context={context}
      onClick={onClick}
      className={className}
      aria-label="Search"
      icon={<SearchIcon className="h-5 w-5" />}
    />
  );
}