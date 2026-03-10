'use client';

/**
 * Stats Component
 * A section component that displays animated statistics with headings and descriptions.
 * Features smooth counting animations and responsive grid layout.
 *
 * @example
 * <Stats
 *   heading="Company Metrics"
 *   description="Our achievements in numbers"
 *   statistics={[
 *     {
 *       value: 200,
 *       label: "Projects",
 *       subLabel: "Completed in 2024"
 *     },
 *     {
 *       value: 0,
 *       stringValue: "∞",
 *       label: "Possibilities",
 *       subLabel: "Limited only by imagination"
 *     }
 *   ]}
 * />
 */

import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleTextAnimation1 from '@/components/snippets/ScrambleTextAnimation1';

gsap.registerPlugin(ScrollTrigger);

// Placeholder data for component preview
const mockData = {
  statistics: [
    {
      value: 1,
      stringValue: '01',
      label: 'You share what you need',
      subLabel:
        'Tell me what you\u2019re trying to build or fix. No brief template, no lengthy forms. Just tell me what\u2019s going on.',
    },
    {
      value: 2,
      stringValue: '02',
      label: 'I come back with a clear scope',
      subLabel:
        'I\u2019ll tell you exactly what I\u2019ll do, how long it\u2019ll take, and what it costs. No surprises.',
    },
    {
      value: 3,
      stringValue: '03',
      label: 'We work together ongoing',
      subLabel:
        '"Most clients stay on a monthly retainer. Your store keeps evolving, I keep building.',
    },
  ],
};

/**
 * Stats component that displays statistics with headings and descriptions
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.id='stats'] - Optional ID for anchor linking
 * @param {string} [props.overline='Stats'] - Optional overline text displayed above the title
 * @param {string} [props.title] - Main heading text
 * @param {string} [props.description] - Descriptive text below heading
 * @param {Array} [props.statistics] - Array of statistic objects with value, label, and subLabel
 * @param {string} [props.theme] - Optional theme override for this section (light, dark, modern)
 */
export default function Steps({
  id = 'how-i-work',
  overlineText = 'How I Work',
  statistics = mockData.statistics,
  className = '',
}) {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  if (!statistics.length) return null;

  return (
    <section ref={sectionRef} id={id} className={cn(className)}>
      <ScrambleTextAnimation1 className='text-overline mb-6 text-muted'>
        {overlineText}
      </ScrambleTextAnimation1>
      {/* Progress line — desktop only */}
      <div
        ref={lineRef}
        className='hidden md:block h-px bg-muted/50 mb-10 origin-left'
        style={{ transform: 'scaleX(0)' }}
      />
      <div className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-3'>
        {statistics.map(({ value, stringValue, label, subLabel }, index) => (
          <Stat
            key={index}
            index={index}
            value={value}
            stringValue={stringValue}
            label={label}
            subLabel={subLabel}
          />
        ))}
      </div>
    </section>
  );
}


function Stat({ value, label, subLabel, stringValue, index = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const stepValue = index + 1;
  const startValue = 30;

  const countValue = useSpring(startValue, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (isInView) {
      countValue.set(stepValue);
    } else {
      countValue.jump(startValue);
    }
  }, [isInView, stepValue, countValue]);

  const displayValue = useTransform(countValue, (latest) =>
    latest - stepValue < 1.5
      ? String(stepValue).padStart(2, '0')
      : String(Math.floor(latest)),
  );

  return (
    <div ref={ref} className='flex flex-col gap-4'>
      <motion.h3 className='h1'>
        {typeof value === 'number' ? displayValue : stringValue}
      </motion.h3>
      <div className='border-border flex w-full flex-col gap-1 border-t pt-4'>
        <p className='text-foreground font-medium'>{label}</p>
        {subLabel && <p className='text-muted-foreground'>{subLabel}</p>}
      </div>
    </div>
  );
}

Steps.propTypes = {
  id: PropTypes.string,
  overlineText: PropTypes.string,
  statistics: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      stringValue: PropTypes.string,
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
  /**
   * Optional theme override for this section (light, dark, modern)
   */
  theme: PropTypes.string,
};

Stat.propTypes = {
  value: PropTypes.any,
  stringValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  index: PropTypes.number,
};
