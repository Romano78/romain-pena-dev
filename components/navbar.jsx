'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
        {/* Logo */}
        <a
          href='#'
          className='text-lg font-semibold tracking-tight text-foreground'
        >
          RomainPena<span className='font-light text-accent'>.dev</span>
        </a>

        {/* Desktop nav */}
        <div className='hidden items-center gap-8 md:flex'>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              {link.label}
            </a>
          ))}
          <a
            href='#contact'
            className='rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent'
          >
            Get in touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className='text-foreground md:hidden'
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <X className='h-5 w-5' />
          ) : (
            <Menu className='h-5 w-5' />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='border-b border-border bg-background px-6 pb-6 md:hidden'>
          <div className='flex flex-col gap-4'>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className='text-sm text-muted-foreground transition-colors hover:text-foreground'
              >
                {link.label}
              </a>
            ))}
            <a
              href='#contact'
              onClick={() => setMobileOpen(false)}
              className='w-fit rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent'
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
