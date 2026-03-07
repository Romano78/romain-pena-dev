'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/snippets/NavigationMenu';
import { Button } from '@/components/ui/button';
import { navigationItems } from '@/config/navigation-config';

export default function DesktopNavigation() {
  return (
    <NavigationMenu className='hidden lg:flex justify-end'>
      <NavigationMenuList className='flex'>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink asChild>
              <Button variant='link' size='sm' asChild>
                <a
                  href={item.href}
                  title={item.label}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                </a>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
