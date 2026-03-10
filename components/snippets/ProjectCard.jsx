'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import ScrambleTextAnimation1 from '@/components/snippets/ScrambleTextAnimation1';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    client: 'Major Gaming Brand',
    type: 'Full Storefront Build',
    description:
      'Custom Shopify storefront built pixel-perfect from design files. Full component library, countdown timers, add-to-cart logic, and navigation — all built from scratch pre-Dawn framework.',
    items: [
      'Custom component library',
      'Countdown timers & urgency UI',
      'Advanced add-to-cart flows',
      'Full navigation system',
    ],
    gradient: 'from-zinc-900 to-zinc-800',
  },
  {
    client: 'Licensed Merch Brand',
    type: 'Integrations & Features',
    description:
      'Klaviyo, Google Tags, custom cart with product recommendations, and a custom app connecting their fulfillment backend to Shopify\'s order system.',
    items: [
      'Klaviyo email integration',
      'Google Tag Manager setup',
      'Custom cart + recommendations',
      'Fulfillment sync app',
    ],
    gradient: 'from-stone-900 to-stone-800',
  },
  {
    client: 'Pet Commerce Brand',
    type: 'Custom Sync App',
    description:
      'Built a custom app to sync products daily between an internal system and Shopify — keeping inventory accurate across both platforms automatically.',
    items: [
      'Daily product sync',
      'Inventory reconciliation',
      'Error handling & logging',
      'Admin dashboard',
    ],
    gradient: 'from-slate-900 to-slate-800',
  },
];

function FlipCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="project-card-item relative h-[420px] cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={() => setIsFlipped((v) => !v)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-br ${project.gradient}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {project.image && (
            <Image
              src={project.image}
              alt={project.client}
              fill
              className="object-cover"
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-foreground/55" />
          {/* Green accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-muted/60" />

          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <span className="text-overline text-muted/90">{project.type}</span>
            <div>
              <h3 className="h3 text-white leading-tight">{project.client}</h3>
              <p className="mt-3 text-white/50 text-sm flex items-center gap-1.5">
                <span className="inline-block w-3 h-px bg-white/40" />
                See details
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-lg border border-muted/40 bg-card p-8 flex flex-col"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-muted/60" />

          <span className="text-overline text-muted">{project.type}</span>
          <h3 className="h4 text-foreground mt-3 mb-6">{project.client}</h3>

          <ul className="space-y-3 flex-1">
            {project.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="text-muted mt-0.5 shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground text-xs mt-4">Click to close</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectCard({ items = projects, className = '' }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-card-item');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { scale: 0.95, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section id='work' className={cn(className)}>
      <ScrambleTextAnimation1 className='text-overline mb-6 text-muted'>
        {'Selected Work'}
      </ScrambleTextAnimation1>
      <div ref={gridRef} className='grid gap-6 md:grid-cols-3'>
        {items.map((project) => (
          <FlipCard key={project.client} project={project} />
        ))}
      </div>
    </section>
  );
}

FlipCard.propTypes = {
  project: PropTypes.shape({
    client: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    gradient: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      client: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
      gradient: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
};
