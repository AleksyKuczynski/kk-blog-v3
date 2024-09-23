// src/main/components/Main/CategorySelector.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Category } from '@/main/lib/directus/index';
import { CheckIcon, ChevronUpDownIcon } from '@/main/components/Icons';
import { CategoryTranslations } from '@/main/lib/dictionaries/types';
import { useTheme } from '@/main/components/ThemeContext';
import { CustomButton } from '../CustomButton';
import { Dropdown } from '../Dropdown';
import { useOutsideClick } from '@/main/lib/useOutsideClick';

interface CategorySelectorProps {
  categories: Category[];
  translations: CategoryTranslations;
}

const categorySelectorStyles = {
  button: {
    default: 'w-full flex justify-between items-center px-4 py-2 text-left bg-background-light dark:bg-neutral-800 border border-accent rounded-lg shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75',
    rounded: 'w-full flex justify-between items-center px-4 py-2 text-left bg-background-light dark:bg-neutral-800 border border-accent rounded-full shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75',
    sharp: 'w-full flex justify-between items-center px-4 py-2 text-left bg-background-light dark:bg-neutral-800 border border-accent shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75',
  },
  dropdownItem: 'flex items-center w-full px-4 py-2 text-left text-text-primary dark:text-text-inverted hover:bg-secondary hover:text-text-inverted transition-colors duration-200',
};

export default function CategorySelector({ categories, translations }: CategorySelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = searchParams.get('category') || '';
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme } = useTheme();

  const ref = useOutsideClick<HTMLDivElement>(isOpen, () => setIsOpen(false));

  const selectedCategory = categories.find(cat => cat.slug === currentCategory) || { slug: '', name: translations.allCategories };

  const handleCategoryChange = (newCategory: Category) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', newCategory.slug);
    newSearchParams.set('page', '1');
    router.push(`${pathname}?${newSearchParams.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <CustomButton
        variant="secondary"
        className={categorySelectorStyles.button[currentTheme]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedCategory.name}</span>
        <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
      </CustomButton>

      <Dropdown isOpen={isOpen} width="wide">
        <ul className="py-1 max-h-60 overflow-auto" role="listbox">
          <li key="all">
            <button
              className={categorySelectorStyles.dropdownItem}
              onClick={() => handleCategoryChange({ slug: '', name: translations.allCategories })}
            >
              <span className="flex items-center justify-center w-5 mr-3">
                {currentCategory === '' && <CheckIcon className="h-4 w-4" aria-hidden="true" />}
              </span>
              <span>{translations.allCategories}</span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                className={categorySelectorStyles.dropdownItem}
                onClick={() => handleCategoryChange(category)}
              >
                <span className="flex items-center justify-center w-5 mr-3">
                  {category.slug === currentCategory && <CheckIcon className="h-4 w-4" aria-hidden="true" />}
                </span>
                <span>{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}