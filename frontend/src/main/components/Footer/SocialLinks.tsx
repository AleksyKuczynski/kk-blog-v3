// src/main/components/SocialLinks.tsx
import { FacebookIcon, TwitterIcon, InstagramIcon, VKIcon, TelegramIcon, WhatsAppIcon } from './SocialIcons';

export default function SocialLinks() {
  const socialLinks = [
    { Icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
    { Icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
    { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
    { Icon: VKIcon, href: 'https://vk.com', label: 'VKontakte' },
    { Icon: TelegramIcon, href: 'https://telegram.org', label: 'Telegram' },
    { Icon: WhatsAppIcon, href: 'https://whatsapp.com', label: 'WhatsApp' },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
      <div className="flex space-x-4">
        {socialLinks.map(({ Icon, href, label }) => (
          <a 
            key={href} 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-txcolor-muted hover:text-prcolor transition-colors"
            aria-label={label}
          >
            <Icon className="w-6 h-6" />
          </a>
        ))}
      </div>
    </div>
  );
}