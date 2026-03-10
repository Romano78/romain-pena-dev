import PropTypes from 'prop-types';
import SectionHeader from '@/components/snippets/SectionHeader';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function MainHero({
  overline = 'MONTREAL QC: 3:20',
  title = `I build what your Shopify store can't do out of the box.`,
  body = 'Custom features, design implementation, and integrations for growing e-commerce brands.',
  headingType = 'h1',
  align = 'left',
  className,
  parentClassName,
}) {
  return (
    <div
      className={`flex items-center gap-16 overflow-hidden py-0 max-lg:mt-24 max-lg:flex-col lg:h-[calc(100svh-65.5px)] ${cn(className)} ${cn(parentClassName)}`}
    >
      <SectionHeader
        overline={overline}
        title={title}
        body={body}
        headingType={headingType}
        align={align}
        className='mb-8 flex-1'
        parentClassName={'flex-1'}
      />
      <div className='flex-1'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeIn' }}
        >
          <img
            src={'/profile.JPEG'}
            alt='Hero Image'
            width={600}
            height={500}
            className='w-full h-auto'
          />
        </motion.div>
      </div>
    </div>
  );
}

MainHero.propTypes = {
  overline: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  headingType: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  parentClassName: PropTypes.string,
};
