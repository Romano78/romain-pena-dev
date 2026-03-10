'use client';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import FooterNavigation from './FooterNavigation';

/**
 * Consolidated Menu component that handles both client-side behavior and menu content
 *
 * Features:
 * - Scroll-aware behavior to hide/show based on scroll direction
 * - Smooth animations using Framer Motion
 * - Mobile and desktop navigation
 * - Theme toggle
 * - Authentication section
 * - Special handling for docs section
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.theme] - Optional theme override for this section (light, dark, modern)
 * @param {Object} [props.user] - User object for authentication state
 * @returns {JSX.Element} - Menu component
 */
export default function Footer({ className = '' }) {
  return (
    <>
      {/* Animated border that moves from left to right */}
      <motion.div
        className='bg-background bg-border border-t'
        initial='visible'
      >
        <div className='relative h-[65px]'>
          <motion.div className='bg-background h-full'>
            <footer className='flex items-center h-full'>
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
                      <FooterNavigation />
                    </div>
                  </div>
                </div>
              </nav>
            </footer>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  /**
   * Optional theme override for this section (light, dark, modern)
   */
  theme: PropTypes.string,
  /**
   * User object for authentication state
   */
  user: PropTypes.object,
};
