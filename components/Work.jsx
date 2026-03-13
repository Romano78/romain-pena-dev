'use client';

import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import SectionHeader from '@/components/snippets/SectionHeader';
import { cn } from '@/lib/utils';
import { projects } from '@/config/projects';
import ProjectCard from '@/components/snippets/ProjectCard';

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
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

Work.propTypes = {
  className: PropTypes.string,
};
