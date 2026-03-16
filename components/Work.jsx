'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/snippets/SectionHeader';
import { cn } from '@/lib/utils';
import { projects } from '@/config/projects';

gsap.registerPlugin(ScrollTrigger);

// Even-indexed cards sit high, odd-indexed cards drop — creates the waterfall stagger
const CARD_OFFSETS = ['mt-0', 'md:mt-48'];

function WorkCard({ project, index }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.article
      ref={cardRef}
      className={cn('work-card group', CARD_OFFSETS[index % 2])}
    >
      <Link href={`/work/${project.slug}`} className='block'>
        {/* Image */}
        <div className='relative overflow-hidden rounded-2xl aspect-4/3'>
          {/* Parallax image */}
          <motion.div
            className='absolute inset-0 scale-110'
            style={{ y: imageY }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.client}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
            ) : (
              <div className='w-full h-full bg-card-deep' />
            )}
          </motion.div>

          {/* Overlay — fades in on hover */}
          <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

          {/* Top-right vertical type label — slides in on hover */}
          <div className='absolute top-5 right-5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75'>
            <span
              className='text-overline text-muted'
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {project.type}
            </span>
          </div>

          {/* Bottom CTA — slides up on hover */}
          <div className='absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75'>
            <span className='text-sm font-medium text-white tracking-wide'>
              View project →
            </span>
          </div>
        </div>

        {/* Below image — client name only */}
        <div className='pt-4'>
          <h3 className='h3 group-hover:text-muted transition-colors duration-300'>
            {project.client}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
}

WorkCard.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default function Work({ className = '' }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.work-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
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
      <div
        ref={gridRef}
        className='grid gap-x-16 gap-y-20 md:grid-cols-2 md:items-start'
      >
        {projects.map((project, i) => (
          <WorkCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

Work.propTypes = {
  className: PropTypes.string,
};
