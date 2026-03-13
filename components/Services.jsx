'use client';

import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslations } from 'next-intl';
import { ArrowRight, Blocks, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/snippets/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

function ColumnItem({ icon: Icon, title, body, learnMore }) {
  return (
    <div className='service-card group  h-full'>
      <div className='bg-background border-border relative flex h-full flex-col items-start overflow-hidden rounded-[--radius] border p-6 transition-colors hover:border-muted'>
        {Icon && (
          <div className='relative mb-4'>
            <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-[--radius]'>
              <Icon className='text-primary h-6 w-6' />
            </div>
          </div>
        )}
        <h3 className='h4 text-foreground mb-2'>{title}</h3>
        <p className='text-body text-muted-foreground'>{body}</p>
        <p className='text-primary group-hover:text-muted mt-4 flex items-center gap-2 transition-colors'>
          {learnMore}{' '}
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </p>
      </div>
    </div>
  );
}

function Services({ className = '' }) {
  const t = useTranslations('services');
  const gridRef = useRef(null);

  const columns = [
    {
      icon: Blocks,
      title: t('design.title'),
      body: t('design.body'),
      href: '#work',
    },
    {
      icon: LineChart,
      title: t('features.title'),
      body: t('features.body'),
      href: '#',
    },
  ];

  return (
    <section id='services' className={cn(className)}>
      <SectionHeader overline={t('overline')} />
      <div ref={gridRef} className='grid gap-6 md:grid-cols-2'>
        {columns.map((column, i) => (
          <ColumnItem key={i} {...column} learnMore={t('learnMore')} />
        ))}
      </div>
    </section>
  );
}

ColumnItem.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  learnMore: PropTypes.string.isRequired,
  href: PropTypes.string,
};

Services.propTypes = {
  className: PropTypes.string,
};

export default Services;
