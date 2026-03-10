'use client';

import { X, Check, Info } from 'lucide-react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

const defaultFeatures = [
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
];

function renderFeatureValue(value) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className='text-primary mx-auto h-5 w-5 transition-transform group-hover:scale-110' />
    ) : (
      <X className='text-muted-foreground/70 mx-auto h-5 w-5 transition-transform group-hover:scale-110' />
    );
  }
  if (value === '+') {
    return (
      <Check className='text-primary mx-auto h-5 w-5 transition-transform group-hover:scale-110' />
    );
  }
  if (value === '-' || !value) {
    return (
      <X className='text-muted-foreground/70 mx-auto h-5 w-5 transition-transform group-hover:scale-110' />
    );
  }
  return <span className='text-muted-foreground font-medium'>{value}</span>;
}

function ComparisonTable({
  fullFeatureList = defaultFeatures,
  planTitles = ['Starter', 'Growth', 'Scale'],
  fullFeatureListName = 'Feature Comparison',
  fullFeatureListItemName = 'Feature',
  className = '',
}) {
  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          'bg-background border-border relative w-full max-w-full overflow-hidden rounded-[--radius] border pt-0 shadow-md',
          className,
        )}
        initial={{ opacity: 0, maxHeight: 0 }}
        animate={{ maxHeight: 3500, opacity: 1 }}
        exit={{ opacity: 0, maxHeight: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <h2 className='h4 text-foreground py-8 pt-12 text-center'>
          {fullFeatureListName}
        </h2>
        <div className='overflow-x-auto'>
          <table className='mb-0 w-full'>
            <thead>
              <tr className='bg-muted/50'>
                <th className='text-muted-foreground p-4 text-left text-sm font-medium font-mono'>
                  {fullFeatureListItemName}
                </th>
                {planTitles.map((planTitle) => (
                  <th
                    key={planTitle}
                    className='text-muted-foreground p-4 text-center text-sm font-medium font-mono'
                  >
                    {planTitle}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-border divide-y'>
              {fullFeatureList.map((feature, index) => (
                <tr
                  key={index}
                  className='group hover:bg-muted/30 transition-colors'
                >
                  <td className='text-foreground flex items-center p-4 text-sm font-medium md:text-base'>
                    {feature.name}
                    {feature.info && (
                      <Info
                        data-tooltip-id={feature.name}
                        data-tooltip-content={feature.info}
                        data-tooltip-class='tooltip-content'
                        data-tooltip-place='top'
                        className='withTooltip text-muted-foreground/70 hover:text-primary ml-1.5 h-4 w-4 shrink-0 cursor-help transition-colors md:ml-3'
                      />
                    )}
                  </td>
                  <td className='p-4 text-center'>
                    {renderFeatureValue(feature.starter)}
                  </td>
                  <td className='p-4 text-center'>
                    {renderFeatureValue(feature.growth)}
                  </td>
                  <td className='p-4 text-center'>
                    {renderFeatureValue(feature.scale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReactTooltip
          anchorSelect='.withTooltip'
          className='!bg-popover !text-popover-foreground !max-w-xs !px-3 !py-2 !text-sm !opacity-100 !shadow-md'
        />
      </motion.div>
    </AnimatePresence>
  );
}

ComparisonTable.propTypes = {
  fullFeatureList: PropTypes.array,
  planTitles: PropTypes.array,
  fullFeatureListName: PropTypes.string,
  fullFeatureListItemName: PropTypes.string,
  className: PropTypes.string,
};

export default ComparisonTable;
