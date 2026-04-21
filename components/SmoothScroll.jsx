'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4), // quartic ease-out — premium soft landing
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const rafFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after layout settles (fonts, images, hydration)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // Handle same-page hash clicks (e.g. clicking /#work when already on home)
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) lenis.scrollTo(target);
      }
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      gsap.ticker.remove(rafFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On route change: scroll to hash target or reset to top
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) lenis.scrollTo(target, { immediate: false });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
