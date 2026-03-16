'use client';

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import SectionHeader from '@/components/snippets/SectionHeader';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextAnimation1 from '@/components/snippets/TextAnimation1';

gsap.registerPlugin(ScrollTrigger);

export default function MainHero({
  overline = 'MONTREAL QC: 3:20',
  title = `I build what your Shopify store can't do out of the box.`,
  body = 'Custom features, design implementation, and integrations for growing e-commerce brands.',
  headingType = 'h1',
  align = 'left',
  className = '',
  parentClassName = '',
  lineAnimation = false,
}) {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state via GSAP — survives React Strict Mode remount correctly
      gsap.set(textRef.current, { autoAlpha: 0, y: 24 });
      gsap.set(imageRef.current, { autoAlpha: 0, x: 32 });

      // Entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(textRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay: 0.1,
      }).to(imageRef.current, { autoAlpha: 1, x: 0, duration: 1.1 }, '-=0.5');

      // Image parallax on scroll exit — desktop only
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.to(imageRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`flex items-center gap-16 overflow-hidden py-0 max-lg:mt-24 max-lg:flex-col lg:h-[calc(100svh-var(--menu-height))] ${cn(className)} ${cn(parentClassName)}`}
      id='main-hero'
    >
      <div ref={textRef} className='flex-1'>
        <div className='mt-12 flex items-center gap-2 text-sm text-muted-foreground mb-6'>
          <TextAnimation1 headingType={'p'} align={align}>
            <span className='inline-block h-2 w-2 rounded-full bg-muted animate-pulse-dot mr-2' />
            {'Based in Montreal \u00B7 Available for new clients'}
          </TextAnimation1>
        </div>
        <SectionHeader
          title={title}
          body={body}
          headingType={headingType}
          align={align}
          className='mb-8 flex-1'
          parentClassName='flex-1'
        />
      </div>
      <div ref={imageRef} className='flex-1'>
        <Image
          src='/profile.JPEG'
          alt='Romain Pena, Shopify developer based in Montreal'
          width={600}
          height={500}
          priority
          className='w-full h-auto'
        />
      </div>
    </section>
  );
}

MainHero.propTypes = {
  overline: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  headingType: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  parentClassName: PropTypes.string,
};
