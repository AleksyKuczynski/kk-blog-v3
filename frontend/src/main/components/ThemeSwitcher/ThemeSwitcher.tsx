// src/main/components/ThemeSwitcher/ThemeSwitcher.tsx
'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { useColor } from './ColorContext';
import { Theme, ColorScheme, ThemeSwitcherProps } from './themeTypes';
import { NavButton } from '../Interface';
import { PaletteIcon } from '../Interface/Icons';
import type { DropdownItemType } from '../Interface/Dropdown/types';
import Dropdown from '../Interface/Dropdown/Dropdown';
import DropdownTrigger from '../Interface/Dropdown/DropdownTrigger';
import DropdownContent from '../Interface/Dropdown/DropdownContent';
import DropdownItem from '../Interface/Dropdown/DropdownItem';

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
      width={context === 'mobile' ? 'wide' : 'icon'}
      position={context === 'mobile' ? 'left' : 'right'}
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
        <div className="py-1">
          <div className="px-4 py-2 text-sm font-medium text-txcolor-secondary">
            {themeTranslations.name}
          </div>
          {themeItems.map((item, index) => (
            <DropdownItem
              key={item.id}
              item={item}
              index={index}
              isSelected={currentTheme === item.value}
              onSelect={() => handleSelect(item)}
            />
          ))}
        </div>
        <div className="border-t border-bgcolor-alt py-1">
          <div className="px-4 py-2 text-sm font-medium text-txcolor-secondary">
            {colorTranslations.name}
          </div>
          {colorItems.map((item, index) => (
            <DropdownItem
              key={item.id}
              item={item}
              index={index + themeItems.length}
              isSelected={colorScheme === item.value}
              onSelect={() => handleSelect(item)}
            />
          ))}
        </div>
      </DropdownContent>
    </Dropdown>
  );
}