// src/main/components/Main/LoadMoreButton.tsx
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { CustomButton } from '../Interface/CustomButton';

interface LoadMoreButtonProps {
  currentPage: number;
  loadMoreText: string;
}

export default function LoadMoreButton({ currentPage, loadMoreText }: LoadMoreButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (currentPage + 1).toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <CustomButton
      color="accent"
      onClick={handleLoadMore}
    >
      {loadMoreText}
    </CustomButton>
  );
}