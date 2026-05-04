'use client';

import { useRef } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PillCta from '@/components/snippets/PillCta';
import LinkCta from '@/components/snippets/LinkCta';
import ImagePlaceholder from '@/components/snippets/ImagePlaceholder';
import GreetingRotator from '@/components/snippets/GreetingRotator';

/** @type {React.FC<{className?: string, parentClassName?: string, leftCol: string[], rightCol: string[]}>} */
const MainHero = function MainHero({
  className = '',
  parentClassName = '',
  leftCol = [],
  rightCol = [],
}) {
  const t = useTranslations('hero');
  const displayLeft = leftCol.length > 0 ? leftCol : Array(5).fill(null);
  const displayRight = rightCol.length > 0 ? rightCol : Array(5).fill(null);

  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const headlineRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    let split;
    if (headlineRef.current) {
      split = new SplitType(headlineRef.current, { types: 'lines,words' });
      split.lines.forEach((line) => { line.style.overflow = 'hidden'; });
      gsap.set(split.words, { y: '110%' });
      gsap.set(headlineRef.current, { opacity: 1 });
    }

    tl.to('[data-hero="badge"]', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.2);
    tl.to('[data-hero="greeting"]', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.36);

    if (split?.words?.length) {
      tl.to(split.words, { y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.04 }, 0.52);
    }

    tl.to('[data-hero="title"]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.82);
    tl.to('[data-hero="ctas"]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.96);

    if (marqueeRef.current) {
      tl.to(marqueeRef.current, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 1.1);
    }

    return () => split?.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className={cn(
        'h-[calc(100svh-var(--menu-height))] flex items-center gap-12 overflow-hidden max-lg:mt-24 max-lg:flex-col max-lg:h-auto max-lg:py-16',
        className,
        parentClassName,
      )}
      id='main-hero'
    >
      {/* Left — text */}
      <div className='flex-1 flex flex-col gap-6 w-full'>
        <div data-hero="badge" className='flex items-center gap-2 text-sm text-muted-foreground opacity-0 translate-y-7'>
          <span className='inline-block h-2 w-2 rounded-full bg-muted animate-pulse-dot' />
          {t('status')}
        </div>

        <p
          data-hero="greeting"
          className='font-sans text-xl md:text-2xl font-medium text-foreground opacity-0 translate-y-7'
        >
          <GreetingRotator className='text-muted' />
          {t('greeting')}
        </p>

        <h1
          ref={headlineRef}
          className='font-sans text-5xl md:text-7xl lg:text-7xl font-bold leading-none text-foreground opacity-0'
        >
          Romain Pena Ruiz
        </h1>

        <p
          data-hero="title"
          className='font-sans text-lg md:text-xl text-muted-foreground opacity-0 translate-y-7 max-w-lg'
        >
          {t('title')}
        </p>

        <div data-hero="ctas" className='flex items-center gap-4 opacity-0 translate-y-7'>
          <PillCta href='#work' icon={<ArrowDown className='h-3 w-3' />}>{t('seeWork')}</PillCta>
          <PillCta href='#contact'>{t('ctaContact')}</PillCta>
        </div>
      </div>

      {/* Right — vertical marquee (desktop only) */}
      <div ref={marqueeRef} className='hidden lg:flex relative w-[55%] flex-shrink-0 h-full overflow-hidden gap-3 opacity-0'>
        <div className='absolute top-0 left-0 right-0 z-10 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none' />

        <div className='flex-1 flex flex-col gap-3 marquee-col-up'>
          {[...displayLeft, ...displayLeft].map((src, i) => (
            <div key={i} className='relative rounded-xl overflow-hidden aspect-[3/4] shrink-0'>
              {src
                ? <Image src={src} alt='' fill sizes='20vw' />
                : <ImagePlaceholder />
              }
            </div>
          ))}
        </div>

        <div className='flex-1 flex flex-col gap-3 -mt-[30%] marquee-col-down'>
          {[...displayRight, ...displayRight].map((src, i) => (
            <div key={i} className='relative rounded-xl overflow-hidden aspect-[3/4] shrink-0'>
              {src
                ? <Image src={src} alt='' fill sizes='20vw' />
                : <ImagePlaceholder />
              }
            </div>
          ))}
        </div>

        <div className='absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none' />
      </div>
    </section>
  );
};

MainHero.propTypes = {
  className: PropTypes.string,
  parentClassName: PropTypes.string,
  leftCol: PropTypes.arrayOf(PropTypes.string).isRequired,
  rightCol: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainHero;
