// src/main/components/ListboxLanguageSwitcher.tsx
'use client';

import React, { createContext, useState, useContext } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { switchLanguage } from '@/main/lib/actions';
import { Lang } from '@/main/lib/dictionaries/types';
import { CheckIcon, ChevronDownIcon, LanguageIcon } from './Icons';
import { CustomButton } from './CustomButton';
import { useOutsideClick } from '../lib/useOutsideClick';
import { useTheme } from './ThemeContext';
import { Dropdown } from './Dropdown';

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

function LanguageSwitcherButton() {
  const { isOpen, setIsOpen, currentLang } = useLanguageSwitcher();

  return (
    <CustomButton
      variant="icon"
      onClick={() => setIsOpen(!isOpen)}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      icon={<LanguageIcon className="h-6 w-6" aria-hidden="true" />}
    >
      <span className="sr-only">{languages[currentLang]}</span>
    </CustomButton>
  );
}

function LanguageSwitcherOptions() {
  const { currentLang, handleLanguageChange } = useLanguageSwitcher();
  const { currentTheme } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      // Close the dropdown
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const options = Array.from(e.currentTarget.querySelectorAll('button'));
      const currentIndex = options.findIndex((option) => option === document.activeElement);
      const nextIndex = e.key === 'ArrowDown' 
        ? (currentIndex + 1) % options.length 
        : (currentIndex - 1 + options.length) % options.length;
      (options[nextIndex] as HTMLElement).focus();
    }
  };

  return (
    <ul
      className="py-1 text-base focus:outline-none sm:text-sm"
      role="listbox"
      onKeyDown={handleKeyDown}
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
  );
}

function LanguageSwitcherContent() {
  const { isOpen, setIsOpen } = useLanguageSwitcher();
  const ref = useOutsideClick<HTMLDivElement>(isOpen, setIsOpen);

  return (
    <div className="relative" ref={ref}>
      <CustomButton
        variant="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<LanguageIcon className="h-6 w-6" aria-hidden="true" />}
      />
      <Dropdown isOpen={isOpen} width="icon" align="right">
        <LanguageSwitcherOptions />
      </Dropdown>
    </div>
  );
}

export function ListboxLanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  return (
    <LanguageSwitcherProvider currentLang={currentLang}>
      <LanguageSwitcherContent />
    </LanguageSwitcherProvider>
  );
}