// src/main/components/Interface/Dropdown/DropdownTrigger.tsx
import React from 'react';
import { useDropdownContext } from './DropdownContext';

interface DropdownTriggerProps {
  children: React.ReactElement;
}

export default function DropdownTrigger({ children }: DropdownTriggerProps) {
  const { 
    triggerRef, 
    isOpen, 
    handleClick,
    handleKeyDown 
  } = useDropdownContext();

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    handleKeyDown(e as unknown as KeyboardEvent);
  };

  return React.cloneElement(children, {
    ref: triggerRef,
    onClick: handleClick,
    onKeyDown: handleTriggerKeyDown,
    'aria-expanded': isOpen,
    'aria-haspopup': true,
    'aria-controls': isOpen ? 'dropdown-menu' : undefined
  });
}