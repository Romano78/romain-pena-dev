'use client';

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '@/components/snippets/SectionHeader';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

export default function MainHero({
  overline = 'MONTREAL QC: 3:20',
  title = `I build what your Shopify store can't do out of the box.`,
  body = 'Custom features, design implementation, and integrations for growing e-commerce brands.',
  headingType = 'h1',
  align = 'left',
  className = '',
  parentClassName = '',
}) {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.1 }
      ).fromTo(
        imageRef.current,
        { opacity: 0, x: 32 },
        { opacity: 1, x: 0, duration: 1.1 },
        '-=0.5'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`flex items-center gap-16 overflow-hidden py-0 max-lg:mt-24 max-lg:flex-col lg:h-[calc(100svh-65.5px)] ${cn(className)} ${cn(parentClassName)}`}
    >
      <div ref={textRef} className="flex-1" style={{ opacity: 0 }}>
        <SectionHeader
          overline={overline}
          title={title}
          body={body}
          headingType={headingType}
          align={align}
          className="mb-8 flex-1"
          parentClassName="flex-1"
        />
      </div>
      <div ref={imageRef} className="flex-1" style={{ opacity: 0 }}>
        <img
          src="/profile.JPEG"
          alt="Romain Pena"
          width={600}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
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
