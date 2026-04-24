'use client';

import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

function SectionHeader({
  overline = '',
  title = '',
  body = '',
  headingType = 'h2',
  align = 'left',
  className,
  parentClassName,
  lineAnimation = false,
}) {
  const overlineRef = useScrollReveal({ y: 16, duration: 0.6, start: 'top 90%' });
  const titleRef = useScrollReveal({ y: 20, duration: 0.7, start: 'top 88%' });
  const bodyRef = useScrollReveal({ y: 16, duration: 0.6, start: 'top 88%' });

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <div className={cn('bg-background', parentClassName)}>
      <div
        className={cn(
          'mx-auto mb-16 flex flex-col',
          alignmentClasses[align],
          className,
        )}
      >
        {overline && (
          <span
            ref={overlineRef}
            className='text-overline mb-6 text-muted opacity-0 translate-y-4'
          >
            {overline}
          </span>
        )}
        {lineAnimation && (
          <motion.div
            className='hidden md:block w-full h-px bg-muted/50 mb-10 origin-left'
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />
        )}
        {title && (() => {
          const Tag = headingType;
          return (
            <Tag
              ref={titleRef}
              className={cn('opacity-0 translate-y-5', headingType === 'h1' ? 'h1' : 'h2')}
            >
              {title}
            </Tag>
          );
        })()}
        {body && (
          <p ref={bodyRef} className='mt-6 max-w-2xl opacity-0 translate-y-4'>
            {body}
          </p>
        )}
      </div>
    </div>
  );
}

SectionHeader.propTypes = {
  overline: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  headingType: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
};

export default SectionHeader;
