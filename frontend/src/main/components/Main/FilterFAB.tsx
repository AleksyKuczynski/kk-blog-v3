// src/main/components/Main/FilterFAB.tsx
'use client';

import { useState } from 'react';
import { CustomButton } from '../CustomButton';

export default function FilterFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <CustomButton
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full shadow-lg"
        aria-label="Toggle filters"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </CustomButton>
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-lg">
          {/* Add filter components here */}
        </div>
      )}
    </div>
  );
}