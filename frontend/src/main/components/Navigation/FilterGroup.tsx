// /frontend/src/main/components/Main/FilterGroup.tsx
'use client';

import { useCallback } from 'react';
import { Category } from '@/main/lib/directus/interfaces';
import { SortingTranslations, CategoryTranslations, Lang } from '@/main/lib/dictionaries/types';
import { useDropdown } from '@/main/lib/hooks';
import { useFilterGroup } from './useFilterGroup';
import SortingControl from './SortingControl';
import { ChevronDownIcon, CustomButton, Dropdown, DropdownItem, NavButton, ResetIcon } from '../Interface';

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
  const {
    currentCategory,
    currentSort,
    handleCategoryChange,
    handleSortChange,
    handleReset,
  } = useFilterGroup(categories, lang);

  const {
    isOpen: isCategoryOpen,
    toggle: toggleCategoryDropdown,
    close: closeCategoryDropdown,
    dropdownRef: categoryDropdownRef,
    toggleRef: categoryToggleRef,
  } = useDropdown();

  const handleCategorySelect = useCallback((category: string) => {
    handleCategoryChange(category);
    closeCategoryDropdown();
  }, [handleCategoryChange, closeCategoryDropdown]);

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
            onClose={closeCategoryDropdown} 
            width="wide" 
            align="left"
          >
            <ul className="py-1">
              <li>
                <DropdownItem
                  state={currentCategory === '' ? 'selected' : 'normal'}
                  onClick={() => handleCategorySelect('')}
                >
                  {categoryTranslations.allCategories}
                </DropdownItem>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <DropdownItem
                    state={category.slug === currentCategory ? 'selected' : 'normal'}
                    onClick={() => handleCategorySelect(category.slug)}
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
        <SortingControl 
          translations={sortingTranslations}
          currentSort={currentSort}
          onSortChange={handleSortChange}
        />
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