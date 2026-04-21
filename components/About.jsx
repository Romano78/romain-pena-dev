'use client';

import SectionHeader from '@/components/snippets/SectionHeader';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

export default function About({ className = '' }) {
  const ref = useScrollReveal({ y: 20, duration: 1 });

  return (
    <section id="about" className={cn(className)}>
      <SectionHeader overline='A bit about me.' />
      <p ref={ref} className="h3 text-primary max-w-[1074px] w-full">
        {"I've spent the last few years working on Shopify stores for design-led brands that have outgrown what themes and apps can do. I work as an extension of your team: I move fast, communicate clearly, and write code that actually lasts."}
      </p>
    </section>
  );
}
