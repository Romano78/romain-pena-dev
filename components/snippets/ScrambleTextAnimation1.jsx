'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * ScrambleTextAnimation1 - A text animation component that creates a scramble effect
 * @component
 * @example
 * ```jsx
 * <ScrambleTextAnimation1>HELLO WORLD</ScrambleTextAnimation1>
 * ```
 */
export default function ScrambleTextAnimation1({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = 'div',
  startOnView = true,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}) {
  const MotionComponent = motion(Component);

  const [displayText, setDisplayText] = useState(() => children.split(''));
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef(null);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  // Use Framer Motion's useInView hook to detect when element is in viewport
  const isInView = useInView(elementRef, {
    once: true,
    amount: 0.1,
    margin: '0% 0px 0% 0px',
  });

  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    // Start animation when element comes into view
    if (isInView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }
  }, [delay, startOnView, isInView]);

  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;

    const intervalDuration = duration / (children.length * 10);
    const maxIterations = children.length;

    const interval = setInterval(() => {
      if (iterationCount.current < maxIterations) {
        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === ' '
              ? letter
              : index <= iterationCount.current
                ? children[index]
                : characterSet[getRandomInt(characterSet.length)],
          ),
        );
        iterationCount.current = iterationCount.current + 0.1;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [children, duration, isAnimating, characterSet]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn('overflow-hidden', className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span
            key={index}
            className={cn('font-sans', letter === ' ' ? 'w-3' : '')}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}

// Constants
const DEFAULT_CHARACTER_SET = Object.freeze(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
);

// Helper functions
const getRandomInt = (max) => Math.floor(Math.random() * max);

// PropTypes
ScrambleTextAnimation1.propTypes = {
  /** The text content to be animated */
  children: PropTypes.string.isRequired,
  /** Optional className for styling */
  className: PropTypes.string,
  /** Duration of the animation in milliseconds */
  duration: PropTypes.number,
  /** Delay before animation starts in milliseconds */
  delay: PropTypes.number,
  /** Component to render as - defaults to div */
  as: PropTypes.elementType,
  /** Whether to start animation when element comes into view */
  startOnView: PropTypes.bool,
  /** Whether to trigger animation on hover */
  animateOnHover: PropTypes.bool,
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet: PropTypes.arrayOf(PropTypes.string),
};
