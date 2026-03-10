'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/snippets/SectionHeader';
import ComparisonTable from '@/components/snippets/ComparisonTable';
import PropTypes from 'prop-types';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const defaultOptions = {
  overline: 'Pricing',
  title: 'Simple, transparent pricing',
  body: 'Choose the perfect plan for your needs.',
  quarterlyText: 'Monthly',
  yearlyText: 'Yearly (Save 20%)',
  fullComparisonButtonText: 'Compare all features',
  plans: [
    {
      buttonVariant: 'outline',
      popular: false,
      title: 'Free',
      description: 'Perfect for trying out our components',
      price: 0,
      yearlyPrice: 0,
      features: [
        { feature: 'Access to basic components' },
        { feature: 'Community support' },
        { feature: 'Basic documentation' },
        { feature: 'GitHub access' },
      ],
      buttonText: 'Get Started',
      buttonLink: '#',
    },
    {
      buttonVariant: 'default',
      popular: true,
      title: 'Pro',
      description: 'For professional developers and small teams',
      price: 29,
      yearlyPrice: 279,
      features: [
        { feature: 'All basic components' },
        { feature: 'Advanced components' },
        { feature: 'Premium support' },
        { feature: 'Advanced documentation' },
        { feature: 'Source code access' },
        { feature: 'Private Discord' },
      ],
      buttonText: 'Start Pro',
      buttonLink: '#',
    },
    {
      buttonVariant: 'outline',
      popular: false,
      title: 'Enterprise',
      description: 'For large teams and custom needs',
      price: 99,
      yearlyPrice: 950,
      features: [
        { feature: 'Everything in Pro' },
        { feature: 'Custom components' },
        { feature: 'Priority support' },
        { feature: 'Team training' },
        { feature: 'Custom theming' },
        { feature: 'SLA guarantee' },
      ],
      buttonText: 'Contact Sales',
      buttonLink: '#',
    },
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
  bottomText:
    'Take a look at our comprehensive feature comparison to find the perfect fit for your needs.',
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
  const [isYearly, setIsYearly] = React.useState(false);
  const [showFullComparison, setShowFullComparison] = React.useState(false);
  const cardsRef = useScrollReveal({ stagger: 0.15, selector: '.pricing-card', start: 'top 80%' });

  return (
    <section id="pricing" className={cn('relative', className)}>
          <div className='mx-auto max-w-[58rem] text-center'>
            <SectionHeader
              overline={options.overline}
              title={options.title}
              body={options.body}
              align='center'
            />
          </div>

          <div className='mb-8 mt-4 flex justify-center'>
            <div className='border-border inline-flex items-center rounded-[--radius] border p-1.5'>
              <Button
                variant='ghost'
                size='sm'
                className={cn(
                  'px-4',
                  !isYearly && 'bg-primary text-primary-foreground shadow-sm',
                )}
                onClick={() => setIsYearly(false)}
              >
                {options.quarterlyText}
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className={cn(
                  'px-4',
                  isYearly && 'bg-primary text-primary-foreground shadow-sm',
                )}
                onClick={() => setIsYearly(true)}
              >
                {options.yearlyText}
              </Button>
            </div>
          </div>

          <div ref={cardsRef} className='mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
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
                  <span className='text-4xl text-foreground'>
                    {options.currency}
                    {isYearly ? plan.yearlyPrice : plan.price}
                  </span>
                  <span className='text-muted-foreground'>
                    {options.pricePeriodText}
                  </span>
                  <br />
                  <span className='text-muted-foreground text-sm'>
                    {isYearly
                      ? options.billedYearlyText
                      : options.billedQuarterlyText}
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

                <Button
                  variant={plan.buttonVariant}
                  className='w-full'
                  href={plan.buttonLink}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>

          <div className='mt-8 text-center'>
            <p className='text-muted-foreground mb-4'>{options.bottomText}</p>
            <Button
              variant='outline'
              onClick={() => setShowFullComparison(!showFullComparison)}
            >
              {options.fullComparisonButtonText}
            </Button>
          </div>

          {showFullComparison && (
            <div className='mt-16'>
              <ComparisonTable features={options.fullFeatureList} />
            </div>
          )}
    </section>
  );
}

PricingTable.propTypes = {
  className: PropTypes.string,
  options: PropTypes.object,
  /**
   * Optional theme override for this section (light, dark, modern)
   */
  theme: PropTypes.string,
};
