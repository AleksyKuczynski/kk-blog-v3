// src/main/components/Main/SortingControl.tsx

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CustomButton } from '../CustomButton';
import { SortingTranslations } from '@/main/lib/dictionaries/types';
import { DateSortDownIcon, DateSortUpIcon } from '../Icons';

interface SortingControlProps {
  currentSort: string;
  translations: SortingTranslations;
}

export default function SortingControl({ currentSort, translations }: SortingControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const toggleSort = () => {
    const newSort = currentSort === 'desc' ? 'asc' : 'desc';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', newSort);
    newSearchParams.set('page', '1');
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  return (
    <CustomButton
      color="secondary"
      onClick={toggleSort}
      icon={currentSort === 'desc' ? <DateSortDownIcon className="h-5 w-5" /> : <DateSortUpIcon className="h-5 w-5" />}
      aria-label={currentSort === 'desc' ? translations.oldest : translations.newest}
    />
  );
}