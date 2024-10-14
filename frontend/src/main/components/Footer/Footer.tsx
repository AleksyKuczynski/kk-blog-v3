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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<SurpriseSection
            translations={footer.surprise}
          />

          <AboutUsSection 
            lang={lang} 
            about={footer.about}
          />
          
          <QuickLinksSection 
            lang={lang} 
            quickLinks={footer.quickLinks}
            navigationTranslations={navigation}
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
					<ContactSection 
            lang={lang} 
            translations={footer.contact}
          />
          
          <NewsletterSection
            translations={footer.newsletter}
          />
          
          <FeedbackSection
            translations={footer.feedback}
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">        
					<SocialLinks 
            lang={lang} 
            translations={footer.socialLinks}
          />
          
          <SearchSection
            lang={lang}
            translations={footer.search}
            searchTranslations={search}
          />         

          <KuKraftSection
            translations={footer.kuKraft}
          />
        </div>
        
        <CredentialsSection 
          lang={lang} 
          translations={footer.credentials}
        />
      </div>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </footer>
  );
}