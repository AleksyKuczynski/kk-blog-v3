// src/main/components/Footer/AboutUsSection.tsx
import React from 'react';
import Logo from '../Logo';
import { Lang } from '@/main/lib/dictionaries/types';

interface AboutUsSectionProps {
    lang: Lang;
    about: {
      title: string;
      description: string;
      companyDescription: string;
    };
  }

const AboutUsSection: React.FC<AboutUsSectionProps> = ({ lang, about }) => {
  return (
    <div className="space-y-4">
      <Logo lang={lang} variant="footer" />
      <p>{about.title}</p>
      <p className="text-sm">{about.companyDescription}</p>
    </div>
  );
};

export default AboutUsSection;