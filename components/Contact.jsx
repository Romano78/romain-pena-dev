'use client';

import { Mail } from 'lucide-react';
import LinkCta from '@/components/snippets/LinkCta';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import ScrambleTextAnimation1 from '@/components/snippets/ScrambleTextAnimation1';
import { cn } from '@/lib/utils';

export default function Contact({ className = '' }) {
  const ref = useScrollReveal({ y: 30, duration: 0.9, stagger: 0.1, selector: '.contact-reveal' });

  return (
    <section id="contact" ref={ref} className={cn(className)}>
      <ScrambleTextAnimation1 className="text-overline mb-6 text-muted contact-reveal">
        {"Let's talk."}
      </ScrambleTextAnimation1>

      <p className="contact-reveal mt-6 max-w-xl text-lg leading-relaxed text-foreground">
        If you have a Shopify store that needs custom development, or an agency that needs a reliable partner — reach out.
      </p>

      <LinkCta
        href='mailto:hello@romainpena.dev'
        icon={<Mail className='h-3.5 w-3.5' />}
        className='contact-reveal mt-10'
      >
        hello@romainpena.dev
      </LinkCta>
    </section>
  );
}
