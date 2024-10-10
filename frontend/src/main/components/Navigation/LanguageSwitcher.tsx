// src/main/components/Navigation/LanguageSwitcher.tsx
'use client';

import React, { createContext, useState, useContext, useCallback, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Lang } from '@/main/lib/dictionaries/types';
import { switchLanguage } from '@/main/lib/actions';
import { useDropdown } from '@/main/lib/hooks';
import { CheckIcon, Dropdown, DropdownItem, NavButton, LanguageIcon } from '../Interface';

const languages: { [key in Lang]: string } = {
  en: 'English',
  fr: 'Français',
  pl: 'Polski',
  ru: 'Русский',
};

interface LanguageSwitcherContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentLang: Lang;
  handleLanguageChange: (newLang: Lang) => Promise<void>;
}

const LanguageSwitcherContext = createContext<LanguageSwitcherContextType | undefined>(undefined);

function useLanguageSwitcher() {
  const context = useContext(LanguageSwitcherContext);
  if (context === undefined) {
    throw new Error('useLanguageSwitcher must be used within a LanguageSwitcherProvider');
  }
  return context;
}

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

function LanguageSwitcherContent() {
  const { currentLang, handleLanguageChange } = useLanguageSwitcher();
  const {
    isOpen,
    toggle: toggleDropdown,
    close: closeDropdown,
    dropdownRef,
    toggleRef,
  } = useDropdown();

  const handleLanguageSelect = useCallback((lang: Lang) => {
    handleLanguageChange(lang);
    closeDropdown();
  }, [handleLanguageChange, closeDropdown]);
  
  return (
    <div className="relative">
      <NavButton
        ref={toggleRef}
        context="desktop"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<LanguageIcon className="h-6 w-6" aria-hidden="true" />}
      />
      <Dropdown 
        ref={dropdownRef}
        isOpen={isOpen} 
        onClose={closeDropdown} 
        width="icon" 
        align="right"
      >
        <ul
          className="py-1 text-base focus:outline-none sm:text-sm"
          role="listbox"
        >
          {Object.entries(languages).map(([lang, name]) => (
            <li key={lang}>
              <DropdownItem
                state={lang === currentLang ? 'selected' : 'normal'}
                onClick={() => handleLanguageSelect(lang as Lang)}
                withCheckmark
              >
                <span>{name}</span>
                {lang === currentLang && (
                  <CheckIcon className="h-4 w-4 ml-2" aria-hidden="true" />
                )}
              </DropdownItem>
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

export function MobileLanguageSwitcherContent() {
  const { currentLang, handleLanguageChange } = useLanguageSwitcher();
  const {
    isOpen,
    toggle: toggleDropdown,
    close: closeDropdown,
    dropdownRef,
    toggleRef,
  } = useDropdown();

  return (
    <div className="relative">
      <NavButton
        ref={toggleRef}
        context="mobile"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        icon={<LanguageIcon className="h-6 w-6" />}
      />
      <Dropdown 
        ref={dropdownRef}
        isOpen={isOpen} 
        onClose={closeDropdown} 
        width="narrow" 
        align="left"
      >
        {Object.entries(languages).map(([lang, name]) => (
          <DropdownItem
            key={lang}
            state={currentLang === lang ? 'selected' : 'normal'}
            onClick={() => {
              handleLanguageChange(lang as Lang);
              closeDropdown();
            }}
          >
            {name}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}

export function MobileLanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  return (
    <LanguageSwitcherProvider currentLang={currentLang}>
      <MobileLanguageSwitcherContent />
    </LanguageSwitcherProvider>
  );
}