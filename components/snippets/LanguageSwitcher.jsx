'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher({ className }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      className={cn('flex items-center gap-1.5 cursor-pointer', className)}
      aria-label={`Switch to ${locale === 'fr' ? 'en' : 'fr'}`}
    >
      <span style={{ fontSize: '1rem', lineHeight: 1, opacity: locale === 'fr' ? 1 : 0.3 }}>
        🇫🇷
      </span>
      <span className='text-foreground/20 text-xs'>/</span>
      <span style={{ fontSize: '1rem', lineHeight: 1, opacity: locale === 'en' ? 1 : 0.3 }}>
        🇺🇸
      </span>
    </button>
  );
}
