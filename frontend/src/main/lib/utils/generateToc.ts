// src/main/lib/utils/generateToc.ts
export interface TocItem {
  id: string;
  text: string;
}

export function generateToc(content: string): TocItem[] {
  const headings = content.match(/^## (.*$)/gm);
  if (!headings || headings.length === 0) return [];

  return headings.map((heading, index) => {
    const text = heading.replace('## ', '');
    const id = `heading-${index}`;
    return { id, text };
  });
}