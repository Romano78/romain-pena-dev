'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/snippets/NavigationMenu';
import { Button } from '@/components/ui/button';
import { footerNavigationItems } from '@/config/navigation-config';
import { useTranslations } from 'next-intl';

export default function FooterNavigation() {
  const footerTranslations = useTranslations('footer');

  return (
    <NavigationMenu className='hidden lg:flex justify-end'>
      <NavigationMenuList className='flex'>
        {footerNavigationItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink asChild>
              <Button variant='link' size='sm' asChild>
                <a
                  href={item.href}
                  title={
                    footerTranslations(item.id, {
                      year: new Date().getFullYear(),
                    }) || item.label
                  }
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                >
                  {footerTranslations(item.id, {
                    year: new Date().getFullYear(),
                  }) || item.label}
                </a>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
