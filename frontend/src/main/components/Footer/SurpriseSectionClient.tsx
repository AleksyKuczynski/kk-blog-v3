// src/main/components/Footer/SurpriseSectionClient.tsx
'use client';

import React from 'react';
import { CustomButton } from '../Interface/CustomButton';

interface SurpriseSectionClientProps {
  translations: {
    clickForSurprise: string;
  };
}

export default function SurpriseSectionClient({ translations }: SurpriseSectionClientProps) {
  return (
    <CustomButton
      color="primary"
      onClick={() => alert('Thanks for visiting our crazy footer!')}
    >
      {translations.clickForSurprise}
    </CustomButton>
  );
}