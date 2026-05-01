'use client';

import PropTypes from 'prop-types';
import { Blocks, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import SectionHeader from '@/components/snippets/SectionHeader';

/**
 * @typedef {Object} ServiceColumn
 * @property {React.ElementType} icon
 * @property {string} title
 * @property {string} body
 * @property {string} [href]
 */

function ColumnItem({ icon: Icon, title, body }) {
  return (
    <div className='service-card group block h-full opacity-0 translate-y-7'>
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
      </div>
    </div>
  );
}

/**
 * @type {React.FC<{columns?: ServiceColumn[], className?: string}>}
 */
const Services = function Services({ columns, className = '' }) {
  const t = useTranslations('services');
  const cardsRef = useScrollReveal({ stagger: 0.15, selector: '.service-card', start: 'top 85%' });

  const defaultColumns = [
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
      href: '#work',
    },
  ];

  const displayColumns = columns ?? defaultColumns;

  return (
    <section id='services' className={cn(className)}>
      <SectionHeader overline={t('overline')} />
      <div className='grid gap-6 md:grid-cols-2' ref={cardsRef}>
        {displayColumns.map((column, i) => (
          <div key={i}>
            <ColumnItem {...column} />
          </div>
        ))}
      </div>
    </section>
  );
};

ColumnItem.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  href: PropTypes.string,
};

Services.propTypes = {
  columns: PropTypes.array,
  className: PropTypes.string,
};

export default Services;
