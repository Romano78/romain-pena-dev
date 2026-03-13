'use client';

import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/snippets/SectionHeader';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

function ColumnItem({ icon: Icon, title, body, badgesL }) {
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
        <div className='mb-4'>
          <h3 className='h4 text-foreground mb-2'>{title}</h3>
          <p className='text-body text-muted-foreground'>{body}</p>
        </div>
        <div className='flex items-center gap-2 flex-wrap mt-auto'>
          {badgesL.map((badge, i) => (
            <Badge
              key={i}
              variant='outline'
              className='text-sm text-muted-foreground'
            >
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services({ className = '' }) {
  const t = useTranslations('services');
  const gridRef = useRef(null);

  const columns = [
    {
      title: t('design.title'),
      body: t('design.body'),
      href: '#work',
      badgesL: [t('design.badge1'), t('design.badge2'), t('design.badge3')],
    },
    {
      title: t('features.title'),
      body: t('features.body'),
      href: '#',
      badgesL: [
        t('features.badge1'),
        t('features.badge2'),
        t('features.badge3'),
      ],
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
