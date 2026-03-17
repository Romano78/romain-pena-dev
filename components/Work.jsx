'use client';

import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/snippets/SectionHeader';
import { cn } from '@/lib/utils';
import { projects } from '@/config/projects';

gsap.registerPlugin(ScrollTrigger);

function WorkCard({ project }) {
  return (
    <article className='work-card group'>
      <Link href={`/work/${project.slug}`} className='block'>
        {/* Image */}
        <div className='work-card-image relative overflow-hidden rounded-2xl aspect-video md:aspect-[4/3] bg-card-deep'>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.client}
              fill
              className='object-contain transition-transform duration-700 group-hover:scale-105'
            />
          ) : (
            <div className='w-full h-full bg-card-deep' />
          )}

          {/* Overlay */}
          <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

          {/* Desktop hover content */}
          <div className='hidden md:flex absolute inset-0 flex-col justify-between p-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75'>
            <span className='text-overline text-muted'>{project.type}</span>
            <div className='space-y-4'>
              <div className='flex flex-wrap gap-2'>
                {project.items.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className='text-xs px-2.5 py-1 rounded-full border border-white/30 text-white/80'
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span className='text-sm font-medium text-white tracking-wide'>View project →</span>
            </div>
          </div>
        </div>

        {/* Below image */}
        <div className='work-card-text pt-4 space-y-3'>
          <h3 className='h3'>{project.client}</h3>
          {/* Mobile only: type + pills */}
          <div className='md:hidden space-y-2'>
            <span className='text-overline text-muted block'>{project.type}</span>
            <div className='flex flex-wrap gap-2'>
              {project.items.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className='text-xs px-2.5 py-1 rounded-full border border-border text-foreground/60'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
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
};

export default function Work({ className = '' }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.work-card');
    if (!cards.length) return;

    const canHover = window.matchMedia('(hover: hover)').matches;

    // Scroll animations
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const imageEl = card.querySelector('.work-card-image');
        const textEl = card.querySelector('.work-card-text');

        gsap.fromTo(
          imageEl,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.2,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          },
        );

        gsap.fromTo(
          textEl,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.1 + 0.5,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          },
        );
      });
    }, grid);

    // Tilt — only attached on hover-capable devices
    const tiltCleanups = [];

    if (canHover) {
      cards.forEach((card) => {
        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4;
          const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4;
          gsap.to(card, {
            rotateX,
            rotateY,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 900,
            transformOrigin: 'center center',
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'power3.out',
          });
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        tiltCleanups.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    return () => {
      ctx.revert();
      tiltCleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section id='work' className={cn(className)}>
      <SectionHeader overline='Selected Work' />
      <div
        ref={gridRef}
        className='grid gap-x-8 gap-y-16 md:grid-cols-2'
      >
        {projects.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

Work.propTypes = {
  className: PropTypes.string,
};
