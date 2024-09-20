// /frontend/src/main/components/Article/MarkdownContent.tsx
import React from 'react';
import { parse, HTMLElement, Node, NodeType } from 'node-html-parser';
import { componentMap } from './elements/componentMap';

export const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  const root = parse(content);
  
  const renderNode = (node: Node): React.ReactNode => {
    if (node.nodeType === NodeType.TEXT_NODE) {
      return node.text;
    }
    if (node.nodeType === NodeType.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      
      const Component = componentMap[tagName] || tagName;

      const props: any = {};
      Object.entries(element.attributes).forEach(([key, value]) => {
        props[key === 'class' ? 'className' : key] = value;
      });

      // Apply Tailwind classes based on the tag
      switch (tagName) {
        case 'h3':
          props.className = `${props.className || ''} text-2xl font-bold mb-4`;
          break;
        case 'p':
          props.className = `${props.className || ''} mb-4`;
          break;
        case 'img':
          props.className = `${props.className || ''} rounded-full w-20 h-20 object-cover`;
          break;
        // Add more cases for other tags as needed
      }

      const children = element.childNodes.map((child, index) => 
        <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
      );

      return <Component {...props} key={Math.random().toString(36).substr(2, 9)}>{children}</Component>;
    }
    return null;
  };

  return <>{root.childNodes.map((child, index) => 
    <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
  )}</>;
};