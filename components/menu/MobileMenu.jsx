import { Button } from '@/components/ui/button';
import { navigationItems } from '@/config/navigation-config';
import PropTypes from 'prop-types';
import LanguageSwitcher from '@/components/snippets/LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function MobileMenu({ isOpen, onItemClick }) {
  const navTranslations = useTranslations('nav');

  return (
    <div
      className={`absolute left-0 top-16.5 lg:hidden w-full ${
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
                variant='link'
                size='sm'
                asChild
                key={item.id}
                onClick={onItemClick}
                className='flex flex-col items-start gap-1 w-full text-left pl-0 hover:bg---secondary-foreground/10 rounded-md transition-colors'
              >
                <Link
                  href={item.href}
                  title={navTranslations(item.id) || item.label}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                >
                  {navTranslations(item.id) || item.label}
                </Link>
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
};
