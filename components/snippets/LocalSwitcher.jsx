'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const next = { en: 'fr', fr: 'en' };

export default function LocalSwitcher({ className }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      onClick={() => router.replace(pathname, { locale: next[locale] })}
      className={cn(
        'text-sm uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-left',
        className,
      )}
      aria-label={`Switch to ${next[locale]}`}
    >
      {next[locale]}
    </button>
  );
}
