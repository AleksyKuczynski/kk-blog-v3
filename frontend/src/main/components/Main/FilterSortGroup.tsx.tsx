// src/main/components/Main/FilterSortGroup.tsx
'use client';

import { useState } from 'react';
import { useTheme } from '@/main/components/ThemeContext';
import { CustomButton } from '../CustomButton';
import SortingControl from './SortingControl';
import { CategorySelectorWrapper } from './CategorySelectorWrapper';
import ResetButton from './ResetButton';
import { Dropdown } from '../Dropdown';
import { FilterIcon } from '../Icons';
import { SortingTranslations, CategoryTranslations, Lang } from '@/main/lib/dictionaries/types';

interface FilterSortGroupProps {
  currentSort: string;
  sortingTranslations: SortingTranslations;
  categoryTranslations: CategoryTranslations;
  resetText: string;
  lang: Lang;
}

const filterSortGroupStyles = {
  container: 'w-full',
  mobileButton: 'md:hidden w-full mb-4',
  desktopContainer: 'hidden md:flex justify-between items-center space-x-4',
  mobileDropdown: 'md:hidden w-full p-4 space-y-4',
};

export function FilterSortGroup({
  currentSort,
  sortingTranslations,
  categoryTranslations,
  resetText,
  lang,
}: FilterSortGroupProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { currentTheme } = useTheme();

  const Content = () => (
    <>
      <SortingControl currentSort={currentSort} translations={sortingTranslations} />
      <CategorySelectorWrapper translations={categoryTranslations} lang={lang} />
      <ResetButton resetText={resetText} />
    </>
  );

  return (
    <div className={filterSortGroupStyles.container}>
      {/* Mobile view */}
      <CustomButton
        variant="secondary"
        className={filterSortGroupStyles.mobileButton}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        icon={<FilterIcon className="h-5 w-5 mr-2" />}
      >
        Filter & Sort
      </CustomButton>
      <Dropdown isOpen={isMobileOpen} width="wide">
        <div className={filterSortGroupStyles.mobileDropdown}>
          <Content />
        </div>
      </Dropdown>

      {/* Desktop view */}
      <div className={filterSortGroupStyles.desktopContainer}>
        <Content />
      </div>
    </div>
  );
}