'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A floating button that shows scroll progress and allows users to quickly navigate to the top or bottom of the page.
 *
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} [props.position='right'] - Position of the button (left, center, or right)
 * @returns {JSX.Element} The BackToTopButton component
 */
export default function BackToTopButton({ className, position = 'right' }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  const [isScrolledPast300, setIsScrolledPast300] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef(null);
  const lastTimestampRef = useRef(null);

  // Initial mount animation
  useEffect(() => {
    // Small delay before starting the animation
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events and update progress
  useEffect(() => {
    // Function to update scroll position
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      // Update state
      setScrollProgress(progress);
      setIsScrolledPast300(scrollTop > 300);
    };

    // Set up the scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Set up an interval to ensure updates happen even if scroll events are missed
    const intervalId = setInterval(handleScroll, 100);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  // Enhanced animation for the percentage counter
  useEffect(() => {
    const targetPercentage = Math.round(scrollProgress * 100);

    if (displayedPercentage === targetPercentage) return;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    lastTimestampRef.current = null;

    const animateCounter = (timestamp) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      // Calculate how much to move toward the target based on elapsed time
      // This creates a spring-like effect that's faster for bigger differences
      const delta = targetPercentage - displayedPercentage;
      const step =
        Math.sign(delta) *
        Math.min(
          Math.abs(delta),
          Math.max(1, Math.abs(delta) * 0.15), // At least 1, but up to 15% of the remaining distance
        );

      if (Math.abs(delta) < 0.5) {
        // If we're close enough, just set to the target
        setDisplayedPercentage(targetPercentage);
      } else {
        // Otherwise, move toward the target
        setDisplayedPercentage((prev) => Math.round(prev + step));
        animationRef.current = requestAnimationFrame(animateCounter);
      }

      lastTimestampRef.current = timestamp;
    };

    animationRef.current = requestAnimationFrame(animateCounter);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress, displayedPercentage]);

  const handleClick = () => {
    if (isScrolledPast300) {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // Scroll to bottom
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // Convert progress to percentage for the CSS variable
  const progressPercentage = `${scrollProgress * 100}%`;

  return (
    <button
      onClick={handleClick}
      className={cn(
        'fixed bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-700',
        // Position classes
        position === 'left' && 'left-3',
        position === 'center' && 'left-1/2 -translate-x-1/2',
        position === 'right' && 'right-3',
        'before:absolute before:inset-0 before:rounded-full before:bg-transparent',
        'after:absolute after:inset-0 after:rounded-full after:bg-transparent',
        // Initial mount animation classes
        !isMounted && 'translate-y-16 scale-75 opacity-0',
        className,
      )}
      style={{
        // Create the circular progress indicator using conic-gradient
        background: `conic-gradient(hsl(var(--muted)) ${progressPercentage}, hsl(var(--accent)) ${progressPercentage})`,
      }}
      aria-label={isScrolledPast300 ? 'Back to top' : 'Scroll to bottom'}
    >
      {/* Inner white circle with the animated arrow and percentage */}
      <span
        className={cn(
          'absolute inset-1 flex flex-col items-center justify-center rounded-full bg-primary transition-all duration-700',
          // Inner element animation with slight delay
          !isMounted && 'scale-0 opacity-0',
        )}
        style={{
          transitionDelay: isMounted ? '150ms' : '0ms',
        }}
      >
        {/* Animated arrow that rotates 180 degrees */}
        <div
          className='relative h-4 w-4 transition-transform duration-500'
          style={{
            transform: isScrolledPast300 ? 'rotate(0deg)' : 'rotate(180deg)',
            // Additional delay for the arrow
            transitionDelay: isMounted ? '300ms' : '0ms',
          }}
        >
          <ArrowUp
            className={cn(
              'h-4 w-4 text-primary-foreground transition-opacity duration-500',
              !isMounted && 'opacity-0',
            )}
            style={{
              transitionDelay: isMounted ? '450ms' : '0ms',
            }}
          />
        </div>

        {/* Percentage counter */}
        <span
          className={cn(
            'text-xs font-medium text-primary-foreground transition-all duration-500',
            !isMounted && 'opacity-0 translate-y-2',
          )}
          style={{
            transitionDelay: isMounted ? '600ms' : '0ms',
          }}
        >
          {displayedPercentage}%
        </span>
      </span>
    </button>
  );
}
