'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import PropTypes from 'prop-types';
import SectionHeader from '@/components/snippets/SectionHeader';
import TextReveal from '@/components/snippets/TextReveal';
import { cn } from '@/lib/utils';
import ImagePlaceholder from '@/components/snippets/ImagePlaceholder';

export default function About({ className = '', portraits = [] }) {
  const t = useTranslations('about');
  const hasPortraits = portraits.length >= 1;

  return (
    <section id='about' className={cn(className)}>
      <SectionHeader overline={t('overline')} lineAnimation={true} />

      <div className='flex flex-col min-[1440px]:flex-row min-[1440px]:items-start min-[1440px]:gap-12 mt-10'>
        <TextReveal
          body={t('body')}
          className='flex-1 min-[1440px]:sticky min-[1440px]:top-[calc(var(--menu-height)+2rem)]'
          textClassName='text-xl min-[1440px]:text-3xl text-foreground/70 leading-relaxed'
        />

        <div className='relative w-96 shrink-0 aspect-2/3 rounded-2xl overflow-hidden mt-8 min-[1440px]:mt-0 min-[1440px]:sticky min-[1440px]:top-[calc(var(--menu-height)+2rem)]'>
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
      </div>
    </section>
  );
}

About.propTypes = {
  className: PropTypes.string,
  portraits: PropTypes.arrayOf(PropTypes.string),
};
