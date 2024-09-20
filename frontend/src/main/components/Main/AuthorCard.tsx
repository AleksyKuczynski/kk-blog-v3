// src/main/components/Main/AuthorCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { DIRECTUS_URL, AuthorDetails } from '@/main/lib/directus/index';
import { Lang } from '@/main/lib/dictionaries/types';

interface AuthorCardProps {
  author: AuthorDetails;
  linkToProfile?: boolean;
  lang: Lang;
}

export default function AuthorCard({ author, linkToProfile = true, lang }: AuthorCardProps) {
  const CardContent = () => (
    <div className="flex bg-background-light rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="w-1/3 relative">
        {author.avatar ? (
          <Image
            src={`${DIRECTUS_URL}/assets/${author.avatar}`}
            alt={author.name}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
            <span className="text-4xl text-neutral-400">📷</span>
          </div>
        )}
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold text-text-primary mb-2 font-sans">{author.name}</h2>
        <p className="text-text-secondary text-sm line-clamp-3 font-serif">{author.bio}</p>
      </div>
    </div>
  );

  if (linkToProfile) {
    return (
      <Link href={`/${lang}/authors/${author.slug}`} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}