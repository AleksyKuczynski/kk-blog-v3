// src/main/components/Footer/FooterNew.tsx
import { Dictionary, Lang } from '@/main/lib/dictionaries/types';
import AboutUsSection from './AboutUsSection';
import QuickLinksSection from './QuickLinksSection';
import ContactSection from './ContactSection';
import SocialLinks from './SocialLinks';
import CredentialsSection from './CredentialsSection';
import SearchSection from './SearchSection';
import KuKraftSection from './KuKraftSection';
import { socialLinks } from './socialLinksData';
import dynamic from 'next/dynamic';
import InteractiveForms from './InteractiveForms';

const SurpriseSection = dynamic(() => import('./SurpriseSection'), { ssr: false });
const NewsletterSection = dynamic(() => import('./NewsletterSection'), { ssr: false });
const FeedbackSection = dynamic(() => import('./FeedbackSection'), { ssr: false });

interface FooterProps {
  lang: Lang;
  translations: Dictionary;
}

export default function Footer({ lang, translations }: FooterProps) {
  const { footer, navigation, search } = translations;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EventForMe",
    "url": `https://event4me.eu/${lang}`,
    "logo": "https://event4me.eu/logo.png",
    "sameAs": socialLinks.map(link => link.url),
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@event4me.eu",
      "contactType": "customer support"
    }
  };

  return (
    <footer className="bg-bgcolor-alt text-txcolor-muted py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
        

          <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-16 md:max-lg:gap-y-24 xl:gap-y-24 py-16 border-t border-b border-txcolor-muted">
            <AboutUsSection 
              lang={lang} 
              about={footer.about}
              className="md:col-span-3 lg:col-span-4 md:order-1 grid md:grid-cols-3 lg:grid-cols-2 gap-16"
            />
            <QuickLinksSection 
              lang={lang} 
              quickLinks={footer.quickLinks}
              navigationTranslations={navigation}
              contact={footer.contact}
              className='order-last md:order-3 lg:order-4 xl:order-2 xl:col-start-6'
            />
            <SocialLinks 
              lang={lang} 
              translations={footer.socialLinks}
              className='col-span-2 md:order-2 xl:order-3 flex flex-col justify-between space-y-10'
            />
            <InteractiveForms 
              lang={lang}
              translations={footer}
              className='col-span-3 xl:col-start-4 md:order-4 lg:order-3 xl:order-4 gap-16'
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-16'>
          <CredentialsSection 
            lang={lang} 
            translations={footer.credentials}
          />
          <KuKraftSection
            translations={footer.kuKraft}
          />
        </div>
      </div>

      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </footer>
  );
}