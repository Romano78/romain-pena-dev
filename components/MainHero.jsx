'use client';

import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
import PillCta from '@/components/snippets/PillCta';
import LinkCta from '@/components/snippets/LinkCta';
import ImagePlaceholder from '@/components/snippets/ImagePlaceholder';

/**
 * @typedef {Object} MainHeroProps
 * @property {string} [title]
 * @property {'left' | 'center' | 'right'} [align]
 * @property {string} [className]
 * @property {string} [parentClassName]
 * @property {string[]} [leftCol]
 * @property {string[]} [rightCol]
 */

/**
 * @param {MainHeroProps} props
 */
export default function MainHero({
  title = `I build what your Shopify store can't do out of the box.`,
  align = 'left',
  className = '',
  parentClassName = '',
  leftCol = [],
  rightCol = [],
}) {
  const displayLeft = leftCol.length > 0 ? leftCol : Array(5).fill(null);
  const displayRight = rightCol.length > 0 ? rightCol : Array(5).fill(null);

  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, { autoAlpha: 0, y: 24 });
      gsap.to(textRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className={cn(
        'h-[calc(100svh-var(--menu-height))] flex items-center gap-12 overflow-hidden max-lg:mt-24 max-lg:flex-col max-lg:h-auto max-lg:py-16',
        className,
        parentClassName,
      )}
      id='main-hero'
    >
      {/* Left — text */}
      <div ref={textRef} className='flex-1 flex flex-col gap-8'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <span className='inline-block h-2 w-2 rounded-full bg-muted animate-pulse-dot' />
          {'Based in Montreal \u00B7 Available for new clients'}
        </div>

        <h1 className='font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground max-w-2xl'>
          {title}
        </h1>

        <div className='flex items-end gap-6'>
          <PillCta href='#work' icon={<ArrowDown className='h-3 w-3' />}>See work</PillCta>
          <LinkCta href='#contact' uppercase={false} className='mb-0.5'>Contact</LinkCta>
        </div>
      </div>

      {/* Right — vertical marquee (desktop only) */}
      <div className='hidden lg:flex relative w-[55%] flex-shrink-0 h-full overflow-hidden gap-3'>
        {/* Top fade */}
        <div className='absolute top-0 left-0 right-0 z-10 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none' />

        {/* Column 1 — scrolls up */}
        <div className='flex-1 flex flex-col gap-3 marquee-col-up'>
          {[...displayLeft, ...displayLeft].map((src, i) => (
            <div key={i} className='relative rounded-xl overflow-hidden aspect-[3/4] shrink-0'>
              {src
                ? <Image src={src} alt='' fill sizes='20vw' className='object-cover' />
                : <ImagePlaceholder />
              }
            </div>
          ))}
        </div>

        {/* Column 2 — scrolls down, offset for depth */}
        <div className='flex-1 flex flex-col gap-3 -mt-[30%] marquee-col-down'>
          {[...displayRight, ...displayRight].map((src, i) => (
            <div key={i} className='relative rounded-xl overflow-hidden aspect-[3/4] shrink-0'>
              {src
                ? <Image src={src} alt='' fill sizes='20vw' className='object-cover' />
                : <ImagePlaceholder />
              }
            </div>
          ))}
        </div>

        {/* Bottom fade */}
        <div className='absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none' />
      </div>
    </section>
  );
}

MainHero.propTypes = {
  title: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  parentClassName: PropTypes.string,
  leftCol: PropTypes.arrayOf(PropTypes.string).isRequired,
  rightCol: PropTypes.arrayOf(PropTypes.string).isRequired,
};
