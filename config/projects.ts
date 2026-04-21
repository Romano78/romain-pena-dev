export type Project = {
  slug: string;
  client: string;
  type: string;
  description: string;
  items: string[];
  image?: string;
  gallery?: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    slug: 'atari',
    client: 'Atari',
    type: 'Full Storefront Build',
    description:
      'Pixel-perfect Figma implementation of the full Atari storefront — custom component library built before the Dawn framework existed. Added MetaMask wallet sync for NFT purchases, countdown timers, country-based product showcasing, and a custom fulfillment backend that routes Trevco-tagged orders to the right shipping partner.',
    items: [
      'Pixel-perfect Figma implementation',
      'Custom component library (pre-Dawn)',
      'MetaMask sync for NFT purchases',
      'Country & tag-based product showcase',
      'Custom Trevco fulfillment backend',
      'Countdown timers',
    ],
    url: 'https://atari.com',
  },
  {
    slug: 'philippe-tullio',
    client: 'Philippe Tullio',
    type: 'Web Experience',
    description:
      'Built a full cinematic portfolio for film director Philippe Tullio. Immersive scroll-based storytelling with GSAP-powered animations, Cloudinary video streaming, and a custom scroll-snap architecture. Bilingual FR/EN with a dark-first aesthetic designed to let the work dominate.',
    items: [
      'Cinematic scroll animations (GSAP + Framer Motion)',
      'Cloudinary video streaming',
      'FR/EN bilingual (next-intl)',
      'Scroll-snap + Lenis architecture',
      'Dark-first immersive design',
    ],
  },
  {
    slug: 'togethxr',
    client: 'TOGETHXR',
    type: 'Design Implementation',
    description:
      "Full pixel-perfect implementation of TOGETHXR's Figma designs — a women's sports apparel and media brand. Built every section from scratch in Liquid with no page builders, integrated Klaviyo for email flows, and delivered the full storefront before AI-assisted tooling existed.",
    items: [
      'Pixel-perfect Figma implementation',
      'Custom sections built from scratch',
      'Klaviyo email integration',
      'Full storefront build in Liquid',
    ],
    url: 'https://www.togethxr.com',
  },
  {
    slug: 'andor-collective',
    client: 'and-OR Collective',
    type: 'Design Implementation',
    description:
      "Implemented and-OR Collective's full Figma designs in Shopify — a luxury sustainable knitwear brand. Custom sections and pixel-perfect layouts across all pages, fully tailored to their minimal, premium aesthetic.",
    items: [
      'Pixel-perfect Figma implementation',
      'Custom sections & page layouts',
      'Full storefront build in Liquid',
    ],
    url: 'https://andorcollective.com',
  },
  {
    slug: 'animoetc',
    client: 'Animo etc',
    type: 'Custom App & Backend',
    description:
      "Built a custom app syncing Animo's internal product database with Shopify — automating product creation and updates. Also engineered a store location selector that serves the right inventory per location, with a custom backend overriding Shopify's default nearest-location deduction logic. Added full English/French bilingual support.",
    items: [
      'Custom database → Shopify sync app',
      'Store location selector',
      'Custom inventory deduction backend',
      'English / French bilingual support',
    ],
    url: 'https://animoetc.com',
  },
  {
    slug: 'jaysonhome',
    client: 'Jayson Home',
    type: 'Retainer & Redesign',
    description:
      'Long-term retainer for Jayson Home — a premium lifestyle and furniture brand. Handled ongoing maintenance and new features alongside a full redesign: new homepage, navigation, and cart. Built a custom checkout app and configured a custom checkout setup. Also migrated the entire theme from Vue.js to Shopify OS 2.0, bridging legacy code with the modern Shopify stack.',
    items: [
      'Ongoing maintenance & new features',
      'Homepage, nav & cart redesign',
      'Custom checkout app',
      'Custom checkout configuration',
      'Vue.js → Shopify OS 2.0 migration',
    ],
    url: 'https://www.jaysonhome.com',
  },
  {
    slug: 'ccollections',
    client: 'CCollections',
    type: 'Design Implementation',
    description:
      'Pixel-perfect Figma implementation for CCollections, a curated luxury furniture and design objects store. Built an advanced collection page with custom filter cards and a fully custom product page — all hand-coded sections, no page builders.',
    items: [
      'Pixel-perfect Figma implementation',
      'Advanced collection page with custom filters',
      'Custom product page layout',
      'Full storefront in Liquid',
    ],
    url: 'https://ccollections.shop',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
