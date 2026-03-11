'use client';

import { useRef } from 'react';
import SectionHeader from '@/components/snippets/SectionHeader';
import TextReveal from '@/components/snippets/TextReveal';

export default function About() {
  const scrollRef = useRef(null);

  return (
    // Tall scroll container — creates the scroll real estate for the word reveal
    <section ref={scrollRef} id="about">
      {/* Entire section pins below the navbar, slides over the Hero */}
      <SectionHeader overline='A bit about me.' />
      <TextReveal
        scrollTarget={scrollRef}
        body="I've spent the last few years working on Shopify stores for brands that care about the details — the ones where off-the-shelf solutions aren't good enough. I work as an extension of your team: I move fast, communicate clearly, and build things that actually last."
        blockClassName='max-w-[1074px] w-full'
        textClassName='h3 text-primary'
      />
    </section>
  );
}
