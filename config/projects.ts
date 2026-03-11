export type Project = {
  slug: string;
  client: string;
  type: string;
  description: string;
  items: string[];
  image?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: 'atari',
    client: 'Atari.com',
    type: 'Full Storefront Build',
    description:
      'Custom Shopify storefront built pixel-perfect from design files. Full component library, countdown timers, add-to-cart logic, and navigation — all built from scratch pre-Dawn framework.',
    items: [
      'Custom component library',
      'Countdown timers & urgency UI',
      'Advanced add-to-cart flows',
      'Full navigation system',
    ],
    image: '/Atari-Logo.png',
    url: 'https://atari.com',
  },
  {
    slug: 'merch-brand',
    client: 'Licensed Merch Brand',
    type: 'Integrations & Features',
    description:
      "Klaviyo, Google Tags, custom cart with product recommendations, and a custom app connecting their fulfillment backend to Shopify's order system.",
    items: [
      'Klaviyo email integration',
      'Google Tag Manager setup',
      'Custom cart + recommendations',
      'Fulfillment sync app',
    ],
  },
  {
    slug: 'pet-commerce',
    client: 'Pet Commerce Brand',
    type: 'Custom Sync App',
    description:
      'Built a custom app to sync products daily between an internal system and Shopify — keeping inventory accurate across both platforms automatically.',
    items: [
      'Daily product sync',
      'Inventory reconciliation',
      'Error handling & logging',
      'Admin dashboard',
    ],
  },
  {
    slug: 'fashion-brand',
    client: 'Fashion Brand',
    type: 'Theme Customization',
    description:
      "Deep theme customization with custom sections, dynamic filters, and a fully redesigned product page — all staying within Shopify's native theme architecture.",
    items: [
      'Custom product page layout',
      'Dynamic collection filters',
      'Reusable custom sections',
      'Performance optimization',
    ],
  },
  {
    slug: 'beauty-brand',
    client: 'Beauty Brand',
    type: 'Custom Feature Build',
    description:
      'Built a custom shade finder quiz and bundle builder directly in the theme — no third-party apps, fully styled to match the brand.',
    items: [
      'Interactive shade finder quiz',
      'Custom bundle builder',
      'Cart upsell logic',
      'Mobile-first implementation',
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
