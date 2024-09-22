// src/main/components/ListboxLanguageSwitcher.tsx

import { Listbox } from '@headlessui/react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { switchLanguage } from '@/main/lib/actions';
import { Lang } from '../lib/dictionaries/types';

const languages: { [key in Lang]: string } = {
  en: 'English',
  fr: 'Français',
  pl: 'Polski',
  ru: 'Русский',
};

export function ListboxLanguageSwitcher({ currentLang }: { currentLang: Lang }) {
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
  };

  return (
    <Listbox value={currentLang} onChange={handleLanguageChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            <Image
              src={`/flags/${currentLang}.svg`}
              alt={languages[currentLang]}
              width={20}
              height={15}
              className="inline-block mr-2"
            />
            {languages[currentLang]}
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {Object.entries(languages).map(([lang, name]) => (
            <Listbox.Option
              key={lang}
              value={lang}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    <Image
                      src={`/flags/${lang}.svg`}
                      alt={name}
                      width={20}
                      height={15}
                      className="inline-block mr-2"
                    />
                    {name}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}