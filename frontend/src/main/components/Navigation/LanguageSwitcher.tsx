// src/main/components/Navigation/LanguageSwitcher.tsx
'use client';

import React, { createContext, useState, useContext, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { switchLanguage } from '@/main/lib/actions';
import { Lang } from '@/main/lib/dictionaries/types';
import { CheckIcon, LanguageIcon } from '../Icons';
import { Dropdown } from '../Dropdown';
import { NavButton } from './NavButton';
import { useOutsideClick } from '@/main/lib/hooks';

const languages: { [key in Lang]: string } = {
  en: 'English',
  fr: 'Français',
  pl: 'Polski',
  ru: 'Русский',
};

const languageSwitcherStyles = {
  dropdownItem: 'flex items-center w-full px-4 py-2 text-sm text-text-primary dark:text-text-inverted hover:bg-secondary hover:text-text-inverted transition-colors duration-200',
};

interface LanguageSwitcherContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentLang: Lang;
  handleLanguageChange: (newLang: Lang) => Promise<void>;
}

const LanguageSwitcherContext = createContext<LanguageSwitcherContextType | undefined>(undefined);

function LanguageSwitcherProvider({ children, currentLang }: { children: React.ReactNode; currentLang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLanguageChange = async (newLang: Lang) => {
    if (newLang !== currentLang) {
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
    }
    setIsOpen(false);
  };

  return (
    <LanguageSwitcherContext.Provider value={{ isOpen, setIsOpen, currentLang, handleLanguageChange }}>
      {children}
    </LanguageSwitcherContext.Provider>
  );
}

function useLanguageSwitcher() {
  const context = useContext(LanguageSwitcherContext);
  if (context === undefined) {
    throw new Error('useLanguageSwitcher must be used within a LanguageSwitcherProvider');
  }
  return context;
}

function LanguageSwitcherContent() {
  const { isOpen, setIsOpen, currentLang, handleLanguageChange } = useLanguageSwitcher();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(menuRef, toggleRef, isOpen, () => setIsOpen(false));

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative">
      <NavButton
        context="desktop"
        ref={toggleRef}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<LanguageIcon className="h-6 w-6" aria-hidden="true" />}
      />
      <Dropdown 
        ref={menuRef}
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        width="icon" 
        align="right"
      >
        <ul
          className="py-1 text-base focus:outline-none sm:text-sm"
          role="listbox"
        >
          {Object.entries(languages).map(([lang, name]) => (
            <li key={lang}>
              <button
                className={`${languageSwitcherStyles.dropdownItem} ${
                  lang === currentLang ? 'bg-accent text-text-inverted' : ''
                }`}
                onClick={() => handleLanguageChange(lang as Lang)}
                role="option"
                aria-selected={lang === currentLang}
              >
                <span className="flex items-center justify-center w-5 mr-3">
                  {lang === currentLang && (
                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}

export function LanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  return (
    <LanguageSwitcherProvider currentLang={currentLang}>
      <LanguageSwitcherContent />
    </LanguageSwitcherProvider>
  );
}