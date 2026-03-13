'use client';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import DesktopNavigation from './DesktopNavigation';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import LanguageSwitcher from '@/components/snippets/LanguageSwitcher';

export default function Menu({ className = '' }) {
  const [isMounted, setIsMounted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShowMenu, setShouldShowMenu] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuHeight = 65; // Match the height in the className
  const componentMounted = useRef(false);

  const handleMobileMenuToggle = (isOpen) => {
    setIsMobileMenuOpen(isOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Small delay for smoother animation
    const timer = setTimeout(() => {
      setIsMounted(true);
      componentMounted.current = true;
    }, 100);

    const handleScroll = () => {
      if (!componentMounted.current) return;

      // Don't hide menu when mobile menu is open
      if (isMobileMenuOpen) {
        setShouldShowMenu(true);
        return;
      }

      const currentScrollY = window.scrollY;

      // Determine if we should show or hide the menu based on scroll direction
      // Also always show menu when at the top of the page
      if (currentScrollY <= menuHeight) {
        setShouldShowMenu(true);
      } else {
        // Show when scrolling up, hide when scrolling down
        setShouldShowMenu(currentScrollY < lastScrollY);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      componentMounted.current = false;
    };
  }, [lastScrollY, isMobileMenuOpen]);

  // Empty div with the same height during server rendering
  if (!isMounted) {
    return <div className='bg-background h-16.5' />;
  }

  // Animation variants
  const menuVariants = {
    hidden: { y: -65 },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // Border animation variants
  const borderVariants = {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.2, // Start after the menu appears
      },
    },
  };

  // Scroll-aware variants
  const scrollAwareVariants = {
    visible: { y: 0 },
    hidden: { y: -menuHeight },
  };

  return (
    <>
      {/* Body overlay */}
      <motion.div
        className='fixed inset-0 z-[99] bg-black/50'
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={isMobileMenuOpen ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
        transition={{ duration: 0.3 }}
        onClick={closeMobileMenu}
      />

    <motion.div
      className='fixed left-0 right-0 top-0 z-[100]'
      initial='visible'
      animate={shouldShowMenu ? 'visible' : 'hidden'}
      variants={scrollAwareVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='relative h-[65px]'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={menuVariants}
          className='bg-background h-full'
        >
          <header className='flex items-center h-full'>
            <nav className={cn('bg-background w-full', className)}>
              <div className='container py-0 px-4 md:px-0 m-auto'>
                <div className='flex h-full items-center justify-between'>
                  <div className='flex w-full items-center justify-between gap-2 pr-2'>
                    <div className='flex items-center gap-2'>
                      <a
                        href='#'
                        className='text-lg font-semibold tracking-tight text-foreground'
                      >
                        Romain
                        <span className=' text-muted'>Pena</span>
                      </a>
                    </div>
                    <DesktopNavigation />
                  </div>

                  {/* Desktop Actions */}
                  <div className='hidden items-center gap-4 lg:flex'>
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>

                  {/* Mobile Menu Button */}
                  <div className='flex items-center justify-end gap-2 lg:hidden'>
                    <MobileMenuButton
                      isOpen={isMobileMenuOpen}
                      onClick={() => handleMobileMenuToggle(!isMobileMenuOpen)}
                    />
                  </div>

                  {/* Mobile Menu */}
                  <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onItemClick={closeMobileMenu}
                  />
                </div>
              </div>
            </nav>
          </header>
        </motion.div>

        {/* Animated border that moves from left to right */}
        <motion.div
          className='bg-border absolute bottom-0 left-0 h-[1px]'
          initial='hidden'
          animate='visible'
          variants={borderVariants}
        />
      </div>
    </motion.div>
    </>
  );
}

Menu.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string,
  user: PropTypes.object,
};
