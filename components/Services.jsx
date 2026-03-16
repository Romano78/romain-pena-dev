'use client';

import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ArrowRight, Blocks, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/snippets/SectionHeader';

function ColumnItem({ icon: Icon, title, body }) {
  return (
    <div className='service-card group block h-full'>
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
      title: 'Design Implementation',
      body: 'You have the designs. I make them real in Shopify — pixel-perfect, exactly as your designer intended. No interpretation, no shortcuts.',
      href: '#work',
    },
    {
      icon: LineChart,
      title: 'Features & Integrations',
      body: "When the Shopify app store isn't enough. I build custom features, connect third-party tools, and make your store work the way your business actually works.",
      href: '#',
    },
  ],
  className = '',
}) {
  return (
    <section id='services' className={cn(className)}>
      <SectionHeader overline='What I do.' />
      <div className='grid gap-6 md:grid-cols-2'>
        {columns.map((column, i) => (
          <motion.div
            key={i}
            initial={{ x: i === 0 ? -40 : 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <ColumnItem {...column} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

ColumnItem.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  href: PropTypes.string,
};

Services.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      href: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
};

export default Services;
