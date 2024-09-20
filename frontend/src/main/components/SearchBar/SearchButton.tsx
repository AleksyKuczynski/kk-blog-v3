// src/main/components/SearchBar/SearchButton.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { createSearchUrl } from '@/main/lib/utils';
import { SearchIcon } from '@/main/components/Icons';
import { CustomButton } from '../CustomButton';
import { useSearch } from './SearchContext';
import { useTheme } from '@/main/components/ThemeContext';

export default function SearchButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searchQuery, setSearchQuery, setIsOpen, translations } = useSearch();
  const { currentTheme } = useTheme();

  const initiateSearch = () => {
    if (searchQuery.trim()) {
      const url = createSearchUrl(searchQuery, searchParams);
      router.push(url);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div data-search-component>
      <CustomButton
        variant="accent"
        size="sm"
        icon={<SearchIcon className="h-5 w-5" />}
        onClick={initiateSearch}
        className={`ml-2 cursor-pointer ${currentTheme === 'rounded' ? 'rounded-full' : ''}`}
      >
        {translations.submit}
      </CustomButton>
    </div>
  );
}