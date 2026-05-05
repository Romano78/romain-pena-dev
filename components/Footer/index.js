'use client';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
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
                        <a href='#' className='text-foreground'>
                          <svg
                            width='400'
                            height='200'
                            viewBox='0 0 200 200'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-10 w-10'
                            aria-label='Romain Pena'
                          >
                            <rect
                              x='0'
                              y='0'
                              width='200'
                              height='200'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              rx='8'
                            />
                            <path
                              d='M 10 10 L 30 10 M 10 10 L 10 30'
                              stroke='currentColor'
                              strokeWidth='2.5'
                              strokeLinecap='round'
                              fill='none'
                            />
                            <text
                              x='100'
                              y='105'
                              textAnchor='middle'
                              dominantBaseline='middle'
                              fontSize='96'
                              fontWeight='500'
                              fontFamily='Inter, Arial, sans-serif'
                              fill='#53B7F0'
                              fillOpacity='0.87'
                            >
                              R
                            </text>
                          </svg>
                        </a>
                      </div>
                      <div className='flex items-center gap-4'>
                        <FooterNavigation />
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
