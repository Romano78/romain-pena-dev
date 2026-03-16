'use client';

import { Mail } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import ScrambleTextAnimation1 from '@/components/snippets/ScrambleTextAnimation1';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Contact({ className = '' }) {
  const ref = useScrollReveal({
    y: 30,
    duration: 0.9,
    stagger: 0.1,
    selector: '.contact-reveal',
  });

  return (
    <section id='contact' ref={ref} className={cn(className)}>
      <ScrambleTextAnimation1 className='text-overline mb-6 text-muted contact-reveal'>
        {"Let's talk."}
      </ScrambleTextAnimation1>

      <p className='contact-reveal mt-6 max-w-xl text-lg leading-relaxed text-foreground'>
        If you have a Shopify store and need reliable ongoing development, I
        {"'"}d love to hear about it. Send me a message and I{"'"}ll get back to
        you within 24 hours.
      </p>

      <div className='contact-reveal mt-10 flex flex-col gap-8 md:flex-row md:gap-16'>
        <a
          href='mailto:hello@romainpena.dev'
          className='flex items-center gap-3 text-foreground transition-colors hover:text-muted'
        >
          <Mail className='h-5 w-5' />
          <span className='border-b border-foreground pb-0.5 text-sm font-medium transition-colors hover:border-muted'>
            hello@romainpena.dev
          </span>
        </a>
      </div>

      <form
        className='contact-reveal mt-10 max-w-md space-y-4'
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor='name' className='sr-only'>
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Your name'
            className='w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-muted focus:outline-none'
          />
        </div>
        <div>
          <label htmlFor='email' className='sr-only'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Your email'
            className='w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-muted focus:outline-none'
          />
        </div>
        <div>
          <label htmlFor='message' className='sr-only'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            placeholder='Tell me about your project'
            rows={4}
            className='w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-muted focus:outline-none'
          />
        </div>
        <button
          type='submit'
          className='rounded-md border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-muted hover:border-muted'
        >
          Send message
        </button>
        <Button variant='secondary' size='sm' className='w-full'>
          Send message
        </Button>
      </form>
    </section>
  );
}
