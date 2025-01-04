// src/main/components/Navigation/SortingControl.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortingTranslations, Lang } from '@/main/lib/dictionaries/dictionariesTypes';
import { NavButton } from '../Interface';
import { ChevronDownIcon } from '../Interface/Icons';
import type { DropdownItemType } from '../Interface/Dropdown/types';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '../Interface/Dropdown';

interface SortingControlProps {
  translations: SortingTranslations;
  currentSort: string;
  lang: Lang;
}

export default function SortingControl({ translations, currentSort, lang }: SortingControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortItems: DropdownItemType[] = [
    { id: 'desc', label: translations.newest, value: 'desc' },
    { id: 'asc', label: translations.oldest, value: 'asc' }
  ];

  const items = sortItems.map(item => ({
    ...item,
    selected: item.value === currentSort
  }));

  const handleSortChange = (item: DropdownItemType) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', item.value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-prcolor">
        {translations.sortOrder}
      </span>
      <Dropdown
        items={items}
        onSelect={handleSortChange}
        width="wide"
        position="right"
      >
        <DropdownTrigger>
          <NavButton
            context="desktop"
            className="flex items-center justify-between w-full px-4 py-2 border-2 border-prcolor rounded-md"
            aria-label={translations.sortOrder}
          >
            <span className="truncate">
              {sortItems.find(item => item.value === currentSort)?.label}
            </span>
            <ChevronDownIcon className="h-5 w-5 ml-2 flex-shrink-0" />
          </NavButton>
        </DropdownTrigger>
        <DropdownContent>
          {items.map((item, index) => (
            <DropdownItem
              key={item.id}
              item={item}
              index={index}
              isSelected={item.value === currentSort}
              onSelect={() => handleSortChange(item)}
            />
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
}