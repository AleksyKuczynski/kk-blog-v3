// src/main/components/ThemeSwitcher/ThemeSwitcher.tsx
'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { useColor } from './ColorContext';
import { Theme, ColorScheme, ThemeSwitcherProps } from './themeTypes';
import { NavButton } from '../Interface';
import { PaletteIcon } from '../Interface/Icons';
import type { DropdownItemType } from '../Interface/Dropdown/types';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '../Interface/Dropdown';

export function ThemeSwitcher({ 
  themeTranslations, 
  colorTranslations, 
  context = 'desktop' 
}: ThemeSwitcherProps) {
  const { currentTheme, handleThemeChange } = useTheme();
  const { colorScheme, setColorScheme } = useColor();

  const themeItems = React.useMemo(() => [
    { id: 'default', label: themeTranslations.default, value: 'default', group: 'theme' },
    { id: 'rounded', label: themeTranslations.rounded, value: 'rounded', group: 'theme' },
    { id: 'sharp', label: themeTranslations.sharp, value: 'sharp', group: 'theme' }
  ], [themeTranslations]);

  const colorItems = React.useMemo(() => [
    { id: 'default', label: colorTranslations.default, value: 'default', group: 'color' },
    { id: 'scheme1', label: colorTranslations.scheme1, value: 'scheme1', group: 'color' },
    { id: 'scheme2', label: colorTranslations.scheme2, value: 'scheme2', group: 'color' }
  ], [colorTranslations]);

  const handleSelect = async (item: DropdownItemType) => {
    if (item.group === 'theme') {
      await handleThemeChange(item.value as Theme);
    } else {
      await setColorScheme(item.value as ColorScheme);
    }
  };

  const allItems = [...themeItems, ...colorItems];

  return (
    <Dropdown
      items={allItems}
      onSelect={handleSelect}
      position='right'
    >
      <DropdownTrigger>
        <NavButton
          context={context}
          aria-label="Customize appearance"
        >
          <PaletteIcon className="h-6 w-6" aria-hidden="true" />
        </NavButton>
      </DropdownTrigger>
      <DropdownContent>
        <div className="grid grid-cols-2 divide-x divide-bgcolor-alt min-w-[320px]">
          {/* Theme Section */}
          <div role="group" aria-label={themeTranslations.name} className="py-1">
            <div className="px-4 py-2 text-sm font-medium text-txcolor-secondary whitespace-nowrap">
              {themeTranslations.name}
            </div>
            <ul>
              {themeItems.map((item, index) => (
                <DropdownItem
                  key={item.id}
                  item={item}
                  index={index}
                  isSelected={currentTheme === item.value}
                  onSelect={() => handleSelect(item)}
                />
              ))}
            </ul>
          </div>

          {/* Color Scheme Section */}
          <div role="group" aria-label={colorTranslations.name} className="py-1 px-2">
            <div className="px-2 py-2 text-sm font-medium text-txcolor-secondary whitespace-nowrap">
              {colorTranslations.name}
            </div>
            <ul>
              {colorItems.map((item, index) => (
                <DropdownItem
                  key={item.id}
                  item={item}
                  index={index + themeItems.length}
                  isSelected={colorScheme === item.value}
                  onSelect={() => handleSelect(item)}
                />
              ))}
            </ul>
          </div>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}