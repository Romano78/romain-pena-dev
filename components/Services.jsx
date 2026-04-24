'use client';

import PropTypes from 'prop-types';
import { Blocks, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import SectionHeader from '@/components/snippets/SectionHeader';

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

function Services({
  columns = [
    {
      icon: Blocks,
      title: 'Figma → Shopify',
      body: 'You have the designs. I make them real — pixel-perfect, exactly as your designer intended. Custom sections, Liquid, no page builders, no interpretation.',
      href: '#work',
    },
    {
      icon: LineChart,
      title: 'Custom Features & Apps',
      body: "When the app store isn't enough. I build custom Shopify apps, backend integrations, and features that make your store work the way your business actually works.",
      href: '#work',
    },
  ],
  className = '',
}) {
  const cardsRef = useScrollReveal({ stagger: 0.15, selector: '.service-card', start: 'top 85%' });

  return (
    <section id='services' className={cn(className)}>
      <SectionHeader overline='What I do.' />
      <div className='grid gap-6 md:grid-cols-2' ref={cardsRef}>
        {columns.map((column, i) => (
          <div key={i}>
            <ColumnItem {...column} />
          </div>
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
