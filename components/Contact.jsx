'use client';

import { useTranslations } from 'next-intl';
import { Mail, Instagram, Linkedin } from 'lucide-react';
import LinkCta from '@/components/snippets/LinkCta';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import ScrambleTextAnimation1 from '@/components/snippets/ScrambleTextAnimation1';
import { cn } from '@/lib/utils';

export default function Contact({ className = '' }) {
  const t = useTranslations('contact');
  const ref = useScrollReveal({
    y: 30,
    duration: 0.9,
    stagger: 0.1,
    selector: '.contact-reveal',
  });

  return (
    <section id='contact' ref={ref} className={cn(className)}>
      <ScrambleTextAnimation1 className='text-overline mb-8 md:mb-6 text-muted contact-reveal'>
        {t('heading')}
      </ScrambleTextAnimation1>

      <h2 className='contact-reveal h2 mb-6 max-w-2xl'>
        {t('title')}
      </h2>

      <p className='contact-reveal mt-6 max-w-xl text-lg leading-relaxed text-foreground'>
        {t('body')}
      </p>

      <LinkCta
        href={`mailto:${t('email')}`}
        icon={<Mail className='h-3.5 w-3.5' />}
        className='contact-reveal mt-10'
      >
        {t('email')}
      </LinkCta>

      <div className='contact-reveal flex gap-4 mt-6'>
        <a
          href='https://www.instagram.com/romainpena.dev/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
          className='text-foreground/60 hover:text-foreground transition-colors duration-300'
        >
          <Instagram className='h-4 w-4' />
        </a>
        <a
          href='https://www.linkedin.com/in/romainpenaruiz/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='LinkedIn'
          className='text-foreground/60 hover:text-foreground transition-colors duration-300'
        >
          <Linkedin className='h-4 w-4' />
        </a>
      </div>
    </section>
  );
}
