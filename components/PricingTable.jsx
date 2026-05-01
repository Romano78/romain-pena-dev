'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/snippets/SectionHeader';
import PropTypes from 'prop-types';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export default function PricingTable({ className }) {
  const t = useTranslations('pricing');
  const cardsRef = useScrollReveal({
    stagger: 0.15,
    selector: '.pricing-card',
    start: 'top 80%',
  });

  const plans = [
    {
      popular: false,
      title: t('growth.title'),
      description: t('growth.description'),
      price: 1200,
      features: t.raw('growth.features'),
      buttonText: t('growth.buttonText'),
      buttonLink: '#contact',
    },
    {
      popular: true,
      title: t('partner.title'),
      description: t('partner.description'),
      price: 2000,
      features: t.raw('partner.features'),
      buttonText: t('partner.buttonText'),
      buttonLink: '#contact',
    },
  ];

  return (
    <section id='pricing' className={cn('relative', className)}>
      <SectionHeader
        overline={t('overline')}
        title={t('title')}
        body={t('body')}
        align='left'
      />

      <div ref={cardsRef} className='mx-auto grid gap-4 sm:grid-cols-2'>
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={cn(
              'pricing-card border-border bg-card relative rounded-[--radius] border p-8',
              plan.popular && 'border-primary shadow-lg',
            )}
          >
            {plan.popular && (
              <div className='bg-primary text-primary-foreground absolute -top-5 left-0 right-0 mx-auto w-32 rounded px-3 py-2 text-center text-sm'>
                {t('mostPopularText')}
              </div>
            )}

            <div className='mb-5'>
              <h3 className='text-xl text-foreground'>{plan.title}</h3>
              <p className='text-muted-foreground'>{plan.description}</p>
            </div>

            <div className='mb-5'>
              <span className='font-sans text-4xl text-foreground'>
                {t('currency')}{plan.price}
              </span>
              <span className='text-muted-foreground'>{t('pricePeriodText')}</span>
            </div>

            <ul className='mb-8 space-y-4'>
              {plan.features.map((feature, j) => (
                <li key={j} className='flex items-center gap-2'>
                  <Check className='text-primary size-5' />
                  <span className='text-foreground'>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={plan.buttonLink}
              className='block w-full rounded-md border border-foreground bg-foreground px-6 py-3 text-center text-sm font-medium text-background transition-colors hover:bg-muted hover:border-muted'
            >
              {plan.buttonText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

PricingTable.propTypes = {
  className: PropTypes.string,
};
