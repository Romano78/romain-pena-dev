'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollSection — optional scroll behaviors for page sections.
 *
 * scaleOut: section subtly scales down + fades as user scrolls past (desktop only).
 */
export default function ScrollSection({
  children,
  scaleOut = false,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !scaleOut) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.to(ref.current, {
        scale: 0.96,
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => mm.revert();
  }, [scaleOut]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

ScrollSection.propTypes = {
  children: PropTypes.node.isRequired,
  scaleOut: PropTypes.bool,
  className: PropTypes.string,
};
