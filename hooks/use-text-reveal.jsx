'use client';

/**
 * Custom hook for creating smooth text reveal animations with support for custom selectors and line heights.
 * Uses SplitType to split text into lines and words, then animates them using Framer Motion.
 *
 * @param {Object} options - Configuration options for the text reveal animation
 * @param {React.RefObject} options.textRef - Reference to the container element
 * @param {string} [options.selector=null] - Optional CSS selector to target specific elements within the container
 * @param {boolean} [options.once=false] - Whether the animation should only play once
 * @param {boolean} [options.center=false] - Whether to center-align the text
 * @param {number} [options.delay=0] - Delay before starting the animation (in seconds)
 * @param {number} [options.lineHeight=1.2] - Line height for the animated text
 * @returns {Object} Object containing the isInView state
 */
import { useLayoutEffect, useState, useRef } from 'react';
import SplitType from 'split-type';
import { animate, stagger, useInView } from 'framer-motion';
import { cubicBezierPreset3 } from '@/config/cubic-beziers';
import { usePathname } from 'next/navigation';

export default function useTextReveal({
  textRef = null,
  selector = null,
  once = false,
  center = false,
  delay = 0,
  lineHeight = 1.2,
}) {
  const lineHeightCompensation = lineHeight < 1.2 ? 1.2 - lineHeight : 0;
  const horizontalScreen = useRef(0);
  const pathname = usePathname();

  const [splitHeading, setSplitHeading] = useState(null);
  const isInView = useInView(textRef, {
    margin: '0px 0px -10% 0px',
    once: once,
  });

  // Handle text splitting and styling on mount and resize
  useLayoutEffect(() => {
    if (!textRef?.current) return;

    /**
     * Handles resizing and text splitting logic
     * @param {Event} [e] - Optional resize event object
     */
    const onResize = (e) => {
      try {
        // Skip if window width hasn't changed
        if (horizontalScreen.current === window.innerWidth) return;
        horizontalScreen.current = window.innerWidth;

        // Revert previous split if it exists
        if (splitHeading) {
          splitHeading.revert();
        }

        // Get target element based on selector or use container
        const targetElement = selector
          ? textRef.current.querySelector(selector)
          : textRef.current;
        if (!targetElement) {
          console.warn('Target element not found for text reveal animation');
          return;
        }

        // Handle SVG elements
        const svgInContainer = textRef.current.querySelector('svg');
        if (svgInContainer) {
          svgInContainer.style.opacity = 0;
        }

        // Process line breaks in content
        if (targetElement.innerHTML) {
          targetElement.innerHTML = targetElement.innerHTML
            .replace(/\\n/g, '<br>')
            .replace(/\n/g, '<br>');
        }

        // Split text into lines and words
        const splitText = new SplitType(targetElement, {
          types: 'lines words',
        });
        if (!splitText?.lines?.length) {
          console.warn('No lines found to animate');
          return;
        }

        // Style each line
        splitText.lines.forEach((line, i) => {
          if (!line) return;
          line.style.overflow = 'hidden';
          line.style.height = `${lineHeight}em`;
          line.style.display = 'inline-flex';
          line.style.alignItems = 'center';
          line.style.gap = '0.2em';

          if (center) {
            line.style.justifyContent = 'center';
          }

          if (i > 0) {
            line.style.top = `${-lineHeightCompensation * i}em`;
            line.style.position = 'relative';
          }
        });

        // Style each word
        if (splitText.words) {
          splitText.words.forEach((word) => {
            if (!word) return;
            word.style.transform = `translateY(${lineHeight}em)`;
            word.style.display = 'block';
          });
        }

        setSplitHeading(splitText);
      } catch (error) {
        console.error('Error in text reveal resize handler:', error);
      }
    };

    // Initial setup and event listeners
    onResize();
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      splitHeading?.revert();
      window?.removeEventListener('resize', onResize);
    };
  }, [
    textRef,
    pathname,
    splitHeading,
    selector,
    center,
    lineHeight,
    lineHeightCompensation,
  ]);

  // Handle animation when element comes into view
  useLayoutEffect(() => {
    if (!splitHeading || !textRef?.current) return;

    try {
      const svgInContainer = textRef.current.querySelector('svg, object');
      const { words } = splitHeading;
      if (!words?.length) return;

      if (isInView) {
        // Animate words up
        animate(
          words,
          { transform: 'translateY(0em)' },
          {
            duration: 0.8,
            ease: cubicBezierPreset3,
            delay: stagger(0.03, { startDelay: delay + 0.2 }),
          },
        );

        // Fade in SVG if present
        if (svgInContainer) {
          animate(
            svgInContainer,
            { opacity: 1 },
            {
              duration: 0.3,
              ease: 'easeOut',
              delay: delay + 0.8,
            },
          );
        }
      } else {
        // Reset positions when out of view
        words.forEach((word) => {
          if (!word) return;
          word.style.transform = `translateY(${lineHeight}em)`;
        });

        if (svgInContainer) {
          svgInContainer.style.opacity = 0;
        }
      }
    } catch (error) {
      console.error('Error in text reveal animation:', error);
    }
  }, [isInView, splitHeading, lineHeight, delay]);

  return { isInView };
}
