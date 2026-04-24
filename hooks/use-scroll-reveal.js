'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade + slide-up reveal on scroll entry.
 * @param {object} options
 * @param {number}  options.y         - Start translateY offset (default: 30)
 * @param {number}  options.duration  - Animation duration in seconds (default: 0.8)
 * @param {number}  options.stagger   - Stagger delay between children (default: 0)
 * @param {string}  options.start     - ScrollTrigger start position (default: 'top 85%')
 * @param {string}  options.selector  - Child selector for stagger (default: null — animates root)
 * @returns ref to attach to the container element
 */
export function useScrollReveal({
  y = 30,
  duration = 0.8,
  stagger = 0,
  start = 'top 85%',
  selector = null,
} = {}) {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector ? el.querySelectorAll(selector) : [el];

    gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      }
    );
  }, { scope: ref, dependencies: [y, duration, stagger, start, selector] });

  return ref;
}
