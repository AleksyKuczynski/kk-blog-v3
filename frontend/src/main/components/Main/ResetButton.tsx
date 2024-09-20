// src/main/components/Main/ResetButton.tsx

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CustomButton } from '../CustomButton';

interface ResetButtonProps {
  resetText: string;
}

export default function ResetButton({ resetText }: ResetButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleReset = () => {
    const currentSort = searchParams.get('sort');
    const currentCategory = searchParams.get('category');
    const currentPage = searchParams.get('page');

    if (currentSort !== 'desc' || currentCategory !== '' || currentPage !== '1') {
      router.push(`${pathname}?sort=desc&category=&page=1`, { scroll: false });
    }
  };

  return (
    <CustomButton variant="secondary" onClick={handleReset}>
      {resetText}
    </CustomButton>
  );
}