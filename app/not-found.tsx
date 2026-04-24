'use client';

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import LinkCta from "@/components/snippets/LinkCta";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    let split: SplitType | undefined;
    if (headlineRef.current) {
      split = new SplitType(headlineRef.current, { types: 'lines,words' });
      split.lines?.forEach((line) => { line.style.overflow = 'hidden'; });
      gsap.set(split.words, { y: '110%' });
      gsap.set(headlineRef.current, { opacity: 1 });
    }

    if (split?.words?.length) {
      tl.to(split.words, { y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.04 }, 0);
    }

    tl.to('[data-404="sub"]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.5);
    tl.to('[data-404="cta"]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.7);

    return () => split?.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="font-[family-name:var(--font-inter)] relative min-h-screen text-white">
      <Image
        src="/onepiece404.png"
        alt="Zoro lost — One Piece 404"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 px-6">
        <h1 ref={headlineRef} className="text-6xl sm:text-7xl lg:text-8xl font-semibold opacity-0 text-white">
          Oops, you got lost.
        </h1>
        <p data-404="sub" className="text-base text-white/80 opacity-0 translate-y-[30px]">
          Help Zoro find his way.
        </p>
        <div data-404="cta" className="opacity-0 translate-y-[30px]">
          <LinkCta href="/" className="!text-white/60 hover:!text-white">Back to the ship</LinkCta>
        </div>
      </div>
    </div>
  );
}
