'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function FlipCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((v) => !v);
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`${project.client} — ${project.type}. Press to ${isFlipped ? 'close' : 'see details'}`}
      className='project-card-item relative min-h-[420px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted rounded-lg'
      style={{ perspective: '1200px' }}
      onClick={() => setIsFlipped((v) => !v)}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        className='relative w-full h-full'
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className='absolute inset-0 rounded-lg overflow-hidden'
          style={{ backfaceVisibility: 'hidden' }}
        >
          {project.image && (
            <Image
              src={project.image}
              alt={project.client}
              fill
              className='object-cover'
            />
          )}
          <div
            className={`absolute inset-0 ${project.image ? 'bg-[rgba(0,0,0,0.3)]' : 'bg-card-deep'}`}
          />
          <div className='absolute inset-0 p-8 flex flex-col justify-between'>
            <span className='text-overline text-white'>{project.type}</span>
            <div>
              <h3 className='h3 text-white leading-tight'>{project.client}</h3>
              <p className='mt-3 text-white/50 text-sm flex items-center gap-1.5'>
                <span className='inline-block w-3 h-px bg-white/40' />
                See details
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className='absolute inset-0 rounded-lg border border-muted/40 bg-card p-8 flex flex-col'
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className='text-overline text-muted'>{project.type}</span>
          <h3 className='h4 text-foreground mt-3 mb-6'>{project.client}</h3>

          <ul className='space-y-3 flex-1'>
            {project.items.map((item) => (
              <li
                key={item}
                className='flex items-start gap-3 text-sm text-foreground/80'
              >
                <span className='text-muted mt-0.5 shrink-0'>→</span>
                {item}
              </li>
            ))}
          </ul>

          <div className='flex items-center justify-between mt-4'>
            {project.url ? (
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                onClick={(e) => e.stopPropagation()}
                className='inline-flex items-center gap-1.5 text-sm text-muted hover:opacity-70 transition-opacity'
              >
                Visit brand
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span />
            )}
            <p className='text-muted-foreground text-xs'>Click to close</p>
          </div>
        </div>
      </motion.div>
    </div>
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
    url: PropTypes.string,
  }).isRequired,
};
