import PropTypes from 'prop-types';
import { ArrowRight, Blocks, LineChart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function ColumnItem({ icon: Icon, title, body }) {
  return (
    <div id='services' className='group block h-full'>
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
        <p className='text-primary group-hover:text-primary/80 mt-4 flex items-center gap-2 transition-colors'>
          Learn more{' '}
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </p>
      </div>
    </div>
  );
}

function Services({
  id = 'columns1',
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
    <section id={id} className={cn(className)}>
      <div className='grid gap-6 md:grid-cols-2'>
        {columns.map((column, i) => (
          <ColumnItem key={i} {...column} />
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
  id: PropTypes.string,
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
