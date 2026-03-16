'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/snippets/NavigationMenu';
import { Button } from '@/components/ui/button';
import { navigationItems } from '@/config/navigation-config';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function DesktopNavigation() {
  const navTranslations = useTranslations('nav');

  return (
    <NavigationMenu className='hidden lg:flex justify-end'>
      <NavigationMenuList className='flex'>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink asChild>
              <Button variant='link' size='sm' asChild>
                <Link
                  href={item.href}
                  title={navTranslations(item.id) || item.label}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                >
                  {navTranslations(item.id) || item.label}
                </Link>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
