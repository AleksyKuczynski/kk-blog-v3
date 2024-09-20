// src/main/components/Main/CategorySelector.tsx

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { Category } from '@/main/lib/directus/index';
import { CheckIcon, ChevronUpDownIcon } from '@/main/components/Icons';
import { CategoryTranslations } from '@/main/lib/dictionaries/types';

interface CategorySelectorProps {
  categories: Category[];
  translations: CategoryTranslations;
}

export default function CategorySelector({ categories, translations }: CategorySelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = searchParams.get('category') || '';

  const selectedCategory = categories.find(cat => cat.slug === currentCategory) || { slug: '', name: translations.allCategories };

  const handleCategoryChange = (newCategory: Category) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', newCategory.slug);
    newSearchParams.set('page', '1');
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Listbox value={selectedCategory} onChange={handleCategoryChange}>
      <div className="relative mt-1">
        <ListboxButton className="relative w-full cursor-default rounded-lg bg-background-light py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light text-text-primary">
          <span className="block truncate">{selectedCategory.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-text-secondary"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>
        <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background-light py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ListboxOption
            key="all"
            value={{ slug: '', name: translations.allCategories }}
            className={({ focus }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                focus ? 'bg-accent text-text-inverted' : 'text-text-primary'
              }`
            }
          >
            {({ selected }) => (
              <>
                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                  {translations.allCategories}
                </span>
                {selected ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-dark">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </ListboxOption>
          {categories.map((category) => (
            <ListboxOption
              key={category.slug}
              value={category}
              className={({ focus }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  focus ? 'bg-accent text-text-inverted' : 'text-text-primary'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {category.name}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-dark">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}