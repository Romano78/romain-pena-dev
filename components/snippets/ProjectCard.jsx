'use client';

import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/snippets/SectionHeader';
import FlipCard from '@/components/snippets/FlipCard';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    client: 'Atari.com',
    type: 'Full Storefront Build',
    description:
      'Custom Shopify storefront built pixel-perfect from design files. Full component library, countdown timers, add-to-cart logic, and navigation — all built from scratch pre-Dawn framework.',
    items: [
      'Custom component library',
      'Countdown timers & urgency UI',
      'Advanced add-to-cart flows',
      'Full navigation system',
    ],
    image: '/Atari-Logo.png',
    url: 'https://atari.com',
  },
  {
    client: 'Licensed Merch Brand',
    type: 'Integrations & Features',
    description:
      "Klaviyo, Google Tags, custom cart with product recommendations, and a custom app connecting their fulfillment backend to Shopify's order system.",
    items: [
      'Klaviyo email integration',
      'Google Tag Manager setup',
      'Custom cart + recommendations',
      'Fulfillment sync app',
    ],
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
  },
];

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
      <SectionHeader overline='Selected Work' />
      <div ref={gridRef} className='grid gap-6 md:grid-cols-3'>
        {items.map((project) => (
          <FlipCard key={project.client} project={project} />
        ))}
      </div>
    </section>
  );
}

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
      url: PropTypes.string,
    }),
  ),
};
