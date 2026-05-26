'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Instagram } from 'lucide-react';
import { navigationItems } from '@/config/navigation-config';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/snippets/LanguageSwitcher';
import { cubicBezierPreset } from '@/config/cubic-beziers';
import PropTypes from 'prop-types';
import { useTranslations } from 'next-intl';

export default function MobileMenu({ isOpen, onClose }) {
  const navTranslations = useTranslations('nav');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-[200] flex flex-col bg-background'
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: cubicBezierPreset }}
        >
          {/* Header */}
          <div className='flex items-center justify-between px-6 py-4 border-b border-border'>
            <a href='/' onClick={onClose} className='text-foreground'>
              <svg
                width='40'
                height='40'
                viewBox='0 0 40 40'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-label='Romain Pena'
              >
                <defs>
                  <filter id='mobile-logo-shadow'>
                    <feGaussianBlur in='SourceAlpha' stdDeviation='1' />
                    <feOffset dx='0' dy='1.5' result='offsetblur' />
                    <feFlood floodColor='#000000' floodOpacity='0.15' />
                    <feComposite in2='offsetblur' operator='in' />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in='SourceGraphic' />
                    </feMerge>
                  </filter>
                </defs>

                {/* Rounded square frame */}
                <rect
                  x='2'
                  y='2'
                  width='36'
                  height='36'
                  rx='6'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  fill='none'
                  filter='url(#mobile-logo-shadow)'
                />

                {/* R in foreground color */}
                <text
                  x='15'
                  y='22'
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fontSize='18'
                  fontWeight='500'
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                  fill='currentColor'
                  letterSpacing='-0.5'
                  filter='url(#mobile-logo-shadow)'
                >
                  R
                </text>

                {/* P in cyan */}
                <text
                  x='25'
                  y='22'
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fontSize='18'
                  fontWeight='500'
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                  fill='#5FD9D9'
                  letterSpacing='-0.5'
                  filter='url(#mobile-logo-shadow)'
                >
                  P
                </text>
              </svg>
            </a>
            <button
              onClick={onClose}
              className='flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase text-foreground/70 border border-border'
            >
              Close <X size={14} />
            </button>
          </div>

          {/* Links */}
          <nav className='flex flex-col justify-center flex-1 px-6 gap-6'>
            {navigationItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease: cubicBezierPreset }}
              >
                {item.isPage ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className='text-5xl font-bold text-foreground hover:text-muted transition-colors block'
                  >
                    {navTranslations(item.id) || item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      setTimeout(() => {
                        window.location.hash = item.href.replace('#', '');
                      }, 300);
                    }}
                    className='text-5xl font-bold text-foreground hover:text-muted transition-colors block'
                  >
                    {navTranslations(item.id) || item.label}
                  </a>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Bottom */}
          <div className='px-6 py-8 flex items-center justify-between border-t border-border'>
            <LanguageSwitcher />
            <div className='flex items-center gap-4'>
              <a
                href='https://www.instagram.com/romainpena.dev/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
                className='text-foreground/60 hover:text-foreground transition-colors duration-300'
              >
                <Instagram className='h-4 w-4' />
              </a>
              <a
                href='https://www.linkedin.com/in/romainpenaruiz/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
                className='text-foreground/60 hover:text-foreground transition-colors duration-300'
              >
                <Linkedin className='h-4 w-4' />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
