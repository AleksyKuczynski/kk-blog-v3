// /frontend/src/main/components/Interface/DropdownItem.tsx
import React, { useState } from 'react';

export type DropdownItemState = 'normal' | 'active' | 'selected' | 'disabled' | 'sectionName';

interface DropdownItemProps {
  state: DropdownItemState;
  onClick?: () => void;
  children: React.ReactNode;
  withCheckmark?: boolean;
}

export const itemStyles: Record<DropdownItemState, string> = {
  normal: 'text-txcolor',
  active: 'bg-bgcolor-accent',
  selected: 'bg-prcolor text-txcolor-inverted',
  disabled: 'text-txcolor-muted cursor-not-allowed',
  sectionName: 'text-txcolor-secondary font-medium px-4 py-2 text-sm',
};

const hoverStyle = 'hover:bg-bgcolor-accent';
const focusStyle = 'focus:outline-none focus:ring-2 focus:ring-prcolor';

export const DropdownItem: React.FC<DropdownItemProps> = ({ 
  state, 
  onClick, 
  children, 
  withCheckmark = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClassName = `w-full text-left px-4 py-2 ${itemStyles[state]} ${hoverStyle} ${focusStyle}`;
  const checkmarkClassName = withCheckmark ? 'flex items-center justify-between' : '';

  return (
    <button
      className={`${baseClassName} ${checkmarkClassName}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={state === 'disabled' || state === 'sectionName'}
    >
      {children}
    </button>
  );
};