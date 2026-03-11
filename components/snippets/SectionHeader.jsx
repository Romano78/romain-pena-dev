'use client';

import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import TextAnimation1 from '@/components/snippets/TextAnimation1';
import ScrambleTextAnimation1 from '@/components/snippets/ScrambleTextAnimation1';

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
          <ScrambleTextAnimation1 className='text-overline mb-6 text-muted'>
            {overline}
          </ScrambleTextAnimation1>
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
        {title && (
          <TextAnimation1
            headingType={headingType}
            align={align}
            className={cn('', headingType === 'h1' ? 'h1' : 'h2')}
          >
            {title}
          </TextAnimation1>
        )}
        {body && (
          <TextAnimation1 className='mt-6 max-w-2xl' headingType={'p'}>
            {body}
          </TextAnimation1>
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
