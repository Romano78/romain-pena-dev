'use client';

import { navigationItems } from '@/config/navigation-config';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function DesktopNavigation() {
  const navTranslations = useTranslations('nav');

  return (
    <nav className='hidden lg:flex items-center gap-6'>
      {navigationItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          title={item.label}
          target={item.isExternal ? '_blank' : undefined}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
          className='relative text-xs font-medium tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors duration-300 group'
        >
          {item.label}
          <span className='absolute -bottom-1 left-0 h-px bg-muted w-0 group-hover:w-full transition-all duration-300 ease-out' />
        </a>
      ))}
    </nav>
  );
}
