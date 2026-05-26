'use client';

import { useEffect, useRef, useState } from 'react';
import { useTransition } from 'react';
import { usePathname } from '@/i18n/navigation';
import gsap from 'gsap';

export default function ProgressBar() {
  const barRef = useRef(null);
  const pathname = usePathname();
  const [isPending] = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (isPending || isAnimating) {
      gsap.set(bar, { width: '0%', opacity: 1 });
      gsap.to(bar, {
        width: '100%',
        duration: 0.8,
        ease: 'power1.inOut',
        overwrite: 'auto',
      });
    } else {
      gsap.to(bar, {
        opacity: 0,
        duration: 0.4,
        delay: 0.3,
        overwrite: 'auto',
      });
    }
  }, [isPending, isAnimating]);

  return (
    <div
      ref={barRef}
      className='fixed top-0 left-0 h-1'
      style={{
        width: '0%',
        opacity: 1,
        background: 'linear-gradient(90deg, hsl(var(--muted) / 0.85) 0%, hsl(var(--accent-foreground) / 0.85) 100%)',
        zIndex: 1000,
      }}
    />
  );
}
