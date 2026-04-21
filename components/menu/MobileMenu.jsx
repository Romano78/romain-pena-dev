'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { navigationItems } from '@/config/navigation-config';
import { ThemeToggle } from './ThemeToggle';
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
            <a href='#' onClick={onClose} className='text-lg font-semibold tracking-tight text-foreground'>
              Romain<span className='text-muted'>Pena</span>
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
                <a
                  href={item.href}
                  onClick={onClose}
                  className='text-5xl font-bold text-foreground hover:text-muted transition-colors block'
                >
                  {navTranslations(item.id) || item.label}
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Bottom */}
          <div className='px-6 py-8 flex items-center gap-4 border-t border-border'>
            <LanguageSwitcher />
            <ThemeToggle />
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
