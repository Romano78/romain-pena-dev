// import PropTypes from 'prop-types';

const projects = [
  {
    client: 'Major Gaming Brand',
    type: 'Full Storefront Build',
    description:
      'Custom Shopify storefront built pixel-perfect from design files. Full component library, countdown timers, add-to-cart logic, and navigation \u2014 all built from scratch pre-Dawn framework.',
    items: [
      'Custom component library',
      'Countdown timers & urgency UI',
      'Advanced add-to-cart flows',
      'Full navigation system',
    ],
  },
  {
    client: 'Licensed Merch Brand',
    type: 'Integrations & Features',
    description:
      'Klaviyo, Google Tags, custom cart with product recommendations, and a custom app connecting their fulfillment backend to Shopify\u2019s order system.',
    items: [
      'Klaviyo email integration',
      'Google Tag Manager setup',
      'Custom cart + recommendations',
      'Fulfillment sync app',
    ],
  },
  {
    client: 'Pet Commerce Brand',
    type: 'Custom Sync App',
    description:
      'Built a custom app to sync products daily between an internal system and Shopify \u2014 keeping inventory accurate across both platforms automatically.',
    items: [
      'Daily product sync',
      'Inventory reconciliation',
      'Error handling & logging',
      'Admin dashboard',
    ],
  },
];

function ProjectCard() {
  return (
    <div className=''>
      <div className=' grid gap-6 md:grid-cols-3'>
        {projects.map((project) => (
          <div
            key={project.client}
            className='group flex flex-col rounded-lg border border-border bg-card p-8 transition-colors hover:border-accent'
          >
            <span className='text-xs font-medium uppercase tracking-wider text-accent'>
              {project.type}
            </span>
            <h3 className='mt-2 text-lg font-semibold text-card-foreground'>
              {project.client}
            </h3>
            <p className='mt-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
              {project.description}
            </p>
            <ul className='mt-6 space-y-2'>
              {project.items.map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-2 text-sm text-muted-foreground'
                >
                  <span className='mt-0.5 text-accent'>{'\u2192'}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;

ProjectCard.propTypes = {};
