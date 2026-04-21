'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/snippets/SectionHeader';

// Placeholder data for component preview
const mockData = {
  steps: [
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
        'Most clients stay on a monthly retainer. Your store keeps evolving — I keep building.',
    },
  ],
};

export default function Steps({
  id = 'how-i-work',
  overlineText = 'How I Work',
  steps = mockData.steps,
  className = '',
}) {
  if (!steps.length) return null;

  return (
    <section id={id} className={cn(className)}>
      <SectionHeader overline={overlineText} />
      <div className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-3'>
        {steps.map(({ value, stringValue, label, subLabel }, index) => (
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
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      stringValue: PropTypes.string,
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
  theme: PropTypes.string,
};

Stat.propTypes = {
  value: PropTypes.any,
  stringValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  index: PropTypes.number,
};
