// src/main/components/Article/ScrollToTopButton.tsx
import { ChevronUpIcon } from '@/main/components/Interface/Icons';
import { ScrollButton } from './ScrollButton';

const buttonStyles = [
  // Base styles
  'fixed bottom-4 right-4 p-2 z-50 text-bgcolor transition-all duration-200',
  // Theme variants
  'theme-default:bg-prcolor theme-default:hover:bg-prcolor-dark theme-default:rounded-full theme-default:shadow-lg',
  'theme-rounded:bg-prcolor theme-rounded:hover:bg-prcolor-dark theme-rounded:rounded-xl theme-rounded:shadow-xl',
  'theme-sharp:bg-prcolor theme-sharp:hover:bg-prcolor-dark theme-sharp:border-2 theme-sharp:border-bgcolor'
].join(' ');

export function ScrollToTopButton() {
  return (
    <ScrollButton className={buttonStyles}>
      <ChevronUpIcon className="h-6 w-6" />
    </ScrollButton>
  );
}