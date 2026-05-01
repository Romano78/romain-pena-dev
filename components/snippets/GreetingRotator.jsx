'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const greetings = ['Hi', 'Bonjour', 'Hola', 'こんにちは', 'Hallo', 'Ciao', 'Olá', '你好', '안녕하세요', 'Merhaba'];

export default function GreetingRotator({ className = '' }) {
  const spanRef = useRef(null);

  useGSAP(() => {
    const el = spanRef.current;
    if (!el) return;
    let i = 0;
    let intervalId;

    const cycle = () => {
      gsap.to(el, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          i = (i + 1) % greetings.length;
          el.textContent = greetings[i];
          gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        },
      });
    };

    const startDelay = setTimeout(() => {
      intervalId = setInterval(cycle, 2000);
    }, 2500);

    return () => {
      clearTimeout(startDelay);
      clearInterval(intervalId);
    };
  }, { scope: spanRef });

  return <span ref={spanRef} className={className}>{greetings[0]}</span>;
}
