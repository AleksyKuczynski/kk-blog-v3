// src/main/components/Main/SortingControl.tsx

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CustomButton } from '../CustomButton';
import { SortingTranslations } from '@/main/lib/dictionaries/types';

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
    <CustomButton variant="accent" onClick={toggleSort}>
      {translations.sortOrder}: {currentSort === 'desc' ? translations.newest : translations.oldest}
    </CustomButton>
  );
}