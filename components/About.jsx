'use client';

import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/snippets/SectionHeader';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

export default function About({ className = '' }) {
  const t = useTranslations('about');
  const ref = useScrollReveal({ y: 20, duration: 1 });

  return (
    <section id="about" className={cn(className)}>
      <SectionHeader overline={t('overline')} />
      <p ref={ref} className="h3 text-primary max-w-[1074px] w-full">
        {t('body')}
      </p>
    </section>
  );
}
