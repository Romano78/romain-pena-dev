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
  body: 'I prefer to  work on a monthly retainer basis, predictable for you, sustainable for me.',
  quarterlyText: '',
  yearlyText: '',
  fullComparisonButtonText: 'Compare all features',
  plans: [
    {
      buttonVariant: 'default',
      popular: false,
      title: 'Growth',
      description: '12 hours included',
      price: 900,
      features: [
        { feature: 'Design implementation from Figma' },
        { feature: 'New feature additions' },
        { feature: 'Bug fixes & improvements' },
        { feature: '48h response time' },
        { feature: 'Monthly sync call' },
      ],
      buttonText: 'Start Pro',
      buttonLink: '#',
    },
    {
      buttonVariant: 'outline',
      popular: true,
      title: 'Partner',
      description: '20 hours included',
      price: 1500,
      features: [
        { feature: 'Everything in Growth' },
        { feature: 'Custom features & integrations' },
        { feature: 'Priority support' },
        { feature: 'Weekly sync call' },
        { feature: 'Slack access' },
      ],
      buttonText: 'Contact Sales',
      buttonLink: '#',
    },
    {
      buttonVariant: 'outline',
      popular: false,
      title: 'Site Audit',
      description: 'One-time comprehensive review',
      price: 0,
      features: [
        { feature: 'Comprehensive site analysis' },
        { feature: 'Detailed report with actionable insights' },
        { feature: 'Recommendations for improvements' },
        { feature: 'SEO, performance, and accessibility review' },
        { feature: 'One-time service' },
      ],
      buttonText: 'Get Started',
      buttonLink: '#',
    }
  ],
  fullFeatureList: [
    {
      name: 'Components',
      starter: 'Basic',
      growth: 'Advanced',
      scale: 'Custom',
      info: 'Number and types of UI components available',
    },
    {
      name: 'Documentation',
      starter: 'Basic',
      growth: 'Advanced',
      scale: 'Custom',
      info: 'Level of documentation detail and examples',
    },
    {
      name: 'Support',
      starter: 'Community',
      growth: 'Premium',
      scale: 'Priority',
      info: 'Support response time and channels',
    },
    {
      name: 'Updates',
      starter: '+',
      growth: '+',
      scale: '+',
      info: 'Regular updates and bug fixes',
    },
    {
      name: 'Source Code',
      starter: '-',
      growth: '+',
      scale: '+',
      info: 'Access to component source code',
    },
    {
      name: 'Custom Theming',
      starter: 'Basic',
      growth: 'Advanced',
      scale: 'Custom',
      info: 'Ability to customize component themes',
    },
    {
      name: 'Private Discord',
      starter: '-',
      growth: '+',
      scale: '+',
      info: 'Access to private Discord community',
    },
    {
      name: 'Team Training',
      starter: '-',
      growth: '-',
      scale: '+',
      info: 'Personalized training sessions',
    },
    {
      name: 'SLA Guarantee',
      starter: '-',
      growth: '-',
      scale: '+',
      info: 'Service Level Agreement support',
    },
  ],

  billedQuarterlyText: 'billed monthly',
  billedYearlyText: 'billed yearly',
  mostPopularText: 'Most Popular',
  currency: '$',
  pricePeriodText: '/month',
  fullFeatureListName: 'Feature Comparison',
  fullFeatureListItemName: 'Feature',
};

/**
 * PricingTable component that displays pricing plans with feature comparison
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.options] - Pricing table configuration
 * @param {string} [props.theme] - Optional theme override for this section (light, dark, modern)
 */
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
        lineAnimation={true}
      />

      <div
        ref={cardsRef}
        className='mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3'
      >
        {options.plans.map((plan) => (
          <div
            key={plan.title}
            className={cn(
              'pricing-card border-border bg-card relative rounded-[--radius] border rounded-sm  p-8 hover:bg-[hsl(187_80%_12%)] radius-sm',
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
              <span className='text-4xl text-foreground'>
                {options.currency}
                {plan.price}
              </span>
              <span className='text-muted-foreground'>
                {options.pricePeriodText}
              </span>
              <br />
            </div>

            <ul className='mb-8 space-y-4'>
              {plan.features.map((feature, j) => (
                <li key={j} className='flex items-center gap-2'>
                  <Check className='text-primary size-5' />
                  <span className='text-foreground'>{feature.feature}</span>
                </li>
              ))}
            </ul>
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
