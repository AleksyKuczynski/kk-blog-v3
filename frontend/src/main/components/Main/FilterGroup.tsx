// src/main/components/Main/FilterGroup.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CustomButton } from '../CustomButton';
import { Dropdown } from '../Dropdown';
import { ChevronDownIcon, ResetIcon, DateSortUpIcon, DateSortDownIcon } from '../Icons';
import { Category } from '@/main/lib/directus/interfaces';
import { SortingTranslations, CategoryTranslations, Lang } from '@/main/lib/dictionaries/types';
import { useKeyboardNavigation } from '@/main/lib/hooks';

interface FilterGroupProps {
  currentSort: string;
  currentCategory: string;
  categories: Category[];
  sortingTranslations: SortingTranslations;
  categoryTranslations: CategoryTranslations;
  resetText: string;
  lang: Lang;
}

export default function FilterGroup({
  currentSort,
  currentCategory,
  categories,
  sortingTranslations,
  categoryTranslations,
  resetText,
  lang,
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useKeyboardNavigation(dropdownRef, isOpen, () => setIsOpen(false));

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', newCategory);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleSortChange = () => {
    const params = new URLSearchParams(searchParams);
    const newSort = currentSort === 'desc' ? 'asc' : 'desc';
    params.set('sort', newSort);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(pathname);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, category: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCategoryChange(category);
    }
  };

  return (
    <div className="mb-8 flex justify-center items-start space-x-8">
      <div className="flex flex-col items-center">
        <span className="mb-2 text-sm font-medium">{categoryTranslations.categories}</span>
        <div className="relative" ref={dropdownRef}>
          <CustomButton
            color="primary"
            style="outlined"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-40"
          >
            <span className="truncate">
              {currentCategory ? categories.find(c => c.slug === currentCategory)?.name : categoryTranslations.allCategories}
            </span>
            <ChevronDownIcon className="h-5 w-5 ml-2 flex-shrink-0" />
          </CustomButton>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} width="wide" align="right">
            <ul className="py-1">
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleCategoryChange('')}
                  onKeyDown={(e) => handleKeyDown(e, '')}
                >
                  {categoryTranslations.allCategories}
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleCategoryChange(category.slug)}
                    onKeyDown={(e) => handleKeyDown(e, category.slug)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="mb-2 text-sm font-medium">{sortingTranslations.sortOrder}</span>
        <CustomButton
          style="filled"
          color="primary"
          content="icon"
          onClick={handleSortChange}
          icon={currentSort === 'desc' ? <DateSortDownIcon className="h-5 w-5" /> : <DateSortUpIcon className="h-5 w-5" />}
          aria-label={currentSort === 'desc' ? sortingTranslations.oldest : sortingTranslations.newest}
        />
        <span className="mt-2 text-xs">{currentSort === 'desc' ? sortingTranslations.newest : sortingTranslations.oldest}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="mb-2 text-sm font-medium">{resetText}</span>
        <CustomButton
          color="secondary"
          content="icon"
          style="outlined"
          onClick={handleReset}
          icon={<ResetIcon className="h-5 w-5" />}
          aria-label={resetText}
        />
      </div>
    </div>
  );
}