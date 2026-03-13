'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4), // quartic ease-out — premium soft landing
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Save reference so cleanup can remove the exact same function
    const rafFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after layout settles (fonts, images, hydration)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(rafFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
