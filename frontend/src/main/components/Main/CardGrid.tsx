// src/main/components/Main/CardGrid.tsx
import React from 'react';
import { Theme } from '@/main/components/ThemeSwitcher/themeTypes';
import { getTheme } from '../ThemeSwitcher';

interface CardGridProps {
  children: React.ReactNode;
}

const cardGridStyles = {
  common: {
    container: `
      grid 
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
      py-8
      container mx-auto
    `,
  },
  themeSensitive: {
    default: {
      container: 'gap-6 sm:gap-8',
    },
    rounded: {
      container: 'gap-6 sm:gap-8',
    },
    sharp: {
      container: 'gap-2',
    },
  },
};

export default async function CardGrid({ children }: CardGridProps) {
  const theme = await getTheme();

  const containerClassName = `${cardGridStyles.common.container} ${cardGridStyles.themeSensitive[theme].container}`.trim();

  return (
    <div className={containerClassName}>
      {children}
    </div>
  );
}