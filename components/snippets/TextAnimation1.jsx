'use client';
import { useRef } from 'react';
import useTextReveal from '@/hooks/use-text-reveal';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TextAnimation1 = ({
  once = false,
  className = '',
  center = false,
  align = 'left', // New prop for alignment
  headingType: HTag = 'h2',
  selector = null,
  lineHeight = 1.2,
  children,
  ...props
}) => {
  const textRef = useRef(null);
  // If center prop is provided for backward compatibility, use it to set align
  const effectiveAlign = center ? 'center' : align;
  useTextReveal({
    textRef,
    once,
    center: effectiveAlign === 'center',
    lineHeight,
    selector,
  });

  return (
    <HTag className={className}>
      <motion.span
        className={`block text-foreground ${
          effectiveAlign === 'center'
            ? 'text-center'
            : effectiveAlign === 'right'
              ? 'text-right'
              : ''
        }`}
        ref={textRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        suppressHydrationWarning
        {...props}
      >
        {children}
      </motion.span>
    </HTag>
  );
};

TextAnimation1.propTypes = {
  once: PropTypes.bool,
  className: PropTypes.string,
  center: PropTypes.bool, // Kept for backward compatibility
  align: PropTypes.oneOf(['left', 'center', 'right']),
  headingType: PropTypes.string,
  selector: PropTypes.string,
  lineHeight: PropTypes.number,
  children: PropTypes.node,
};

export default TextAnimation1;
