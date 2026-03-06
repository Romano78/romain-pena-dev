import { Button } from '@/components/ui/button';
import { navigationItems } from '@/config/navigation-config';
import PropTypes from 'prop-types';
// import { ThemeToggle } from '@/components/snippets/Customizer/theme-toggle';
// import AuthSection from './AuthSection';

/**
 * Mobile menu component that displays navigation items and theme toggle
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the mobile menu is open
 * @param {Object} props.user - User object for authentication
 * @param {Function} props.onItemClick - Callback function when a navigation item is clicked
 * @returns {JSX.Element} - MobileMenu component
 */
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
        {/* <div className='bg-muted/50 mb-6 rounded-lg p-2'>
          <ThemeToggle />
        </div> */}
        <nav className='space-y-4'>
          {/* Navigation Links */}
          <div className='space-y-2'>
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant='ghost'
                size='sm'
                href={item.href}
                className='w-full justify-start'
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
