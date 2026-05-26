'use client';

import { Download } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import PillCta from '@/components/snippets/PillCta';

export default function Resume() {
  const t = useTranslations('resume');
  const locale = useLocale();
  const pdfUrl = locale === 'fr' ? '/resume-romain-fr.pdf' : '/resume-romain.pdf';

  return (
    <div className='max-w-2xl mx-auto'>
      {/* Download Button */}
      <div className='mb-12' data-no-print>
        <PillCta
          href={pdfUrl}
          icon={<Download className='h-3 w-3' />}
        >
          Download PDF
        </PillCta>
      </div>

      {/* Header */}
      <div className='mb-8'>
        <h1 className='mb-2'>
          <span className='font-normal'>Romain </span>
          <span className='text-muted'>Pena Ruiz</span>
        </h1>
        <p className='text-lg text-muted-foreground mb-4'>
          {t('title')}
        </p>
        <p className='text-sm text-muted-foreground'>
          {t('contact')}
        </p>
      </div>

      {/* Summary */}
      <section className='mb-8'>
        <p className='text-sm text-foreground leading-relaxed'>
          {t('summary')}
        </p>
      </section>

      <hr className='border-t border-border mb-8' />

      {/* Experience */}
      <section className='mb-8'>
        <h2 className='text-xs font-semibold tracking-widest uppercase text-muted mb-6'>
          {t('experience.sectionLabel')}
        </h2>

        <div className='space-y-6'>
          {/* Field Office */}
          <div>
            <div className='flex justify-between items-start mb-2'>
              <h3 className='font-semibold text-foreground'>
                {t('experience.fieldOffice.company')}
              </h3>
            </div>
            <p className='text-sm text-muted-foreground mb-3'>
              {t('experience.fieldOffice.role')} · {t('experience.fieldOffice.date')} · {t('experience.fieldOffice.location')}
            </p>
            <ul className='text-sm text-foreground space-y-1 pl-4'>
              {t.raw('experience.fieldOffice.bullets').map((bullet, i) => (
                <li key={i}>· {bullet}</li>
              ))}
            </ul>
          </div>

          {/* Le Wagon */}
          <div>
            <div className='flex justify-between items-start mb-2'>
              <h3 className='font-semibold text-foreground'>
                {t('experience.leWagon.company')}
              </h3>
            </div>
            <p className='text-sm text-muted-foreground mb-3'>
              {t('experience.leWagon.role')} · {t('experience.leWagon.date')} · {t('experience.leWagon.location')}
            </p>
            <ul className='text-sm text-foreground space-y-1 pl-4'>
              {t.raw('experience.leWagon.bullets').map((bullet, i) => (
                <li key={i}>· {bullet}</li>
              ))}
            </ul>
          </div>

          {/* Beslogic Inc */}
          <div>
            <div className='flex justify-between items-start mb-2'>
              <h3 className='font-semibold text-foreground'>
                {t('experience.beslogic.company')}
              </h3>
            </div>
            <p className='text-sm text-muted-foreground mb-3'>
              {t('experience.beslogic.role')} · {t('experience.beslogic.date')} · {t('experience.beslogic.location')}
            </p>
            <ul className='text-sm text-foreground space-y-1 pl-4'>
              {t.raw('experience.beslogic.bullets').map((bullet, i) => (
                <li key={i}>· {bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <hr className='border-t border-border mb-8' />

      {/* Education */}
      <section className='mb-8'>
        <h2 className='text-xs font-semibold tracking-widest uppercase text-muted mb-6'>
          {t('education.sectionLabel')}
        </h2>

        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold text-foreground'>
              {t('education.leWagonBootcamp.school')}
            </h3>
            <p className='text-sm text-muted-foreground'>
              {t('education.leWagonBootcamp.program')} · {t('education.leWagonBootcamp.year')} · {t('education.leWagonBootcamp.location')}
            </p>
          </div>
          <div>
            <h3 className='font-semibold text-foreground'>
              {t('education.calState.school')}
            </h3>
            <p className='text-sm text-muted-foreground'>
              {t('education.calState.program')} · {t('education.calState.year')} · {t('education.calState.location')}
            </p>
          </div>
        </div>
      </section>

      <hr className='border-t border-border mb-8' />

      {/* Skills */}
      <section className='mb-8'>
        <h2 className='text-xs font-semibold tracking-widest uppercase text-muted mb-6'>
          {t('skills.sectionLabel')}
        </h2>

        <div className='grid grid-cols-2 gap-x-8 gap-y-3'>
          <div className='text-sm'>
            <span className='font-semibold text-foreground'>{t('skills.shopify.category')}</span>
            <span className='text-muted-foreground'>
              {' '}
              — {t('skills.shopify.values')}
            </span>
          </div>
          <div className='text-sm'>
            <span className='font-semibold text-foreground'>{t('skills.frontend.category')}</span>
            <span className='text-muted-foreground'>
              {' '}
              — {t('skills.frontend.values')}
            </span>
          </div>
          <div className='text-sm'>
            <span className='font-semibold text-foreground'>{t('skills.backend.category')}</span>
            <span className='text-muted-foreground'>
              {' '}
              — {t('skills.backend.values')}
            </span>
          </div>
          <div className='text-sm'>
            <span className='font-semibold text-foreground'>{t('skills.cms.category')}</span>
            <span className='text-muted-foreground'>
              {' '}
              — {t('skills.cms.values')}
            </span>
          </div>
          <div className='text-sm'>
            <span className='font-semibold text-foreground'>{t('skills.tooling.category')}</span>
            <span className='text-muted-foreground'>
              {' '}
              — {t('skills.tooling.values')}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
