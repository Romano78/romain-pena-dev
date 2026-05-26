'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({
  body = 'Transform your user interface with our powerful text reveal animations, creating engaging and dynamic experiences that captivate your audience and enhance visual storytelling through smooth, scroll-based transitions.',
  className = '',
  blockClassName = '',
  textClassName = 'h3',
  sticky = false,
  textCenter = false,
  highlights = [],
}) => {
  const targetRef = useRef(null);

  useGSAP(
    () => {
      const container = targetRef.current;
      if (!container) return;

      const paragraphs = container.querySelectorAll('[data-paragraph]');
      if (!paragraphs.length) return;

      paragraphs.forEach((para) => {
        gsap.set(para, { opacity: 0, y: 12, color: 'rgba(250, 250, 248, 0.7)' });
      });

      paragraphs.forEach((para, i) => {
        gsap.to(para, {
          opacity: 1,
          y: 0,
          color: 'rgba(250, 250, 248, 0.8)',
          duration: 1,
          ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        });
      });
    },
    { scope: targetRef },
  );

  if (!body.trim()) {
    return null;
  }

  const paragraphs = body.split('\n\n').filter(p => p.trim());

  return (
    <div
      ref={targetRef}
      className={cn('relative z-0', sticky ? 'h-[150vh] md:h-[200vh]' : '', className)}
    >
      <div
        className={`${sticky ? 'sticky top-0 flex h-screen items-center justify-center' : ''} ${blockClassName}`}
      >
        <div className={cn(textClassName, textCenter && 'text-center', 'space-y-4')}>
          {paragraphs.map((para, idx) => (
            <div key={idx} data-paragraph>
              {para}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TextReveal.propTypes = {
  body: PropTypes.string,
  className: PropTypes.string,
  blockClassName: PropTypes.string,
  textClassName: PropTypes.string,
  sticky: PropTypes.bool,
  textCenter: PropTypes.bool,
  highlights: PropTypes.arrayOf(PropTypes.string),
};

export default TextReveal;
