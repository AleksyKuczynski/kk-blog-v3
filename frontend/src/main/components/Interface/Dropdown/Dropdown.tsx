// src/main/components/Interface/Dropdown/Dropdown.tsx
'use client';

import React from 'react';
import type { DropdownProps } from './types';
import { DropdownContext } from './DropdownContext';
import { useOutsideClick } from '@/main/lib/hooks';
import DropdownContent from './DropdownContent';
import { useDropdown } from './useDropdown';

export default function Dropdown({
  children,
  items,
  onSelect,
  width,
  position = 'left'
}: DropdownProps) {
  const dropdownContext = useDropdown({ items, onSelect });
  const { dropdownRef, triggerRef, isOpen, close } = dropdownContext;
  
  useOutsideClick(dropdownRef, triggerRef, isOpen, close);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && 
        child.type === DropdownContent) {
      return React.cloneElement(child as React.ReactElement<any>, {
        children: <ul role="menu">{child.props.children}</ul>,
        width,
        position
      });
    }
    return child;
  });

  return (
    <DropdownContext.Provider value={dropdownContext}>
      <div 
        ref={dropdownRef}
        className="relative inline-block"
        role="presentation"
      >
        {childrenWithProps}
      </div>
    </DropdownContext.Provider>
  );
}