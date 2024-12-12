// src/main/components/Article/TableOfContentsLink.tsx
'use client';

import { useRouter } from 'next/navigation';

interface TableOfContentsLinkProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function TableOfContentsLink({ id, className, children }: TableOfContentsLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      router.push(`#${id}`, { scroll: false });
    }
  };

  return (
    <a 
      href={`#${id}`} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}