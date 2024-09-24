// src/main/components/Main/FilterSortGroup.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import SortingControl from './SortingControl';
import ResetButton from './ResetButton';
import { CustomButton } from '../CustomButton';
import { Dropdown } from '../Dropdown';
import { FilterIcon, ChevronDownIcon } from '../Icons';
import { Category } from '@/main/lib/directus/interfaces';
import { SortingTranslations, CategoryTranslations, Lang } from '@/main/lib/dictionaries/types';

interface FilterSortGroupProps {
  currentSort: string;
  currentCategory: string;
  categories: Category[];
  sortingTranslations: SortingTranslations;
  categoryTranslations: CategoryTranslations;
  resetText: string;
  lang: Lang;
}

export default function FilterSortGroup({
  currentSort,
  currentCategory,
  categories,
  sortingTranslations,
  categoryTranslations,
  resetText,
  lang,
}: FilterSortGroupProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', newCategory);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const CategorySelector = () => (
    <div className="relative">
      <CustomButton
        variant="secondary"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        icon={<ChevronDownIcon className="h-5 w-5 ml-2" />}
      >
        {currentCategory ? categories.find(c => c.slug === currentCategory)?.name : categoryTranslations.allCategories}
      </CustomButton>
      <Dropdown isOpen={isMobileOpen} width="wide">
        <ul className="py-1">
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => handleCategoryChange('')}
            >
              {categoryTranslations.allCategories}
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange(category.slug)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="md:hidden">
        <CustomButton
          variant="secondary"
          className="w-full mb-4"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          icon={<FilterIcon className="h-5 w-5 mr-2" />}
        >
          Filter & Sort
        </CustomButton>
        <Dropdown isOpen={isMobileOpen} width="wide">
          <div className="p-4 space-y-4">
            <SortingControl currentSort={currentSort} translations={sortingTranslations} />
            <CategorySelector />
            <ResetButton resetText={resetText} />
          </div>
        </Dropdown>
      </div>
      <div className="hidden md:flex justify-between items-center space-x-4">
        <SortingControl currentSort={currentSort} translations={sortingTranslations} />
        <CategorySelector />
        <ResetButton resetText={resetText} />
      </div>
    </div>
  );
}