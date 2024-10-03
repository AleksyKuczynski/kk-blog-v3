// /frontend/src/main/components/Dropdown.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from './ThemeSwitcher';

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: 'icon' | 'narrow' | 'wide' | 'search';
  align?: 'left' | 'right';
  className?: string;
  parentRef?: React.RefObject<HTMLElement>;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const dropdownStyles = {
  base: {
    default: 'absolute z-60 bg-bgcolor-alt text-txcolor-secondary shadow-lg border border-tx-color-muted rounded-[var(--border-radius)]',
    rounded: 'absolute z-60 bg-bgcolor-alt text-txcolor-secondary shadow-lg border border-tx-color-muted rounded-[var(--border-radius)]',
    sharp: 'absolute z-60 bg-bgcolor-alt text-txcolor-secondary shadow-lg border border-tx-color-muted rounded-[var(--border-radius)]',
  },
  width: {
    icon: 'w-40',
    narrow: 'w-48',
    wide: 'w-64',
    search: 'w-full',
  },
  align: {
    left: 'left-0',
    right: 'right-0',
  },
};

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({
  children,
  isOpen,
  onClose,
  width = 'narrow',
  align = 'left',
  className = '',
  parentRef,
  onKeyDown,
}, ref) => {
  const { currentTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  useEffect(() => {
    if (isOpen && dropdownRef.current && parentRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - parentRect.bottom;
      const spaceAbove = parentRect.top;

      if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }
  }, [isOpen, parentRef]);

  if (!isOpen) return null;

  const baseStyle = dropdownStyles.base[currentTheme];
  const widthStyle = dropdownStyles.width[width];
  const alignStyle = dropdownStyles.align[align];
  const positionStyle = position === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1';

  return (
    <div 
      ref={ref || dropdownRef}
      className={`${baseStyle} ${widthStyle} ${alignStyle} ${positionStyle} ${className}`}
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      {children}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';