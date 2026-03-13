import { Button } from '@/components/ui/button';
import { navigationItems } from '@/config/navigation-config';
import PropTypes from 'prop-types';
import LanguageSwitcher from '@/components/snippets/LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

export default function MobileMenu({ isOpen, onItemClick }) {
  return (
    <div
      className={`absolute top-16.5 lg:hidden w-full ${
        isOpen
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0 pointer-events-none'
      } bg-background overflow-y-auto transition-all duration-500 ease-in-out border-b`}
    >
      <div className='mx-auto p-6'>
        {/* Theme Toggle */}

        <nav className='space-y-4'>
          <div className='space-y-2'>
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant='ghost'
                size='sm'
                href={item.href}
                className='w-full justify-start pl-0'
                disabled={item.isDisabled}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => {
                  if (onItemClick) {
                    onItemClick();
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className=''>
            <LanguageSwitcher className='w-full' />
          </div>
          <div className='bg-primary/10 mb-6 rounded-lg p-2'>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onItemClick: PropTypes.func,
};
