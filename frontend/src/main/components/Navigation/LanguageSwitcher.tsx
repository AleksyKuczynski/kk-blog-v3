// src/main/components/Navigation/LanguageSwitcher.tsx
'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Lang } from '@/main/lib/dictionaries/types';
import { switchLanguage } from '@/main/lib/actions';
import { 
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  NavButton,
  CheckIcon,
  LanguageIcon 
} from '../Interface';

const languages: Record<Lang, string> = {
  en: 'English',
  fr: 'Français',
  pl: 'Polski',
  ru: 'Русский',
};

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

  const handleLanguageChange = async (newLang: Lang) => {
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

  return (
    <Dropdown>
      <DropdownTrigger>
        <NavButton
          context={context}
          icon={<LanguageIcon className="h-6 w-6" aria-hidden="true" />}
          aria-label="Select language"
        />
      </DropdownTrigger>

      <DropdownContent 
        width={context === 'mobile' ? 'wide' : 'icon'} 
        align={context === 'mobile' ? 'left' : 'right'}
      >
        <ul 
          className="py-1" 
          role="listbox" 
          aria-label="Select language"
        >
          {Object.entries(languages).map(([lang, name]) => (
            <li 
              key={lang}
              role="option" 
              aria-selected={currentLang === lang}
              className={`
                flex items-center justify-between px-4 py-2 cursor-pointer
                ${currentLang === lang 
                  ? 'bg-prcolor text-txcolor-inverted' 
                  : 'text-txcolor hover:bg-bgcolor-accent'}
              `}
              onClick={() => handleLanguageChange(lang as Lang)}
            >
              <span>{name}</span>
              {currentLang === lang && (
                <CheckIcon className="h-4 w-4 ml-2" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>
      </DropdownContent>
    </Dropdown>
  );
}