// src/main/components/Interface/Dropdown/DropdownItem.tsx
import React from 'react';
import { useTheme } from '@/main/components/ThemeSwitcher';
import { DropdownItemProps } from './types';
import { CheckIcon } from '../Icons';
import { useDropdownContext } from './DropdownContext';

const itemStyles = {
  common: {
    base: `
      flex items-center justify-between 
      px-4 py-2 
      
    `,
    selected: `
      text-prcolor
    `,
    hover: `
      hover:bg-bgcolor-accent
      cursor-pointer
    `
  },
  themeSensitive: {
    default: '',
    rounded: 'mx-2',
    sharp: 'hover:bg-gradient-to-r from-bgcolor-accent to-bgcolor'
  }
};

export default function DropdownItem({
    item,
    index,
    isSelected,
    onSelect
  }: DropdownItemProps) {
    const { currentTheme } = useTheme();
    const { itemRefs, handleKeyDown } = useDropdownContext();
  
    const handleItemKeyDown = (e: React.KeyboardEvent) => {
      handleKeyDown(e as unknown as KeyboardEvent);
    };

    const getClasses = () => {
      return `
        ${itemStyles.common.base}
        ${isSelected ? itemStyles.common.selected : itemStyles.common.hover}
        ${itemStyles.themeSensitive[currentTheme]}
      `.trim();
    };
    
    return (
      <li
        ref={el => {
          if (itemRefs.current) {
            itemRefs.current[index] = el;
          }
        }}
        role="option"
        className={getClasses()}
        onClick={() => onSelect()}
        onKeyDown={handleItemKeyDown}
        aria-selected={isSelected}
        tabIndex={0}
      >
        <span>{item.label}</span>
        {isSelected && (
          <CheckIcon className="h-4 w-4 ml-2" aria-hidden="true" />
        )}
      </li>
    );
  }