'use client';

import { Download } from 'lucide-react';
import PillCta from '@/components/snippets/PillCta';

export default function Resume() {
  return (
    <div className='max-w-2xl mx-auto'>
      {/* Download Button */}
      <div className='mb-12' data-no-print>
        <PillCta
          href='/resume-romain.pdf'
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
          Shopify Developer & Frontend Engineer
        </p>
        <p className='text-sm text-muted-foreground'>
          rom.penaruiz@gmail.com · Montreal, QC · romainpena.dev
        </p>
      </div>

      {/* Summary */}
      <section className='mb-8'>
        <p className='text-sm text-foreground leading-relaxed mb-3'>
          Frontend developer specializing in Shopify — custom themes built from
          Figma, custom app development, and third-party integrations. 4+ years
          at a Montreal agency, now independent.
        </p>
        <p className='text-sm text-muted-foreground leading-relaxed'>
          I studied psychology at Cal State Long Beach before deciding I wanted
          to build things. Moved to Montreal, joined Le Wagon&apos;s bootcamp,
          and that&apos;s where coding clicked. After the bootcamp I joined
          Field Office, a Montreal web agency, where most of my work was
          Shopify. Now independent, I&apos;ve broadened what I take on —
          cinematic portfolio sites, commerce pages, and custom tools that
          replace platform subscriptions at a fraction of the cost.
        </p>
      </section>

      <hr className='border-t border-border mb-8' />

      {/* Experience */}
      <section className='mb-8'>
        <h2 className='text-xs font-semibold tracking-widest uppercase text-muted mb-6'>
          Experience
        </h2>

        <div className='space-y-6'>
          {/* Field Office */}
          <div>
            <div className='flex justify-between items-start mb-2'>
              <h3 className='font-semibold text-foreground'>Field Office</h3>
            </div>
            <p className='text-sm text-muted-foreground mb-3'>
              Full Stack Developer · Jun 2021 – Oct 2025 · Montreal, QC
            </p>
            <ul className='text-sm text-foreground space-y-1 pl-4'>
              <li>
                · Shopify theme development: custom Liquid sections built
                pixel-perfect from Figma files
              </li>
              <li>
                · Custom fulfillment apps, inventory sync tools, webhook
                integrations
              </li>
              <li>
                · Third-party integrations: Klaviyo, Google Tag Manager, REST
                APIs
              </li>
              <li>· Webflow and Next.js projects alongside Shopify work</li>
            </ul>
          </div>

          {/* Beslogic Inc */}
          <div>
            <div className='flex justify-between items-start mb-2'>
              <h3 className='font-semibold text-foreground'>Beslogic Inc</h3>
            </div>
            <p className='text-sm text-muted-foreground mb-3'>
              Full Stack Web Developer · 2019 – 2020 · Montreal, QC
            </p>
            <ul className='text-sm text-foreground space-y-1 pl-4'>
              <li>
                · Full-stack development in C#, ASP.NET Core, Angular,
                TypeScript
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className='border-t border-border mb-8' />

      {/* Education */}
      <section className='mb-8'>
        <h2 className='text-xs font-semibold tracking-widest uppercase text-muted mb-6'>
          Education
        </h2>

        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold text-foreground'>Le Wagon</h3>
            <p className='text-sm text-muted-foreground'>
              Web Development Bootcamp · 2019 · Montreal
            </p>
          </div>
          <div>
            <h3 className='font-semibold text-foreground'>
              Cal State Long Beach
            </h3>
            <p className='text-sm text-muted-foreground'>BA Psychology</p>
          </div>
        </div>
      </section>

      <hr className='border-t border-border mb-8' />

      {/* Skills */}
      <section className='mb-8'>
        <h2 className='text-xs font-semibold tracking-widest uppercase text-muted mb-6'>
          Skills
        </h2>

        <div className='grid grid-cols-2 gap-x-8 gap-y-3'>
          <div className='text-sm'>
            <span className='font-semibold text-foreground'>Shopify</span>
            <span className='text-muted-foreground'>
              {' '}
              — Liquid, custom sections, custom apps, Klaviyo, GTM
            </span>
          </div>
          <div className='text-sm'>
            <span className='font-semibold text-foreground'>Frontend</span>
            <span className='text-muted-foreground'>
              {' '}
              — React 19, Next.js, TypeScript, Tailwind CSS, GSAP
            </span>
          </div>
          <div className='text-sm'>
            <span className='font-semibold text-foreground'>Backend</span>
            <span className='text-muted-foreground'>
              {' '}
              — Supabase, REST APIs, C#, ASP.NET Core
            </span>
          </div>
          <div className='text-sm'>
            <span className='font-semibold text-foreground'>Tooling</span>
            <span className='text-muted-foreground'>
              {' '}
              — Figma to code, Vercel, AI-assisted development
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
