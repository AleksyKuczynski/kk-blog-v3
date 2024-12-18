// src/main/components/Interface/Dropdown/DropdownItem.tsx
'use client';

import React from 'react';
import { useTheme } from '@/main/components/ThemeSwitcher';
import { DropdownItemProps } from './types';
import { CheckIcon } from '../Icons';
import { useDropdownContext } from './DropdownContext';
import { cn } from '@/main/lib/utils/utils';

const itemStyles = {
  base: 'flex items-center justify-between transition-colors duration-200 outline-none cursor-default',
  container: {
    default: 'px-4 py-2',
    rounded: 'px-4 py-2 mx-2 first:mt-2 last:mb-2',
    sharp: 'px-4 py-2 border-l-2 border-transparent'
  },
  state: {
    selected: {
      default: 'text-pr-cont cursor-default',
      rounded: 'text-pr-cont cursor-default',
      sharp: 'font-bold cursor-default'
    },
    focused: {
      default: 'bg-pr-cont text-on-pr',
      rounded: 'bg-pr-cont text-on-pr rounded-lg',
      sharp: 'bg-sf-cont border-l-2 border-ol'
    },
    normal: {
      default: 'text-on-sf hover:bg-sf-hst cursor-pointer',
      rounded: 'text-on-sf hover:bg-sf-hst hover:text-pr-cont rounded-lg cursor-pointer',
      sharp: 'text-on-sf hover:border-l-3 hover:border-ol cursor-pointer'
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