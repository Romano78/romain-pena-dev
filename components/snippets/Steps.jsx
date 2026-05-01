'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/snippets/SectionHeader';

export default function Steps({ id = 'how-i-work', className = '' }) {
  const t = useTranslations('steps');

  const steps = [
    { value: 1, stringValue: '01', label: t('step1.label'), subLabel: t('step1.subLabel') },
    { value: 2, stringValue: '02', label: t('step2.label'), subLabel: t('step2.subLabel') },
    { value: 3, stringValue: '03', label: t('step3.label'), subLabel: t('step3.subLabel') },
  ];

  return (
    <section id={id} className={cn(className)}>
      <SectionHeader overline={t('overline')} />
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
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const stepValue = index + 1;
  const startValue = 0;

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
    String(Math.round(latest) >= stepValue ? stepValue : Math.round(latest)).padStart(2, '0')
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
  className: PropTypes.string,
};

Stat.propTypes = {
  value: PropTypes.any,
  stringValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  index: PropTypes.number,
};
