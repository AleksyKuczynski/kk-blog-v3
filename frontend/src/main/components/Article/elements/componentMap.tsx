// src/main/components/Article/elements/componentMap.tsx
import React from 'react';
import { ArticleImage } from './Image';
import { Heading } from './Heading';
import { Link } from './Link';
import { List } from './List';
import { ListItem } from './ListItem';
import { Paragraph } from './Paragraph';

export const componentMap: Record<string, React.ComponentType<any>> = {
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
  p: Paragraph,
  ul: (props) => <List ordered={false} {...props} />,
  ol: (props) => <List ordered={true} {...props} />,
  li: ListItem,
  a: Link,
  img: ({ caption, ...props }: React.ComponentProps<typeof ArticleImage> & { caption?: string }) => 
    <ArticleImage {...props} caption={caption} />,
  figure: ({ children }: { children: React.ReactNode }) => <figure className="my-4">{children}</figure>,
  figcaption: ({ children }: { children: React.ReactNode }) => 
    <figcaption className="text-center text-sm mt-2 text-gray-600">{children}</figcaption>,
};