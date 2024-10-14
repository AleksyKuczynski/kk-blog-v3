// src/main/components/Footer/socialLinksData.ts
import { FooterTranslations } from '@/main/lib/dictionaries/types';
import { FacebookIcon, TwitterIcon, InstagramIcon, VKIcon, TelegramIcon, WhatsAppIcon } from './SocialIcons';

export type SocialLinkName = keyof FooterTranslations['socialLinks'];

export interface SocialLink {
  name: SocialLinkName;
  url: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const socialLinks: SocialLink[] = [
  { name: 'facebook', url: 'https://facebook.com/yourcompany', Icon: FacebookIcon },
  { name: 'twitter', url: 'https://twitter.com/yourcompany', Icon: TwitterIcon },
  { name: 'instagram', url: 'https://instagram.com/yourcompany', Icon: InstagramIcon },
  { name: 'vk', url: 'https://vk.com/yourcompany', Icon: VKIcon },
  { name: 'telegram', url: 'https://t.me/yourcompany', Icon: TelegramIcon },
  { name: 'whatsapp', url: 'https://wa.me/yourcompanynumber', Icon: WhatsAppIcon },
];