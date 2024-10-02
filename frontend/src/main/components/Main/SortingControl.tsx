// src/main/components/Main/SortingControl.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SortingTranslations } from '@/main/lib/dictionaries/types';
import { DateSortDownIcon, DateSortUpIcon, ChevronDownIcon } from '../Icons';
import { Dropdown } from '../Dropdown';
import { NavButton } from '../Navigation/NavButton';
import { useOutsideClick } from '@/main/lib/hooks';

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
    { value: 'desc', label: translations.newest, icon: <DateSortDownIcon className="h-5 w-5 mr-2" /> },
    { value: 'asc', label: translations.oldest, icon: <DateSortUpIcon className="h-5 w-5 mr-2" /> },
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
          <span className="flex items-center">
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
          <ul className="py-1">
            {sortOptions.map((option) => (
              <li key={option.value}>
                <button
                  className={`w-full text-left px-4 py-2 flex items-center ${
                    currentSort === option.value ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </Dropdown>
      </div>
    </>
  );
}