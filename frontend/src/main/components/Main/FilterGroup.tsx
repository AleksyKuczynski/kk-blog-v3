// src/main/components/Main/FilterGroup.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Category } from '@/main/lib/directus/interfaces';
import { SortingTranslations, CategoryTranslations, Lang } from '@/main/lib/dictionaries/types';
import { useOutsideClick } from '@/main/lib/hooks';
import SortingControl from './SortingControl';
import { ChevronDownIcon, CustomButton, Dropdown, DropdownItem, NavButton, ResetIcon } from '../Interface';

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
  currentCategory,
  categories,
  sortingTranslations,
  categoryTranslations,
  resetText,
}: FilterGroupProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const categoryToggleRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(categoryDropdownRef, categoryToggleRef, isCategoryOpen, () => setIsCategoryOpen(false));

  const handleCategoryChange = useCallback((newCategory: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', newCategory);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
    setIsCategoryOpen(false);
  }, [searchParams, router, pathname]);

  const handleReset = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const toggleCategoryDropdown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCategoryOpen(!isCategoryOpen);
  }, [isCategoryOpen]);

  return (
    <div className="mb-8 flex justify-center items-start space-x-8">
      <div className="flex flex-col items-center">
        <span className="mb-2 text-sm font-medium">{categoryTranslations.categories}</span>
        <div className="relative">
          <NavButton
            ref={categoryToggleRef}
            context="desktop"
            onClick={toggleCategoryDropdown}
            className="flex items-center justify-between w-40 px-4 py-2"
            aria-haspopup="listbox"
            aria-expanded={isCategoryOpen}
          >
            <span className="truncate">
              {currentCategory ? categories.find(c => c.slug === currentCategory)?.name : categoryTranslations.allCategories}
            </span>
            <ChevronDownIcon className="h-5 w-5 ml-2 flex-shrink-0" />
          </NavButton>
          <Dropdown 
            ref={categoryDropdownRef}
            isOpen={isCategoryOpen} 
            onClose={() => setIsCategoryOpen(false)} 
            width="wide" 
            align="left"
          >
            <ul className="py-1">
              <li>
                <DropdownItem
                  state="normal"
                  onClick={() => handleCategoryChange('')}
                >
                  {categoryTranslations.allCategories}
                </DropdownItem>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <DropdownItem
                    state={category.slug === currentCategory ? 'selected' : 'normal'}
                    onClick={() => handleCategoryChange(category.slug)}
                  >
                    {category.name}
                  </DropdownItem>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <SortingControl translations={sortingTranslations} />
      </div>
      <div className="flex flex-col items-center">
        <span className="mb-2 text-sm font-medium">{resetText}</span>
        <CustomButton
          color="primary"
          content="icon"
          style="filled"
          onClick={handleReset}
          icon={<ResetIcon className="h-5 w-5" />}
          aria-label={resetText}
        />
      </div>
    </div>
  );
}