// src/main/components/Navigation/LanguageSwitcher.tsx
'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Lang } from '@/main/lib/dictionaries/dictionariesTypes';
import { switchLanguage } from '@/main/lib/actions';
import { NavButton } from '../Interface';
import { LanguageIcon } from '../Interface/Icons';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '../Interface/Dropdown';
import type { DropdownItemType } from '../Interface/Dropdown/types';

const languageItems: DropdownItemType[] = [
  { id: 'en', label: 'English', value: 'en' },
  { id: 'fr', label: 'Français', value: 'fr' },
  { id: 'pl', label: 'Polski', value: 'pl' },
  { id: 'ru', label: 'Русский', value: 'ru' },
];

interface LanguageSwitcherProps {
  currentLang: Lang;
  context?: 'mobile' | 'desktop';
}

export function LanguageSwitcher({ 
  currentLang, 
  context = 'desktop' 
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLanguageChange = async (item: DropdownItemType) => {
    const newLang = item.value as Lang;
    if (newLang === currentLang) return;

    const currentParams = new URLSearchParams(searchParams);
    const context = currentParams.get('context');
    const author = currentParams.get('author');

    let newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    
    if (context) {
      newPath += `?context=${context}`;
      if (author) {
        newPath += `&author=${author}`;
      }
    }

    await switchLanguage(newLang, newPath);
    router.refresh();
  };

  const items = React.useMemo(() => 
    languageItems.map(item => ({
      ...item,
      selected: item.value === currentLang
    }))
  , [currentLang]);

  return (
    <Dropdown
      items={items}
      onSelect={handleLanguageChange}
      width={context === 'mobile' ? 'wide' : 'icon'} 
      position={context === 'mobile' ? 'left' : 'right'}
    >
      <DropdownTrigger>
        <NavButton
          context={context}
          aria-label="Select language"
        >
          <LanguageIcon className="h-6 w-6" aria-hidden="true" />
        </NavButton>
      </DropdownTrigger>
      <DropdownContent>
        {items.map((item, index) => (
          <DropdownItem
            key={item.id}
            item={item}
            index={index}
            isSelected={currentLang === item.value}
            onSelect={() => handleLanguageChange(item)}
          />
        ))}
      </DropdownContent>
    </Dropdown>
  );
}