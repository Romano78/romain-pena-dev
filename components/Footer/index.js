'use client';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import FooterNavigation from './FooterNavigation';

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
                        <a href='/' className='text-foreground'>
                          <svg
                            width='40'
                            height='40'
                            viewBox='0 0 40 40'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-label='Romain Pena'
                          >
                            <defs>
                              <filter id='logo-shadow'>
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
                              filter='url(#logo-shadow)'
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
                              filter='url(#logo-shadow)'
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
                              filter='url(#logo-shadow)'
                            >
                              P
                            </text>
                          </svg>
                        </a>
                      </div>
                      <div className='flex items-center gap-4'>
                        <FooterNavigation />
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
};
