// src/main/components/Navigation/SortingControl.tsx
'use client';

import { ChevronDownIcon, CheckIcon, Dropdown, DropdownContent, DropdownTrigger, NavButton } from '../Interface';
import { useRouter, useSearchParams } from 'next/navigation';
import { SortingTranslations } from '@/main/lib/dictionaries/types';

interface SortingControlProps {
  translations: SortingTranslations;
  currentSort: string;
  onSortChange?: (newSort: string) => void;
  lang?: string;
}

export default function SortingControl({ translations, currentSort, onSortChange, lang }: SortingControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (newSort: string) => {
    if (onSortChange) {
      onSortChange(newSort);
    } else if (lang) {
      const params = new URLSearchParams(searchParams);
      params.set('sort', newSort);
      router.push(`/${lang}/search?${params.toString()}`, { scroll: false });
    }
  };

  const sortOptions = [
    { value: 'desc', label: translations.newest },
    { value: 'asc', label: translations.oldest },
  ];

  return (
    <>
      <span className="mb-2 text-sm font-medium text-prcolor">{translations.sortOrder}</span>
      <Dropdown>
        <DropdownTrigger>
          <NavButton
            context="desktop"
            className="flex items-center justify-between px-4 py-2 border-2 border-prcolor rounded-md"
            aria-haspopup="listbox"
          >
            <span className="truncate">
              {sortOptions.find(option => option.value === currentSort)?.label}
            </span>
            <ChevronDownIcon className="h-5 w-5 ml-2 flex-shrink-0" />
          </NavButton>
        </DropdownTrigger>

        <DropdownContent width="wide" align="right">
          <ul className="py-1" role="listbox">
            {sortOptions.map((option) => (
              <li 
                key={option.value} 
                role="option" 
                aria-selected={currentSort === option.value}
                onClick={() => handleSortChange(option.value)}
                className={`
                  flex items-center justify-between px-4 py-2 cursor-pointer
                  ${currentSort === option.value 
                    ? 'bg-prcolor text-txcolor-inverted' 
                    : 'text-txcolor hover:bg-bgcolor-accent'}
                `}
              >
                <span>{option.label}</span>
                {currentSort === option.value && (
                  <CheckIcon className="h-4 w-4 ml-2" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </DropdownContent>
      </Dropdown>
    </>
  );
}