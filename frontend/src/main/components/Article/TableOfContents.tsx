// src/main/components/Article/TableOfContents.tsx
import { TableOfContentsLink } from './TableOfContentsLink';
import { twMerge } from 'tailwind-merge';

interface TocItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  title: string;
}

export function TableOfContents({ items, title }: TableOfContentsProps) {
  const containerStyles = twMerge(
    // Base styles
    'w-full max-w-2xl mx-auto mb-16',
    // Theme variants
    'theme-default:bg-sf-cont theme-default:p-6',
    'theme-rounded:bg-sf-cont theme-rounded:p-8 theme-rounded:rounded-2xl theme-rounded:shadow-lg',
    'theme-sharp:border theme-sharp:border-ol theme-sharp:p-6'
  );

  const titleStyles = twMerge(
    // Base styles
    'text-xl font-bold mb-4 text-on-sf-var',
    // Theme variants
    'theme-default:border-b-2 theme-default:border-ol theme-default:pb-2',
    'theme-rounded:bg-sf-hst theme-rounded:py-3 theme-rounded:px-6 theme-rounded:rounded-lg theme-rounded:shadow-sm',
    'theme-sharp:border-b-2 theme-sharp:border-ol theme-sharp:uppercase theme-sharp:font-normal theme-sharp:tracking-wider'
  );

  const listStyles = twMerge(
    // Base styles
    'space-y-2',
    // Theme variants
    'theme-default:pl-4',
    'theme-rounded:pl-6',
    'theme-sharp:pl-4'
  );

  const linkStyles = twMerge(
    // Base styles
    'block text-pr-cont hover:text-pr-fix transition-colors duration-200',
    // Theme variants
    'theme-default:hover:underline theme-default:underline-offset-4',
    'theme-rounded:py-1',
    'theme-sharp:border-b theme-sharp:border-transparent theme-sharp:hover:border-pr-fix'
  );

  return (
    <nav aria-label="Table of contents" className={containerStyles}>
      <h2 className={titleStyles}>{title}</h2>
      <ul className={listStyles}>
        {items.map((item) => (
          <li key={item.id}>
            <TableOfContentsLink 
              id={item.id}
              className={linkStyles}
            >
              {item.text}
            </TableOfContentsLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}