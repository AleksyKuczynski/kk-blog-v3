// src/main/components/Interface/Dropdown/DropdownItem.tsx
'use client';

import React from 'react';
import { useTheme } from '@/main/components/ThemeSwitcher';
import { DropdownItemProps } from './types';
import { CheckIcon } from '../Icons';
import { useDropdownContext } from './DropdownContext';
import { cn } from '@/main/lib/utils';

const itemStyles = {
  base: 'flex items-center justify-between transition-colors duration-200 outline-none', // Added outline-none
  container: {
    default: 'px-4 py-2',
    rounded: 'px-4 py-2 mx-2 first:mt-2 last:mb-2',
    sharp: 'px-4 py-2 border-l-2 border-transparent'
  },
  state: {
    selected: {
      default: 'text-prcolor',
      rounded: 'text-prcolor',
      sharp: 'text-prcolor'
    },
    focused: {
      default: 'bg-prcolor text-txcolor-inverted',
      rounded: 'bg-prcolor text-txcolor-inverted rounded-lg',
      sharp: 'bg-gradient-to-r from-bgcolor-accent to-bgcolor border-l-2 border-prcolor'
    },
    normal: {
      default: 'text-txcolor hover:bg-bgcolor-accent',
      rounded: 'text-txcolor hover:bg-bgcolor-accent rounded-lg',
      sharp: 'text-txcolor hover:bg-gradient-to-r hover:from-bgcolor-accent hover:to-bgcolor hover:border-l-2 hover:border-prcolor'
    }
  }
};

export default function DropdownItem({
  item,
  index,
  isSelected,
  onSelect
}: DropdownItemProps) {
  const { currentTheme } = useTheme();
  const { itemRefs, handleKeyDown, selectedIndex } = useDropdownContext();

  const isFocused = selectedIndex === index;

  const handleItemKeyDown = (e: React.KeyboardEvent) => {
    handleKeyDown(e as unknown as KeyboardEvent);
  };

  return (
    <li
      ref={el => {
        if (itemRefs.current) {
          itemRefs.current[index] = el;
        }
      }}
      role="option"
      className={cn(
        itemStyles.base,
        itemStyles.container[currentTheme],
        isFocused 
          ? itemStyles.state.focused[currentTheme]
          : isSelected 
            ? itemStyles.state.selected[currentTheme]
            : itemStyles.state.normal[currentTheme]
      )}
      onClick={() => onSelect()}
      onKeyDown={handleItemKeyDown}
      aria-selected={isSelected}
      tabIndex={0}
    >
      <span>
        {item.label}
      </span>
      {isSelected && (
        <CheckIcon 
          className="h-4 w-4 ml-2"
          aria-hidden="true" 
        />
      )}
    </li>
  );
}