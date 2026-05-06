'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import PropTypes from 'prop-types';
import SectionHeader from '@/components/snippets/SectionHeader';
import TextReveal from '@/components/snippets/TextReveal';
import { cn } from '@/lib/utils';
import ImagePlaceholder from '@/components/snippets/ImagePlaceholder';

const HIGHLIGHTS = {
  fr: ['psychologie', 'efficaces', 'précision', 'qualité', 'marquent'],
  en: ['psychology', 'effective', 'precision', 'quality', 'mark'],
};

const BLOCK_LABELS = {
  fr: ['Approche', 'Parcours', 'Exigence'],
  en: ['Approach', 'Background', 'Standards'],
};

export default function About({ className = '', portraits = [] }) {
  const t = useTranslations('about');
  const locale = useLocale();
  const hasPortraits = portraits.length >= 1;
  const highlights = HIGHLIGHTS[locale] ?? HIGHLIGHTS.en;
  const labels = BLOCK_LABELS[locale] ?? BLOCK_LABELS.en;

  const blocks = [t('block1'), t('block2'), t('block3')];
  const fullBody = blocks.join('\n\n');

  return (
    <section id='about' className={cn(className)}>
      <SectionHeader overline={t('overline')} lineAnimation={true} />

      <div className='flex flex-col min-[1440px]:flex-row-reverse min-[1440px]:items-start min-[1440px]:gap-12 mt-6 lg:mt-8'>
        <div className='relative w-full min-[1440px]:w-96 shrink-0 aspect-2/3 rounded-2xl overflow-hidden mb-8 min-[1440px]:mb-0 min-[1440px]:sticky min-[1440px]:top-[calc(var(--menu-height)+2rem)]'>
          {hasPortraits ? (
            <Image
              src={portraits[0]}
              alt='Romain Pena'
              fill
              sizes='384px'
              className='object-cover'
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>

        {/* Mobile: 3 separate cards */}
        <div className='flex-1 flex flex-col gap-4 md:hidden'>
          {blocks.map((block, i) => (
            <div key={i} className='rounded-2xl bg-card p-5'>
              <span className='text-overline text-muted block mb-3'>{labels[i]}</span>
              <TextReveal
                body={block}
                highlights={highlights}
                textClassName='text-base text-foreground/70 leading-relaxed'
              />
            </div>
          ))}
        </div>

        {/* Desktop: single unified card */}
        <div className='hidden md:block flex-1 rounded-2xl bg-card p-8 lg:p-10 min-[1440px]:sticky min-[1440px]:top-[calc(var(--menu-height)+2rem)]'>
          <TextReveal
            body={fullBody}
            highlights={highlights}
            textClassName='text-lg min-[1440px]:text-2xl text-foreground/70 leading-snug'
          />
        </div>
      </div>
    </section>
  );
}

About.propTypes = {
  className: PropTypes.string,
  portraits: PropTypes.arrayOf(PropTypes.string),
};
