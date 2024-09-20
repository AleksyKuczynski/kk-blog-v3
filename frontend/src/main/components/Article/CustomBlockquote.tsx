// /frontend/src/main/components/Article/CustomBlockquote.tsx

import React from 'react';

export interface CustomBlockquoteProps {
  heading?: string;
  avatar?: string;
  content: string[];
  blockquoteType: '1' | '2' | '3' | '4';
}

export const CustomBlockquote: React.FC<CustomBlockquoteProps> = ({ heading, avatar, content, blockquoteType }) => {
  const className = `custom-blockquote quote-type-${blockquoteType} p-6 border-l-4 border-primary bg-gray-100 mb-6 overflow-hidden`;
  
  return (
    <blockquote className={className}>
      {heading && <h3 className="text-2xl font-bold mb-2">{heading}</h3>}
      {avatar && <img src={avatar} alt="" className="float-left mr-4 mb-2 rounded-full w-20 h-20 object-cover" />}
      {content.map((paragraph, index) => (
        <p key={index} className="mb-4">{paragraph}</p>
      ))}
    </blockquote>
  );
};