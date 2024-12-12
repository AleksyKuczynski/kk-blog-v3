// src/main/components/Article/TableOfContents.tsx
import { TableOfContentsLink } from './TableOfContentsLink';

interface TocItem {
  id: string;
  text: string;
}

const tocContainerStyles = [
  // Base styles
  'my-8 text-txcolor',
  // Theme variants
  'theme-default:bg-bgcolor-alt theme-default:p-4',
  'theme-rounded:bg-bgcolor-alt theme-rounded:p-6 theme-rounded:rounded-xl theme-rounded:shadow-lg',
  'theme-sharp:border-2 theme-sharp:border-prcolor theme-sharp:p-4'
].join(' ');

const tocTitleStyles = [
  // Base styles
  'text-xl font-bold mb-4',
  // Theme variants
  'theme-default:border-b theme-default:border-prcolor theme-default:pb-2',
  'theme-rounded:bg-prcolor theme-rounded:text-bgcolor theme-rounded:p-2 theme-rounded:rounded-lg',
  'theme-sharp:border-b-2 theme-sharp:border-prcolor theme-sharp:uppercase theme-sharp:tracking-wider'
].join(' ');

const tocListStyles = [
  // Base styles
  'space-y-2',
  // Theme variants
  'theme-default:pl-4',
  'theme-rounded:pl-6',
  'theme-sharp:pl-4'
].join(' ');

const tocLinkStyles = [
  // Base styles
  'text-prcolor hover:text-prcolor-dark transition-colors duration-200',
  // Theme variants
  'theme-default:hover:underline',
  'theme-rounded:hover:bg-bgcolor-accent theme-rounded:p-1 theme-rounded:rounded',
  'theme-sharp:border-b theme-sharp:border-transparent theme-sharp:hover:border-prcolor'
].join(' ');

export function TableOfContents({ items, title }: { items: TocItem[]; title: string }) {
  return (
    <nav className={tocContainerStyles}>
      <h2 className={tocTitleStyles}>{title}</h2>
      <ul className={tocListStyles}>
        {items.map((item) => (
          <li key={item.id}>
            <TableOfContentsLink 
              id={item.id}
              className={tocLinkStyles}
            >
              {item.text}
            </TableOfContentsLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}