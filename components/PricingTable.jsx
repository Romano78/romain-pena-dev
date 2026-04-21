'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import SectionHeader from '@/components/snippets/SectionHeader';
import PropTypes from 'prop-types';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const defaultOptions = {
  overline: 'Working together',
  title: 'Simple, transparent pricing',
  body: 'I prefer to work on a monthly retainer basis, predictable for you, sustainable for me.',
  mostPopularText: 'Most Popular',
  currency: '€',
  pricePeriodText: '/month',
  plans: [
    {
      popular: false,
      title: 'Growth',
      description: '12 hours included',
      price: 1200,
      features: [
        { feature: 'Figma → Shopify implementation' },
        { feature: 'New feature additions' },
        { feature: 'Bug fixes & improvements' },
        { feature: '48h response time' },
        { feature: 'Monthly sync call' },
      ],
      buttonText: 'Get started',
      buttonLink: '#contact',
    },
    {
      popular: true,
      title: 'Partner',
      description: '20 hours included',
      price: 2000,
      features: [
        { feature: 'Everything in Growth' },
        { feature: 'Custom features & integrations' },
        { feature: 'Custom app development' },
        { feature: 'Weekly sync call' },
        { feature: 'Slack access' },
      ],
      buttonText: 'Get started',
      buttonLink: '#contact',
    },
  ],
};

export default function PricingTable({ className, options = defaultOptions }) {
  const cardsRef = useScrollReveal({
    stagger: 0.15,
    selector: '.pricing-card',
    start: 'top 80%',
  });

  return (
    <section id='pricing' className={cn('relative', className)}>
      <SectionHeader
        overline={options.overline}
        title={options.title}
        body={options.body}
        align='left'
      />

      <div
        ref={cardsRef}
        className='mx-auto grid gap-4 sm:grid-cols-2'
      >
        {options.plans.map((plan) => (
          <div
            key={plan.title}
            className={cn(
              'pricing-card border-border bg-card relative rounded-[--radius] border p-8',
              plan.popular && 'border-primary shadow-lg',
            )}
          >
            {plan.popular && (
              <div className='bg-primary text-primary-foreground absolute -top-5 left-0 right-0 mx-auto w-32 rounded px-3 py-2 text-center text-sm'>
                {options.mostPopularText}
              </div>
            )}

            <div className='mb-5'>
              <h3 className='text-xl text-foreground'>{plan.title}</h3>
              <p className='text-muted-foreground'>{plan.description}</p>
            </div>

            <div className='mb-5'>
              <span className='font-sans text-4xl text-foreground'>
                {options.currency}
                {plan.price}
              </span>
              <span className='text-muted-foreground'>
                {options.pricePeriodText}
              </span>
            </div>

            <ul className='mb-8 space-y-4'>
              {plan.features.map((feature, j) => (
                <li key={j} className='flex items-center gap-2'>
                  <Check className='text-primary size-5' />
                  <span className='text-foreground'>{feature.feature}</span>
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
  options: PropTypes.object,
};
