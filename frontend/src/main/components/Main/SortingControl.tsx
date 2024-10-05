// /frontend/src/main/components/Main/SortingControl.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SortingTranslations } from '@/main/lib/dictionaries/types';
import { useOutsideClick } from '@/main/lib/hooks';
import { ChevronDownIcon, CheckIcon, Dropdown, DropdownItem, NavButton } from '../Interface';

interface SortingControlProps {
  translations: SortingTranslations;
}

export default function SortingControl({ translations }: SortingControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const currentSort = searchParams.get('sort') || 'desc';
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(dropdownRef, toggleRef, isOpen, () => setIsOpen(false));

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const sortOptions = [
    { value: 'desc', label: translations.newest },
    { value: 'asc', label: translations.oldest },
  ];

  return (
    <>
      <span className="mb-2 text-sm font-medium">{translations.sortOrder}</span>
      <div className="relative">
        <NavButton
          ref={toggleRef}
          context="desktop"
          onClick={toggleDropdown}
          className="flex items-center justify-between w-40 px-4 py-2"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="truncate">
            {sortOptions.find(option => option.value === currentSort)?.label}
          </span>
          <ChevronDownIcon className="h-5 w-5 ml-2 flex-shrink-0" />
        </NavButton>
        <Dropdown 
          ref={dropdownRef}
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          width="wide" 
          align="right"
        >
          <ul className="py-1" role="listbox">
            {sortOptions.map((option) => (
              <li key={option.value} role="option" aria-selected={currentSort === option.value}>
                <DropdownItem
                  state={currentSort === option.value ? 'selected' : 'normal'}
                  onClick={() => handleSortChange(option.value)}
                  withCheckmark
                >
                  <span>{option.label}</span>
                  {currentSort === option.value && (
                    <CheckIcon className="h-4 w-4 ml-2" aria-hidden="true" />
                  )}
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Dropdown>
      </div>
    </>
  );
}