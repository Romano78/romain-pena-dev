import {
  WORK_ROUTE,
  SERVICES_ROUTE,
  PRICING_ROUTE,
  CONTACT_ROUTE,
} from '@/config/routes';

/**
 * Shared navigation configuration for desktop and mobile menus
 *
 * This ensures consistency between different navigation components
 * and makes it easier to update navigation items in one place
 */
export const navigationItems = [
  {
    id: 'work',
    label: 'Work',
    href: WORK_ROUTE,
    isExternal: false,
    isDisabled: false,
  },
  {
    id: 'services',
    label: 'Services',
    href: SERVICES_ROUTE,
    isExternal: false,
    isDisabled: false,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: PRICING_ROUTE,
    isExternal: false,
    isDisabled: false,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: CONTACT_ROUTE,
    isExternal: false,
    isDisabled: false,
  },
];

export const footerNavigationItems = [
  {
    id: 'copyright',
    label: `© ${new Date().getFullYear()} Shopify Developer Montreal. All rights reserved.`,
  },
];
