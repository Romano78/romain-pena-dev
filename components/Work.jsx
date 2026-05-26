'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import PropTypes from 'prop-types';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { projects } from '@/config/projects';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import ImagePlaceholder from '@/components/snippets/ImagePlaceholder';
import SectionHeader from '@/components/snippets/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

function WorkCard({
  project,
  viewProject,
  aspectClass = 'aspect-video',
  titleClass = 'h3',
}) {
  return (
    <article className='work-card group'>
      <Link href={`/work/${project.slug}`} className='block'>
        {/* Image */}
        <div
          className={cn(
            'work-card-image relative overflow-hidden rounded-2xl bg-card',
            aspectClass,
          )}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.client}
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-105'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            />
          ) : (
            <ImagePlaceholder />
          )}

          {/* Overlay */}
          <div className='absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

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
              <span className='inline-flex items-center gap-2 text-sm font-medium text-white tracking-wide'>
                {viewProject} <ArrowRight className='h-3.5 w-3.5' />
              </span>
            </div>
          </div>
        </div>

        {/* Below image */}
        <div className='work-card-text pt-4 space-y-3'>
          <h3 className={titleClass}>{project.client}</h3>
          {/* Mobile only: type + pills */}
          <div className='md:hidden space-y-2'>
            <span className='text-overline text-muted block'>
              {project.type}
            </span>
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
  viewProject: PropTypes.string.isRequired,
  aspectClass: PropTypes.string,
  titleClass: PropTypes.string,
};

export default function Work({ className = '', projectImages = {} }) {
  const t = useTranslations('work');
  const gridRef = useRef(null);

  // Hook 1: Scroll animations with useGSAP
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll('.work-card');
      if (!cards.length) return;

      const isMobile = window.innerWidth < 768;

      cards.forEach((card, i) => {
        const imageEl = card.querySelector('.work-card-image');
        const textEl = card.querySelector('.work-card-text');

        if (isMobile) {
          gsap.set(imageEl, { opacity: 0, y: 12 });
          gsap.set(textEl, { opacity: 0, y: 6 });

          gsap.to(imageEl, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          });

          gsap.to(textEl, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.08 + 0.3,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          });
        } else {
          gsap.set(imageEl, { opacity: 0, y: 12 });
          gsap.set(textEl, { opacity: 0, y: 6 });

          gsap.to(imageEl, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          });

          gsap.to(textEl, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.1 + 0.3,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          });
        }
      });
    },
    { scope: gridRef },
  );


  const featuredProjects = projects.slice(0, 2);
  const restProjects = projects.slice(2);
  const viewProject = t('viewProject');

  return (
    <section id='work' className={cn(className)}>
      <SectionHeader overline={t('overline')} lineAnimation={true} />
      <div ref={gridRef} className='space-y-10 md:space-y-16'>
        {/* Featured row */}
        <div className='grid gap-x-8 gap-y-10 md:gap-y-16 md:grid-cols-2'>
          {featuredProjects.map((project) => (
            <WorkCard
              key={project.slug}
              project={{
                ...project,
                image: projectImages[project.slug] ?? project.image,
              }}
              viewProject={viewProject}
              aspectClass='aspect-video'
              titleClass='h3'
            />
          ))}
        </div>

        {/* Rest row */}
        {restProjects.length > 0 && (
          <div className='grid gap-x-8 gap-y-10 md:gap-y-16 md:grid-cols-3'>
            {restProjects.map((project) => (
              <WorkCard
                key={project.slug}
                project={{
                  ...project,
                  image: projectImages[project.slug] ?? project.image,
                }}
                viewProject={viewProject}
                aspectClass='aspect-[4/3]'
                titleClass='h4'
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

Work.propTypes = {
  className: PropTypes.string,
  projectImages: PropTypes.object,
};
