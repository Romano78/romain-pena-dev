'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id='about' className={cn(className)}>
      <SectionHeader overline={t('overline')} lineAnimation={true} />

      <div className='flex flex-col min-[1440px]:flex-row-reverse min-[1440px]:items-start min-[1440px]:gap-12 mt-6 lg:mt-8'>
        <div className='hidden xl:block relative w-full min-[1440px]:w-96 shrink-0 aspect-2/3 rounded-2xl overflow-hidden mb-8 min-[1440px]:mb-0 min-[1440px]:sticky min-[1440px]:top-[calc(var(--menu-height)+2rem)]'>
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

        {/* Mobile: cards then avatar vertically */}
        <div className='flex-1 flex flex-col gap-4 xl:hidden'>
          {/* Avatar button */}
          <button
            onClick={() => setModalOpen(true)}
            className='shrink-0 bg-transparent mb-6'
          >
            <div className='relative w-32 h-32 rounded-lg overflow-hidden ring-2 ring-border'>
              {hasPortraits ? (
                <Image
                  src={portraits[0]}
                  alt='Romain Pena'
                  fill
                  sizes='128px'
                  className='object-cover'
                />
              ) : (
                <ImagePlaceholder />
              )}
            </div>
          </button>

          {/* Cards */}
          <div className='flex flex-col gap-4 flex-1'>
            {blocks.map((block, i) => (
              <div key={i} className='rounded-2xl bg-card p-5'>
                <span className='text-overline text-muted block mb-3'>{labels[i]}</span>
                <p className='text-base text-foreground/70 leading-relaxed'>{block}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className='relative w-72 aspect-2/3 rounded-2xl overflow-hidden'
              >
                {hasPortraits ? (
                  <Image
                    src={portraits[0]}
                    alt='Romain Pena'
                    fill
                    sizes='288px'
                    className='object-cover'
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop: single unified card */}
        <div className='hidden xl:block flex-1 rounded-2xl bg-card p-8 lg:p-10 min-[1440px]:sticky min-[1440px]:top-[calc(var(--menu-height)+2rem)]'>
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
