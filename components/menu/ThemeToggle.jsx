'use client';

import * as React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Remove 'system' from the available themes
  const themes = [
    { name: 'light', icon: Sun },
    { name: 'dark', icon: Moon },
  ];

  // Mount effect to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use effect to automatically set theme based on system preference if it's set to 'system'
  React.useEffect(() => {
    if (mounted && theme === 'system' && systemTheme) {
      // Set the theme to match the system preference
      setTheme(systemTheme === 'dark' ? 'dark' : 'light');
    }
  }, [mounted, theme, systemTheme, setTheme]);

  // If theme is still 'system', show the actual system preference
  const currentTheme = theme === 'system' ? systemTheme || 'light' : theme;

  // Render placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className='relative w-auto lg:w-auto'>
        <button
          className='hover:bg-accent rounded-md p-2 px-3 transition-colors flex items-center gap-2 lg:w-auto w-full justify-between lg:justify-start'
          aria-label='Toggle theme menu'
        >
          <span className='opacity-0 text-sm capitalize inline lg:hidden md:inline'>
            <span className='lg:hidden'>Theme: </span>theme
          </span>
          <div className='h-5 w-5' />
        </button>
      </div>
    );
  }

  return (
    <div className='relative w-auto lg:w-auto'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='hover:bg-accent rounded-md p-2 px-3 transition-colors flex items-center gap-2 lg:w-auto w-full justify-between lg:justify-start'
        aria-label='Toggle theme menu'
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        <span className='text-sm capitalize inline lg:hidden md:inline'>
          <span className='lg:hidden'>Theme: </span>
          {currentTheme}
        </span>
        {themes.map(
          ({ name, icon: Icon }) =>
            currentTheme === name && <Icon key={name} className='h-5 w-5' />,
        )}
      </button>

      {isOpen && (
        <div
          className='lg:absolute lg:right-0 relative w-full lg:w-36 mt-2 rounded-md border border-border bg-popover shadow-lg ring-1 ring-black ring-opacity-5 z-[9999]'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='theme-menu'
        >
          <div className='py-1' role='none'>
            {themes.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => {
                  setTheme(name);
                  setIsOpen(false);
                }}
                className={`${currentTheme === name ? 'bg-accent' : ''} flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-accent/50 transition-colors`}
                role='menuitem'
              >
                <Icon className='h-4 w-4' />
                <span className='capitalize'>{name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
