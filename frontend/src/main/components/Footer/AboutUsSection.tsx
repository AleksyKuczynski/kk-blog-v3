// src/main/components/Footer/AboutUsSection.tsx
import React from 'react';
import Logo from '../Logo';
import { Lang } from '@/main/lib/dictionaries/dictionariesTypes';

interface AboutUsSectionProps {
    lang: Lang;
    about: {
      title: string;
      description: string;
      companyDescription: string;
    };
    className: string;
  }

const AboutUsSection: React.FC<AboutUsSectionProps> = ({ lang, about, className }) => {
  return (
    <div className={className}>
      <div className='space-y-4 md:max-lg:col-span-2'>
        <h2 className='text-lg font-semibold'>{about.title}</h2>
        <p className="text-sm">{about.companyDescription}</p>
      </div>
      <Logo lang={lang} variant="footer" />
    </div>
  );
};

export default AboutUsSection;