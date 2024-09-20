// src/main/components/Article/TableOfContents.tsx
'use client';

import { useRouter } from 'next/navigation';

interface TocItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  title: string;
}

export function TableOfContents({ items, title }: TableOfContentsProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      router.push(`#${id}`, { scroll: false });
    }
  };

  return (
    <nav className="bg-background-light p-4 rounded-lg my-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a 
              href={`#${item.id}`} 
              onClick={(e) => handleClick(e, item.id)}
              className="text-primary hover:text-primary-dark"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}