// src/main/components/Main/FilterGroup.tsx
'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Category } from '@/main/lib/directus/interfaces';
import { SortingTranslations, CategoryTranslations, Lang } from '@/main/lib/dictionaries/types';
import { 
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  NavButton,
  CustomButton,
  ChevronDownIcon,
  ResetIcon
} from '../Interface';

interface FilterGroupProps {
  categories: Category[];
  sortingTranslations: SortingTranslations;
  categoryTranslations: CategoryTranslations;
  resetText: string;
  lang: Lang;
}

export default function FilterGroup({
  categories,
  sortingTranslations,
  categoryTranslations,
  resetText,
  lang
}: FilterGroupProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current states from URL
  const currentCategory = pathname.split('/').pop() || '';
  const currentSort = searchParams.get('sort') || 'desc';
  const isArticlesPath = pathname.endsWith('/articles');

  // Handler functions
  const handleCategoryChange = (newCategory: string) => {
    if (newCategory) {
      router.push(`/${lang}/category/${newCategory}`);
    } else {
      router.push(`/${lang}/articles`);
    }
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    if (isArticlesPath) {
      if (currentCategory || currentSort !== 'desc') {
        router.push(`/${lang}/articles`);
      }
    } else {
      router.push(`/${lang}/articles`);
    }
  };

  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
      {/* Category Selector */}
      <div className="flex flex-col">
        <span className="mb-2 text-sm font-medium text-prcolor">
          {categoryTranslations.categories}
        </span>
        <Dropdown>
          <DropdownTrigger>
            <NavButton
              context="desktop"
              className="flex items-center justify-between w-full sm:w-48 capitalize px-4 py-2 border-2 border-prcolor rounded-md"
            >
              <span className="truncate">
                {currentCategory 
                  ? categories.find(c => c.slug === currentCategory)?.name 
                  : categoryTranslations.allCategories}
              </span>
              <ChevronDownIcon className="h-5 w-5 ml-2 flex-shrink-0" />
            </NavButton>
          </DropdownTrigger>

          <DropdownContent width="wide" align="left">
            <ul className="py-1" role="listbox">
              <li
                role="option"
                aria-selected={currentCategory === ''}
                onClick={() => handleCategoryChange('')}
                className={`
                  px-4 py-2 cursor-pointer
                  ${!currentCategory 
                    ? 'bg-prcolor text-txcolor-inverted' 
                    : 'text-txcolor hover:bg-bgcolor-accent'}
                `}
              >
                {categoryTranslations.allCategories}
              </li>
              {categories.map((category) => (
                <li
                  key={category.slug}
                  role="option"
                  aria-selected={category.slug === currentCategory}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`
                    px-4 py-2 cursor-pointer
                    ${category.slug === currentCategory 
                      ? 'bg-prcolor text-txcolor-inverted' 
                      : 'text-txcolor hover:bg-bgcolor-accent'}
                  `}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </DropdownContent>
        </Dropdown>
      </div>

      {/* Sort Order Selector */}
      <div className="flex flex-col">
        <span className="mb-2 text-sm font-medium text-prcolor">
          {sortingTranslations.sortOrder}
        </span>
        <Dropdown>
          <DropdownTrigger>
            <NavButton
              context="desktop"
              className="flex items-center justify-between w-full sm:w-48 px-4 py-2 border-2 border-prcolor rounded-md"
            >
              <span className="truncate">
                {sortingTranslations[currentSort === 'desc' ? 'newest' : 'oldest']}
              </span>
              <ChevronDownIcon className="h-5 w-5 ml-2 flex-shrink-0" />
            </NavButton>
          </DropdownTrigger>

          <DropdownContent width="wide" align="left">
            <ul className="py-1" role="listbox">
              {[
                { value: 'desc', label: sortingTranslations.newest },
                { value: 'asc', label: sortingTranslations.oldest }
              ].map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={currentSort === option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`
                    px-4 py-2 cursor-pointer
                    ${currentSort === option.value 
                      ? 'bg-prcolor text-txcolor-inverted' 
                      : 'text-txcolor hover:bg-bgcolor-accent'}
                  `}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </DropdownContent>
        </Dropdown>
      </div>

      {/* Reset Button */}
      <div className="flex flex-col justify-end">
        <CustomButton
          color="primary"
          onClick={handleReset}
          aria-label={resetText}
        >
          {resetText}
        </CustomButton>
      </div>
    </div>
  );
}